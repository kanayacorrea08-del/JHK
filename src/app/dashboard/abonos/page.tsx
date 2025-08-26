'use client';

import { useState } from 'react';
import ProfessorSelector from '../../../components/ProfessorSelector';
import ProjectSelector from '../../../components/ProjectSelector';

// Datos de prueba (después conectaremos con el backend)
const mockPayments = [
  {
    id: 1,
    clientName: 'Prof. María González',
    jobTitle: 'Desarrollo de Curso Online de Matemáticas',
    amount: 5000,
    date: '2025-01-15',
    paymentMethod: 'TRANSFERENCIA',
    receipt: 'receipt_001.jpg',
    status: 'APROBADO',
    notes: 'Primer abono del proyecto de matemáticas avanzadas',
    approvedBy: 'Dr. Carlos López',
    approvedAt: '2025-01-16'
  },
  {
    id: 2,
    clientName: 'Dr. Carlos Rodríguez',
    jobTitle: 'Investigación sobre Metodologías Educativas',
    amount: 3000,
    date: '2025-01-20',
    paymentMethod: 'EFECTIVO',
    receipt: 'receipt_002.jpg',
    status: 'PENDIENTE',
    notes: 'Abono inicial para investigación educativa',
    approvedBy: null,
    approvedAt: null
  },
  {
    id: 3,
    clientName: 'Lic. Ana Martínez',
    jobTitle: 'Sistema de Evaluación Digital',
    amount: 8000,
    date: '2025-01-25',
    paymentMethod: 'CHEQUE',
    receipt: 'receipt_003.jpg',
    status: 'APROBADO',
    notes: 'Pago final del proyecto de evaluación',
    approvedBy: 'Dr. Carlos López',
    approvedAt: '2025-01-26'
  }
];

const paymentMethodLabels = {
  TRANSFERENCIA: '🏦 Transferencia Bancaria',
  EFECTIVO: '💵 Efectivo',
  CHEQUE: '📄 Cheque',
  TARJETA: '💳 Tarjeta de Crédito/Débito',
  PAYPAL: '🔗 PayPal',
  CRYPTO: '₿ Criptomonedas'
};

const statusColors = {
  PENDIENTE: 'bg-amber-100 text-amber-800 border-amber-200',
  APROBADO: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  RECHAZADO: 'bg-red-100 text-red-800 border-red-200',
  REEMBOLSADO: 'bg-blue-100 text-blue-800 border-blue-200'
};

