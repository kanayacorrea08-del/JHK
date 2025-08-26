'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar autenticación
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');

    if (!isAuthenticated || !userData) {
      router.push('/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      router.push('/login');
      return;
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3">
                <span className="text-2xl">🏢</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Sistema de Contabilidad
                </h1>
                <p className="text-blue-100 text-sm hidden sm:block">
                  Gestión Integral de Proyectos Educativos
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2">
                <span className="text-white text-sm font-medium">
                  👋 Bienvenido, <span className="font-semibold">{user.name || 'Administrador'}</span>
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full sm:w-auto bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>🚪</span>
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          {/* Menú para desktop */}
          <div className="hidden lg:flex items-center justify-center space-x-1">
            <Link
              href="/dashboard"
              className="group px-4 py-3 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 flex items-center space-x-2"
            >
              <span className="text-lg">🏠</span>
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/clientes"
              className="group px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 flex items-center space-x-2"
            >
              <span className="text-lg">👥</span>
              <span>Clientes</span>
            </Link>
            <Link
              href="/dashboard/trabajos"
              className="group px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 flex items-center space-x-2"
            >
              <span className="text-lg">📋</span>
              <span>Trabajos</span>
            </Link>
            <Link
              href="/dashboard/empleados"
              className="group px-4 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 flex items-center space-x-2"
            >
              <span className="text-lg">👷</span>
              <span>Empleados</span>
            </Link>
            <Link
              href="/dashboard/gastos"
              className="group px-4 py-3 text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 flex items-center space-x-2"
            >
              <span className="text-lg">💰</span>
              <span>Gastos</span>
            </Link>
            <Link
              href="/dashboard/abonos"
              className="group px-4 py-3 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 flex items-center space-x-2"
            >
              <span className="text-lg">📤</span>
              <span>Abonos</span>
            </Link>
            <Link
              href="/dashboard/tareas"
              className="group px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 flex items-center space-x-2"
            >
              <span className="text-lg">📋</span>
              <span>Tareas</span>
            </Link>
            <Link
              href="/dashboard/reportes"
              className="group px-4 py-3 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all duration-200 flex items-center space-x-2"
            >
              <span className="text-lg">📊</span>
              <span>Reportes</span>
            </Link>
          </div>

          {/* Menú para móvil/tablet - Grid responsivo */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2">
              <Link
                href="/dashboard"
                className="flex flex-col items-center justify-center px-2 py-3 text-xs font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 text-center"
              >
                <span className="text-xl mb-1">🏠</span>
                <span className="leading-tight">Dashboard</span>
              </Link>
              <Link
                href="/dashboard/clientes"
                className="flex flex-col items-center justify-center px-2 py-3 text-xs font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-center"
              >
                <span className="text-xl mb-1">👥</span>
                <span className="leading-tight">Clientes</span>
              </Link>
              <Link
                href="/dashboard/trabajos"
                className="flex flex-col items-center justify-center px-2 py-3 text-xs font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 text-center"
              >
                <span className="text-xl mb-1">📋</span>
                <span className="leading-tight">Trabajos</span>
              </Link>
              <Link
                href="/dashboard/empleados"
                className="flex flex-col items-center justify-center px-2 py-3 text-xs font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 text-center"
              >
                <span className="text-xl mb-1">👷</span>
                <span className="leading-tight">Empleados</span>
              </Link>
              <Link
                href="/dashboard/gastos"
                className="flex flex-col items-center justify-center px-2 py-3 text-xs font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-200 text-center"
              >
                <span className="text-xl mb-1">💰</span>
                <span className="leading-tight">Gastos</span>
              </Link>
              <Link
                href="/dashboard/abonos"
                className="flex flex-col items-center justify-center px-2 py-3 text-xs font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 text-center"
              >
                <span className="text-xl mb-1">📤</span>
                <span className="leading-tight">Abonos</span>
              </Link>
              <Link
                href="/dashboard/tareas"
                className="flex flex-col items-center justify-center px-2 py-3 text-xs font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 text-center"
              >
                <span className="text-xl mb-1">📋</span>
                <span className="leading-tight">Tareas</span>
              </Link>
              <Link
                href="/dashboard/reportes"
                className="flex flex-col items-center justify-center px-2 py-3 text-xs font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-200 text-center"
              >
                <span className="text-xl mb-1">📊</span>
                <span className="leading-tight">Reportes</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
