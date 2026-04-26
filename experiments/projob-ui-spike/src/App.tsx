import {
  AlertTriangle,
  Blocks,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Database,
  FileSignature,
  GitBranch,
  HardHat,
  Layers3,
  ListChecks,
  PackageCheck,
  Power,
  RefreshCw,
  Route,
  Save,
  Truck,
  UploadCloud,
  Users,
  Wifi,
  WifiOff,
  Wrench,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  countQueueStates,
  createInitialState,
  fieldJobToDispatch,
  jobTone,
  makeQueueEntry,
  queueTone,
  sourceDispatchJobs,
  sourceOptions,
  storageKey,
} from '@/adapters/projob'
import type {
  DemoSourceMode,
  DispatchJob,
  FieldJob,
  PersistedState,
  QueueEntry,
  QueueState,
  StatusTone,
} from '@/adapters/projob'
import { cn } from '@/lib/utils'

const navigation = [
  { label: 'Quotes', icon: FileSignature },
  { label: 'Jobs', icon: BriefcaseBusiness },
  { label: 'Schedule', icon: CalendarDays },
  { label: 'Resources', icon: Truck },
  { label: 'Review', icon: ClipboardCheck },
  { label: 'Sync queue', icon: RefreshCw },
]

function loadPersistedState(): PersistedState {
  if (typeof window === 'undefined') {
    return createInitialState('combined')
  }

  try {
    const raw = window.localStorage.getItem(storageKey)
    if (!raw) {
      return createInitialState('combined')
    }

    const parsed = JSON.parse(raw) as Partial<PersistedState>
    if (!parsed.fieldJob || !parsed.sourceMode) {
      return createInitialState('combined')
    }

    return parsed as PersistedState
  } catch {
    return createInitialState('combined')
  }
}

