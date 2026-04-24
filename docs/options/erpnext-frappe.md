# ERPNext / Frappe

## Summary

ERPNext is a free/open-source ERP built on the Frappe Framework. It is a serious candidate for the system of record because it includes customers, sales, stock, projects, HR, support, maintenance visits, workflows, print formats, APIs, and customization tooling.

## Relevant Evidence

ERPNext's mobile page emphasizes responsive use across devices and API-first/customizable capabilities. ERPNext documentation also includes maintenance visits, where engineers visit customer premises for scheduled, unscheduled, or breakdown maintenance.

Sources:

- [ERPNext mobile](https://frappe.io/erpnext/mobile)
- [ERPNext Maintenance Visit documentation](https://docs.frappe.io/erpnext/user/manual/en/maintenance-visit)

## Functional Fit

| Area | Fit |
| --- | --- |
| Jobs / maintenance visits | Medium |
| Scheduling | Medium |
| Stock/materials | Strong |
| Quoting/sales | Strong |
| Invoicing/accounting | Strong |
| Projects/tasks | Medium |
| Custom workflows | Strong |
| Offline-first PWA | Weak to medium; requires dedicated design |

## Strengths

- Strong open-source ERP foundation.
- Frappe Framework is customization-friendly.
- Broad business coverage without needing many third-party modules.
- Good candidate if a custom app will be built on top of framework APIs.

## Gaps / Risks

- Field-service-specific flows may need more custom design than Odoo/OCA.
- Offline behavior is not a complete turnkey field execution solution.
- The maintenance model may be closer to equipment/service maintenance than general trades project work.

## Best Role

Use as a system-of-record candidate when customization velocity and framework coherence matter more than field-service module breadth.

## Proof-of-Concept Test

1. Model quote, sales order, project, task, maintenance visit, and stock movement.
2. Create custom checklist and evidence capture doctypes.
3. Build a small PWA page backed by Frappe APIs.
4. Validate offline queue approach with IndexedDB and retrying `frappe.call`-style mutations.

