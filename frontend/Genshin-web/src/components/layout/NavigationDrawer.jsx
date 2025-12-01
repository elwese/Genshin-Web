import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sword, BookOpen, User, X, Zap, Settings } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const NavigationDrawer = ({ isOpen, onClose, userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useContext(AuthContext);

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const menuItems = [
    { id: 'calculator', label: 'Calculadora', path: '/app/calculator', icon: <Sword size={20} /> },
    { id: 'wiki', label: 'Wiki', path: '/app/wiki', icon: <BookOpen size={20} /> },
    { id: 'admin', label: 'Admin Panel', path: '/app/admin', icon: <Settings size={20} />, roleRequired: 'admin' },
  ];

  return (
    <>
      {/* Overlay Oscuro (Fondo) */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Panel Lateral */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-slate-900 border-r border-slate-800 z-[60] transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header del Drawer */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
                    <img src="/logo.png" alt="Logo Genshina" className="w-16 h-18"/>
                </div>
                <h2 className="font-bold text-xl text-white tracking-widest">Genshina</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
                <X size={24} />
            </button>
        </div>

        {/* Links de Navegación */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
                 if (item.roleRequired=='admin' && !auth.esAdmin) return null;

                 const isActive = location.pathname.startsWith(item.path);
                 return (
                    <button
                        key={item.id}
                        onClick={() => handleNavigate(item.path)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                            isActive 
                                ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-900/20' 
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                    </button>
                 );
            })}
        </nav>

        {/* Footer del Drawer: Cuenta */}
        <div className="p-4 border-t border-slate-800">
            <button 
                onClick={() => handleNavigate('/app/account')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    location.pathname === '/app/account'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-slate-700 hover:border-slate-500'
                }`}
            >
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                    <User size={20} className="text-slate-300" />
                    {/* Aquí iría la <img src={avatar} /> si la tuvieras */}
                </div>
                <div className="text-left overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">
                        {auth.userData?.username || 'Invitado'}
                    </p>
                    <p className="text-xs text-slate-500 truncate">Ver perfil de cuenta</p>
                </div>
            </button>
        </div>
      </div>
    </>
  );
};

export default NavigationDrawer;