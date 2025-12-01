import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sword, BookOpen, User, Zap } from 'lucide-react';
import VersionModal from '../../components/common/VersionModal.jsx'; 
import { useContext } from 'react';
import { AuthContext } from '../../components/context/AuthContext.jsx';

// Componente auxiliar local para el icono ChevronRight
const ChevronRight = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);


const LandingPage = () => {
  const navigate = useNavigate();
  const [showVersion, setShowVersion] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const { auth, toggleRole } = useContext(AuthContext);

  const menuOptions = [
    { id: 'calculator', label: 'Calculadora', path: '/app/calculator', icon: <Sword size={24} />, color: 'text-yellow-500', bg: 'bg-yellow-500/10', description: "Calcula el poder de tus personajes y equipos"},
    { id: 'wiki', label: 'Wiki', path: '/app/wiki', icon: <BookOpen size={24} />, color: 'text-blue-400', bg: 'bg-blue-500/10', description: "Consulta información detallada del juego"},
    { id: 'account', label: 'Cuenta', path: '/app/account', icon: <User size={24} />, color: 'text-purple-400', bg: 'bg-purple-500/10', description: "Gestiona tu perfil y preferencias de usuario"},
  ];

  return (
    // FIX CENTRADO: Agregamos 'justify-center items-center w-full min-h-screen'
    <div className="app-wrapper min-h-screen w-full min-h-screen flex flex-col items-center justify-center p-6 relative ">
      
      {/* Fondo Decorativo (Absoluto) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-slate-900/50 z-0"></div>
         <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
         <div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      {/* Contenedor de Contenido: Agregamos 'mx-auto' para asegurar el centro horizontal */}
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center">
        
        {/* Logo y Titulo */}
        <div className="mb-10 flex flex-col items-center animate-fade-in">
          <div className="w-24 h-24 bg-slate-800/80 backdrop-blur-xl rounded-3xl mb-6 flex items-center justify-center border border-slate-700 shadow-2xl shadow-black/50 ring-1 ring-white/10">
             <img src="/logo.png" alt="Logo Genshina" className="w-16 h-18"/>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2 tracking-[0.2em] drop-shadow-sm">Genshina</h1>
          <p className="text-slate-400 text-sm uppercase tracking-[0.3em] font-medium">Calculadora & Wiki</p>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mt-6 opacity-50"></div>
        </div>

        {/* Botones de Navegación */}
        <div className="w-full space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {menuOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => navigate(option.path)}
              className="w-full genshin-card p-4 flex items-center gap-5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-yellow-500/50 transition-all group active:scale-[0.98] backdrop-blur-sm"
            >
              <div className={`w-14 h-14 rounded-2xl ${option.bg} flex items-center justify-center ${option.color} group-hover:scale-110 transition-transform shadow-lg`}>
                {option.icon}
              </div>
              <div className="text-left flex-grow">
                <h3 className="text-white font-bold text-lg leading-tight group-hover:text-yellow-400 transition-colors">{option.label}</h3>
                <p className="text-slate-500 text-xs font-medium mt-0.5">{option.description}</p>
              </div>
              <div className="text-slate-600 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all">
                 <ChevronRight size={20} />
              </div>
            </button>
          ))}
        </div>

        {/* Footer / Versión */}
        <button 
          onClick={() => setShowVersion(true)}
          className="mt-12 text-xs text-slate-600 hover:text-yellow-500 transition-colors py-2 px-4 rounded-full hover:bg-white/5"
        >
          Versión 1.0.2-beta
        </button>

        <button
      onClick={toggleRole}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {auth.esAdmin ? "Cambiar a usuario" : "Cambiar a admin"}
    </button>


      </div>

      {/* Modal de Versión */}
      {showVersion && <VersionModal onClose={() => setShowVersion(false)} />}
    </div>
  );
};

export default LandingPage;