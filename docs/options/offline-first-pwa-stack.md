# Offline-First PWA Stack

## Summary

A dedicated offline-first PWA is likely required regardless of the selected ERP. The field app should be treated as a product surface, not just a responsive version of the back-office system.

## Candidate Technologies

| Stack | Fit | Notes |
| --- | --- | --- |
| PouchDB + CouchDB | Mature open-source sync | Strong replication model; conflict resolution must be designed |
| RxDB | Modern offline DB and sync layer | Good fit for reactive technician UI; verify licensing for desired features |
| Dexie.js + custom sync | Lightweight IndexedDB approach | Maximum control; highest custom sync burden |
| ElectricSQL | Postgres/local-first oriented | Good if Postgres is central; validate write model for offline field mutations |
| PowerSync | SQLite local store with sync | Strong offline-write pattern; check open edition and licensing |
| Service Worker + Workbox | App shell caching | Needed for installability and offline assets, not enough for data sync |

Sources:

- [Offline First sync comparison](https://offlinefirst.org/sync/)
- [PouchDB/CouchDB offline-first discussion](https://fosdem.org/2026/schedule/event/SDHGJY-local-first-meet-pouchdb-couchdb/)
- [RxDB offline database guide](https://rxdb.info/articles/offline-database.html)

## Field App Responsibilities

- Download assigned jobs, checklist templates, relevant documents, and customer/site metadata.
- Store local events, form submissions, photos, signatures, time entries, and material usage.
- Maintain a visible sync queue.
- Compress/upload attachments reliably.
- Handle conflicts explicitly.
- Avoid blocking work when the network disappears.

## Sync Design Principles

- Store local changes as immutable events where possible.
- Use server-generated authoritative IDs after sync, but allow temporary local IDs.
- Make uploads idempotent with client mutation IDs.
- Treat photos/files as separate attachment upload units with retry state.
- Keep a per-record version or vector/clock for conflict detection.
- Never silently overwrite checklist answers, signatures, material usage, or timesheets.

## Recommended Starting Point

For a proof-of-concept, test two patterns:

1. **PouchDB + CouchDB** for the simplest fully open-source replication story.
2. **RxDB + custom backend sync** for a more modern app architecture and reactive UI.

The first POC should not attempt to solve full ERP integration. It should prove field reliability first:

- Assigned job opens offline.
- Checklist can be completed offline.
- Photo/signature can be captured offline.
- Material use and time can be recorded offline.
- Sync queue survives app close/reopen.
- Conflicts are visible.

