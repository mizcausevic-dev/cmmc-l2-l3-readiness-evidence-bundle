// Public surface for the CMMC L2/L3 Readiness Evidence Bundle.

export const CONTROL_FAMILIES = [
  "ac-access-control", "at-awareness-and-training", "au-audit-and-accountability",
  "cm-configuration-management", "ia-identification-and-authentication",
  "ir-incident-response", "ma-maintenance", "mp-media-protection",
  "pe-physical-protection", "ps-personnel-security", "ra-risk-assessment",
  "ca-security-assessment", "sc-system-and-communications-protection",
  "si-system-and-information-integrity",
  "cmmc-program-management", "cmmc-poam-management", "cmmc-sprs-scoring",
  "cmmc-c3pao-assessment-artifacts"
];

export const EVIDENCE_KINDS = [
  "system-security-plan-section", "policy-document", "procedure-document", "training-record",
  "log-export", "configuration-baseline", "audit-log-extract", "vulnerability-scan-result",
  "incident-response-test-result", "media-sanitization-record", "personnel-screening-attestation",
  "risk-assessment-report", "boundary-protection-architecture-diagram", "encryption-configuration-evidence",
  "patch-management-report", "ai-tool-control-attestation", "ai-tool-output-spot-check",
  "poam-entry", "poam-closure-evidence", "sprs-score-export", "sprs-self-attestation-letter",
  "cui-marking-spot-check", "cui-spillage-incident-record",
  "c3pao-assessment-report", "c3pao-readiness-letter", "dibcac-medium-confidence-score", "dibcac-high-confidence-score",
  "non-cui-segregation-evidence", "enclave-boundary-evidence", "msp-shared-responsibility-matrix",
  "external-service-provider-fedramp-evidence", "incident-tabletop-after-action",
  "cyber-incident-72-hour-report-copy", "fci-only-control-attestation", "supply-chain-screen-result",
  "controlled-technical-data-handling-record", "deemed-export-screening-record",
  "us-person-status-verification-record", "fso-cosign-record", "scif-physical-control-evidence",
  "ddtc-registration-evidence", "bis-license-application-evidence", "ear-eccn-classification-evidence",
  "itar-license-application-evidence", "third-party-app-allowlist-snapshot", "mfa-enforcement-evidence",
  "fips-140-validated-crypto-evidence", "ssp-scope-diagram",
  "shared-responsibility-evidence-aws-govcloud-azure-government"
];

export function familyCoverage(bundle) {
  const seen = new Set(bundle.evidence.map((e) => e.control_family));
  return CONTROL_FAMILIES.map((f) => ({ family: f, present: seen.has(f) }));
}

export function summarize(bundle) {
  return {
    bundle_id: bundle.bundle_id,
    target_cmmc_level: bundle.assessment.target_cmmc_level,
    assessment_mode: bundle.assessment.assessment_mode,
    evidence_count: bundle.evidence.length,
    family_coverage_count: new Set(bundle.evidence.map((e) => e.control_family)).size,
    family_coverage_total: CONTROL_FAMILIES.length,
    outcome_breakdown: bundle.evidence.reduce((acc, e) => { acc[e.outcome] = (acc[e.outcome] ?? 0) + 1; return acc; }, {})
  };
}
