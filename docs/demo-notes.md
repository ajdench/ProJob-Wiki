# Demo Notes

The ProJob demo is a static GitHub Pages application. It is designed to show the product direction and record-mapping approach before live backend integration work starts.

## What Is Real

- The demo is a React, TypeScript, shadcn/ui, and Vite app.
- It is built into the MkDocs GitHub Pages artifact under `/demo/projob-ui/`.
- It uses local browser state to persist demo progress between refreshes.
- It presents one shared ProJob UI over Odoo-shaped and OpenProject-shaped fixture records.
- It includes an interactive scenario runner for quote, DNO, install, offline commissioning, handover review, and approval.

## What Is Simulated

- Odoo quotation, FSM, stock, time, survey, and MCS records are fixture data.
- OpenProject work package, DNO dependency, blocker, and milestone records are fixture data.
- Offline mode, sync queue states, evidence capture, signatures, and approvals are browser-side simulations.
- The adapter map shows the intended canonical model but does not yet call external APIs.

## What Is Not Yet Implemented

- Live Odoo or OCA Field Service API authentication.
- Live OpenProject API authentication.
- ERPNext/Frappe backend integration.
- Real file upload or photo storage.
- IndexedDB, Dexie, RxDB, PouchDB, PowerSync, or service-worker-backed offline persistence.
- Multi-user conflict resolution.
- Tenant permissions or cross-company sharing.

## Current Use

Use the demo to validate whether the shared ProJob language and screen structure make sense for UK solar PV, BESS/HESS, DNO, MCS, and handover workflows.

Use the wiki architecture pages to decide what must be proved next with real adapters and offline storage.
