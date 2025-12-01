import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

const VersionModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-bold text-white mb-1">Notas de la Versión</h3>
        <p className="text-xs text-yellow-500 mb-4 font-mono">v1.0.2-beta</p>

        <div className="space-y-3">
          <div className="flex gap-3">
            <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-300">Añadida nueva interfaz de navegación con menú lateral.</p>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-300">Base de datos actualizada con personajes de Natlan.</p>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-300">Corrección de errores en la fórmula de daño.</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-6 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 rounded-xl text-sm transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default VersionModal;