import React from 'react';
import '../../styles/estilos.css';

export const AdminPanel = () => {
  const categories = [
    { id: 1, name: 'Personajes', count: 72, icon: <User size={24} />, color: 'text-purple-400' },
    { id: 2, name: 'Armas', count: 145, icon: <Sword size={24} />, color: 'text-yellow-500' },
    { id: 3, name: 'Artefactos', count: 34, icon: <Shield size={24} />, color: 'text-blue-400' },
    { id: 4, name: 'Enemigos', count: 58, icon: <Zap size={24} />, color: 'text-red-400' },
  ];

  return (
    <div className="flex-grow pb-24 px-6 pt-12 max-w-md mx-auto w-full animate-fade-in">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Panel Admin</h1>
          <p className="text-xs text-slate-400 uppercase tracking-wider">Gestión de Contenido</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
          <Settings size={20} />
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {categories.map((cat) => (
          <div key={cat.id} className="genshin-card p-5 flex flex-col items-center justify-center text-center cursor-pointer group">
            <div className={`mb-3 p-3 rounded-full bg-slate-900/50 ${cat.color} group-hover:scale-110 transition-transform`}>
              {cat.icon}
            </div>
            <span className="text-2xl font-bold text-white mb-1">{cat.count}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{cat.name}</span>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-5 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-200 text-sm">Actividad Reciente</h3>
          <button className="w-8 h-8 rounded-full bg-yellow-600 text-white flex items-center justify-center hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-900/20">
            <Plus size={16} />
          </button>
        </div>

        <div className="space-y-4">
          {[
            { name: "Furina", type: "Personaje", date: "Hace 2h", icon: <User size={14}/> },
            { name: "Fulgor de las Aguas", type: "Arma", date: "Hace 5h", icon: <Sword size={14}/> },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-700/30 last:border-0 hover:bg-slate-800/30 px-2 -mx-2 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-700/50 flex items-center justify-center text-slate-400">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{item.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">{item.type} • {item.date}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
                  <Edit3 size={14} />
                </button>
                <button className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};