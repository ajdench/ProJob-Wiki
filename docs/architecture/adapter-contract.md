# Adapter Contract

Date: 2026-04-26

## Purpose

This page records the first code-level contract for presenting Odoo-style ERP/FSM data and OpenProject-style planning data through one ProJob UI.

The public [ProJob UI Demo](../demo.md) still uses static fixtures. The important step is that the fixtures now sit behind adapter modules with the same shape a live backend adapter should expose later.

## Current Code Shape

| File | Responsibility |
| --- | --- |
| [`src/adapters/projob.ts`](https://github.com/ajdench/ProJob-Wiki/blob/main/experiments/projob-ui-spike/src/adapters/projob.ts) | Canonical ProJob types, source mode selection, fixture aggregation, job-to-dispatch mapping, queue helpers |
| [`src/adapters/odoo-fixture.ts`](https://github.com/ajdench/ProJob-Wiki/blob/main/experiments/projob-ui-spike/src/adapters/odoo-fixture.ts) | Odoo-shaped field-service work order fixtures |
| [`src/adapters/openproject-fixture.ts`](https://github.com/ajdench/ProJob-Wiki/blob/main/experiments/projob-ui-spike/src/adapters/openproject-fixture.ts) | OpenProject-shaped work package, blocker, dependency, and milestone fixtures |
| [`src/adapters/odoo-live.ts`](https://github.com/ajdench/ProJob-Wiki/blob/main/experiments/projob-ui-spike/src/adapters/odoo-live.ts) | Local live Odoo adapter stub for future API work |

## Canonical Records

The React UI should consume canonical ProJob records, not raw Odoo/OpenProject records.

| Canonical record | Purpose | Current consumer |
| --- | --- | --- |
| `FieldJob` | Field execution unit with checklist, evidence, material, note, signature, and source metadata | Field mobile panel, evidence panel, supervisor review |
| `DispatchJob` | Office/scheduler summary record | Dispatch board, schedule table, route/dependency detail |
| `QueueEntry` | Local mutation and sync status | Sync banner, sync queue sheet |
| `PersistedState` | Browser demo state | Demo state boot/reset/source switching |

## Source Mode Contract

The public demo currently supports:

| Source mode | Fixture source | Meaning |
| --- | --- | --- |
| `combined` | Odoo-shaped plus OpenProject-shaped fixtures | Shows one ProJob surface over ERP/FSM and planning records |
| `odoo` | Odoo-shaped fixtures only | Shows ERP/FSM work order, material, and review data |
| `openproject` | OpenProject-shaped fixtures only | Shows planning work package, dependency, blocker, and milestone data |

Each source mode must return:

- One primary `FieldJob`.
- Zero or more additional `DispatchJob` records.
- Source labels visible in the UI so demo users can see what each record represents.

## Live Odoo Stub

The live Odoo stub is intentionally not connected yet. It defines the shape of the next local API test:

```ts
type OdooLiveAdapter = {
  listWorkOrders: () => Promise<DispatchJob[]>
  getWorkOrder: (id: string) => Promise<FieldJob | null>
  pushFieldCompletion: (mutation: FieldCompletionMutation) => Promise<{ remoteId: string; status: 'accepted' }>
}
```

The first live test should run locally against the [Odoo/OCA compose stack](../poc/odoo-oca-test-plan.md), not from GitHub Pages. A local adapter or proxy will be needed for authentication, CORS, and record mapping.

## Mapping Rule

Adapters should translate source terms into ProJob terms before records reach UI components.

| Source concept | ProJob concept |
| --- | --- |
| Odoo field service order / task | `FieldJob` or `DispatchJob` |
| Odoo customer location | Site |
| Odoo material/stock move | Material usage or material exception |
| Odoo timesheet | Time entry |
| Odoo attachment | Evidence |
| OpenProject work package | Dependency task or project task |
| OpenProject milestone | Project milestone |
| OpenProject relation | Dependency/blocker |

## Static Versus Live

| Mode | Where it runs | What it proves |
| --- | --- | --- |
| Fixture adapter | GitHub Pages | ProJob UI can cohere multiple source-shaped records into one interface |
| Live local adapter | Local browser plus local backend/proxy | Odoo/OpenProject API data can be mapped into the same canonical records |
| Production adapter | Hosted app/API layer | Authenticated, scoped, audited multi-user integration |

The next proof should connect the `odoo-live.ts` stub to the local Odoo/OCA stack and record which Odoo objects cleanly map to the current `FieldJob` and `DispatchJob` shapes.
