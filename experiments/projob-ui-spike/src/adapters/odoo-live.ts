import type { DispatchJob, FieldJob } from './projob'

export type OdooLiveConfig = {
  baseUrl: string
  database: string
  username?: string
}

export type FieldCompletionMutation = {
  jobId: string
  checklist: FieldJob['checklist']
  evidence: string[]
  materialUsed: string
  note: string
  signatureCaptured: boolean
  timeHours: number
}

export type OdooLiveAdapter = {
  listWorkOrders: () => Promise<DispatchJob[]>
  getWorkOrder: (id: string) => Promise<FieldJob | null>
  pushFieldCompletion: (mutation: FieldCompletionMutation) => Promise<{ remoteId: string; status: 'accepted' }>
}

export function createOdooLiveAdapter(config: OdooLiveConfig): OdooLiveAdapter {
  return {
    listWorkOrders: () => notConnected(config, 'listWorkOrders'),
    getWorkOrder: () => notConnected(config, 'getWorkOrder'),
    pushFieldCompletion: () => notConnected(config, 'pushFieldCompletion'),
  }
}

function notConnected<T>(config: OdooLiveConfig, method: string): Promise<T> {
  return Promise.reject(
    new Error(
      `Odoo live adapter method ${method} is defined but not connected. Configure auth/proxy for ${config.baseUrl} before enabling live mode.`,
    ),
  )
}
