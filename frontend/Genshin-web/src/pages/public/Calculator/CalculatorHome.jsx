import React from 'react';
import '../../../styles/estilos.css';
import { Sword } from 'lucide-react';

export const CalculatorHome = () => (
  <div className="flex-grow flex items-center justify-center flex-col animate-fade-in p-6 relative overflow-hidden">
    {/* Fondo decorativo */}
    <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/10 to-transparent pointer-events-none"></div>
    
    <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-yellow-900/30 transform rotate-3">
      <Sword size={48} className="text-white drop-shadow-md" />
    </div>
    
    <h2 className="text-2xl font-bold text-white mb-2">Bienvenido, Viajero</h2>
    <p className="text-sm text-slate-400 text-center max-w-xs mb-8 leading-relaxed">
      Inicia sesión para guardar tus builds, calcular daño crítico y compartir tus equipos con la comunidad.
    </p>
    
    <div className="flex flex-col gap-3 w-full max-w-xs z-10">
      <button className="btn-primary py-3.5 px-6 rounded-xl w-full text-sm tracking-wide shadow-lg hover:shadow-yellow-500/20">
        Iniciar Sesión
      </button>
      <button className="py-3.5 px-6 rounded-xl w-full text-sm font-semibold text-slate-300 border border-slate-700 hover:bg-slate-800 transition-colors">
        Registrarse
      </button>
    </div>
  </div>
);