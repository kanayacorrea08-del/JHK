'use client';

import { useState } from 'react';

// Datos de prueba para los reportes (después conectaremos con el backend)
const mockData = {
  // Datos financieros mensuales
  monthlyData: [
    { month: 'Ene', ingresos: 25000, gastos: 18000, utilidad: 7000 },
    { month: 'Feb', ingresos: 32000, gastos: 22000, utilidad: 10000 },
    { month: 'Mar', ingresos: 28000, gastos: 19000, utilidad: 9000 },
    { month: 'Abr', ingresos: 35000, gastos: 25000, utilidad: 10000 },
    { month: 'May', ingresos: 40000, gastos: 28000, utilidad: 12000 },
    { month: 'Jun', ingresos: 38000, gastos: 26000, utilidad: 12000 }
  ],
  
  // Distribución de gastos por categoría
  expenseCategories: [
    { category: 'Software Educativo', amount: 8500, percentage: 25 },
    { category: 'Infraestructura', amount: 6800, percentage: 20 },
    { category: 'Salarios Asesores', amount: 17000, percentage: 50 },
    { category: 'Marketing Educativo', amount: 1700, percentage: 5 }
  ],
  
  // Estado de proyectos
  jobStatus: [
    { status: 'Completado', count: 12, percentage: 40 },
    { status: 'En Curso', count: 8, percentage: 27 },
    { status: 'Planificado', count: 6, percentage: 20 },
    { status: 'Cancelado', count: 4, percentage: 13 }
  ],
  
  // Rentabilidad por profesor
  clientProfitability: [
    { client: 'Prof. María González', ingresos: 45000, costos: 32000, utilidad: 13000, margen: 29 },
    { client: 'Dr. Carlos Rodríguez', ingresos: 38000, costos: 28000, utilidad: 10000, margen: 26 },
    { client: 'Lic. Ana Martínez', ingresos: 25000, costos: 18000, utilidad: 7000, margen: 28 },
    { client: 'Dr. Juan Pérez', ingresos: 32000, costos: 24000, utilidad: 8000, margen: 25 }
  ],
  
  // Flujo de caja
  cashflow: [
    { month: 'Ene', entradas: 25000, salidas: 18000, balance: 7000 },
    { month: 'Feb', entradas: 32000, salidas: 22000, balance: 10000 },
    { month: 'Mar', entradas: 28000, salidas: 19000, balance: 9000 },
    { month: 'Abr', entradas: 35000, salidas: 25000, balance: 10000 },
    { month: 'May', entradas: 40000, salidas: 28000, balance: 12000 },
    { month: 'Jun', entradas: 38000, salidas: 26000, balance: 12000 }
  ]
};

