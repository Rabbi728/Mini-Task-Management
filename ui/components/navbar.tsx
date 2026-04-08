"use client";

import { Bell, Search, Settings } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md">
      <div className="flex-1 max-w-xl">
        <label htmlFor="search" className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          <input
            id="search"
            type="text"
            placeholder="Search everything..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-700"
          />
        </label>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-slate-50 rounded-xl transition-all relative">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2 size-2 bg-rose-500 rounded-full ring-2 ring-white ring-offset-2"></span>
        </button>
        <button className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-slate-50 rounded-xl transition-all">
          <Settings className="size-5" />
        </button>
        <div className="h-6 w-px bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-700">Admin User</p>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Master Admin</p>
          </div>
          <div className="size-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
              <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-600 to-purple-600">A</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
