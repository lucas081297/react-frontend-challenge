import { QueryClient } from '@tanstack/query-core'

declare module '@tanstack/react-router' {
  interface Register {
    router: Router
  }
}

export interface RouterContext {
  isAuthenticated: boolean
  queryClient: QueryClient
}

