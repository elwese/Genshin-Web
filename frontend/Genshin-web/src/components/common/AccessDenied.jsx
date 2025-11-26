import React from 'react'
import '../../styles/estilos.css';

export const AccessDenied = ({ setView }) => (
  <div className="flex-grow flex items-center justify-center flex-col p-8 text-center animate-fade-in">
    <div className="bg-red-500/10 p-6 rounded-full mb-6 border border-red-500/20">
      <Shield size={48} className="text-red-500" />
    </div>
    <h2 className="text-2xl font-bold text-white mb-2">Acceso Restringido</h2>
    <p className="text-sm text-slate-400 max-w-xs mx-auto">
      Esta zona está protegida por los caballeros de Favonius. Necesitas permisos de administrador.
    </p>
    <button 
      onClick={() => setView('home')}
      className="mt-8 px-8 py-3 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white rounded-full text-sm font-bold transition-all"
    >
      Regresar a Mondstadt
    </button>
  </div>
);
export default AccessDenied;
