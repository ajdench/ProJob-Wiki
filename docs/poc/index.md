# Proof-of-Concept Plan

## Objective

The POC phase should validate whether an open-source core platform can support the back-office model, and whether a dedicated offline-first PWA can reliably support field execution.

The goal is not to build the final product. The goal is to produce evidence for a decision.

## POC Candidates

| Candidate | Purpose |
| --- | --- |
| Odoo Community + OCA Field Service | Validate the broad ERP/FSM system-of-record option |
| ERPNext / Frappe | Validate the coherent open-source ERP/custom framework option |
| Offline-first PWA spike | Validate field reliability independent of ERP choice |

## Decision Gates

| Gate | Pass condition |
| --- | --- |
| Functional fit | Can model the common test scenario without distorting the product model |
| Offline reliability | Can complete site work without network and sync safely later |
| Integration fit | Can expose/consume APIs for jobs, checklists, time, materials, and files |
| Permission fit | Can isolate company/project/subcontractor views |
| Operational fit | Can be deployed, upgraded, backed up, and supported without excessive burden |

## Two-Week POC Schedule

| Day | Work |
| --- | --- |
| 1 | Confirm common test scenario and sample data |
| 2-3 | Install Odoo + OCA Field Service; run core workflow |
| 4-5 | Install ERPNext; run core workflow |
| 6-8 | Build offline PWA spike with local DB and sync queue |
| 9 | Compare API/integration approaches |
| 10 | Score options and write decision update |

## Required Evidence

Each POC must produce:

- Install notes.
- Screenshots or screen recordings.
- Data model notes.
- Fit/gap table.
- Required customizations.
- Offline behavior notes.
- Permission model notes.
- Integration/API notes.
- Final score using the weighted criteria.

## Output

Create one findings document per candidate using [Findings Template](findings-template.md).

