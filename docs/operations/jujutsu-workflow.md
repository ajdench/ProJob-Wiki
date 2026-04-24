# Jujutsu Workflow

## Purpose

This research wiki uses Jujutsu (`jj`) for local version control. The repository is colocated with Git, so normal Git tooling can still read the history when needed.

## Daily Workflow

Check current changes:

```bash
jj status
```

View history:

```bash
jj log
```

Describe the current change:

```bash
jj describe -m "Update offline-first PWA research"
```

Start a new change:

```bash
jj new
```

Show the current diff:

```bash
jj diff
```

## Sharing Later

Because this was initialized with `jj git init --colocate`, there is also a Git repository in the workspace. If the research pack later needs to be pushed to GitHub or another Git remote, use Jujutsu's Git interop commands.

Common commands:

```bash
jj git remote add origin <repo-url>
jj git push
```

## Working Agreement

- Keep each meaningful documentation change described with `jj describe`.
- Use `jj new` before starting unrelated research or architecture changes.
- Keep generated site output out of version control.
- Keep source Markdown files as the durable record.

