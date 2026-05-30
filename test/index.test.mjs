import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CONTROL_FAMILIES, EVIDENCE_KINDS, familyCoverage, summarize } from "../src/index.mjs";
import { validate } from "../src/validate.mjs";

const bundle = JSON.parse(readFileSync(new URL("../examples/stratos-cmmc-l2-readiness-bundle.json", import.meta.url), "utf8"));

test("18 control families enumerated", () => assert.equal(CONTROL_FAMILIES.length, 18));
test("evidence kinds includes ai-tool-control-attestation", () => assert.ok(EVIDENCE_KINDS.includes("ai-tool-control-attestation")));
test("example bundle validates", () => {
  const r = validate(bundle);
  assert.ok(r.ok, JSON.stringify(r.errors, null, 2));
});
test("summarize basics", () => {
  const s = summarize(bundle);
  assert.equal(s.bundle_id, "STRATOS-CMMC-L2-2026Q4");
  assert.equal(s.target_cmmc_level, "L2");
  assert.ok(s.evidence_count >= 30);
});
test("invariant#3: not-satisfied without poam_ref fails", () => {
  const bad = JSON.parse(JSON.stringify(bundle));
  bad.evidence.push({ evidence_id: "ev-zzz", control_family: "ac-access-control", evidence_kind: "policy-document", outcome: "not-satisfied", control_id: "AC.L2-3.1.99", collected_at: "2026-11-15T10:00:00Z", source: "stratos-grc-prod" });
  const r = validate(bad);
  assert.ok(!r.ok);
  assert.ok(r.errors.some((e) => e.includes("invariant#3")));
});
test("invariant#2: SPRS scoring required when 7019/7020 in scope", () => {
  const bad = JSON.parse(JSON.stringify(bundle));
  bad.evidence = bad.evidence.filter((e) => e.control_family !== "cmmc-sprs-scoring");
  const r = validate(bad);
  assert.ok(!r.ok);
  assert.ok(r.errors.some((e) => e.includes("invariant#2")));
});
test("invariant#1: L3 dibcac mode requires dibcac score", () => {
  const bad = JSON.parse(JSON.stringify(bundle));
  bad.assessment.target_cmmc_level = "L3";
  bad.assessment.assessment_mode = "dibcac-assessment";
  const r = validate(bad);
  assert.ok(!r.ok);
  assert.ok(r.errors.some((e) => e.includes("invariant#1")));
});
test("family coverage = 11+ of 18", () => {
  const cov = familyCoverage(bundle).filter((c) => c.present);
  assert.ok(cov.length >= 11);
});
