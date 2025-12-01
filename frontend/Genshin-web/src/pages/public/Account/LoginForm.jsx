import React from 'react'
import { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../../components/context/AuthContext.jsx';


export const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { auth, login } = useContext(AuthContext);
  
  // Estados del formulario
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
        username: formData.username, 
        role: "user",

    };

    if (formData.username === '') {
        user.username = "Viajero";
        }
    
    login(user);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
        username: username,
        role: "user",

    };
    login(user);
  };

  return (
    <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[60px] rounded-full"></div>
      
      {/* Encabezado */}
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-2xl font-bold text-white mb-2">
          {isLogin ? 'Bienvenido de nuevo' : 'Únete a la Aventura'}
        </h2>
        <p className="text-slate-400 text-sm">
          {isLogin ? 'Conecta tu visión para continuar' : 'Registra tu progreso en Irminsul'}
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleLogin} className="space-y-4 relative z-10">
        {!isLogin && (
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Usuario</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Nombre de Viajero"
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-yellow-500 transition-colors"
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Correo</label>
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="email" 
              placeholder="ejemplo@celestia.com"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-yellow-500 transition-colors"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Contraseña</label>
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-11 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-yellow-500 transition-colors"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-yellow-900/20 transition-all active:scale-[0.98] mt-4"
        >
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </button>
      </form>

      {/* Switcher Login/Register */}
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-400">
          {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-500 hover:text-yellow-400 font-bold transition-colors"
          >
            {isLogin ? 'Regístrate aquí' : 'Inicia Sesión'}
          </button>
        </p>
      </div>
    </div>
  );
};
