# ProJob UI Spike

This is the first React/Vite/Tailwind/shadcn implementation spike for the ProJob application suite.

It ports the earlier static prototype into reusable React components backed by local mock data and local browser persistence. The goal is to test whether the recommended UI stack from the wiki can express:

- Phone-first field job execution.
- Offline checklist progress, notes, evidence, signatures, and material exceptions.
- A visible mutation queue with pending, synced, failed, and conflict states.
- Tablet/desktop supervisor review and approval after sync.
- Desktop scheduling, table, and board surfaces.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- shadcn/ui source components over Radix primitives
- Lucide icons
- Local mock state in `localStorage`
- Static Odoo-shaped and OpenProject-shaped fixture data

## Visible Flow

When running locally, use the buttons in the prototype to:

1. Toggle offline mode.
2. Complete checklist rows, add a note, capture photo/signature placeholders, and add a material exception.
3. Mark the job complete while offline.
4. Return online and sync the queued mutations.
5. Review the job in the supervisor panel and approve completion.
6. Switch between combined, Odoo-shaped, and OpenProject-shaped source modes.

This is still a mocked prototype. It proves UI behaviour and state language before selecting the real local database and sync engine.

The app is built into the published wiki artifact under `/demo/projob-ui/`.

## Commands

From this folder:

```bash
npm install
npm run dev
npm run lint
npm run build
```

From the repo root:

```bash
make check
```

The root check runs this spike's lint and build commands before the MkDocs wiki build.

## Design Contract

Use the root [`../../design.md`](../../design.md) file as the source of truth for colours, typography, spacing, status language, responsive layout rules, and component intent.

The implementation maps those tokens into `src/index.css` and then composes ProJob-specific components in `src/App.tsx`.
