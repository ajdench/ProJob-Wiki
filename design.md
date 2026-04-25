---
version: alpha
name: ProJob Unified Application Suite
description: Practical design brief and token seed for the ProJob mobile, tablet, and desktop product UI.
colors:
  primary: "#17324D"
  on-primary: "#FFFFFF"
  secondary: "#51606F"
  tertiary: "#0F766E"
  on-tertiary: "#FFFFFF"
  neutral: "#F6F4EF"
  surface: "#FFFFFF"
  surface-muted: "#EEF2F5"
  on-surface: "#17212B"
  border: "#D6DEE6"
  accent: "#8A4B08"
  success: "#15803D"
  warning: "#B45309"
  danger: "#B42318"
  info: "#2563EB"
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: 0px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0px
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0px
  data-sm:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
components:
  app-shell:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  sidebar:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px
  panel-muted:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 16px
  divider:
    backgroundColor: "{colors.border}"
    textColor: "{colors.on-surface}"
    height: 1px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 44px
  button-primary-hover:
    backgroundColor: "{colors.info}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 44px
  button-secondary:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 44px
  sync-chip:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 8px
  status-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 8px
  status-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 8px
  status-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 8px
  attention-callout:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 16px
  data-cell:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.data-sm}"
    padding: 8px
---

# ProJob Design Brief

Research tag: UI framework and responsive product design for ProJob.

