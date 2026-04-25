# Application Suite Blueprint

Date: 2026-04-25

## Purpose

This page turns the current research direction into a practical app blueprint. It connects the [suite composition model](suite-composition-and-design.md), [component ownership map](component-map.md), [web stack architecture](web-stack-architecture.md), [offline sync model](offline-sync-model.md), and [UI framework options](ui-framework-options.md) into one product shape.

The intent is to keep ProJob from becoming a set of unrelated upstream tools. Users should experience one application suite, even when [ERP/FSM](component-map.md#suite-presentation-rule), [planning](../options/openproject.md), [forms](../options/kobotoolbox-odk.md), [file storage](deployment-runtime.md#future-product-runtime), and sync services own different parts of the data.

## Suite Shape

ProJob should be organised as role-aware workspaces inside one shared app shell.

| Workspace | Primary users | Main jobs to be done | Core records |
| --- | --- | --- | --- |
| Field | Tradespeople, subcontractors | Open assigned work, complete checklists, record time/materials, capture evidence, queue offline changes | Job, checklist response, evidence, time entry, material usage, sync mutation |
| Supervisor | Supervisors, contract managers | Review completed work, handle exceptions, approve evidence, raise variations, unblock field teams | Job, review item, variation request, blocker, evidence |
| Scheduling | Schedulers, supervisors | Assign jobs, people, crews, skills, vehicles, dates, dependencies, and planned materials | Job, assignment, resource, calendar slot, dependency |
| Estimating | Estimators, managers | Build quotes, approve variations, hand accepted work to operations | Customer, site, quote, quote line, variation, approval |
| Resources | Stores, supervisors, admins | Track people, skills, vehicles, tools, equipment, material availability, and stock movements | Person, skill, vehicle, tool, equipment, material, stock move |
| Projects | Project managers | See cross-project dependencies, blockers, milestones, risks, and external commitments | Project, milestone, dependency, blocker, subcontractor task |
| Portal | Clients, subcontractors | See scoped status, documents, approvals, evidence, and comments | Project, job, document, approval, comment |
| Admin | Internal admins | Configure templates, roles, integrations, mappings, and audit exports | Template, role, permission scope, adapter mapping, audit event |

## Shared App Shell

Every workspace should use the same application shell and visual language.

| Shell element | Mobile behaviour | Tablet behaviour | Desktop behaviour |
| --- | --- | --- | --- |
| Navigation | Bottom navigation or compact task switcher for Field, Jobs, Evidence, Queue | Split navigation with current job/review context | Sidebar plus top filters, search, workspace switcher |
| Identity/context | Current user, company, project/site, sync state | User, role, selected project/site | User, role, company/project scope, saved views |
| Offline status | Persistent banner and queue access | Banner plus conflict/retry summary | Queue, conflict review, last-known device state |
| Search/filter | Minimal search and quick filters | Context filters plus status chips | Saved filters, table filters, bulk actions |
| Notifications | Blocking only for safety/sync-critical states | Review and exception notifications | Queues, approvals, dependency warnings |

This shell is a ProJob-owned product component. It may use [shadcn/ui](ui-framework-options.md) primitives, but it should not expose raw upstream product navigation.

## Workflow To Screen Map

| Workflow | Field screen | Office/supervisor screen | Backend owner |
| --- | --- | --- | --- |
| Quote to job | Variation request only | Quote builder, approval, quote-to-job handoff | [ERP/FSM core](component-map.md#suite-presentation-rule) |
| Job assignment | Today's jobs, job detail | Scheduler board/calendar/table | [ERP/FSM core](component-map.md#suite-presentation-rule), scheduler service if introduced |
| Checklist execution | Checklist, required evidence, pass/fail/N/A, signature | Template admin, review exceptions | [Field PWA](../options/offline-first-pwa-stack.md), [Sync API](integration-contracts.md#field-mutation-api), ERP evidence link |
| Evidence capture | Photos, signatures, documents, notes | Evidence review, audit trail, export | [Attachment service](integration-contracts.md#attachment-contract), ERP/FSM business link |
| Time/materials | Time entry, material use, return/shortage note | Timesheet/material review, invoice-ready records | Field PWA queue, ERP/FSM stock and timesheet records |
| Scheduling | Read-only assignment and site timing | Calendar, board, crew/vehicle assignment | ERP/FSM or scheduler service |
| Dependencies/blockers | Raise blocker, see current site blockers | Dependency board, programme impact, subcontractor task status | [Planning layer](../options/openproject.md) if needed |
| Resource management | Assigned vehicle/tools/materials | Resource availability, skills, stock, equipment | ERP/FSM, CMMS only if asset depth requires it |
| Sync/conflicts | Sync queue, retry, conflict prompt | Conflict review, device state, audit event | [Sync API](integration-contracts.md#field-mutation-api) |

## Data Objects

The first application model should stay small enough to test end to end.

| Object | Why it matters | Early fields |
| --- | --- | --- |
| Customer | Commercial parent record | Name, contacts, billing status |
| Site | Field location and document scope | Address, access notes, hazards, documents |
| Project | Groups work and dependencies | Name, owner, client, status, milestones |
| Job | Central operational unit | Title, site, schedule, assignee, status, priority |
| Checklist template | Repeatable work standard | Version, sections, required evidence, trade |
| Checklist response | Offline field execution result | Job, answers, completion, failures, device/user metadata |
| Evidence | Audit and proof | Type, file, checksum, linked job/checklist, captured-at |
| Resource | People, vehicles, tools, equipment | Type, skills/capacity, availability, assigned job |
| Material | Planned and used stock | SKU/name, planned qty, used qty, exception |
| Quote/variation | Commercial change control | Lines, approvals, source job, status |
| Dependency/blocker | Cross-work coordination | Predecessor, successor, owner, due date, impact |
| Sync mutation | Offline write envelope | Mutation id, entity, operation, payload, retry/conflict state |

These objects should be kept aligned with [Integration Contracts](integration-contracts.md) before a deeper data model is created.

## Component Pattern Map

The shadcn MCP confirms this repo is configured for the `@shadcn` registry. It also exposes table/data-table and form/RHF examples that fit the ProJob office and checklist surfaces.

| ProJob component | Suggested primitive/tool base | Notes |
| --- | --- | --- |
| App shell | shadcn sidebar/sheet/dialog primitives plus ProJob layout wrappers | Own navigation, role scope, and sync status in ProJob code |
| Job card | ProJob component over shadcn card/badge/button | Status, priority, site, time, offline hints must be consistent |
| Checklist row | shadcn checkbox/form controls plus React Hook Form/Zod | Save-as-you-go, required evidence, and conflict state are ProJob behaviours |
| Evidence panel | shadcn card/dialog/sheet plus custom upload/capture controls | Must show checksum/sync/audit metadata once available |
| Sync queue | shadcn sheet/alert/badge/progress | Needs retry, failed, pending, synced, and conflict variants |
| Review queue | shadcn tabs/card/badge/button, later TanStack Table | Start with cards; add dense table once real review volume exists |
| Scheduler board | dnd kit plus ProJob cards | Drag/drop needs touch and keyboard testing |
| Scheduler table | TanStack Table plus ProJob cells/filters | Better than generic tables for dense desktop work |
| Form builder/admin | shadcn form controls, React Hook Form, Zod | Template versioning matters more than visual polish |
| Dependency view | ProJob board/table first, React Flow later | Defer graph UI until dependency complexity is proven |

## First Vertical Slice

The next implementation slice should prove one complete offline-first loop:

1. Office assigns a job with a checklist and planned materials.
2. Field user opens the job on mobile while online.
3. Field user goes offline.
4. Field user completes checklist answers, notes, material usage, time, photo, and signature.
5. Field user marks job complete offline.
6. Sync queue records pending mutations and evidence uploads.
7. Network returns and sync applies idempotently.
8. Supervisor reviews completion, evidence, and material exceptions.
9. Supervisor raises a variation or approves invoice-ready completion.

This slice has started in the existing [UI framework spike](../poc/findings/ui-framework-spike.md) with mocked `localStorage` persistence, offline mode, mutation queue states, sync, supervisor review, and approval. The [offline PWA test plan](../poc/offline-pwa-test-plan.md) remains the reliability test once a real local database and sync engine are selected.

## Decision Records Needed

Add ADRs when evidence supports them:

| ADR | Trigger |
| --- | --- |
| Frontend framework | The React/shadcn spike proves or fails mobile, tablet, and desktop fit |
| Local database | PouchDB/CouchDB, RxDB, Dexie, or PowerSync is selected for the offline PWA |
| Sync model | Idempotency, conflict handling, and attachment flow are proven |
| ERP/FSM core | Odoo/OCA or ERPNext wins the common test scenario |
| Planning layer | OpenProject or a lighter native dependency model is justified |
| PWA versus native wrapper | Browser PWA proves enough, or packaging requires Capacitor/Tauri/native shell |

## Immediate Build Plan

| Step | Output |
| --- | --- |
| 1 | Extend [`experiments/projob-ui-spike`](https://github.com/ajdench/ProJob-Wiki/tree/main/experiments/projob-ui-spike) into the first vertical slice prototype: started with mocked state |
| 2 | Add fake local persistence and a visible mutation queue before connecting to a backend: started with `localStorage` and pending/synced/failed/conflict queue states |
| 3 | Add a supervisor review workspace that consumes the synced field result: started with review and approval states |
| 4 | Create ADR drafts for frontend framework, local database, and sync model |
| 5 | Run `make check`, browser-test phone/tablet/desktop flows, and record findings under [POC Findings](../poc/findings/index.md) |

## Open Questions

These should be answered by POC evidence rather than opinion:

- Can the same ProJob component system stay ergonomic on phone, tablet, and dense desktop screens?
- Does Odoo/OCA or ERPNext expose cleaner APIs for jobs, time, materials, stock, attachments, and variations?
- Is the field sync model better served by document replication, SQL-style local-first sync, or a custom mutation queue?
- How much project dependency logic belongs in ProJob before a dedicated planning layer is justified?
- Which roles need native upstream admin screens, and which must always use ProJob-native workflows?