export default function ReportesPage() {
  const [data] = useState(mockData);
  const [selectedPeriod, setSelectedPeriod] = useState('6M');
  const [selectedReport, setSelectedReport] = useState('financiero');

  const totalIngresos = data.monthlyData.reduce((sum, item) => sum + item.ingresos, 0);
  const totalGastos = data.monthlyData.reduce((sum, item) => sum + item.gastos, 0);
  const totalUtilidad = data.monthlyData.reduce((sum, item) => sum + item.utilidad, 0);
  const margenPromedio = ((totalUtilidad / totalIngresos) * 100).toFixed(1);

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header mejorado con colores JHK */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">📊 Reportes y Análisis</h1>
            <p className="text-teal-100 text-base sm:text-lg">Análisis financiero, métricas e insights del negocio educativo</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-xl px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="3M">Últimos 3 meses</option>
              <option value="6M">Últimos 6 meses</option>
              <option value="1Y">Último año</option>
            </select>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-xl px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="financiero">📈 Financiero</option>
              <option value="operativo">⚙️ Operativo</option>
              <option value="rentabilidad">💰 Rentabilidad</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPIs principales con colores JHK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 sm:p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">${totalIngresos.toLocaleString()}</div>
              <div className="text-emerald-100 text-sm sm:text-base">Ingresos Totales</div>
            </div>
            <div className="text-3xl sm:text-4xl">📈</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 sm:p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">${totalGastos.toLocaleString()}</div>
              <div className="text-red-100 text-sm sm:text-base">Gastos Totales</div>
            </div>
            <div className="text-3xl sm:text-4xl">💸</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 sm:p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">${totalUtilidad.toLocaleString()}</div>
              <div className="text-blue-100 text-sm sm:text-base">Utilidad Total</div>
            </div>
            <div className="text-3xl sm:text-4xl">💵</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 sm:p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">{margenPromedio}%</div>
              <div className="text-purple-100 text-sm sm:text-base">Margen Promedio</div>
            </div>
            <div className="text-3xl sm:text-4xl">📊</div>
          </div>
        </div>
      </div>

      {/* Gráfico de ingresos vs gastos */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">📈 Evolución Financiera Mensual</h3>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Comparación de ingresos, gastos y utilidad</p>
        </div>
                  <div className="p-4 sm:p-6 lg:p-8">
          <div className="space-y-4">
            {data.monthlyData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="font-medium">{item.month}</span>
                  <span>Utilidad: ${item.utilidad.toLocaleString()}</span>
                </div>
                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                  {/* Barra de ingresos */}
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                    style={{ width: `${(item.ingresos / 40000) * 100}%` }}
                  >
                    <div className="flex items-center justify-center h-full text-white text-xs font-medium">
                      ${item.ingresos.toLocaleString()}
                    </div>
                  </div>
                  {/* Barra de gastos superpuesta */}
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                    style={{ width: `${(item.gastos / 40000) * 100}%` }}
                  >
                    <div className="flex items-center justify-center h-full text-white text-xs font-medium">
                      ${item.gastos.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-emerald-500 rounded"></div>
              <span className="text-sm text-gray-600">Ingresos</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">Gastos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Análisis de gastos y rentabilidad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribución de gastos */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">💸 Distribución de Gastos</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {data.expenseCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{category.category}</span>
                    <span className="text-gray-600">${category.amount.toLocaleString()}</span>
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-500">{category.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Estado de proyectos */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">📚 Estado de Proyectos</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {data.jobStatus.map((status, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{status.status}</span>
                    <span className="text-gray-600">{status.count} proyectos</span>
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full ${
                        status.status === 'Completado' ? 'bg-emerald-500' :
                        status.status === 'En Curso' ? 'bg-blue-500' :
                        status.status === 'Planificado' ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${status.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-500">{status.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rentabilidad por profesor */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 px-8 py-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">💰 Rentabilidad por Profesor</h3>
          <p className="text-gray-600 mt-1">Análisis de la rentabilidad de cada proyecto educativo</p>
        </div>
        <div className="p-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Profesor</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Ingresos</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Costos</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Utilidad</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Margen</th>
                </tr>
              </thead>
              <tbody>
                {data.clientProfitability.map((client, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-900">{client.client}</td>
                    <td className="py-4 px-4 text-right text-emerald-600 font-semibold">${client.ingresos.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right text-red-600 font-semibold">${client.costos.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right text-blue-600 font-semibold">${client.utilidad.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        client.margen >= 25 ? 'bg-emerald-100 text-emerald-800' :
                        client.margen >= 20 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {client.margen}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Flujo de caja */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 px-8 py-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">💳 Flujo de Caja</h3>
          <p className="text-gray-600 mt-1">Entradas, salidas y balance mensual</p>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.cashflow.map((month, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                <h4 className="text-lg font-bold text-gray-800 mb-4">{month.month}</h4>
                <div className="space-y-3">
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                    <div className="text-sm text-emerald-600 font-medium">Entradas</div>
                    <div className="text-xl font-bold text-emerald-700">${month.entradas.toLocaleString()}</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-xl border border-red-200">
                    <div className="text-sm text-red-600 font-medium">Salidas</div>
                    <div className="text-xl font-bold text-red-700">${month.salidas.toLocaleString()}</div>
                  </div>
                  <div className={`p-3 rounded-xl border ${
                    month.balance >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <div className={`text-sm font-medium ${
                      month.balance >= 0 ? 'text-blue-600' : 'text-red-600'
                    }`}>Balance</div>
                    <div className={`text-xl font-bold ${
                      month.balance >= 0 ? 'text-blue-700' : 'text-red-700'
                    }`}>${month.balance.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Acciones de reportes */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 px-8 py-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">📤 Exportar Reportes</h3>
          <p className="text-gray-600 mt-1">Descarga reportes en diferentes formatos</p>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <div className="text-3xl mb-3">📊</div>
              <div className="text-lg font-semibold">Reporte Financiero</div>
              <div className="text-emerald-100 text-sm mt-2">PDF, Excel, CSV</div>
            </button>
            <button className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <div className="text-3xl mb-3">📈</div>
              <div className="text-lg font-semibold">Análisis de Rentabilidad</div>
              <div className="text-blue-100 text-sm mt-2">Gráficos y métricas</div>
            </button>
            <button className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <div className="text-3xl mb-3">📋</div>
              <div className="text-lg font-semibold">Reporte de Proyectos</div>
              <div className="text-purple-100 text-sm mt-2">Estado y progreso</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
