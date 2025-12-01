import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Trash2, 
  Sword, 
  Zap, 
  Shield, 
  User
} from 'lucide-react';

// --- COMPONENTE TARJETA DE PERSONAJE ---
const CharacterCard = ({ build, onDelete }) => {
  const elementColors = {
    hydro: 'from-blue-900 to-blue-600',
    pyro: 'from-red-900 to-red-600',
    electro: 'from-purple-900 to-purple-600',
    geo: 'from-yellow-900 to-yellow-600',
    dendro: 'from-green-900 to-green-600',
    anemo: 'from-teal-900 to-teal-600',
    cryo: 'from-cyan-900 to-cyan-600',
  };

  const bgGradient = elementColors[build.character.element] || 'from-slate-800 to-slate-900';

  return (
    <div className="relative group overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
      {/* Fondo con Imagen y Gradiente */}
      <div className="absolute inset-0 z-0">
         <img 
           src={build.character.img} 
           alt={build.character.name} 
           className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
         />
         <div className={`absolute inset-0 bg-gradient-to-t ${bgGradient} mix-blend-multiply opacity-90`}></div>
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 p-4 h-full flex flex-col justify-end min-h-[180px]">
         
         {/* Top Info */}
         <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-bold text-white border border-white/10">
               Lv. {build.character.level}
            </span>
            <span className="bg-yellow-500 text-black px-2 py-0.5 rounded-lg text-[10px] font-bold">
               C{build.character.constellation}
            </span>
         </div>

         {/* Botón Eliminar */}
         <button 
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="absolute top-3 right-3 p-2 bg-red-500/20 text-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
         >
            <Trash2 size={16} />
         </button>

         {/* Info Principal */}
         <div>
            <h3 className="text-xl font-bold text-white mb-1 leading-none">{build.character.name}</h3>
            
            <div className="flex items-center gap-3 mt-3 text-xs text-slate-300 bg-black/30 p-2 rounded-xl backdrop-blur-sm border border-white/5">
                <div className="flex items-center gap-1.5">
                   <Sword size={12} className="text-yellow-500" />
                   <span className="truncate max-w-[80px]">{build.weapon.name}</span>
                </div>
                <div className="h-3 w-px bg-slate-600"></div>
                <div className="flex items-center gap-1.5">
                   <Shield size={12} className="text-blue-400" />
                   <span>{Object.values(build.artifacts).filter(a => a.set).length}/5</span>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export const CalculatorCharacterHub = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [builds, setBuilds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Ref para evitar doble procesamiento en StrictMode
  const processedRef = useRef(false);

  useEffect(() => {
    // 1. Cargar Builds Existentes
    const storedBuilds = JSON.parse(localStorage.getItem('genshin_builds') || '[]');
    let currentList = storedBuilds;

    // 2. Verificar si hay un nuevo personaje llegando desde Navigation State
    const incomingBuild = location.state?.createdCharacter;

    if (incomingBuild && !processedRef.current) {
       // Verificamos si este ID ya existe para evitar duplicados
       const exists = currentList.some(b => b.id === incomingBuild.id);
       
       if (!exists) {
           currentList = [incomingBuild, ...currentList];
           localStorage.setItem('genshin_builds', JSON.stringify(currentList));
           
           // Limpiamos el estado de navegación
           window.history.replaceState({}, document.title);
       }
       processedRef.current = true;
    }

    setBuilds(currentList);
  }, [location.state]); // Dependencia clave

  const handleDelete = (id) => {
    if(window.confirm("¿Estás seguro de eliminar esta build?")) {
        const updated = builds.filter(b => b.id !== id);
        setBuilds(updated);
        localStorage.setItem('genshin_builds', JSON.stringify(updated));
    }
  };

  const filteredBuilds = builds.filter(b => 
    b.character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full pb-24 p-6 animate-fade-in w-full max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
           <h1 className="text-3xl font-bold text-white mb-1">Mis Personajes</h1>
           <p className="text-slate-400 text-sm">Gestiona y optimiza tus builds de Teyvat</p>
        </div>
        
        <button 
          onClick={() => navigate('/app/calculator/character-builder')}
          className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-yellow-900/20 active:scale-95"
        >
           <Plus size={20} />
           <span>Nuevo Personaje</span>
        </button>
      </div>

      {/* Barra de Búsqueda */}
      <div className="relative mb-8">
         <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
         <input 
            type="text" 
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-yellow-500 focus:outline-none focus:bg-slate-800 transition-all"
         />
      </div>

      {/* Grid */}
      {builds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredBuilds.map((build) => (
                <CharacterCard 
                   key={build.id} 
                   build={build} 
                   onDelete={() => handleDelete(build.id)} 
                />
             ))}
          </div>
      ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-80">
             <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 relative">
                <User size={48} className="text-slate-600" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white">
                   <Plus size={16} />
                </div>
             </div>
             <h3 className="text-xl font-bold text-white mb-2">No tienes personajes aún</h3>
             <p className="text-slate-400 max-w-xs mb-8">
               Comienza agregando tu primer personaje.
             </p>
          </div>
      )}
    </div>
  );
};

export default CalculatorCharacterHub;