import React from 'react'
import { useContext } from 'react';
import { User, LogOut, Shield, Star, Sparkles } from 'lucide-react';
import { AuthContext } from '../../../components/context/AuthContext.jsx';

export const UserProfile = ({ user }) => {
    const { auth, login, logout } = useContext(AuthContext);
  return (
    <div className="w-full max-w-2xl space-y-6 animate-fade-in">
      
      {/* Tarjeta de Identidad (Namecard) */}
      <div className="w-full bg-gradient-to-r from-purple-900 via-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full -mr-16 -mt-16"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full border-4 border-slate-800 shadow-xl overflow-hidden bg-slate-700 shrink-0">
             {/* Placeholder para avatar */}
             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-600">
                <User size={40} className="text-yellow-900" />
             </div>
          </div>
          
          {/* Info */}
          <div className="text-center sm:text-left flex-grow">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <h2 className="text-2xl font-bold text-white">{user.username}</h2>
              <span className="bg-yellow-500/20 text-yellow-500 text-[10Dpx] font-bold px-2 py-0.5 rounded-full border border-yellow-500/30">
                AR 60
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-4">UID: 800000001</p>
            
            {/* Stats Rápidas */}
            <div className="flex gap-4 justify-center sm:justify-start">
              <div className="bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700/50 flex items-center gap-2">
                 <Shield size={14} className="text-blue-400"/>
                 <span className="text-xs font-bold text-slate-200">12 Personajes</span>
              </div>
              <div className="bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700/50 flex items-center gap-2">
                 <Star size={14} className="text-yellow-400"/>
                 <span className="text-xs font-bold text-slate-200">8 equipos</span>
              </div>
            </div>
          </div>

          {/* Botón Logout */}
          <button 
            onClick={logout}
            className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Sección de Opciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button className="genshin-card p-4 flex items-center gap-4 bg-slate-800/40 hover:bg-slate-800 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
               <Sparkles size={24} />
            </div>
            <div className="text-left">
               <h4 className="text-white font-bold">Mis Deseos</h4>
               <p className="text-slate-500 text-xs">Historial de Gachapón</p>
            </div>
        </button>
        {/* Más opciones aquí... */}
      </div>

    </div>
  );
};
