import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthLayout } from '#/routes/__auth.tsx'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: AuthLayout,
})
