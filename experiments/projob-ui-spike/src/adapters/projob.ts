import { initialOdooFieldJob, odooDispatchJobs } from './odoo-fixture'
import { openProjectDispatchJobs, openProjectFieldJob } from './openproject-fixture'

export type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'sync' | 'neutral'
export type QueueState = 'pending' | 'synced' | 'failed' | 'conflict'
export type JobStatus = 'Assigned' | 'In progress' | 'Completed offline' | 'Ready for review' | 'Approved'
export type DemoSourceMode = 'combined' | 'odoo' | 'openproject'

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
  fieldJob: FieldJob
  queue: QueueEntry[]
  offlineMode: boolean
  sourceMode: DemoSourceMode
}

export const storageKey = 'projob-ui-spike.vertical-slice.v2'

export const sourceOptions: Array<{ value: DemoSourceMode; label: string; detail: string }> = [
  {
    value: 'combined',
    label: 'Combined',
    detail: 'Odoo work order plus OpenProject dependencies',
  },
  {
    value: 'odoo',
    label: 'Odoo-shaped',
    detail: 'ERP/FSM work orders, sites, materials, and review state',
  },
  {
    value: 'openproject',
    label: 'OpenProject-shaped',
    detail: 'Programme work packages, blockers, and milestones',
  },
]

export function createInitialState(sourceMode: DemoSourceMode): PersistedState {
  return {
    fieldJob: sourceMode === 'openproject' ? openProjectFieldJob : initialOdooFieldJob,
    queue: [],
    offlineMode: false,
    sourceMode,
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
          ? `${pendingCount} local changes pending`
          : 'Synced locally',
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
