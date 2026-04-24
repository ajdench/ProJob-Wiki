# OpenProject

## Summary

OpenProject is the strongest open-source candidate for cross-project planning, Gantt scheduling, work packages, agile boards, time tracking, cost reporting, project wiki pages, meetings, and document management.

Sources:

- [OpenProject official site](https://www.openproject.org/)
- [OpenProject resource management docs](https://www.openproject.org/docs/use-cases/resource-management/)

## Functional Fit

| Area | Fit |
| --- | --- |
| Cross-project planning | Strong |
| Gantt / dependencies | Strong |
| Work packages | Strong |
| Time/cost tracking | Strong |
| Wiki/document management | Strong |
| Field-service execution | Weak |
| Quoting/invoicing | Weak |
| Offline-first mobile | Weak |
| Detailed resource capacity | Medium to weak |

## Strengths

- Very strong human-readable project planning surface.
- Suitable for programme-level coordination and dependency tracking.
- Built-in wiki and document management help internal documentation.
- Good sovereignty/self-hosting story.

## Gaps / Risks

- It is not a trades field execution system.
- Offline field use is not its role.
- Detailed resource/capacity management is limited compared with specialist tools.

## Best Role

Use as a planning and programme coordination layer, not as the core operational field system.

## Proof-of-Concept Test

1. Model several projects with dependency-linked work packages.
2. Track blockers, milestones, baseline schedule, and time/cost reporting.
3. Test whether work packages can map cleanly to ERP jobs/work orders.

