import {
  AlertTriangle,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileSignature,
  Filter,
  HardHat,
  ListChecks,
  PackageCheck,
  RefreshCw,
  Route,
  Truck,
  UploadCloud,
  Users,
  Wifi,
} from 'lucide-react'
import { useMemo, useState } from 'react'

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
import { cn } from '@/lib/utils'

type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'sync' | 'neutral'

type Job = {
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
}

type ReviewItem = {
  title: string
  detail: string
  action: string
  tone: StatusTone
}

const jobs: Job[] = [
  {
    id: 'PJ-1048',
    title: 'Replace extractor fan',
    site: 'Flat 12, Brixton Hill',
    window: '10:30-12:00',
    owner: 'A. Patel + J. Lee',
    status: 'Blocked',
    tone: 'warning',
    nextAction: 'Review missing fire-stop evidence',
    checklistDone: 4,
    checklistTotal: 7,
    evidence: ['Before photos', 'Risk assessment', 'Client note'],
    syncState: '3 local changes pending',
    material: 'Extractor fan, isolator, fixings',
  },
  {
    id: 'PJ-1051',
    title: 'Electrical condition photo set',
    site: 'Unit B, Clapham Works',
    window: '13:00-14:00',
    owner: 'D. Morgan',
    status: 'Cached',
    tone: 'sync',
    nextAction: 'Capture board and route photos',
    checklistDone: 2,
    checklistTotal: 6,
    evidence: ['Site document cached'],
    syncState: 'Available offline',
    material: 'No planned materials',
  },
  {
    id: 'PJ-1055',
    title: 'Boiler panel access repair',
    site: 'Peckham Rye Estate',
    window: '15:30-17:00',
    owner: 'M. Singh',
    status: 'Ready',
    tone: 'success',
    nextAction: 'Start pre-work checklist',
    checklistDone: 0,
    checklistTotal: 5,
    evidence: ['Method statement cached'],
    syncState: 'Synced 09:42',
    material: 'Panel clips, sealant',
  },
]

const reviewItems: ReviewItem[] = [
  {
    title: 'Variation requested',
    detail: 'PJ-1039 added fire stopping around cable route',
    action: 'Open',
    tone: 'warning',
  },
  {
    title: 'Sync failed',
    detail: 'PJ-1042 signature image needs retry',
    action: 'Retry',
    tone: 'danger',
  },
  {
    title: 'Completion evidence ready',
    detail: 'PJ-1044 photos, time, materials, signature',
    action: 'Approve',
    tone: 'success',
  },
]

const syncQueue = [
  { label: 'PJ-1048 checklist answers', state: 'Pending upload', tone: 'warning' as const },
  { label: 'PJ-1048 before photos', state: 'Uploading', tone: 'sync' as const },
  { label: 'PJ-1042 signature image', state: 'Failed retryable', tone: 'danger' as const },
  { label: 'PJ-1051 field pack', state: 'Server accepted', tone: 'success' as const },
]

const navigation = [
  { label: 'Jobs', icon: BriefcaseBusiness },
  { label: 'Schedule', icon: CalendarDays },
  { label: 'Review', icon: ClipboardCheck },
  { label: 'Resources', icon: Truck },
  { label: 'Sync queue', icon: RefreshCw },
]

function App() {
  const [selectedJobId, setSelectedJobId] = useState(jobs[0].id)
  const [completedRows, setCompletedRows] = useState(new Set(['risk', 'photos']))

  const selectedJob = useMemo(
    () => jobs.find((job) => job.id === selectedJobId) ?? jobs[0],
    [selectedJobId],
  )

  const checklistProgress = Math.round((completedRows.size / 5) * 100)

  function toggleChecklistRow(id: string, checked: boolean) {
    setCompletedRows((current) => {
      const next = new Set(current)
      if (checked) {
        next.add(id)
      } else {
        next.delete(id)
      }
      return next
    })
  }

  return (
    <main className="min-h-svh bg-[var(--projob-neutral)] text-foreground">
      <div className="grid min-h-svh grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)]">
        <Sidebar />

        <section className="min-w-0 p-4 sm:p-6 xl:p-8">
          <header className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Today, 25 Apr</p>
              <h1 className="mt-1 text-2xl font-bold tracking-normal text-foreground sm:text-3xl">
                South London service run
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <Button variant="outline">
                <Filter data-icon="inline-start" />
                Filter
              </Button>
              <Button>
                <CalendarDays data-icon="inline-start" />
                New job
              </Button>
            </div>
          </header>

          <SyncBanner />

          <section className="grid items-start gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
            <FieldPhone
              completedRows={completedRows}
              checklistProgress={checklistProgress}
              selectedJob={selectedJob}
              onChecklistChange={toggleChecklistRow}
            />
            <DesktopWorkspace
              selectedJob={selectedJob}
              selectedJobId={selectedJobId}
              onSelectJob={setSelectedJobId}
            />
          </section>
        </section>
      </div>
    </main>
  )
}

