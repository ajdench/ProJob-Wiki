import { initialOdooFieldJob } from './odoo-fixture'
import type { DispatchJob, FieldJob } from './projob'

export const openProjectFieldJob: FieldJob = {
  ...initialOdooFieldJob,
  id: 'OP-2187',
  title: 'Fire stopping dependency inspection',
  site: 'Block C riser, Brixton Hill',
  owner: 'Southline Fire + A. Patel',
  status: 'Assigned',
  nextAction: 'Confirm blocker is cleared before handoff',
  checklist: [
    { id: 'access', label: 'Access route confirmed', required: true, checked: false },
    { id: 'blocker', label: 'Dependency blocker reviewed', required: true, checked: false },
    { id: 'photos', label: 'Riser photos attached', required: true, checked: false },
    { id: 'materials', label: 'Sealant/fire collar requirement recorded', required: true, checked: false },
    { id: 'signature', label: 'Subcontractor handoff signed', required: true, checked: false },
  ],
  evidence: ['OpenProject work package cached'],
  materialUsed: 'Fire collar check, sealant allowance',
  source: 'OpenProject work package fixture',
}

export const openProjectDispatchJobs: DispatchJob[] = [
  {
    id: 'OP-2189',
    title: 'Cable route predecessor check',
    site: 'Block C riser, Brixton Hill',
    window: 'Today',
    owner: 'Subcontractor: Southline Fire',
    status: 'Blocked',
    tone: 'warning',
    nextAction: 'Waiting on containment completion from electrical crew',
    checklistDone: 1,
    checklistTotal: 4,
    evidence: ['Dependency note', 'Programme snapshot'],
    syncState: 'Planning event imported',
    material: 'Dependency: electrical containment',
    source: 'OpenProject dependency fixture',
  },
  {
    id: 'OP-2194',
    title: 'Client handover milestone',
    site: 'Brixton Hill programme',
    window: 'Fri 01 May',
    owner: 'Project manager',
    status: 'At risk',
    tone: 'danger',
    nextAction: 'Riser inspection drives handover date',
    checklistDone: 0,
    checklistTotal: 3,
    evidence: ['Milestone baseline'],
    syncState: 'Planning milestone imported',
    material: 'No field materials',
    source: 'OpenProject milestone fixture',
  },
]
