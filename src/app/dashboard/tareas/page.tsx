'use client';

import { useState } from 'react';
import ProfessorSelector from '../../../components/ProfessorSelector';
import ProjectSelector from '../../../components/ProjectSelector';
import WorkerSelector from '../../../components/WorkerSelector';

// Interfaces para el sistema de tareas
interface Professor {
  id: number;
  name: string;
  email: string;
  specialty: string;
  status: 'ACTIVE' | 'INACTIVE';
}

interface Project {
  id: number;
  title: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  startDate: string;
  endDate: string;
  budget: number;
  professorId: number;
}

interface Task {
  id: number;
  title: string;
  description: string;
  projectId: number;
  projectTitle: string;
  professorId: number;
  professorName: string;
  workerId: number;
  workerName: string;
  workerPosition: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'PENDING' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED' | 'CANCELLED';
  estimatedHours: number;
  actualHours: number;
  taskValue: number; // Valor fijo que se paga al empleado por completar la tarea
  startDate: string;
  dueDate: string;
  completedDate?: string;
  notes: string;
  attachments: string[];
  progress: number; // 0-100
}

// Datos de prueba de tareas (después conectaremos con el backend)
const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Diseño de Contenido del Módulo 1',
    description: 'Crear el contenido digital para el primer módulo del curso de matemáticas avanzadas',
    projectId: 1,
    projectTitle: 'Desarrollo de Curso Online de Matemáticas Avanzadas',
    professorId: 1,
    professorName: 'Dr. María González',
    workerId: 1,
    workerName: 'Lic. Carlos Mendoza',
    workerPosition: 'Desarrollador de Contenido',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    estimatedHours: 40,
    actualHours: 25,
    taskValue: 1200, // Valor fijo asignado a la tarea
    startDate: '2025-01-15',
    dueDate: '2025-02-15',
    notes: 'Incluir ejercicios interactivos y videos explicativos',
    attachments: ['modulo1_outline.pdf', 'ejercicios_ejemplo.docx'],
    progress: 62
  },
  {
    id: 2,
    title: 'Investigación de Metodologías Modernas',
    description: 'Recopilar y analizar las últimas metodologías educativas innovadoras',
    projectId: 2,
    projectTitle: 'Investigación sobre Metodologías Educativas Innovadoras',
    professorId: 2,
    professorName: 'Dr. Carlos Rodríguez',
    workerId: 2,
    workerName: 'Dra. Ana López',
    workerPosition: 'Investigadora Senior',
    priority: 'MEDIUM',
    status: 'PENDING',
    estimatedHours: 60,
    actualHours: 0,
    taskValue: 2500, // Valor fijo asignado a la tarea
    startDate: '2025-02-01',
    dueDate: '2025-04-30',
    notes: 'Enfocarse en metodologías aplicadas a educación superior',
    attachments: ['metodologias_referencia.pdf'],
    progress: 0
  },
  {
    id: 3,
    title: 'Desarrollo del Frontend del Sistema',
    description: 'Crear la interfaz de usuario para el sistema de evaluación digital',
    projectId: 3,
    projectTitle: 'Sistema de Evaluación Digital para Educación Superior',
    professorId: 3,
    professorName: 'Lic. Ana Martínez',
    workerId: 3,
    workerName: 'Ing. Roberto Silva',
    workerPosition: 'Desarrollador Full Stack',
    priority: 'URGENT',
    status: 'REVIEW',
    estimatedHours: 80,
    actualHours: 75,
    taskValue: 3000, // Valor fijo asignado a la tarea
    startDate: '2025-01-20',
    dueDate: '2025-03-20',
    notes: 'Priorizar la accesibilidad y usabilidad móvil',
    attachments: ['frontend_mockups.fig', 'componentes_react.zip'],
    progress: 94
  }
];

