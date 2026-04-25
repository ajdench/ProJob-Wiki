# Gap Register

## Purpose

This page records where the wiki was thin or missing information, and what has now been added. It should be updated after each proof of concept.

## Current Status

| Area | Previous state | Augmentation added | Remaining decision |
| --- | --- | --- | --- |
| Web/stack architecture | Target diagram existed, but runtime layers were implicit | Added [Web and Stack Architecture](../architecture/web-stack-architecture.md) and [Deployment Runtime](../architecture/deployment-runtime.md) | Choose PWA stack after offline spike |
| Component responsibilities | Components were named but not mapped to system roles | Added [Component Map](../architecture/component-map.md) | Confirm ERP core after Odoo/ERPNext POCs |
| Integration contracts | Sync API and ERP adapters were described at a high level only | Added [Integration Contracts](../architecture/integration-contracts.md) | Define exact API once ERP candidate is selected |
| Offline data boundary | Offline sync model existed but did not tie back to web stack | Expanded architecture links and sync flow | Decide RxDB/PouchDB/Dexie/PowerSync route |
| Deployment view | GitHub Pages and local experiments were not described as a runtime model | Added deployment/runtime page | Decide production hosting model later |
| Evidence workflow | Findings template existed; evidence folders were added later | Findings pages and asset folders now exist | Fill with POC results |
| Odoo runtime | POC was blocked by missing container runtime | Docker/Colima installed and documented | Run Odoo/OCA compose stack |
| Podman runtime | Requested tooling installed but not fully operational | Podman status recorded | Optional follow-up; not blocking Odoo |
| Security model | Permissions page exists but detailed threat model is absent | Component and integration pages now call out boundaries | Add explicit threat model before real build |
| Reporting/BI | Mentioned only as a component | Component map explains projection/reporting role | Define report catalogue after POCs |
| Accounting integration | Covered only through ERP candidates | Integration contracts identify commercial ownership | Confirm whether accounting remains inside ERP |
| Multi-company workflow | Permissions page covers roles/scopes, but legal/entity model is unresolved | Integration contracts separate tenant, company, project, job scopes | Define tenant/entity model with real user examples |

## Missing Information That Still Requires POC Evidence

These cannot be responsibly filled from research alone:

| Question | Evidence needed | Owner page |
| --- | --- | --- |
| Can Odoo/OCA model quote -> job -> materials -> timesheet -> invoice cleanly? | Running Odoo/OCA scenario | [Odoo + OCA Findings](../poc/findings/odoo-oca.md) |
| Can ERPNext/Frappe model the same workflow with fewer customizations? | Running ERPNext scenario | [ERPNext Findings](../poc/findings/erpnext.md) |
| Which offline sync stack handles field writes and attachments most safely? | Offline PWA spike | [Offline PWA Findings](../poc/findings/offline-pwa.md) |
| What exact API shape should the field PWA use? | ERP adapter experiment | [Integration Contracts](../architecture/integration-contracts.md) |
| How should cross-company dependencies appear in the UI? | Workflow prototype or user walkthrough | [Workflow Map](../workflows/workflow-map.md) |
| Which data must never be stored offline? | Security/privacy review | [Permissions and Tenancy](../architecture/permissions-and-tenancy.md) |

## Immediate Fill Actions Completed

- Added a concrete web/client/backend/deployment architecture.
- Added component responsibility map.
- Added canonical integration boundaries and draft contract shapes.
- Added runtime distinction between current wiki infrastructure, POC infrastructure, and future product infrastructure.
- Updated source references for Odoo Docker, OCA Field Service, CouchDB/PouchDB replication, RxDB replication, and PowerSync.

## Next Fill Actions

1. Run the Odoo/OCA compose stack and capture module-install findings.
2. Add screenshots to `docs/assets/poc/odoo-oca/`.
3. Convert Odoo findings into a pass/fail row update in the scoring matrix.
4. Repeat for ERPNext.
5. Build the offline PWA spike only after the ERP adapter assumptions are clearer.