function App() {
  const [persisted, setPersisted] = useState<PersistedState>(() => loadPersistedState())
  const [selectedJobId, setSelectedJobId] = useState(() => loadPersistedState().fieldJob.id)

  const { fieldJob, offlineMode, queue, sourceMode } = persisted
  const dispatchJobs = useMemo(
    () => [fieldJobToDispatch(fieldJob, queue), ...sourceDispatchJobs(sourceMode)],
    [fieldJob, queue, sourceMode],
  )
  const selectedJob = dispatchJobs.find((job) => job.id === selectedJobId) ?? dispatchJobs[0]
  const queueCounts = useMemo(() => countQueueStates(queue), [queue])
  const checklistDone = fieldJob.checklist.filter((row) => row.checked).length
  const checklistProgress = Math.round((checklistDone / fieldJob.checklist.length) * 100)
  const canComplete =
    checklistDone === fieldJob.checklist.length &&
    fieldJob.note.trim().length > 0 &&
    fieldJob.evidence.length > 1 &&
    fieldJob.signatureCaptured

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(persisted))
  }, [persisted])

  function mutateJob(updater: (job: FieldJob) => FieldJob, label: string, detail: string, preferredState?: QueueState) {
    setPersisted((current) => {
      const updatedJob = updater(current.fieldJob)
      const entry = makeQueueEntry(label, detail, preferredState ?? (current.offlineMode ? 'pending' : 'synced'))

      return {
        ...current,
        fieldJob: updatedJob,
        queue: [entry, ...current.queue].slice(0, 12),
      }
    })
  }

  function toggleOfflineMode() {
    setPersisted((current) => ({ ...current, offlineMode: !current.offlineMode }))
  }

  function changeSourceMode(source: DemoSourceMode) {
    const nextState = createInitialState(source)
    setPersisted(nextState)
    setSelectedJobId(nextState.fieldJob.id)
    window.localStorage.setItem(storageKey, JSON.stringify(nextState))
  }

  function toggleChecklistRow(id: string, checked: boolean) {
    mutateJob(
      (job) => ({
        ...job,
        status: job.status === 'Assigned' ? 'In progress' : job.status,
        checklist: job.checklist.map((row) => (row.id === id ? { ...row, checked } : row)),
      }),
      `${fieldJob.id} checklist`,
      checked ? 'Checklist item saved locally' : 'Checklist item reopened',
    )
  }

  function updateNote(value: string) {
    setPersisted((current) => ({
      ...current,
      fieldJob: {
        ...current.fieldJob,
        status: current.fieldJob.status === 'Assigned' ? 'In progress' : current.fieldJob.status,
        note: value,
      },
    }))
  }

  function saveNote() {
    mutateJob((job) => job, `${fieldJob.id} commissioning note`, 'Commissioning note queued from field device')
  }

  function addPhotoEvidence() {
    mutateJob(
      (job) => ({
        ...job,
        status: job.status === 'Assigned' ? 'In progress' : job.status,
        evidence: job.evidence.includes('Array and battery photos')
          ? job.evidence
          : [...job.evidence, 'Array and battery photos'],
        checklist: job.checklist.map((row) => (row.id === 'photos' ? { ...row, checked: true } : row)),
      }),
      `${fieldJob.id} install evidence`,
      'Array, inverter, and battery photos staged for upload',
    )
  }

  function captureSignature() {
    mutateJob(
      (job) => ({
        ...job,
        signatureCaptured: true,
        evidence: job.evidence.includes('Customer MCS handover signature')
          ? job.evidence
          : [...job.evidence, 'Customer MCS handover signature'],
        checklist: job.checklist.map((row) => (row.id === 'signature' ? { ...row, checked: true } : row)),
      }),
      `${fieldJob.id} handover signature`,
      'Customer handover signature stored on device',
    )
  }

  function addMaterialException() {
    mutateJob(
      (job) => ({
        ...job,
        materialException: true,
        materialUsed:
          job.source.includes('OpenProject')
            ? '30kW inverter, 48kWh BESS, export limitation relay, extra CT clamp'
            : '10 x 430W modules, 5kW hybrid inverter, 9.5kWh battery, extra roof hooks x8',
        checklist: job.checklist.map((row) => (row.id === 'materials' ? { ...row, checked: true } : row)),
      }),
      `${fieldJob.id} kit exception`,
      'Extra mounting or metering kit needs office approval',
      offlineMode ? 'pending' : 'conflict',
    )
  }

  function completeJob() {
    if (!canComplete) {
      return
    }

    mutateJob(
      (job) => ({
        ...job,
        status: offlineMode ? 'Completed offline' : 'Ready for review',
        nextAction: 'MCS and DNO handover review required',
      }),
      `${fieldJob.id} completion`,
      offlineMode ? 'Commissioning record waiting for network' : 'Commissioning record ready for compliance review',
      offlineMode ? 'pending' : 'synced',
    )
  }

  function syncNow() {
    if (offlineMode) {
      return
    }

    setPersisted((current) => {
      const hasMaterialConflict = current.fieldJob.materialException
      const nextQueue = current.queue.map((entry) => {
        if (entry.state !== 'pending' && entry.state !== 'failed') {
          return entry
        }
        if (hasMaterialConflict && (entry.label.includes('material') || entry.label.includes('kit'))) {
          return { ...entry, state: 'conflict' as const, detail: 'Extra mounting or metering kit requires office approval' }
        }
        return { ...entry, state: 'synced' as const, detail: 'Install record accepted by office system' }
      })

      return {
        ...current,
        fieldJob: {
          ...current.fieldJob,
          status:
            current.fieldJob.status === 'Completed offline' ? 'Ready for review' : current.fieldJob.status,
        },
        queue: nextQueue,
      }
    })
  }

  function failLatestPending() {
    setPersisted((current) => {
      const index = current.queue.findIndex((entry) => entry.state === 'pending')
      if (index === -1) {
        return current
      }

      return {
        ...current,
        queue: current.queue.map((entry, entryIndex) =>
          entryIndex === index
            ? { ...entry, state: 'failed', detail: 'Network timeout; retry required' }
            : entry,
        ),
      }
    })
  }

  function approveJob() {
    setPersisted((current) => ({
      ...current,
      fieldJob: {
        ...current.fieldJob,
        status: 'Approved',
        approvedAt: 'Approved in compliance workspace',
        nextAction: 'MCS handover pack approved',
      },
      queue: [
        makeQueueEntry(`${current.fieldJob.id} approval`, 'Compliance lead approved MCS handover pack', 'synced'),
        ...current.queue,
      ].slice(0, 12),
    }))
  }

  function resetPrototype() {
    const nextState = createInitialState(sourceMode)
    setPersisted(nextState)
    setSelectedJobId(nextState.fieldJob.id)
    window.localStorage.removeItem(storageKey)
  }

  return (
    <main className="min-h-svh bg-[var(--projob-neutral)] text-foreground">
      <div className="grid min-h-svh grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)]">
        <Sidebar offlineMode={offlineMode} queueCounts={queueCounts} />

        <section className="min-w-0 p-4 sm:p-6 xl:p-8">
          <header className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Today, 25 Apr</p>
              <h1 className="mt-1 text-2xl font-bold tracking-normal text-foreground sm:text-3xl">
                ProJob solar and storage operations
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <Button onClick={toggleOfflineMode} variant={offlineMode ? 'destructive' : 'outline'}>
                {offlineMode ? <WifiOff data-icon="inline-start" /> : <Wifi data-icon="inline-start" />}
                {offlineMode ? 'Offline' : 'Online'}
              </Button>
              <Button onClick={resetPrototype} variant="outline">
                <Power data-icon="inline-start" />
                Reset
              </Button>
            </div>
          </header>

          <DemoSourcePanel sourceMode={sourceMode} onChangeSourceMode={changeSourceMode} />

          <SyncBanner
            offlineMode={offlineMode}
            queue={queue}
            queueCounts={queueCounts}
            onFailLatest={failLatestPending}
            onSyncNow={syncNow}
          />

          <section className="grid items-start gap-5 xl:grid-cols-[380px_minmax(0,1fr)]">
            <FieldPhone
              canComplete={canComplete}
              checklistDone={checklistDone}
              checklistProgress={checklistProgress}
              fieldJob={fieldJob}
              offlineMode={offlineMode}
              onAddMaterialException={addMaterialException}
              onAddPhotoEvidence={addPhotoEvidence}
              onCaptureSignature={captureSignature}
              onChecklistChange={toggleChecklistRow}
              onCompleteJob={completeJob}
              onNoteChange={updateNote}
              onSaveNote={saveNote}
            />
            <DesktopWorkspace
              fieldJob={fieldJob}
              dispatchJobs={dispatchJobs}
              queue={queue}
              selectedJob={selectedJob}
              selectedJobId={selectedJobId}
              onApproveJob={approveJob}
              onSelectJob={setSelectedJobId}
            />
          </section>
        </section>
      </div>
    </main>
  )
}

