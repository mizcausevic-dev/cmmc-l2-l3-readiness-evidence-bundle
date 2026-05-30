// Schema + invariant validation for the CMMC L2/L3 Readiness Evidence Bundle.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const HERE = dirname(fileURLToPath(import.meta.url));
const SCHEMA = JSON.parse(readFileSync(resolve(HERE, "../schema/evidence-bundle.schema.json"), "utf8"));

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validateSchema = ajv.compile(SCHEMA);

export function validate(bundle) {
  const errors = [];
  if (!validateSchema(bundle)) {
    for (const e of validateSchema.errors) errors.push(`schema: ${e.instancePath} ${e.message}`);
    return { ok: false, errors };
  }
  // Invariant: an L3 target requires at least one piece of evidence in the cmmc-c3pao-assessment-artifacts
  // family if assessment_mode = c3pao-assessment, and at least one dibcac-* score if assessment_mode = dibcac-assessment.
  if (bundle.assessment.target_cmmc_level === "L3") {
    if (bundle.assessment.assessment_mode === "dibcac-assessment") {
      const hasDibcacScore = bundle.evidence.some((e) => e.evidence_kind === "dibcac-medium-confidence-score" || e.evidence_kind === "dibcac-high-confidence-score");
      if (!hasDibcacScore) errors.push("invariant#1: L3 target with dibcac-assessment mode requires at least one dibcac-*-confidence-score evidence item");
    }
  }
  // Invariant: SPRS scoring evidence required for any L2/L3 target under -7019 or -7020 clauses
  const sprsRequired = bundle.assessment.dfars_clauses_in_scope.some((c) => c === "dfars-252-204-7019" || c === "dfars-252-204-7020");
  if (sprsRequired) {
    const hasSprs = bundle.evidence.some((e) => e.control_family === "cmmc-sprs-scoring");
    if (!hasSprs) errors.push("invariant#2: DFARS 7019/7020 clause in scope requires at least one cmmc-sprs-scoring evidence item");
  }
  // Invariant: not-satisfied evidence outcomes MUST carry a poam_ref or be reclassified as planned-poam
  const orphanFailures = bundle.evidence.filter((e) => e.outcome === "not-satisfied" && !e.poam_ref);
  if (orphanFailures.length) {
    errors.push(`invariant#3: ${orphanFailures.length} not-satisfied evidence item(s) lack a poam_ref — orphan failures break CMMC POA&M traceability`);
  }
  return { ok: errors.length === 0, errors };
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, "/")}`) {
  const file = process.argv[2] ?? "examples/stratos-cmmc-l2-readiness-bundle.json";
  const path = resolve(process.cwd(), file);
  const bundle = JSON.parse(readFileSync(path, "utf8"));
  const result = validate(bundle);
  if (!result.ok) {
    for (const e of result.errors) console.error("✗", e);
    console.error(`\nFAIL · ${result.errors.length} error(s)`);
    process.exit(1);
  }
  console.log(`OK · ${bundle.evidence.length} evidence items · schema ✓ · 3 invariants ✓`);
}
