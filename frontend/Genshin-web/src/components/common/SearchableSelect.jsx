import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Lock } from 'lucide-react';




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

  const filteredOptions = query === '' 
    ? options 
    : options.filter((opt) => opt.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (option) => {
    onSelect(option);
    setQuery(option.name);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${disabled ? 'opacity-50 pointer-events-none' : ''}`} ref={wrapperRef}>
      <div 
        className="flex items-center bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-3 focus-within:border-yellow-500 focus-within:ring-1 focus-within:ring-yellow-500/50 transition-all cursor-text"
        onClick={() => !disabled && setIsOpen(true)}
      >
        {Icon && <Icon size={18} className="text-slate-500 mr-2" />}
        <input 
          type="text"
          className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-slate-500"
          placeholder={disabled ? "Selecciona personaje primero" : (selected ? selected.name : placeholder)}
          value={disabled ? '' : (isOpen ? query : (selected?.name || ''))}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setQuery('')}
          disabled={disabled}
        />
        {disabled ? <Lock size={14} className="text-slate-600"/> : <ChevronDown size={16} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl shadow-xl max-h-48 overflow-y-auto z-50 animate-fade-in">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <div 
                key={opt.id}
                onClick={() => handleSelect(opt)}
                className="px-4 py-3 hover:bg-slate-700 cursor-pointer text-sm text-slate-200 border-b border-slate-700/50 last:border-0 flex items-center gap-2"
              >
                 {/* Miniatura opcional en la lista */}
                 <div className="w-6 h-6 rounded-full bg-slate-600 overflow-hidden shrink-0">
                    <img src={opt.img} className="w-full h-full object-cover" />
                 </div>
                {opt.name}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-xs text-slate-500 text-center">Sin resultados</div>
          )}
        </div>
      )}
    </div>
  );
};
export default SearchableSelect;