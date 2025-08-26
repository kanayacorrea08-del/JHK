'use client';

import { useState } from 'react';

// Datos de prueba (después conectaremos con el backend)
const mockData = {
  clients: 12,
  jobs: 8,
  employees: 6,
  totalValue: 125000,
  activeJobs: 5,
  completedJobs: 3,
  pendingPayments: 45000,
  monthlyRevenue: 28000,
  totalCosts: 85000,
  totalProfit: 40000,
  overdueInvoices: 3,
  upcomingDeadlines: 4
};

export default function DashboardPage() {
  const [data, setData] = useState(mockData);

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header principal con colores de JHK */}
      <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-amber-600 rounded-3xl p-4 sm:p-6 lg:p-8 text-white">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">🎓 JHK - Sistema de Contabilidad</h1>
          <p className="text-base sm:text-lg lg:text-xl text-emerald-100 mb-4 sm:mb-6">Asesoría de Proyectos Educativos - Gestión Integral</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-2 sm:py-3">
              <span className="text-xl sm:text-2xl">👨‍🏫</span>
              <span className="ml-2 font-semibold text-sm sm:text-base">{data.clients} Profesores</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-2 sm:py-3">
              <span className="text-xl sm:text-2xl">📚</span>
              <span className="ml-2 font-semibold text-sm sm:text-base">{data.jobs} Proyectos</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-2 sm:py-3">
              <span className="text-xl sm:text-2xl">👷</span>
              <span className="ml-2 font-semibold text-sm sm:text-base">{data.employees} Asesores</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs Principales con colores JHK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 sm:p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">{data.clients}</div>
              <div className="text-emerald-100 text-sm sm:text-base">Profesores Activos</div>
            </div>
            <div className="text-3xl sm:text-4xl">👨‍🏫</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 sm:p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">{data.activeJobs}</div>
              <div className="text-blue-100 text-sm sm:text-base">Proyectos Activos</div>
            </div>
            <div className="text-3xl sm:text-4xl">📚</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 sm:p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">${data.totalValue.toLocaleString()}</div>
              <div className="text-amber-100 text-sm sm:text-base">Valor Total</div>
            </div>
            <div className="text-3xl sm:text-4xl">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 sm:p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">${data.monthlyRevenue.toLocaleString()}</div>
              <div className="text-purple-100 text-sm sm:text-base">Ingresos del Mes</div>
            </div>
            <div className="text-3xl sm:text-4xl">📊</div>
          </div>
        </div>
      </div>

      {/* Métricas Financieras con colores JHK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-2">💵</div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600">${data.totalProfit.toLocaleString()}</div>
            <div className="text-gray-600 font-medium text-sm sm:text-base">Utilidad Total</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-2">Ingresos - Costos</div>
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-2">💸</div>
            <div className="text-2xl sm:text-3xl font-bold text-red-600">${data.totalCosts.toLocaleString()}</div>
            <div className="text-gray-600 font-medium text-sm sm:text-base">Costos Totales</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-2">Asesores + Gastos</div>
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-2">⏰</div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-600">${data.pendingPayments.toLocaleString()}</div>
            <div className="text-gray-600 font-medium text-sm sm:text-base">Pagos Pendientes</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-2">Por Cobrar</div>
          </div>
        </div>
      </div>

      {/* Resumen de Proyectos con colores JHK */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">📚 Resumen de Proyectos Educativos</h3>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Estado actual de todos los proyectos de asesoría</p>
        </div>
                  <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
              <div className="text-3xl sm:text-4xl mb-3">📚</div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">{data.activeJobs}</div>
              <div className="text-blue-700 font-medium text-sm sm:text-base">En Curso</div>
              <div className="text-xs sm:text-sm text-blue-600 mt-2">Proyectos activos</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200">
              <div className="text-3xl sm:text-4xl mb-3">✅</div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600">{data.completedJobs}</div>
              <div className="text-emerald-700 font-medium text-sm sm:text-base">Completados</div>
              <div className="text-xs sm:text-sm text-emerald-600 mt-2">Entregados este mes</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border border-amber-200">
              <div className="text-3xl sm:text-4xl mb-3">⚠️</div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-600">{data.overdueInvoices}</div>
              <div className="text-amber-700 font-medium text-sm sm:text-base">Vencidos</div>
              <div className="text-xs sm:text-sm text-amber-600 mt-2">Facturas por cobrar</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
              <div className="text-3xl sm:text-4xl mb-3">📅</div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">{data.upcomingDeadlines}</div>
              <div className="text-purple-700 font-medium text-sm sm:text-base">Próximos</div>
              <div className="text-xs sm:text-sm text-purple-600 mt-2">Fechas límite</div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones Rápidas con colores JHK */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">⚡ Acciones Rápidas</h3>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Accede rápidamente a las funciones principales</p>
        </div>
                  <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <button className="group p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-emerald-400 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-emerald-100 transition-all duration-300 text-center transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">➕</div>
              <div className="text-base sm:text-lg font-semibold text-gray-700 group-hover:text-emerald-700">Nuevo Profesor</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-2">Agregar cliente</div>
            </button>
            <button className="group p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-300 text-center transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📚</div>
              <div className="text-base sm:text-lg font-semibold text-gray-700 group-hover:text-blue-700">Nuevo Proyecto</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-2">Crear asesoría</div>
            </button>
            <button className="group p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-amber-400 hover:bg-gradient-to-br hover:from-amber-50 hover:to-amber-100 transition-all duration-300 text-center transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">👷</div>
              <div className="text-base sm:text-lg font-semibold text-gray-700 group-hover:text-amber-700">Nuevo Asesor</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-2">Contratar personal</div>
            </button>
            <button className="group p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 transition-all duration-300 text-center transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📊</div>
              <div className="text-base sm:text-lg font-semibold text-gray-700 group-hover:text-purple-700">Ver Reportes</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-2">Análisis financiero</div>
            </button>
          </div>
        </div>
      </div>

      {/* Enlaces del Sistema con colores JHK */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 px-8 py-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">🔗 Enlaces del Sistema</h3>
          <p className="text-gray-600 mt-1">Acceso directo a recursos y herramientas</p>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🔗</span>
                <span className="font-medium text-emerald-800">Backend API</span>
              </div>
              <a
                href="http://localhost:3001/v1/clients"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-800 text-sm font-medium bg-white px-3 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Acceder →
              </a>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📚</span>
                <span className="font-medium text-blue-800">Documentación API</span>
              </div>
              <a
                href="http://localhost:3001/api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium bg-white px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Ver Docs →
              </a>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🗄️</span>
                <span className="font-medium text-amber-800">Base de Datos</span>
              </div>
              <span className="text-amber-600 text-sm font-medium bg-white px-3 py-1 rounded-lg">
                MySQL + XAMPP
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
