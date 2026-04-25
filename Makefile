.PHONY: check wiki-check design-check

MKDOCS ?= .venv/bin/mkdocs

check: design-check wiki-check

wiki-check:
	@if [ -x "$(MKDOCS)" ]; then \
		"$(MKDOCS)" build --strict; \
	else \
		mkdocs build --strict; \
	fi

design-check:
	npx --yes @google/design.md lint design.md
