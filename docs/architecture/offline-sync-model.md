# Offline Sync Model

## Core Principle

The field PWA local database is the source of truth for the field user while offline. The ERP remains the business system of record after synchronization.

## Local Data Sets

| Data set | Offline mode |
| --- | --- |
| Assigned jobs | Read/write limited to assigned worker or crew |
| Site/customer summary | Read-only |
| Checklist templates | Read-only |
| Checklist responses | Write |
| Photos/signatures | Write, queued attachment upload |
| Time entries | Write |
| Material usage | Write with local validation |
| Stock catalogue | Read-only or limited write for vehicle stock |
| Comments/notes | Write |
| Documents/drawings | Cached read-only |

## Mutation Queue

Every offline write should create a queued mutation:

```json
{
  "mutation_id": "device-generated-uuid",
  "device_id": "device-uuid",
  "user_id": "user-id",
  "entity_type": "job_checklist_response",
  "entity_id": "local-or-server-id",
  "operation": "upsert",
  "base_version": "server-version-seen-by-client",
  "payload": {},
  "created_at": "2026-04-24T20:00:00Z"
}
```

## Conflict Policy

| Record type | Policy |
| --- | --- |
| Job status | Server validates legal transitions; conflicting transitions require review |
| Checklist answers | Preserve both if same field changed by different users |
| Photos/files | Append-only; never overwrite |
| Signatures | Append-only with explicit replacement workflow |
| Time entries | Append or adjust with audit trail |
| Material usage | Append stock movement; corrections are reversing movements |
| Notes/comments | Append-only |

## Attachment Handling

- Store attachment metadata locally before file upload.
- Upload attachments separately from form mutations.
- Use checksums and client attachment IDs.
- Show per-file upload state.
- Allow job completion to remain pending until required attachments sync.

## Sync States

| State | Meaning |
| --- | --- |
| Local only | Created offline, never uploaded |
| Pending upload | In queue |
| Uploading | Currently being sent |
| Server accepted | Mutation committed |
| Needs review | Conflict or validation failure |
| Failed retryable | Network/server temporary failure |
| Failed terminal | Requires user/admin action |

