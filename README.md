# ProJob Wiki

This workspace contains an internal research pack for an offline-first PWA platform for trades, site-work, field-service, and cross-company project operations.

Start here:

- [Research overview](docs/index.md)
- [ProJob UI demo page](docs/demo.md)
- [Design brief](design.md)
- [DESIGN.md standard](docs/architecture/design-md-standard.md)
- [Application suite blueprint](docs/architecture/application-suite-blueprint.md)
- [Prototype UI](experiments/prototype-ui/README.md)
- [Recommended shortlist](docs/evaluation/shortlist.md)
- [Scoring matrix](docs/evaluation/scoring-matrix.md)
- [Target architecture](docs/architecture/target-architecture.md)

## Optional Local Wiki

The documents are plain Markdown. To browse them as a local wiki:

```bash
pip install mkdocs-material
mkdocs serve
```

Then open `http://127.0.0.1:8000`.

## Version Control

This workspace is initialized with [Jujutsu](https://jj-vcs.github.io/jj/latest/) using a colocated Git repository.

Useful commands:

```bash
jj status
jj log
jj describe -m "Describe the current documentation change"
jj new
```

See [Jujutsu workflow](docs/operations/jujutsu-workflow.md) for the local documentation workflow.

## Checks Before Publishing

Run the full local validation before describing and pushing a change:

```bash
make check
```

This runs:

- `npx --yes @google/design.md lint design.md`
- `npm --prefix experiments/projob-ui-spike run lint`
- `npm --prefix experiments/projob-ui-spike run build`
- `mkdocs build --strict`

The GitHub Pages workflow runs the same design lint and UI spike checks before building the published wiki.
