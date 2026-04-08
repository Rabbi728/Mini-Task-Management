"use client";

import Link from "next/link";
import { ArrowLeft, CheckSquare, Calendar, User, Flag, Save, Search, ChevronDown, Rocket, Clock, MessageSquare, AlertCircle, History, Trash2, ArrowUpRight } from "lucide-react";
import { useState, use } from "react";

export default function EditTaskPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params);
  
  // Mock data for the task
  const [formData, setFormData] = useState({
    title: "Database Migration for Enterprise Cluster",
    description: "Scale up our main Postgres cluster to handled increased load. Need to configure Redis for sub-millisecond caching on peak traffic. Ensure all nodes are synchronized before switching the traffic.",
    priority: "urgent",
    status: "in-progress",
    assignee: "sarah",
    dueDate: "2026-10-24"
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
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Header Context Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-8 border-slate-200 gap-8">
        <div className="space-y-4">
           <Link 
            href="/admin/tasks" 
            className="inline-flex items-center gap-3 text-slate-500 hover:text-indigo-600 font-black uppercase tracking-widest text-[10px] group transition-all"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-2" />
            <span>Mission Board</span>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="size-2 rounded-full bg-indigo-600 animate-pulse"></span>
               <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] italic">System Track ID: {id}</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none italic">Modify <span className="text-indigo-600">Task</span> Status</h1>
          </div>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-100 rounded-3xl font-black text-rose-500 hover:border-rose-500 hover:bg-rose-50 transition-all shadow-xl shadow-slate-200/50">
              <Trash2 className="size-5" />
              <span>Abort Mission</span>
           </button>
        </div>
      </div>

      {success && (
        <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl flex flex-col md:flex-row items-center gap-8 animate-in zoom-in-95 duration-500">
           <div className="size-16 rounded-[24px] bg-indigo-600 flex items-center justify-center shadow-indigo-600/30">
              <Save className="size-8 text-white" />
           </div>
           <div className="flex-1 space-y-1">
              <h2 className="text-2xl font-black tracking-tight leading-none italic">Update Applied.</h2>
              <p className="text-indigo-300/60 font-bold max-w-md">The mission parameters have been synchronized with the master controller.</p>
           </div>
           <button 
             onClick={() => setSuccess(false)}
             className="px-8 py-4 bg-white text-slate-900 hover:bg-indigo-50 rounded-2xl font-black transition-all shadow-xl"
           >
             Dismiss Record
           </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Left Side: Parameters Management */}
         <div className="lg:col-span-3 space-y-12">
            <div className="bg-white p-12 rounded-[56px] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-12">
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2 italic">Assignment Status Indicator</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                     {['todo', 'in-progress', 'completed'].map((s) => (
                       <button
                         key={s}
                         type="button"
                         onClick={() => setFormData({...formData, status: s})}
                         className={`py-5 px-6 rounded-3xl font-black text-sm uppercase tracking-widest border-2 transition-all flex items-center justify-between group ${
                           formData.status === s 
                           ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-600/30' 
                           : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-indigo-300 hover:text-indigo-600'
                         }`}
                       >
                         <span>{s}</span>
                         <div className={`size-3 rounded-full ${
                           formData.status === s ? 'bg-white shadow-[0_0_10px_white]' : 'bg-slate-300 group-hover:bg-indigo-300'
                         }`}></div>
                       </button>
                     ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2 italic">Task Narrative Update</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-8 py-8 bg-slate-50 rounded-3xl border-2 border-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-black text-3xl tracking-tighter text-slate-900 shadow-inner"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2 italic">Operation Log & Specifications</label>
                  <textarea 
                    rows={10}
                    className="w-full px-8 py-8 bg-slate-50 rounded-[40px] border-2 border-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-bold text-lg text-slate-600 placeholder:text-slate-300 leading-relaxed shadow-inner"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
            </div>

            <div className="bg-indigo-600 p-12 rounded-[56px] shadow-2xl shadow-indigo-600/40 flex flex-col sm:flex-row items-center justify-between gap-8 group hover:bg-slate-900 transition-all duration-700">
               <div className="space-y-2 text-center sm:text-left">
                  <h3 className="text-3xl font-black text-white italic tracking-tighter group-active:scale-95 transition-transform">Finalize Updates</h3>
                  <p className="text-indigo-100/60 font-bold text-lg">Push changes to the global production grid.</p>
               </div>
               <button 
                  disabled={loading}
                  type="submit"
                  className="w-full sm:w-auto px-16 py-7 bg-white text-indigo-900 font-black text-2xl rounded-[32px] transition-all hover:scale-110 active:scale-90 shadow-2xl shadow-white/10 flex items-center justify-center gap-4 group-hover:bg-indigo-500 group-hover:text-white"
                >
                  {loading ? (
                    <div className="size-8 border-4 border-slate-900/10 border-t-slate-900 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save className="size-8" />
                      <span>Sync Record</span>
                    </>
                  )}
                </button>
            </div>
         </div>

         {/* Right Side: Meta Context & History */}
         <div className="space-y-12">
             <div className="bg-slate-900 p-10 rounded-[48px] shadow-2xl shadow-slate-900/40 space-y-10 border border-slate-800">
                <h3 className="text-sm font-black text-indigo-400 uppercase tracking-[0.3em] italic flex items-center gap-3">
                   <Clock className="size-4" />
                   <span>Global Parameters</span>
                </h3>

                <div className="space-y-10">
                   <div className="space-y-4">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1 border-l-2 border-indigo-600">Assigned Personnel</p>
                      <div className="flex items-center gap-5 p-4 bg-slate-800/50 rounded-3xl border border-slate-700 group cursor-pointer hover:bg-slate-800 transition-all">
                         <div className="size-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-xl font-black text-white group-hover:rotate-6 transition-transform shadow-lg shadow-indigo-600/30">SC</div>
                         <div>
                            <p className="text-lg font-black text-white leading-none">Sarah Connor</p>
                            <p className="text-xs text-indigo-400 font-bold mt-1 uppercase tracking-widest italic">Lead DevOps</p>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1 border-l-2 border-rose-600">Priority Matrix</p>
                      <div className="grid grid-cols-2 gap-4">
                         {['low', 'medium', 'high', 'urgent'].map(p => (
                             <button
                                key={p}
                                type="button"
                                onClick={() => setFormData({...formData, priority: p})}
                                className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                                  formData.priority === p 
                                  ? 'bg-rose-600 border-rose-600 text-white shadow-xl shadow-rose-600/20' 
                                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'
                                }`}
                             >
                                {p}
                             </button>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-4">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1 border-l-2 border-amber-600">Deadline Target</p>
                       <div className="p-6 bg-slate-800/50 rounded-3xl border border-slate-700 font-black text-xl text-white flex items-center justify-between">
                          <span>{formData.dueDate}</span>
                          <Calendar className="size-6 text-indigo-500" />
                       </div>
                   </div>
                </div>
             </div>

             <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/40 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 size-24 bg-slate-50 rounded-full -mr-12 -mt-12"></div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3 leading-none italic">
                   <History className="size-5 text-indigo-600" />
                   <span>Audit History</span>
                </h3>
                <div className="space-y-8 relative">
                   <div className="absolute left-3 top-0 bottom-0 w-1 bg-slate-50 rounded-full"></div>
                   {[
                    { event: "Mission Created", time: "Oct 12, 14:22", active: false },
                    { event: "Resources Reallocated", time: "Oct 14, 09:15", active: false },
                    { event: "Update Applied", time: "2 hours ago", active: true },
                   ].map((log, i) => (
                     <div key={i} className="flex gap-6 relative group">
                        <div className={`size-6 rounded-full border-4 border-white shadow-md shrink-0 z-10 transition-transform group-hover:scale-125 ${log.active ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                        <div>
                           <p className="text-sm font-black text-slate-800 leading-none">{log.event}</p>
                           <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">{log.time}</p>
                        </div>
                     </div>
                   ))}
                </div>
                <button className="w-full py-5 bg-slate-50 hover:bg-slate-950 hover:text-white text-slate-400 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all border border-slate-100 flex items-center justify-center gap-3">
                   <span>Full Event Log</span>
                   <ArrowUpRight className="size-4" />
                </button>
             </div>
         </div>
      </form>

      {/* Security Context */}
      <div className="bg-slate-950 p-10 rounded-[48px] shadow-3xl text-slate-300 border border-slate-800 flex items-start gap-8 relative group overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
         <div className="p-4 bg-indigo-600 rounded-3xl shadow-2xl shadow-indigo-600/30 shrink-0">
            <AlertCircle className="size-10 text-white" />
         </div>
         <div className="space-y-4">
            <h4 className="text-2xl font-black text-white italic tracking-tighter">System Integrity Note:</h4>
            <p className="text-lg font-medium text-slate-400 leading-relaxed max-w-4xl">
              All modifications are recorded permanently in the immutable audit trail. Ensure operational security parameters are met before synchronization. Unauthorized access or falsification of status records will trigger an immediate security review.
            </p>
         </div>
      </div>
    </div>
  );
}
