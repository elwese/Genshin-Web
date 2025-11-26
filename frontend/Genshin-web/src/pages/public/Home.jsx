import React from 'react'
import '../../styles/estilos.css';
import { Sword, BookOpen, ChevronRight, User, Lock, Zap ,Search} from 'lucide-react';

export const Home = ({ setView, userRole, toggleRole }) => {
  return (
    <div className="flex-grow pb-28 px-6 pt-12 max-w-md mx-auto w-full animate-fade-in">
      {/* Header */}
      <div className="mb-12 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-500/20 blur-3xl rounded-full -z-10"></div>
        <h1 className="text-5xl font-bold mb-2 tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-white via-yellow-100 to-yellow-600 drop-shadow-sm">
          TEYVAT
        </h1>
        <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px] font-bold mb-6">
          Calculator & Wiki Project
        </p>

        <button 
          onClick={toggleRole}
          className={`text-xs px-4 py-1.5 rounded-full border flex items-center gap-2 mx-auto transition-all ${
            userRole === 'admin' 
              ? 'bg-green-500/10 border-green-500/30 text-green-400' 
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
          }`}
        >
          {userRole === 'admin' ? <Lock size={12} /> : <User size={12}/>}
          <span>{userRole === 'admin' ? 'MODO ARCONTE' : 'MODO VIAJERO'}</span>
        </button>
      </div>

      {/* Grid de Tarjetas Principales */}
      <div className="grid gap-5">
        
        {/* Card Calculadora */}
        <div 
          onClick={() => setView('calculator')}
          className="genshin-card group cursor-pointer p-0"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-15 transition-opacity duration-500">
            <Sword size={120} />
          </div>
          
          <div className="p-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center mb-4 shadow-lg shadow-yellow-900/20 text-white">
              <Sword size={24} />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-1">Calculadora</h2>
            <p className="text-sm text-slate-400 mb-6 line-clamp-2">
              Optimiza tus artefactos y maximiza el daño de tu equipo.
            </p>
            
            <div className="flex items-center text-yellow-500 text-xs font-bold uppercase tracking-wider group-hover:gap-2 transition-all duration-300">
              Comenzar Build <ChevronRight size={14} className="ml-1" />
            </div>
          </div>
          
          {/* Barra de progreso decorativa */}
          <div className="h-1 w-full bg-slate-800 absolute bottom-0">
            <div className="h-full bg-yellow-500 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
          </div>
        </div>

        {/* Card Wiki */}
        <div 
          onClick={() => setView('wiki')}
          className="genshin-card group cursor-pointer p-0"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-15 transition-opacity duration-500">
            <BookOpen size={120} />
          </div>
          
          <div className="p-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-900/20 text-white">
              <Search size={24} />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-1">Wiki de Teyvat</h2>
            <p className="text-sm text-slate-400 mb-6 line-clamp-2">
              Base de datos completa de personajes, armas y enemigos.
            </p>
            
            <div className="flex items-center text-blue-400 text-xs font-bold uppercase tracking-wider group-hover:gap-2 transition-all duration-300">
              Explorar Datos <ChevronRight size={14} className="ml-1" />
            </div>
          </div>

           <div className="h-1 w-full bg-slate-800 absolute bottom-0">
            <div className="h-full bg-blue-500 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
          </div>
        </div>

      </div>

      {/* Sección Novedades */}
      <div className="mt-10">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 pl-1">
          Actualizaciones
        </h3>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4 bg-slate-800/40 p-3 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-default">
              <div className="w-10 h-10 bg-slate-700 rounded-lg shrink-0 flex items-center justify-center">
                 <Zap size={18} className={i === 1 ? "text-yellow-500" : "text-purple-400"} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">Parche 5.0 Lanzado</p>
                <p className="text-xs text-slate-500">Nuevos personajes de Natlan agregados.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};