function Sidebar() {
  return (
    <aside className="flex flex-col gap-5 bg-primary p-4 text-primary-foreground lg:sticky lg:top-0 lg:h-svh lg:p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-sm border border-primary-foreground/25 font-extrabold">
          PJ
        </span>
        <div>
          <strong className="block">ProJob</strong>
          <span className="block text-sm text-primary-foreground/70">Field operations</span>
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:overflow-visible lg:pb-0" aria-label="Primary">
        {navigation.map((item, index) => {
          const Icon = item.icon
          return (
            <a
              className={cn(
                'flex min-h-10 shrink-0 items-center gap-2 rounded-sm px-3 text-sm font-bold text-primary-foreground/75 no-underline transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground',
                index === 0 && 'bg-primary-foreground/12 text-primary-foreground',
              )}
              href={`#${item.label.toLowerCase().replaceAll(' ', '-')}`}
              key={item.label}
            >
              <Icon aria-hidden="true" />
              {item.label}
            </a>
          )
        })}
      </nav>

      <div className="mt-auto flex items-center gap-2 rounded-md border border-primary-foreground/20 p-3 text-sm font-bold">
        <span className="size-2.5 rounded-full bg-emerald-300" aria-hidden="true" />
        Online, 3 pending
      </div>
    </aside>
  )
}

