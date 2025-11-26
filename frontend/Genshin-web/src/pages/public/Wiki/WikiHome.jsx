import React from 'react'
import '../../../styles/estilos.css';
import { BookOpen } from 'lucide-react';

export const WikiHome = () => (
  <div className="flex-grow flex items-center justify-center flex-col animate-fade-in p-6">
    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 ring-4 ring-blue-500/5">
      <BookOpen size={40} className="text-blue-400" />
    </div>
    <h2 className="text-xl font-bold text-white mb-2">Wiki en Construcción</h2>
    <p className="text-sm text-slate-400 text-center max-w-xs mb-8">
      Estamos recopilando datos de Irminsul. Pronto podrás consultar todas las estadísticas.
    </p>
    <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
      {['Personajes', 'Armas', 'Artefactos', 'Enemigos'].map((cat, i) => (
        <button key={i} className="text-xs py-3 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:border-slate-500 transition-all">
          {cat}
        </button>
      ))}
    </div>
  </div>
);
