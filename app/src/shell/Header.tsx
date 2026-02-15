'use client';

import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
}

export function Header({ onMenuClick, sidebarCollapsed }: HeaderProps) {
  return (
    <header className="glass-header h-16 flex items-center px-4 md:px-6 gap-4 shrink-0">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="md:hidden text-white/60 hover:text-white transition-colors"
      >
        <Menu size={22} />
      </button>

      {/* Search bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search entities, projects, products..."
            className="glass-input w-full pl-9 pr-4 py-2 text-sm"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        <button className="relative text-white/50 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full" />
        </button>
      </div>
    </header>
  );
}
