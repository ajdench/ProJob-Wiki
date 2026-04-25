# Scoring Matrix

Scale: 1 = weak, 3 = acceptable, 5 = strong. Scores are initial research estimates and must be validated through proof-of-concept work.

| Option | ERP / quote-to-cash | Field jobs | Offline field | Scheduling | Resource / stock | Project dependencies | Extensibility | Overall |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [Odoo + OCA Field Service](../options/odoo-oca-field-service.md) | 5 | 5 | 2 | 4 | 5 | 3 | 5 | 4.1 |
| [ERPNext / Frappe](../options/erpnext-frappe.md) | 5 | 3 | 2 | 3 | 5 | 3 | 5 | 3.7 |
| [Dolibarr](../options/dolibarr.md) | 4 | 3 | 1 | 3 | 4 | 2 | 3 | 2.9 |
| [Atlas CMMS](../options/atlas-cmms.md) | 1 | 5 | 3 | 4 | 4 | 1 | 3 | 3.0 |
| [openMAINT](../options/openmaint.md) | 2 | 4 | 2 | 4 | 4 | 2 | 4 | 3.1 |
| [OpenProject](../options/openproject.md) | 1 | 2 | 1 | 5 | 2 | 5 | 4 | 2.9 |
| [Custom offline PWA](../options/offline-first-pwa-stack.md) | 2 | 5 | 5 | 4 | 4 | 4 | 5 | 4.1 |
| [KoboToolbox / ODK](../options/kobotoolbox-odk.md) | 1 | 3 | 5 | 1 | 1 | 1 | 3 | 2.1 |

## Interpretation

| Recommendation | Reason |
| --- | --- |
| Validate [Odoo/OCA](../options/odoo-oca-field-service.md) first | Best broad ERP/FSM fit and strongest field-service module coverage |
| Validate [ERPNext](../options/erpnext-frappe.md) second | Strong framework and ERP coherence; may be faster to customize |
| Build [offline PWA](../options/offline-first-pwa-stack.md) spike regardless | Offline field reliability is the hardest requirement and should be proven early |
| Use [OpenProject](../options/openproject.md) selectively | Strong for programme planning; not field execution |
| Use [Atlas](../options/atlas-cmms.md) / [openMAINT](../options/openmaint.md) as references | Useful work-order/asset/maintenance patterns, less complete quote-to-cash fit |

## Weighted Criteria for Next Pass

Use this weighting when testing with real workflows:

| Criterion | Weight |
| --- | ---: |
| Offline field reliability | 20% |
| Quote-to-cash fit | 15% |
| Job/work-order lifecycle | 15% |
| Scheduling/resource allocation | 10% |
| Stock/materials/tools | 10% |
| Cross-company permissions | 10% |
| Extensibility/API | 10% |
| Operational simplicity | 5% |
| License/commercial risk | 5% |
