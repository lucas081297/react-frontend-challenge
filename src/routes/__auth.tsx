import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger } from '#/components/ui/sidebar.tsx'
import AppSidebar from '#/components/Sidebar.tsx'
import { QueryClientProvider } from '@tanstack/react-query'

export const Route = createFileRoute('/__auth')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: AuthLayout,
})

export function AuthLayout() {
  const { queryClient } = Route.useRouteContext()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-background-primary">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex items-center p-4 md:hidden">
              <SidebarTrigger />
            </div>
            <Outlet />
          </main>
        </SidebarProvider>
      </div>
    </QueryClientProvider>
  )
}
