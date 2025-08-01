'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIChat() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  useEffect(() => {
    // Mensaje de bienvenida inicial
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: '¡Hola! Soy tu asistente educativo de IA. Estoy aquí para ayudarte con tus estudios, resolver dudas, explicar conceptos y guiarte en tu proceso de aprendizaje. ¿En qué puedo ayudarte hoy?',
        timestamp: new Date()
      }
    ])
  }, [])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simular respuesta de IA (en producción esto se conectaría a una API real)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(inputMessage),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const getAIResponse = (input: string): string => {
    const responses = [
      'Excelente pregunta. Para ayudarte mejor, ¿podrías darme más contexto sobre el tema que estás estudiando?',
      'Entiendo tu consulta. Te recomiendo que empieces por entender los conceptos fundamentales antes de avanzar a temas más complejos.',
      'Esa es una duda muy común entre estudiantes. Te sugiero que practiques con ejercicios similares para reforzar tu comprensión.',
      'Perfecto, ese tema es muy interesante. ¿Te gustaría que te explique paso a paso o prefieres que te dé algunos recursos adicionales?',
      'Me parece que estás en el camino correcto. ¿Hay algún aspecto específico que te resulte más difícil de entender?'
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
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
              <h1 className="text-2xl font-bold text-gray-900">Chat con IA Educativa</h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-sm text-gray-600">Asistente IA Activo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow h-[600px] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-4">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta o mensaje aquí..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Enviar
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Presiona Enter para enviar, Shift+Enter para nueva línea
            </div>
          </div>
        </div>

        {/* AI Features */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium text-gray-900 mb-2">💡 Explicaciones</h3>
            <p className="text-sm text-gray-600">
              Pide explicaciones detalladas de conceptos complejos
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium text-gray-900 mb-2">📝 Ejercicios</h3>
            <p className="text-sm text-gray-600">
              Solicita ejercicios prácticos para reforzar tu aprendizaje
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium text-gray-900 mb-2">🎯 Guía Personalizada</h3>
            <p className="text-sm text-gray-600">
              Recibe recomendaciones adaptadas a tu nivel y objetivos
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}