function DemoSourcePanel({
  onChangeSourceMode,
  sourceMode,
}: {
  onChangeSourceMode: (sourceMode: DemoSourceMode) => void
  sourceMode: DemoSourceMode
}) {
  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle>PV and storage backend stitch demo</CardTitle>
        <CardDescription>
          Solar PV, BESS/HESS, DNO, and MCS records are adapted into one shared UI.
        </CardDescription>
        <CardAction>
          <StatusChip tone="neutral">GH Pages ready</StatusChip>
        </CardAction>
      </CardHeader>
      <CardContent className="grid items-start gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)]">
        <div className="grid items-start gap-2 sm:grid-cols-2">
          {sourceOptions.map((option) => (
            <button
              className={cn(
                'grid grid-cols-[1.25rem_minmax(0,1fr)] content-start gap-x-3 gap-y-1 rounded-md border p-3 text-left transition-colors hover:bg-muted',
                option.value === 'combined' && 'sm:col-span-2',
                sourceMode === option.value && 'border-primary bg-muted/70',
              )}
              key={option.value}
              onClick={() => onChangeSourceMode(option.value)}
              type="button"
            >
              {option.value === 'combined' && <Layers3 aria-hidden="true" className="row-span-2 mt-0.5 justify-self-center" />}
              {option.value === 'odoo' && <Blocks aria-hidden="true" className="row-span-2 mt-0.5 justify-self-center" />}
              {option.value === 'openproject' && <GitBranch aria-hidden="true" className="row-span-2 mt-0.5 justify-self-center" />}
              <span className="block text-xs font-bold leading-tight text-muted-foreground">{option.label}</span>
              <span className="block text-sm font-bold leading-snug break-words">{option.detail}</span>
            </button>
          ))}
        </div>
        <div className="grid content-start gap-2 text-sm">
          <InfoRow icon={Blocks} label="Odoo adapter" value="Normalises customer, survey, install, kit, time, and MCS review records" />
          <InfoRow icon={GitBranch} label="OpenProject adapter" value="Normalises DNO, scaffold, work package, blocker, and handover milestone records" />
        </div>
      </CardContent>
    </Card>
  )
}

