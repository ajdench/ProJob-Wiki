# Odoo + OCA Field Service Test Plan

## Goal

Validate whether Odoo Community plus OCA Field Service can act as the system of record for trades field operations.

## Setup Target

- Odoo Community 18.
- OCA Field Service 18 modules.
- Minimum modules: CRM, Sales, Inventory, Accounting/Invoicing, Project, Timesheets, Field Service, Field Service Sale, Field Service Stock, Field Service Timesheet, Field Service Route, Field Service Skill, Field Service Vehicle.

## Tests

| Test | Evidence to capture |
| --- | --- |
| Install modules | Install notes, dependency issues, version issues |
| Customer/site/project setup | Screenshots and model notes |
| Quote -> field service order | Can sales flow create or link to job/work order? |
| Worker/skill/vehicle assignment | How natural is dispatch setup? |
| Planned and used materials | Stock movement behavior and warehouse/vehicle fit |
| Timesheet capture | How time links to job and invoice |
| Checklist/evidence model | Native support vs custom module requirement |
| Subcontractor portal | Visibility and permission boundaries |
| API fit | Endpoints needed for offline PWA |

## Key Questions

- Are OCA field-service modules mature enough on the chosen Odoo version?
- Does the data model match trades work orders without heavy customization?
- Can quote, job, stock, timesheet, and invoice records stay linked?
- Can external subcontractor access be safely scoped?
- What must be added for offline checklists, photos, signatures, and sync state?

## Pass/Fail Guidance

Pass if Odoo/OCA can handle the back-office workflow with moderate configuration and a clear API path for a custom field PWA.

Fail if the field-service modules are unstable, hard to install, or require broad customization before the common scenario can run.

