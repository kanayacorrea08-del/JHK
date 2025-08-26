'use client';

import SearchFilter from '@/components/SearchFilter';
import { useMemo, useState } from 'react';

// Datos de prueba (después conectaremos con el backend)
const mockExpenses = [
  {
    id: 1,
    description: 'Licencias de software educativo (Canvas, Moodle)',
    amount: 1200,
    category: 'SOFTWARE',
    type: 'GENERAL',
    date: '2025-01-15',
    jobId: null,
    jobTitle: null,
    receipt: 'receipt_001.pdf',
    status: 'APROBADO',
    approvedBy: 'Dr. Carlos López'
  },
  {
    id: 2,
    description: 'Servidor AWS para proyecto de investigación educativa',
    amount: 450,
    category: 'INFRAESTRUCTURA',
    type: 'ASIGNADO',
    date: '2025-01-20',
    jobId: 1,
    jobTitle: 'Desarrollo de Curso Online de Matemáticas',
    receipt: 'receipt_002.pdf',
    status: 'APROBADO',
    approvedBy: 'Dr. Carlos López'
  },
  {
    id: 3,
    description: 'Materiales de oficina y papelería educativa',
    amount: 150,
    category: 'OFICINA',
    type: 'GENERAL',
    date: '2025-01-25',
    jobId: null,
    jobTitle: null,
    receipt: 'receipt_003.pdf',
    status: 'PENDIENTE',
    approvedBy: null
  },
  {
    id: 4,
    description: 'Cursos de capacitación para equipo de asesores',
    amount: 800,
    category: 'CAPACITACION',
    type: 'GENERAL',
    date: '2025-01-28',
    jobId: null,
    jobTitle: null,
    receipt: 'receipt_004.pdf',
    status: 'APROBADO',
    approvedBy: 'Dr. Carlos López'
  }
];

const categoryLabels = {
  SOFTWARE: '💻 Software Educativo',
  INFRAESTRUCTURA: '🖥️ Infraestructura',
  OFICINA: '📁 Oficina',
  CAPACITACION: '📚 Capacitación',
  MARKETING: '📢 Marketing Educativo',
  VIAJES: '✈️ Viajes Académicos',
  EQUIPAMIENTO: '🛠️ Equipamiento',
  SERVICIOS: '🔧 Servicios Educativos'
};

const typeLabels = {
  GENERAL: '🏢 General',
  ASIGNADO: '📋 Asignado a Proyecto'
};

const statusColors = {
  PENDIENTE: 'bg-amber-100 text-amber-800 border-amber-200',
  APROBADO: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  RECHAZADO: 'bg-red-100 text-red-800 border-red-200',
  REEMBOLSADO: 'bg-blue-100 text-blue-800 border-blue-200'
};

