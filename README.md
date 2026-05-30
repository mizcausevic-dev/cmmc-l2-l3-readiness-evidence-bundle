# cmmc-l2-l3-readiness-evidence-bundle

> **DefenseTech evidence-bundle scaffolding (Spec #3 of the DefenseTech 6-pack).** A canonical JSON document model for collecting, validating, and submitting CMMC 2.0 L2 / L3 readiness evidence under DFARS 252.204-7012/7019/7020/7021 and NIST SP 800-171 r2 + NIST SP 800-172 enhanced security requirements. **18 control families × 48 evidence kinds** — alignment surface for prime contractors preparing for C3PAO assessment or DIBCAC government-led review.

Part of the [Kinetic Gain Protocol Suite](https://suite.kineticgain.com).

> Status: v0.1 draft. 35-item canonical example for Stratos Aerospace × VendorD GuardianAI v3.x, schema-validated + 3 invariants enforced.

## Regulatory floor

- **CMMC 2.0** — three levels (L1 = FCI-only self, L2 = CUI with C3PAO assessment, L3 = enhanced security with DIBCAC government assessment) per 32 CFR 170
- **DFARS 252.204-7012** — Safeguarding CDI + 72-hour cyber incident reporting
- **DFARS 252.204-7019** — Notice of NIST SP 800-171 DoD Assessment Requirements
- **DFARS 252.204-7020** — NIST SP 800-171 DoD Assessment Requirements + SPRS score submission
- **DFARS 252.204-7021** — CMMC Certification Level Requirements (becoming sole-source-disqualifying in 2026)
- **NIST SP 800-171 r2** — 110 security requirements across 14 control families for CUI protection
- **NIST SP 800-172** — 24 enhanced security requirements for CMMC L3 (advanced persistent threat hardening)
- **SPRS** — Supplier Performance Risk System; numeric self-assessment score (-203 to 110) submitted under DFARS 7020

## 18 control families encoded

**14 NIST 800-171 control families:** Access Control · Awareness and Training · Audit and Accountability · Configuration Management · Identification and Authentication · Incident Response · Maintenance · Media Protection · Physical Protection · Personnel Security · Risk Assessment · Security Assessment · System and Communications Protection · System and Information Integrity.

**4 CMMC-program-specific families:** Program Management · POA&M Management · SPRS Scoring · C3PAO Assessment Artifacts.

## 48 evidence kinds encoded

Evidence kinds span policy/procedure docs, log exports, configuration baselines, vulnerability scan output, training records, tabletop after-actions, AI-tool control attestations, POA&M entries + closure evidence, SPRS score exports, C3PAO readiness letters, DIBCAC confidence scores, CUI marking spot-checks, MSP shared-responsibility matrices, FedRAMP cross-references for Azure Government / AWS GovCloud, US-person status verification records, DDTC/BIS license application evidence, and FSO co-sign records.

Key DefenseTech-unique evidence kinds (not in HealthTech / FinTech / GovTech bundles):

- `ai-tool-control-attestation` — explicit attestation that AI tool access is restricted to US-person-verified users
- `controlled-technical-data-handling-record` — handling provenance for ITAR USML technical data + EAR-CCL-controlled data
- `us-person-status-verification-record` — per-user verification under 22 CFR 120.62
- `deemed-export-screening-record` — per-event evaluation under 22 CFR 120.50 + 15 CFR 734.13
- `fso-cosign-record` — Facility Security Officer co-sign on production-ready output from cleared environments
- `scif-physical-control-evidence` — ICD 705 SCIF physical control attestation
- `shared-responsibility-evidence-aws-govcloud-azure-government` — cloud shared-responsibility for CUI-tier processing

## Three invariants enforced

1. **L3 + DIBCAC mode invariant** — `target_cmmc_level = "L3"` + `assessment_mode = "dibcac-assessment"` requires at least one `dibcac-medium-confidence-score` or `dibcac-high-confidence-score` evidence item.
2. **SPRS scoring invariant** — DFARS 7019 or 7020 in scope requires at least one piece of evidence in the `cmmc-sprs-scoring` family. SPRS score is the explicit deliverable of 7020.
3. **POA&M traceability invariant** — every `not-satisfied` evidence outcome MUST carry a `poam_ref`. Orphan failures break CMMC POA&M chain of custody, blocking certification.

## Canonical example

- **Contractor:** Stratos Aerospace (DIB Tier 2, CAGE-coded prime sub) — CUI-Basic + CUI-Specified-NoForn in scope
- **AI system:** VendorD GuardianAI v3.x
- **Target:** CMMC L2 via C3PAO assessment, target SPRS floor 88
- **35 evidence items** across 11 of 18 families (typical L2 readiness snapshot; full L3 example deferred to v0.2)

## Verify

```bash
npm install
npm run build:examples   # builds canonical 35-evidence-item bundle
npm run validate         # schema + 3 invariants
npm test                 # 8 unit tests
```

## Composes with

- [`defense-decision-record-audit-stream`](https://github.com/mizcausevic-dev/defense-decision-record-audit-stream) — feeds `audit-log-extract` + `cyber-incident-72-hour-report-copy` evidence kinds
- [`dod-cmmc-disclosure-tracker`](https://github.com/mizcausevic-dev/dod-cmmc-disclosure-tracker) — authority lifecycle context for each evidence kind
- [`cui-data-vault-contract-profile`](https://github.com/mizcausevic-dev/cui-data-vault-contract-profile) — vault contract for CUI handling
- [Kinetic Gain Protocol Suite](https://suite.kineticgain.com) — umbrella

## Compliance posture

Evidence-bundle **readiness scaffolding**. **Does NOT constitute CMMC certification** — only a C3PAO (for L2) or DIBCAC (for L3) can issue that. **Does NOT establish DFARS compliance**, **does NOT substitute for actual NIST 800-171/172 control implementation**, and **does NOT generate an SPRS score** (SPRS submission requires the contractor's authenticated PIEE upload). Per the standing Suite public-language guardrail: *readiness · evidence · posture · controls · scaffolding* — never "compliant" / "certified" without external attestation.

## License

MIT.
