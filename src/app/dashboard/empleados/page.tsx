'use client';

import SearchFilter from '@/components/SearchFilter';
import { useMemo, useState } from 'react';

// Datos de prueba (después conectaremos con el backend)
const mockEmployees = [
  {
    id: 1,
    name: 'Dr. Juan Pérez',
    email: 'juan@jhk.edu',
    phone: '+1 234 567 890',
    position: 'Asesor Principal de Proyectos Educativos',
    department: 'Asesoría Académica',
    rateType: 'HORARIA',
    rate: 35,
    status: 'Activo',
    startDate: '2024-01-15',
    totalHours: 160,
    totalEarnings: 5600,
    avatar: '👨‍🏫'
  },
  {
    id: 2,
    name: 'Lic. María García',
    email: 'maria@jhk.edu',
    phone: '+1 234 567 891',
    position: 'Asesora de Metodologías',
    department: 'Innovación Educativa',
    rateType: 'FIJA',
    rate: 4000,
    status: 'Activo',
    startDate: '2024-02-01',
    totalHours: 160,
    totalEarnings: 4000,
    avatar: '👩‍🏫'
  },
  {
    id: 3,
    name: 'MSc. Carlos López',
    email: 'carlos@jhk.edu',
    phone: '+1 234 567 892',
    position: 'Asesor de Tecnología Educativa',
    department: 'Tecnología',
    rateType: 'FIJA',
    rate: 4500,
    status: 'Activo',
    startDate: '2023-11-01',
    totalHours: 160,
    totalEarnings: 4500,
    avatar: '👨‍💻'
  },
  {
    id: 4,
    name: 'Dra. Ana Rodríguez',
    email: 'ana@jhk.edu',
    phone: '+1 234 567 893',
    position: 'Asesora de Investigación',
    department: 'Investigación',
    rateType: 'HORARIA',
    rate: 40,
    status: 'Inactivo',
    startDate: '2024-03-01',
    totalHours: 80,
    totalEarnings: 3200,
    avatar: '👩‍🔬'
  }
];

const rateTypeLabels = {
  HORARIA: '🕐 Por Hora',
  FIJA: '💰 Salario Fijo',
  PROYECTO: '📋 Por Proyecto'
};

const statusColors = {
  Activo: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Inactivo: 'bg-red-100 text-red-800 border-red-200',
  Vacaciones: 'bg-blue-100 text-blue-800 border-blue-200',
  Licencia: 'bg-amber-100 text-amber-800 border-amber-200'
};

