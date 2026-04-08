"use client";

import Link from "next/link";
import { Plus, Search, Calendar, Briefcase, User, Flag, CheckSquare, MoreHorizontal, Clock, ArrowUpRight, Filter, ChevronRight, X } from "lucide-react";
import { useState } from "react";

// Mock tasks data
const mockTasks = [
  { id: 1024, title: "Configure Redis Cluster", status: "In Progress", priority: "Urgent", assignee: "Sarah Connor", dueDate: "Oct 24, 2026", color: "bg-rose-500" },
  { id: 1025, title: "Update Auth Module v2", status: "To Do", priority: "High", assignee: "James Bond", dueDate: "Oct 25, 2026", color: "bg-indigo-500" },
  { id: 1026, title: "Dashboard UX Audit", status: "Completed", priority: "Medium", assignee: "Lara Croft", dueDate: "Oct 22, 2026", color: "bg-emerald-500" },
  { id: 1027, title: "Fix API Rate Limiting", status: "In Progress", priority: "High", assignee: "Ethan Hunt", dueDate: "Oct 24, 2026", color: "bg-indigo-500" },
  { id: 1028, title: "Email Template Redesign", status: "To Do", priority: "Low", assignee: "John Wick", dueDate: "Oct 30, 2026", color: "bg-slate-500" },
];

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = mockTasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-6 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Tasks Monitoring</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Tasks Center</h1>
          <p className="text-slate-500 mt-2 text-lg font-medium">Orchestrate your workspace and monitor team progress.</p>
        </div>
        <Link 
          href="/admin/tasks/create"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-slate-900 text-white font-black rounded-3xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-600/30 group"
        >
          <Plus className="size-6 transition-transform group-hover:rotate-180 duration-500" />
          <span>Initialize New Task</span>
        </Link>
      </div>

      {/* Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="md:col-span-2 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by task title or assignee..."
            className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <button className="flex-1 px-6 py-4 bg-slate-50 hover:bg-white border-2 border-slate-50 hover:border-indigo-500 flex items-center justify-center gap-2 rounded-2xl transition-all group font-bold text-slate-600 hover:text-indigo-600">
            <Filter className="size-5 transition-transform group-hover:scale-110" />
            <span>Filters</span>
          </button>
           <button className="p-4 bg-slate-900 text-white hover:bg-black rounded-2xl transition-all shadow-xl shadow-slate-900/20">
            <Calendar className="size-5" />
          </button>
        </div>
        <div className="flex items-center justify-end">
           <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="size-11 rounded-2xl bg-indigo-50 border-4 border-white flex items-center justify-center text-xs font-black text-indigo-600 shadow-sm ring-1 ring-slate-100 hover:scale-110 hover:z-10 transition-all cursor-pointer">U{i}</div>
              ))}
               <div className="size-11 rounded-2xl bg-slate-900 border-4 border-white flex items-center justify-center text-xs font-black text-white shadow-sm">+9</div>
           </div>
        </div>
      </div>

      {/* Tasks Grid/Table */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="group bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-1">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                   <div className={`mt-1 size-12 rounded-2xl ${task.color} flex items-center justify-center shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-500`}>
                      <CheckSquare className="size-6 text-white" />
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase tracking-widest border border-slate-100">ID-{task.id}</span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest border border-transparent ${
                          task.priority === 'Urgent' ? 'bg-rose-50 text-rose-600' : 
                          task.priority === 'High' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-600'
                        }`}>
                          {task.priority} Priority
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">{task.title}</h3>
                      <div className="flex items-center gap-4 pt-1">
                        <div className="flex items-center gap-2">
                           <User className="size-3.5 text-slate-400" />
                           <span className="text-xs font-bold text-slate-500">{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Clock className="size-3.5 text-slate-400" />
                           <span className="text-xs font-bold text-slate-500">Due {task.dueDate}</span>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6">
                   <div className="flex items-center gap-1.5">
                      <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${
                        task.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        task.status === 'In Progress' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-600 border-slate-100'
                      }`}>
                         <span className={`size-1.5 rounded-full ${task.status === 'Completed' ? 'bg-emerald-500' : task.status === 'In Progress' ? 'bg-indigo-500 animate-pulse' : 'bg-slate-400'}`}></span>
                         {task.status}
                      </span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Link 
                        href={`/admin/tasks/${task.id}/edit`}
                        className="p-3 bg-slate-50 hover:bg-slate-900 text-slate-400 hover:text-white rounded-2xl transition-all hover:scale-110 active:scale-90"
                      >
                         <ArrowUpRight className="size-5" />
                      </Link>
                      <button className="p-3 bg-slate-50 hover:bg-rose-600 text-slate-400 hover:text-white rounded-2xl transition-all hover:scale-110 active:scale-90">
                         <MoreHorizontal className="size-5" />
                      </button>
                   </div>
                </div>
             </div>
          </div>
        ))}
        
        {/* Pagination */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
           <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Page <span className="text-slate-900">01</span> / 12</p>
           <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 rounded-2xl font-black text-slate-400 opacity-50 cursor-not-allowed">Previous</button>
              <div className="flex items-center gap-2">
                 {[1, 2, 3].map(p => (
                   <button key={p} className={`size-12 rounded-2xl font-black transition-all ${p === 1 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white border-2 border-slate-50 text-slate-600 hover:border-indigo-200'}`}>{p}</button>
                 ))}
                 <span className="text-slate-300">...</span>
              </div>
              <button className="group flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl shadow-slate-900/20">
                 <span>Next Engine</span>
                 <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
