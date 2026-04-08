"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CheckSquare, Clock, Loader2, AlertCircle, CheckCircle2, RefreshCw, ChevronDown, ListTodo, Info } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import Swal from "sweetalert2";
import { formatDate } from "@/lib/utils";

interface Task {
  id: number;
  uuid: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
  assigned_user: number | null;
  created_at: string;
}

export default function MyTasksPage() {
  const { user } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);

  const fetchMyTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks/my-tasks`, { withCredentials: true });
      setTasks(response.data);
    } catch (err) {
      setError("Failed to load your tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const handleStatusChange = async (uuid: string, newStatus: string) => {
    try {
      setStatusUpdating(uuid);
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${uuid}/status`, { status: newStatus }, { withCredentials: true });
      setTasks(tasks.map(t => t.uuid === uuid ? { ...t, status: newStatus as any } : t));
      
      Swal.fire({
        title: "Success",
        text: "Task status updated",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        customClass: {
          popup: "rounded-2xl"
        }
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Update failed",
        icon: "error",
        toast: true,
        position: 'top-end'
      });
    } finally {
      setStatusUpdating(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DONE': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'IN_PROGRESS': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'CANCELLED': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Tasks</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">Manage and track your assigned missions and their current status.</p>
        </div>
        <div className="flex items-center gap-4">
           <button 
            onClick={fetchMyTasks}
            disabled={loading}
            className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-500 shadow-sm"
           >
              <RefreshCw className={`size-5 ${loading ? 'animate-spin' : ''}`} />
           </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm shadow-slate-200/50 min-h-[300px]">
        <div className="overflow-x-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mission Objective</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Registered Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-[200px]">Current Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && tasks.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="size-8 text-indigo-500 animate-spin" />
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Accessing secure log...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-rose-500 font-bold">{error}</td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-20 text-center">
                    <div className="max-w-xs mx-auto space-y-3">
                       <ListTodo className="size-10 text-slate-200 mx-auto" />
                       <p className="text-sm font-bold text-slate-500">No tasks assigned to your profile.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                           <div className="size-2 rounded-full bg-indigo-500 shrink-0"></div>
                           <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight italic text-sm">{task.title}</h3>
                        </div>
                        <p className="text-xs text-slate-500 font-medium pl-4 line-clamp-1">{task.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                       <div className="flex items-center gap-2 text-slate-500">
                          <Clock className="size-4 opacity-40" />
                          <span className="text-sm font-semibold">{formatDate(task.created_at)}</span>
                       </div>
                    </td>
                    <td className="px-6 py-5">
                       <div className="relative group/status">
                          <button className={`w-full px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border flex items-center justify-between group/btn transition-all ${getStatusColor(task.status)}`}>
                             <div className="flex items-center gap-2">
                                <span className={`size-1.5 rounded-full ${task.status === 'IN_PROGRESS' ? 'bg-indigo-500 animate-pulse' : task.status === 'DONE' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                {task.status.replace('_', ' ')}
                             </div>
                             {statusUpdating === task.uuid ? (
                                <Loader2 className="size-3 animate-spin opacity-50" />
                             ) : (
                                <ChevronDown className="size-3 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                             )}
                          </button>
                          
                          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-2xl p-1.5 hidden group-hover/status:flex flex-col gap-1 z-50 animate-in zoom-in-95 duration-200">
                             {['PENDING', 'IN_PROGRESS', 'DONE', 'CANCELLED'].map((s) => (
                               <button
                                 key={s}
                                 onClick={() => handleStatusChange(task.uuid, s)}
                                 className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg text-left transition-all ${
                                   task.status === s ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50 text-slate-400 hover:text-slate-600'
                                 }`}
                               >
                                 {s.replace('_', ' ')}
                               </button>
                             ))}
                          </div>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Information Utility */}
      <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-start gap-4">
         <Info className="size-5 text-indigo-500 mt-0.5 shrink-0" />
         <p className="text-xs text-slate-500 font-medium leading-relaxed">
           Hover over the current status to quickly transition between pending missions and completed objectives. Status changes are automatically recorded in the system audit logs.
         </p>
      </div>
    </div>
  );
}