function Sidebar({
  offlineMode,
  queueCounts,
}: {
  offlineMode: boolean
  queueCounts: Record<QueueState, number>
}) {
  return (
    <aside className="flex flex-col gap-5 bg-primary p-4 text-primary-foreground lg:sticky lg:top-0 lg:h-svh lg:p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-sm border border-primary-foreground/25 font-extrabold">
          PJ
        </span>
        <div>
          <strong className="block">ProJob</strong>
          <span className="block text-sm text-primary-foreground/70">Solar and Storage Ops</span>
        </div>
      </div>

      <nav
        className="grid grid-cols-[repeat(auto-fit,minmax(7.5rem,max-content))] gap-x-5 gap-y-2 pb-1 lg:grid-cols-1 lg:gap-2 lg:pb-0"
        aria-label="Primary"
      >
        {navigation.map((item, index) => {
          const Icon = item.icon
          return (
            <a
              className={cn(
                'grid min-h-10 grid-cols-[1.25rem_max-content] items-center gap-2 rounded-sm px-3 text-sm font-bold text-primary-foreground/75 no-underline transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground',
                index === 0 && 'bg-primary-foreground/12 text-primary-foreground',
              )}
              href={`#${item.label.toLowerCase().replaceAll(' ', '-')}`}
              key={item.label}
            >
              <Icon aria-hidden="true" className="justify-self-center" />
              {item.label}
            </a>
          )
        })}
      </nav>

      <div className="mt-auto flex items-center gap-2 rounded-md border border-primary-foreground/20 p-3 text-sm font-bold">
        <span
          className={cn('size-2.5 rounded-full', offlineMode ? 'bg-amber-300' : 'bg-emerald-300')}
          aria-hidden="true"
        />
        {offlineMode ? 'Offline' : 'Online'}, {queueCounts.pending} pending
      </div>
    </aside>
  )
}

