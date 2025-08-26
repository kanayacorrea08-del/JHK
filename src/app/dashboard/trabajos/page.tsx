'use client';

import SearchFilter from '@/components/SearchFilter';
import { useMemo, useState } from 'react';

// Datos de prueba (después conectaremos con el backend)
const mockJobs = [
  {
    id: 1,
    title: 'Desarrollo de Curso Online de Matemáticas',
    client: 'Prof. María González',
    status: 'EN_CURSO',
    priority: 'ALTA',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    agreedValue: 15000,
    totalPayments: 8000,
    totalTaskCosts: 6000,
    totalEmployeePayments: 4000,
    totalExpenses: 2000,
    progress: 65,
    description: 'Creación de contenido multimedia para curso de matemáticas avanzadas'
  },
  {
    id: 2,
    title: 'Investigación sobre Metodologías Educativas',
    client: 'Dr. Carlos Rodríguez',
    status: 'PLANIFICADO',
    priority: 'MEDIA',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    agreedValue: 8000,
    totalPayments: 0,
    totalTaskCosts: 0,
    totalEmployeePayments: 0,
    totalExpenses: 0,
    progress: 0,
    description: 'Estudio comparativo de metodologías educativas en Latinoamérica'
  },
  {
    id: 3,
    title: 'Sistema de Evaluación Digital',
    client: 'Lic. Ana Martínez',
    status: 'COMPLETADO',
    priority: 'ALTA',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    agreedValue: 12000,
    totalPayments: 12000,
    totalTaskCosts: 8000,
    totalEmployeePayments: 5000,
    totalExpenses: 3000,
    progress: 100,
    description: 'Plataforma digital para evaluación continua de estudiantes'
  }
];

const statusLabels = {
  PLANIFICADO: '📋 Planificado',
  EN_CURSO: '🚧 En Curso',
  COMPLETADO: '✅ Completado',
  CANCELADO: '❌ Cancelado',
  PAUSADO: '⏸️ Pausado'
};

const priorityLabels = {
  BAJA: '🟢 Baja',
  MEDIA: '🟡 Media',
  ALTA: '🔴 Alta',
  URGENTE: '🚨 Urgente'
};

const statusColors = {
  PLANIFICADO: 'bg-blue-100 text-blue-800 border-blue-200',
  EN_CURSO: 'bg-amber-100 text-amber-800 border-amber-200',
  COMPLETADO: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  CANCELADO: 'bg-red-100 text-red-800 border-red-200',
  PAUSADO: 'bg-gray-100 text-gray-800 border-gray-200'
};

const priorityColors = {
  BAJA: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  MEDIA: 'bg-amber-100 text-amber-800 border-amber-200',
  ALTA: 'bg-red-100 text-red-800 border-red-200',
  URGENTE: 'bg-purple-100 text-purple-800 border-purple-200'
};

