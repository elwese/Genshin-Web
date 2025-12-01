import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  ChevronDown, 
  User, 
  Sword, 
  Zap, 
  Sparkles,
  Shield,
  Save,
  X,
  Check,
  Circle,
  Lock
} from 'lucide-react';

// --- COMPONENTES REUTILIZABLES INTERNOS ---

const SearchableSelect = ({ options, placeholder, selected, onSelect, icon: Icon, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = query === '' ? options : options.filter((opt) => opt.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (option) => {
    onSelect(option);
    setQuery(option.name);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${disabled ? 'opacity-60 pointer-events-none' : ''}`} ref={wrapperRef}>
      <div 
        className="flex items-center bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-2.5 focus-within:border-yellow-500 focus-within:ring-1 focus-within:ring-yellow-500/50 transition-all cursor-text"
        onClick={() => !disabled && setIsOpen(true)}
      >
        {Icon && <Icon size={16} className="text-slate-500 mr-2" />}
        <input 
          type="text"
          className="bg-transparent border-none outline-none text-white text-xs w-full placeholder:text-slate-500"
          placeholder={selected ? selected.name : placeholder}
          value={isOpen ? query : (selected?.name || '')}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setQuery('')}
          disabled={disabled}
        />
        {disabled ? <Lock size={14} className="text-slate-600"/> : <ChevronDown size={14} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </div>
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl shadow-xl max-h-48 overflow-y-auto z-[60]">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <div key={opt.id} onClick={() => handleSelect(opt)} className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-xs text-slate-200 border-b border-slate-700/50 last:border-0 flex items-center gap-2">
                 {opt.img && <div className="w-5 h-5 rounded-full bg-slate-600 overflow-hidden shrink-0"><img src={opt.img} className="w-full h-full object-cover" /></div>}
                {opt.name}
              </div>
            ))
          ) : (<div className="px-4 py-2 text-xs text-slate-500 text-center">Sin resultados</div>)}
        </div>
      )}
    </div>
  );
};

const StatRating = ({ max = 6, value, onChange, label, icon: Icon, color = "text-yellow-500", prefix = "C", large = false }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
        {label && (
           <div className="flex justify-between items-center">
             <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{label}</span>
             <span className={`text-xl font-black ${color} bg-slate-800 px-3 py-0.5 rounded-lg border border-white/5`}>{prefix}{value}</span>
           </div>
        )}
        <div className={`flex items-center gap-2 bg-slate-900/50 rounded-2xl border border-slate-700/50 ${large ? 'p-3' : 'p-2'}`}>
            {Icon && <div className="mr-2 opacity-90">{Icon}</div>}
            <div className="flex gap-1.5 flex-wrap justify-between flex-grow px-1">
                {[...Array(max)].map((_, index) => (
                    <button key={index} onClick={() => onChange(index + 1)} type="button" className={`transition-all duration-200 rounded-full ${large ? 'p-1' : ''} ${index < value ? 'scale-110' : 'scale-100 hover:scale-110'}`}>
                        <Circle size={large ? 18 : 14} weight="fill" className={`${index < value ? `fill-current ${color} drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]` : 'text-slate-700 fill-slate-700'}`} />
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
};

const MOCK_ARTIFACT_SETS = [
  { id: 1, name: 'Gladiador', baseImg: 'https://placehold.co/150x150/5b21b6/ffffff?text=Gladiador' },
  { id: 2, name: 'Orquesta del Errante', baseImg: 'https://placehold.co/150x150/9d174d/ffffff?text=Orquesta' },
  { id: 3, name: 'Bruja Carmesí', baseImg: 'https://placehold.co/150x150/991b1b/ffffff?text=Bruja' },
  { id: 4, name: 'Nómada del Invierno', baseImg: 'https://placehold.co/150x150/1e40af/ffffff?text=Nomada' },
  { id: 5, name: 'Sombra Verde Esmeralda', baseImg: 'https://placehold.co/150x150/065f46/ffffff?text=Sombra' },
  { id: 6, name: 'Ritual de la Nobleza', baseImg: 'https://placehold.co/150x150/ea580c/ffffff?text=Nobleza' },
];

const ArtifactSelectMenu = ({ isOpen, onClose, onSelect, artifactType }) => {
  const [search, setSearch] = useState('');
  const [selectedSet, setSelectedSet] = useState(null);

  useEffect(() => {
    if (isOpen) { setSearch(''); setSelectedSet(null); }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredSets = MOCK_ARTIFACT_SETS.filter(set => set.name.toLowerCase().includes(search.toLowerCase()));
  const typeLabels = { flower: 'Flor de la Vida', plume: 'Pluma de la Muerte', sands: 'Arenas del Eón', goblet: 'Cáliz de Eonothem', circlet: 'Tiara de Logos' };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl h-[80vh] rounded-3xl flex flex-col shadow-2xl relative overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-md">
          <div>
            <h3 className="text-xl font-bold text-white">Selección de Artefacto</h3>
            <p className="text-yellow-500 text-sm font-medium uppercase tracking-wider">{typeLabels[artifactType] || 'Artefacto'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"><X size={24} /></button>
        </div>
        <div className="p-4 border-b border-slate-800 bg-slate-900/30">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Buscar set..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-yellow-500 focus:outline-none transition-colors" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredSets.map((set) => (
              <div key={set.id} onClick={() => setSelectedSet(set)} className={`cursor-pointer rounded-2xl p-3 border-2 transition-all relative ${selectedSet?.id === set.id ? 'bg-slate-800 border-yellow-500' : 'bg-slate-800/50 border-transparent hover:bg-slate-800'}`}>
                <div className="aspect-square rounded-xl bg-slate-900 mb-3 overflow-hidden relative">
                   <img src={`${set.baseImg}&type=${artifactType}`} alt={set.name} className="w-full h-full object-cover" />
                   {selectedSet?.id === set.id && <div className="absolute inset-0 bg-yellow-500/20 flex items-center justify-center"><div className="bg-yellow-500 rounded-full p-2 text-slate-900"><Check size={24} /></div></div>}
                </div>
                <p className={`text-center font-bold text-sm ${selectedSet?.id === set.id ? 'text-yellow-500' : 'text-slate-300'}`}>{set.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 border-t border-slate-800 bg-slate-900 z-10">
          <button onClick={() => { if(selectedSet) { onSelect(selectedSet); onClose(); } }} disabled={!selectedSet} className={`w-full font-bold py-4 rounded-xl text-lg transition-all ${selectedSet ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>Seleccionar</button>
        </div>
      </div>
    </div>
  );
};

// --- DATA & MAIN COMPONENT ---

const MOCK_CHARACTERS = [
  { id: 1, name: 'Furina', element: 'hydro', weaponType: 'sword', img: 'https://placehold.co/300x500/1e293b/60a5fa?text=Furina' },
  { id: 2, name: 'Hu Tao', element: 'pyro', weaponType: 'polearm', img: 'https://placehold.co/300x500/1e293b/ef4444?text=Hu+Tao' },
  { id: 3, name: 'Raiden Shogun', element: 'electro', weaponType: 'polearm', img: 'https://placehold.co/300x500/1e293b/a855f7?text=Raiden' },
  { id: 4, name: 'Zhongli', element: 'geo', weaponType: 'polearm', img: 'https://placehold.co/300x500/1e293b/eab308?text=Zhongli' },
  { id: 5, name: 'Nahida', element: 'dendro', weaponType: 'catalyst', img: 'https://placehold.co/300x500/1e293b/22c55e?text=Nahida' },
];

const MOCK_WEAPONS = [
  { id: 1, name: 'Fulgor de las Aguas', type: 'sword', img: 'https://placehold.co/200x200/1e293b/60a5fa?text=Espada' },
  { id: 2, name: 'Báculo de Homa', type: 'polearm', img: 'https://placehold.co/200x200/1e293b/ef4444?text=Lanza' },
  { id: 3, name: 'Luz del Segador', type: 'polearm', img: 'https://placehold.co/200x200/1e293b/a855f7?text=Lanza' },
  { id: 4, name: 'Sueños de las Mil Noches', type: 'catalyst', img: 'https://placehold.co/200x200/1e293b/22c55e?text=Catalizador' },
];

const STAT_OPTIONS = {
  fixed_hp:   [{ id: 'hp', name: 'Vida' }],
  fixed_atk:  [{ id: 'atk', name: 'Ataque' }],
  common: [
    { id: 'hp_p', name: 'Vida %' },
    { id: 'def_p', name: 'Defensa %' },
    { id: 'atk_p', name: 'Ataque %' },
    { id: 'em', name: 'Maestría Elemental' },
    { id: 'er', name: 'Recarga de Energía' },
  ],
  goblet_extra: [
    { id: 'pyro_dmg', name: 'Bono Daño Pyro' },
    { id: 'hydro_dmg', name: 'Bono Daño Hydro' },
    { id: 'electro_dmg', name: 'Bono Daño Electro' },
    { id: 'cryo_dmg', name: 'Bono Daño Cryo' },
    { id: 'anemo_dmg', name: 'Bono Daño Anemo' },
    { id: 'geo_dmg', name: 'Bono Daño Geo' },
    { id: 'dendro_dmg', name: 'Bono Daño Dendro' },
    { id: 'phys_dmg', name: 'Bono Daño Físico' },
  ],
  circlet_extra: [
    { id: 'cr', name: 'Prob. Crítico' },
    { id: 'cd', name: 'Daño Crítico' },
  ]
};

// Generamos las opciones por tipo de pieza
const ARTIFACT_MAIN_STATS = {
  flower: STAT_OPTIONS.fixed_hp,
  plume: STAT_OPTIONS.fixed_atk,
  sands: STAT_OPTIONS.common,
  goblet: [...STAT_OPTIONS.common, ...STAT_OPTIONS.goblet_extra],
  circlet: [...STAT_OPTIONS.common, ...STAT_OPTIONS.circlet_extra]
};

// Substats (No pueden ser iguales al principal idealmente, pero por ahora mostramos todos)
const SUBSTAT_OPTIONS = [
  ...STAT_OPTIONS.common,
  { id: 'hp', name: 'Vida' },
  { id: 'atk', name: 'Ataque' },
  { id: 'def', name: 'Defensa' },
  { id: 'cr', name: 'Prob. Crítico' },
  { id: 'cd', name: 'Daño Crítico' },
];

const ARTIFACT_SLOTS = [
  { key: 'flower', label: 'Flor', iconText: '🌻' },
  { key: 'plume', label: 'Pluma', iconText: '🪶' },
  { key: 'sands', label: 'Reloj', iconText: '⏳' },
  { key: 'goblet', label: 'Cáliz', iconText: '🏆' },
  { key: 'circlet', label: 'Corona', iconText: '👑' },
];

export const CalculatorCharacterMain = () => {
  const navigate = useNavigate();

  // Estados Personaje & Arma
  const [selectedChar, setSelectedChar] = useState(null);
  const [charLevel, setCharLevel] = useState(1);
  const [constellation, setConstellation] = useState(0);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [weaponLevel, setWeaponLevel] = useState(1);
  const [refinement, setRefinement] = useState(1);
  const [talentBasic, setTalentBasic] = useState(1);
  const [talentSkill, setTalentSkill] = useState(1);
  const [talentBurst, setTalentBurst] = useState(1);

  // Artefactos: Ahora incluyen mainStat
  const initialArtifactState = {
    set: null,
    level: 0,
    mainStat: { type: null, value: 0 },
    substats: [
      { type: null, value: 0 },
      { type: null, value: 0 },
      { type: null, value: 0 },
      { type: null, value: 0 },
    ]
  };

  const [artifacts, setArtifacts] = useState({
    flower: { ...initialArtifactState },
    plume: { ...initialArtifactState },
    sands: { ...initialArtifactState },
    goblet: { ...initialArtifactState },
    circlet: { ...initialArtifactState },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [activeArtifactSlot, setActiveArtifactSlot] = useState(null);

  const filteredWeapons = selectedChar ? MOCK_WEAPONS.filter(w => w.type === selectedChar.weaponType) : [];
  useEffect(() => { setSelectedWeapon(null); setWeaponLevel(1); }, [selectedChar]);

  // Manejo de Artefactos
  const openArtifactModal = (slotKey) => { setActiveArtifactSlot(slotKey); setModalOpen(true); };
  
  const handleArtifactSelect = (set) => {
    // Al seleccionar set, pre-poblamos main stat si es flor o pluma
    const slotKey = activeArtifactSlot;
    let defaultMainStat = artifacts[slotKey].mainStat;
    
    if (slotKey === 'flower') defaultMainStat = { type: STAT_OPTIONS.fixed_hp[0], value: 0 };
    if (slotKey === 'plume') defaultMainStat = { type: STAT_OPTIONS.fixed_atk[0], value: 0 };

    setArtifacts(prev => ({
      ...prev,
      [slotKey]: { ...prev[slotKey], set: set, mainStat: defaultMainStat }
    }));
  };

  const handleArtifactMainStatChange = (slotKey, field, value) => {
    setArtifacts(prev => ({
      ...prev,
      [slotKey]: { ...prev[slotKey], mainStat: { ...prev[slotKey].mainStat, [field]: value } }
    }));
  };

  // Setters helpers
  const handleArtifactLevel = (k, v) => setArtifacts(p => ({ ...p, [k]: { ...p[k], level: Math.min(20, Math.max(0, parseInt(v)||0)) } }));
  const handleSubstat = (k, i, f, v) => {
    const subs = [...artifacts[k].substats];
    subs[i] = { ...subs[i], [f]: v };
    setArtifacts(p => ({ ...p, [k]: { ...p[k], substats: subs } }));
  };

  const handleCreateCharacter = () => {
    if (!selectedChar || !selectedWeapon) { alert("Falta personaje o arma"); return; }
    
    // Check de sets
    if (Object.values(artifacts).some(a => !a.set)) { alert("Equipa todos los artefactos"); return; }

    const newBuild = {
      id: Date.now(), // Generamos ID aquí
      date: new Date().toISOString(),
      character: { ...selectedChar, level: charLevel, constellation },
      weapon: { ...selectedWeapon, level: weaponLevel, refinement },
      talents: { basic: talentBasic, skill: talentSkill, burst: talentBurst },
      artifacts: artifacts
    };

    navigate('/app/character/hub', { state: { createdCharacter: newBuild } });
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 pb-32 overflow-x-hidden">
      <header className="fixed top-0 w-full z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 h-16 px-4 flex items-center gap-4">
        <button onClick={() => navigate("calculator/character-builder")} className="p-2 -ml-2 text-slate-400 hover:text-white rounded-full"><ArrowLeft size={24} /></button>
        <div><h1 className="text-lg font-bold text-white leading-tight">Crear Personaje</h1></div>
      </header>

      <div className="pt-20 px-4 space-y-12 max-w-2xl mx-auto w-full animate-fade-in">
        {/* Personaje */}
        <section className="relative">
           <div className="flex justify-between items-center mb-4"><h2 className="text-yellow-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2"><User size={18} /> Personaje</h2><div className="h-px bg-slate-800 w-full ml-4"></div></div>
           <div className="flex gap-5">
              <div className="flex-1 space-y-4">
                 <div className="space-y-1"><label className="text-xs text-slate-400 font-bold ml-1 uppercase">Selección</label><SearchableSelect options={MOCK_CHARACTERS} placeholder="Buscar..." selected={selectedChar} onSelect={setSelectedChar} icon={Search} /></div>
                 <div className="flex items-center gap-2"><input type="number" value={charLevel} onChange={(e) => setCharLevel(Math.min(90, Math.max(1, parseInt(e.target.value)||0)))} className="w-16 bg-transparent border-b border-yellow-500 text-right text-xl font-bold text-white outline-none"/><span className="text-slate-500 text-sm font-bold">/ 90</span><button onClick={() => setCharLevel(90)} className="ml-auto bg-slate-800 text-slate-400 text-xs font-bold py-2 px-4 rounded-lg">Max</button></div>
                 <StatRating max={6} value={constellation} onChange={setConstellation} label="Constelación" prefix="C" />
              </div>
              <div className="w-[100px] shrink-0"><div className="w-full aspect-[2/3] bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl relative">{selectedChar ? <img src={selectedChar.img} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-slate-600"><User size={24}/></div>}</div></div>
           </div>
        </section>

        {/* Arma */}
        <section className="relative">
           <div className="flex justify-between items-center mb-4 flex-row-reverse"><h2 className="text-yellow-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2">Arma <Sword size={18} /></h2><div className="h-px bg-slate-800 w-full mr-4"></div></div>
           <div className="flex gap-5 flex-row-reverse">
              <div className="flex-1 space-y-4">
                 <div className="space-y-1"><label className="text-xs text-slate-400 font-bold ml-1 uppercase">Selección</label><SearchableSelect options={filteredWeapons} placeholder="Buscar..." selected={selectedWeapon} onSelect={setSelectedWeapon} icon={Sword} disabled={!selectedChar} /></div>
                 <div className="flex items-center gap-2"><input type="number" value={weaponLevel} onChange={(e) => setWeaponLevel(Math.min(90, Math.max(1, parseInt(e.target.value)||0)))} className="w-16 bg-transparent border-b border-yellow-500 text-right text-xl font-bold text-white outline-none" disabled={!selectedChar}/><span className="text-slate-500 text-sm font-bold">/ 90</span><button onClick={() => setWeaponLevel(90)} className="ml-auto bg-slate-800 text-slate-400 text-xs font-bold py-2 px-4 rounded-lg" disabled={!selectedChar}>Max</button></div>
                 <StatRating max={5} value={refinement} onChange={setRefinement} label="Refinamiento" prefix="R" color="text-red-400" />
              </div>
              <div className="w-[100px] shrink-0"><div className="w-full aspect-[2/3] bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl relative">{selectedWeapon ? <img src={selectedWeapon.img} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-slate-600"><Sword size={24}/></div>}</div></div>
           </div>
        </section>

        {/* Talentos */}
        <section className="relative">
           <div className="flex justify-between items-center mb-4"><h2 className="text-yellow-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2"><Zap size={18} /> Talentos</h2><div className="h-px bg-slate-800 w-full ml-4"></div></div>
           <div className="grid grid-row-3 gap-2">
               <StatRating max={10} value={talentBasic} onChange={setTalentBasic} color="text-blue-400" prefix="nv." large icon={<Sword size={16}/>} />
               <StatRating max={10} value={talentSkill} onChange={setTalentSkill} color="text-purple-400" prefix="nv." large icon={<Zap size={16}/>} />
               <StatRating max={10} value={talentBurst} onChange={setTalentBurst} color="text-yellow-400" prefix="nv." large icon={<Sparkles size={16}/>} />
           </div>
        </section>
        
        {/* ARTEFACTOS */}
        <section className="relative">
           <div className="flex justify-between items-center mb-6"><h2 className="text-yellow-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2"><Shield size={18} /> Artefactos</h2><div className="h-px bg-slate-800 w-full ml-4"></div></div>

           <div className="space-y-6">
              {ARTIFACT_SLOTS.map((slot) => {
                  const current = artifacts[slot.key];
                  const hasSet = !!current.set;
                  const isFixedStat = slot.key === 'flower' || slot.key === 'plume';

                  return (
                    <div key={slot.key} className="bg-slate-800/20 rounded-3xl border border-slate-800 p-4">
                       
                       <div className="flex gap-4 mb-4">
                          {/* Imagen y Nombre de Pieza */}
                          <div className="flex flex-col gap-2 shrink-0">
                              <div onClick={() => openArtifactModal(slot.key)} className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center cursor-pointer relative overflow-hidden group ${hasSet ? 'border-yellow-500/50 bg-slate-800' : 'border-slate-700 border-dashed hover:border-yellow-500/30'}`}>
                                 {hasSet ? <img src={current.set.baseImg} className="w-full h-full object-cover" /> : <span className="text-2xl">{slot.iconText}</span>}
                              </div>
                              <span className="text-[10px] text-center text-slate-500 font-bold uppercase bg-slate-900 rounded py-1 border border-slate-700">{slot.label}</span>
                          </div>

                          {/* Stat Principal y Nivel */}
                          <div className="flex-1 flex flex-col gap-3 justify-center">
                              {/* Stat Principal Selector + Valor */}
                              <div className="flex gap-2">
                                  <div className="flex-1">
                                      <SearchableSelect 
                                          options={ARTIFACT_MAIN_STATS[slot.key]} 
                                          placeholder="Stat Principal"
                                          selected={current.mainStat.type}
                                          onSelect={(opt) => handleArtifactMainStatChange(slot.key, 'type', opt)}
                                          disabled={!hasSet || isFixedStat} // Bloqueado si no hay set o es Flor/Pluma
                                      />
                                  </div>
                                  <div className="w-24 relative">
                                      <input 
                                          type="number" 
                                          placeholder="0"
                                          disabled={!hasSet}
                                          value={current.mainStat.value || ''}
                                          onChange={(e) => handleArtifactMainStatChange(slot.key, 'value', e.target.value)}
                                          className="w-full h-full bg-slate-900 border border-slate-700 rounded-xl px-3 text-right text-lg font-bold text-yellow-500 focus:border-yellow-500 outline-none"
                                      />
                                  </div>
                              </div>
                              
                              {/* Nombre del Set y Nivel */}
                              <div className="flex justify-between items-center px-1">
                                  <span className="text-xs text-slate-400 truncate max-w-[120px] font-medium">{hasSet ? current.set.name : 'Selecciona Set...'}</span>
                                  <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-700">
                                      <span className="text-[10px] text-slate-500 font-bold">NV</span>
                                      <input type="number" disabled={!hasSet} value={current.level} onChange={(e) => handleArtifactLevel(slot.key, e.target.value)} className="w-8 bg-transparent text-center font-bold text-white outline-none text-sm"/>
                                  </div>
                              </div>
                          </div>
                       </div>

                       {/* Substats Grid */}
                       <div className="grid grid-cols-2 gap-2 bg-slate-900/50 rounded-xl p-3 border border-slate-700/50">
                           {current.substats.map((sub, idx) => (
                               <div key={idx} className="flex gap-1 items-center">
                                   <div className="flex-1 min-w-0">
                                       <SearchableSelect options={SUBSTAT_OPTIONS} placeholder="Sub..." selected={sub.type} onSelect={(opt) => handleSubstat(slot.key, idx, 'type', opt)} disabled={!hasSet} />
                                   </div>
                                   <input type="number" placeholder="+" disabled={!hasSet} value={sub.value || ''} onChange={(e) => handleSubstat(slot.key, idx, 'value', e.target.value)} className="w-12 bg-slate-800 border border-slate-700 rounded-lg py-2 px-1 text-xs text-center text-white focus:border-yellow-500 outline-none" />
                               </div>
                           ))}
                       </div>
                    </div>
                  );
              })}
           </div>
        </section>

        <div className="fixed bottom-0 left-0 w-full bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 p-4 flex justify-center z-30">
             <button onClick={handleCreateCharacter} className="max-w-md w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-yellow-900/20 flex items-center justify-center gap-3 active:scale-95"><Save size={20} /><span>Crear Personaje</span></button>
        </div>
        <div className="h-10"></div>
      </div>
      <ArtifactSelectMenu isOpen={modalOpen} onClose={() => setModalOpen(false)} onSelect={handleArtifactSelect} artifactType={activeArtifactSlot} />
    </div>
  );
};