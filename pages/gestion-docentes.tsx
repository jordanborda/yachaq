'use client'

import MainLayout from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { memo, useMemo, useState } from 'react'
import { 
  Search, 
  Plus, 
  Users, 
  BookOpen, 
  Star, 
  MoreHorizontal,
  Filter,
  Download,
  Mail,
  Phone,
  GraduationCap,
  Award,
  TrendingUp
} from 'lucide-react'

function GestionDocentes() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data para docentes
  const docentes = useMemo(() => [
    {
      id: 1,
      nombre: 'Dr. María González',
      email: 'maria.gonzalez@yachaq.edu',
      telefono: '+591 7777-8888',
      especialidad: 'Matemáticas Avanzadas',
      cursos: 5,
      estudiantes: 142,
      rating: 4.9,
      estado: 'activo',
      avatar: null,
      experiencia: '15 años',
      certificaciones: ['PhD Matemáticas', 'Certified Educator'],
      ultimaActividad: '2 horas'
    },
    {
      id: 2,
      nombre: 'Ing. Carlos Mendoza',
      email: 'carlos.mendoza@yachaq.edu',
      telefono: '+591 6666-7777',
      especialidad: 'Programación',
      cursos: 8,
      estudiantes: 234,
      rating: 4.8,
      estado: 'activo',
      avatar: null,
      experiencia: '12 años',
      certificaciones: ['Ing. Sistemas', 'AWS Certified'],
      ultimaActividad: '30 min'
    },
    {
      id: 3,
      nombre: 'Lic. Ana Rodríguez',
      email: 'ana.rodriguez@yachaq.edu',
      telefono: '+591 5555-6666',
      especialidad: 'Literatura',
      cursos: 3,
      estudiantes: 89,
      rating: 4.7,
      estado: 'inactivo',
      avatar: null,
      experiencia: '8 años',
      certificaciones: ['Lic. Literatura', 'Metodología'],
      ultimaActividad: '2 días'
    }
  ], [])

  const filteredDocentes = useMemo(() => docentes.filter(docente => 
    docente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    docente.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    docente.email.toLowerCase().includes(searchTerm.toLowerCase())
  ), [docentes, searchTerm])

  return (
    <MainLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Gestión de Docentes</h1>
                <p className="text-emerald-100 mt-1 text-sm md:text-base">Administra el equipo docente de la plataforma</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
              <Button className="gap-2 bg-white text-emerald-600 hover:bg-gray-100 font-semibold">
                <Plus className="w-4 h-4" />
                Nuevo Docente
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Docentes</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Activos</p>
                  <p className="text-3xl font-bold">22</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Cursos Totales</p>
                  <p className="text-3xl font-bold">87</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
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

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar docentes por nombre, especialidad o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button variant="outline" className="gap-2 h-12">
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="lista" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="lista" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Lista de Docentes
            </TabsTrigger>
            <TabsTrigger value="estadisticas" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Estadísticas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lista" className="space-y-6">
            <div className="grid gap-6">
              {filteredDocentes.map((docente) => (
                <Card key={docente.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                          <AvatarImage src={docente.avatar || ''} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg">
                            {docente.nombre.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{docente.nombre}</h3>
                            <Badge 
                              variant={docente.estado === 'activo' ? 'default' : 'secondary'}
                              className={docente.estado === 'activo' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
                            >
                              {docente.estado === 'activo' ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="w-4 h-4 text-blue-500" />
                              <span>{docente.especialidad}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <span>{docente.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span>{docente.telefono}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-purple-500" />
                              <span>{docente.experiencia}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 mt-3">
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4 text-blue-500" />
                              <span className="text-sm font-medium text-gray-700">{docente.cursos} cursos</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-emerald-500" />
                              <span className="text-sm font-medium text-gray-700">{docente.estudiantes} estudiantes</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-500 fill-current" />
                              <span className="text-sm font-medium text-gray-700">{docente.rating}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Última actividad: {docente.ultimaActividad}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Mail className="w-4 h-4" />
                          Contactar
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="estadisticas" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    Rendimiento por Especialidad
                  </CardTitle>
                  <CardDescription>
                    Distribución de docentes por área de conocimiento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Programación</span>
                      <Badge className="bg-blue-600">8 docentes</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <span className="font-medium">Matemáticas</span>
                      <Badge className="bg-emerald-600">6 docentes</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Literatura</span>
                      <Badge className="bg-purple-600">4 docentes</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                      <span className="font-medium">Ciencias</span>
                      <Badge className="bg-amber-600">6 docentes</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" />
                    Top Docentes por Rating
                  </CardTitle>
                  <CardDescription>
                    Mejores docentes según evaluación estudiantil
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {docentes
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 4)
                      .map((docente, index) => (
                        <div key={docente.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? 'bg-amber-500' : 
                            index === 1 ? 'bg-gray-400' : 
                            index === 2 ? 'bg-amber-600' : 'bg-gray-300'
                          }`}>
                            {index + 1}
                          </div>
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                              {docente.nombre.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{docente.nombre}</p>
                            <p className="text-sm text-gray-600">{docente.especialidad}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-500 fill-current" />
                            <span className="font-semibold">{docente.rating}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

export default memo(GestionDocentes)