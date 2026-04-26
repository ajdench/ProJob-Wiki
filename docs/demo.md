# ProJob UI Demo

The ProJob UI demo is published as a static GitHub Pages sub-app:

[Open the ProJob UI demo](https://ajdench.github.io/ProJob-Wiki/demo/projob-ui/)

## What It Demonstrates

The demo shows one ProJob React/shadcn interface over multiple source-shaped datasets:

- Odoo-shaped work orders, sites, materials, field completion, and supervisor review.
- OpenProject-shaped work packages, blockers, dependencies, and milestones.
- A combined mode that renders both through one ProJob dispatch, field, sync, and review surface.

## What Is Simulated

The public demo is static. It does not connect to a live Odoo, ERPNext, or OpenProject backend.

Instead, it bundles fixture data and adapter logic into the browser app. This proves whether records from different systems can be normalised into common ProJob terminology and visual patterns before live API work starts.

Simulated behaviours include:

- Offline/online mode.
- Checklist completion.
- Notes, evidence placeholders, signature placeholders, and material exceptions.
- Mutation queue states: pending, synced, failed, and conflict.
- Supervisor review and approval.

## What Is Not Yet Proved

- Live Odoo API authentication and record mapping.
- Live OpenProject API authentication and record mapping.
- Multi-user sync.
- Real file upload.
- Real IndexedDB/Dexie/RxDB/PouchDB/PowerSync persistence.
- Service worker installability.

The architecture boundary is documented in [Demo Architecture](architecture/demo-architecture.md).

See also [Demo Notes](demo-notes.md) for the current implementation boundary and what remains simulated.
