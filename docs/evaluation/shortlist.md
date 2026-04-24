# Recommended Shortlist

## First Round

Evaluate these first:

1. **Odoo Community + OCA Field Service**
2. **ERPNext / Frappe**
3. **Custom offline-first PWA**

Why: the platform needs both broad business coverage and robust offline field execution. Odoo/OCA and ERPNext are the strongest open-source system-of-record candidates. A custom PWA is likely unavoidable for the offline field experience.

## Second Round

Evaluate these if first-round gaps appear:

1. **Dolibarr** as a simpler SME baseline.
2. **Atlas CMMS** as a technician/work-order UX benchmark.
3. **OpenProject** as the planning and dependency layer.
4. **KoboToolbox/ODK** as a checklist/forms subsystem.

## Likely Winning Pattern

The likely winning pattern is not a single product. It is:

- ERP/FSM core: Odoo/OCA or ERPNext.
- Field execution: custom offline-first PWA.
- Planning layer: OpenProject only if programme-level dependency planning is needed.
- Forms/checklists: native PWA checklists, with ODK/Kobo used only if survey-style forms dominate.

## Why Not One Big System?

The requirements cut across several product categories:

- ERP handles quote-to-cash and stock.
- Field-service handles dispatch and work completion.
- CMMS handles maintenance/assets.
- Project management handles cross-project dependencies.
- Offline-first PWA handles low-connectivity execution.

Open-source products tend to be strong in one or two of these areas, but weak in at least one critical area.

