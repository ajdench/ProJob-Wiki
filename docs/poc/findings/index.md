# POC Findings

Use this section to record proof-of-concept evidence as each candidate is tested.

## Evidence Convention

Store screenshots and screen recordings under:

```text
docs/assets/poc/<candidate>/
```

Use lowercase candidate folders:

- `docs/assets/poc/odoo-oca/`
- `docs/assets/poc/erpnext/`
- `docs/assets/poc/offline-pwa/`

Use descriptive filenames:

```text
YYYY-MM-DD-step-short-description.png
YYYY-MM-DD-step-short-description.mp4
```

Examples:

```text
2026-04-25-quote-to-work-order.png
2026-04-25-offline-checklist-sync.mp4
```

## Findings Pages

| Candidate | Findings |
| --- | --- |
| Odoo + OCA Field Service | [Odoo + OCA Findings](odoo-oca.md) |
| ERPNext / Frappe | [ERPNext Findings](erpnext.md) |
| Offline-first PWA | [Offline PWA Findings](offline-pwa.md) |
| UI framework spike | [UI Framework Spike Findings](ui-framework-spike.md) |

## Rules

- Record the installed version or commit for each candidate.
- Link screenshots close to the finding they support.
- Keep raw notes, failures, and workarounds; do not only record successful paths.
- Update the scoring matrix only after evidence exists.
- Add an ADR when a POC changes a platform decision.
