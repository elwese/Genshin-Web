
import { 
  Sword, 
  BookOpen, 
  Settings, 
  User, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Shield, 
  Zap,
  Menu,
  ChevronRight,
  LogOut,
  Lock
} from 'lucide-react';
// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './styles/estilos.css'; 

// Importación de Componentes
import TopBar from './components/layout/TopBar.jsx';
import NavigationDrawer from './components/layout/NavigationDrawer.jsx';
import LandingPage from './pages/public/LandingPage.jsx';
import { WikiHome } from './pages/public/Wiki/WikiHome.jsx';
import { CalculatorHome } from './pages/public/Calculator/CalculatorHome.jsx';
import { AdminPanel } from './pages/admin/AdminPanel.jsx';
import AccessDenied from './components/common/AccessDenied.jsx';
import { AccountHome } from './pages/public/Account/AccountHome.jsx';
import { AuthProvider } from './components/context/AuthContext.jsx';
import { CalculatorCharacterMain } from './pages/public/Calculator/Character/CalculatorCharacterMain.jsx';
import { CalculatorTeamMain } from './pages/public/Calculator/Team/CalculatorTeamMain.jsx';

// Placeholder para la vista de Cuenta


// --- Layout Principal (Con Menu y Topbar) ---
// Este layout envuelve todas las páginas funcionales (Wiki, Calc, Admin)
const MainLayout = ({ userRole }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="app-wrapper font-sans antialiased selection:bg-yellow-500/30 pt-16"> {/* pt-16 para compensar TopBar fixed */}
      
      {/* Barra Superior */}
      <TopBar onMenuClick={() => setDrawerOpen(true)} />

      {/* Menú Desplegable */}
      <NavigationDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        userRole={userRole}
      />

      {/* Contenido de la Ruta Hija (Wiki, Calc, etc.) */}
      <main className="flex-grow flex flex-col min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
    </div>
  );
};

// --- Componente Principal ---
const App = () => {
  // Estado global simulado (en producción usarías Context)
  const [userRole, setUserRole] = useState('admin'); // Cambiar a 'guest' para probar permisos

  return (
  
    <BrowserRouter>
      <Routes>
        
        {/* 1. Ruta Landing (Sin Topbar, diseño limpio) */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. Rutas de la Aplicación (Con Topbar y Drawer) */}
        <Route path="/app" element={<MainLayout userRole={userRole} />}>
            {/* Redirección automática si entran a /app pelado */}
            <Route index element={<Navigate to="/app/calculator" replace />} />
            
            {/* Paginas Wiki */}
            <Route path="wiki" element={<WikiHome />} />

            {/* Paginas Calculadora */}
            <Route path="calculator" element={<CalculatorHome />} />
            <Route path="calculator/character-builder" element={<CalculatorCharacterMain />} />
            <Route path="calculator/team-builder" element={<CalculatorTeamMain />} />


            <Route path="account" element={<AccountHome />} />
            
            <Route 
              path="admin" 
              element={userRole === 'admin' ? <AdminPanel /> : <AccessDenied setView={() => {}} />} 
            />
        </Route>

        {/* Fallback para 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>


  );
};

export default App;