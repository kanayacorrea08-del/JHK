'use client';

import { useState, useEffect } from 'react';

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

interface ProjectSelectorProps {
  selectedProject: Project | null;
  onProjectSelect: (project: Project) => void;
  professorId: number | null;
  placeholder?: string;
  disabled?: boolean;
}

// Datos de prueba de proyectos (después conectaremos con el backend)
const mockProjects: Project[] = [
  {
    id: 1,
    title: 'Desarrollo de Curso Online de Matemáticas Avanzadas',
    description: 'Creación de contenido digital para estudiantes de posgrado',
    status: 'ACTIVE',
    startDate: '2025-01-01',
    endDate: '2025-06-30',
    budget: 15000,
    professorId: 1
  },
  {
    id: 2,
    title: 'Investigación sobre Metodologías Educativas Innovadoras',
    description: 'Estudio comparativo de métodos de enseñanza modernos',
    status: 'ACTIVE',
    startDate: '2025-01-15',
    endDate: '2025-12-31',
    budget: 25000,
    professorId: 2
  },
  {
    id: 3,
    title: 'Sistema de Evaluación Digital para Educación Superior',
    description: 'Plataforma web para evaluación continua de estudiantes',
    status: 'ACTIVE',
    startDate: '2025-02-01',
    endDate: '2025-08-31',
    budget: 30000,
    professorId: 3
  },
  {
    id: 4,
    title: 'Laboratorio Virtual de Física Cuántica',
    description: 'Simulaciones interactivas para experimentos de física',
    status: 'ACTIVE',
    startDate: '2025-01-10',
    endDate: '2025-07-31',
    budget: 20000,
    professorId: 4
  },
  {
    id: 5,
    title: 'Antología de Literatura Contemporánea Latinoamericana',
    description: 'Compilación y análisis de obras literarias modernas',
    status: 'ACTIVE',
    startDate: '2025-03-01',
    endDate: '2025-11-30',
    budget: 18000,
    professorId: 5
  },
  {
    id: 6,
    title: 'Curso de Cálculo Diferencial para Ingeniería',
    description: 'Material didáctico especializado para ingenieros',
    status: 'COMPLETED',
    startDate: '2024-08-01',
    endDate: '2024-12-31',
    budget: 12000,
    professorId: 1
  }
];

const statusColors = {
  ACTIVE: 'bg-emerald-100 text-emerald-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  ON_HOLD: 'bg-amber-100 text-amber-800',
  CANCELLED: 'bg-red-100 text-red-800'
};

const statusLabels = {
  ACTIVE: '🟢 Activo',
  COMPLETED: '🔵 Completado',
  ON_HOLD: '🟡 En Pausa',
  CANCELLED: '🔴 Cancelado'
};

export default function ProjectSelector({ 
  selectedProject, 
  onProjectSelect, 
  professorId,
  placeholder = "Selecciona un proyecto...",
  disabled = false
}: ProjectSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!professorId) {
      setFilteredProjects([]);
      return;
    }

    // Filtrar proyectos por profesor
    const professorProjects = mockProjects.filter(project => project.professorId === professorId);
    
    if (searchTerm.trim() === '') {
      setFilteredProjects(professorProjects);
    } else {
      const filtered = professorProjects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchTerm, professorId]);

  const handleProjectSelect = (project: Project) => {
    onProjectSelect(project);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    if (disabled || !professorId) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  if (!professorId) {
    return (
      <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 text-lg">
        ⚠️ Primero selecciona un profesor para ver sus proyectos
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative">
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={`w-full px-4 py-3 text-left border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg ${
            disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white'
          }`}
        >
          {selectedProject ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  📚
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{selectedProject.title}</div>
                  <div className="text-sm text-gray-500">Presupuesto: ${selectedProject.budget.toLocaleString()}</div>
                </div>
              </div>
              <span className="text-gray-400">▼</span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">{placeholder}</span>
              <span className="text-gray-400">▼</span>
            </div>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-80 overflow-hidden">
          {/* Barra de búsqueda */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Buscar proyecto por título o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>

          {/* Lista de proyectos */}
          <div className="max-h-64 overflow-y-auto">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleProjectSelect(project)}
                  className="w-full p-4 text-left hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      📚
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 mb-1">{project.title}</div>
                      <div className="text-sm text-gray-600 mb-2 line-clamp-2">{project.description}</div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>💰 ${project.budget.toLocaleString()}</span>
                        <span>📅 {project.startDate} - {project.endDate}</span>
                        <span className={`px-2 py-1 rounded-full font-medium ${statusColors[project.status]}`}>
                          {statusLabels[project.status]}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                <div className="text-4xl mb-2">📚</div>
                <div>No se encontraron proyectos</div>
                <div className="text-sm">Este profesor no tiene proyectos activos</div>
              </div>
            )}
          </div>

          {/* Footer con estadísticas */}
          <div className="p-3 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-600">
            {filteredProjects.length} de {mockProjects.filter(p => p.professorId === professorId).length} proyectos del profesor
          </div>
        </div>
      )}
    </div>
  );
}
