# In Simple Terms

## What ProJob Is Trying To Become

ProJob is a proposed work-management system for trades and site-work teams.

In simple terms, it should help answer:

- What work needs doing?
- Who is doing it?
- When is it happening?
- What materials, tools, vehicles, and documents are needed?
- What happened on site?
- What evidence was captured?
- What changed, blocked, or needs approving?
- What can be quoted, invoiced, reported, or handed to another company?

## The Main Idea

Most business systems are good in the office but weak on site.

Most field apps are good for checklists but weak at quotes, materials, invoices, project dependencies, and cross-company coordination.

ProJob is exploring how to combine the useful parts into one coherent application suite.

## What A Worker Would See

A tradesperson should open ProJob and see:

- Today's jobs.
- Site details and documents.
- Checklist or risk assessment.
- Photos and signature capture.
- Time and material entry.
- Notes and issues.
- A clear offline/sync status.

If the site has no signal, they should still be able to work.

## What The Office Would See

Office users should see:

- Jobs waiting to be scheduled.
- Workers, crews, skills, vehicles, tools, and materials.
- Quotes, variations, and invoice-ready work.
- Jobs needing review.
- Blockers and dependencies.
- Cross-project progress.

## Why Not Just Pick One Existing App?

The open-source options each solve part of the problem:

| Tool type | What it is good at | What it usually misses |
| --- | --- | --- |
| ERP | Quotes, customers, stock, invoices | Offline field work |
| Field service | Jobs, workers, scheduling | Wider project/company coordination |
| CMMS | Assets, work orders, maintenance | Quote-to-cash trades workflows |
| Project management | Dependencies, Gantt, planning | Field execution and materials |
| Forms tools | Offline checklists and inspections | Jobs, resources, quoting, invoicing |

The likely answer is not one product. It is a ProJob suite that uses selected components behind the scenes.

## What The Final App Should Feel Like

It should not feel like jumping between Odoo, ERPNext, OpenProject, Atlas, ODK, and other tools.

It should feel like one ProJob app with:

- Shared navigation.
- Shared styling.
- Shared job language.
- Shared permissions.
- Shared offline behaviour.
- Shared review and approval flows.

The screenshots in the option pages show useful patterns from existing tools. They do not define the final ProJob interface.

## The Current Best Bet

The current research direction is:

1. Use an open-source ERP or field-service system as the back-office source of truth.
2. Build a dedicated offline-first ProJob field app for site workers.
3. Add planning/dependency tools only where they are really needed.
4. Keep documentation, decisions, and findings in this wiki.

## What Needs Proving Next

The next proof-of-concept work needs to prove:

- Can Odoo/OCA handle the core quote -> job -> material -> timesheet -> invoice workflow?
- Can ERPNext/Frappe do the same more cleanly?
- What is the safest offline-first app stack?
- What data must sync between the field app and the back-office system?
- How should subcontractors and clients see only their part of the work?

## The Short Version

ProJob should be a single, practical work suite for trades and site projects.

It should combine office control, field execution, offline reliability, evidence capture, resource planning, quoting, and cross-company coordination without making users jump between disconnected systems.

