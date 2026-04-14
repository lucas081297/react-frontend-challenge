import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  redirect,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'
import * as React from 'react'
import { QueryClient } from '@tanstack/query-core'
import { CookiesProvider } from 'react-cookie'
import { getToken } from '#/store/cookie.store.ts'
import type { RouterContext } from '#/router.tsx'
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos de cache padrão
      retry: 1,
    },
  },
})

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: ({ location }) => {
    const isAuthenticated = getToken()

    if (!isAuthenticated && location.pathname !== '/login') {
      throw redirect({ to: '/login' })
    }

    return {
      auth: { isAuthenticated },
    } as const
  },
  context: () => ({
    auth: { isAuthenticated: false },
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
    scripts: [
      {
        type: 'text/javascript',
        innerHTML: `
          (function() {
            const theme = localStorage.getItem('theme') || 'dark';
            const parsed = JSON.parse(theme);
            const themeName = parsed?.state?.theme || 'dark';
            document.documentElement.classList.add(themeName);
          })()
        `,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  // Get theme from localStorage on client side
  const [themeClass, setThemeClass] = React.useState('dark')

  React.useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setThemeClass(parsed?.state?.theme || 'dark')
      } catch {
        setThemeClass('dark')
      }
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning className={themeClass}>
      <head>
        <title></title>
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere]">
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <Toaster />
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