const priorityColors = {
  LOW: 'bg-gray-100 text-gray-800 border-gray-200',
  MEDIUM: 'bg-blue-100 text-blue-800 border-blue-200',
  HIGH: 'bg-amber-100 text-amber-800 border-amber-200',
  URGENT: 'bg-red-100 text-red-800 border-red-200'
};

const priorityLabels = {
  LOW: '🟢 Baja',
  MEDIUM: '🔵 Media',
  HIGH: '🟡 Alta',
  URGENT: '🔴 Urgente'
};

const statusColors = {
  PENDING: 'bg-gray-100 text-gray-800 border-gray-200',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-200',
  REVIEW: 'bg-amber-100 text-amber-800 border-amber-200',
  COMPLETED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  CANCELLED: 'bg-red-100 text-red-800 border-red-200'
};

const statusLabels = {
  PENDING: '⏰ Pendiente',
  IN_PROGRESS: '🚀 En Progreso',
  REVIEW: '👀 En Revisión',
  COMPLETED: '✅ Completada',
  CANCELLED: '❌ Cancelada'
};

// Datos de prueba de trabajadores (después conectaremos con el backend)
const mockWorkers = [
  { id: 1, name: 'Lic. Carlos Mendoza', email: 'carlos.mendoza@universidad.edu', position: 'Desarrollador de Contenido', hourlyRate: 25, specialty: 'Desarrollo de Contenido Digital' },
  { id: 2, name: 'Dra. Ana López', email: 'ana.lopez@universidad.edu', position: 'Investigadora Senior', hourlyRate: 35, specialty: 'Metodologías Educativas' },
  { id: 3, name: 'Ing. Roberto Silva', email: 'roberto.silva@universidad.edu', position: 'Desarrollador Full Stack', hourlyRate: 30, specialty: 'Desarrollo Web y Móvil' },
  { id: 4, name: 'Lic. Patricia Ruiz', email: 'patricia.ruiz@universidad.edu', position: 'Diseñadora Gráfica', hourlyRate: 22, specialty: 'Diseño Visual y UX/UI' },
  { id: 5, name: 'Dr. Miguel Torres', email: 'miguel.torres@universidad.edu', position: 'Analista de Datos', hourlyRate: 40, specialty: 'Análisis Estadístico y Big Data' },
  { id: 6, name: 'Lic. Laura Fernández', email: 'laura.fernandez@universidad.edu', position: 'Editora de Contenido', hourlyRate: 20, specialty: 'Edición y Corrección de Textos' }
];

