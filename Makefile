.PHONY: check wiki-check design-check ui-spike-check demo-site-copy

MKDOCS ?= .venv/bin/mkdocs

check: design-check ui-spike-check wiki-check demo-site-copy

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

demo-site-copy:
	mkdir -p site/demo/projob-ui
	cp -R experiments/projob-ui-spike/dist/. site/demo/projob-ui/
