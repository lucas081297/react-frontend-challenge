import {
  HeadContent,
  Scripts,
  createRootRoute,
  redirect,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'
import * as React from 'react'
import { QueryClient } from '@tanstack/query-core'
import { CookiesProvider } from 'react-cookie'
import { getToken } from '#/store/cookie.store.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos de cache padrão
      retry: 1,
    },
  },
})

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const isAuthenticated = getToken()
    // Redireciona para login se não autenticado e não está já na página de login
    if (!isAuthenticated && location.pathname !== '/login') {
      throw redirect({ to: '/login' })
    }
    return {
      isAuthenticated,
    }
  },
  context: () => ({
    isAuthenticated: getToken(),
    queryClient,
  }),
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Rotten Potatoes',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title></title>
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere]">
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          {children}
        </CookiesProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
