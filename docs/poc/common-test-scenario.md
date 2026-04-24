# Common Test Scenario

## Purpose

Every POC must run the same scenario so the results are comparable.

## Actors

| Actor | Description |
| --- | --- |
| Office admin | Creates customer, quote, project, and job |
| Scheduler | Assigns worker, date, resources, and materials |
| Tradesperson | Completes the work offline on mobile |
| Supervisor | Reviews completed work and exceptions |
| Client | Approves quote and signs completion |
| Subcontractor | Has limited visibility to assigned work only |

## Sample Data

| Entity | Value |
| --- | --- |
| Customer | Acme Property Services |
| Site | Unit 4, Riverside Industrial Estate |
| Project | Riverside Unit 4 Refurbishment |
| Job | Replace damaged consumer unit and complete safety checklist |
| Trade | Electrical |
| Worker | Alex Morgan |
| Vehicle | Van 12 |
| Materials | Consumer unit, RCBOs, cable clips, labels |
| External dependency | Plasterboard repair by subcontractor before final fix |

## Workflow

1. Create customer and site.
2. Create project.
3. Create quote with labour, materials, and optional variation line.
4. Approve quote and create job/work order.
5. Attach required checklist and site documents.
6. Schedule job to worker and vehicle.
7. Assign planned materials.
8. Simulate worker opening the job while online.
9. Disable network.
10. Complete pre-work risk checklist.
11. Add job notes, time entry, used materials, photo evidence, and client signature.
12. Mark job complete while still offline.
13. Restore network.
14. Sync changes.
15. Supervisor reviews completion and flags one variation.
16. Create variation quote.
17. Approve variation.
18. Generate invoice or invoice-ready record.
19. Record dependency impact against subcontractor task.

## Acceptance Criteria

| Requirement | Expected result |
| --- | --- |
| Job visibility | Worker can see assigned job before and during offline mode |
| Offline completion | Worker can complete required field data with no network |
| Evidence capture | Photos/signature are saved locally and sync later |
| Sync status | UI shows pending, synced, and failed states |
| Materials | Used material is recorded without duplicate stock movement |
| Review | Supervisor can distinguish normal completion from exceptions |
| Variation | Variation can be linked to original job/project |
| Dependency | External blocker/dependency can be represented and reported |
| Permissions | Subcontractor cannot see unrelated jobs or commercial data |

## Scoring

Use the weighted scoring in [Scoring Matrix](../evaluation/scoring-matrix.md), then add a short written verdict.

