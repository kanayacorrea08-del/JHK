'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simular login (después conectaremos con el backend)
      if (email === 'admin@empresa.com' && password === 'admin123') {
        // Login exitoso
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({
          email: 'admin@empresa.com',
          name: 'Administrador',
          role: 'ADMIN'
        }));
        router.push('/dashboard');
      } else {
        setError('Credenciales incorrectas. Usa: admin@empresa.com / admin123');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 w-full max-w-md overflow-hidden">
          {/* Header del formulario */}
          <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-8 text-white text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏢</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Sistema de Contabilidad</h1>
            <p className="text-emerald-100 text-lg">
              Gestión Integral de Proyectos Educativos
            </p>
          </div>

          {/* Formulario */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <span className="text-emerald-600">📧</span>
                  <span>Correo Electrónico</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="admin@empresa.com"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    📧
                  </div>
                </div>
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-2">
                <label htmlFor="password" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <span className="text-emerald-600">🔒</span>
                  <span>Contraseña</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="••••••••"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔒
                  </div>
                </div>
              </div>

              {/* Mensaje de error */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center space-x-2">
                  <span>⚠️</span>
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Botón de login */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-blue-700 focus:ring-4 focus:ring-emerald-500/30 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Iniciando sesión...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>🔑</span>
                    <span>Iniciar Sesión</span>
                  </div>
                )}
              </button>
            </form>

            {/* Credenciales de prueba */}
            <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-amber-600 text-lg">🔑</span>
                <h3 className="font-semibold text-amber-800">Credenciales de Prueba</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-amber-700 font-medium">Email:</span>
                  <code className="bg-amber-100 px-2 py-1 rounded text-amber-800 font-mono">admin@empresa.com</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-amber-700 font-medium">Password:</span>
                  <code className="bg-amber-100 px-2 py-1 rounded text-amber-800 font-mono">admin123</code>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                © 2025 JHK Educational Services • Sistema de Contabilidad
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
