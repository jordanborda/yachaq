'use client'

import MainLayout from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { memo, useMemo } from 'react'
import { 
  Video, 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  PlayCircle,
  Calendar,
  Bookmark,
  Award,
  TrendingUp,
  Search
} from 'lucide-react'

function AulaVirtual() {
  // Mock data para cursos
  const cursos = useMemo(() => [
    {
      id: 1,
      titulo: 'Fundamentos de Programación',
      descripcion: 'Aprende los conceptos básicos de programación con Python',
      instructor: 'Dr. Carlos Mendoza',
      duracion: '8 semanas',
      estudiantes: 234,
      rating: 4.8,
      categoria: 'Programación',
      nivel: 'Principiante',
      precio: 'Gratis',
      imagen: '/api/placeholder/300/200',
      progreso: 0
    },
    {
      id: 2,
      titulo: 'Matemáticas Avanzadas',
      descripcion: 'Cálculo diferencial e integral aplicado',
      instructor: 'Dra. María González',
      duracion: '12 semanas',
      estudiantes: 142,
      rating: 4.9,
      categoria: 'Matemáticas',
      nivel: 'Avanzado',
      precio: '$299',
      imagen: '/api/placeholder/300/200',
      progreso: 0
    },
    {
      id: 3,
      titulo: 'Historia Universal',
      descripcion: 'Un recorrido por los eventos más importantes de la historia',
      instructor: 'Prof. Ana Rodríguez',
      duracion: '6 semanas',
      estudiantes: 89,
      rating: 4.7,
      categoria: 'Historia',
      nivel: 'Intermedio',
      precio: '$199',
      imagen: '/api/placeholder/300/200',
      progreso: 0
    },
    {
      id: 4,
      titulo: 'Diseño UX/UI',
      descripcion: 'Principios de diseño centrado en el usuario',
      instructor: 'Lic. Roberto Silva',
      duracion: '10 semanas',
      estudiantes: 178,
      rating: 4.6,
      categoria: 'Diseño',
      nivel: 'Intermedio',
      precio: '$399',
      imagen: '/api/placeholder/300/200',
      progreso: 0
    }
  ], [])

  const categoriasPopulares = useMemo(() => [
    { nombre: 'Programación', cursos: 45, color: 'bg-blue-500' },
    { nombre: 'Matemáticas', cursos: 32, color: 'bg-emerald-500' },
    { nombre: 'Historia', cursos: 28, color: 'bg-purple-500' },
    { nombre: 'Diseño', cursos: 24, color: 'bg-amber-500' },
    { nombre: 'Ciencias', cursos: 19, color: 'bg-pink-500' }
  ], [])

  return (
    <MainLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Video className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Aula Virtual</h1>
                <p className="text-purple-100 mt-1 text-sm md:text-base">Descubre y accede a cursos interactivos de alta calidad</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Search className="w-4 h-4" />
                Buscar Cursos
              </Button>
              <Button className="gap-2 bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                <Video className="w-4 h-4" />
                Clases en Vivo
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs md:text-sm font-medium">Cursos Disponibles</p>
                  <p className="text-2xl md:text-3xl font-bold">148</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Estudiantes Activos</p>
                  <p className="text-3xl font-bold">2,847</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Clases en Vivo</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">Rating Promedio</p>
                  <p className="text-3xl font-bold">4.8</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="explorar" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="explorar" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              Explorar Cursos
            </TabsTrigger>
            <TabsTrigger value="mis-cursos" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              Mis Cursos
            </TabsTrigger>
            <TabsTrigger value="en-vivo" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              Clases en Vivo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explorar" className="space-y-6">
            {/* Categorías Populares */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  Categorías Populares
                </CardTitle>
                <CardDescription>
                  Explora las áreas de conocimiento más demandadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {categoriasPopulares.map((categoria) => (
                    <Button
                      key={categoria.nombre}
                      variant="outline"
                      className="gap-2 h-12"
                    >
                      <div className={`w-3 h-3 rounded-full ${categoria.color}`} />
                      {categoria.nombre}
                      <Badge variant="secondary">{categoria.cursos}</Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Grid de Cursos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {cursos.map((curso) => (
                <Card key={curso.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105 transform">
                  <div className="aspect-video bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <PlayCircle className="w-12 h-12 text-white opacity-90 relative z-10 hover:scale-110 transition-transform cursor-pointer" />
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{curso.categoria}</Badge>
                      <Badge 
                        variant={curso.precio === 'Gratis' ? 'default' : 'outline'}
                        className={curso.precio === 'Gratis' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
                      >
                        {curso.precio}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {curso.titulo}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {curso.descripcion}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Users className="w-4 h-4" />
                      <span>{curso.estudiantes} estudiantes</span>
                      <Star className="w-4 h-4 text-amber-500 fill-current ml-2" />
                      <span>{curso.rating}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{curso.duracion}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{curso.nivel}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                        Inscribirse
                      </Button>
                      <Button variant="outline" size="icon">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mis-cursos" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No tienes cursos inscritos
                </h3>
                <p className="text-gray-500 mb-6">
                  Explora nuestro catálogo y encuentra el curso perfecto para ti
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Explorar Cursos
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="en-vivo" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No hay clases en vivo programadas
                </h3>
                <p className="text-gray-500 mb-6">
                  Las clases en vivo aparecerán aquí cuando estén disponibles
                </p>
                <Button variant="outline" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Ver Calendario
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

export default memo(AulaVirtual)