# Odoo + OCA Field Service POC

This experiment is for validating Odoo Community plus OCA Field Service against the common ProJob test scenario.

## Current Status

Ready to run with Docker via Colima:

- `docker`: installed and verified.
- `docker compose`: installed and verified.
- `colima`: installed, started, and verified with `hello-world`.
- `podman`: installed and machine image initialized, but `podman machine start` currently fails/hangs at `vfkit`.

Use Docker/Colima for this POC.

## Target Versions

- Odoo Community: `19.0`
- OCA branches: `19.0`
- PostgreSQL: `16`

The OCA `19.0` branch was verified on 2026-04-24 for:

- `OCA/field-service`
- `OCA/server-tools`
- `OCA/web`
- `OCA/sale-workflow`

## Setup

Clone required OCA repositories:

```bash
cd /Users/andrew/Projects/Pro-Job/experiments/odoo-oca
git clone --depth 1 --branch 19.0 https://github.com/OCA/field-service.git addons/field-service
git clone --depth 1 --branch 19.0 https://github.com/OCA/server-tools.git addons/server-tools
git clone --depth 1 --branch 19.0 https://github.com/OCA/web.git addons/web
git clone --depth 1 --branch 19.0 https://github.com/OCA/sale-workflow.git addons/sale-workflow
```

Start the stack:

```bash
colima start
docker compose up -d
```

Open:

```text
http://127.0.0.1:8069
```

## First Database

Use Odoo's web database manager on first launch:

- Database name: `projob_odoo_poc`
- Email: evaluator email
- Password: local test password
- Demo data: enabled for exploration

## First Modules to Install

Install core Odoo apps first:

- CRM
- Sales
- Inventory
- Invoicing / Accounting
- Project
- Timesheets

Then search for and install OCA field-service modules required by the test plan.

## POC Evidence

Record findings in:

```text
docs/poc/findings/odoo-oca.md
```

Put screenshots in:

```text
docs/assets/poc/odoo-oca/
```

## Cleanup

```bash
docker compose down
```

To remove local database state:

```bash
docker compose down -v
rm -rf data/
```
