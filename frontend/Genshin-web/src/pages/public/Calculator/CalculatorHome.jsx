import React from 'react';
import '../../../styles/estilos.css';
import { Sword,Plus,Users,Zap,Lock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const CalculatorHome = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);




  
  
  return(

  <div className="flex-grow p-6 animate-fade-in flex flex-col items-center">
      <div className="w-full max-w-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 p-6 rounded-3xl mb-8 flex items-center justify-center gap-6 shadow-xl relative overflow-hidden">
        <div className="relative w-20 h-20 shrink-0">
          <div className="w-full h-full bg-slate-700 rounded-2xl flex items-center justify-center border border-slate-600">
             <img src="/logo.png" alt="Logo Genshina" className="w-16 h-18"/>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600 italic tracking-wider">
            Calduladora Irminsul
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-white tracking-widest">3000</span>
            <span className="bg-yellow-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Ver. 1.0
            </span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl grid gap-8">
        <div className="space-y-4">
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-2 border-l-2 border-yellow-500">
            Zona de Creación
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/app/calculator/character-builder')}
              className="genshin-card p-6 flex flex-col items-center justify-center gap-3 hover:bg-slate-800/80 group active:scale-95 transition-all cursor-pointer bg-slate-800"
            >
              <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus size={28} className="text-yellow-500" />
              </div>
              <div className="text-center">
                <h4 className="text-white font-bold text-lg">Crear Personaje</h4>
                <p className="text-slate-500 text-xs mt-1">Nueva build individual</p>
              </div>
            </button>

            <button 
              onClick={() => navigate('/app/calculator/team-builder')}
              className="genshin-card p-6 flex flex-col items-center justify-center gap-3 hover:bg-slate-800/80 group active:scale-95 transition-all cursor-pointer bg-slate-800"
            >
              <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users size={28} className="text-green-500" />
              </div>
              <div className="text-center">
                <h4 className="text-white font-bold text-lg">Crear Equipo</h4>
                <p className="text-slate-500 text-xs mt-1">Sinergia de 4 personajes</p>
              </div>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-2 border-l-2 border-purple-500">
            Archivos Guardados
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => setShowLoginModal(true)}
              className="genshin-card p-4 flex items-center gap-4 bg-slate-800/50 hover:bg-slate-800 border-dashed border-slate-700 hover:border-solid hover:border-purple-500/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 group-hover:text-purple-400">
                <Sword size={20} />
              </div>
              <div className="text-left">
                <h4 className="text-slate-200 font-bold text-sm">Personajes Guardados</h4>
                <p className="text-slate-500 text-[10px]">Requiere inicio de sesión</p>
              </div>
              <Lock size={16} className="ml-auto text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-800 border border-slate-600 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Acceso a Irminsul</h3>
              <p className="text-sm text-slate-400 mb-6">Necesitas iniciar sesión.</p>
              <button 
                onClick={() => navigate('/app/account')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                Ir a Cuenta / Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
)
};