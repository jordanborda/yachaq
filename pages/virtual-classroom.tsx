'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface ClassSession {
  id: string
  title: string
  instructor: string
  startTime: Date
  duration: number
  participants: number
  maxParticipants: number
  status: 'upcoming' | 'live' | 'ended'
  subject: string
}

export default function VirtualClassroom() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [selectedSession, setSelectedSession] = useState<ClassSession | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  useEffect(() => {
    // Mock data - en producción esto vendría de Supabase
    const mockSessions: ClassSession[] = [
      {
        id: '1',
        title: 'Introducción a Variables en Python',
        instructor: 'Dr. María González',
        startTime: new Date(Date.now() + 30 * 60 * 1000), // En 30 minutos
        duration: 60,
        participants: 15,
        maxParticipants: 30,
        status: 'upcoming',
        subject: 'Python'
      },
      {
        id: '2',
        title: 'Componentes en React - Sesión en Vivo',
        instructor: 'Ing. Carlos Mendez',
        startTime: new Date(),
        duration: 90,
        participants: 25,
        maxParticipants: 25,
        status: 'live',
        subject: 'React'
      },
      {
        id: '3',
        title: 'Redes Neuronales Básicas',
        instructor: 'Dra. Ana López',
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // En 2 horas
        duration: 120,
        participants: 8,
        maxParticipants: 20,
        status: 'upcoming',
        subject: 'IA'
      },
      {
        id: '4',
        title: 'Principios de UX - Finalizada',
        instructor: 'Dis. Roberto Silva',
        startTime: new Date(Date.now() - 60 * 60 * 1000), // Hace 1 hora
        duration: 75,
        participants: 18,
        maxParticipants: 25,
        status: 'ended',
        subject: 'UX/UI'
      }
    ]
    setSessions(mockSessions)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-100 text-red-800'
      case 'upcoming':
        return 'bg-green-100 text-green-800'
      case 'ended':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live':
        return '🔴 En Vivo'
      case 'upcoming':
        return '⏰ Próxima'
      case 'ended':
        return '✅ Finalizada'
      default:
        return status
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
                ← Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Aula Virtual</h1>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Crear Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Live Sessions Alert */}
          {sessions.filter(s => s.status === 'live').length > 0 && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-400">🔴</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Sesiones en vivo disponibles
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>Hay {sessions.filter(s => s.status === 'live').length} sesión(es) en vivo ahora mismo.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sessions Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {sessions.map((session) => (
              <div key={session.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                      {getStatusText(session.status)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {session.subject}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {session.title}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <span className="mr-2">👨‍🏫</span>
                      {session.instructor}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📅</span>
                      {formatDate(session.startTime)} a las {formatTime(session.startTime)}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">⏱️</span>
                      {session.duration} minutos
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">👥</span>
                      {session.participants}/{session.maxParticipants} participantes
                    </div>
                  </div>

                  {/* Progress bar for participants */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Participantes</span>
                      <span>{Math.round((session.participants / session.maxParticipants) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(session.participants / session.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    {session.status === 'live' && (
                      <button 
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                        onClick={() => setSelectedSession(session)}
                      >
                        🔴 Unirse Ahora
                      </button>
                    )}
                    {session.status === 'upcoming' && (
                      <>
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                          📅 Recordar
                        </button>
                        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors">
                          ℹ️ Detalles
                        </button>
                      </>
                    )}
                    {session.status === 'ended' && (
                      <button className="flex-1 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                        📹 Ver Grabación
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Virtual Classroom Features */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Características del Aula Virtual</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-3xl mb-3">🎥</div>
                <h3 className="font-medium text-gray-900 mb-2">Video HD</h3>
                <p className="text-sm text-gray-600">
                  Transmisión de video en alta definición para una experiencia inmersiva
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-3xl mb-3">🎤</div>
                <h3 className="font-medium text-gray-900 mb-2">Audio Cristalino</h3>
                <p className="text-sm text-gray-600">
                  Comunicación clara con cancelación de ruido automática
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-3xl mb-3">📝</div>
                <h3 className="font-medium text-gray-900 mb-2">Pizarra Interactiva</h3>
                <p className="text-sm text-gray-600">
                  Comparte y colabora en tiempo real con herramientas de dibujo
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-3xl mb-3">📤</div>
                <h3 className="font-medium text-gray-900 mb-2">Compartir Pantalla</h3>
                <p className="text-sm text-gray-600">
                  Presenta contenido directamente desde tu pantalla
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal for joining live session */}
      {selectedSession && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Unirse a la Sesión en Vivo
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Te estás uniendo a: <strong>{selectedSession.title}</strong>
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setSelectedSession(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    // Aquí iría la lógica para unirse a la sesión
                    alert('¡Uniéndose a la sesión en vivo! (Funcionalidad demo)')
                    setSelectedSession(null)
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  🔴 Unirse Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}