import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient } from '@tanstack/query-core'

export interface RouterContext {
  auth: {
    isAuthenticated: boolean
  }
  queryClient: QueryClient
}

export function getRouter() {
  const queryClient = new QueryClient()

  return createTanStackRouter({
    routeTree,
    context: {
      auth: {
        isAuthenticated: false,
      },
      queryClient,
    },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
