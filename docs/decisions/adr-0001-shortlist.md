# ADR 0001: Initial Research Shortlist

Status: Proposed

Date: 2026-04-24

## Context

The target product requires offline field execution and broad business functions: jobs, checklists, resources, scheduling, dependencies, quoting, stock, and cross-company collaboration.

No single open-source option appears to cover all of these strongly.

## Decision

Evaluate these first:

1. [Odoo Community + OCA Field Service](../options/odoo-oca-field-service.md).
2. [ERPNext / Frappe](../options/erpnext-frappe.md).
3. A custom [offline-first field PWA](../options/offline-first-pwa-stack.md) using RxDB or PouchDB/CouchDB.

Use [OpenProject](../options/openproject.md), [Atlas CMMS](../options/atlas-cmms.md), [openMAINT](../options/openmaint.md), [Dolibarr](../options/dolibarr.md), and [KoboToolbox/ODK](../options/kobotoolbox-odk.md) as secondary benchmarks or companion systems.

## Consequences

- The research will focus on integration and product architecture, not just feature comparison.
- Offline field execution will be validated as an independent [technical spike](../poc/offline-pwa-test-plan.md).
- The ERP decision should not be made until the [PWA sync requirements](../architecture/offline-sync-model.md) are proven against realistic field workflows.
