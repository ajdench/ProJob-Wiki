# Dolibarr

## Summary

Dolibarr is a simpler open-source ERP/CRM suite for SMEs, freelancers, and associations. It is a useful baseline for smaller trades businesses because it includes proposals, orders, contracts, stock, projects, tasks, interventions, agenda, billing, and APIs.

Sources:

- [Dolibarr official site](https://www.dolibarr.org/)
- [Dolibarr Projects module](https://wiki.dolibarr.org/index.php/Projects)

## Functional Fit

| Area | Fit |
| --- | --- |
| Customers/prospects | Strong |
| Proposals/quotes | Strong |
| Orders/invoices | Strong |
| Projects/tasks | Medium |
| Interventions | Medium |
| Stock/products/services | Medium to strong |
| Scheduling/agenda | Medium |
| Offline-first PWA | Weak |
| Cross-company dependencies | Weak to medium |

## Strengths

- Easier to understand and operate than heavyweight ERP systems.
- Modular feature activation.
- Good SME fit for quote/order/invoice/project basics.
- API and add-on ecosystem.

## Gaps / Risks

- Less field-service depth than Odoo/OCA.
- Offline-first field execution likely requires custom PWA.
- Advanced scheduling, route planning, resource load, and dependency management are likely limited.

## Best Role

Use as a lower-complexity benchmark and possible core for small companies with straightforward workflows.

## Proof-of-Concept Test

1. Create customer, project, proposal, intervention, stock item, invoice.
2. Attach intervention and documents to a project.
3. Test custom fields and API access for a field PWA.
4. Compare admin simplicity against feature gaps.

