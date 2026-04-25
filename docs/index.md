# Overview

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

For the fuller research context, see [Research Overview](research-overview.md).

## The Main Idea

Most business systems are good in the office but weak on site.

Most field apps are good for checklists but weak at quotes, materials, invoices, project dependencies, and cross-company coordination.

ProJob is exploring how to combine the useful parts into one coherent application suite. The architecture direction is described in [Suite Composition and Design](architecture/suite-composition-and-design.md), [Web and Stack Architecture](architecture/web-stack-architecture.md), and [Component Map](architecture/component-map.md).

## What A Worker Would See

A tradesperson should open ProJob and see:

- Today's jobs.
- Site details and documents.
- Checklist or risk assessment.
- Photos and signature capture.
- Time and material entry.
- Notes and issues.
- A clear offline/sync status.

If the site has no signal, they should still be able to work. The offline model is described in [Offline Sync Model](architecture/offline-sync-model.md).

## What The Office Would See

Office users should see:

- Jobs waiting to be scheduled.
- Workers, crews, skills, vehicles, tools, and materials.
- Quotes, variations, and invoice-ready work.
- Jobs needing review.
- Blockers and dependencies.
- Cross-project progress.

The workflow detail is in [Workflow Map](workflows/workflow-map.md).

## Why Not Just Pick One Existing App?

The open-source options each solve part of the problem:

| Tool type | What it is good at | What it usually misses | Candidate pages |
| --- | --- | --- | --- |
| ERP | Quotes, customers, stock, invoices | Offline field work | [Odoo/OCA](options/odoo-oca-field-service.md), [ERPNext/Frappe](options/erpnext-frappe.md), [Dolibarr](options/dolibarr.md) |
| Field service | Jobs, workers, scheduling | Wider project/company coordination | [Odoo/OCA](options/odoo-oca-field-service.md), [Atlas CMMS](options/atlas-cmms.md) |
| CMMS | Assets, work orders, maintenance | Quote-to-cash trades workflows | [Atlas CMMS](options/atlas-cmms.md), [openMAINT](options/openmaint.md) |
| Project management | Dependencies, Gantt, planning | Field execution and materials | [OpenProject](options/openproject.md) |
| Forms tools | Offline checklists and inspections | Jobs, resources, quoting, invoicing | [KoboToolbox / ODK](options/kobotoolbox-odk.md) |

The likely answer is not one product. It is a ProJob suite that uses selected components behind the scenes.

## What The Final App Should Feel Like

It should not feel like jumping between [Odoo/OCA](options/odoo-oca-field-service.md), [ERPNext](options/erpnext-frappe.md), [OpenProject](options/openproject.md), [Atlas CMMS](options/atlas-cmms.md), [ODK/Kobo](options/kobotoolbox-odk.md), and other tools.

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

1. Use an open-source ERP or field-service system as the back-office source of truth. See [Odoo/OCA](options/odoo-oca-field-service.md), [ERPNext/Frappe](options/erpnext-frappe.md), and [Dolibarr](options/dolibarr.md).
2. Build a dedicated [offline-first ProJob field app](options/offline-first-pwa-stack.md) for site workers.
3. Add planning/dependency tools such as [OpenProject](options/openproject.md) only where they are really needed.
4. Keep documentation, decisions, and findings in this wiki.

## What Needs Proving Next

The next proof-of-concept work needs to prove:

- Can [Odoo/OCA](poc/odoo-oca-test-plan.md) handle the core quote -> job -> material -> timesheet -> invoice workflow?
- Can [ERPNext/Frappe](poc/erpnext-test-plan.md) do the same more cleanly?
- What is the safest [offline-first app stack](poc/offline-pwa-test-plan.md)?
- What data must sync between the field app and the back-office system? See [Integration Contracts](architecture/integration-contracts.md).
- How should subcontractors and clients see only their part of the work? See [Permissions and Tenancy](architecture/permissions-and-tenancy.md).

## The Short Version

ProJob should be a single, practical work suite for trades and site projects.

It should combine office control, field execution, offline reliability, evidence capture, resource planning, quoting, and cross-company coordination without making users jump between disconnected systems.
