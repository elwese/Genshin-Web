import React from 'react'
import '../../styles/estilos.css'
import { Menu, Settings, Sword, BookOpen } from 'lucide-react';

export const Navbar = ({ setView, currentView, userRole }) => {
  const allNavItems = [
    { id: 'home', label: 'Inicio', icon: <Menu size={22} />, roleRequired: 'guest' },
    { id: 'wiki', label: 'Wiki', icon: <BookOpen size={22} />, roleRequired: 'guest' },
    { id: 'calculator', label: 'Calc', icon: <Sword size={22} />, roleRequired: 'guest' }, 
    { id: 'admin', label: 'Admin', icon: <Settings size={22} />, roleRequired: 'admin' }, 
  ];

  const visibleItems = allNavItems.filter(item => {
    if (item.roleRequired === 'guest') return true;
    if (item.roleRequired === 'admin' && userRole === 'admin') return true;
    return false;
  });

  return (
    <nav className="fixed bottom-0 w-full z-50 nav-container pb-safe pt-2">
      <div className="max-w-md mx-auto px-4 pb-2">
        <div className="flex justify-around items-end h-14">
          {visibleItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 ${
                  isActive ? 'nav-item-active transform -translate-y-1' : 'nav-item-inactive hover:text-slate-200'
                }`}
              >
                <div className={`p-1 rounded-xl transition-colors ${isActive ? 'bg-yellow-500/10' : ''}`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;