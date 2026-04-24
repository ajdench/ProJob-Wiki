# Product Requirements

## Operating Assumptions

- Field users may have intermittent or no connectivity for a full site visit.
- Phones are primary field devices; tablets and laptops are secondary.
- Office/admin users need richer planning, quoting, reporting, and approval views.
- Work may involve internal staff, subcontractors, suppliers, clients, and multiple legal entities.
- The platform should support both small trades businesses and multi-company project coordination.

## User Groups

| User | Needs |
| --- | --- |
| Tradesperson | Today's jobs, checklists, drawings/docs, time, materials, photos, notes, signatures, offline access |
| Supervisor | Allocate jobs, review evidence, approve variations, monitor blockers and dependencies |
| Scheduler | Availability, skills, travel/route hints, job duration, dependencies, conflicts |
| Estimator | Quotes, templates, line items, costs, margins, alternates, approvals |
| Project manager | Cross-project dependencies, programme, risks, resource conflicts, subcontractor progress |
| Stock / stores | Materials, tool issue/return, vehicle stock, purchase requests, reorder levels |
| Client / external party | Requests, approvals, shared job status, documents, evidence, invoices |
| Admin / finance | Customers, suppliers, invoices, POs, timesheets, payroll/export, audit trail |

## Core Functional Requirements

| Area | Requirement |
| --- | --- |
| Jobs / work orders | Create, assign, schedule, status-track, complete, reopen, and audit work |
| Checklists | Template checklists per trade/job type; required evidence; pass/fail/N/A; signatures |
| Offline | Field users can open assigned work, edit forms, attach evidence, and queue changes offline |
| Sync | Conflict handling, retry queue, visible pending state, server-side audit log |
| Quoting | Estimate, proposal, line items, alternates, variation quotes, approval workflow |
| Scheduling | Calendar, job duration, technician assignment, crew assignment, recurring work |
| Dependencies | Internal and external predecessor/successor relationships; blocker visibility |
| Resource management | People, skills, availability, vehicles, tools, equipment, materials, stock |
| Stock/materials | Planned materials, actual usage, vehicle stock, requisitions, purchase orders |
| Documents | Site docs, drawings, method statements, risk assessments, versioned attachments |
| Evidence | Photos, notes, GPS/time metadata where appropriate, customer signatures |
| Collaboration | Comments, mentions, external portal, subcontractor-scoped access |
| Reporting | Job status, work in progress, overdue tasks, cost-to-complete, resource load |
| Permissions | Role-based access, company/project scoping, subcontractor isolation |
| API | Integration with accounting, email, calendar, maps, storage, and reporting tools |

## Non-Functional Requirements

| Area | Requirement |
| --- | --- |
| Offline-first | Local database is the field UI source of truth while offline |
| Mobile UX | One-handed, low cognitive load, resilient to interruption |
| Auditability | Every state transition and sync action should be traceable |
| Security | Per-company and per-project tenancy boundaries; least-privilege access |
| Extensibility | Custom fields, workflow types, checklist templates, and integration hooks |
| Deployability | Self-hostable; Docker preferred; avoid hard SaaS dependencies for core data |
| Licenses | Prefer OSI-approved open-source licenses; identify open-core or source-available gaps |
| Data export | Full export path for projects, jobs, customers, stock, documents, and audit logs |

## Offline Acceptance Criteria

- A worker can start the PWA with no network and see previously assigned jobs.
- A worker can complete a checklist, add notes, add photos, consume materials, and capture a signature offline.
- The UI clearly shows unsynced changes and failed retries.
- Sync is idempotent: repeated uploads do not duplicate job records, photos, stock movements, or timesheets.
- Conflicts produce a reviewable state instead of silent overwrite.
- The office view can see sync status and last-known device state.

