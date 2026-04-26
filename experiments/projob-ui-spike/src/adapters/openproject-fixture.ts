import { initialOdooFieldJob } from './odoo-fixture'
import type { DispatchJob, FieldJob } from './projob'

export const openProjectFieldJob: FieldJob = {
  ...initialOdooFieldJob,
  id: 'OP-2187',
  title: 'G99 export approval dependency check',
  site: 'Farm workshop PV + BESS, Somerset',
  owner: 'Project manager + DNO coordinator',
  status: 'Assigned',
  nextAction: 'Confirm G99 offer conditions before inverter commissioning',
  checklist: [
    { id: 'access', label: 'Site access and scaffold window confirmed', required: true, checked: false },
    { id: 'blocker', label: 'DNO G99 offer and export limit reviewed', required: true, checked: false },
    { id: 'photos', label: 'Meter, inverter, and battery location photos attached', required: true, checked: false },
    { id: 'materials', label: 'Inverter, battery, and protection settings recorded', required: true, checked: false },
    { id: 'signature', label: 'Client handover and DNO evidence signed off', required: true, checked: false },
  ],
  evidence: ['OpenProject DNO work package cached'],
  materialUsed: '30kW inverter, 48kWh BESS, export limitation relay',
  source: 'OpenProject DNO dependency fixture',
}

export const openProjectDispatchJobs: DispatchJob[] = [
  {
    id: 'OP-2189',
    title: 'DNO G99 application response',
    site: 'Farm workshop, Somerset',
    window: 'Today',
    owner: 'DNO coordinator',
    status: 'Blocked',
    tone: 'warning',
    nextAction: 'Waiting on network study and export offer before install date',
    checklistDone: 1,
    checklistTotal: 4,
    evidence: ['G99 form draft', 'Programme snapshot'],
    syncState: 'DNO planning event imported',
    material: 'Dependency: approved export capacity',
    source: 'OpenProject DNO dependency fixture',
  },
  {
    id: 'OP-2194',
    title: 'MCS handover pack milestone',
    site: 'Bristol domestic PV + HESS',
    window: 'Fri 01 May',
    owner: 'Compliance lead',
    status: 'At risk',
    tone: 'danger',
    nextAction: 'Commissioning photos and certificate pack drive handover date',
    checklistDone: 0,
    checklistTotal: 3,
    evidence: ['MCS handover baseline'],
    syncState: 'Compliance milestone imported',
    material: 'No install kit: documentation dependency',
    source: 'OpenProject handover milestone fixture',
  },
]
