'use client'

import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { memo, useMemo } from 'react'
import { 
  Home, 
  UserPlus, 
  Video, 
  Users, 
  LogOut, 
  User,
  Bell,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavigationItem {
  id: string
  label: string
  href: string
  icon: React.ElementType
}

const navigationItems: NavigationItem[] = [
  { id: 'intranet', label: 'Intranet', href: '/intranet', icon: Home },
  { id: 'matricula', label: 'Matrícula', href: '/matricula', icon: UserPlus },
  { id: 'aula-virtual', label: 'Aula Virtual', href: '/aula-virtual', icon: Video },
  { id: 'gestion-docentes', label: 'Gestión de Docentes', href: '/gestion-docentes', icon: Users },
]

function MainHeader() {
  const router = useRouter()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const userInitials = useMemo(() => {
    if (!user?.user_metadata?.full_name) return ''
    return user.user_metadata.full_name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }, [user?.user_metadata?.full_name])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800 shadow-2xl">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo y Brand */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Y</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">Yachaq</span>
            </div>
            
            {/* Separador */}
            <div className="w-px h-6 bg-gray-700" />
            
            {/* Navegación Principal */}
            <nav className="flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = router.pathname === item.href
                
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    prefetch={true}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "relative h-9 px-3 py-1.5 text-sm font-medium transition-all duration-75 ease-out rounded-md",
                        "hover:bg-white hover:text-black hover:shadow-lg",
                        "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50",
                        isActive 
                          ? "bg-white text-black shadow-md" 
                          : "text-white bg-transparent hover:bg-white/10"
                      )}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                      {isActive && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                      )}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Acciones de Usuario */}
          <div className="flex items-center space-x-3">
            {/* Notificaciones */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white hover:text-black p-2 h-9 w-9 rounded-md transition-all duration-200"
            >
              <Bell className="w-4 h-4" />
            </Button>

            {/* Configuraciones */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white hover:text-black p-2 h-9 w-9 rounded-md transition-all duration-200"
            >
              <Settings className="w-4 h-4" />
            </Button>

            {/* Separador */}
            <div className="w-px h-6 bg-gray-700" />

            {/* Perfil de Usuario */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  {user?.user_metadata?.avatar_url ? (
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt="Avatar" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-xs font-semibold">
                      {userInitials || <User className="w-4 h-4" />}
                    </span>
                  )}
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-white text-sm font-medium">
                    {user?.user_metadata?.full_name || 'Usuario'}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Logout */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-red-400 hover:bg-red-500 hover:text-white p-2 h-9 w-9 rounded-md transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default memo(MainHeader)