function SyncBanner({
  offlineMode,
  queue,
  queueCounts,
  onFailLatest,
  onSyncNow,
}: {
  offlineMode: boolean
  queue: QueueEntry[]
  queueCounts: Record<QueueState, number>
  onFailLatest: () => void
  onSyncNow: () => void
}) {
  return (
    <Alert
      className={cn(
        'mb-5 border-0 pb-2.5 text-white',
        offlineMode ? 'bg-[var(--projob-warning)]' : 'bg-[var(--projob-sync)]',
      )}
    >
      {offlineMode ? <WifiOff /> : <Wifi />}
      <AlertTitle>{offlineMode ? 'Offline mode: writes are staying local' : 'Online: sync can run'}</AlertTitle>
      <AlertDescription className="flex flex-wrap items-end justify-between gap-x-3 gap-y-2 text-white/88">
        <span className="min-w-0">
          {queueCounts.pending} pending, {queueCounts.synced} synced, {queueCounts.failed} failed,{' '}
          {queueCounts.conflict} conflict
        </span>
        <div className="ml-auto flex flex-wrap justify-end gap-2">
          <Button disabled={offlineMode || queueCounts.pending + queueCounts.failed === 0} onClick={onSyncNow} size="sm" variant="secondary">
            <UploadCloud data-icon="inline-start" />
            Sync now
          </Button>
          <Button disabled={queueCounts.pending === 0} onClick={onFailLatest} size="sm" variant="secondary">
            <AlertTriangle data-icon="inline-start" />
            Fail one
          </Button>
          <SyncQueueSheet queue={queue} />
        </div>
      </AlertDescription>
    </Alert>
  )
}

