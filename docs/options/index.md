# Options Overview

The options are grouped by the role they could play in the architecture.

## Suite Composition Distinction

The options below should not be interpreted as separate products that users would jump between all day. The target direction is a unified ProJob suite with common navigation, terminology, permissions, visual styling, and offline/sync behaviour.

Upstream products may contribute in three different ways:

| Contribution type | Meaning | Examples |
| --- | --- | --- |
| System of record | Owns authoritative business records behind the scenes | Odoo/OCA, ERPNext, Dolibarr |
| Specialist capability | Provides planning, CMMS, forms, or reporting patterns | OpenProject, Atlas CMMS, openMAINT, ODK/Kobo |
| Reference UX | Shows mature patterns that can inspire ProJob workflows | Gantt views, work-order views, mobile form widgets |

The screenshots on option pages are indicative references. They do not define the final ProJob UI. See [Suite Composition and Design](../architecture/suite-composition-and-design.md).

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