export default function EmpleadosPage() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    rateType: 'HORARIA',
    rate: '',
    startDate: ''
  });

  // Filtrado y búsqueda
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === '' || employee.status === statusFilter;
      const matchesDepartment = departmentFilter === '' || employee.department === departmentFilter;
      
      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [employees, searchQuery, statusFilter, departmentFilter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Agregar nuevo asesor (después conectaremos con el backend)
    const newEmployee = {
      id: employees.length + 1,
      ...formData,
      rate: parseFloat(formData.rate),
      status: 'Activo',
      totalHours: 0,
      totalEarnings: 0,
      avatar: '👨‍🏫'
    };
    
    setEmployees([...employees, newEmployee]);
    setFormData({ name: '', email: '', phone: '', position: '', department: '', rateType: 'HORARIA', rate: '', startDate: '' });
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateMonthlyCost = (employee: any) => {
    if (employee.rateType === 'HORARIA') {
      return employee.rate * 160; // 160 horas por mes
    }
    return employee.rate;
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header mejorado con colores JHK */}
      <div className="bg-gradient-to-r from-purple-600 to-emerald-600 rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">👷 Gestión de Asesores</h1>
            <p className="text-purple-100 text-base sm:text-lg">Administra tu equipo de asesoría educativa</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto bg-white text-purple-600 px-4 sm:px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {showForm ? '❌ Cancelar' : '➕ Nuevo Asesor'}
          </button>
        </div>
      </div>



      {/* Formulario de creación mejorado */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-emerald-600 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">📝 Nuevo Asesor</h3>
            <p className="text-purple-100">Completa la información del nuevo miembro del equipo</p>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">👤</span> Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Dr. Juan Pérez"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">📧</span> Email Corporativo
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="asesor@jhk.edu"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">📞</span> Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="+1 234 567 890"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">💼</span> Cargo
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Asesor de Proyectos Educativos"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">🏢</span> Departamento
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  required
                >
                  <option value="">Seleccionar departamento</option>
                  <option value="Asesoría Académica">🎓 Asesoría Académica</option>
                  <option value="Innovación Educativa">🚀 Innovación Educativa</option>
                  <option value="Tecnología">💻 Tecnología</option>
                  <option value="Investigación">🔬 Investigación</option>
                  <option value="Metodologías">📚 Metodologías</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">💰</span> Tipo de Salario
                </label>
                <select
                  name="rateType"
                  value={formData.rateType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  required
                >
                  <option value="HORARIA">🕐 Por Hora</option>
                  <option value="FIJA">💰 Salario Fijo</option>
                  <option value="PROYECTO">📋 Por Proyecto</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">💵</span> Salario/Tarifa
                </label>
                <input
                  type="number"
                  name="rate"
                  value={formData.rate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder={formData.rateType === 'HORARIA' ? '35.00' : '4000.00'}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">📅</span> Fecha de Contratación
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
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                ✨ Contratar Asesor
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Estadísticas mejoradas con colores JHK */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{employees.length}</div>
              <div className="text-purple-100">Total de Asesores</div>
            </div>
            <div className="text-4xl">👷</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                {employees.filter(e => e.status === 'Activo').length}
              </div>
              <div className="text-emerald-100">Asesores Activos</div>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                ${employees.reduce((sum, e) => sum + calculateMonthlyCost(e), 0).toLocaleString()}
              </div>
              <div className="text-blue-100">Costo Mensual</div>
            </div>
            <div className="text-4xl">💸</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                {employees.filter(e => e.rateType === 'HORARIA').length}
              </div>
              <div className="text-amber-100">Por Hora</div>
            </div>
            <div className="text-4xl">🕐</div>
          </div>
        </div>
      </div>

      {/* Lista de asesores mejorada */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-emerald-50 px-8 py-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">📋 Lista de Asesores</h3>
          <p className="text-gray-600 mt-1">Gestiona toda la información de tu equipo de asesoría</p>
        </div>
        
        {/* Búsqueda y Filtrado */}
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
          <SearchFilter
            placeholder="Buscar por nombre, email, posición o departamento..."
            onSearch={setSearchQuery}
            onFilter={setStatusFilter}
            filterOptions={[
              { value: 'Activo', label: '🟢 Activo' },
              { value: 'Inactivo', label: '🔴 Inactivo' },
              { value: 'Vacaciones', label: '🏖️ Vacaciones' },
              { value: 'Licencia', label: '📋 Licencia' }
            ]}
            showFilter={true}
            className="mb-4"
          />
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white hover:bg-gray-50 transition-all duration-200"
            >
              <option value="">Todos los departamentos</option>
              <option value="Asesoría Académica">Asesoría Académica</option>
              <option value="Innovación Educativa">Innovación Educativa</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Investigación">Investigación</option>
            </select>
            <div className="text-sm text-gray-600">
              {filteredEmployees.length} de {employees.length} empleados encontrados
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="p-8 hover:bg-gradient-to-r hover:from-purple-50 hover:to-emerald-50 transition-all duration-300">
              <div className="flex items-start space-x-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
                    {employee.avatar}
                  </div>
                </div>
                
                {/* Información del asesor */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <h4 className="text-2xl font-bold text-gray-900">{employee.name}</h4>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${statusColors[employee.status as keyof typeof statusColors]}`}>
                      {employee.status === 'Activo' ? '🟢 Activo' : '🔴 Inactivo'}
                    </span>
                    <span className="px-3 py-1 text-sm font-semibold bg-purple-100 text-purple-800 border border-purple-200 rounded-full">
                      {rateTypeLabels[employee.rateType as keyof typeof rateTypeLabels]}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">📧</span>
                      <span className="text-gray-700 font-medium">{employee.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">📞</span>
                      <span className="text-gray-700 font-medium">{employee.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">💼</span>
                      <span className="text-gray-700 font-medium">{employee.position}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">🏢</span>
                      <span className="text-gray-700 font-medium">{employee.department}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">📅</span>
                      <span className="text-gray-700 font-medium">{employee.startDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">💰</span>
                      <span className="text-gray-700 font-medium">
                        ${employee.rate.toLocaleString()}
                        {employee.rateType === 'HORARIA' ? '/hora' : '/mes'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Métricas del asesor */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-blue-600">🕐</span>
                        <span className="text-blue-800 font-semibold">Horas del Mes</span>
                      </div>
                      <div className="text-xl font-bold text-blue-900">{employee.totalHours}h</div>
                    </div>
                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-emerald-600">💵</span>
                        <span className="text-emerald-800 font-semibold">Ganancias del Mes</span>
                      </div>
                      <div className="text-xl font-bold text-emerald-900">${employee.totalEarnings.toLocaleString()}</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-purple-600">💸</span>
                        <span className="text-purple-800 font-semibold">Costo Mensual</span>
                      </div>
                      <div className="text-xl font-bold text-purple-900">${calculateMonthlyCost(employee).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                
                {/* Botones de acción */}
                <div className="flex flex-col space-y-3">
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    ✏️ Editar
                  </button>
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    👁️ Ver Perfil
                  </button>
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    💰 Pagos
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
