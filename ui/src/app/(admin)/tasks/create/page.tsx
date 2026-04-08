"use client";

import Link from "next/link";
import { ArrowLeft, CheckSquare, Calendar, User, Flag, Save, Search, ChevronDown, Rocket, Clock, MessageSquare, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function CreateTaskPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    assignee: "sarah",
    dueDate: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b pb-12 border-slate-200 gap-8">
        <div className="space-y-6">
           <Link 
            href="/admin/tasks" 
            className="inline-flex items-center gap-3 text-slate-500 hover:text-indigo-600 font-black uppercase tracking-widest text-xs group transition-all"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-2" />
            <span>Abort Creation</span>
          </Link>
          <div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none italic">New <span className="text-indigo-600">Task</span> Proposal</h1>
            <p className="text-slate-500 mt-6 text-xl font-medium max-w-xl leading-relaxed">
              Define the objectives, set constraints, and allocate resources for the next mission.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-100 rounded-3xl font-black text-slate-500 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-xl shadow-slate-200/50">
              <MessageSquare className="size-5" />
              <span>Discuss Requirements</span>
           </button>
        </div>
      </div>

      {success && (
        <div className="bg-emerald-950 text-white p-10 rounded-[40px] shadow-2xl flex flex-col md:flex-row items-center gap-8 animate-in zoom-in-95 duration-500 overflow-hidden relative group">
           <div className="absolute top-0 right-0 size-64 bg-emerald-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
           <div className="size-20 rounded-[30px] bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-700 shrink-0">
              <Rocket className="size-10 text-white animate-bounce" />
           </div>
           <div className="flex-1 space-y-2 text-center md:text-left">
              <h2 className="text-3xl font-black tracking-tight">Mission Initialized!</h2>
              <p className="text-emerald-300/80 font-bold max-w-md">Your task has been successfully synchronized across the enterprise grid. Assignment notifications sent.</p>
           </div>
           <div className="flex gap-4">
              <button 
                onClick={() => setSuccess(false)}
                className="px-8 py-4 bg-emerald-800/30 hover:bg-emerald-800/60 rounded-2xl font-black transition-all border border-emerald-700/50"
              >
                Create Another
              </button>
              <Link 
                href="/admin/tasks"
                className="px-8 py-4 bg-white text-emerald-900 hover:bg-emerald-50 rounded-2xl font-black transition-all shadow-xl"
              >
                Review Board
              </Link>
           </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Left Column: Mission Content */}
         <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/40 space-y-12">
               <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2 italic">General Overview</label>
                  <input 
                    required
                    type="text" 
                    placeholder="E.g. Database Migration for Enterprise Cluster"
                    className="w-full px-8 py-6 bg-slate-50 rounded-3xl border-2 border-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-black text-2xl tracking-tighter text-slate-900 placeholder:text-slate-300 shadow-inner"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
               </div>

               <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2 italic">Detailed Description</label>
                  <textarea 
                    rows={8}
                    placeholder="Break down the milestones, technical requirements, and expected outcomes here..."
                    className="w-full px-8 py-6 bg-slate-50 rounded-3xl border-2 border-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-300 leading-relaxed shadow-inner"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
               </div>
            </div>

            <div className="bg-slate-900 p-12 rounded-[48px] shadow-2xl shadow-slate-900/40 flex items-center justify-between group">
               <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white italic">Ready for Launch?</h3>
                  <p className="text-indigo-300/60 font-bold">Double-check all parameters before deployment.</p>
               </div>
               <button 
                  disabled={loading}
                  type="submit"
                  className="px-12 py-6 bg-indigo-600 hover:bg-white hover:text-indigo-900 text-white font-black text-xl rounded-3xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-4 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="size-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Rocket className="size-6" />
                      <span>Deploy Mission</span>
                    </>
                  )}
                </button>
            </div>
         </div>

         {/* Right Column: Parameters & Config */}
         <div className="space-y-10">
            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/40 space-y-10">
               <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3 pb-6 border-b border-slate-100">
                  <Settings className="size-5 text-indigo-600" />
                  <span>Config Parameters</span>
               </h3>

               <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Assignment</label>
                    <div className="relative group">
                       <User className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-hover:text-indigo-600" />
                       <select 
                         className="w-full pl-14 pr-10 py-5 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-800 appearance-none shadow-sm"
                         value={formData.assignee}
                         onChange={(e) => setFormData({...formData, assignee: e.target.value})}
                       >
                         <option value="sarah">Sarah Connor</option>
                         <option value="james">James Bond</option>
                         <option value="ethan">Ethan Hunt</option>
                       </select>
                       <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 border-r-2 border-rose-500">Priority Level</label>
                    <div className="grid grid-cols-2 gap-4">
                       {['low', 'medium', 'high', 'urgent'].map((p) => (
                         <button
                           key={p}
                           type="button"
                           onClick={() => setFormData({...formData, priority: p})}
                           className={`py-4 px-2 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${
                             formData.priority === p 
                             ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20' 
                             : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600'
                           }`}
                         >
                           {p}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Deadline Horizon</label>
                    <div className="relative group">
                       <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                       <input 
                         required
                         type="date"
                         className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-800 shadow-sm"
                         value={formData.dueDate}
                         onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                       />
                    </div>
                  </div>
               </div>

               <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-start gap-4">
                  <AlertCircle className="size-6 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] font-bold text-amber-900/70 leading-relaxed uppercase tracking-tight">
                    <span className="block font-black text-amber-900 mb-1">Impact Warning:</span>
                    Changes to task priority may affect the global timeline and resource distribution across concurrent missions.
                  </p>
               </div>
            </div>
         </div>
      </form>
    </div>
  );
}
