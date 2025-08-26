'use client';

import { useEffect, useState } from 'react';

interface Worker {
  id: number;
  name: string;
  email: string;
  position: string;
  hourlyRate: number;
  status: 'ACTIVE' | 'INACTIVE';
  specialty: string;
}

interface WorkerSelectorProps {
  selectedWorker: Worker | null;
  onWorkerSelect: (worker: Worker) => void;
  placeholder?: string;
}

// Datos de prueba de trabajadores (después conectaremos con el backend)
const mockWorkers: Worker[] = [
  {
    id: 1,
    name: 'Lic. Carlos Mendoza',
    email: 'carlos.mendoza@universidad.edu',
    position: 'Desarrollador de Contenido',
    hourlyRate: 25,
    status: 'ACTIVE',
    specialty: 'Desarrollo de Contenido Digital'
  },
  {
    id: 2,
    name: 'Dra. Ana López',
    email: 'ana.lopez@universidad.edu',
    position: 'Investigadora Senior',
    hourlyRate: 35,
    status: 'ACTIVE',
    specialty: 'Metodologías Educativas'
  },
  {
    id: 3,
    name: 'Ing. Roberto Silva',
    email: 'roberto.silva@universidad.edu',
    position: 'Desarrollador Full Stack',
    hourlyRate: 30,
    status: 'ACTIVE',
    specialty: 'Desarrollo Web y Móvil'
  },
  {
    id: 4,
    name: 'Lic. Patricia Ruiz',
    email: 'patricia.ruiz@universidad.edu',
    position: 'Diseñadora Gráfica',
    hourlyRate: 22,
    status: 'ACTIVE',
    specialty: 'Diseño Visual y UX/UI'
  },
  {
    id: 5,
    name: 'Dr. Miguel Torres',
    email: 'miguel.torres@universidad.edu',
    position: 'Analista de Datos',
    hourlyRate: 40,
    status: 'ACTIVE',
    specialty: 'Análisis Estadístico y Big Data'
  },
  {
    id: 6,
    name: 'Lic. Laura Fernández',
    email: 'laura.fernandez@universidad.edu',
    position: 'Editora de Contenido',
    hourlyRate: 20,
    status: 'ACTIVE',
    specialty: 'Edición y Corrección de Textos'
  }
];

export default function WorkerSelector({ 
  selectedWorker, 
  onWorkerSelect, 
  placeholder = "Selecciona un trabajador..." 
}: WorkerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>(mockWorkers);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredWorkers(mockWorkers);
    } else {
      const filtered = mockWorkers.filter(worker =>
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredWorkers(filtered);
    }
  }, [searchTerm]);

  const handleWorkerSelect = (worker: Worker) => {
    onWorkerSelect(worker);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <button
          type="button"
          onClick={handleToggle}
          className="w-full px-4 py-3 text-left border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg bg-white"
        >
          {selectedWorker ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {selectedWorker.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{selectedWorker.name}</div>
                  <div className="text-sm text-gray-500">{selectedWorker.position} - ${selectedWorker.hourlyRate}/h</div>
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
                placeholder="🔍 Buscar trabajador por nombre, posición o especialidad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>

          {/* Lista de trabajadores */}
          <div className="max-h-64 overflow-y-auto">
            {filteredWorkers.length > 0 ? (
              filteredWorkers.map((worker) => (
                <button
                  key={worker.id}
                  onClick={() => handleWorkerSelect(worker)}
                  className="w-full p-4 text-left hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {worker.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{worker.name}</div>
                      <div className="text-sm text-gray-600">{worker.position}</div>
                      <div className="text-xs text-gray-500">{worker.specialty}</div>
                      <div className="text-xs text-purple-600 font-medium">💰 ${worker.hourlyRate}/hora</div>
                    </div>
                    <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                      worker.status === 'ACTIVE' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {worker.status === 'ACTIVE' ? '✅ Activo' : '❌ Inactivo'}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                <div className="text-4xl mb-2">🔍</div>
                <div>No se encontraron trabajadores</div>
                <div className="text-sm">Intenta con otros términos de búsqueda</div>
              </div>
            )}
          </div>

          {/* Footer con estadísticas */}
          <div className="p-3 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-600">
            {filteredWorkers.length} de {mockWorkers.length} trabajadores
          </div>
        </div>
      )}
    </div>
  );
}
