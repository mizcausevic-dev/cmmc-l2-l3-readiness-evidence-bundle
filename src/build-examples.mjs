// Builds a canonical example bundle for Stratos Aerospace × VendorD GuardianAI v3.x.

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, "../examples/stratos-cmmc-l2-readiness-bundle.json");

const ev = (id, family, kind, outcome, controlId, opts = {}) => ({
  evidence_id: id, control_family: family, evidence_kind: kind, outcome,
  control_id: controlId, collected_at: opts.collected_at ?? "2026-11-15T10:00:00Z",
  source: opts.source ?? "stratos-grc-prod", applies_to_levels: opts.levels ?? ["L2"],
  ...(opts.poam_ref ? { poam_ref: opts.poam_ref } : {}),
  ...(opts.notes ? { notes: opts.notes } : {})
});

const bundle = {
  bundle_id: "STRATOS-CMMC-L2-2026Q4",
  schema_version: "0.1",
  generated_at: "2026-11-15T10:00:00Z",
  contractor: {
    cage_code_tokenized: "tok_cage_STRATOS_AERO_1A2B3",
    duns_tokenized: "tok_duns_STRATOS_AERO_998877665",
    primary_cui_categorizations_in_scope: ["CUI-BASIC", "CUI-SPECIFIED-NOFORN"],
    ai_systems_in_scope: [
      { name: "VendorD GuardianAI v3.x", role: "RFP analytics + technical-data-package screening",
        ai_tool_card_url: "https://vendord-guardianai.example/.well-known/ai-tool-cards/guardianai-3.x.json" }
    ]
  },
  assessment: {
    target_cmmc_level: "L2",
    assessment_mode: "c3pao-assessment",
    dfars_clauses_in_scope: ["dfars-252-204-7012", "dfars-252-204-7019", "dfars-252-204-7020", "dfars-252-204-7021"],
    target_sprs_score_floor: 88
  },
  evidence: [
    ev("ev-001", "ac-access-control", "system-security-plan-section", "satisfied", "AC.L2-3.1.1"),
    ev("ev-002", "ac-access-control", "mfa-enforcement-evidence", "satisfied", "AC.L2-3.1.20"),
    ev("ev-003", "at-awareness-and-training", "training-record", "satisfied", "AT.L2-3.2.1"),
    ev("ev-004", "au-audit-and-accountability", "audit-log-extract", "satisfied", "AU.L2-3.3.1"),
    ev("ev-005", "cm-configuration-management", "configuration-baseline", "satisfied", "CM.L2-3.4.1"),
    ev("ev-006", "ia-identification-and-authentication", "fips-140-validated-crypto-evidence", "satisfied", "IA.L2-3.5.10"),
    ev("ev-007", "ir-incident-response", "incident-tabletop-after-action", "satisfied", "IR.L2-3.6.3"),
    ev("ev-008", "ir-incident-response", "cyber-incident-72-hour-report-copy", "satisfied", "IR.L2-3.6.1",
       { notes: "Filed via dibnet.dod.mil within 72-hour window for STRATOS-DFARS-2026-0011 event" }),
    ev("ev-009", "ma-maintenance", "policy-document", "satisfied", "MA.L2-3.7.1"),
    ev("ev-010", "mp-media-protection", "media-sanitization-record", "satisfied", "MP.L2-3.8.3"),
    ev("ev-011", "pe-physical-protection", "policy-document", "satisfied", "PE.L2-3.10.1"),
    ev("ev-012", "ps-personnel-security", "personnel-screening-attestation", "satisfied", "PS.L2-3.9.1"),
    ev("ev-013", "ra-risk-assessment", "risk-assessment-report", "satisfied", "RA.L2-3.11.1"),
    ev("ev-014", "ca-security-assessment", "ssp-scope-diagram", "satisfied", "CA.L2-3.12.4"),
    ev("ev-015", "sc-system-and-communications-protection", "boundary-protection-architecture-diagram", "satisfied", "SC.L2-3.13.1"),
    ev("ev-016", "sc-system-and-communications-protection", "encryption-configuration-evidence", "satisfied", "SC.L2-3.13.11"),
    ev("ev-017", "si-system-and-information-integrity", "vulnerability-scan-result", "partially-satisfied", "SI.L2-3.14.1",
       { poam_ref: "POAM-2026-014", notes: "3 medium CVEs open; remediation by 2027-01-15 per POA&M" }),
    ev("ev-018", "si-system-and-information-integrity", "patch-management-report", "satisfied", "SI.L2-3.14.4"),
    ev("ev-019", "cmmc-program-management", "policy-document", "satisfied", "PMP-001",
       { notes: "Designated Senior Information Security Officer + CMMC Compliance Lead" }),
    ev("ev-020", "cmmc-poam-management", "poam-entry", "satisfied", "PMP-002"),
    ev("ev-021", "cmmc-sprs-scoring", "sprs-score-export", "satisfied", "PMP-003",
       { notes: "Self-attested score: 92/110; uploaded to SPRS 2026-10-30" }),
    ev("ev-022", "cmmc-sprs-scoring", "sprs-self-attestation-letter", "satisfied", "PMP-004"),
    ev("ev-023", "cmmc-c3pao-assessment-artifacts", "c3pao-readiness-letter", "satisfied", "PMP-005"),
    ev("ev-024", "ac-access-control", "ai-tool-control-attestation", "satisfied", "AC.L2-3.1.2",
       { notes: "GuardianAI v3.x access restricted to US-person-verified users via SAML+conditional access" }),
    ev("ev-025", "si-system-and-information-integrity", "ai-tool-output-spot-check", "satisfied", "SI.L2-3.14.6"),
    ev("ev-026", "sc-system-and-communications-protection", "non-cui-segregation-evidence", "satisfied", "SC.L2-3.13.13"),
    ev("ev-027", "sc-system-and-communications-protection", "enclave-boundary-evidence", "satisfied", "SC.L2-3.13.5"),
    ev("ev-028", "sc-system-and-communications-protection", "shared-responsibility-evidence-aws-govcloud-azure-government", "satisfied", "PMP-006"),
    ev("ev-029", "ac-access-control", "third-party-app-allowlist-snapshot", "satisfied", "AC.L2-3.1.21"),
    ev("ev-030", "ra-risk-assessment", "supply-chain-screen-result", "satisfied", "RA.L2-3.11.2"),
    ev("ev-031", "mp-media-protection", "controlled-technical-data-handling-record", "satisfied", "MP.L2-3.8.6"),
    ev("ev-032", "ac-access-control", "us-person-status-verification-record", "satisfied", "AC.L2-3.1.5"),
    ev("ev-033", "cmmc-program-management", "msp-shared-responsibility-matrix", "satisfied", "PMP-007"),
    ev("ev-034", "ca-security-assessment", "external-service-provider-fedramp-evidence", "satisfied", "CA.L2-3.12.1",
       { notes: "Azure Government FedRAMP High authorization referenced for CUI processing tier" }),
    ev("ev-035", "mp-media-protection", "cui-marking-spot-check", "satisfied", "MP.L2-3.8.4")
  ]
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(bundle, null, 2) + "\n", "utf8");
console.log(`built bundle (${bundle.evidence.length} evidence items) → ${OUT}`);
