'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import CompactLogin from '@/components/auth/CompactLogin'
import { BookOpen } from 'lucide-react'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    // Obtener sesión inicial
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        const currentUser = session?.user ?? null
        setUser(currentUser)
        
        // Si hay usuario, redirigir directamente a intranet
        if (currentUser) {
          router.push('/intranet')
        }
      } catch (error) {
        console.error('Error getting session:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)
        setLoading(false)
        
        // Si se autentica, redirigir a intranet
        if (currentUser) {
          router.push('/intranet')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="text-slate-600 font-medium">Cargando Yachaq...</div>
        </div>
      </div>
    )
  }

  // Si hay usuario, se redirige automáticamente a intranet
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="text-slate-600 font-medium">Redirigiendo a Intranet...</div>
        </div>
      </div>
    )
  }

  return <CompactLogin />
}
