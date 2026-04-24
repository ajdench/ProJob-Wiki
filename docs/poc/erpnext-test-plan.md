# ERPNext / Frappe Test Plan

## Goal

Validate whether ERPNext can act as a coherent open-source ERP and customization platform for the trades operating model.

## Setup Target

- ERPNext current stable release.
- Frappe Framework.
- Modules: Selling, Stock, Projects, Support/Maintenance, HR/Timesheets, Accounts.

## Tests

| Test | Evidence to capture |
| --- | --- |
| Install ERPNext | Install notes, Docker/bench path, issues |
| Customer/site/project setup | Screenshots and model notes |
| Quote -> sales order -> job equivalent | Best native mapping |
| Maintenance visit/work order model | Fit for trades job execution |
| Custom checklist doctype | Time to create and expose in UI/API |
| Evidence attachments | File/photo handling |
| Materials and stock | Stock usage against job/project |
| Workflow approvals | Quote/variation/supervisor review |
| API fit | REST/RPC shape for offline PWA |

## Key Questions

- Is the native maintenance visit model enough, or does trades work require custom doctypes?
- Can Frappe customization produce field-specific models faster than Odoo customization?
- How cleanly do sales, stock, time, and projects connect?
- What is the simplest route to a custom offline PWA backed by Frappe APIs?

## Pass/Fail Guidance

Pass if ERPNext provides a clean ERP foundation and Frappe makes custom field workflows straightforward.

Fail if the trades job lifecycle requires too many custom objects before quote, work, stock, and invoice records connect.

