# Options Overview

The options are grouped by the role they could play in the architecture.

## Back-Office / ERP Candidates

| Option | Best fit | Main concern |
| --- | --- | --- |
| Odoo Community + OCA Field Service | Broad ERP/FSM suite with mature extension ecosystem | Offline field experience likely needs custom PWA |
| ERPNext / Frappe | Open-source ERP with strong customization framework | Offline field execution is not clearly solved out of the box |
| Dolibarr | Simple SME ERP/CRM baseline | Less field-service depth and less sophisticated project/resource planning |

## Field / Maintenance Candidates

| Option | Best fit | Main concern |
| --- | --- | --- |
| Atlas CMMS | Work orders, preventive maintenance, mobile CMMS, parts inventory | Verify license boundaries and offline behavior in self-hosted edition |
| openMAINT | Facility/asset maintenance, work orders, asset movements, economic workflows | Heavier enterprise/facility orientation; may be too asset-centric |

## Planning / Coordination Candidates

| Option | Best fit | Main concern |
| --- | --- | --- |
| OpenProject | Cross-project planning, Gantt, work packages, wiki, time/cost tracking | Not a field execution/offline tool |
| Vikunja | Lightweight tasks with Kanban/Gantt/table views | Too lightweight for ERP/FSM; offline support varies by client |
| ProjectLibre | MS Project-style planning | Desktop/cloud split; less suitable as operational platform |

## Offline App Foundation

| Option | Best fit | Main concern |
| --- | --- | --- |
| PouchDB + CouchDB | Mature open-source offline replication | Document model and conflict handling need careful design |
| RxDB | Modern local database, reactive UI, sync flexibility | Some advanced features/commercial boundaries should be checked |
| Dexie.js + custom sync | Maximum control, simple IndexedDB abstraction | More custom engineering and sync correctness burden |
| ElectricSQL | Postgres-centered local-first sync | Write model and maturity need validation for field workflows |
| PowerSync | Strong offline write queue and local SQLite model | Check open-source/open-core constraints before committing |

