# Findings: Odoo + OCA Field Service

Date: 2026-04-24
Evaluator: Codex
Version / commit / image: Target Odoo 19.0 + OCA 19.0 branches

## Summary

## Setup Notes

Initial environment check:

- `docker` is installed and verified.
- `docker compose` is installed and verified.
- `colima` is installed, started, and verified with `hello-world`.
- `podman` is installed and its machine image is initialized, but `podman machine start` currently fails/hangs at `vfkit`.
- Homebrew is available.
- OCA `19.0` branches exist for `field-service`, `server-tools`, `web`, and `sale-workflow`.

Prepared reproducible setup files under `experiments/odoo-oca/`. The POC should proceed with Docker via Colima.

## Scenario Result

| Step | Result | Notes |
| --- | --- | --- |
| Customer/site setup | Not started | Docker/Colima runtime now available |
| Quote | Not started | |
| Job/work order | Not started | |
| Schedule/assign | Not started | |
| Offline execution | Not started | |
| Evidence capture | Not started | |
| Sync | Not started | |
| Supervisor review | Not started | |
| Variation | Not started | |
| Invoice-ready output | Not started | |
| Dependency tracking | Not started | |
| Permissions | Not started | |

## Functional Fit

## Offline / Mobile Fit

## Integration / API Fit

## Permission / Tenancy Fit

## Customization Required

## Operational Complexity

## License / Commercial Risk

## Screenshots / Evidence

## Scores

| Criterion | Weight | Score 1-5 | Weighted |
| --- | ---: | ---: | ---: |
| Offline field reliability | 20% | | |
| Quote-to-cash fit | 15% | | |
| Job/work-order lifecycle | 15% | | |
| Scheduling/resource allocation | 10% | | |
| Stock/materials/tools | 10% | | |
| Cross-company permissions | 10% | | |
| Extensibility/API | 10% | | |
| Operational simplicity | 5% | | |
| License/commercial risk | 5% | | |

## Verdict

## Open Questions
