import {
  BookMarkedIcon,
  Compass,
  HomeIcon,
  type LucideIcon,
  LogOut,
  Moon,
  Sun,
  User,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from '@tanstack/react-router'
import { removeToken } from '#/store/cookie.store.ts'
import { useThemeStore } from '#/store/theme.store.ts'
import { toast } from 'sonner'

interface SideBarPath {
  name: string
  path: string
  icon: LucideIcon
}

export default function AppSidebar() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useThemeStore()
  const sideBarPaths: SideBarPath[] = [
    { name: 'Home', path: '/home', icon: HomeIcon },
    { name: 'Explorar', path: '/explore', icon: Compass },
    { name: 'Minha Lista', path: '/watchlist', icon: BookMarkedIcon },
  ]

  const handleLogout = () => {
    removeToken()
    toast.success('Você saiu da conta')
    navigate({ to: '/login', replace: true })
  }

  return (
    <Sidebar
      className="border-r shadow-2xl"
      style={{
        borderColor: 'var(--border-color)',
        backgroundColor: 'var(--bg-surface-variant)',
      }}
    >
      <SidebarHeader style={{ backgroundColor: 'var(--bg-surface-variant)' }}>
        <div>
          <img alt="Logo" src="public/logo-nobg.png" />
        </div>
      </SidebarHeader>
      <SidebarContent style={{ backgroundColor: 'var(--bg-surface-variant)' }}>
        {sideBarPaths.map((path) => {
          return (
            <SidebarGroup className="p-0">
              <Link to={path.path}>
                <div
                  className="flex flex-row gap-2 mx-2 px-1 py-3 rounded transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)] cursor-pointer"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <path.icon></path.icon>
                  <span>{path.name}</span>
                </div>
              </Link>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
      <SidebarFooter
        className="px-0"
        style={{ backgroundColor: 'var(--bg-surface-variant)' }}
      >
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="flex flex-row items-center gap-2 mx-2 px-1 py-3 rounded transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)] cursor-pointer"
              style={{ color: 'var(--text-secondary)' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--bg-overlay)' }}
              >
                <User size={18} style={{ color: 'var(--text-primary)' }} />
              </div>
              <span className="text-sm">Conta</span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            style={{
              backgroundColor: 'var(--bg-surface-variant)',
              borderColor: 'var(--border-color)',
            }}
          >
            <SheetHeader>
              <SheetTitle style={{ color: 'var(--text-primary)' }}>
                Minha Conta
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              <div
                className="flex items-center gap-3 p-4 rounded-lg"
                style={{ backgroundColor: 'var(--bg-overlay)' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bg-overlay)' }}
                >
                  <User size={24} style={{ color: 'var(--text-primary)' }} />
                </div>
                <div className="flex flex-col">
                  <span
                    style={{ color: 'var(--text-primary)' }}
                    className="font-medium"
                  >
                    Usuário
                  </span>
                  <span
                    style={{ color: 'var(--text-muted)' }}
                    className="text-sm"
                  >
                    usuario@email.com
                  </span>
                </div>
              </div>

              <div
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: 'var(--bg-overlay)' }}
              >
                <span
                  style={{ color: 'var(--text-primary)' }}
                  className="font-medium"
                >
                  Tema
                </span>
                <button
                  onClick={toggleTheme}
                  className="relative flex items-center justify-between w-20 h-10 rounded-full px-1 transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-color)',
                  }}
                  aria-label={
                    theme === 'dark'
                      ? 'Mudar para modo claro'
                      : 'Mudar para modo escuro'
                  }
                >
                  <span
                    className={`absolute w-8 h-8 rounded-full transition-transform duration-300 ${
                      theme === 'dark' ? 'translate-x-0' : 'translate-x-10'
                    }`}
                    style={{ backgroundColor: 'var(--primary-color)' }}
                  />
                  <Moon
                    size={16}
                    className="z-10 ml-1"
                    style={{
                      color:
                        theme === 'dark'
                          ? 'var(--text-primary)'
                          : 'var(--text-muted)',
                    }}
                  />
                  <Sun
                    size={16}
                    className="z-10 mr-1"
                    style={{
                      color:
                        theme === 'light'
                          ? 'var(--text-primary)'
                          : 'var(--text-muted)',
                    }}
                  />
                </button>
              </div>

              <Button
                variant="destructive"
                className="w-full flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Sair
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </SidebarFooter>
    </Sidebar>
  )
}
