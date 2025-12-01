import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Search, Zap } from 'lucide-react';

const TopBar = ({ onMenuClick }) => {
  const location = useLocation();
  const isWiki = location.pathname.includes('/wiki');

  return (
    <header className="fixed top-0 w-full z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 h-16 px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Botón Hamburguesa */}
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Título de la App (Visible siempre, o se oculta en móviles muy pequeños si la búsqueda está activa) */}
        <div className={`flex items-center gap-2 ${isWiki ? 'hidden sm:flex' : 'flex'}`}>
            <img src="/logo.png" alt="Logo Genshina" className="w-16 h-18"/>
            <span className="font-bold text-lg tracking-wider text-slate-100">Genshina</span>
        </div>
      </div>

      {/* Barra de Búsqueda (Solo Wiki) */}
      {isWiki && (
        <div className="flex-1 max-w-[200px] ml-4 relative animate-fade-in">
            <input 
                type="text" 
                placeholder="Buscar..." 
                className="w-full bg-slate-800 border border-slate-700 rounded-full py-1.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      )}
    </header>
  );
};

export default TopBar;