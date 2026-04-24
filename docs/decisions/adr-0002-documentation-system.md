# ADR 0002: Documentation System

Status: Accepted

Date: 2026-04-24

## Context

The research should be internally readable by humans, versionable, and usable by LLM tools. It should not require a proprietary wiki.

## Decision

Use plain Markdown files with a minimal MkDocs Material configuration.

## Consequences

- Documents can be read directly in any editor.
- The pack can be served as a clean local wiki with `mkdocs serve`.
- Mermaid diagrams and tables provide enough structure for architecture discussions.
- The same Markdown can later be published, indexed, or converted to `llms.txt`/`llms-full.txt` if needed.