function SyncQueueSheet({ queue }: { queue: QueueEntry[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="secondary">
          <RefreshCw data-icon="inline-start" />
          Queue
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Sync queue</SheetTitle>
          <SheetDescription>Local writes remain visible until accepted or flagged.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 px-4">
          {queue.length === 0 ? (
            <div className="rounded-md border p-4 text-sm text-muted-foreground">No local mutations yet.</div>
          ) : (
            queue.map((item) => (
              <div className="flex items-center justify-between gap-3 rounded-md border p-3" key={item.id}>
                <div>
                  <strong className="block text-sm">{item.label}</strong>
                  <span className="text-sm text-muted-foreground">{item.detail}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{item.createdAt}</span>
                </div>
                <StatusChip tone={queueTone(item.state)}>{item.state}</StatusChip>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

function FieldPhone({
  canComplete,
  checklistDone,
  checklistProgress,
  fieldJob,
  offlineMode,
  onAddMaterialException,
  onAddPhotoEvidence,
  onCaptureSignature,
  onChecklistChange,
  onCompleteJob,
  onNoteChange,
  onSaveNote,
}: {
  canComplete: boolean
  checklistDone: number
  checklistProgress: number
  fieldJob: FieldJob
  offlineMode: boolean
  onAddMaterialException: () => void
  onAddPhotoEvidence: () => void
  onCaptureSignature: () => void
  onChecklistChange: (id: string, checked: boolean) => void
  onCompleteJob: () => void
  onNoteChange: (value: string) => void
  onSaveNote: () => void
}) {
  return (
    <article
      aria-label="Field mobile prototype"
      className="min-w-0 max-w-full rounded-xl border bg-card p-4 shadow-[0_24px_50px_rgba(23,50,77,0.16)] xl:rounded-[28px]"
      id="jobs"
    >
      <div className="mb-4 flex items-center justify-between text-sm font-bold">
        <span>09:48</span>
        <StatusChip tone={offlineMode ? 'warning' : 'sync'}>{offlineMode ? 'Offline' : 'Online'}</StatusChip>
      </div>

      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-muted-foreground">Installation job</p>
          <h2 className="text-2xl font-bold break-words">{fieldJob.id}</h2>
        </div>
        <StatusChip tone={jobTone(fieldJob.status)}>{fieldJob.status}</StatusChip>
      </div>

      <JobSummary job={fieldJobToDispatch(fieldJob, [])} selected />

      <Card className="mt-4 rounded-md" size="sm">
        <CardHeader>
          <CardTitle>Checklist</CardTitle>
          <CardAction>
            <StatusChip tone="info">
              {checklistDone} of {fieldJob.checklist.length}
            </StatusChip>
          </CardAction>
          <CardDescription>Saved locally, queued for sync when needed</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Progress value={checklistProgress} />
          <div className="flex flex-col gap-2">
            {fieldJob.checklist.map((row) => (
              <label className="flex min-h-10 items-center gap-3 border-t pt-2 text-sm" key={row.id}>
                <Checkbox
                  checked={row.checked}
                  onCheckedChange={(checked) => onChecklistChange(row.id, checked === true)}
                />
                <span>{row.label}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 rounded-md" size="sm">
        <CardHeader>
          <CardTitle>Commissioning</CardTitle>
          <CardDescription>Note, time, kit, photos, DNO/MCS evidence, and signature</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <textarea
            className="min-h-24 rounded-md border bg-background p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onChange={(event) => onNoteChange(event.target.value)}
            placeholder="Commissioning note"
            value={fieldJob.note}
          />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-2">
            <Button onClick={onSaveNote} variant="outline">
              <Save data-icon="inline-start" />
              Save note
            </Button>
            <Button onClick={onAddPhotoEvidence} variant="outline">
              <Camera data-icon="inline-start" />
              Add photo
            </Button>
            <Button onClick={onCaptureSignature} variant="outline">
              <FileSignature data-icon="inline-start" />
              Signature
            </Button>
            <Button onClick={onAddMaterialException} variant="outline">
              <Wrench data-icon="inline-start" />
              Kit change
            </Button>
          </div>
          <Button disabled={!canComplete} onClick={onCompleteJob}>
            <ListChecks data-icon="inline-start" />
            Mark commissioned
          </Button>
        </CardContent>
      </Card>
    </article>
  )
}

function DesktopWorkspace({
  dispatchJobs,
  fieldJob,
  queue,
  selectedJob,
  selectedJobId,
  onApproveJob,
  onSelectJob,
}: {
  dispatchJobs: DispatchJob[]
  fieldJob: FieldJob
  queue: QueueEntry[]
  selectedJob: DispatchJob
  selectedJobId: string
  onApproveJob: () => void
  onSelectJob: (id: string) => void
}) {
  return (
    <section aria-label="Office desktop prototype" className="min-w-0 rounded-lg border bg-card p-4 lg:p-6">
      <Tabs defaultValue="board" className="gap-0">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-muted-foreground">Installations workspace</p>
            <h2 className="mt-1 text-2xl font-bold break-words">Schedule, DNO, handover</h2>
          </div>
          <TabsList>
            <TabsTrigger value="board">Board</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Metric label="Ready today" value="18" icon={CheckCircle2} />
          <Metric label="Needs MCS review" value={fieldJob.status === 'Ready for review' ? '1' : '0'} icon={AlertTriangle} />
          <Metric label="Sync pending" value={String(countQueueStates(queue).pending)} icon={RefreshCw} />
        </div>

        <TabsContent className="mt-5" value="board">
          <div className="grid min-w-0 gap-4 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Dispatch</CardTitle>
                <CardAction>
                  <StatusChip tone="info">{dispatchJobs.length}</StatusChip>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {dispatchJobs.map((job) => (
                  <button
                    className={cn(
                      'w-full rounded-md border p-3 text-left transition-colors hover:bg-muted',
                      selectedJobId === job.id && 'border-primary bg-muted/60',
                    )}
                    key={job.id}
                    onClick={() => onSelectJob(job.id)}
                    type="button"
                  >
                    <JobSummary job={job} />
                  </button>
                ))}
              </CardContent>
            </Card>

            <SupervisorReviewCard fieldJob={fieldJob} queue={queue} onApproveJob={onApproveJob} />
          </div>
        </TabsContent>
        <TabsContent className="mt-5" value="table">
          <ScheduleTable jobs={dispatchJobs} />
        </TabsContent>
        <TabsContent className="mt-5" value="map">
          <RoutePanel selectedJob={selectedJob} />
        </TabsContent>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
          <JobDetailPanel job={selectedJob} />
          <EvidencePanel job={fieldJob} />
        </div>
      </Tabs>
    </section>
  )
}

function SupervisorReviewCard({
  fieldJob,
  queue,
  onApproveJob,
}: {
  fieldJob: FieldJob
  queue: QueueEntry[]
  onApproveJob: () => void
}) {
  const pendingConflict = queue.some((entry) => entry.state === 'conflict')
  const readyForReview = fieldJob.status === 'Ready for review' || fieldJob.status === 'Approved'

  return (
    <Card id="review">
      <CardHeader>
        <CardTitle>Compliance review</CardTitle>
        <CardAction>
          <StatusChip tone={readyForReview ? 'success' : 'neutral'}>{readyForReview ? 'Ready' : 'Waiting'}</StatusChip>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <ReviewQueueRow
          action={readyForReview ? 'Inspect' : 'Queued'}
          detail={
            readyForReview
              ? `${fieldJob.id} has commissioning checks, evidence, time, and signature`
              : `${fieldJob.id} is not synced for MCS handover review yet`
          }
          title={readyForReview ? 'Handover ready' : 'Awaiting commissioning'}
          tone={readyForReview ? 'success' : 'neutral'}
        />
        <ReviewQueueRow
          action={pendingConflict ? 'Resolve' : 'Clear'}
          detail={fieldJob.materialException ? fieldJob.materialUsed : 'No kit exception recorded'}
          title="Kit review"
          tone={pendingConflict ? 'warning' : 'success'}
        />
        <ReviewQueueRow
          action={fieldJob.signatureCaptured ? 'Open' : 'Missing'}
          detail={fieldJob.signatureCaptured ? 'Customer MCS handover signature captured' : 'Customer handover signature still required'}
          title="Handover evidence"
          tone={fieldJob.signatureCaptured ? 'success' : 'danger'}
        />
        <Button disabled={!readyForReview || fieldJob.status === 'Approved'} onClick={onApproveJob}>
          <CheckCircle2 data-icon="inline-start" />
          Approve handover
        </Button>
      </CardContent>
    </Card>
  )
}

function Metric({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: LucideIcon
}) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
        <CardAction>
          <Icon aria-hidden="true" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <strong className="text-3xl">{value}</strong>
      </CardContent>
    </Card>
  )
}

function JobSummary({ job, selected = false }: { job: DispatchJob; selected?: boolean }) {
  return (
    <div
      className={cn(
        'grid min-w-0 grid-cols-1 gap-3 rounded-md border p-3 min-[380px]:grid-cols-[minmax(0,1fr)_auto] min-[380px]:items-start',
        selected ? 'border-primary bg-muted/60' : 'border-border bg-card',
      )}
    >
      <div className="min-w-0">
        <strong className="block truncate">{job.title}</strong>
        <span className="block truncate text-sm text-muted-foreground">{job.site}</span>
        <span className="mt-1 block text-sm text-muted-foreground">{job.window}</span>
        <span className="mt-2 inline-flex rounded-sm bg-secondary px-2 py-1 text-xs font-bold text-secondary-foreground">
          {job.source}
        </span>
      </div>
      <StatusChip tone={job.tone}>{job.status}</StatusChip>
    </div>
  )
}

function ReviewQueueRow({
  action,
  detail,
  title,
  tone,
}: {
  action: string
  detail: string
  title: string
  tone: StatusTone
}) {
  return (
    <div className="grid grid-cols-[4px_minmax(0,1fr)] items-center gap-3 border-t pt-3 min-[380px]:grid-cols-[4px_minmax(0,1fr)_auto]">
      <span className={cn('h-10 rounded-full', statusRailClass(tone))} aria-hidden="true" />
      <div className="min-w-0">
        <strong className="block truncate">{title}</strong>
        <span className="block truncate text-sm text-muted-foreground">{detail}</span>
      </div>
      <Button className="col-start-2 justify-self-start min-[380px]:col-start-auto" variant="outline" size="sm">
        {action}
      </Button>
    </div>
  )
}

function JobDetailPanel({ job }: { job: DispatchJob }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.id} detail</CardTitle>
        <CardDescription>{job.nextAction}</CardDescription>
        <CardAction>
          <StatusChip tone={job.tone}>{job.status}</StatusChip>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        <InfoRow icon={Database} label="Source" value={job.source} />
        <InfoRow icon={HardHat} label="Install team" value={job.owner} />
        <InfoRow icon={Clock3} label="Window" value={job.window} />
        <InfoRow icon={PackageCheck} label="Kit" value={job.material} />
        <InfoRow icon={RefreshCw} label="Sync" value={job.syncState} />
      </CardContent>
    </Card>
  )
}

function EvidencePanel({ job }: { job: FieldJob }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evidence</CardTitle>
        <CardDescription>Append-only field capture</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {job.evidence.map((item) => (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border p-3" key={item}>
            <div className="flex min-w-0 items-center gap-2">
              <FileSignature aria-hidden="true" />
              <span className="text-sm font-semibold break-words">{item}</span>
            </div>
            <StatusChip tone="sync">Local</StatusChip>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ScheduleTable({ jobs }: { jobs: DispatchJob[] }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 overflow-hidden rounded-md border text-sm">
          <div className="hidden min-h-11 grid-cols-[1fr_1.2fr_1fr_auto] items-center gap-4 bg-muted px-4 font-bold text-primary md:grid">
            <span>Job</span>
            <span>Site</span>
            <span>Team</span>
            <span>Status</span>
          </div>
          {jobs.map((job) => (
            <div
              className="grid min-h-11 grid-cols-1 gap-1 border-t px-4 py-3 md:grid-cols-[1fr_1.2fr_1fr_auto] md:items-center md:gap-4"
              key={job.id}
            >
              <span className="font-mono text-xs font-semibold">{job.id}</span>
              <span>{job.site}</span>
              <span className="text-muted-foreground">{job.owner}</span>
              <span className="flex flex-wrap gap-2">
                <StatusChip tone={job.tone}>{job.status}</StatusChip>
                <StatusChip tone="neutral">{job.source.split(' ')[0]}</StatusChip>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function RoutePanel({ selectedJob }: { selectedJob: DispatchJob }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Site and DNO dependency view</CardTitle>
        <CardDescription>Map and grid-connection placeholder for the vertical slice</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        <InfoRow icon={Route} label="Selected site" value={selectedJob.site} />
        <InfoRow icon={Users} label="Install team" value={selectedJob.owner} />
        <InfoRow icon={AlertTriangle} label="Blocker" value={selectedJob.nextAction} />
      </CardContent>
    </Card>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-md border bg-background p-3">
      <Icon aria-hidden="true" className="shrink-0" />
      <div className="min-w-0">
        <span className="block text-xs font-bold text-muted-foreground">{label}</span>
        <strong className="block text-sm break-words">{value}</strong>
      </div>
    </div>
  )
}

function StatusChip({ children, tone }: { children: ReactNode; tone: StatusTone }) {
  return (
    <Badge className={cn('shrink-0 border-0 font-bold capitalize', statusBadgeClass(tone))} variant="secondary">
      {children}
    </Badge>
  )
}

function statusBadgeClass(tone: StatusTone) {
  switch (tone) {
    case 'success':
      return 'bg-[var(--projob-success)] text-white'
    case 'warning':
      return 'bg-[var(--projob-warning)] text-white'
    case 'danger':
      return 'bg-[var(--projob-danger)] text-white'
    case 'info':
      return 'bg-[var(--projob-info)] text-white'
    case 'sync':
      return 'bg-[var(--projob-sync)] text-white'
    case 'neutral':
      return 'bg-secondary text-secondary-foreground'
  }
}

function statusRailClass(tone: StatusTone) {
  switch (tone) {
    case 'success':
      return 'bg-[var(--projob-success)]'
    case 'warning':
      return 'bg-[var(--projob-warning)]'
    case 'danger':
      return 'bg-[var(--projob-danger)]'
    case 'info':
      return 'bg-[var(--projob-info)]'
    case 'sync':
      return 'bg-[var(--projob-sync)]'
    case 'neutral':
      return 'bg-muted'
  }
}

export default App