export default function TrabajosPage() {
  const [jobs, setJobs] = useState(mockJobs);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    status: 'PLANIFICADO',
    priority: 'MEDIA',
    startDate: '',
    endDate: '',
    agreedValue: '',
    description: ''
  });

  // Filtrado y búsqueda
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === '' || job.status === statusFilter;
      const matchesPriority = priorityFilter === '' || job.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [jobs, searchQuery, statusFilter, priorityFilter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Agregar nuevo proyecto (después conectaremos con el backend)
    const newJob = {
      id: jobs.length + 1,
      ...formData,
      agreedValue: parseFloat(formData.agreedValue),
      totalPayments: 0,
      totalTaskCosts: 0,
      totalEmployeePayments: 0,
      totalExpenses: 0,
      progress: 0
    };
    
    setJobs([...jobs, newJob]);
    setFormData({ title: '', client: '', status: 'PLANIFICADO', priority: 'MEDIA', startDate: '', endDate: '', agreedValue: '', description: '' });
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateProfit = (job: any) => {
    return job.agreedValue - job.totalTaskCosts - job.totalEmployeePayments - job.totalExpenses;
  };

  const calculatePendingAmount = (job: any) => {
    return job.agreedValue - job.totalPayments;
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header mejorado con colores JHK */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">📚 Gestión de Proyectos Educativos</h1>
            <p className="text-blue-100 text-base sm:text-lg">Administra proyectos, seguimiento y rentabilidad</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto bg-white text-blue-600 px-4 sm:px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {showForm ? '❌ Cancelar' : '➕ Nuevo Proyecto'}
          </button>
        </div>
      </div>



      {/* Formulario de creación mejorado */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-emerald-600 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">📝 Nuevo Proyecto Educativo</h3>
            <p className="text-blue-100">Completa la información del nuevo proyecto</p>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-blue-600">📚</span> Título del Proyecto
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Ej: Desarrollo de Curso Online"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-blue-600">👨‍🏫</span> Profesor Responsable
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Nombre del profesor"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-blue-600">📊</span> Estado
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  required
                >
                  <option value="PLANIFICADO">📋 Planificado</option>
                  <option value="EN_CURSO">🚧 En Curso</option>
                  <option value="COMPLETADO">✅ Completado</option>
                  <option value="PAUSADO">⏸️ Pausado</option>
                  <option value="CANCELADO">❌ Cancelado</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-blue-600">🚨</span> Prioridad
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  required
                >
                  <option value="BAJA">🟢 Baja</option>
                  <option value="MEDIA">🟡 Media</option>
                  <option value="ALTA">🔴 Alta</option>
                  <option value="URGENTE">🚨 Urgente</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-blue-600">📅</span> Fecha de Inicio
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-blue-600">📅</span> Fecha de Finalización
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-blue-600">💰</span> Valor Acordado ($)
                </label>
                <input
                  type="number"
                  name="agreedValue"
                  value={formData.agreedValue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="text-blue-600">📝</span> Descripción del Proyecto
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                placeholder="Describe los objetivos y alcance del proyecto educativo..."
                required
              />
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 text-gray-600 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
              >
                ❌ Cancelar
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                ✨ Crear Proyecto
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Estadísticas mejoradas con colores JHK */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{jobs.length}</div>
              <div className="text-blue-100">Total de Proyectos</div>
            </div>
            <div className="text-4xl">📚</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                {jobs.filter(j => j.status === 'EN_CURSO').length}
              </div>
              <div className="text-emerald-100">En Curso</div>
            </div>
            <div className="text-4xl">🚧</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                ${jobs.reduce((sum, j) => sum + j.agreedValue, 0).toLocaleString()}
              </div>
              <div className="text-amber-100">Valor Total</div>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                ${jobs.reduce((sum, j) => sum + calculateProfit(j), 0).toLocaleString()}
              </div>
              <div className="text-purple-100">Utilidad Total</div>
            </div>
            <div className="text-4xl">💵</div>
          </div>
        </div>
      </div>

      {/* Lista de proyectos mejorada */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 px-8 py-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">📚 Lista de Proyectos Educativos</h3>
          <p className="text-gray-600 mt-1">Gestiona todos los proyectos y su estado financiero</p>
        </div>
        
        {/* Búsqueda y Filtrado */}
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
          <SearchFilter
            placeholder="Buscar por título, cliente o descripción..."
            onSearch={setSearchQuery}
            onFilter={setStatusFilter}
            filterOptions={[
              { value: 'PLANIFICADO', label: '📋 Planificado' },
              { value: 'EN_CURSO', label: '🚧 En Curso' },
              { value: 'COMPLETADO', label: '✅ Completado' },
              { value: 'CANCELADO', label: '❌ Cancelado' },
              { value: 'PAUSADO', label: '⏸️ Pausado' }
            ]}
            showFilter={true}
            className="mb-4"
          />
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white hover:bg-gray-50 transition-all duration-200"
            >
              <option value="">Todas las prioridades</option>
              <option value="BAJA">🟢 Baja</option>
              <option value="MEDIA">🟡 Media</option>
              <option value="ALTA">🔴 Alta</option>
              <option value="URGENTE">🚨 Urgente</option>
            </select>
            <div className="text-sm text-gray-600">
              {filteredJobs.length} de {jobs.length} proyectos encontrados
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredJobs.map((job) => (
            <div key={job.id} className="p-8 hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50 transition-all duration-300">
              <div className="flex items-start space-x-6">
                {/* Información principal */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <h4 className="text-2xl font-bold text-gray-900">{job.title}</h4>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${statusColors[job.status as keyof typeof statusColors]}`}>
                      {statusLabels[job.status as keyof typeof statusLabels]}
                    </span>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${priorityColors[job.priority as keyof typeof priorityColors]}`}>
                      {priorityLabels[job.priority as keyof typeof priorityLabels]}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">👨‍🏫</span>
                      <span className="text-gray-700 font-medium">{job.client}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">📅</span>
                      <span className="text-gray-700 font-medium">{job.startDate} - {job.endDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">💰</span>
                      <span className="text-gray-700 font-medium">${job.agreedValue.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                  
                  {/* Barra de progreso */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progreso del Proyecto</span>
                      <span>{job.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Métricas financieras */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                      <div className="text-sm text-emerald-600 font-medium">Ingresos</div>
                      <div className="text-lg font-bold text-emerald-700">${job.totalPayments.toLocaleString()}</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-xl border border-red-200">
                      <div className="text-sm text-red-600 font-medium">Costos</div>
                      <div className="text-lg font-bold text-red-700">${(job.totalTaskCosts + job.totalEmployeePayments + job.totalExpenses).toLocaleString()}</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                      <div className="text-sm text-blue-600 font-medium">Pendiente</div>
                      <div className="text-lg font-bold text-blue-700">${calculatePendingAmount(job).toLocaleString()}</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-200">
                      <div className="text-sm text-purple-600 font-medium">Utilidad</div>
                      <div className="text-lg font-bold text-purple-700">${calculateProfit(job).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                
                {/* Botones de acción */}
                <div className="flex flex-col space-y-3">
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    ✏️ Editar
                  </button>
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    👁️ Ver Detalles
                  </button>
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    💰 Abonos
                  </button>
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    📋 Tareas
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