export default function GastosPage() {
  const [expenses, setExpenses] = useState(mockExpenses);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'GENERAL',
    date: '',
    jobId: ''
  });

  // Filtrado y búsqueda
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchesSearch = 
        expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (expense.jobTitle && expense.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        expense.approvedBy?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === '' || expense.category === categoryFilter;
      const matchesStatus = statusFilter === '' || expense.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [expenses, searchQuery, categoryFilter, statusFilter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Agregar nuevo gasto (después conectaremos con el backend)
    const newExpense = {
      id: expenses.length + 1,
      ...formData,
      amount: parseFloat(formData.amount),
      jobId: formData.jobId ? parseInt(formData.jobId) : null,
      jobTitle: formData.jobId ? 'Proyecto de Investigación' : null,
      receipt: 'receipt_new.pdf',
      status: 'PENDIENTE',
      approvedBy: null
    };
    
    setExpenses([...expenses, newExpense]);
    setFormData({ description: '', amount: '', category: '', type: 'GENERAL', date: '', jobId: '' });
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const approvedExpenses = expenses.filter(exp => exp.status === 'APROBADO').reduce((sum, exp) => sum + exp.amount, 0);
  const pendingExpenses = expenses.filter(exp => exp.status === 'PENDIENTE').reduce((sum, exp) => sum + exp.amount, 0);
  const generalExpenses = expenses.filter(exp => exp.type === 'GENERAL').reduce((sum, exp) => sum + exp.amount, 0);
  const assignedExpenses = expenses.filter(exp => exp.type === 'ASIGNADO').reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header mejorado con colores JHK */}
      <div className="bg-gradient-to-r from-amber-600 to-emerald-600 rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">💰 Gestión de Gastos</h1>
            <p className="text-amber-100 text-base sm:text-lg">Controla costos, categoriza gastos y optimiza presupuestos educativos</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto bg-white text-amber-600 px-4 sm:px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {showForm ? '❌ Cancelar' : '➕ Nuevo Gasto'}
          </button>
        </div>
      </div>



      {/* Formulario de creación mejorado */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-emerald-600 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">📝 Nuevo Gasto</h3>
            <p className="text-amber-100">Registra un nuevo gasto o costo del negocio educativo</p>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-amber-600">📝</span> Descripción del Gasto
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Ej: Licencias de software educativo"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-amber-600">💰</span> Monto ($)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-amber-600">🏷️</span> Categoría
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-lg"
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="SOFTWARE">💻 Software Educativo</option>
                  <option value="INFRAESTRUCTURA">🖥️ Infraestructura</option>
                  <option value="OFICINA">📁 Oficina</option>
                  <option value="CAPACITACION">📚 Capacitación</option>
                  <option value="MARKETING">📢 Marketing Educativo</option>
                  <option value="VIAJES">✈️ Viajes Académicos</option>
                  <option value="EQUIPAMIENTO">🛠️ Equipamiento</option>
                  <option value="SERVICIOS">🔧 Servicios Educativos</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-amber-600">📋</span> Tipo de Gasto
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-lg"
                  required
                >
                  <option value="GENERAL">🏢 General</option>
                  <option value="ASIGNADO">📋 Asignado a Proyecto</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-amber-600">📅</span> Fecha del Gasto
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-amber-600">📋</span> Asignar a Proyecto (Opcional)
                </label>
                <select
                  name="jobId"
                  value={formData.jobId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-lg"
                >
                  <option value="">Sin asignar</option>
                  <option value="1">📚 Desarrollo de Curso Online de Matemáticas</option>
                  <option value="2">📚 Investigación sobre Metodologías Educativas</option>
                  <option value="3">📚 Sistema de Evaluación Digital</option>
                </select>
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
                className="px-8 py-3 bg-gradient-to-r from-amber-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                ✨ Registrar Gasto
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Estadísticas mejoradas con colores JHK */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">${totalExpenses.toLocaleString()}</div>
              <div className="text-amber-100">Total de Gastos</div>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">${approvedExpenses.toLocaleString()}</div>
              <div className="text-emerald-100">Aprobados</div>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">${pendingExpenses.toLocaleString()}</div>
              <div className="text-blue-100">Pendientes</div>
            </div>
            <div className="text-4xl">⏰</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{expenses.length}</div>
              <div className="text-purple-100">Total Registros</div>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>
      </div>

      {/* Análisis de gastos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Distribución por Tipo</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
              <span className="font-medium text-emerald-800">🏢 Gastos Generales</span>
              <span className="text-2xl font-bold text-emerald-600">${generalExpenses.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <span className="font-medium text-blue-800">📋 Gastos Asignados</span>
              <span className="text-2xl font-bold text-blue-600">${assignedExpenses.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🏷️ Top Categorías</h3>
          <div className="space-y-3">
            {Object.entries(
              expenses.reduce((acc, exp) => {
                acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
                return acc;
              }, {} as Record<string, number>)
            )
              .sort(([,a], [,b]) => b - a)
              .slice(0, 3)
              .map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{categoryLabels[category as keyof typeof categoryLabels]}</span>
                  <span className="font-semibold text-gray-800">${amount.toLocaleString()}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Lista de gastos mejorada */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-50 to-emerald-50 px-8 py-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">📋 Lista de Gastos</h3>
          <p className="text-gray-600 mt-1">Gestiona todos los gastos y costos del negocio educativo</p>
        </div>
        
        {/* Búsqueda y Filtrado */}
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
          <SearchFilter
            placeholder="Buscar por descripción, proyecto o aprobador..."
            onSearch={setSearchQuery}
            onFilter={setCategoryFilter}
            filterOptions={[
              { value: 'SOFTWARE', label: '💻 Software Educativo' },
              { value: 'INFRAESTRUCTURA', label: '🖥️ Infraestructura' },
              { value: 'OFICINA', label: '📁 Oficina' },
              { value: 'CAPACITACION', label: '📚 Capacitación' },
              { value: 'MARKETING', label: '📢 Marketing Educativo' },
              { value: 'VIAJES', label: '✈️ Viajes Académicos' },
              { value: 'EQUIPAMIENTO', label: '🛠️ Equipamiento' },
              { value: 'SERVICIOS', label: '🔧 Servicios Educativos' }
            ]}
            showFilter={true}
            className="mb-4"
          />
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white hover:bg-gray-50 transition-all duration-200"
            >
              <option value="">Todos los estados</option>
              <option value="PENDIENTE">⏳ Pendiente</option>
              <option value="APROBADO">✅ Aprobado</option>
              <option value="RECHAZADO">❌ Rechazado</option>
              <option value="REEMBOLSADO">💰 Reembolsado</option>
            </select>
            <div className="text-sm text-gray-600">
              {filteredExpenses.length} de {expenses.length} gastos encontrados
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="p-8 hover:bg-gradient-to-r hover:from-amber-50 hover:to-emerald-50 transition-all duration-300">
              <div className="flex items-start space-x-6">
                {/* Información principal */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <h4 className="text-2xl font-bold text-gray-900">{expense.description}</h4>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${statusColors[expense.status as keyof typeof statusColors]}`}>
                      {expense.status === 'PENDIENTE' ? '⏰ Pendiente' : 
                       expense.status === 'APROBADO' ? '✅ Aprobado' : 
                       expense.status === 'RECHAZADO' ? '❌ Rechazado' : '💳 Reembolsado'}
                    </span>
                    <span className="px-3 py-1 text-sm font-semibold bg-amber-100 text-amber-800 border border-amber-200 rounded-full">
                      {typeLabels[expense.type as keyof typeof typeLabels]}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">💰</span>
                      <span className="text-gray-700 font-medium">${expense.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">🏷️</span>
                      <span className="text-gray-700 font-medium">{categoryLabels[expense.category as keyof typeof categoryLabels]}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">📅</span>
                      <span className="text-gray-700 font-medium">{expense.date}</span>
                    </div>
                    {expense.jobTitle && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">📋</span>
                        <span className="text-gray-700 font-medium">{expense.jobTitle}</span>
                      </div>
                    )}
                    {expense.approvedBy && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">👤</span>
                        <span className="text-gray-700 font-medium">Aprobado por: {expense.approvedBy}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Recibo */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">📄</span>
                      <span className="text-gray-700 font-medium">Recibo:</span>
                      <a 
                        href="#" 
                        className="text-blue-600 hover:text-blue-800 font-medium underline"
                      >
                        {expense.receipt}
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Botones de acción */}
                <div className="flex flex-col space-y-3">
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    ✏️ Editar
                  </button>
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    ✅ Aprobar
                  </button>
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    📄 Ver Recibo
                  </button>
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    📊 Reporte
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
