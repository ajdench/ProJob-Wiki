.PHONY: check wiki-check design-check ui-spike-check

MKDOCS ?= .venv/bin/mkdocs

check: design-check ui-spike-check wiki-check

wiki-check:
	@if [ -x "$(MKDOCS)" ]; then \
		"$(MKDOCS)" build --strict; \
	else \
		mkdocs build --strict; \
	fi

design-check:
	npx --yes @google/design.md lint design.md

ui-spike-check:
	npm --prefix experiments/projob-ui-spike run lint
	npm --prefix experiments/projob-ui-spike run build
