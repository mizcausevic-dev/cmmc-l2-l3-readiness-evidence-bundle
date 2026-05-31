# Changelog

## 1.0.0-prod — 2026-05-31

- Hardened to v1.0-prod per squad doctrine; member of the DefenseTech vertical 6-pack.
- Spec-component repo (no Pages deploy required); AGPL-3.0-or-later, synthetic example data only.
- Pulse universe entry not applicable (no custom subdomain).



## [0.1] — 2026-05-30

### Added

- Initial schema + validator + canonical example bundle.
- **18 control families encoded** — 14 NIST 800-171 families + 4 CMMC-program-specific families (Program Management, POA&M Management, SPRS Scoring, C3PAO Assessment Artifacts).
- **48 evidence kinds enumerated** — covering policy/procedure docs, log exports, configuration baselines, vulnerability scans, training records, tabletop after-actions, AI-tool control attestations, POA&M entries + closure evidence, SPRS exports + self-attestation letters, C3PAO readiness letters, DIBCAC confidence scores, CUI marking spot-checks, MSP shared-responsibility matrices, FedRAMP cross-references for Azure Government + AWS GovCloud, US-person status verification, DDTC/BIS/ITAR license application evidence, FSO co-sign records, SCIF physical control attestation.
- Three invariants enforced by validator:
  - **#1 L3 + DIBCAC mode** requires at least one `dibcac-*-confidence-score` evidence item
  - **#2 SPRS scoring required** when DFARS 7019/7020 in scope
  - **#3 POA&M traceability** — every `not-satisfied` outcome must carry a `poam_ref`
- Canonical example: Stratos Aerospace L2 readiness bundle (35 evidence items) with VendorD GuardianAI v3.x AI system in scope.
- 8 unit tests across public API + 3 negative invariant tests.

### Not yet

- Full L3 example bundle exercising NIST 800-172 enhanced requirements (currently only L2).
- DIBCAC high-confidence assessment example flow.
- Cross-bundle references (e.g. import POA&M entries from a sibling POA&M-tracker repo).
- SBOM evidence kinds (defer until NTIA SBOM mandate ships for defense suppliers).
- Insider threat program evidence kinds (NISPOM Conforming Change 2).