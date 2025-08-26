# 🏢 Sistema de Contabilidad - JHK Educational Services

> **Sistema integral de gestión contable para proyectos educativos**  
> Desarrollado con Next.js 14, TypeScript y Tailwind CSS

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

---

## 📋 Tabla de Contenidos

- [🚀 Características](#-características)
- [🛠️ Tecnologías](#️-tecnologías)
- [📱 Capturas de Pantalla](#-capturas-de-pantalla)
- [⚡ Instalación Rápida](#-instalación-rápida)
- [🔧 Configuración](#-configuración)
- [📖 Uso](#-uso)
- [🏗️ Estructura del Proyecto](#️-estructura-del-proyecto)
- [🎨 Componentes](#-componentes)
- [📊 Datos de Prueba](#-datos-de-prueba)
- [🔐 Autenticación](#-autenticación)
- [📱 Responsive Design](#-responsive-design)
- [🧪 Testing](#-testing)
- [📦 Deployment](#-deployment)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)
- [📞 Soporte](#-soporte)

---

## 🚀 Características

### ✨ **Funcionalidades Principales**
- **📊 Dashboard Inteligente** - KPIs en tiempo real y métricas financieras
- **👨‍🏫 Gestión de Clientes** - Sistema completo de profesores y clientes
- **📚 Gestión de Proyectos** - Control de trabajos educativos con estados
- **👥 Gestión de Empleados** - Administración de asesores y personal
- **💰 Control de Gastos** - Categorización y aprobación de gastos
- **📤 Sistema de Abonos** - Registro de pagos con comprobantes
- **📋 Gestión de Tareas** - Asignación y seguimiento de actividades
- **📈 Reportes Avanzados** - Análisis financiero y operativo

### 🎯 **Características Técnicas**
- **🔍 Búsqueda en Tiempo Real** - Con debounce y filtros dinámicos
- **📱 Diseño Responsive** - Optimizado para móviles, tablets y desktop
- **⚡ Performance** - Next.js 14 con Turbopack para desarrollo rápido
- **🎨 UI Moderna** - Gradientes, efectos de cristal y micro-interacciones
- **🔐 Autenticación** - Sistema de login con roles y protección de rutas
- **📊 Componentes Reutilizables** - Arquitectura modular y escalable

---

## 🛠️ Tecnologías

### **Frontend**
- **[Next.js 14](https://nextjs.org/)** - Framework de React con App Router
- **[React 18](https://reactjs.org/)** - Biblioteca de UI con hooks modernos
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS 3.3](https://tailwindcss.com/)** - Framework CSS utility-first

### **Herramientas de Desarrollo**
- **[Turbopack](https://turbo.build/pack)** - Bundler ultra-rápido
- **[ESLint](https://eslint.org/)** - Linting de código
- **[Prettier](https://prettier.io/)** - Formateo de código
- **[Git](https://git-scm.com/)** - Control de versiones

### **Características Avanzadas**
- **Server Components** - Renderizado optimizado en servidor
- **Client Components** - Interactividad en cliente
- **CSS Modules** - Estilos modulares y encapsulados
- **Responsive Design** - Mobile-first approach
- **Accessibility** - Navegación por teclado y screen readers

---

## 📱 Capturas de Pantalla

### 🏠 **Dashboard Principal**
![Dashboard](https://via.placeholder.com/800x400/1F2937/FFFFFF?text=Dashboard+Principal)

### 👨‍🏫 **Gestión de Clientes**
![Clientes](https://via.placeholder.com/800x400/059669/FFFFFF?text=Sistema+de+Clientes)

### 📚 **Gestión de Proyectos**
![Proyectos](https://via.placeholder.com/800x400/2563EB/FFFFFF?text=Sistema+de+Proyectos)

### 🔐 **Login Moderno**
![Login](https://via.placeholder.com/800x400/7C3AED/FFFFFF?text=Login+Moderno)

---

## ⚡ Instalación Rápida

### **Prerrequisitos**
- Node.js 18.17 o superior
- npm 9.0 o superior
- Git

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/tu-usuario/job-accounting-system.git
cd job-accounting-system/web-new
```

### **2. Instalar Dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

### **3. Ejecutar en Desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

### **4. Abrir en el Navegador**
```
http://localhost:3000
```

---

## 🔧 Configuración

### **Variables de Entorno**
Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Configuración de la aplicación
NEXT_PUBLIC_APP_NAME="Sistema de Contabilidad"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# Configuración de la API (para futuras integraciones)
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
NEXT_PUBLIC_API_TIMEOUT="5000"

# Configuración de autenticación
NEXT_PUBLIC_AUTH_ENABLED="true"
NEXT_PUBLIC_SESSION_TIMEOUT="3600000"
```

### **Configuración de Tailwind**
El archivo `tailwind.config.js` ya está configurado con:
- Colores personalizados del sistema
- Breakpoints responsive
- Plugins de animación
- Configuración de fuentes

### **Configuración de TypeScript**
El archivo `tsconfig.json` incluye:
- Configuración estricta de tipos
- Path mapping para imports
- Configuración para Next.js 14
- Soporte para decorators

---

## 📖 Uso

### **🚀 Inicio Rápido**

1. **Acceder al Sistema**
   - Navega a `http://localhost:3000`
   - Usa las credenciales de prueba:
     - **Email**: `admin@empresa.com`
     - **Password**: `admin123`

2. **Explorar el Dashboard**
   - Revisa los KPIs principales
   - Navega por las diferentes secciones
   - Familiarízate con la interfaz

3. **Crear Datos de Prueba**
   - Agrega un nuevo cliente
   - Crea un proyecto
   - Registra un gasto
   - Asigna una tarea

### **📱 Navegación**

- **🏠 Dashboard** - Vista general del sistema
- **👨‍🏫 Clientes** - Gestión de profesores
- **📚 Trabajos** - Gestión de proyectos
- **👥 Empleados** - Gestión de asesores
- **💰 Gastos** - Control de gastos
- **📤 Abonos** - Registro de pagos
- **📋 Tareas** - Gestión de actividades
- **📊 Reportes** - Análisis y estadísticas

### **🔍 Búsqueda y Filtros**

- **Búsqueda en Tiempo Real**: Escribe en cualquier campo de búsqueda
- **Filtros Dinámicos**: Usa los dropdowns para filtrar por estado, categoría, etc.
- **Resultados Instantáneos**: Los filtros se aplican automáticamente

---

## 🏗️ Estructura del Proyecto

```
src/
├── app/                          # App Router de Next.js 14
│   ├── dashboard/                # Dashboard principal
│   │   ├── page.tsx             # Página principal del dashboard
│   │   ├── layout.tsx           # Layout del dashboard con navegación
│   │   ├── clientes/            # Sistema de clientes
│   │   │   └── page.tsx         # Gestión de profesores
│   │   ├── trabajos/            # Sistema de trabajos
│   │   │   └── page.tsx         # Gestión de proyectos
│   │   ├── empleados/           # Sistema de empleados
│   │   │   └── page.tsx         # Gestión de asesores
│   │   ├── gastos/              # Sistema de gastos
│   │   │   └── page.tsx         # Control de gastos
│   │   ├── abonos/              # Sistema de abonos
│   │   │   └── page.tsx         # Registro de pagos
│   │   ├── tareas/              # Sistema de tareas
│   │   │   └── page.tsx         # Gestión de tareas
│   │   └── reportes/            # Sistema de reportes
│   │       └── page.tsx         # Análisis y estadísticas
│   ├── login/                   # Sistema de autenticación
│   │   └── page.tsx             # Página de login
│   ├── layout.tsx               # Layout principal de la aplicación
│   └── globals.css              # Estilos globales
├── components/                   # Componentes reutilizables
│   ├── SearchFilter.tsx         # Componente de búsqueda y filtrado
│   ├── ProfessorSelector.tsx    # Selector de profesores
│   ├── ProjectSelector.tsx      # Selector de proyectos
│   └── WorkerSelector.tsx       # Selector de empleados
├── lib/                         # Utilidades y helpers
│   ├── types.ts                 # Tipos TypeScript
│   ├── utils.ts                 # Funciones utilitarias
│   └── constants.ts             # Constantes del sistema
├── styles/                      # Estilos adicionales
│   └── components.css           # Estilos de componentes específicos
└── public/                      # Archivos estáticos
    ├── images/                  # Imágenes del sistema
    └── icons/                   # Iconos y favicons
```

---

## 🎨 Componentes

### **🔍 SearchFilter**
Componente principal de búsqueda con:
- Búsqueda en tiempo real con debounce
- Filtros dinámicos configurables
- Diseño responsive
- Estados de loading y error

```tsx
<SearchFilter
  placeholder="Buscar por nombre, email..."
  onSearch={setSearchQuery}
  onFilter={setStatusFilter}
  filterOptions={[
    { value: 'ACTIVO', label: '✅ Activo' },
    { value: 'INACTIVO', label: '❌ Inactivo' }
  ]}
  showFilter={true}
/>
```

### **👨‍🏫 ProfessorSelector**
Selector de profesores con:
- Lista desplegable de profesores
- Búsqueda integrada
- Filtrado por estado
- Diseño consistente

### **📚 ProjectSelector**
Selector de proyectos con:
- Filtrado por profesor seleccionado
- Estados del proyecto
- Información de valor y fechas
- Diseño responsive

### **👥 WorkerSelector**
Selector de empleados con:
- Lista de asesores disponibles
- Filtrado por departamento
- Estados laborales
- Información de contacto

---

## 📊 Datos de Prueba

### **👨‍🏫 Profesores (Clientes)**
- **Dr. Carlos Mendoza** - Matemáticas Avanzadas
- **Dra. Ana Rodríguez** - Ciencias de la Computación
- **Prof. Luis González** - Física Cuántica

### **📚 Proyectos (Trabajos)**
- **Plataforma de E-Learning** - $15,000
- **Sistema de Evaluación** - $8,500
- **Laboratorio Virtual** - $12,000

### **👥 Empleados (Asesores)**
- **María López** - Asesoría Académica
- **Juan Pérez** - Innovación Tecnológica
- **Carmen Ruiz** - Investigación
- **Roberto Silva** - Desarrollo de Software

### **💰 Gastos**
- **Software Educativo** - $2,500
- **Infraestructura** - $1,800
- **Capacitación** - $3,200
- **Oficina** - $950

---

## 🔐 Autenticación

### **Credenciales de Prueba**
- **Email**: `admin@empresa.com`
- **Password**: `admin123`

### **Características del Sistema**
- **Persistencia Local**: Usa localStorage para mantener la sesión
- **Protección de Rutas**: Redirección automática si no está autenticado
- **Logout**: Botón de cerrar sesión en el header
- **Estados de Sesión**: Loading, autenticado, no autenticado

### **Seguridad**
- **Validación de Formularios**: Campos requeridos y formatos
- **Sanitización**: Prevención de XSS básica
- **Rate Limiting**: Protección contra ataques de fuerza bruta (futuro)

---

## 📱 Responsive Design

### **Breakpoints Implementados**
- **Mobile First**: Diseño base para móviles
- **sm:** (640px+) - Tablets pequeños
- **md:** (768px+) - Tablets
- **lg:** (1024px+) - Laptops
- **xl:** (1280px+) - Desktop grande

### **Adaptaciones por Dispositivo**
- **Móviles**: Layout vertical, elementos apilados
- **Tablets**: Layout híbrido, elementos adaptativos
- **Desktop**: Layout horizontal, elementos expandidos
- **Touch**: Botones grandes, espaciado generoso

### **Componentes Responsive**
- **Navegación**: Menú que se adapta al dispositivo
- **Formularios**: Campos que se ajustan al ancho
- **Tablas**: Scroll horizontal en móviles
- **Cards**: Grid que se adapta al viewport

---

## 🧪 Testing

### **Configuración Actual**
- **Sin tests implementados** - Listo para implementar
- **Jest** - Framework de testing recomendado
- **Testing Library** - Para tests de componentes
- **Playwright** - Para tests E2E

### **Plan de Testing**
1. **Tests Unitarios** - Componentes individuales
2. **Tests de Integración** - Flujos completos
3. **Tests E2E** - Experiencia del usuario
4. **Tests de Performance** - Lighthouse y Core Web Vitals

---

## 📦 Deployment

### **Build de Producción**
```bash
npm run build
npm start
```

### **Variables de Entorno de Producción**
```env
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_API_URL=https://api.tudominio.com
```

### **Plataformas Recomendadas**
- **Vercel** - Optimizado para Next.js
- **Netlify** - Deployment automático
- **AWS Amplify** - Escalabilidad empresarial
- **Docker** - Contenedores personalizados

---

## 🤝 Contribución

### **Cómo Contribuir**
1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### **Estándares de Código**
- **TypeScript** - Tipado estricto
- **ESLint** - Linting automático
- **Prettier** - Formateo de código
- **Conventional Commits** - Mensajes de commit estandarizados

### **Estructura de Commits**
```
feat: agregar sistema de notificaciones
fix: corregir bug en búsqueda de clientes
docs: actualizar README con nuevas funcionalidades
style: mejorar diseño del dashboard
refactor: optimizar componente SearchFilter
test: agregar tests para sistema de autenticación
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📞 Soporte

### **Canales de Soporte**
- **Issues de GitHub** - Para reportar bugs
- **Discussions** - Para preguntas y discusiones
- **Wiki** - Documentación detallada
- **Email** - soporte@tudominio.com

### **Recursos Adicionales**
- **Documentación** - [docs.tudominio.com](https://docs.tudominio.com)
- **Video Tutoriales** - [YouTube](https://youtube.com/tucanal)
- **Comunidad** - [Discord](https://discord.gg/tuservidor)

### **Roadmap**
- **Q1 2025** - Sistema de autenticación completo
- **Q2 2025** - Backend con NestJS
- **Q3 2025** - Dashboard avanzado con gráficos
- **Q4 2025** - Funcionalidades empresariales

---

## 🙏 Agradecimientos

- **Next.js Team** - Por el increíble framework
- **Tailwind CSS** - Por el sistema de diseño
- **React Community** - Por las librerías y herramientas
- **Contribuidores** - Por sus valiosas contribuciones

---

**⭐ Si este proyecto te es útil, ¡dale una estrella en GitHub!**

---

*Desarrollado con ❤️ por el equipo de JHK Educational Services*
