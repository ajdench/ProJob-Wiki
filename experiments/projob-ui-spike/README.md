# ProJob UI Spike

This is the first React/Vite/Tailwind/shadcn implementation spike for the ProJob application suite.

It ports the earlier static prototype into reusable React components backed by local mock data. The goal is to test whether the recommended UI stack from the wiki can express:

- Phone-first field job execution.
- Offline checklist progress and evidence capture.
- Sync queue visibility.
- Tablet/desktop supervisor review.
- Desktop scheduling, table, and board surfaces.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- shadcn/ui source components over Radix primitives
- Lucide icons
- Local mock state only

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
