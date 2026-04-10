import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger } from '#/components/ui/sidebar.tsx'
import AppSidebar from '#/components/Sidebar.tsx'

export const Route = createFileRoute('/__auth')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: AuthLayout,
})

export function AuthLayout() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-y-auto">
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger />
            {<Outlet />}
          </main>
        </SidebarProvider>
      </main>
    </div>
  )
}