export default function TareasPage() {
  const [tasks, setTasks] = useState(mockTasks);
  const [showForm, setShowForm] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM' as const,
    estimatedHours: '',
    taskValue: '', // Valor fijo que se paga al empleado
    startDate: '',
    dueDate: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProfessor) {
      alert('Por favor selecciona un profesor');
      return;
    }
    
    if (!selectedProject) {
      alert('Por favor selecciona un proyecto');
      return;
    }
    
    if (!selectedWorker) {
      alert('Por favor selecciona un trabajador');
      return;
    }
    
    // Crear nueva tarea con valor fijo asignado
    const newTask: Task = {
      id: tasks.length + 1,
      title: formData.title,
      description: formData.description,
      projectId: selectedProject.id,
      projectTitle: selectedProject.title,
      professorId: selectedProfessor.id,
      professorName: selectedProfessor.name,
      workerId: selectedWorker.id,
      workerName: selectedWorker.name,
      workerPosition: selectedWorker.position,
      priority: formData.priority,
      status: 'PENDING',
      estimatedHours: parseFloat(formData.estimatedHours),
      actualHours: 0,
      taskValue: parseFloat(formData.taskValue),
      startDate: formData.startDate,
      dueDate: formData.dueDate,
      notes: formData.notes,
      attachments: [],
      progress: 0
    };
    
    setTasks([...tasks, newTask]);
    setFormData({ title: '', description: '', priority: 'MEDIUM', estimatedHours: '', taskValue: '', startDate: '', dueDate: '', notes: '' });
    setSelectedProfessor(null);
    setSelectedProject(null);
    setSelectedWorker(null);
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const updateTaskStatus = (taskId: number, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, progress: newStatus === 'COMPLETED' ? 100 : task.progress }
        : task
    ));
  };

  const updateTaskProgress = (taskId: number, newProgress: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, progress: Math.min(100, Math.max(0, newProgress)) }
        : task
    ));
  };

  // Estadísticas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
  const pendingTasks = tasks.filter(t => t.status === 'PENDING').length;
  const urgentTasks = tasks.filter(t => t.priority === 'URGENT').length;
  const totalTaskValue = tasks.reduce((sum, t) => sum + t.taskValue, 0);
  const completedTaskValue = tasks.filter(t => t.status === 'COMPLETED').reduce((sum, t) => sum + t.taskValue, 0);
  const pendingTaskValue = tasks.filter(t => t.status === 'PENDING').reduce((sum, t) => sum + t.taskValue, 0);

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header mejorado con colores JHK */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">📋 Sistema de Tareas</h1>
            <p className="text-purple-100 text-base sm:text-lg">Asigna y gestiona tareas para asesores en proyectos específicos</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto bg-white text-purple-600 px-4 sm:px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {showForm ? '❌ Cancelar' : '➕ Nueva Tarea'}
          </button>
        </div>
      </div>

      {/* Formulario de creación de tareas */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 sm:px-6 py-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white">📝 Nueva Tarea</h3>
            <p className="text-purple-100 text-sm sm:text-base">Asigna una nueva tarea a un asesor en un proyecto específico</p>
          </div>
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">👨‍🏫</span> Profesor Responsable
                </label>
                <ProfessorSelector
                  selectedProfessor={selectedProfessor}
                  onProfessorSelect={setSelectedProfessor}
                  placeholder="Selecciona un profesor..."
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">📚</span> Proyecto
                </label>
                <ProjectSelector
                  selectedProject={selectedProject}
                  onProjectSelect={setSelectedProject}
                  professorId={selectedProfessor?.id || null}
                  placeholder="Selecciona un proyecto..."
                  disabled={!selectedProfessor}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">👷</span> Trabajador Asignado
                </label>
                <WorkerSelector
                  selectedWorker={selectedWorker}
                  onWorkerSelect={setSelectedWorker}
                  placeholder="Selecciona un trabajador..."
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">🎯</span> Prioridad
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  required
                >
                  <option value="LOW">🟢 Baja</option>
                  <option value="MEDIUM">🔵 Media</option>
                  <option value="HIGH">🟡 Alta</option>
                  <option value="URGENT">🔴 Urgente</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">📝</span> Título de la Tarea
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Ej: Diseño de Contenido del Módulo 1"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">⏱️</span> Horas Estimadas
                </label>
                <input
                  type="number"
                  name="estimatedHours"
                  value={formData.estimatedHours}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="0"
                  required
                  min="1"
                  step="0.5"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">💰</span> Valor de la Tarea ($)
                </label>
                <input
                  type="number"
                  name="taskValue"
                  value={formData.taskValue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                />
                <p className="text-sm text-gray-500">Este es el valor fijo que se pagará al empleado por completar la tarea</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">📅</span> Fecha de Inicio
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">⏰</span> Fecha de Entrega
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="text-purple-600">📄</span> Descripción Detallada
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                placeholder="Describe detalladamente qué debe hacer el asesor..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="text-purple-600">💬</span> Notas Adicionales
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                placeholder="Observaciones, requisitos especiales, etc..."
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setSelectedProfessor(null);
                  setSelectedProject(null);
                  setSelectedWorker(null);
                }}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 text-gray-600 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
              >
                ❌ Cancelar
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                ✨ Crear Tarea
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Estadísticas mejoradas con colores JHK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 sm:p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">{totalTasks}</div>
              <div className="text-sm sm:text-base text-purple-100">Total de Tareas</div>
            </div>
            <div className="text-3xl sm:text-4xl">📋</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 sm:p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">{completedTasks}</div>
              <div className="text-sm sm:text-base text-emerald-100">Completadas</div>
            </div>
            <div className="text-3xl sm:text-4xl">✅</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 sm:p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">{inProgressTasks}</div>
              <div className="text-sm sm:text-base text-blue-100">En Progreso</div>
            </div>
            <div className="text-3xl sm:text-4xl">🚀</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 sm:p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">{pendingTasks}</div>
              <div className="text-sm sm:text-base text-amber-100">Pendientes</div>
            </div>
            <div className="text-3xl sm:text-4xl">⏰</div>
          </div>
        </div>
      </div>

      {/* Estadísticas de valor monetario */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 sm:p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">${totalTaskValue.toLocaleString()}</div>
              <div className="text-sm sm:text-base text-indigo-100">Valor Total Asignado a Tareas</div>
            </div>
            <div className="text-3xl sm:text-4xl">💰</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 sm:p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">${completedTaskValue.toLocaleString()}</div>
              <div className="text-sm sm:text-base text-green-100">Valor de Tareas Completadas</div>
            </div>
            <div className="text-3xl sm:text-4xl">✅</div>
          </div>
        </div>
      </div>

      {/* Lista de tareas mejorada */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">📋 Lista de Tareas</h3>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Gestiona todas las tareas asignadas a asesores</p>
        </div>
        <div className="divide-y divide-gray-100">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 sm:p-6 lg:p-8 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300">
              <div className="flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 lg:space-x-6">
                {/* Información principal */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
                    <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 break-words">
                      {task.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full border ${priorityColors[task.priority]}`}>
                        {priorityLabels[task.priority]}
                      </span>
                      <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full border ${statusColors[task.status]}`}>
                        {statusLabels[task.status]}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm sm:text-base">👨‍🏫</span>
                      <span className="text-gray-700 font-medium text-sm sm:text-base">{task.professorName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm sm:text-base">📚</span>
                      <span className="text-gray-700 font-medium text-sm sm:text-base truncate">{task.projectTitle}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm sm:text-base">👷</span>
                      <span className="text-gray-700 font-medium text-sm sm:text-base">{task.workerName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm sm:text-base">⏱️</span>
                      <span className="text-gray-700 font-medium text-sm sm:text-base">{task.estimatedHours}h estimadas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm sm:text-base">💰</span>
                      <span className="text-gray-700 font-medium text-sm sm:text-base">${task.taskValue.toLocaleString()} por completar</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm sm:text-base">📅</span>
                      <span className="text-gray-700 font-medium text-sm sm:text-base">{task.startDate} - {task.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm sm:text-base">📊</span>
                      <span className="text-gray-700 font-medium text-sm sm:text-base">{task.progress}% completado</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">
                      <span className="font-medium">📄 Descripción:</span> {task.description}
                    </p>
                    {task.notes && (
                      <p className="text-gray-600 text-sm sm:text-base">
                        <span className="font-medium">💬 Notas:</span> {task.notes}
                      </p>
                    )}
                  </div>

                  {/* Barra de progreso */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Progreso</span>
                      <span className="text-xs sm:text-sm text-gray-500">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Archivos adjuntos */}
                  {task.attachments.length > 0 && (
                    <div className="mb-4">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">📎 Archivos:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {task.attachments.map((file, index) => (
                          <span key={index} className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs sm:text-sm">
                            📄 {file}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row lg:flex-col space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-0 lg:space-y-2">
                  <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    ✏️ Editar
                  </button>
                  <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    👁️ Ver
                  </button>
                  <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    📊 Progreso
                  </button>
                  <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    📝 Nota
                  </button>
                  <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    📋 Subtareas
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
