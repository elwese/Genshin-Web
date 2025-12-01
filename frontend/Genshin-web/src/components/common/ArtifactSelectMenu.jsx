import React, { useState, useEffect } from 'react';
import { X, Search, Check } from 'lucide-react';

// Mock de Sets de Artefactos
const MOCK_ARTIFACT_SETS = [
  { id: 1, name: 'Gladiador', baseImg: 'https://placehold.co/150x150/5b21b6/ffffff?text=Gladiador' },
  { id: 2, name: 'Orquesta del Errante', baseImg: 'https://placehold.co/150x150/9d174d/ffffff?text=Orquesta' },
  { id: 3, name: 'Bruja Carmesí', baseImg: 'https://placehold.co/150x150/991b1b/ffffff?text=Bruja' },
  { id: 4, name: 'Nómada del Invierno', baseImg: 'https://placehold.co/150x150/1e40af/ffffff?text=Nomada' },
  { id: 5, name: 'Sombra Verde Esmeralda', baseImg: 'https://placehold.co/150x150/065f46/ffffff?text=Sombra' },
  { id: 6, name: 'Ritual de la Nobleza', baseImg: 'https://placehold.co/150x150/ea580c/ffffff?text=Nobleza' },
];

export const ArtifactSelectMenu = ({ isOpen, onClose, onSelect, artifactType }) => {
  const [search, setSearch] = useState('');
  const [selectedSet, setSelectedSet] = useState(null);

  // Reiniciar selección al abrir
  useEffect(() => {
    if (isOpen) {
        setSearch('');
        setSelectedSet(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredSets = MOCK_ARTIFACT_SETS.filter(set => 
    set.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    if (selectedSet) {
      onSelect(selectedSet);
      onClose();
    }
  };

  // Diccionario para mostrar el tipo en español en el título
  const typeLabels = {
    flower: 'Flor de la Vida',
    plume: 'Pluma de la Muerte',
    sands: 'Arenas del Eón',
    goblet: 'Cáliz de Eonothem',
    circlet: 'Tiara de Logos'
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl h-[80vh] rounded-3xl flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-md">
          <div>
            <h3 className="text-xl font-bold text-white">Selección de Artefacto</h3>
            <p className="text-yellow-500 text-sm font-medium uppercase tracking-wider">
              {typeLabels[artifactType] || 'Artefacto'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/30">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar set de artefactos..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-yellow-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Grid de Tarjetas (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredSets.map((set) => {
              const isSelected = selectedSet?.id === set.id;
              return (
                <div 
                  key={set.id}
                  onClick={() => setSelectedSet(set)}
                  className={`cursor-pointer rounded-2xl p-3 border-2 transition-all group relative ${
                    isSelected 
                      ? 'bg-slate-800 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.2)]' 
                      : 'bg-slate-800/50 border-transparent hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="aspect-square rounded-xl bg-slate-900 mb-3 overflow-hidden relative">
                     {/* Simulamos que la imagen cambia con el tipo añadiendo un query param al placeholder */}
                     <img 
                       src={`${set.baseImg}&type=${artifactType}`} 
                       alt={set.name} 
                       className={`w-full h-full object-cover transition-transform duration-500 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}
                     />
                     {isSelected && (
                       <div className="absolute inset-0 bg-yellow-500/20 flex items-center justify-center">
                         <div className="bg-yellow-500 rounded-full p-2 text-slate-900">
                           <Check size={24} strokeWidth={3} />
                         </div>
                       </div>
                     )}
                  </div>
                  <p className={`text-center font-bold text-sm ${isSelected ? 'text-yellow-500' : 'text-slate-300'}`}>
                    {set.name}
                  </p>
                </div>
              );
            })}
            
            {filteredSets.length === 0 && (
                <div className="col-span-full text-center py-10 text-slate-500">
                    No se encontraron sets con ese nombre.
                </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900 z-10">
          <button 
            onClick={handleConfirm}
            disabled={!selectedSet}
            className={`w-full font-bold py-4 rounded-xl text-lg transition-all ${
              selectedSet 
                ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-white shadow-lg shadow-yellow-900/20 hover:scale-[1.02]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Seleccionar
          </button>
        </div>

      </div>
    </div>
  );
};