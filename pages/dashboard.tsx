'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    // Redirigir automáticamente a intranet
    router.replace('/intranet')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg animate-pulse">Y</span>
        </div>
        <div className="text-slate-600 font-medium">Redirigiendo a Intranet...</div>
        <div className="w-8 h-8 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    </div>
  )
}