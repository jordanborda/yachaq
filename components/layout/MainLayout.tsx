<<<<<<< HEAD
'use client'

import { useAuth } from '@/contexts/AuthContext'
import MainHeader from './MainHeader'
import { useRouter } from 'next/router'
import { useEffect, memo } from 'react'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

function MainLayout({ children, className = '' }: MainLayoutProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg animate-pulse">Y</span>
          </div>
          <div className="text-slate-600 font-medium">Cargando...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <MainHeader />
      
      {/* Secondary Header con logos */}
      <div className="fixed top-14 left-0 right-0 z-[45] bg-white border-b border-zinc-200 shadow-sm">
        <div className="flex items-center h-24 relative overflow-hidden">
          {/* Logo Universidad - Extremo Izquierdo */}
          <div className="flex items-center h-full z-10 pl-4">
            <img 
              src="/logo-universidad.jpg" 
              alt="Logo Universidad" 
              className="h-16 w-auto object-contain"
            />
          </div>
          
          {/* Logo Campus - Expandido para cubrir todo el ancho restante */}
          <div className="absolute inset-0 flex items-center justify-end">
            <img 
              src="/campus.webp" 
              alt="Campus" 
              className="h-full w-full object-cover object-center"
              style={{ objectPosition: 'right center' }}
            />
          </div>
          
          {/* Overlay para asegurar que el logo universidad sea visible */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent z-5"></div>
        </div>
      </div>
      
      <main className={`pt-[152px] min-h-screen ${className}`}>
        {children}
      </main>
    </div>
  )
}

export default memo(MainLayout)
=======
// El contenido del archivo MainLayout.tsx
>>>>>>> 7f8368f2931ac26f89411df3f246112cd85681f5
