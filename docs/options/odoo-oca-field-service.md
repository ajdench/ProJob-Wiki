# Odoo Community + OCA Field Service

## Summary

Odoo Community plus the Odoo Community Association field-service modules is one of the strongest open-source candidates for a broad field-service and trades business platform. It has the most complete coverage of sales, CRM, stock, invoicing links, field-service orders, routes, skills, vehicles, agreements, and timesheets among the researched options.

## Why It Matters

The [OCA field-service repository](https://github.com/OCA/field-service) includes modules for:

- Field service orders, workers, and locations.
- Activities/checklists/actions on service orders.
- Agreements and recurring field service.
- Calendar, routes, availability, skills, and vehicles.
- CRM, sale, sale stock, stock, repair, timesheet, account, and project integration.

## Functional Fit

| Area | Fit |
| --- | --- |
| Jobs / work orders | Strong |
| Scheduling / routes | Medium to strong |
| Skills / workers / vehicles | Strong |
| Stock/materials | Strong via Odoo stock and OCA modules |
| Quoting/sales | Strong |
| Invoicing | Strong |
| Cross-company/project dependencies | Medium; likely customization required |
| Checklists/evidence/photos | Medium; likely customization required |
| Offline-first PWA | Weak out of the box |

## Strengths

- Large ecosystem and extensive business modules.
- OCA modules are directly aligned with field-service operations.
- Good candidate for system-of-record responsibilities.
- Good extensibility for custom modules and portals.

## Gaps / Risks

- Odoo Community's mobile/offline field execution should not be assumed sufficient.
- Version compatibility across Odoo and OCA modules needs proof-of-concept testing.
- Odoo customization can become expensive if business processes are not kept disciplined.
- Cross-company tenancy and subcontractor permissions require careful design.

## Best Role

Use as the back-office ERP/FSM core. Pair with a custom offline-first PWA for field execution.

## Proof-of-Concept Test

1. Install Odoo Community 18 and OCA field-service modules.
2. Model one customer, one site, three tradespeople, one vehicle, one stock location, one subcontractor.
3. Create quote, convert to service order, assign worker, consume materials, log timesheet, complete work, invoice.
4. Test portal/subcontractor visibility.
5. Identify what must be exposed through a dedicated offline PWA API.

