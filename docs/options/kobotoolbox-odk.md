# KoboToolbox / ODK

## Summary

KoboToolbox and ODK are strong open-source choices for offline data collection, inspections, surveys, and checklist-style workflows. They are not complete field-service or ERP systems, but they may be useful for forms-heavy parts of the platform.

Sources:

- [KoboToolbox offline data collection](https://support.kobotoolbox.org/data-offline.html)
- [KoboToolbox data collection tools](https://support.kobotoolbox.org/data-collection-tools.html)
- [ODK overview](https://docs.getodk.org/)
- [ODK Collect form filling docs](https://docs.getodk.org/collect-filling-forms/)

## Indicative Screenshots

These ODK Collect screenshots are relevant to the offline checklist/forms part of the platform. They show the kind of mobile field-data flow that KoboToolbox/ODK can support, not a complete trades job-management system.

![ODK Collect start new form menu](https://docs.getodk.org/_images/main-menu-start-new-form.png)

Source: [ODK Collect form filling docs](https://docs.getodk.org/collect-filling-forms/)

![ODK Collect signature widget](https://docs.getodk.org/_images/signature-widget.png)

Source: [ODK Collect form filling docs](https://docs.getodk.org/collect-filling-forms/)

## Functional Fit

| Area | Fit |
| --- | --- |
| Offline forms | Strong |
| Inspections/checklists | Strong |
| Mobile data capture | Strong |
| Structured submissions | Strong |
| Job scheduling | Weak |
| Resource management | Weak |
| Quoting/invoicing | Weak |
| Cross-project management | Weak |

## Strengths

- Battle-tested offline data capture.
- Good for low-connectivity field environments.
- Form-first model is useful for inspections, compliance, surveys, audits, and risk assessments.
- Can work as a companion system or design reference for checklist UX.

## Gaps / Risks

- Not a business operating platform.
- Integration required to connect submissions to jobs, projects, quotes, and invoices.
- Form model may become awkward for dynamic work-order state.

## Best Role

Use as either:

- A companion forms/checklist subsystem, or
- A reference implementation for offline checklist behavior.
