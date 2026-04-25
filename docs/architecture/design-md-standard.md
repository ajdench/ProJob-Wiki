# DESIGN.md Standard

## Purpose

This page introduces the Google `design.md` convention as the ProJob design-system source of truth. It should be read alongside [Suite Composition and Design](suite-composition-and-design.md), [UI Framework Options](ui-framework-options.md), and the root [`design.md`](https://github.com/ajdench/ProJob-Wiki/blob/main/design.md) file.

`design.md` is a plain-text format for describing visual identity to humans and coding agents. It combines:

- YAML front matter for machine-readable design tokens.
- Markdown sections for human-readable design rationale and usage rules.

The upstream format is currently marked `alpha`, so ProJob should use it as a lightweight contract rather than a rigid permanent standard.

## ProJob Decision

Use the root-level [`design.md`](https://github.com/ajdench/ProJob-Wiki/blob/main/design.md) file as the canonical design contract for the first ProJob UI prototypes.

The root file now defines a practical design brief for unified mobile, tablet, and desktop ProJob surfaces:

| Token group | ProJob use |
| --- | --- |
| `colors` | App shell, surfaces, semantic statuses, sync health, review attention, and danger states |
| `typography` | Workspace headings, panel titles, body text, compact labels, and operational data |
| `rounded` | Shared shape rules for buttons, panels, chips, and mobile sheets |
| `spacing` | 4px/8px rhythm used by field, tablet, and office layouts |
| `components` | Named style targets for shell, panels, buttons, sync chips, status chips, callouts, and data cells |

The prose in [`design.md`](https://github.com/ajdench/ProJob-Wiki/blob/main/design.md) explains how those tokens should be applied to ProJob screens, including field mobile, supervisor tablet, office desktop, offline/sync states, evidence capture, role-aware navigation, and the UI framework recommendation.

## How Agents And Developers Should Use It

Before creating or changing ProJob UI:

1. Read the root [`design.md`](https://github.com/ajdench/ProJob-Wiki/blob/main/design.md) file.
2. Reuse existing tokens before inventing new values.
3. Add or change tokens in `design.md` before applying a new visual rule in code.
4. Keep UI-specific documentation linked back to the root design contract.
5. Run the repo check when changing the design contract:

```bash
make check
```

This runs the `design.md` linter and a strict MkDocs build. The linter checks structure, broken token references, component contrast, missing token groups, and section order.

## Prototype UI Standard

The first prototype UI should demonstrate the standard rather than introduce a framework dependency. The current static prototype lives at [`experiments/prototype-ui/index.html`](https://github.com/ajdench/ProJob-Wiki/blob/main/experiments/prototype-ui/index.html) and mirrors the [`design.md`](https://github.com/ajdench/ProJob-Wiki/blob/main/design.md) tokens as CSS custom properties.

The prototype covers:

| Surface | What it proves |
| --- | --- |
| Field mobile | Job list/detail, checklist progress, evidence capture, and visible sync state |
| Supervisor tablet | Review queue, exceptions, approvals, and blocked-work visibility |
| Office desktop | Scheduling/review shell, dense rows, status language, and shared navigation |

Future React/Tailwind/shadcn prototypes should preserve this standard by generating Tailwind theme values or CSS variables from `design.md` instead of hardcoding a separate theme.

CI now runs the `design.md` linter before publishing the wiki, so token/reference errors should be caught before GitHub Pages deployment.

## Change Control

Treat [`design.md`](https://github.com/ajdench/ProJob-Wiki/blob/main/design.md) changes like product decisions:

- Update tokens and prose together.
- Keep section headings in the order defined by the spec.
- Record large visual-direction changes in an ADR when they affect product identity, accessibility, or implementation cost.
- Update prototype screens when tokens materially change.
- Do not fork separate visual languages for field, supervisor, and office surfaces.

## Sources

- [Stitch DESIGN.md specification](https://stitch.withgoogle.com/docs/design-md/specification)
- [google-labs-code/design.md repository](https://github.com/google-labs-code/design.md)
