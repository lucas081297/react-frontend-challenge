import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient } from '@tanstack/query-core'

type Context = { isAuthenticated: boolean, queryClient: QueryClient }

export function getRouter() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutos de cache padrão
        retry: 1,
      },
    },
  })


  return createTanStackRouter({
    routeTree,
    context: {
      isAuthenticated: false,
      queryClient
    } as Context,
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
