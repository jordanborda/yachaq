'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@/lib/supabase/client'
import { BookOpen } from 'lucide-react'

export default function AuthCallback() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error en callback:', error.message)
          router.push('/?error=auth_failed')
          return
        }

        if (data.session) {
          // Usuario autenticado exitosamente
          router.push('/intranet')
        } else {
          // No hay sesión, redirigir al login
          router.push('/')
        }
      } catch (error) {
        console.error('Error procesando callback:', error)
        router.push('/?error=unexpected')
      }
    }

    handleAuthCallback()
  }, [router, supabase])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white animate-pulse" />
        </div>
        <div className="text-slate-600 font-medium">Completando autenticación...</div>
        <div className="w-8 h-8 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    </div>
  )
}