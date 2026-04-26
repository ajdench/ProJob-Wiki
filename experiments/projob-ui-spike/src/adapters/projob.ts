import { initialOdooFieldJob, odooDispatchJobs } from './odoo-fixture'
import { openProjectDispatchJobs, openProjectFieldJob } from './openproject-fixture'

export type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'sync' | 'neutral'
export type QueueState = 'pending' | 'synced' | 'failed' | 'conflict'
export type JobStatus = 'Assigned' | 'In progress' | 'Completed offline' | 'Ready for review' | 'Approved'
export type QuoteStatus = 'Accepted' | 'Converted'
export type DemoSourceMode = 'combined' | 'odoo' | 'openproject'
export type ScenarioStep = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type ChecklistRow = {
  id: string
  label: string
  required: boolean
  checked: boolean
}

export type FieldJob = {
  id: string
  title: string
  site: string
  window: string
  owner: string
  status: JobStatus
  nextAction: string
  checklist: ChecklistRow[]
  evidence: string[]
  note: string
  timeHours: number
  materialUsed: string
  materialException: boolean
  signatureCaptured: boolean
  source: string
  approvedAt?: string
}

export type QuoteRecord = {
  id: string
  customer: string
  site: string
  property: string
  system: string
  storage: string
  dno: string
  price: string
  margin: string
  status: QuoteStatus
  source: string
}

export type DispatchJob = {
  id: string
  title: string
  site: string
  window: string
  owner: string
  status: string
  tone: StatusTone
  nextAction: string
  checklistDone: number
  checklistTotal: number
  evidence: string[]
  syncState: string
  material: string
  source: string
}

export type QueueEntry = {
  id: string
  label: string
  detail: string
  state: QueueState
  createdAt: string
}

export type PersistedState = {
  quote: QuoteRecord
  fieldJob: FieldJob
  queue: QueueEntry[]
  offlineMode: boolean
  sourceMode: DemoSourceMode
  scenarioStep: ScenarioStep
}

export const storageKey = 'projob-ui-spike.vertical-slice.v5'

export const sourceOptions: Array<{ value: DemoSourceMode; label: string; detail: string }> = [
  {
    value: 'combined',
    label: 'Combined',
    detail: 'Solar installs, DNO approvals, and handover dependencies',
  },
  {
    value: 'odoo',
    label: 'Odoo',
    detail: 'ERP/FSM installs, survey packs, kit, and MCS review state',
  },
  {
    value: 'openproject',
    label: 'OpenProject',
    detail: 'DNO applications, scaffold dates, blockers, and handover milestones',
  },
]

export function createInitialState(sourceMode: DemoSourceMode): PersistedState {
  return {
    quote: createInitialQuote(sourceMode),
    fieldJob: sourceMode === 'openproject' ? openProjectFieldJob : initialOdooFieldJob,
    queue: [],
    offlineMode: false,
    sourceMode,
    scenarioStep: 0,
  }
}

export function createInitialQuote(sourceMode: DemoSourceMode): QuoteRecord {
  const sourceLabel =
    sourceMode === 'openproject'
      ? 'OpenProject opportunity fixture'
      : sourceMode === 'odoo'
        ? 'Odoo quotation fixture'
        : 'Combined quote fixture'

  return {
    id: sourceMode === 'openproject' ? 'Q-OP-2187' : 'Q-1048',
    customer: sourceMode === 'openproject' ? 'Somerset farm workshop' : 'Bristol BS3 homeowner',
    site: sourceMode === 'openproject' ? 'Farm workshop, Somerset' : 'Semi-detached home, Bristol BS3',
    property: sourceMode === 'openproject' ? 'Agricultural workshop roof' : 'Semi-detached domestic roof',
    system: sourceMode === 'openproject' ? '30kW PV array' : '4.3kWp PV array',
    storage: sourceMode === 'openproject' ? '48kWh BESS' : '9.5kWh HESS',
    dno: sourceMode === 'openproject' ? 'G99 application dependency' : 'G98 assumed, G99 check if export changes',
    price: sourceMode === 'openproject' ? 'GBP 68,400' : 'GBP 12,840',
    margin: sourceMode === 'openproject' ? '24% target' : '28% target',
    status: 'Accepted',
    source: sourceLabel,
  }
}

export function sourceDispatchJobs(sourceMode: DemoSourceMode) {
  switch (sourceMode) {
    case 'odoo':
      return odooDispatchJobs
    case 'openproject':
      return openProjectDispatchJobs
    case 'combined':
      return [...openProjectDispatchJobs, ...odooDispatchJobs]
  }
}

export function fieldJobToDispatch(job: FieldJob, queue: QueueEntry[]): DispatchJob {
  const checklistDone = job.checklist.filter((row) => row.checked).length
  const pendingCount = queue.filter((entry) => entry.state === 'pending').length
  const conflictCount = queue.filter((entry) => entry.state === 'conflict').length

  return {
    id: job.id,
    title: job.title,
    site: job.site,
    window: job.window,
    owner: job.owner,
    status: job.status,
    tone: jobTone(job.status),
    nextAction: job.nextAction,
    checklistDone,
    checklistTotal: job.checklist.length,
    evidence: job.evidence,
    syncState:
      conflictCount > 0
        ? `${conflictCount} conflict needs review`
        : pendingCount > 0
          ? `${pendingCount} local install changes pending`
          : 'Install record synced',
    material: job.materialUsed,
    source: job.source,
  }
}

export function makeQueueEntry(label: string, detail: string, state: QueueState): QueueEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    label,
    detail,
    state,
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
}

export function countQueueStates(queue: QueueEntry[]) {
  return queue.reduce<Record<QueueState, number>>(
    (counts, entry) => {
      counts[entry.state] += 1
      return counts
    },
    { pending: 0, synced: 0, failed: 0, conflict: 0 },
  )
}

export function jobTone(status: JobStatus): StatusTone {
  switch (status) {
    case 'Approved':
      return 'success'
    case 'Ready for review':
      return 'info'
    case 'Completed offline':
      return 'warning'
    case 'In progress':
      return 'sync'
    case 'Assigned':
      return 'neutral'
  }
}

export function quoteTone(status: QuoteStatus): StatusTone {
  switch (status) {
    case 'Converted':
      return 'success'
    case 'Accepted':
      return 'info'
  }
}

export function queueTone(state: QueueState): StatusTone {
  switch (state) {
    case 'synced':
      return 'success'
    case 'pending':
      return 'warning'
    case 'failed':
      return 'danger'
    case 'conflict':
      return 'info'
  }
}
