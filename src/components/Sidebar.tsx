import { BookMarkedIcon, HomeIcon, type LucideIcon, Settings } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'

interface SideBarPath {
  name: string
  path: string
  icon: LucideIcon
}

export default function AppSidebar() {
  const sideBarPaths: SideBarPath[] = [
    { name: 'Home', path: '/home', icon: HomeIcon },
    { name: 'Minha Lista', path: '/watchlist', icon: BookMarkedIcon },
  ]

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
        <Link to="/home">
          <div className="flex flex-row gap-2 mx-2 px-1 py-3 rounded hover:bg-on-surface-primary">
            <Settings/>
            <span>Configurações</span>
          </div>
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
