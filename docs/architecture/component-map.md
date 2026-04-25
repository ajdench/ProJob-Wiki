# Component Map

## Purpose

This page maps proposed product capabilities to the component that should own them. It is a guardrail against building every feature directly into the field PWA or overloading the ERP with offline behavior it is not designed to handle.

This map describes ownership of records and capabilities. It does not imply the user should see each upstream component's native interface. The preferred final shape is a unified ProJob suite UI over these capabilities; see [Suite Composition and Design](suite-composition-and-design.md) and [Application Suite Blueprint](application-suite-blueprint.md).

## Component Responsibilities

| Capability | Primary owner | Supporting component | Notes |
| --- | --- | --- | --- |
| Customer records | [ERP/FSM core](#suite-presentation-rule) | [Application API](integration-contracts.md#erp-adapter-contract) | Commercial source of truth |
| Sites/locations | [ERP/FSM core](#suite-presentation-rule) | [Field PWA](../options/offline-first-pwa-stack.md) read model | Field users need cached site summaries |
| Quotes/proposals | [ERP/FSM core](#suite-presentation-rule) | [Office web app](suite-composition-and-design.md#recommended-suite-surfaces) | Field app may raise variation requests, not final commercial documents |
| Jobs/work orders | [ERP/FSM core](#suite-presentation-rule) | [Field PWA](../options/offline-first-pwa-stack.md), [Sync API](integration-contracts.md#field-mutation-api) | ERP owns authoritative job; PWA owns local execution state while offline |
| Checklist templates | [ERP/FSM core](#suite-presentation-rule) or [app admin](suite-composition-and-design.md#recommended-suite-surfaces) | [Field PWA](../options/offline-first-pwa-stack.md) cache | Templates should be versioned |
| Checklist responses | [Field PWA](../options/offline-first-pwa-stack.md) then [Sync API](integration-contracts.md#field-mutation-api) | [ERP/FSM](#suite-presentation-rule) evidence record | Preserve history and conflicts |
| Photos/signatures | [Field PWA](../options/offline-first-pwa-stack.md) capture | [Attachment service](integration-contracts.md#attachment-contract), [ERP links](integration-contracts.md#erp-adapter-contract) | Append-only with checksums |
| Time entries | [Field PWA](../options/offline-first-pwa-stack.md) then [Sync API](integration-contracts.md#field-mutation-api) | [ERP/FSM](#suite-presentation-rule) timesheets | Corrections should be audited |
| Material usage | [Field PWA](../options/offline-first-pwa-stack.md) then [Sync API](integration-contracts.md#field-mutation-api) | [ERP/FSM](#suite-presentation-rule) stock moves | Avoid direct offline stock mutation |
| Vehicle/tool stock | [ERP/FSM core](#suite-presentation-rule) | [Field PWA](../options/offline-first-pwa-stack.md) cache | Device may hold a scoped stock view |
| Scheduling | [ERP/FSM](#suite-presentation-rule) or scheduler service | [Office web app](suite-composition-and-design.md#recommended-suite-surfaces) | Depends on ERP selected |
| Cross-project dependencies | [Planning layer](../options/openproject.md) | [Office web app](suite-composition-and-design.md#recommended-suite-surfaces), [ERP links](integration-contracts.md#planning-adapter-contract) | OpenProject-style ownership if needed |
| Subcontractor visibility | [Permission service](permissions-and-tenancy.md) / ERP portal | [Field PWA](../options/offline-first-pwa-stack.md) | Must be scoped by company/project/job |
| Reports/dashboards | [Reporting projections](deployment-runtime.md#stage-3-programme-and-reporting-layer) | [ERP/FSM](#suite-presentation-rule), [planning layer](../options/openproject.md) | Avoid heavy reporting queries against mobile sync API |
| Documents/drawings | [Document store](deployment-runtime.md#future-product-runtime) | [Field PWA](../options/offline-first-pwa-stack.md) cache, [ERP links](integration-contracts.md#erp-adapter-contract) | Needs versioning and expiry |
| Notifications | [Application API](integration-contracts.md) | Email/SMS/push provider | Should reference canonical records |
| Audit trail | [Sync API](integration-contracts.md#field-mutation-api) + [ERP/FSM](#suite-presentation-rule) | [Reporting](deployment-runtime.md#stage-3-programme-and-reporting-layer) | Every offline mutation needs traceability |

## Capability Boundaries

### Field PWA Should Own

- Local job execution UX.
- Offline queue and local read model.
- Checklist and evidence capture.
- Visible sync states.
- Safe retry behavior.

### Field PWA Should Not Own

- Final invoice state.
- Customer master records.
- Global stock truth.
- Cross-company commercial access rules.
- Long-term reporting data model.

### ERP/FSM Core Should Own

- Commercial records.
- Authoritative jobs/work orders.
- Stock, timesheets, and invoice-ready records.
- Audited approvals.

### Sync API Should Own

- Idempotency.
- Conflict detection.
- Field mutation validation.
- Attachment metadata processing.
- ERP adapter calls.

## MVP Component Set

The smallest credible MVP component set is the [Field PWA](../options/offline-first-pwa-stack.md), [Sync API](integration-contracts.md#field-mutation-api), [ERP/FSM core](#suite-presentation-rule), [file storage](deployment-runtime.md#future-product-runtime), [office workspace](suite-composition-and-design.md#recommended-suite-surfaces), and basic reporting:

```mermaid
flowchart LR
  Field["Field PWA"] --> Sync["Sync API"]
  Sync --> ERP["ERP/FSM core"]
  Sync --> Files["File storage"]
  Office["Office web app"] --> ERP
  ERP --> Reports["Basic reports"]
```

Do not add [OpenProject](../options/openproject.md), separate BI, route optimization, or complex subcontractor portals until the core [offline job workflow](../poc/offline-pwa-test-plan.md) is proven.

The first end-to-end product slice is defined in [Application Suite Blueprint](application-suite-blueprint.md#first-vertical-slice).

## Suite Presentation Rule

| Component | User-facing presentation |
| --- | --- |
| [ERP/FSM core](../options/odoo-oca-field-service.md) | Mostly hidden behind ProJob office/admin workflows; native admin UI acceptable for specialist configuration |
| [Field PWA](../options/offline-first-pwa-stack.md) | Fully ProJob-native UI |
| [Sync API](integration-contracts.md#field-mutation-api) | Not directly visible except through sync state, queue, and conflict review UI |
| [Planning layer](../options/openproject.md) | Prefer ProJob project/dependency views; native OpenProject UI acceptable for programme admins |
| [Forms/checklist engine](../options/kobotoolbox-odk.md) | ProJob-native checklist UI for field users; upstream form builder can be admin-only if used |
| [CMMS/asset system](../options/atlas-cmms.md) | ProJob resource/asset summaries for everyday users; native CMMS UI only for asset administrators |
| [File storage](deployment-runtime.md#future-product-runtime) | ProJob evidence/document UI; raw storage UI hidden |

## Component Selection Rule

When deciding where a new feature belongs:

1. If it must work offline during site work, it belongs in the [Field PWA](../options/offline-first-pwa-stack.md) and [Sync API](integration-contracts.md#field-mutation-api).
2. If it affects money, stock, or legal/audit state, [ERP/FSM](../options/odoo-oca-field-service.md) must own the authoritative record.
3. If it is about programme dependencies across jobs/projects, the [planning layer](../options/openproject.md) owns it.
4. If it is a derived view, reporting owns it.
5. If it is a file or photo, [object/document storage](deployment-runtime.md#future-product-runtime) owns the bytes and [ERP/FSM](../options/odoo-oca-field-service.md) owns the business link.
