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

  return createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })
}

// @ts-ignore - Register interface is used by TanStack Router internally
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
