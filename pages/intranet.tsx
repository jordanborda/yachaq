'use client'

import MainLayout from '@/components/layout/MainLayout'
import { memo, useState, useEffect } from 'react'
import { 
  User, 
  GraduationCap, 
  Users, 
  FileText,
  ChevronDown,
  ChevronRight,
  BookOpen,
  ClipboardList,
  BarChart3,
  Clock,
  UserCheck,
  FileSearch,
  AlertCircle,
  Menu,
  X,
  Home,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  FileUser,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'

interface MenuItem {
  id: string
  title: string
  icon: React.ElementType
  subItems: SubMenuItem[]
}

interface SubMenuItem {
  id: string
  title: string
  icon: React.ElementType
}

const menuItems: MenuItem[] = [
  {
    id: 'estudiante',
    title: 'Menú de Estudiante',
    icon: User,
    subItems: [
      { id: 'perfil-estudiante', title: 'Perfil del Estudiante', icon: User },
      { id: 'info-academica', title: 'Información Académica', icon: BookOpen },
      { id: 'asistencia-clases', title: 'Asistencia a Clases', icon: ClipboardList }
    ]
  },
  {
    id: 'docente',
    title: 'Menú de Docente',
    icon: GraduationCap,
    subItems: [
      { id: 'perfil-docente', title: 'Perfil del Docente', icon: Users },
      { id: 'calificaciones', title: 'Calificaciones', icon: BarChart3 },
      { id: 'horario-clases', title: 'Horario de Clases', icon: Clock },
      { id: 'control-asistencia', title: 'Control de Asistencia', icon: UserCheck }
    ]
  },
  {
    id: 'solicitudes',
    title: 'Menú de Solicitudes',
    icon: FileText,
    subItems: [
      { id: 'solicitudes-servicios', title: 'Solicitudes de Servicios Académicos', icon: FileSearch },
      { id: 'status-solicitud', title: 'Ver Status de Solicitud de Servicio', icon: AlertCircle }
    ]
  }
]

function Intranet() {
  const { user } = useAuth()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const [activeSubItem, setActiveSubItem] = useState<string>('perfil-estudiante')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedProfileOption, setSelectedProfileOption] = useState<string>('curriculum')
  const [selectedAcademicOption, setSelectedAcademicOption] = useState<string>('parciales')
  const [selectedScheduleOption, setSelectedScheduleOption] = useState<string>('oferta-cursos')
  const [selectedAttendanceOption, setSelectedAttendanceOption] = useState<string>('cursos-actuales')
  const [selectedCourse, setSelectedCourse] = useState<string>('MAT-401')
  const [selectedCurriculumTab, setSelectedCurriculumTab] = useState<string>('principal')
  
  // Estados para Oferta de Cursos
  const [selectedPeriod, setSelectedPeriod] = useState<string>('')
  const [searchCriteria, setSearchCriteria] = useState({
    materia: '',
    numeroCurso: '',
    buscar: '',
    campus: ''
  })
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  
  
  // Estados para Prepararse para Inscripción
  const [selectedPeriodInscription, setSelectedPeriodInscription] = useState<string>('')
  const [inscriptionStatus, setInscriptionStatus] = useState({
    turnosPermitidos: true,
    horasRestantes: '24 horas',
    fechaLimite: '15 de Enero, 2025',
    statusAlumno: true,
    statusAcademico: 'PRIMER SEMESTRE POSTGRADO',
    statusAcademicoPermite: true,
    noRetenciones: true
  })

  // Función para verificar si el usuario puede acceder a registro-retiro y como-va-horario
  const canAccessRegistrationSections = () => {
    return selectedPeriodInscription && 
           inscriptionStatus.turnosPermitidos && 
           inscriptionStatus.statusAlumno && 
           inscriptionStatus.statusAcademicoPermite && 
           inscriptionStatus.noRetenciones
  }

  // Estados para Registro y Retiro de Cursos
  const [selectedPeriodRegistration, setSelectedPeriodRegistration] = useState<string>('')
  const [registrationSearchCriteria, setRegistrationSearchCriteria] = useState({
    materia: '',
    numeroCurso: '',
    buscar: ''
  })
  const [registrationSearchResults, setRegistrationSearchResults] = useState<any[]>([])
  const [hasRegistrationSearched, setHasRegistrationSearched] = useState(false)
  const [showRegistrationSectionsModal, setShowRegistrationSectionsModal] = useState(false)
  const [selectedCourseForRegistrationSections, setSelectedCourseForRegistrationSections] = useState<any>(null)
  const [activeScheduleTab, setActiveScheduleTab] = useState<string>('horario')
  const [registeredCourses, setRegisteredCourses] = useState<any[]>([])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false)
      }
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Cerrar menús cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target?.closest('[data-sidebar-menu]')) {
        setExpandedMenus([])
      }
    }

    if (expandedMenus.length > 0) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [expandedMenus])

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => {
      // Si el menú clickeado ya está abierto, lo cerramos
      if (prev.includes(menuId)) {
        return prev.filter(id => id !== menuId)
      }
      // Si no, cerramos todos los otros y abrimos solo este
      return [menuId]
    })
  }

  const handleSubItemClick = (subItemId: string) => {
    setActiveSubItem(subItemId)
    // Cerrar todos los menús después de seleccionar una opción
    setExpandedMenus([])
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const renderContent = () => {
    switch (activeSubItem) {
      case 'perfil-estudiante':
        return (
          <div className="h-full flex flex-col">
            {/* Header Principal - Perfil del Alumno */}
            <div className="bg-white p-6 border-b border-zinc-200 flex-shrink-0">
              <h1 className="text-2xl font-bold text-zinc-900">
                Perfil del Alumno: {user?.user_metadata?.full_name || 'Juan Carlos Pérez'} - EST001234
              </h1>
            </div>

            {/* Header Negro con Información Académica */}
            <div className="bg-zinc-900 text-white p-4 flex-shrink-0">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span>2024-I</span>
                <span className="text-zinc-400">|</span>
                <span>Estado: <strong>Activo</strong></span>
                <span className="text-zinc-400">|</span>
                <span>Horas Globales: <strong>120</strong></span>
                <span className="text-zinc-400">|</span>
                <span>Ponderado Promedio Global: <strong>85.6</strong></span>
                <span className="text-zinc-400">|</span>
                <span>Avisos de Inscripción: <strong>2</strong></span>
                <span className="text-zinc-400">|</span>
                <span>Retenciones: <strong>0</strong></span>
              </div>
            </div>

            {/* Layout Principal */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
              {/* Sidebar Izquierdo Negro */}
              <div className="w-full lg:w-64 bg-zinc-900 text-white flex-shrink-0">
                {/* Foto del Estudiante */}
                <div className="p-4 lg:p-6 text-center border-b border-zinc-700">
                  <div className="w-16 h-16 lg:w-24 lg:h-24 mx-auto bg-zinc-700 rounded-full flex items-center justify-center mb-3 lg:mb-4">
                    <User className="w-8 h-8 lg:w-12 lg:h-12 text-zinc-400" />
                  </div>
                  <h3 className="font-semibold text-sm lg:text-base">{user?.user_metadata?.full_name || 'Juan Carlos Pérez'}</h3>
                </div>

                {/* Opciones del Sidebar */}
                <nav className="p-3 lg:p-4">
                  <div className="flex lg:flex-col lg:space-y-2 space-x-2 lg:space-x-0 overflow-x-auto lg:overflow-x-visible">
                    {[
                      { id: 'curriculum', label: 'Curriculum y Cursos', icon: BookOpen },
                      { id: 'historial', label: 'Historial Académico', icon: FileUser },
                      { id: 'notas', label: 'Notas (Parciales/Finales)', icon: Award }
                    ].map((option) => {
                      const Icon = option.icon
                      return (
                        <Button
                          key={option.id}
                          variant="ghost"
                          onClick={() => setSelectedProfileOption(option.id)}
                          className={`flex-shrink-0 lg:w-full justify-start p-2 lg:p-3 text-left hover:bg-zinc-800 text-xs lg:text-sm ${
                            selectedProfileOption === option.id 
                              ? 'bg-zinc-800 text-white' 
                              : 'text-zinc-300'
                          }`}
                        >
                          <Icon className="w-3 h-3 lg:w-4 lg:h-4 mr-2 lg:mr-3 flex-shrink-0" />
                          <span className="whitespace-nowrap lg:whitespace-normal">{option.label}</span>
                        </Button>
                      )
                    })}
                  </div>
                </nav>
              </div>

              {/* Contenido Principal */}
              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Información del Alumno */}
                <div className="w-full lg:w-[28rem] bg-white border-b lg:border-b-0 lg:border-r border-zinc-200 flex-shrink-0 overflow-y-auto">
                  <div className="p-4 lg:p-6">
                    <div className="space-y-6">
                    {/* Información Biográfica */}
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 mb-4">Información del Alumno</h3>
                      <div className="space-y-3">
                        <h4 className="font-medium text-zinc-800 border-b border-zinc-200 pb-1">Información Biográfica</h4>
                        <div className="text-sm">
                          <div className="flex">
                            <span className="font-semibold w-48">Correo:</span>
                            <span>{user?.email || 'juan.perez@email.com'}</span>
                          </div>
                          <div className="flex">
                            <span className="font-semibold w-48">Teléfono:</span>
                            <span className="uppercase">+591 77777777</span>
                          </div>
                          <div className="flex">
                            <span className="font-semibold w-48">Fecha de nacimiento:</span>
                            <span className="uppercase">15/03/1998</span>
                          </div>
                          <div className="flex">
                            <span className="font-semibold w-48">Etnia:</span>
                            <span className="uppercase">MESTIZO</span>
                          </div>
                          <div className="flex">
                            <span className="font-semibold w-48">Ciudadanía:</span>
                            <span className="uppercase">BOLIVIANA</span>
                          </div>
                          <div className="flex">
                            <span className="font-semibold w-48">Contacto de emergencia:</span>
                            <span className="uppercase">MARÍA PÉREZ</span>
                          </div>
                          <div className="flex">
                            <span className="font-semibold w-48">Teléfono de emergencia:</span>
                            <span className="uppercase">+591 66666666</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Información General */}
                    <div>
                      <h4 className="font-medium text-zinc-800 border-b border-zinc-200 pb-1 mb-3">Información General</h4>
                      <div className="text-sm">
                        <div className="flex"><span className="font-semibold w-48">Nivel:</span> <span className="uppercase">PREGRADO</span></div>
                        <div className="flex"><span className="font-semibold w-48">Clase:</span> <span className="uppercase">REGULAR</span></div>
                        <div className="flex"><span className="font-semibold w-48">Status:</span> <span className="uppercase">ACTIVO</span></div>
                        <div className="flex"><span className="font-semibold w-48">Tipo de alumno:</span> <span className="uppercase">REGULAR</span></div>
                        <div className="flex"><span className="font-semibold w-48">Primer período al que asistió:</span> <span className="uppercase">2023-I</span></div>
                        <div className="flex"><span className="font-semibold w-48">Período matriculado:</span> <span className="uppercase">2024-I</span></div>
                        <div className="flex"><span className="font-semibold w-48">Último período al que asistió:</span> <span className="uppercase">2023-II</span></div>
                        <div className="flex"><span className="font-semibold w-48">Información de graduación:</span> <span className="uppercase">NO APLICABLE</span></div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>

                {/* Área de Contenido Dinámico */}
                <div className="flex-1 bg-white flex flex-col">
                  <div className="p-4 lg:p-6 flex-1">
                  {selectedProfileOption === 'curriculum' && (
                    <div className="h-full">
                      <h3 className="text-lg font-semibold text-zinc-900 mb-4 flex-shrink-0">Curriculum y Cursos</h3>
                      
                      {/* Contenedor con borde grueso plomo */}
                      <div className="border-4 border-zinc-400 rounded-lg bg-white overflow-hidden flex flex-col" style={{ height: '180px' }}>
                        {/* TABs de Navegación */}
                        <div className="border-b border-zinc-300 bg-zinc-50">
                          <div className="flex">
                            <button 
                              onClick={() => setSelectedCurriculumTab('principal')}
                              className={`px-4 py-2 text-sm font-medium border-r border-zinc-300 transition-colors ${
                                selectedCurriculumTab === 'principal' 
                                  ? 'bg-zinc-400 text-white' 
                                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                              }`}
                            >
                              PRINCIPAL
                            </button>
                            <button 
                              onClick={() => setSelectedCurriculumTab('secundario')}
                              className={`px-4 py-2 text-sm font-medium border-r border-zinc-300 transition-colors ${
                                selectedCurriculumTab === 'secundario' 
                                  ? 'bg-zinc-400 text-white' 
                                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                              }`}
                            >
                              SECUNDARIO
                            </button>
                            <button 
                              onClick={() => setSelectedCurriculumTab('horas-pga')}
                              className={`px-4 py-2 text-sm font-medium transition-colors ${
                                selectedCurriculumTab === 'horas-pga' 
                                  ? 'bg-zinc-400 text-white' 
                                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                              }`}
                            >
                              HORAS Y PGA
                            </button>
                          </div>
                        </div>

                        {/* Contenido con scroll */}
                        <div className="flex-1 overflow-y-auto p-4">
                          {selectedCurriculumTab === 'principal' && (
                            <div className="text-sm">
                              <div className="flex"><span className="font-semibold w-48">Grado:</span> <span className="uppercase">PREGRADO</span></div>
                              <div className="flex"><span className="font-semibold w-48">Nivel:</span> <span className="uppercase">UNIVERSITARIO</span></div>
                              <div className="flex"><span className="font-semibold w-48">Escuela:</span> <span className="uppercase">ESCUELA DE INGENIERÍA</span></div>
                              <div className="flex"><span className="font-semibold w-48">Carrera:</span> <span className="uppercase">INGENIERÍA DE SISTEMAS</span></div>
                              <div className="flex"><span className="font-semibold w-48">Tipo de admisión:</span> <span className="uppercase">EXAMEN DE ADMISIÓN</span></div>
                              <div className="flex"><span className="font-semibold w-48">Período de admisión:</span> <span className="uppercase">2022-I</span></div>
                            </div>
                          )}

                          {selectedCurriculumTab === 'secundario' && (
                            <div className="text-sm">
                              <div className="flex"><span className="font-semibold w-48">Modalidad:</span> <span className="uppercase">PRESENCIAL</span></div>
                              <div className="flex"><span className="font-semibold w-48">Turno:</span> <span className="uppercase">MAÑANA</span></div>
                              <div className="flex"><span className="font-semibold w-48">Sede:</span> <span className="uppercase">CAMPUS CENTRAL</span></div>
                              <div className="flex"><span className="font-semibold w-48">Plan de estudios:</span> <span className="uppercase">2022-V1</span></div>
                              <div className="flex"><span className="font-semibold w-48">Duración:</span> <span className="uppercase">10 SEMESTRES</span></div>
                              <div className="flex"><span className="font-semibold w-48">Estado:</span> <span className="uppercase text-green-600">ACTIVO</span></div>
                            </div>
                          )}

                          {selectedCurriculumTab === 'horas-pga' && (
                            <div className="text-sm">
                              <div className="flex"><span className="font-semibold w-48">Créditos totales:</span> <span className="uppercase">240 CRÉDITOS</span></div>
                              <div className="flex"><span className="font-semibold w-48">Créditos aprobados:</span> <span className="uppercase text-blue-600">98 CRÉDITOS</span></div>
                              <div className="flex"><span className="font-semibold w-48">Créditos pendientes:</span> <span className="uppercase text-orange-600">142 CRÉDITOS</span></div>
                              <div className="flex"><span className="font-semibold w-48">PGA actual:</span> <span className="uppercase text-green-600">84.5</span></div>
                              <div className="flex"><span className="font-semibold w-48">Avance de carrera:</span> <span className="uppercase text-blue-600">40.83%</span></div>
                              <div className="flex"><span className="font-semibold w-48">Semestre actual:</span> <span className="uppercase">5TO SEMESTRE</span></div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Cuadro separado: Cursos Inscritos */}
                      <div className="mt-4 border-4 border-zinc-400 rounded-lg bg-white" style={{ height: '280px' }}>
                        <div className="p-3 border-b border-zinc-300 bg-zinc-50">
                          <h4 className="font-medium text-zinc-900">Cursos Inscritos - Período 2024-I</h4>
                        </div>
                        <div className="p-3 overflow-y-auto" style={{ height: '230px' }}>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-zinc-200">
                                  <th className="text-left py-2 px-3 font-medium text-zinc-700">Código</th>
                                  <th className="text-left py-2 px-3 font-medium text-zinc-700">Materia</th>
                                  <th className="text-center py-2 px-3 font-medium text-zinc-700">Créditos</th>
                                  <th className="text-left py-2 px-3 font-medium text-zinc-700">Docente</th>
                                  <th className="text-left py-2 px-3 font-medium text-zinc-700">Horario</th>
                                  <th className="text-center py-2 px-3 font-medium text-zinc-700">Sección</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { codigo: 'MAT-401', materia: 'Cálculo Diferencial e Integral III', creditos: 4, docente: 'Dr. María González', horario: 'Lun-Mie-Vie 08:00-09:30', seccion: 'A' },
                                  { codigo: 'PRG-205', materia: 'Programación Orientada a Objetos', creditos: 5, docente: 'Ing. Carlos Mendoza', horario: 'Mar-Jue 10:00-12:00', seccion: 'B' },
                                  { codigo: 'FIS-201', materia: 'Física General II', creditos: 4, docente: 'Lic. Ana Rodriguez', horario: 'Lun-Mie 14:00-15:30', seccion: 'A' },
                                  { codigo: 'QUI-101', materia: 'Química General', creditos: 3, docente: 'Dr. Pedro Vargas', horario: 'Mar-Jue 16:00-17:00', seccion: 'C' }
                                ].map((curso, idx) => (
                                  <tr key={idx} className="border-b border-zinc-100 hover:bg-zinc-50">
                                    <td className="py-2 px-3">
                                      <span className="bg-zinc-900 text-white px-2 py-1 rounded text-xs font-mono">{curso.codigo}</span>
                                    </td>
                                    <td className="py-2 px-3 font-medium">{curso.materia}</td>
                                    <td className="text-center py-2 px-3">{curso.creditos}</td>
                                    <td className="py-2 px-3">{curso.docente}</td>
                                    <td className="py-2 px-3 text-sm">{curso.horario}</td>
                                    <td className="text-center py-2 px-3">{curso.seccion}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedProfileOption === 'historial' && (
                    <div className="h-full">
                      <h3 className="text-lg font-semibold text-zinc-900 mb-4 flex-shrink-0">Historial Académico</h3>
                      <div className="border-4 border-zinc-400 rounded-lg bg-white" style={{ height: '300px' }}>
                        <div className="p-3 border-b border-zinc-300 bg-zinc-50">
                          <h4 className="font-medium text-zinc-900">Historial por Semestre</h4>
                        </div>
                        <div className="p-3 overflow-y-auto" style={{ height: '250px' }}>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-zinc-200">
                                  <th className="text-left py-2 px-3 font-medium text-zinc-700">Semestre</th>
                                  <th className="text-center py-2 px-3 font-medium text-zinc-700">Materias</th>
                                  <th className="text-center py-2 px-3 font-medium text-zinc-700">Promedio</th>
                                  <th className="text-center py-2 px-3 font-medium text-zinc-700">Créditos</th>
                                  <th className="text-center py-2 px-3 font-medium text-zinc-700">Estado</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { semestre: '2023-II', materias: 6, promedio: 87.2, creditos: 24, estado: 'Aprobado' },
                                  { semestre: '2023-I', materias: 5, promedio: 84.8, creditos: 20, estado: 'Aprobado' },
                                  { semestre: '2022-II', materias: 6, promedio: 83.5, creditos: 22, estado: 'Aprobado' },
                                  { semestre: '2022-I', materias: 5, promedio: 86.1, creditos: 18, estado: 'Aprobado' },
                                  { semestre: '2021-II', materias: 5, promedio: 85.3, creditos: 19, estado: 'Aprobado' },
                                  { semestre: '2021-I', materias: 4, promedio: 82.7, creditos: 16, estado: 'Aprobado' }
                                ].map((periodo) => (
                                  <tr key={periodo.semestre} className="border-b border-zinc-100 hover:bg-zinc-50">
                                    <td className="py-2 px-3 font-medium text-zinc-900">{periodo.semestre}</td>
                                    <td className="py-2 px-3 text-center">{periodo.materias}</td>
                                    <td className="py-2 px-3 text-center font-medium">{periodo.promedio}</td>
                                    <td className="py-2 px-3 text-center">{periodo.creditos}</td>
                                    <td className="py-2 px-3 text-center">
                                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        periodo.estado === 'Aprobado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                      }`}>
                                        {periodo.estado}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedProfileOption === 'notas' && (
                    <div className="h-full">
                      <h3 className="text-lg font-semibold text-zinc-900 mb-4 flex-shrink-0">Notas (Parciales/Finales)</h3>
                      <div className="border-4 border-zinc-400 rounded-lg bg-white" style={{ height: '320px' }}>
                        <div className="p-3 border-b border-zinc-300 bg-zinc-50">
                          <h4 className="font-medium text-zinc-900">Notas del Semestre 2024-I</h4>
                        </div>
                        <div className="p-3 overflow-y-auto" style={{ height: '270px' }}>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-zinc-200">
                                  <th className="text-left py-2 px-3 font-medium text-zinc-700">Materia</th>
                                  <th className="text-center py-2 px-3 font-medium text-zinc-700">1er Parcial</th>
                                  <th className="text-center py-2 px-3 font-medium text-zinc-700">2do Parcial</th>
                                  <th className="text-center py-2 px-3 font-medium text-zinc-700">Final</th>
                                  <th className="text-center py-2 px-3 font-medium text-zinc-700">Promedio</th>
                                  <th className="text-center py-2 px-3 font-medium text-zinc-700">Estado</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { materia: 'Cálculo III', parcial1: 85, parcial2: 90, final: 88, promedio: 87.7, estado: 'Aprobado' },
                                  { materia: 'Programación OOP', parcial1: 92, parcial2: 88, final: 90, promedio: 90.0, estado: 'Aprobado' },
                                  { materia: 'Física II', parcial1: 78, parcial2: 82, final: 85, promedio: 81.7, estado: 'Aprobado' },
                                  { materia: 'Química General', parcial1: 80, parcial2: 85, final: 83, promedio: 82.7, estado: 'Aprobado' },
                                  { materia: 'Álgebra Lineal', parcial1: 88, parcial2: 91, final: 89, promedio: 89.3, estado: 'Aprobado' },
                                  { materia: 'Estadística', parcial1: 84, parcial2: 87, final: 86, promedio: 85.7, estado: 'Aprobado' },
                                  { materia: 'Base de Datos', parcial1: 90, parcial2: 93, final: 91, promedio: 91.3, estado: 'Aprobado' },
                                  { materia: 'Redes de Computadores', parcial1: 76, parcial2: 79, final: 82, promedio: 79.0, estado: 'Aprobado' }
                                ].map((nota, index) => (
                                  <tr key={index} className="border-b border-zinc-100 hover:bg-zinc-50">
                                    <td className="py-2 px-3 font-medium text-zinc-900">{nota.materia}</td>
                                    <td className="py-2 px-3 text-center">{nota.parcial1}</td>
                                    <td className="py-2 px-3 text-center">{nota.parcial2}</td>
                                    <td className="py-2 px-3 text-center">{nota.final}</td>
                                    <td className="py-2 px-3 text-center font-medium">{nota.promedio}</td>
                                    <td className="py-2 px-3 text-center">
                                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        nota.estado === 'Aprobado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                      }`}>
                                        {nota.estado}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'info-academica':
        return (
          <div className="h-[calc(100vh-152px)] flex flex-col bg-white">
            {/* Header Principal - Fijo */}
            <div className="bg-zinc-900 text-white p-4 lg:p-6 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <BookOpen className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Información Académica</h2>
                </div>
                <div className="text-sm text-zinc-300">
                  Estudiante: <span className="text-white font-medium">{user?.user_metadata?.full_name || 'Jordan Smith'}</span>
                </div>
              </div>
              
              {/* Navegación con separadores */}
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <button 
                  onClick={() => setSelectedAcademicOption('parciales')}
                  className={`px-3 py-1 rounded transition-colors ${
                    selectedAcademicOption === 'parciales' 
                      ? 'bg-white text-zinc-900 font-medium' 
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  Calificaciones Parciales
                </button>
                <span className="text-zinc-500 mx-1">|</span>
                <button 
                  onClick={() => setSelectedAcademicOption('ultimo-periodo')}
                  className={`px-3 py-1 rounded transition-colors ${
                    selectedAcademicOption === 'ultimo-periodo' 
                      ? 'bg-white text-zinc-900 font-medium' 
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  Notas del ultimo Periodo
                </button>
                <span className="text-zinc-500 mx-1">|</span>
                <button 
                  onClick={() => setSelectedAcademicOption('carrera')}
                  className={`px-3 py-1 rounded transition-colors ${
                    selectedAcademicOption === 'carrera' 
                      ? 'bg-white text-zinc-900 font-medium' 
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  Calificaciones de la carrera
                </button>
              </div>
            </div>

            {/* Contenido Principal - Con altura fija y scroll interno */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full p-4 lg:p-6 overflow-y-auto bg-white">
              {selectedAcademicOption === 'parciales' && (
                <div className="space-y-6">
                  <div className="bg-zinc-50 p-4 rounded-lg border">
                    <h3 className="text-lg font-semibold text-zinc-900 mb-4">Calificaciones Parciales - Período 2024-I</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-zinc-200">
                            <th className="text-left py-2 px-3 font-medium text-zinc-700">Materia</th>
                            <th className="text-center py-2 px-3 font-medium text-zinc-700">1er Parcial</th>
                            <th className="text-center py-2 px-3 font-medium text-zinc-700">2do Parcial</th>
                            <th className="text-center py-2 px-3 font-medium text-zinc-700">3er Parcial</th>
                            <th className="text-center py-2 px-3 font-medium text-zinc-700">Promedio</th>
                            <th className="text-center py-2 px-3 font-medium text-zinc-700">Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { materia: 'Cálculo Diferencial e Integral III', p1: 85, p2: 78, p3: 92, promedio: 85, estado: 'Aprobado' },
                            { materia: 'Programación Orientada a Objetos', p1: 90, p2: 88, p3: 94, promedio: 91, estado: 'Aprobado' },
                            { materia: 'Física General II', p1: 75, p2: 82, p3: 79, promedio: 79, estado: 'Aprobado' },
                            { materia: 'Química General', p1: 68, p2: 72, p3: 76, promedio: 72, estado: 'Aprobado' }
                          ].map((nota, idx) => (
                            <tr key={idx} className="border-b border-zinc-100 hover:bg-zinc-50">
                              <td className="py-3 px-3 font-medium text-zinc-900">{nota.materia}</td>
                              <td className="text-center py-3 px-3">{nota.p1}</td>
                              <td className="text-center py-3 px-3">{nota.p2}</td>
                              <td className="text-center py-3 px-3">{nota.p3}</td>
                              <td className="text-center py-3 px-3 font-semibold">{nota.promedio}</td>
                              <td className="text-center py-3 px-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  nota.estado === 'Aprobado' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {nota.estado}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {selectedAcademicOption === 'ultimo-periodo' && (
                <div className="space-y-6">
                  <div className="bg-zinc-50 p-4 rounded-lg border">
                    <h3 className="text-lg font-semibold text-zinc-900 mb-4">Notas del Último Período - 2023-II</h3>
                    <div className="grid gap-4">
                      {[
                        { materia: 'Cálculo Diferencial e Integral II', nota: 88, creditos: 4, estado: 'Aprobado' },
                        { materia: 'Programación I', nota: 92, creditos: 5, estado: 'Aprobado' },
                        { materia: 'Física General I', nota: 79, creditos: 4, estado: 'Aprobado' },
                        { materia: 'Álgebra Lineal', nota: 85, creditos: 3, estado: 'Aprobado' },
                        { materia: 'Inglés II', nota: 90, creditos: 2, estado: 'Aprobado' }
                      ].map((materia, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg border border-zinc-200">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-zinc-900">{materia.materia}</h4>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-zinc-600">{materia.creditos} créditos</span>
                              <span className={`text-2xl font-bold ${
                                materia.nota >= 80 ? 'text-green-600' : 
                                materia.nota >= 70 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {materia.nota}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              materia.estado === 'Aprobado' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {materia.estado}
                            </span>
                            <div className="w-32 bg-zinc-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  materia.nota >= 80 ? 'bg-green-500' : 
                                  materia.nota >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${materia.nota}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Resumen del Período */}
                    <div className="mt-6 bg-white p-4 rounded-lg border border-zinc-200">
                      <h4 className="font-medium text-zinc-900 mb-3">Resumen del Período 2023-II</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-zinc-600">Promedio General:</span>
                          <p className="text-xl font-bold text-green-600">86.8</p>
                        </div>
                        <div>
                          <span className="text-zinc-600">Créditos Aprobados:</span>
                          <p className="text-xl font-bold text-zinc-900">18</p>
                        </div>
                        <div>
                          <span className="text-zinc-600">Materias Cursadas:</span>
                          <p className="text-xl font-bold text-zinc-900">5</p>
                        </div>
                        <div>
                          <span className="text-zinc-600">Estado:</span>
                          <p className="text-xl font-bold text-green-600">Aprobado</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedAcademicOption === 'carrera' && (
                <div className="space-y-6">
                  <div className="bg-zinc-50 p-4 rounded-lg border">
                    <h3 className="text-lg font-semibold text-zinc-900 mb-4">Calificaciones de la Carrera - Ingeniería de Sistemas</h3>
                    
                    {/* Resumen General */}
                    <div className="bg-white p-4 rounded-lg border border-zinc-200 mb-6">
                      <h4 className="font-medium text-zinc-900 mb-3">Resumen Académico General</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <span className="text-zinc-600">Promedio Acumulado:</span>
                          <p className="text-2xl font-bold text-green-600">84.5</p>
                        </div>
                        <div>
                          <span className="text-zinc-600">Créditos Aprobados:</span>
                          <p className="text-2xl font-bold text-zinc-900">98/240</p>
                        </div>
                        <div>
                          <span className="text-zinc-600">Avance:</span>
                          <p className="text-2xl font-bold text-blue-600">40.8%</p>
                        </div>
                        <div>
                          <span className="text-zinc-600">Semestre Actual:</span>
                          <p className="text-2xl font-bold text-zinc-900">5°</p>
                        </div>
                        <div>
                          <span className="text-zinc-600">Posición:</span>
                          <p className="text-2xl font-bold text-purple-600">3/45</p>
                        </div>
                      </div>
                      
                      {/* Barra de Progreso */}
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-zinc-700">Progreso de Carrera</span>
                          <span className="text-sm text-zinc-600">98 de 240 créditos</span>
                        </div>
                        <div className="w-full bg-zinc-200 rounded-full h-3">
                          <div className="bg-blue-500 h-3 rounded-full" style={{ width: '40.8%' }} />
                        </div>
                      </div>
                    </div>

                    {/* Historial por Semestres */}
                    <div className="bg-white rounded-lg border border-zinc-200">
                      <div className="p-4 border-b border-zinc-200">
                        <h4 className="font-medium text-zinc-900">Historial por Semestres</h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-zinc-200 bg-zinc-50">
                              <th className="text-left py-3 px-4 font-medium text-zinc-700">Período</th>
                              <th className="text-center py-3 px-4 font-medium text-zinc-700">Materias</th>
                              <th className="text-center py-3 px-4 font-medium text-zinc-700">Créditos</th>
                              <th className="text-center py-3 px-4 font-medium text-zinc-700">Promedio</th>
                              <th className="text-center py-3 px-4 font-medium text-zinc-700">Estado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { periodo: '2023-I', materias: 6, creditos: 20, promedio: 82.5, estado: 'Aprobado' },
                              { periodo: '2023-II', materias: 5, creditos: 18, promedio: 86.8, estado: 'Aprobado' },
                              { periodo: '2024-I', materias: 4, creditos: 16, promedio: 85.2, estado: 'En Curso' },
                              { periodo: '2022-II', materias: 5, creditos: 18, promedio: 79.3, estado: 'Aprobado' },
                              { periodo: '2022-I', materias: 6, creditos: 22, promedio: 88.1, estado: 'Aprobado' }
                            ].map((sem, idx) => (
                              <tr key={idx} className="border-b border-zinc-100 hover:bg-zinc-50">
                                <td className="py-3 px-4 font-medium text-zinc-900">{sem.periodo}</td>
                                <td className="text-center py-3 px-4">{sem.materias}</td>
                                <td className="text-center py-3 px-4">{sem.creditos}</td>
                                <td className="text-center py-3 px-4 font-semibold">{sem.promedio}</td>
                                <td className="text-center py-3 px-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    sem.estado === 'Aprobado' ? 'bg-green-100 text-green-800' :
                                    sem.estado === 'En Curso' ? 'bg-blue-100 text-blue-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {sem.estado}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
        )
      case 'asistencia-clases':
        return (
          <div className="h-[calc(100vh-152px)] flex flex-col bg-white">
            {/* Header Principal - Fijo */}
            <div className="bg-zinc-900 text-white p-4 lg:p-6 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <ClipboardList className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Asistencia a Clases</h2>
                </div>
                <div className="text-sm text-zinc-300">
                  Período: <span className="text-white font-medium">2024-I</span>
                </div>
              </div>
              
              {/* Navegación con separadores */}
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <button 
                  onClick={() => setSelectedAttendanceOption('cursos-actuales')}
                  className={`px-3 py-1 rounded transition-colors ${
                    selectedAttendanceOption === 'cursos-actuales' 
                      ? 'bg-white text-zinc-900 font-medium' 
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  Mis Cursos Actuales
                </button>
                <span className="text-zinc-500 mx-1">|</span>
                <button 
                  onClick={() => setSelectedAttendanceOption('historial-asistencia')}
                  className={`px-3 py-1 rounded transition-colors ${
                    selectedAttendanceOption === 'historial-asistencia' 
                      ? 'bg-white text-zinc-900 font-medium' 
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  Historial de Asistencia
                </button>
              </div>
            </div>

            {/* Contenido Principal - Con altura fija y scroll interno */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full p-4 lg:p-6 overflow-y-auto bg-white">
              {selectedAttendanceOption === 'cursos-actuales' && (
                <div className="space-y-6">
                  <div className="bg-zinc-50 p-4 rounded-lg border">
                    <h3 className="text-lg font-semibold text-zinc-900 mb-4">Asistencia - Cursos Actuales</h3>
                    
                    {/* Selector de Curso */}
                    <div className="mb-6 bg-white p-4 rounded-lg border border-zinc-200">
                      <h4 className="font-medium text-zinc-900 mb-3">Seleccionar Curso</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-zinc-700 mb-2">Curso:</label>
                          <select 
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="w-full p-2 border border-zinc-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="MAT-401">MAT-401 - Cálculo Diferencial e Integral III</option>
                            <option value="PRG-205">PRG-205 - Programación Orientada a Objetos</option>
                            <option value="FIS-201">FIS-201 - Física General II</option>
                            <option value="QUI-101">QUI-101 - Química General</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                            Ver Asistencia
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Resumen de Asistencia */}
                    <div className="bg-white p-4 rounded-lg border border-zinc-200 mb-6">
                      <h4 className="font-medium text-zinc-900 mb-3">Resumen de Asistencia - {selectedCourse}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <span className="text-zinc-600">Clases Totales:</span>
                          <p className="text-2xl font-bold text-blue-600">32</p>
                        </div>
                        <div>
                          <span className="text-zinc-600">Clases Asistidas:</span>
                          <p className="text-2xl font-bold text-green-600">28</p>
                        </div>
                        <div>
                          <span className="text-zinc-600">Ausencias:</span>
                          <p className="text-2xl font-bold text-red-600">4</p>
                        </div>
                        <div>
                          <span className="text-zinc-600">Porcentaje:</span>
                          <p className="text-2xl font-bold text-green-600">87.5%</p>
                        </div>
                        <div>
                          <span className="text-zinc-600">Estado:</span>
                          <p className="text-2xl font-bold text-green-600">Aprobado</p>
                        </div>
                      </div>
                      
                      {/* Barra de Progreso */}
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-zinc-700">Porcentaje de Asistencia</span>
                          <span className="text-sm text-zinc-600">87.5% (Mínimo requerido: 75%)</span>
                        </div>
                        <div className="w-full bg-zinc-200 rounded-full h-3">
                          <div className="bg-green-500 h-3 rounded-full" style={{ width: '87.5%' }} />
                        </div>
                      </div>
                    </div>

                    {/* Tabla de Asistencia Detallada */}
                    <div className="bg-white rounded-lg border border-zinc-200">
                      <div className="p-4 border-b border-zinc-200">
                        <h4 className="font-medium text-zinc-900">Registro Detallado de Asistencia</h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-zinc-200 bg-zinc-50">
                              <th className="text-left py-3 px-4 font-medium text-zinc-700">Período</th>
                              <th className="text-left py-3 px-4 font-medium text-zinc-700">Código</th>
                              <th className="text-left py-3 px-4 font-medium text-zinc-700">Materia</th>
                              <th className="text-left py-3 px-4 font-medium text-zinc-700">Curso</th>
                              <th className="text-center py-3 px-4 font-medium text-zinc-700">Sección</th>
                              <th className="text-left py-3 px-4 font-medium text-zinc-700">Título</th>
                              <th className="text-left py-3 px-4 font-medium text-zinc-700">Horario</th>
                              <th className="text-center py-3 px-4 font-medium text-zinc-700">Hora</th>
                              <th className="text-center py-3 px-4 font-medium text-zinc-700">Ausente</th>
                              <th className="text-center py-3 px-4 font-medium text-zinc-700">Porcentaje</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { periodo: '2024-I', codigo: 'MAT-401', materia: 'Matemáticas', curso: 'Cálculo III', seccion: 'A', titulo: 'Integrales Dobles', horario: 'Lun-Mie-Vie', hora: '08:00-09:30', ausente: 'No', porcentaje: '87.5%' },
                              { periodo: '2024-I', codigo: 'MAT-401', materia: 'Matemáticas', curso: 'Cálculo III', seccion: 'A', titulo: 'Integrales Triples', horario: 'Lun-Mie-Vie', hora: '08:00-09:30', ausente: 'No', porcentaje: '87.5%' },
                              { periodo: '2024-I', codigo: 'MAT-401', materia: 'Matemáticas', curso: 'Cálculo III', seccion: 'A', titulo: 'Teoremas Fundamentales', horario: 'Lun-Mie-Vie', hora: '08:00-09:30', ausente: 'Sí', porcentaje: '87.5%' },
                              { periodo: '2024-I', codigo: 'MAT-401', materia: 'Matemáticas', curso: 'Cálculo III', seccion: 'A', titulo: 'Coordenadas Polares', horario: 'Lun-Mie-Vie', hora: '08:00-09:30', ausente: 'No', porcentaje: '87.5%' },
                              { periodo: '2024-I', codigo: 'MAT-401', materia: 'Matemáticas', curso: 'Cálculo III', seccion: 'A', titulo: 'Series Infinitas', horario: 'Lun-Mie-Vie', hora: '08:00-09:30', ausente: 'Sí', porcentaje: '87.5%' },
                              { periodo: '2024-I', codigo: 'MAT-401', materia: 'Matemáticas', curso: 'Cálculo III', seccion: 'A', titulo: 'Convergencia', horario: 'Lun-Mie-Vie', hora: '08:00-09:30', ausente: 'No', porcentaje: '87.5%' },
                              { periodo: '2024-I', codigo: 'MAT-401', materia: 'Matemáticas', curso: 'Cálculo III', seccion: 'A', titulo: 'Series de Potencias', horario: 'Lun-Mie-Vie', hora: '08:00-09:30', ausente: 'No', porcentaje: '87.5%' },
                              { periodo: '2024-I', codigo: 'MAT-401', materia: 'Matemáticas', curso: 'Cálculo III', seccion: 'A', titulo: 'Examen Parcial', horario: 'Lun-Mie-Vie', hora: '08:00-09:30', ausente: 'No', porcentaje: '87.5%' }
                            ].map((registro, idx) => (
                              <tr key={idx} className="border-b border-zinc-100 hover:bg-zinc-50">
                                <td className="py-3 px-4">{registro.periodo}</td>
                                <td className="py-3 px-4">
                                  <span className="bg-zinc-100 px-2 py-1 rounded text-xs font-mono">{registro.codigo}</span>
                                </td>
                                <td className="py-3 px-4">{registro.materia}</td>
                                <td className="py-3 px-4 font-medium">{registro.curso}</td>
                                <td className="text-center py-3 px-4">{registro.seccion}</td>
                                <td className="py-3 px-4">{registro.titulo}</td>
                                <td className="py-3 px-4">{registro.horario}</td>
                                <td className="text-center py-3 px-4">{registro.hora}</td>
                                <td className="text-center py-3 px-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    registro.ausente === 'No' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {registro.ausente}
                                  </span>
                                </td>
                                <td className="text-center py-3 px-4 font-semibold text-green-600">{registro.porcentaje}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedAttendanceOption === 'historial-asistencia' && (
                <div className="space-y-6">
                  <div className="bg-zinc-50 p-4 rounded-lg border">
                    <h3 className="text-lg font-semibold text-zinc-900 mb-4">Historial de Asistencia</h3>
                    
                    {/* Filtros para Historial */}
                    <div className="mb-6 bg-white p-4 rounded-lg border border-zinc-200">
                      <h4 className="font-medium text-zinc-900 mb-3">Filtros de Búsqueda</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-zinc-700 mb-2">Período:</label>
                          <select className="w-full p-2 border border-zinc-300 rounded text-sm">
                            <option value="">Todos los períodos</option>
                            <option value="2024-I">2024-I</option>
                            <option value="2023-II">2023-II</option>
                            <option value="2023-I">2023-I</option>
                            <option value="2022-II">2022-II</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-700 mb-2">Materia:</label>
                          <select className="w-full p-2 border border-zinc-300 rounded text-sm">
                            <option value="">Todas las materias</option>
                            <option value="MAT">Matemáticas</option>
                            <option value="PRG">Programación</option>
                            <option value="FIS">Física</option>
                            <option value="QUI">Química</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                            Filtrar
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Resumen Histórico */}
                    <div className="bg-white p-4 rounded-lg border border-zinc-200 mb-6">
                      <h4 className="font-medium text-zinc-900 mb-3">Resumen Histórico de Asistencia</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-zinc-600">Promedio General:</span>
                          <p className="text-2xl font-bold text-green-600">85.2%</p>
                        </div>
                        <div>
                          <span className="text-zinc-600">Cursos Completados:</span>
                          <p className="text-2xl font-bold text-blue-600">12</p>
                        </div>
                        <div>
                          <span className="text-zinc-600">Mejor Asistencia:</span>
                          <p className="text-2xl font-bold text-green-600">95.8%</p>
                        </div>
                        <div>
                          <span className="text-zinc-600">Cursos Aprobados:</span>
                          <p className="text-2xl font-bold text-green-600">12/12</p>
                        </div>
                      </div>
                    </div>

                    {/* Lista de Cursos Históricos */}
                    <div className="space-y-4">
                      {[
                        { periodo: '2023-II', codigo: 'MAT-301', materia: 'Cálculo II', seccion: 'A', asistencia: 92.3, estado: 'Aprobado' },
                        { periodo: '2023-II', codigo: 'PRG-101', materia: 'Programación I', seccion: 'B', asistencia: 88.7, estado: 'Aprobado' },
                        { periodo: '2023-I', codigo: 'FIS-101', materia: 'Física I', seccion: 'A', asistencia: 85.4, estado: 'Aprobado' },
                        { periodo: '2023-I', codigo: 'MAT-201', materia: 'Cálculo I', seccion: 'A', asistencia: 95.8, estado: 'Aprobado' },
                        { periodo: '2022-II', codigo: 'ALG-101', materia: 'Álgebra Lineal', seccion: 'A', asistencia: 78.2, estado: 'Aprobado' },
                        { periodo: '2022-II', codigo: 'ING-101', materia: 'Inglés I', seccion: 'C', asistencia: 82.1, estado: 'Aprobado' }
                      ].map((curso, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg border border-zinc-200 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="bg-zinc-900 text-white px-2 py-1 rounded text-xs font-mono">{curso.codigo}</span>
                                <h5 className="font-medium text-zinc-900">{curso.materia}</h5>
                                <span className="text-sm text-zinc-500">Sección {curso.seccion}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  curso.estado === 'Aprobado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {curso.estado}
                                </span>
                              </div>
                              <div className="text-sm text-zinc-600">
                                Período: {curso.periodo}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">{curso.asistencia}%</div>
                              <div className="text-xs text-zinc-500">Asistencia</div>
                            </div>
                          </div>
                          
                          {/* Barra de Progreso Individual */}
                          <div className="mt-3">
                            <div className="w-full bg-zinc-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  curso.asistencia >= 90 ? 'bg-green-500' :
                                  curso.asistencia >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${curso.asistencia}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Análisis de Tendencias */}
                    <div className="bg-white p-4 rounded-lg border border-zinc-200 mt-6">
                      <h4 className="font-medium text-zinc-900 mb-3">Análisis de Tendencias</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-green-900">Tendencia Positiva</span>
                          </div>
                          <p className="text-xs text-green-700">Tu asistencia ha mejorado en los últimos 3 períodos.</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm font-medium text-blue-900">Consistencia</span>
                          </div>
                          <p className="text-xs text-blue-700">Mantienes un promedio estable por encima del 75%.</p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-sm font-medium text-purple-900">Recomendación</span>
                          </div>
                          <p className="text-xs text-purple-700">Excelente historial. Continúa con esta disciplina.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
        )
      case 'perfil-docente':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Perfil del Docente</CardTitle>
              <CardDescription>Información profesional del docente</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Perfil profesional del docente...</p>
            </CardContent>
          </Card>
        )
      case 'calificaciones':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Calificaciones</CardTitle>
              <CardDescription>Gestión de calificaciones y evaluaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Sistema de calificaciones...</p>
            </CardContent>
          </Card>
        )
      case 'horario-clases':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Horario de Clases</CardTitle>
              <CardDescription>Programación de clases del docente</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Horario de clases asignadas...</p>
            </CardContent>
          </Card>
        )
      case 'control-asistencia':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Control de Asistencia</CardTitle>
              <CardDescription>Registro y control de asistencia de estudiantes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Herramientas de control de asistencia...</p>
            </CardContent>
          </Card>
        )
      case 'solicitudes-servicios':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes de Servicios Académicos</CardTitle>
              <CardDescription>Crear y gestionar solicitudes académicas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Portal de solicitudes académicas...</p>
            </CardContent>
          </Card>
        )
      case 'status-solicitud':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Ver Status de Solicitud de Servicio</CardTitle>
              <CardDescription>Seguimiento del estado de solicitudes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Estado de las solicitudes enviadas...</p>
            </CardContent>
          </Card>
        )
      default:
        return (
          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-2xl p-6 md:p-8 text-white shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Home className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Bienvenido a la Intranet</h1>
                  <p className="text-zinc-300 mt-1">Sistema de Gestión Académica Yachaq</p>
                </div>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-zinc-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-zinc-900 rounded-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900">Menú de Estudiante</h3>
                  </div>
                  <p className="text-zinc-600 text-sm">Gestiona tu perfil, información académica y horarios</p>
                </CardContent>
              </Card>

              <Card className="border border-zinc-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-zinc-900 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900">Menú de Docente</h3>
                  </div>
                  <p className="text-zinc-600 text-sm">Administra calificaciones, horarios y asistencia</p>
                </CardContent>
              </Card>

              <Card className="border border-zinc-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-zinc-900 rounded-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900">Menú de Solicitudes</h3>
                  </div>
                  <p className="text-zinc-600 text-sm">Envía y rastrea solicitudes académicas</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return (
    <MainLayout>
      <div className="flex bg-zinc-50 h-[calc(100vh-152px)] overflow-hidden">
        {/* Mobile Menu Button */}
        {isMobile && (
          <div className="fixed top-[152px] right-4 z-40">
            <Button
              onClick={toggleSidebar}
              className="p-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full shadow-lg"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Overlay para móvil */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed top-[152px] left-0 right-0 bottom-0 bg-black/50 z-25 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div 
          data-sidebar-menu
          className={`
            ${isMobile 
              ? `fixed top-[152px] left-0 bottom-0 w-20 bg-white shadow-2xl transform transition-transform duration-300 z-30 border-r border-zinc-200 ${
                  isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`
              : 'w-20 bg-white shadow-lg border-r border-zinc-200'
            }
          `}>
          {/* Sidebar Navigation */}
          <nav className={`${isMobile ? 'pt-4' : 'pt-4'} p-2 h-full overflow-visible`}>
            <div className="space-y-4 relative">
              {menuItems.map((menu) => {
                const MenuIcon = menu.icon
                const isExpanded = expandedMenus.includes(menu.id)
                const hasActiveItem = menu.subItems.some(item => item.id === activeSubItem)
                
                return (
                  <div key={menu.id} className="relative">
                    <Button
                      variant="ghost"
                      onClick={() => toggleMenu(menu.id)}
                      className={`w-full p-3 h-auto hover:bg-zinc-50 rounded-lg transition-all duration-200 group relative ${
                        hasActiveItem ? 'bg-zinc-100' : ''
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1 relative">
                        <div className={`p-2 rounded-lg transition-colors relative ${
                          hasActiveItem 
                            ? 'bg-zinc-900 text-white' 
                            : 'bg-zinc-100 group-hover:bg-zinc-200 text-zinc-700'
                        }`}>
                          <MenuIcon className="w-6 h-6" />
                          {isExpanded && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-zinc-900 rounded-full flex items-center justify-center">
                              <ChevronRight className="w-2 h-2 text-white rotate-90" />
                            </div>
                          )}
                        </div>
                        <span className={`font-medium text-xs text-center leading-tight ${
                          hasActiveItem ? 'text-zinc-900' : 'text-zinc-600'
                        }`}>
                          {menu.title.replace('Menú de ', '')}
                        </span>
                      </div>
                    </Button>
                    
                    {/* Dropdown Menu */}
                    {isExpanded && (
                      <div className="absolute left-20 top-0 bg-white border border-zinc-200 rounded-lg shadow-2xl z-[35] min-w-72 animate-in slide-in-from-left-2 duration-200">
                        <div className="p-3">
                          <div className="text-xs font-semibold text-zinc-500 px-2 py-1 mb-2 border-b border-zinc-100">
                            {menu.title}
                          </div>
                          <div className="space-y-1">
                            {menu.subItems.map((subItem) => {
                              const SubIcon = subItem.icon
                              const isActive = activeSubItem === subItem.id
                              
                              return (
                                <Button
                                  key={subItem.id}
                                  variant="ghost"
                                  onClick={() => handleSubItemClick(subItem.id)}
                                  className={`w-full justify-start p-3 h-auto text-sm rounded-md transition-all duration-200 ${
                                    isActive 
                                      ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
                                      : 'hover:bg-zinc-50 text-zinc-700'
                                  }`}
                                >
                                  <SubIcon className={`w-4 h-4 mr-3 ${
                                    isActive ? 'text-white' : 'text-zinc-500'
                                  }`} />
                                  <span className="text-left leading-tight font-medium">
                                    {subItem.title}
                                  </span>
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        {activeSubItem === 'perfil-estudiante' ? (
          <div className="flex-1 h-full">
            {renderContent()}
          </div>
        ) : (
          <div className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default memo(Intranet)