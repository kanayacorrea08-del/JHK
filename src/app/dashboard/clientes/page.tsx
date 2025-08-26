'use client';

import SearchFilter from '@/components/SearchFilter';
import { useMemo, useState } from 'react';

// Datos de prueba (después conectaremos con el backend)
const mockClients = [
  {
    id: 1,
    name: 'Prof. María González',
    email: 'maria.gonzalez@universidad.edu',
    phone: '+1 234 567 890',
    address: 'Universidad Nacional, Facultad de Educación',
    status: 'Activo',
    totalJobs: 3,
    totalValue: 15000,
    avatar: '👩‍🏫'
  },
  {
    id: 2,
    name: 'Dr. Carlos Rodríguez',
    email: 'carlos.rodriguez@instituto.edu',
    phone: '+1 234 567 891',
    address: 'Instituto Tecnológico, Departamento de Ciencias',
    status: 'Activo',
    totalJobs: 2,
    totalValue: 8000,
    avatar: '👨‍🏫'
  },
  {
    id: 3,
    name: 'Lic. Ana Martínez',
    email: 'ana.martinez@colegio.edu',
    phone: '+1 234 567 892',
    address: 'Colegio San José, Área de Investigación',
    status: 'Inactivo',
    totalJobs: 1,
    totalValue: 5000,
    avatar: '👩‍🏫'
  }
];

export default function ClientesPage() {
  const [clients, setClients] = useState(mockClients);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Filtrado y búsqueda
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = 
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone.includes(searchQuery) ||
        client.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === '' || client.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [clients, searchQuery, statusFilter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Agregar nuevo profesor (después conectaremos con el backend)
    const newClient = {
      id: clients.length + 1,
      ...formData,
      status: 'Activo',
      totalJobs: 0,
      totalValue: 0,
      avatar: '👨‍🏫'
    };
    
    setClients([...clients, newClient]);
    setFormData({ name: '', email: '', phone: '', address: '' });
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header mejorado con colores JHK */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">👨‍🏫 Gestión de Profesores</h1>
            <p className="text-emerald-100 text-base sm:text-lg">Administra tu cartera de profesores y sus proyectos educativos</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto bg-white text-emerald-600 px-4 sm:px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {showForm ? '❌ Cancelar' : '➕ Nuevo Profesor'}
          </button>
        </div>
      </div>



      {/* Formulario de creación mejorado */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-600 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">📝 Nuevo Profesor</h3>
            <p className="text-emerald-100">Completa la información del nuevo profesor</p>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-emerald-600">👨‍🏫</span> Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Ej: Dr. Juan Pérez"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-emerald-600">📧</span> Email Institucional
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="profesor@institucion.edu"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-emerald-600">📞</span> Teléfono de Contacto
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="+1 234 567 890"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-emerald-600">🏫</span> Institución
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Universidad, Facultad, Departamento"
                  required
                />
              </div>
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
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                ✨ Crear Profesor
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Estadísticas mejoradas con colores JHK */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{clients.length}</div>
              <div className="text-emerald-100">Total de Profesores</div>
            </div>
            <div className="text-4xl">👨‍🏫</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                {clients.filter(c => c.status === 'Activo').length}
              </div>
              <div className="text-blue-100">Profesores Activos</div>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                {clients.reduce((sum, c) => sum + c.totalJobs, 0)}
              </div>
              <div className="text-amber-100">Total de Proyectos</div>
            </div>
            <div className="text-4xl">📚</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                ${clients.reduce((sum, c) => sum + c.totalValue, 0).toLocaleString()}
              </div>
              <div className="text-purple-100">Valor Total</div>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>
      </div>

      {/* Lista de profesores mejorada */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 px-8 py-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">📚 Lista de Profesores</h3>
          <p className="text-gray-600 mt-1">Gestiona toda la información de tus profesores</p>
        </div>
        
        {/* Búsqueda y Filtrado */}
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
          <SearchFilter
            placeholder="Buscar por nombre, email, teléfono o dirección..."
            onSearch={setSearchQuery}
            onFilter={setStatusFilter}
            filterOptions={[
              { value: 'Activo', label: '🟢 Activo' },
              { value: 'Inactivo', label: '🔴 Inactivo' }
            ]}
            showFilter={true}
            className="mb-4"
          />
          <div className="text-sm text-gray-600 text-center">
            {filteredClients.length} de {clients.length} profesores encontrados
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredClients.map((client) => (
            <div key={client.id} className="p-8 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 transition-all duration-300">
              <div className="flex items-start space-x-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
                    {client.avatar}
                  </div>
                </div>
                
                {/* Información del profesor */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <h4 className="text-2xl font-bold text-gray-900">{client.name}</h4>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      client.status === 'Activo' 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {client.status === 'Activo' ? '🟢 Activo' : '🔴 Inactivo'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">📧</span>
                      <span className="text-gray-700">{client.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">📞</span>
                      <span className="text-gray-700">{client.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">🏫</span>
                      <span className="text-gray-700">{client.address}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600 font-semibold">📚 Proyectos:</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                        {client.totalJobs}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-emerald-600 font-semibold">💰 Valor Total:</span>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-medium">
                        ${client.totalValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Botones de acción */}
                <div className="flex flex-col space-y-3">
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    ✏️ Editar
                  </button>
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    👁️ Ver Proyectos
                  </button>
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    💰 Abonos
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
