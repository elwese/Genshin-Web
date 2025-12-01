import React from 'react';
import { Circle } from 'lucide-react';

const StatRating = ({ max = 6, value, onChange, label, icon: Icon, color = "text-yellow-500", prefix = "C", large = false }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
        {label && (
           <div className="flex justify-between items-center">
             <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{label}</span>
             {/* Indicador Numérico Grande y Claro */}
             <span className={`text-xl font-black ${color} bg-slate-800 px-3 py-0.5 rounded-lg border border-white/5`}>
               {prefix}{value}
             </span>
           </div>
        )}
        <div className={`flex items-center gap-2 bg-slate-900/50 rounded-2xl border border-slate-700/50 ${large ? 'p-3' : 'p-2'}`}>
            {Icon && <div className="mr-2 opacity-90">{Icon}</div>}
            <div className="flex gap-1.5 flex-wrap justify-between flex-grow px-1">
                {[...Array(max)].map((_, index) => {
                    const isActive = index < value;
                    return (
                        <button
                            key={index}
                            onClick={() => onChange(index + 1)}
                            type="button"
                            className={`transition-all duration-200 rounded-full ${large ? 'p-1' : ''} ${isActive ? 'scale-110' : 'scale-100 hover:scale-110'}`}
                        >
                            <Circle 
                                size={large ? 18 : 14} 
                                weight="fill"
                                className={`${isActive ? `fill-current ${color} drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]` : 'text-slate-700 fill-slate-700'}`} 
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    </div>
  );
};
export default StatRating;