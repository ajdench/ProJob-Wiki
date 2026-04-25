# Findings: UI Framework Spike

Date: 2026-04-25

## Candidate

React + TypeScript + Vite + Tailwind CSS + shadcn/ui/Radix + Lucide.

The spike lives in [`experiments/projob-ui-spike`](https://github.com/ajdench/ProJob-Wiki/tree/main/experiments/projob-ui-spike).

## Purpose

Validate whether the recommended UI framework path from [UI Framework Options](../../architecture/ui-framework-options.md) can express the ProJob design contract in [`design.md`](https://github.com/ajdench/ProJob-Wiki/blob/main/design.md).

## Current Scope

The first spike includes:

- Phone-style field job execution panel.
- Checklist rows with local completion state.
- Evidence and sync-state treatment.
- Sync queue sheet.
- Desktop/tablet office workspace with dispatch, review, table, and route/dependency tabs.
- ProJob semantic status chips mapped to design-token colours.

## Initial Findings

| Area | Finding |
| --- | --- |
| Component ownership | shadcn source components work well as low-level primitives while ProJob owns job cards, review rows, status chips, and evidence panels |
| Responsive fit | One React surface can express phone, tablet, and desktop layouts without forking the visual language |
| Offline/sync UX | Sync queue, pending states, and local checklist progress can be made first-class UI components |
| Desktop density | Cards, tabs, tables, and queues are adequate for a first scheduling/review surface; TanStack Table should be tested once real data density increases |
| Implementation risk | Tailwind/shadcn setup needs repo checks so generated component and token drift is caught early |

## Browser Verification

Playwright CLI was used because no in-app browser control was exposed in this session.

Verified interactions:

- Checklist checkbox updates local completion count.
- Sync queue opens as a shadcn/Radix sheet and can be dismissed.
- Board/Table/Map tabs switch the office workspace content.
- Selecting a dispatch job updates the phone job summary, detail panel, and evidence panel.
- Mobile viewport (`390x844`) keeps the field, review, and office surfaces readable in a single-column flow.

Issue found and fixed:

- The first React pass rendered two independent tab groups, so visible tabs did not control the content panel. The fix moved the office header and content into one shared shadcn `Tabs` root.

## Validation

Run from the repo root:

```bash
make check
```

This validates:

- `design.md` lint.
- UI spike lint.
- UI spike production build.
- Strict MkDocs build.

## Next Checks

- Browser-test the spike at mobile, tablet, and desktop viewports.
- Add TanStack Table once schedule/resource rows become materially denser.
- Compare Quasar or Ionic only if the React spike shows mobile ergonomics or packaging weaknesses.