function SyncBanner() {
  return (
    <Alert className="mb-5 border-0 bg-[var(--projob-sync)] text-[var(--projob-on-sync)]">
      <Wifi />
      <AlertTitle>Offline-ready field pack cached</AlertTitle>
      <AlertDescription className="flex flex-col gap-3 text-[var(--projob-on-sync)]/85 md:flex-row md:items-center md:justify-between">
        <span>12 jobs, 28 documents, 6 checklist templates. Last sync 09:42.</span>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary" size="sm">
              <UploadCloud data-icon="inline-start" />
              View queue
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Sync queue</SheetTitle>
              <SheetDescription>
                Local writes stay visible until the server accepts or flags them.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-3 px-4">
              {syncQueue.map((item) => (
                <div className="flex items-center justify-between gap-3 rounded-md border p-3" key={item.label}>
                  <div>
                    <strong className="block text-sm">{item.label}</strong>
                    <span className="text-sm text-muted-foreground">{item.state}</span>
                  </div>
                  <StatusChip tone={item.tone}>{item.state.split(' ')[0]}</StatusChip>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </AlertDescription>
    </Alert>
  )
}

function FieldPhone({
  completedRows,
  checklistProgress,
  selectedJob,
  onChecklistChange,
}: {
  completedRows: Set<string>
  checklistProgress: number
  selectedJob: Job
  onChecklistChange: (id: string, checked: boolean) => void
}) {
  const checklistRows = [
    { id: 'risk', label: 'Risk assessment saved locally' },
    { id: 'photos', label: 'Before photos attached' },
    { id: 'materials', label: 'Material use recorded' },
    { id: 'signature', label: 'Client signature required' },
    { id: 'notes', label: 'Completion note ready' },
  ]

  return (
    <article
      aria-label="Field mobile prototype"
      className="rounded-xl border bg-card p-4 shadow-[0_24px_50px_rgba(23,50,77,0.16)] xl:rounded-[28px]"
      id="jobs"
    >
      <div className="mb-4 flex items-center justify-between text-sm font-bold">
        <span>09:48</span>
        <StatusChip tone="sync">Online</StatusChip>
      </div>

      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Next job</p>
          <h2 className="text-2xl font-bold">{selectedJob.id}</h2>
        </div>
        <StatusChip tone={selectedJob.tone}>{selectedJob.status}</StatusChip>
      </div>

      <JobSummary job={selectedJob} selected />

      <Card className="mt-4 rounded-md" size="sm">
        <CardHeader>
          <CardTitle>Checklist</CardTitle>
          <CardAction>
            <StatusChip tone="info">
              {completedRows.size} of {checklistRows.length}
            </StatusChip>
          </CardAction>
          <CardDescription>Saved locally, synced when available</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Progress value={checklistProgress} />
          <div className="flex flex-col gap-2">
            {checklistRows.map((row) => (
              <label className="flex min-h-10 items-center gap-3 border-t pt-2 text-sm" key={row.id}>
                <Checkbox
                  checked={completedRows.has(row.id)}
                  onCheckedChange={(checked) => onChecklistChange(row.id, checked === true)}
                />
                <span>{row.label}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="outline">
          <Camera data-icon="inline-start" />
          Photo
        </Button>
        <Button>
          <ListChecks data-icon="inline-start" />
          Continue
        </Button>
      </div>
    </article>
  )
}

function DesktopWorkspace({
  selectedJob,
  selectedJobId,
  onSelectJob,
}: {
  selectedJob: Job
  selectedJobId: string
  onSelectJob: (id: string) => void
}) {
  return (
    <section aria-label="Office desktop prototype" className="rounded-lg border bg-card p-4 lg:p-6">
      <Tabs defaultValue="board" className="gap-0">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Office workspace</p>
            <h2 className="mt-1 text-2xl font-bold">Schedule and review</h2>
          </div>
          <TabsList>
            <TabsTrigger value="board">Board</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Metric label="Ready today" value="18" icon={CheckCircle2} />
          <Metric label="Needs review" value="7" icon={AlertTriangle} />
          <Metric label="Sync pending" value="3" icon={RefreshCw} />
        </div>

        <TabsContent className="mt-5" value="board">
          <div className="grid gap-4 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Dispatch</CardTitle>
                <CardAction>
                  <StatusChip tone="info">6</StatusChip>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {jobs.map((job) => (
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

            <Card id="review">
              <CardHeader>
                <CardTitle>Supervisor review</CardTitle>
                <CardAction>
                  <StatusChip tone="warning">7</StatusChip>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {reviewItems.map((item) => (
                  <ReviewQueueRow item={item} key={item.title} />
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent className="mt-5" value="table">
          <ScheduleTable />
        </TabsContent>
        <TabsContent className="mt-5" value="map">
          <RoutePanel selectedJob={selectedJob} />
        </TabsContent>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
          <JobDetailPanel job={selectedJob} />
          <EvidencePanel job={selectedJob} />
        </div>
      </Tabs>
    </section>
  )
}

function Metric({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: typeof CheckCircle2
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

function JobSummary({ job, selected = false }: { job: Job; selected?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-3 rounded-md border p-3',
        selected ? 'border-primary bg-muted/60' : 'border-border bg-card',
      )}
    >
      <div className="min-w-0">
        <strong className="block truncate">{job.title}</strong>
        <span className="block truncate text-sm text-muted-foreground">{job.site}</span>
        <span className="mt-1 block text-sm text-muted-foreground">{job.window}</span>
      </div>
      <StatusChip tone={job.tone}>{job.status}</StatusChip>
    </div>
  )
}

function ReviewQueueRow({ item }: { item: ReviewItem }) {
  return (
    <div className="grid grid-cols-[4px_minmax(0,1fr)_auto] items-center gap-3 border-t pt-3">
      <span className={cn('h-10 rounded-full', statusRailClass(item.tone))} aria-hidden="true" />
      <div className="min-w-0">
        <strong className="block truncate">{item.title}</strong>
        <span className="block truncate text-sm text-muted-foreground">{item.detail}</span>
      </div>
      <Button variant="outline" size="sm">
        {item.action}
      </Button>
    </div>
  )
}

function JobDetailPanel({ job }: { job: Job }) {
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
        <InfoRow icon={HardHat} label="Crew" value={job.owner} />
        <InfoRow icon={Clock3} label="Window" value={job.window} />
        <InfoRow icon={PackageCheck} label="Materials" value={job.material} />
        <InfoRow icon={RefreshCw} label="Sync" value={job.syncState} />
      </CardContent>
    </Card>
  )
}

function EvidencePanel({ job }: { job: Job }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evidence</CardTitle>
        <CardDescription>Append-only field capture</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {job.evidence.map((item) => (
          <div className="flex items-center justify-between gap-3 rounded-md border p-3" key={item}>
            <div className="flex items-center gap-2">
              <FileSignature aria-hidden="true" />
              <span className="text-sm font-semibold">{item}</span>
            </div>
            <StatusChip tone="sync">Cached</StatusChip>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ScheduleTable() {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 overflow-hidden rounded-md border text-sm">
          <div className="hidden min-h-11 grid-cols-[1fr_1.2fr_1fr_auto] items-center gap-4 bg-muted px-4 font-bold text-primary md:grid">
            <span>Job</span>
            <span>Site</span>
            <span>Crew</span>
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
              <StatusChip tone={job.tone}>{job.status}</StatusChip>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function RoutePanel({ selectedJob }: { selectedJob: Job }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Route and dependency view</CardTitle>
        <CardDescription>Map placeholder for the UI framework spike</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        <InfoRow icon={Route} label="Selected stop" value={selectedJob.site} />
        <InfoRow icon={Users} label="Crew" value={selectedJob.owner} />
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
  icon: typeof CheckCircle2
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-md border bg-background p-3">
      <Icon aria-hidden="true" />
      <div className="min-w-0">
        <span className="block text-xs font-bold text-muted-foreground">{label}</span>
        <strong className="block text-sm">{value}</strong>
      </div>
    </div>
  )
}

function StatusChip({ children, tone }: { children: React.ReactNode; tone: StatusTone }) {
  return (
    <Badge className={cn('shrink-0 border-0 font-bold', statusBadgeClass(tone))} variant="secondary">
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
