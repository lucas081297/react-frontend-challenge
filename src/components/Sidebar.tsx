import {
  BookMarkedIcon,
  Compass,
  HomeIcon,
  type LucideIcon,
  LogOut,
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
import { toast } from 'sonner'

interface SideBarPath {
  name: string
  path: string
  icon: LucideIcon
}

export default function AppSidebar() {
  const navigate = useNavigate()
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
    <Sidebar className="border-r border-white/5 shadow-2xl">
      <SidebarHeader className="bg-surface-variant">
        <div>
          <img alt="Logo" src="public/logo-nobg.png" />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-surface-variant">
        {sideBarPaths.map((path) => {
          return (
            <SidebarGroup className="text-white/60 p-0">
              <Link to={path.path}>
                <div className="flex flex-row gap-2 mx-2 px-1 py-3 rounded hover:bg-on-surface-primary">
                  <path.icon></path.icon>
                  <span>{path.name}</span>
                </div>
              </Link>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
      <SidebarFooter className="bg-surface-variant px-0">
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex flex-row items-center gap-2 mx-2 px-1 py-3 rounded hover:bg-on-surface-primary text-white/60">
              <div className="w-8 h-8 rounded-full bg-on-surface-primary/20 flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <span className="text-sm">Conta</span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-surface-variant border-white/5"
          >
            <SheetHeader>
              <SheetTitle className="text-white">Minha Conta</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-on-surface-primary/20 flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-medium">Usuário</span>
                  <span className="text-white/60 text-sm">
                    usuario@email.com
                  </span>
                </div>
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
