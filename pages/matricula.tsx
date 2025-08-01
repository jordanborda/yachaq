<<<<<<< HEAD
'use client'

import MainLayout from '@/components/layout/MainLayout'
import { useState, useEffect } from 'react'
import { 
  Calendar,
  Search,
  RotateCcw,
  Plus,
  Eye,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function Matricula() {
  const { user } = useAuth()
  
  // Main state for schedule options navigation
  const [selectedScheduleOption, setSelectedScheduleOption] = useState<string>('oferta-cursos')
  
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
  
  // Estados para Planear Horario
  const [selectedPeriodPlan, setSelectedPeriodPlan] = useState<string>('')
  const [userPlans, setUserPlans] = useState<any[]>([])
  const [isCreatingPlan, setIsCreatingPlan] = useState(false)
  const [planView, setPlanView] = useState<'periodo' | 'busqueda' | 'cursos'>('periodo')
  const [planSearchCriteria, setPlanSearchCriteria] = useState({
    materia: '',
    numeroCurso: '',
    buscar: ''
  })
  const [planSearchResults, setPlanSearchResults] = useState<any[]>([])
  const [hasPlanSearched, setHasPlanSearched] = useState(false)
  const [showSectionsModal, setShowSectionsModal] = useState(false)
  const [selectedCourseForSections, setSelectedCourseForSections] = useState<any>(null)
  
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

  return (
    <MainLayout>
      <div className="h-[calc(100vh-152px)] flex flex-col bg-white">
        {/* Header Principal - Fijo */}
        <div className="bg-zinc-900 text-white p-4 lg:p-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Calendar className="w-6 h-6" />
              <h2 className="text-xl font-bold">Planear - Elaborar Horario - Retirar Cursos</h2>
            </div>
            <div className="text-sm text-zinc-300">
              Período: <span className="text-white font-medium">2024-II</span>
            </div>
          </div>
          
          {/* Navegación con separadores */}
          <div className="flex flex-wrap items-center gap-1 text-sm">
            <button 
              onClick={() => setSelectedScheduleOption('oferta-cursos')}
              className={`px-3 py-1 rounded transition-colors ${
                selectedScheduleOption === 'oferta-cursos' 
                  ? 'bg-white text-zinc-900 font-medium' 
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Oferta de Cursos
            </button>
            <span className="text-zinc-500 mx-1">|</span>
            <button 
              onClick={() => setSelectedScheduleOption('planear-horario')}
              className={`px-3 py-1 rounded transition-colors ${
                selectedScheduleOption === 'planear-horario' 
                  ? 'bg-white text-zinc-900 font-medium' 
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Planear Horario
            </button>
            <span className="text-zinc-500 mx-1">|</span>
            <button 
              onClick={() => setSelectedScheduleOption('prepararse-inscripcion')}
              className={`px-3 py-1 rounded transition-colors ${
                selectedScheduleOption === 'prepararse-inscripcion' 
                  ? 'bg-white text-zinc-900 font-medium' 
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Prepararse para inscripcion
            </button>
            <span className="text-zinc-500 mx-1">|</span>
            <button 
              onClick={() => {
                if (canAccessRegistrationSections()) {
                  setSelectedScheduleOption('registro-retiro')
                } else {
                  // Opcionalmente mostrar un mensaje o redirigir a prepararse-inscripcion
                  alert('Debe completar todos los requisitos en "Prepararse para inscripción" antes de acceder a esta sección.')
                }
              }}
              className={`px-3 py-1 rounded transition-colors ${
                selectedScheduleOption === 'registro-retiro' 
                  ? 'bg-white text-zinc-900 font-medium' 
                  : canAccessRegistrationSections()
                    ? 'text-zinc-300 hover:text-white'
                    : 'text-zinc-500 cursor-not-allowed opacity-50'
              }`}
              disabled={!canAccessRegistrationSections()}
            >
              Registro y Retiro de Cursos
              {!canAccessRegistrationSections() && (
                <span className="ml-1 text-xs">🔒</span>
              )}
            </button>
            <span className="text-zinc-500 mx-1">|</span>
            <button 
              onClick={() => {
                if (canAccessRegistrationSections()) {
                  setSelectedScheduleOption('como-va-horario')
                } else {
                  // Opcionalmente mostrar un mensaje o redirigir a prepararse-inscripcion
                  alert('Debe completar todos los requisitos en "Prepararse para inscripción" antes de acceder a esta sección.')
                }
              }}
              className={`px-3 py-1 rounded transition-colors ${
                selectedScheduleOption === 'como-va-horario' 
                  ? 'bg-white text-zinc-900 font-medium' 
                  : canAccessRegistrationSections()
                    ? 'text-zinc-300 hover:text-white'
                    : 'text-zinc-500 cursor-not-allowed opacity-50'
              }`}
              disabled={!canAccessRegistrationSections()}
            >
              Como va mi Horario?
              {!canAccessRegistrationSections() && (
                <span className="ml-1 text-xs">🔒</span>
              )}
            </button>
          </div>
        </div>

        {/* Contenido Principal - Con altura fija y scroll interno */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full p-4 lg:p-6 overflow-y-auto bg-white">
          {selectedScheduleOption === 'oferta-cursos' && (
            <div className="space-y-6">
              {/* Selector de Período */}
              <div className="bg-white p-4 rounded-lg border border-zinc-200">
                <div className="max-w-xs">
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Seleccionar Período</label>
                  <select 
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full p-2 border border-zinc-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Seleccione un período --</option>
                    <option value="2025-I">2025-I</option>
                    <option value="2024-II">2024-II</option>
                    <option value="2024-I">2024-I</option>
                    <option value="2023-II">2023-II</option>
                  </select>
                </div>
              </div>

              {/* Panel de Búsqueda - Solo se muestra si hay un período seleccionado */}
              {selectedPeriod && (
                <div className="bg-white p-4 rounded-lg border border-zinc-200">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-4">Criterios de Búsqueda</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">MATERIA</label>
                      <input
                        type="text"
                        value={searchCriteria.materia}
                        onChange={(e) => setSearchCriteria({...searchCriteria, materia: e.target.value})}
                        className="w-full p-2 border border-zinc-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: Matemáticas"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">NUMERO DE CURSO</label>
                      <input
                        type="text"
                        value={searchCriteria.numeroCurso}
                        onChange={(e) => setSearchCriteria({...searchCriteria, numeroCurso: e.target.value})}
                        className="w-full p-2 border border-zinc-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: MAT-401"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">BUSCAR</label>
                      <input
                        type="text"
                        value={searchCriteria.buscar}
                        onChange={(e) => setSearchCriteria({...searchCriteria, buscar: e.target.value})}
                        className="w-full p-2 border border-zinc-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Término de búsqueda"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">CAMPUS</label>
                      <select
                        value={searchCriteria.campus}
                        onChange={(e) => setSearchCriteria({...searchCriteria, campus: e.target.value})}
                        className="w-full p-2 border border-zinc-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Todos los campus</option>
                        <option value="principal">Campus Principal</option>
                        <option value="norte">Campus Norte</option>
                        <option value="sur">Campus Sur</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        // Simular búsqueda con datos de ejemplo
                        const mockResults = [
                          {
                            materia: 'Maestría Inteligencia Artificial',
                            numeroCurso: 'MIA-501',
                            seccion: '001',
                            codigo: 'MIA501001',
                            creditos: 4,
                            titulo: 'Fundamentos de IA',
                            profesor: 'Dr. Juan Pérez',
                            diasClase: 'Lun-Mie-Vie',
                            campus: 'Principal',
                            cupo: 25
                          },
                          {
                            materia: 'Maestría Inteligencia Artificial',
                            numeroCurso: 'MIA-502',
                            seccion: '001',
                            codigo: 'MIA502001',
                            creditos: 3,
                            titulo: 'Machine Learning Avanzado',
                            profesor: 'Dra. Ana García',
                            diasClase: 'Mar-Jue',
                            campus: 'Principal',
                            cupo: 20
                          }
                        ]
                        setSearchResults(mockResults)
                        setHasSearched(true)
                      }}
                      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
                    >
                      BUSCAR
                    </button>
                    <button 
                      onClick={() => {
                        setSearchCriteria({
                          materia: '',
                          numeroCurso: '',
                          buscar: '',
                          campus: ''
                        })
                        setSearchResults([])
                        setHasSearched(false)
                      }}
                      className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors font-medium"
                    >
                      Limpiar
                    </button>
                  </div>
                </div>
              )}

              {/* Resultados de Búsqueda */}
              {hasSearched && (
                <div className="bg-white p-4 rounded-lg border border-zinc-200">
                  {/* Encabezado de resultados */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-zinc-900">
                      Resultados de búsqueda - {searchResults.length} clases
                    </h3>
                    <p className="text-sm text-zinc-600">
                      Período: {selectedPeriod} 
                      {searchCriteria.materia && `, Materia: ${searchCriteria.materia}`}
                    </p>
                  </div>
                  
                  {searchResults.length > 0 ? (
                    <>
                      {/* Tabla de resultados */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse border border-zinc-300">
                          <thead>
                            <tr className="bg-zinc-50">
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Materia</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Número de Curso</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Sección</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Código</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Créditos</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Título</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Profesor</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Días de Clase</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Campus</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Cupo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {searchResults.map((curso, index) => (
                              <tr key={index} className="hover:bg-zinc-50">
                                <td className="border border-zinc-300 px-3 py-2">{curso.materia}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.numeroCurso}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.seccion}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.codigo}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.creditos}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.titulo}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.profesor}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.diasClase}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.campus}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.cupo}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Botón buscar nuevamente */}
                      <div className="mt-4 pt-4 border-t border-zinc-200">
                        <button 
                          onClick={() => {
                            setHasSearched(false)
                            setSearchResults([])
                          }}
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                        >
                          Buscar nuevamente
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-zinc-600">No se encontraron cursos que coincidan con los criterios de búsqueda.</p>
                      <button 
                        onClick={() => {
                          setHasSearched(false)
                          setSearchResults([])
                        }}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                      >
                        Buscar nuevamente
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {selectedScheduleOption === 'planear-horario' && (
            <div className="space-y-6">
              {/* Vista de Selección de Período */}
              {planView === 'periodo' && (
                <>
                  {/* Selector de Período */}
                  <div className="bg-white p-4 rounded-lg border border-zinc-200">
                <div className="max-w-xs">
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Seleccionar Período</label>
                  <select 
                    value={selectedPeriodPlan}
                    onChange={(e) => {
                      setSelectedPeriodPlan(e.target.value)
                      // Simular carga de planes para el período seleccionado
                      if (e.target.value) {
                        const mockPlans = [
                          {
                            id: 1,
                            nombre: 'Plan Principal IA',
                            creadoPor: 'Usted',
                            cursos: [
                              {
                                titulo: 'Fundamentos de IA',
                                codigoSeccion: 'MIA-501-001',
                                creditos: 4,
                                codigo: 'MIA501001',
                                profesor: 'Dr. Juan Pérez',
                                observacion: 'Prerrequisito para ML',
                                cupos: 25
                              }
                            ]
                          }
                        ]
                        setUserPlans(mockPlans)
                      } else {
                        setUserPlans([])
                      }
                      setIsCreatingPlan(false)
                    }}
                    className="w-full p-2 border border-zinc-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Seleccione un período --</option>
                    <option value="2025-I">2025-I</option>
                    <option value="2024-II">2024-II</option>
                    <option value="2024-I">2024-I</option>
                    <option value="2023-II">2023-II</option>
                  </select>
                </div>
              </div>

              {/* Información de Planes - Solo se muestra si hay un período seleccionado */}
              {selectedPeriodPlan && (
                <div className="bg-white p-4 rounded-lg border border-zinc-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900">
                        Planes que ha creado para este período: {userPlans.length}
                      </h3>
                      <p className="text-sm text-zinc-600">Período: {selectedPeriodPlan}</p>
                      <p className="text-sm text-amber-600 mt-1">
                        Tiene permitido un máximo de 5 planes para este período
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        setIsCreatingPlan(true)
                        setPlanView('busqueda')
                      }}
                      disabled={userPlans.length >= 5}
                      className={`px-4 py-2 rounded font-medium transition-colors ${
                        userPlans.length >= 5 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Crear nuevo plan
                    </button>
                  </div>
                </div>
              )}
                </>
              )}

              {/* Vista de Búsqueda de Cursos */}
              {planView === 'busqueda' && (
                <div className="space-y-6">
                  {/* Breadcrumb de navegación */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <button 
                      onClick={() => {
                        setPlanView('periodo')
                        setIsCreatingPlan(false)
                        setPlanSearchResults([])
                        setHasPlanSearched(false)
                        setPlanSearchCriteria({ materia: '', numeroCurso: '', buscar: '' })
                      }}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Regresar a selección de período
                    </button>
                  </div>

                  {/* Contenedor principal con badge */}
                  <div className="relative bg-white border-4 border-gray-400 rounded-lg shadow-xl p-6">
                    {/* Badge "Encontrar Clases" en esquina superior derecha */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Encontrar Clases
                      </span>
                    </div>
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-zinc-900">Ingrese sus criterios de búsqueda</h3>
                  
                      <p className="text-sm text-zinc-600 mb-6">Período: {selectedPeriodPlan}</p>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-zinc-700 mb-2">Materia</label>
                          <input
                            type="text"
                            value={planSearchCriteria.materia}
                            onChange={(e) => setPlanSearchCriteria({...planSearchCriteria, materia: e.target.value})}
                            className="w-full p-3 border border-zinc-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ej: Inteligencia Artificial"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-zinc-700 mb-2">Número de curso</label>
                          <input
                            type="text"
                            value={planSearchCriteria.numeroCurso}
                            onChange={(e) => setPlanSearchCriteria({...planSearchCriteria, numeroCurso: e.target.value})}
                            className="w-full p-3 border border-zinc-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ej: MIA-501"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-zinc-700 mb-2">Buscar</label>
                          <input
                            type="text"
                            value={planSearchCriteria.buscar}
                            onChange={(e) => setPlanSearchCriteria({...planSearchCriteria, buscar: e.target.value})}
                            className="w-full p-3 border border-zinc-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Término de búsqueda"
                          />
                        </div>
                      </div>
                  
                      <div className="flex gap-3">
                        <button 
                          onClick={() => {
                            // Simular búsqueda y navegar a vista de cursos
                            const mockResults = [
                              {
                                materia: 'Maestría Inteligencia Artificial',
                                numeroCurso: 'MIA-501',
                                creditos: 4,
                                titulo: 'Fundamentos de IA'
                              },
                              {
                                materia: 'Maestría Inteligencia Artificial',
                                numeroCurso: 'MIA-502',
                                creditos: 3,
                                titulo: 'Machine Learning Avanzado'
                              },
                              {
                                materia: 'Maestría Inteligencia Artificial',
                                numeroCurso: 'MIA-503',
                                creditos: 3,
                                titulo: 'Redes Neuronales'
                              }
                            ]
                            setPlanSearchResults(mockResults)
                            setHasPlanSearched(true)
                            setPlanView('cursos')
                          }}
                          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors font-medium"
                        >
                          Buscar
                        </button>
                        <button 
                          onClick={() => {
                            setPlanSearchCriteria({
                              materia: '',
                              numeroCurso: '',
                              buscar: ''
                            })
                            setPlanSearchResults([])
                            setHasPlanSearched(false)
                          }}
                          className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition-colors font-medium"
                        >
                          Limpiar
                        </button>
                      </div>

                  {/* Resultados de búsqueda para crear plan */}
                  {hasPlanSearched && (
                    <div className="mt-6 border-t border-zinc-200 pt-6">
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-zinc-900">
                          Resultados de búsqueda: {planSearchResults.length} cursos
                        </h4>
                        <p className="text-sm text-zinc-600">
                          Período: {selectedPeriodPlan}
                          {planSearchCriteria.materia && `, Materia: ${planSearchCriteria.materia}`}
                        </p>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse border border-zinc-300">
                          <thead>
                            <tr className="bg-zinc-50">
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">MATERIA</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">NÚMERO DE CURSO</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">CRÉDITOS</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">TÍTULO</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">ACCIONES</th>
                            </tr>
                          </thead>
                          <tbody>
                            {planSearchResults.map((curso, index) => (
                              <tr key={index} className="hover:bg-zinc-50">
                                <td className="border border-zinc-300 px-3 py-2">{curso.materia}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.numeroCurso}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.creditos}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.titulo}</td>
                                <td className="border border-zinc-300 px-3 py-2">
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => {
                                        setSelectedCourseForSections(curso)
                                        setShowSectionsModal(true)
                                      }}
                                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                                    >
                                      Ver secciones
                                    </button>
                                    <button 
                                      className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                                    >
                                      Agregar Curso
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal de Secciones */}
              {showSectionsModal && selectedCourseForSections && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-zinc-900">
                        Secciones disponibles - {selectedCourseForSections.titulo}
                      </h3>
                      <button 
                        onClick={() => setShowSectionsModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse border border-zinc-300">
                        <thead>
                          <tr className="bg-zinc-50">
                            <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Materia</th>
                            <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Número de Curso</th>
                            <th className="border border-zinc-300 px-3 py-2 text-left font-medium">CÓDIGO</th>
                            <th className="border border-zinc-300 px-3 py-2 text-left font-medium">TÍTULO</th>
                            <th className="border border-zinc-300 px-3 py-2 text-left font-medium">PROFESOR</th>
                            <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Días de clase</th>
                            <th className="border border-zinc-300 px-3 py-2 text-left font-medium">CAMPUS</th>
                            <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Cupo</th>
                            <th className="border border-zinc-300 px-3 py-2 text-left font-medium">ACCIONES</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              materia: selectedCourseForSections.materia,
                              numeroCurso: selectedCourseForSections.numeroCurso,
                              codigo: 'MIA501001',
                              titulo: selectedCourseForSections.titulo,
                              profesor: 'Dr. Juan Pérez',
                              diasClase: 'Lun-Mie-Vie',
                              campus: 'Principal',
                              cupo: 25
                            },
                            {
                              materia: selectedCourseForSections.materia,
                              numeroCurso: selectedCourseForSections.numeroCurso,
                              codigo: 'MIA501002',
                              titulo: selectedCourseForSections.titulo,
                              profesor: 'Dra. Ana García',
                              diasClase: 'Mar-Jue',
                              campus: 'Norte',
                              cupo: 20
                            }
                          ].map((seccion, index) => (
                            <tr key={index} className="hover:bg-zinc-50">
                              <td className="border border-zinc-300 px-3 py-2">{seccion.materia}</td>
                              <td className="border border-zinc-300 px-3 py-2">{seccion.numeroCurso}</td>
                              <td className="border border-zinc-300 px-3 py-2">{seccion.codigo}</td>
                              <td className="border border-zinc-300 px-3 py-2">{seccion.titulo}</td>
                              <td className="border border-zinc-300 px-3 py-2">{seccion.profesor}</td>
                              <td className="border border-zinc-300 px-3 py-2">{seccion.diasClase}</td>
                              <td className="border border-zinc-300 px-3 py-2">{seccion.campus}</td>
                              <td className="border border-zinc-300 px-3 py-2">{seccion.cupo}</td>
                              <td className="border border-zinc-300 px-3 py-2">
                                <button 
                                  className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                                >
                                  Agregar
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Tabla de Planes Existentes */}
              {selectedPeriodPlan && userPlans.length > 0 && !isCreatingPlan && (
                <div className="space-y-4">
                  {userPlans.map((plan, index) => (
                    <div key={plan.id} className="bg-white p-4 rounded-lg border border-zinc-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-zinc-900">PLAN {plan.nombre}</h4>
                          <p className="text-sm text-zinc-600">Creado por: {plan.creadoPor}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                            Eliminar
                          </button>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                            Editar
                          </button>
                        </div>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse border border-zinc-300">
                          <thead>
                            <tr className="bg-zinc-50">
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Título</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Código-sección</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Créditos</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Código</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Profesor</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Observación</th>
                              <th className="border border-zinc-300 px-3 py-2 text-left font-medium">Cupos</th>
                            </tr>
                          </thead>
                          <tbody>
                            {plan.cursos.map((curso, cursoIndex) => (
                              <tr key={cursoIndex} className="hover:bg-zinc-50">
                                <td className="border border-zinc-300 px-3 py-2">{curso.titulo}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.codigoSeccion}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.creditos}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.codigo}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.profesor}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.observacion}</td>
                                <td className="border border-zinc-300 px-3 py-2">{curso.cupos}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {selectedScheduleOption === 'prepararse-inscripcion' && (
            <div className="space-y-6">
              {/* Selector de Período */}
              <div className="bg-white p-4 rounded-lg border border-zinc-200">
                <div className="max-w-xs">
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Seleccione el Período</label>
                  <select 
                    value={selectedPeriodInscription}
                    onChange={(e) => {
                      setSelectedPeriodInscription(e.target.value)
                      // Simular carga de status de inscripción para el período
                      if (e.target.value) {
                        // Aquí podrías hacer una llamada a la API para obtener el status real
                        const mockStatus = {
                          turnosPermitidos: true,
                          horasRestantes: '24 horas',
                          fechaLimite: '15 de Enero, 2025',
                          statusAlumno: true,
                          statusAcademico: 'PRIMER SEMESTRE POSTGRADO',
                          statusAcademicoPermite: true,
                          noRetenciones: true
                        }
                        setInscriptionStatus(mockStatus)
                      }
                    }}
                    className="w-full p-2 border border-zinc-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Seleccione un período --</option>
                    <option value="2025-I">2025-I</option>
                    <option value="2024-II">2024-II</option>
                    <option value="2024-I">2024-I</option>
                    <option value="2023-II">2023-II</option>
                  </select>
                </div>
              </div>

              {/* Status de Inscripción - Solo se muestra si hay un período seleccionado */}
              {selectedPeriodInscription && (
                <div className="bg-white p-6 rounded-lg border border-zinc-200">
                  <h3 className="text-xl font-semibold text-zinc-900 mb-6">
                    Status de inscripción, período {selectedPeriodInscription}
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Check 1: Turnos de inscripción */}
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-0.5 ${
                        inscriptionStatus.turnosPermitidos 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-red-500 bg-red-500'
                      }`}>
                        {inscriptionStatus.turnosPermitidos ? (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900">
                          Los turnos de inscripción sí permiten inscripción en este momento
                        </p>
                        <p className="text-xs text-zinc-600 mt-1">
                          Dentro de las siguientes horas: {inscriptionStatus.horasRestantes}, fecha: {inscriptionStatus.fechaLimite}
                        </p>
                      </div>
                    </div>

                    {/* Check 2: Status de alumno */}
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-0.5 ${
                        inscriptionStatus.statusAlumno 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-red-500 bg-red-500'
                      }`}>
                        {inscriptionStatus.statusAlumno ? (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900">
                          Su status de alumno permite Inscripción
                        </p>
                      </div>
                    </div>

                    {/* Check 3: Status académico */}
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-0.5 ${
                        inscriptionStatus.statusAcademicoPermite 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-red-500 bg-red-500'
                      }`}>
                        {inscriptionStatus.statusAcademicoPermite ? (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900">
                          Su status académico, {inscriptionStatus.statusAcademico} permite inscripción
                        </p>
                      </div>
                    </div>

                    {/* Check 4: Retenciones */}
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-0.5 ${
                        inscriptionStatus.noRetenciones 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-red-500 bg-red-500'
                      }`}>
                        {inscriptionStatus.noRetenciones ? (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900">
                          No tiene retenciones que impidan la inscripción
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mensaje de estado general */}
                  <div className={`mt-6 p-4 rounded-lg border ${
                    inscriptionStatus.turnosPermitidos && 
                    inscriptionStatus.statusAlumno && 
                    inscriptionStatus.statusAcademicoPermite && 
                    inscriptionStatus.noRetenciones
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}>
                    {inscriptionStatus.turnosPermitidos && 
                     inscriptionStatus.statusAlumno && 
                     inscriptionStatus.statusAcademicoPermite && 
                     inscriptionStatus.noRetenciones ? (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-sm font-medium text-green-900">
                          ✅ Usted está habilitado para acceder a las secciones de "Registro y Retiro de Cursos" y "Como va mi Horario"
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <p className="text-sm font-medium text-red-900">
                          ❌ No puede acceder a las secciones de "Registro y Retiro de Cursos" y "Como va mi Horario" hasta cumplir todos los requisitos
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedScheduleOption === 'registro-retiro' && (
            <div className="space-y-6">
              {!canAccessRegistrationSections() ? (
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-red-900">Acceso Denegado</h3>
                  </div>
                  <p className="text-red-800">
                    No puede acceder a la sección "Registro y Retiro de Cursos" hasta completar todos los requisitos 
                    en la sección "Prepararse para inscripción".
                  </p>
                  <button 
                    onClick={() => setSelectedScheduleOption('prepararse-inscripcion')}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Ir a Prepararse para inscripción
                  </button>
                </div>
              ) : (
                <div className="bg-zinc-50 p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-4">Registro y Retiro de Cursos</h3>
                
                {/* Estado de Inscripción */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h4 className="font-medium text-green-900">Período de Inscripción Activo</h4>
                  </div>
                  <p className="text-sm text-green-800">
                    Puedes registrar y retirar cursos hasta el 30 de Enero, 2024
                  </p>
                </div>

                {/* Cursos Registrados */}
                <div className="bg-white p-4 rounded-lg border border-zinc-200 mb-6">
                  <h4 className="font-medium text-zinc-900 mb-3">Cursos Actualmente Registrados</h4>
                  <div className="space-y-3">
                    {[
                      { codigo: 'MAT-401', nombre: 'Cálculo IV', creditos: 4, estado: 'Confirmado', fecha: '15/01/2024' },
                      { codigo: 'PRG-301', nombre: 'Estructuras de Datos', creditos: 5, estado: 'Confirmado', fecha: '15/01/2024' },
                      { codigo: 'FIS-301', nombre: 'Física III', creditos: 4, estado: 'Pendiente', fecha: '16/01/2024' }
                    ].map((curso) => (
                      <div key={curso.codigo} className="flex items-center justify-between p-3 border border-zinc-200 rounded">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-mono bg-zinc-100 px-2 py-1 rounded">{curso.codigo}</span>
                            <span className="font-medium">{curso.nombre}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              curso.estado === 'Confirmado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {curso.estado}
                            </span>
                          </div>
                          <div className="text-sm text-zinc-600">
                            {curso.creditos} créditos • Registrado: {curso.fecha}
                          </div>
                        </div>
                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                          Retirar
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-200">
                    <p className="text-sm">
                      <span className="font-medium">Total registrado:</span> 
                      <span className="text-blue-600 font-semibold"> 13 créditos</span>
                      <span className="text-zinc-500"> (Mínimo: 12, Máximo: 22)</span>
                    </p>
                  </div>
                </div>

                {/* Agregar Nuevos Cursos */}
                <div className="bg-white p-4 rounded-lg border border-zinc-200">
                  <h4 className="font-medium text-zinc-900 mb-3">Agregar Nuevos Cursos</h4>
                  <div className="space-y-3">
                    {[
                      { codigo: 'PRG-205', nombre: 'Base de Datos I', creditos: 4, cupos: '12/22', disponible: true },
                      { codigo: 'ING-201', nombre: 'Inglés Técnico', creditos: 2, cupos: '18/30', disponible: true },
                      { codigo: 'EST-301', nombre: 'Estadística', creditos: 3, cupos: '25/25', disponible: false }
                    ].map((curso) => (
                      <div key={curso.codigo} className={`flex items-center justify-between p-3 border rounded ${
                        curso.disponible ? 'border-zinc-200' : 'border-red-200 bg-red-50'
                      }`}>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-mono bg-zinc-100 px-2 py-1 rounded">{curso.codigo}</span>
                            <span className="font-medium">{curso.nombre}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              curso.disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {curso.cupos} cupos
                            </span>
                          </div>
                          <div className="text-sm text-zinc-600">
                            {curso.creditos} créditos
                          </div>
                        </div>
                        <button 
                          disabled={!curso.disponible}
                          className={`px-3 py-1 rounded text-sm transition-colors ${
                            curso.disponible 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                          }`}
                        >
                          {curso.disponible ? 'Registrar' : 'Sin Cupos'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              )}
            </div>
          )}

          {selectedScheduleOption === 'como-va-horario' && (
            <div className="space-y-6">
              {!canAccessRegistrationSections() ? (
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-red-900">Acceso Denegado</h3>
                  </div>
                  <p className="text-red-800">
                    No puede acceder a la sección "Como va mi Horario" hasta completar todos los requisitos 
                    en la sección "Prepararse para inscripción".
                  </p>
                  <button 
                    onClick={() => setSelectedScheduleOption('prepararse-inscripcion')}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Ir a Prepararse para inscripción
                  </button>
                </div>
              ) : (
                <div className="bg-zinc-50 p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-4">¿Cómo va mi Horario?</h3>
                
                {/* Resumen del Horario */}
                <div className="bg-white p-4 rounded-lg border border-zinc-200 mb-6">
                  <h4 className="font-medium text-zinc-900 mb-3">Resumen de tu Horario Actual</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-zinc-600">Materias Registradas:</span>
                      <p className="text-2xl font-bold text-blue-600">3</p>
                    </div>
                    <div>
                      <span className="text-zinc-600">Total Créditos:</span>
                      <p className="text-2xl font-bold text-green-600">13</p>
                    </div>
                    <div>
                      <span className="text-zinc-600">Horas por Semana:</span>
                      <p className="text-2xl font-bold text-purple-600">18</p>
                    </div>
                    <div>
                      <span className="text-zinc-600">Días de Clase:</span>
                      <p className="text-2xl font-bold text-orange-600">5</p>
                    </div>
                    <div>
                      <span className="text-zinc-600">Tiempo Libre:</span>
                      <p className="text-2xl font-bold text-teal-600">24h</p>
                    </div>
                  </div>
                </div>

                {/* Análisis del Horario */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Distribución por Días */}
                  <div className="bg-white p-4 rounded-lg border border-zinc-200">
                    <h4 className="font-medium text-zinc-900 mb-3">Distribución por Días</h4>
                    <div className="space-y-3">
                      {[
                        { dia: 'Lunes', horas: 4, materias: 2, intensidad: 'Alta' },
                        { dia: 'Martes', horas: 2, materias: 1, intensidad: 'Baja' },
                        { dia: 'Miércoles', horas: 4, materias: 2, intensidad: 'Alta' },
                        { dia: 'Jueves', horas: 2, materias: 1, intensidad: 'Baja' },
                        { dia: 'Viernes', horas: 2, materias: 1, intensidad: 'Baja' },
                        { dia: 'Sábado', horas: 0, materias: 0, intensidad: 'Libre' }
                      ].map((dia) => (
                        <div key={dia.dia} className="flex items-center justify-between">
                          <span className="font-medium w-20">{dia.dia}</span>
                          <div className="flex-1 mx-4">
                            <div className="w-full bg-zinc-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  dia.intensidad === 'Alta' ? 'bg-red-500' :
                                  dia.intensidad === 'Baja' ? 'bg-green-500' : 'bg-zinc-300'
                                }`}
                                style={{ width: `${(dia.horas / 8) * 100}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-sm text-zinc-600 w-16">{dia.horas}h</span>
                          <span className={`text-xs px-2 py-1 rounded w-16 text-center ${
                            dia.intensidad === 'Alta' ? 'bg-red-100 text-red-800' :
                            dia.intensidad === 'Baja' ? 'bg-green-100 text-green-800' :
                            'bg-zinc-100 text-zinc-800'
                          }`}>
                            {dia.intensidad}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recomendaciones */}
                  <div className="bg-white p-4 rounded-lg border border-zinc-200">
                    <h4 className="font-medium text-zinc-900 mb-3">Recomendaciones</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-green-900 text-sm">Horario Balanceado</p>
                          <p className="text-xs text-green-700">Tu distribución de clases es equilibrada durante la semana.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-yellow-900 text-sm">Considera más créditos</p>
                          <p className="text-xs text-yellow-700">Puedes agregar hasta 9 créditos más para acelerar tu carrera.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-blue-900 text-sm">Tiempo de estudio</p>
                          <p className="text-xs text-blue-700">Reserva 2-3 horas de estudio por cada hora de clase.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vista Semanal Compacta */}
                <div className="bg-white p-4 rounded-lg border border-zinc-200">
                  <h4 className="font-medium text-zinc-900 mb-3">Vista Semanal Rápida</h4>
                  <div className="grid grid-cols-7 gap-2">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((dia, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-xs font-medium text-zinc-600 mb-2">{dia}</div>
                        <div className="space-y-1">
                          {idx === 0 && (
                            <>
                              <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded">MAT</div>
                              <div className="bg-green-100 text-green-800 text-xs p-1 rounded">FIS</div>
                            </>
                          )}
                          {idx === 1 && (
                            <div className="bg-red-100 text-red-800 text-xs p-1 rounded">PRG</div>
                          )}
                          {idx === 2 && (
                            <>
                              <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded">MAT</div>
                              <div className="bg-green-100 text-green-800 text-xs p-1 rounded">FIS</div>
                            </>
                          )}
                          {idx === 3 && (
                            <div className="bg-red-100 text-red-800 text-xs p-1 rounded">PRG</div>
                          )}
                          {idx === 4 && (
                            <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded">MAT</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
=======
// El contenido del archivo matricula.tsx
>>>>>>> 7f8368f2931ac26f89411df3f246112cd85681f5
