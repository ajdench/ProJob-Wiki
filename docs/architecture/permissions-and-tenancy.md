# Permissions and Tenancy

## Permission Model

The system should use role-based access combined with company/project scoping.

| Scope | Examples |
| --- | --- |
| Company | Own staff, subcontractor company, client company |
| Project | Construction project, maintenance contract, site package |
| Site/location | Building, customer premises, floor, unit |
| Job/work order | Assigned work only |
| Document | Shared drawing, private commercial quote, signed evidence |

## Roles

| Role | Access |
| --- | --- |
| Platform admin | All configuration and tenancy setup |
| Company admin | Own company users, resources, commercial data |
| Project manager | Project plan, dependencies, work packages, reporting |
| Supervisor | Assign/review jobs, approve field evidence, raise blockers |
| Tradesperson | Assigned jobs and required documents/checklists |
| Subcontractor manager | Own company's assigned work and workers |
| Client viewer | Shared status, approved documents, selected evidence |
| Supplier | Purchase/order-related visibility only |

## External Collaboration Rules

- External users should see only explicitly shared projects, jobs, documents, and comments.
- Financial data should be separated from operational job status unless explicitly shared.
- Subcontractors should not see competing subcontractor commercial or staffing details.
- Client-visible evidence should pass review before exposure.
- Every external access event should be auditable.

## Offline Access Risk

Offline access means data may remain on a device after permissions change. Controls needed:

- Short-lived sync leases for sensitive projects.
- Device revocation list checked at next connection.
- Encrypted local storage where practical.
- Local data expiry for completed/removed jobs.
- Remote wipe is best-effort only for browser PWAs.