This brief defines the first practical design direction for a unified ProJob application suite across mobile, tablet, and desktop. It uses the ProJob Wiki as source context, especially the [Overview](https://ajdench.github.io/ProJob-Wiki/), [Research Overview](https://ajdench.github.io/ProJob-Wiki/research-overview/), [Suite Composition and Design](https://ajdench.github.io/ProJob-Wiki/architecture/suite-composition-and-design/), [UI Framework Options](https://ajdench.github.io/ProJob-Wiki/architecture/ui-framework-options/), [Web and Stack Architecture](https://ajdench.github.io/ProJob-Wiki/architecture/web-stack-architecture/), [Component Map](https://ajdench.github.io/ProJob-Wiki/architecture/component-map/), [Offline Sync Model](https://ajdench.github.io/ProJob-Wiki/architecture/offline-sync-model/), [Integration Contracts](https://ajdench.github.io/ProJob-Wiki/architecture/integration-contracts/), [Product Requirements](https://ajdench.github.io/ProJob-Wiki/requirements/product-requirements/), and [Workflow Map](https://ajdench.github.io/ProJob-Wiki/workflows/workflow-map/).

## Overview

### Product Design Principles

ProJob should feel like one operational suite, not a collection of upstream tools stitched together with links. The Wiki's [Suite Composition and Design](https://ajdench.github.io/ProJob-Wiki/architecture/suite-composition-and-design/) direction is the key product rule: ERP, planning, forms, sync, and storage systems may own backend capability, but everyday users should work inside a coherent ProJob interface.

The design principles are:

- **Field-first, office-capable:** Phone field work is the hardest constraint, but the same design language must scale to supervisor tablet and office desktop workflows.
- **Offline state is product state:** Offline, pending upload, failed sync, and conflict review are not technical details. They must be visible where work happens, as described in the [Offline Sync Model](https://ajdench.github.io/ProJob-Wiki/architecture/offline-sync-model/).
- **One shared job language:** Use ProJob terms such as job, site, checklist, evidence, variation, blocker, and resource even when an upstream system uses different wording.
- **Action before dashboard:** A tradesperson should see today's work and the next required action, not a generic analytics landing page.
- **Dense but calm:** Office users need tables, queues, boards, and calendars, but the interface should remain restrained and readable.
- **Audit by design:** Completion, evidence, time, materials, signatures, sync events, approvals, and conflicts should leave clear trails, aligning with the [Product Requirements](https://ajdench.github.io/ProJob-Wiki/requirements/product-requirements/).

### Product Shape

The target UI has four primary workspaces:

| Workspace | Primary users | Design implication |
| --- | --- | --- |
| Field | Tradespeople and subcontractors | Phone-first job execution, offline forms, evidence capture, sync visibility |
| Supervisor | Supervisors and contract managers | Tablet-friendly review queues, blocked-work triage, exception approval |
| Office | Schedulers, estimators, project managers, stores, finance | Dense tables, boards, calendars, quoting, resources, dependencies, reporting |
| Admin | Internal admins | Templates, permissions, ERP mappings, integrations, audit/export |

This follows the Wiki's [Component Map](https://ajdench.github.io/ProJob-Wiki/architecture/component-map/) and [Workflow Map](https://ajdench.github.io/ProJob-Wiki/workflows/workflow-map/): field execution should not own final commercial truth, but it must own a reliable local execution experience while offline.

## Colors

The colour system should be practical and semantic. Use a warm neutral background to reduce glare, white surfaces for work panels, navy for structure, teal for healthy sync/progress, dark amber for attention, green for success, red for danger, and blue for neutral information.

Decision: colour must reinforce status but never be the only status carrier. Every state chip or banner needs text, and important states should also use iconography once the component library exists.

| Role | Token | Use |
| --- | --- | --- |
| Product structure | `primary` | App shell, selected navigation, primary actions |
| Metadata | `secondary` | Helper text, timestamps, counters, muted labels |
| Sync/progress | `tertiary` | Online, cached, synced, ready-to-submit field states |
| Attention | `accent` / `warning` | Variation requested, blocker, review required |
| Failure | `danger` | Failed sync, rejected validation, unsafe state |
| Background | `neutral`, `surface`, `surface-muted` | Page base, panels, filters, inactive rows |

## Typography

Use **Inter** for the product UI and **IBM Plex Mono** only for operational data such as job references, mutation ids, timestamps, serials, and stock codes. This supports the Wiki's requirement for field usability and office density without creating separate visual identities across surfaces.

Decision: keep headings functional. Avoid marketing-style hero typography inside the product. Use `headline-lg` for workspace titles, `headline-md` for page/panel titles, `body-md` for normal reading, `label-md` for controls and chips, and `data-sm` for table references and audit metadata.

## Layout

### Core Responsive Layouts

ProJob should use three responsive layouts:

| Breakpoint intent | Layout | Primary goal |
| --- | --- | --- |
| Mobile field | Single-column task flow with compact top status and bottom/inline actions | Complete one job safely with limited attention |
| Tablet supervisor | Two-pane queue/detail layout | Review exceptions and evidence without losing queue context |
| Desktop office | Persistent left navigation, top command bar, main work grid | Schedule, filter, compare, approve, and manage records at density |

### Field Mobile UI

The field mobile UI should be optimized around the [Product Requirements](https://ajdench.github.io/ProJob-Wiki/requirements/product-requirements/) for one-handed, interruption-resistant work.

Required mobile screens:

- **Today:** Assigned jobs, schedule window, site, status, offline availability, and next action.
- **Job detail:** Site summary, contact, documents/drawings, checklist, evidence, time, materials, notes, and signature.
- **Checklist:** Save-as-you-go rows, required/optional markers, validation state, local save state, and completion progress.
- **Evidence capture:** Camera/photo, signature, notes, document attachment, per-file upload state.
- **Sync queue:** Pending, retrying, failed, needs review, accepted, and last synced time.

Decision: the mobile field app must not start with office dashboards. It should start with "what do I need to do now?" and make offline safety obvious.

### Supervisor Tablet UI

The supervisor tablet UI should support mixed field/office use. It should handle job review, blocked-work triage, evidence inspection, variation approval, and assignment adjustments.

Core tablet pattern:

- Left or top queue of jobs needing attention.
- Detail pane with evidence, checklist answers, comments, and sync state.
- Clear primary action such as approve, request change, raise variation, retry sync, or reassign.
- Filters for crew, site, priority, blocker, sync state, and due window.

Decision: tablet design should preserve context. Do not force supervisors through a modal for every review; the queue and selected job should remain visible where screen size allows.

### Office Desktop UI

The office desktop UI should support the suite surfaces named in [Suite Composition and Design](https://ajdench.github.io/ProJob-Wiki/architecture/suite-composition-and-design/): scheduling, estimating, resources, project control, review, client/subcontractor portal, and admin.

Core desktop patterns:

- Persistent left navigation grouped by workspace.
- Top command bar with search, filters, date range, role/workspace switch, and sync/system health.
- Data-dense tables for jobs, quotes, materials, people, vehicles, tools, and approvals.
- Boards/calendars for scheduling and review queues.
- Side drawers for job detail, evidence, timeline, and conflict resolution.
- Split views for dependency/blocker review.

Decision: desktop can be dense, but each dense surface needs predictable controls, sticky context, visible empty/error states, and no nested card piles.

## Elevation & Depth

Use tonal layers, borders, and spacing instead of heavy shadows. ProJob should feel like a reliable operational system, not a consumer dashboard.

Decision: reserve stronger depth for temporary surfaces such as mobile sheets, desktop drawers, popovers, menus, and confirmation dialogs. Normal content hierarchy should come from layout, section headers, borders, and semantic status.

## Shapes

Use restrained rectangular geometry:

- `4px` radius for buttons, inputs, table rows, chips with rectangular context, and compact controls.
- `8px` radius for panels, job cards, evidence tiles, review rows, and drawers.
- `12px` radius for large mobile sheets or major empty states.
- Full radius only for compact chips, avatars, and presence/status dots.

Decision: keep shapes consistent across mobile, tablet, and desktop. Do not make the field app visually soft and the office app visually sharp; they are the same product.

## Components

### Shared Components And Design Tokens

ProJob-owned components should wrap framework primitives. This follows the [UI Framework Options](https://ajdench.github.io/ProJob-Wiki/architecture/ui-framework-options/) recommendation to avoid exposing generic library styling throughout the product.

Core shared components:

| Component | Required behavior |
| --- | --- |
| App shell | Role-aware nav, workspace switching, sync/system health |
| Job card / row | Job id, site, schedule, assignee, status, offline availability, next action |
| Status chip | Text label, semantic colour, optional icon, accessible name |
| Sync banner/chip | Online/offline/pending/failed/conflict states and clear next action |
| Checklist row | Required state, answer control, validation, local save indicator |
| Evidence tile | Type, thumbnail/summary, upload state, checksum/audit metadata when useful |
| Review queue row | Exception type, job, site, assignee, age, resolution action |
| Scheduler item | Crew, vehicle/tool requirements, duration, dependencies, blocker state |
| Data table | Filters, sorting, selection, sticky context, empty/error states |
| Timeline entry | Actor, timestamp, event type, source device/system, audit detail |

### Offline/Sync States

Offline state needs a consistent vocabulary from the [Offline Sync Model](https://ajdench.github.io/ProJob-Wiki/architecture/offline-sync-model/) and [Integration Contracts](https://ajdench.github.io/ProJob-Wiki/architecture/integration-contracts/).

Required states:

| State | UI treatment |
| --- | --- |
| Local only | Muted local badge; explain it has not reached server |
| Pending upload | Queue count and per-record pending marker |
| Uploading | Progress or activity indicator; avoid blocking unrelated work |
| Server accepted | Quiet confirmation and timestamp |
| Needs review | Amber review state with reason and owner |
| Failed retryable | Red/amber retry state with retry action |
| Failed terminal | Red blocked state with escalation or admin action |

Decision: job completion may be locally complete but server-pending. The UI must show both truths at once.

### Role-Aware Navigation

Navigation should adapt by role while preserving the same product map.

| Role | Default navigation |
| --- | --- |
| Tradesperson | Today, Jobs, Sync queue, Documents, Profile |
| Supervisor | Review, Jobs, Schedule, Blockers, Sync exceptions |
| Scheduler | Schedule, Crews, Jobs, Resources, Conflicts |
| Estimator | Quotes, Variations, Templates, Approvals, Customers |
| Project manager | Projects, Dependencies, Blockers, Milestones, Reports |
| Stores | Materials, Vehicle stock, Tools, Requests, Purchase orders |
| Client/subcontractor | Shared jobs, Approvals, Evidence, Documents, Comments |
| Admin/finance | Customers, Suppliers, Invoices, Timesheets, Permissions, Integrations |

Decision: hide irrelevant navigation by role, but do not change names for the same concept across roles.

### Evidence Capture Patterns

Evidence is a core product surface, not an attachment afterthought. The [Product Requirements](https://ajdench.github.io/ProJob-Wiki/requirements/product-requirements/) and [Offline Sync Model](https://ajdench.github.io/ProJob-Wiki/architecture/offline-sync-model/) require photos, signatures, notes, documents, and metadata to work offline and sync safely.

Evidence patterns:

- Capture locally first, then queue upload with visible per-file state.
- Show required evidence against checklist rows and job completion gates.
- Use append-only defaults for photos and signatures.
- Show upload retry and conflict state on the evidence item itself.
- Preserve audit metadata: creator, time, device, checksum, job, and checklist link where relevant.
- Allow supervisors to review evidence in a side-by-side checklist/evidence layout.

Decision: required evidence should block server-side completion if not synced, but it should not erase local field progress.

### UI Framework Recommendation And Rationale

Use **React + TypeScript + Tailwind CSS + ProJob-owned components over shadcn/ui/Radix primitives**, with TanStack tools for data-heavy office views.

Recommended stack:

| Layer | Recommendation | Rationale |
| --- | --- | --- |
| App framework | React + TypeScript, likely Vite or a light router-first app | Strong PWA fit and broad ecosystem |
| Styling | Tailwind CSS generated from `design.md` tokens | Keeps implementation aligned with the design contract |
| Base primitives | shadcn/ui over Radix UI | Accessible primitives with source ownership |
| Data tables | TanStack Table | Headless control for dense desktop workflows |
| Server/cache state | TanStack Query | Fits sync-aware API data and background refresh |
| Routing | TanStack Router or React Router | Supports multi-workspace product routing |
| Forms | React Hook Form + Zod | Good fit for checklists, validation, and API contracts |
| Scheduling | FullCalendar or custom scheduler prototype | Test resource assignment, touch, and license constraints |
| Drag and drop | dnd kit | Useful for boards and assignment |
| Icons | Lucide | Consistent open-source icon vocabulary |

Decision: do not adopt a rigid enterprise component suite as the default visual system. MUI, Mantine, Chakra, PrimeReact, Ionic, and Quasar remain useful benchmarks, but ProJob needs owned workflow components for offline state, evidence capture, role-aware navigation, and cross-surface consistency.

## Do's and Don'ts

- Do start all UI work from `design.md` before adding a new theme value.
- Do build the first prototype around field job execution, supervisor review, and office scheduling/review.
- Do make sync and conflict state visible on jobs, checklist responses, evidence, and supervisor queues.
- Do use tables and boards where office users need comparison and repeated action.
- Do keep client/subcontractor views scoped and plain.
- Don't expose native ERP/planning/form-tool screens to everyday users unless the Wiki explicitly accepts that for admin-only use.
- Don't create a marketing landing page as the first app screen.
- Don't use separate visual languages for mobile, tablet, and desktop.
- Don't allow colour-only status, hidden sync failures, or silent conflict overwrite.
- Don't hardcode a UI framework theme that cannot be traced back to this file.
