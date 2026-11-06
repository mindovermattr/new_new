import { useLeadsQuery } from '@/api/queries/leads'
import { usePipelinesQuery } from '@/api/queries/pipeline'
import { useUsersQuery } from '@/api/queries/users'
import type { Lead } from '@/api/types/lead.type'
import { computed } from 'vue'
import { mapLeads } from '../model/mapper'

export function useLeadsView() {
  const leadsQuery = useLeadsQuery()
  const pipelineQuery = usePipelinesQuery()
  const usersQuery = useUsersQuery()

  const pipelines = computed(() => pipelineQuery.data.value ?? [])

  const mapped = computed<{ leads: Lead[]; error: Error | null }>(() => {
    const data = leadsQuery.data.value

    if (!data) return { leads: [], error: null }

    try {
      return {
        leads: mapLeads(data._embedded.leads, pipelines.value, usersQuery.data.value ?? []),
        error: null,
      }
    } catch (e) {
      console.error('mapLeads failed', e)
      return { leads: [], error: e as Error }
    }
  })

  const leads = computed(() => mapped.value.leads)
  const mappingError = computed(() => mapped.value.error)

  const isLoading = computed(() => leadsQuery.isPending.value)
  const isError = computed(() => leadsQuery.isError.value)
  const errorMessage = computed(() => leadsQuery.error.value?.message)

  const retry = () => {
    leadsQuery.refetch()
    usersQuery.refetch()
    pipelineQuery.refetch()
  }

  return {
    view: {
      leads,
    },
    state: {
      isLoading,
      isError,
      errorMessage,
      mappingError,
    },
    actions: {
      retry,
    },
  }
}
