'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: string
  price: number
  image: string
}

export default function Courses() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  useEffect(() => {
    // Mock data - en producción esto vendría de Supabase
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Introducción a la Programación con Python',
        description: 'Aprende los fundamentos de la programación usando Python, uno de los lenguajes más populares.',
        instructor: 'Dr. María González',
        duration: '8 semanas',
        level: 'Principiante',
        price: 49.99,
        image: '/course-python.jpg'
      },
      {
        id: '2',
        title: 'Desarrollo Web con React y Next.js',
        description: 'Construye aplicaciones web modernas usando React y Next.js con las mejores prácticas.',
        instructor: 'Ing. Carlos Mendez',
        duration: '12 semanas',
        level: 'Intermedio',
        price: 79.99,
        image: '/course-react.jpg'
      },
      {
        id: '3',
        title: 'Inteligencia Artificial y Machine Learning',
        description: 'Explora el fascinante mundo de la IA y aprende a crear modelos de machine learning.',
        instructor: 'Dra. Ana López',
        duration: '16 semanas',
        level: 'Avanzado',
        price: 99.99,
        image: '/course-ai.jpg'
      },
      {
        id: '4',
        title: 'Diseño UX/UI para Aplicaciones Móviles',
        description: 'Aprende a diseñar interfaces intuitivas y experiencias de usuario excepcionales.',
        instructor: 'Dis. Roberto Silva',
        duration: '10 semanas',
        level: 'Intermedio',
        price: 69.99,
        image: '/course-ux.jpg'
      }
    ]
    setCourses(mockCourses)
  }, [])

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
              <h1 className="text-2xl font-bold text-gray-900">Cursos Disponibles</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Filters */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Filtrar Cursos</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nivel
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Todos los niveles</option>
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duración
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Cualquier duración</option>
                  <option value="short">Menos de 8 semanas</option>
                  <option value="medium">8-12 semanas</option>
                  <option value="long">Más de 12 semanas</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Cualquier precio</option>
                  <option value="free">Gratuito</option>
                  <option value="low">Menos de $50</option>
                  <option value="medium">$50 - $100</option>
                  <option value="high">Más de $100</option>
                </select>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div key={course.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-6xl">{course.id === '1' ? '🐍' : course.id === '2' ? '⚛️' : course.id === '3' ? '🤖' : '🎨'}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      course.level === 'Principiante' ? 'bg-green-100 text-green-800' :
                      course.level === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.level}
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      ${course.price}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>👨‍🏫 {course.instructor}</span>
                    <span>⏱️ {course.duration}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/courses/${course.id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    >
                      Ver Detalles
                    </Link>
                    <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
                      Inscribirse
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}