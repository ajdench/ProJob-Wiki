# Offline-First PWA Test Plan

## Goal

Validate the hardest technical risk: reliable offline field execution with later synchronization.

This POC should be independent of the final ERP decision. It can use a minimal mock backend first, then later connect to Odoo or ERPNext.

## Candidate Stacks

Test one or two:

| Stack | Why test |
| --- | --- |
| PouchDB + CouchDB | Mature fully open-source replication model |
| RxDB + custom sync API | Modern local database and reactive UI |
| Dexie.js + custom sync queue | Lowest dependency and maximum control |

## Minimum Data Model

| Entity | Fields |
| --- | --- |
| Job | id, title, site, status, assigned_user, scheduled_at, version |
| Checklist template | id, job_type, questions |
| Checklist response | id, job_id, answers, completed_at, local_version |
| Time entry | id, job_id, user_id, started_at, ended_at |
| Material use | id, job_id, sku, quantity, unit |
| Attachment | id, job_id, file_ref, checksum, upload_state |
| Signature | id, job_id, signer_name, image_ref, captured_at |
| Sync mutation | id, entity_type, operation, payload, base_version, state |

## Tests

| Test | Expected result |
| --- | --- |
| App shell offline | PWA opens with no network after first load |
| Assigned job cache | Job detail is available offline |
| Checklist offline | Answers persist across reload while offline |
| Photo offline | Attachment is queued and previewable |
| Signature offline | Signature is queued and previewable |
| Time/materials offline | Entries persist and are not duplicated on retry |
| Sync retry | Failed uploads retry when network returns |
| Conflict | Server version conflict creates review state |
| App restart | Queue survives browser/app close and reopen |

## Required UI States

- Online.
- Offline.
- Sync pending.
- Sync failed.
- Conflict needs review.
- Job ready for supervisor review.

## Pass/Fail Guidance

Pass if the PWA can complete the common test scenario offline, survive reload/restart, and sync without duplicates.

Fail if local persistence, attachment handling, or conflict visibility is unreliable.

