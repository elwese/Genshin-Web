import React, { useState, useContext } from 'react';
import { 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  LogOut, 
  Sparkles, 
  Shield, 
  Star 
} from 'lucide-react';
// CORRECCIÓN: Ajustamos la ruta para asegurar que encuentre el contexto
import { AuthContext } from '../../../components/context/AuthContext.jsx';
import '../../../styles/estilos.css';
import { useNavigate } from 'react-router-dom';
import {LoginForm} from './LoginForm.jsx';
import {UserProfile} from './UserProfile.jsx';

// --- Sub-componente: Formulario de Login/Registro ---


// --- Sub-componente: Perfil de Usuario (Logueado) ---


// --- Componente Principal ---
export const AccountHome = () => {
  // Consumimos tu AuthContext existente
  const { auth, login, logout } = useContext(AuthContext); // Asumiendo que tu contexto expone login/logout

  // Derivamos si está autenticado basándonos en tu objeto 'auth'
  // Ajusta esta lógica según la estructura real de tu objeto 'auth'


  return (
    <div className="flex-grow flex items-center justify-center p-6 w-full animate-fade-in">
      {auth.isLogged ? (
        <UserProfile user={auth.userData} />
      ) : (
        <LoginForm />
      )}
    </div>
  );
};