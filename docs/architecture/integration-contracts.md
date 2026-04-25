# Integration Contracts

## Purpose

This page defines the first-pass contracts between the [offline field PWA](../options/offline-first-pwa-stack.md), [Sync API](#field-mutation-api), [ERP/FSM core](component-map.md#suite-presentation-rule), [file storage](deployment-runtime.md#future-product-runtime), and [planning layer](../options/openproject.md). These contracts are deliberately canonical so they can survive the [Odoo](../options/odoo-oca-field-service.md) vs [ERPNext](../options/erpnext-frappe.md) decision.

## Contract Principle

The field app should not be tightly coupled to the selected ERP's internal tables. It should exchange canonical records and mutations with a [Sync API](#field-mutation-api). The [ERP adapter](#erp-adapter-contract) then maps those records to [Odoo/OCA](../options/odoo-oca-field-service.md), [ERPNext](../options/erpnext-frappe.md), or another system.

## Canonical Entity Set

| Entity | Purpose | Authoritative owner |
| --- | --- | --- |
| `tenant` | Top-level deployment/customer boundary | Platform |
| `company` | Internal company, subcontractor, supplier, client | [ERP/FSM](component-map.md#suite-presentation-rule) |
| `user` | Human account | Identity provider / [ERP](component-map.md#suite-presentation-rule) |
| `project` | Commercial/project grouping | [ERP/FSM](component-map.md#suite-presentation-rule) or [planning layer](../options/openproject.md) |
| `site` | Physical location | [ERP/FSM](component-map.md#suite-presentation-rule) |
| `job` | Work order / field task | [ERP/FSM](component-map.md#suite-presentation-rule) |
| `job_assignment` | Worker/crew/vehicle schedule | [ERP/FSM](component-map.md#suite-presentation-rule) or scheduler |
| `checklist_template` | Versioned field form | [ERP/FSM](component-map.md#suite-presentation-rule) or app admin |
| `checklist_response` | Completed checklist instance | [Sync API](#field-mutation-api) -> [ERP/FSM](component-map.md#suite-presentation-rule) |
| `time_entry` | Labour time | [Sync API](#field-mutation-api) -> [ERP/FSM](component-map.md#suite-presentation-rule) |
| `material_usage` | Material consumed/returned | [Sync API](#field-mutation-api) -> [ERP/FSM](component-map.md#suite-presentation-rule) |
| `attachment` | Photo, signature, drawing, PDF | [File storage](deployment-runtime.md#future-product-runtime) + [ERP link](#erp-adapter-contract) |
| `variation_request` | Field-raised commercial change | [ERP/FSM](component-map.md#suite-presentation-rule) |
| `dependency` | Cross-job/project blocker | [Planning layer](../options/openproject.md) or [ERP/FSM](component-map.md#suite-presentation-rule) |
| `sync_mutation` | Offline write envelope | [Sync API](#field-mutation-api) |

## Field Read API

The [field PWA](../options/offline-first-pwa-stack.md) needs a scoped download/read API:

```http
GET /sync/bootstrap?device_id=...&since=...
GET /field/jobs?assigned_to=me&window=today-plus-14
GET /field/jobs/{job_id}
GET /field/checklist-templates?job_type=...
GET /field/documents?job_id=...
GET /field/catalog/materials?scope=vehicle-or-company
```

The response should be a compact read model, not the [ERP](component-map.md#suite-presentation-rule)'s raw schema.

## Field Mutation API

Every field write should pass through an idempotent mutation endpoint:

```http
POST /sync/mutations
```

Example envelope:

```json
{
  "mutation_id": "device-generated-uuid",
  "device_id": "device-uuid",
  "user_id": "user-id",
  "tenant_id": "tenant-id",
  "base_version": "server-version-seen-by-client",
  "entity_type": "material_usage",
  "entity_id": "local-or-server-id",
  "operation": "append",
  "payload": {
    "job_id": "job-123",
    "sku": "CU-18WAY",
    "quantity": 1,
    "unit": "each"
  },
  "created_at": "2026-04-25T09:00:00Z"
}
```

Expected server response:

```json
{
  "mutation_id": "device-generated-uuid",
  "status": "accepted",
  "server_entity_id": "matuse-456",
  "server_version": "v17",
  "applied_at": "2026-04-25T09:03:12Z"
}
```

## Attachment Contract

[Attachments](#attachment-contract) should be uploaded separately from structured field mutations.

```mermaid
sequenceDiagram
  participant PWA as Field PWA
  participant Sync as Sync API
  participant Store as Object Storage
  participant ERP as ERP/FSM

  PWA->>Sync: create attachment metadata
  Sync-->>PWA: upload URL / upload token
  PWA->>Store: upload bytes with checksum
  PWA->>Sync: complete attachment upload
  Sync->>ERP: link attachment to job/checklist
```

Required metadata:

- `attachment_id`
- `client_attachment_id`
- `job_id`
- `entity_type`
- `entity_id`
- `filename`
- `media_type`
- `size_bytes`
- `checksum`
- `captured_at`
- `captured_by`
- `sync_state`

## ERP Adapter Contract

The [ERP adapter](#erp-adapter-contract) should expose stable methods to the [Sync API](#field-mutation-api):

| Method | Purpose |
| --- | --- |
| `getAssignedJobs(user, window)` | Build field job read model |
| `applyChecklistResponse(response)` | Persist completed checklist |
| `applyTimeEntry(entry)` | Create/update timesheet record |
| `applyMaterialUsage(usage)` | Create stock/material movement or consumption line |
| `applyJobStatusTransition(job, transition)` | Validate and apply job status changes |
| `createVariationRequest(request)` | Raise field-originated commercial change |
| `linkAttachment(attachment)` | Link stored file to ERP job/checklist |
| `getPermissions(user, scope)` | Resolve company/project/job access |

## Planning Adapter Contract

If [OpenProject](../options/openproject.md) or another planning tool is used, it should receive summarized events rather than raw field mutations.

Examples:

- Job completed.
- Job blocked.
- Dependency date changed.
- Variation approved.
- Resource conflict detected.

## Conflict Contract

Conflict responses must be explicit:

```json
{
  "mutation_id": "device-generated-uuid",
  "status": "needs_review",
  "reason": "base_version_conflict",
  "server_version": "v19",
  "server_record_summary": {
    "job_status": "supervisor_review",
    "updated_by": "supervisor-1"
  }
}
```

The field app must keep the local change visible until a user or supervisor resolves it.

## Contract Gaps To Validate

| Gap | Validation route |
| --- | --- |
| Odoo/OCA field-service object names and module dependencies | [Odoo POC](../poc/odoo-oca-test-plan.md) |
| ERPNext doctypes for maintenance/job/checklist mapping | [ERPNext POC](../poc/erpnext-test-plan.md) |
| Attachment storage location and ERP link behavior | [Odoo](../poc/odoo-oca-test-plan.md) and [ERPNext](../poc/erpnext-test-plan.md) POCs |
| Material consumption semantics | [Odoo](../poc/odoo-oca-test-plan.md) and [ERPNext](../poc/erpnext-test-plan.md) POCs |
| Multi-company/subcontractor access checks | [ERP POCs](../poc/index.md) plus [permission review](permissions-and-tenancy.md) |
| Offline conflict UI | [Offline PWA spike](../poc/offline-pwa-test-plan.md) |
