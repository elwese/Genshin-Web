import React, { useState } from 'react';
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
import './styles/estilos.css';
import {Home} from './pages/public/Home';
import {AdminPanel} from './pages/admin/AdminPanel';
import Navbar from './components/layout/Navbar';
import AccessDenied from './components/common/AccessDenied';
import {WikiHome} from './pages/public/Wiki/WikiHome';
import {CalculatorHome} from './pages/public/Calculator/CalculatorHome';







const App = () => {
  const [currentView, setView] = useState('home');
  const [userRole, setUserRole] = useState('guest'); 

  const toggleRole = () => {
    setUserRole(prev => prev === 'admin' ? 'guest' : 'admin');
    if (currentView === 'admin' && userRole === 'admin') {
      setView('home');
    }
  };

  const renderView = () => {
    switch(currentView) {
      case 'home': 
        return <Home setView={setView} userRole={userRole} toggleRole={toggleRole} />;
      case 'admin': 
        return userRole === 'admin' ? <AdminPanel /> : <AccessDenied setView={setView} />;
      case 'wiki': 
        return <WikiHome />;
      case 'calculator': 
        return <CalculatorHome />;
      default: 
        return <Home setView={setView} userRole={userRole} toggleRole={toggleRole} />;
    }
  };

  return (
    <div className="app-wrapper font-sans antialiased selection:bg-yellow-500/30">
      {/* Contenido Principal */}
      <main className="flex-grow flex flex-col">
        {renderView()}
      </main>
      
      {/* Barra de Navegación */}
      <Navbar setView={setView} currentView={currentView} userRole={userRole} />
    </div>
  );
};

export default App;