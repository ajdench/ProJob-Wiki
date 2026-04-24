# ADR 0003: Jujutsu Version Control

Status: Accepted

Date: 2026-04-24

## Context

The research wiki needs local history while it is still exploratory. The workspace may later need to be shared through Git, but the current work benefits from lightweight, amendable changes and easy local branching.

## Decision

Initialize the workspace with Jujutsu using a colocated Git repository:

```bash
jj git init --colocate
```

## Consequences

- `jj` is the preferred local workflow.
- Git compatibility remains available for later remotes, publishing, or migration.
- Documentation changes can stay fluid while still preserving history.
- Contributors unfamiliar with `jj` can still inspect the repository with Git tooling, but should avoid destructive Git commands that remove `.jj/`.

