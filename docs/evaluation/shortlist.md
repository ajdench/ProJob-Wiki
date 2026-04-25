# Recommended Shortlist

## First Round

Evaluate these first:

1. **[Odoo Community + OCA Field Service](../options/odoo-oca-field-service.md)**
2. **[ERPNext / Frappe](../options/erpnext-frappe.md)**
3. **[Custom offline-first PWA](../options/offline-first-pwa-stack.md)**

Why: the platform needs both broad business coverage and robust offline field execution. [Odoo/OCA](../options/odoo-oca-field-service.md) and [ERPNext](../options/erpnext-frappe.md) are the strongest open-source system-of-record candidates. A [custom PWA](../options/offline-first-pwa-stack.md) is likely unavoidable for the offline field experience.

## Second Round

Evaluate these if first-round gaps appear:

1. **[Dolibarr](../options/dolibarr.md)** as a simpler SME baseline.
2. **[Atlas CMMS](../options/atlas-cmms.md)** as a technician/work-order UX benchmark.
3. **[OpenProject](../options/openproject.md)** as the planning and dependency layer.
4. **[KoboToolbox/ODK](../options/kobotoolbox-odk.md)** as a checklist/forms subsystem.

## Likely Winning Pattern

The likely winning pattern is not a single product. It is:

- ERP/FSM core: [Odoo/OCA](../options/odoo-oca-field-service.md) or [ERPNext](../options/erpnext-frappe.md).
- Field execution: [custom offline-first PWA](../options/offline-first-pwa-stack.md).
- Planning layer: [OpenProject](../options/openproject.md) only if programme-level dependency planning is needed.
- Forms/checklists: native PWA checklists, with [ODK/Kobo](../options/kobotoolbox-odk.md) used only if survey-style forms dominate.

## Why Not One Big System?

The requirements cut across several product categories:

- ERP handles quote-to-cash and stock.
- Field-service handles dispatch and work completion.
- CMMS handles maintenance/assets.
- Project management handles cross-project dependencies.
- Offline-first PWA handles low-connectivity execution.

Open-source products tend to be strong in one or two of these areas, but weak in at least one critical area.
