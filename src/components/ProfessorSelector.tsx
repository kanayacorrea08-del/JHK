'use client';

import { useState, useEffect } from 'react';

interface Professor {
  id: number;
  name: string;
  email: string;
  specialty: string;
  status: 'ACTIVE' | 'INACTIVE';
}

interface ProfessorSelectorProps {
  selectedProfessor: Professor | null;
  onProfessorSelect: (professor: Professor) => void;
  placeholder?: string;
}

// Datos de prueba de profesores (después conectaremos con el backend)
const mockProfessors: Professor[] = [
  {
    id: 1,
    name: 'Dr. María González',
    email: 'maria.gonzalez@universidad.edu',
    specialty: 'Matemáticas Avanzadas',
    status: 'ACTIVE'
  },
  {
    id: 2,
    name: 'Dr. Carlos Rodríguez',
    email: 'carlos.rodriguez@universidad.edu',
    specialty: 'Metodologías Educativas',
    status: 'ACTIVE'
  },
  {
    id: 3,
    name: 'Lic. Ana Martínez',
    email: 'ana.martinez@universidad.edu',
    specialty: 'Sistemas Digitales',
    status: 'ACTIVE'
  },
  {
    id: 4,
    name: 'Prof. Juan Pérez',
    email: 'juan.perez@universidad.edu',
    specialty: 'Física Cuántica',
    status: 'ACTIVE'
  },
  {
    id: 5,
    name: 'Dra. Laura Silva',
    email: 'laura.silva@universidad.edu',
    specialty: 'Literatura Contemporánea',
    status: 'ACTIVE'
  }
];

export default function ProfessorSelector({ 
  selectedProfessor, 
  onProfessorSelect, 
  placeholder = "Selecciona un profesor..." 
}: ProfessorSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProfessors, setFilteredProfessors] = useState<Professor[]>(mockProfessors);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProfessors(mockProfessors);
    } else {
      const filtered = mockProfessors.filter(professor =>
        professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professor.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProfessors(filtered);
    }
  }, [searchTerm]);

  const handleProfessorSelect = (professor: Professor) => {
    onProfessorSelect(professor);
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
          className="w-full px-4 py-3 text-left border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg bg-white"
        >
          {selectedProfessor ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {selectedProfessor.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{selectedProfessor.name}</div>
                  <div className="text-sm text-gray-500">{selectedProfessor.specialty}</div>
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
                placeholder="🔍 Buscar profesor por nombre, especialidad o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>

          {/* Lista de profesores */}
          <div className="max-h-64 overflow-y-auto">
            {filteredProfessors.length > 0 ? (
              filteredProfessors.map((professor) => (
                <button
                  key={professor.id}
                  onClick={() => handleProfessorSelect(professor)}
                  className="w-full p-4 text-left hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {professor.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{professor.name}</div>
                      <div className="text-sm text-gray-600">{professor.specialty}</div>
                      <div className="text-xs text-gray-500">{professor.email}</div>
                    </div>
                    <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                      professor.status === 'ACTIVE' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {professor.status === 'ACTIVE' ? '✅ Activo' : '❌ Inactivo'}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                <div className="text-4xl mb-2">🔍</div>
                <div>No se encontraron profesores</div>
                <div className="text-sm">Intenta con otros términos de búsqueda</div>
              </div>
            )}
          </div>

          {/* Footer con estadísticas */}
          <div className="p-3 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-600">
            {filteredProfessors.length} de {mockProfessors.length} profesores
          </div>
        </div>
      )}
    </div>
  );
}