export default function AbonosPage() {
  const [payments, setPayments] = useState(mockPayments);
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    paymentMethod: 'TRANSFERENCIA',
    notes: ''
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Por favor selecciona una imagen del recibo');
      return;
    }
    
    if (!selectedProfessor) {
      alert('Por favor selecciona un profesor');
      return;
    }
    
    if (!selectedProject) {
      alert('Por favor selecciona un proyecto');
      return;
    }
    
    // Agregar nuevo abono (después conectaremos con el backend)
    const newPayment = {
      id: payments.length + 1,
      clientName: selectedProfessor.name,
      jobTitle: selectedProject.title,
      amount: parseFloat(formData.amount),
      date: formData.date,
      paymentMethod: formData.paymentMethod,
      receipt: selectedFile.name,
      status: 'PENDIENTE',
      notes: formData.notes,
      approvedBy: null,
      approvedAt: null
    };
    
    setPayments([...payments, newPayment]);
    setFormData({ amount: '', date: '', paymentMethod: 'TRANSFERENCIA', notes: '' });
    setSelectedProfessor(null);
    setSelectedProject(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);
  const approvedPayments = payments.filter(p => p.status === 'APROBADO').reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status === 'PENDIENTE').reduce((sum, p) => sum + p.amount, 0);
  const totalCount = payments.length;

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header mejorado con colores JHK */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">💰 Sistema de Abonos</h1>
            <p className="text-emerald-100 text-base sm:text-lg">Registra pagos de profesores con comprobantes de imagen</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto bg-white text-emerald-600 px-4 sm:px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {showForm ? '❌ Cancelar' : '➕ Nuevo Abono'}
          </button>
        </div>
      </div>

      {/* Formulario de creación mejorado */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-600 px-4 sm:px-6 py-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white">📝 Nuevo Abono</h3>
            <p className="text-emerald-100 text-sm sm:text-base">Registra un nuevo pago con imagen del comprobante</p>
          </div>
                      <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-emerald-600">👨‍🏫</span> Profesor
                </label>
                <ProfessorSelector
                  selectedProfessor={selectedProfessor}
                  onProfessorSelect={setSelectedProfessor}
                  placeholder="Selecciona un profesor..."
                />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-emerald-600">📚</span> Proyecto
                </label>
                <ProjectSelector
                  selectedProject={selectedProject}
                  onProjectSelect={setSelectedProject}
                  professorId={selectedProfessor?.id || null}
                  placeholder="Selecciona un proyecto..."
                  disabled={!selectedProfessor}
                />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-emerald-600">💰</span> Monto del Abono ($)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-base sm:text-lg"
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-emerald-600">📅</span> Fecha del Pago
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-base sm:text-lg"
                  required
                />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-emerald-600">💳</span> Método de Pago
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-base sm:text-lg"
                  required
                >
                  <option value="TRANSFERENCIA">🏦 Transferencia Bancaria</option>
                  <option value="EFECTIVO">💵 Efectivo</option>
                  <option value="CHEQUE">📄 Cheque</option>
                  <option value="TARJETA">💳 Tarjeta de Crédito/Débito</option>
                  <option value="PAYPAL">🔗 PayPal</option>
                  <option value="CRYPTO">₿ Criptomonedas</option>
                </select>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-emerald-600">📝</span> Notas Adicionales
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-base sm:text-lg"
                  placeholder="Observaciones sobre el pago..."
                />
              </div>
            </div>

            {/* Upload de imagen */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="text-emerald-600">📷</span> Imagen del Comprobante
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="receipt-upload"
                  required
                />
                <label htmlFor="receipt-upload" className="cursor-pointer">
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img 
                        src={previewUrl} 
                        alt="Preview del recibo" 
                        className="mx-auto max-h-48 rounded-lg shadow-lg"
                      />
                      <p className="text-emerald-600 font-medium">✅ Imagen seleccionada: {selectedFile?.name}</p>
                      <p className="text-sm text-gray-500">Haz clic para cambiar la imagen</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl text-gray-400">📷</div>
                      <div className="text-lg font-medium text-gray-700">
                        Haz clic para seleccionar una imagen
                      </div>
                      <div className="text-sm text-gray-500">
                        PNG, JPG, JPEG hasta 5MB
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setSelectedFile(null);
                  setPreviewUrl(null);
                  setSelectedProfessor(null);
                  setSelectedProject(null);
                }}
                className="px-6 py-3 text-gray-600 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
              >
                ❌ Cancelar
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                ✨ Registrar Abono
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
              <div className="text-3xl font-bold">{totalCount}</div>
              <div className="text-emerald-100">Total de Abonos</div>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">${totalPayments.toLocaleString()}</div>
              <div className="text-blue-100">Monto Total</div>
            </div>
            <div className="text-4xl">💵</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">${pendingPayments.toLocaleString()}</div>
              <div className="text-amber-100">Pendientes</div>
            </div>
            <div className="text-4xl">⏰</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">${approvedPayments.toLocaleString()}</div>
              <div className="text-purple-100">Aprobados</div>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
      </div>

      {/* Lista de abonos mejorada */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 px-8 py-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">📋 Lista de Abonos</h3>
          <p className="text-gray-600 mt-1">Gestiona todos los pagos y comprobantes de profesores</p>
        </div>
        <div className="divide-y divide-gray-100">
          {payments.map((payment) => (
            <div key={payment.id} className="p-8 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 transition-all duration-300">
              <div className="flex items-start space-x-6">
                {/* Información principal */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <h4 className="text-2xl font-bold text-gray-900">
                      Abono de ${payment.amount.toLocaleString()}
                    </h4>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${statusColors[payment.status as keyof typeof statusColors]}`}>
                      {payment.status === 'PENDIENTE' ? '⏰ Pendiente' : 
                       payment.status === 'APROBADO' ? '✅ Aprobado' : 
                       payment.status === 'RECHAZADO' ? '❌ Rechazado' : '💳 Reembolsado'}
                    </span>
                    <span className="px-3 py-1 text-sm font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full">
                      {paymentMethodLabels[payment.paymentMethod as keyof typeof paymentMethodLabels]}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">👨‍🏫</span>
                      <span className="text-gray-700 font-medium">{payment.clientName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">📚</span>
                      <span className="text-gray-700 font-medium">{payment.jobTitle}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">📅</span>
                      <span className="text-gray-700 font-medium">{payment.date}</span>
                    </div>
                    {payment.approvedBy && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">👤</span>
                        <span className="text-gray-700 font-medium">Aprobado por: {payment.approvedBy}</span>
                      </div>
                    )}
                    {payment.approvedAt && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">✅</span>
                        <span className="text-gray-700 font-medium">Aprobado: {payment.approvedAt}</span>
                      </div>
                    )}
                  </div>
                  
                  {payment.notes && (
                    <div className="mb-4">
                      <p className="text-gray-600">
                        <span className="font-medium">📝 Notas:</span> {payment.notes}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Imagen del recibo */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center text-4xl text-white shadow-lg overflow-hidden">
                    {payment.receipt.endsWith('.jpg') || payment.receipt.endsWith('.png') ? (
                      <img 
                        src={`/api/receipts/${payment.receipt}`} 
                        alt="Recibo" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling!.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="text-4xl" style={{ display: payment.receipt.endsWith('.jpg') || payment.receipt.endsWith('.png') ? 'none' : 'flex' }}>
                      📄
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-sm text-gray-500">{payment.receipt}</span>
                  </div>
                </div>
                
                {/* Botones de acción */}
                <div className="flex flex-col space-y-3">
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    ✏️ Editar
                  </button>
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    👁️ Ver Recibo
                  </button>
                  {payment.status === 'PENDIENTE' && (
                    <button className="px-4 py-2 text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1">
                      ✅ Aprobar
                    </button>
                  )}
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
