# Research Questions

## Product Fit Questions

1. What is the smallest complete workflow that must work offline?
2. Are jobs mostly reactive service calls, planned projects, recurring maintenance, or all three?
3. Is the primary commercial flow quote-to-cash, contract maintenance, day-rate works, or project package delivery?
4. Do external subcontractors need full login access, limited portal access, or job-only mobile access?
5. Are tools/equipment and vehicle stock operationally critical or secondary?
6. Do users need project programme management, or only job scheduling?

## Architecture Questions

1. Which system owns customers, sites, jobs, quotes, stock, and invoices?
2. Which records must be editable offline?
3. Which records are read-only offline?
4. How should conflicts be resolved for checklist answers, material usage, timesheets, and job status?
5. How should attachments be compressed, uploaded, retried, and audited?
6. What is the acceptable sync delay after reconnection?

## Evaluation Questions by Option

### Odoo + OCA Field Service

- Can OCA modules cover the core job lifecycle without heavy customization?
- How cleanly do stock, timesheets, sales, invoicing, and field orders connect?
- Can subcontractor/portal access be scoped safely?
- What API shape is needed for a custom offline PWA?

### ERPNext / Frappe

- Is maintenance visit/workflow flexible enough for trades jobs?
- How fast can custom doctypes model checklists, evidence, variations, and field events?
- Is Frappe a good backend for the custom PWA?

### Offline PWA

- Which local database/sync engine best fits the write patterns?
- Can sync survive app restarts, poor signal, large photo queues, and duplicate retries?
- What is the lowest-risk attachment strategy?

