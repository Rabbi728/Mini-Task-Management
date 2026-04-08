"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Users, 
  CheckSquare, 
  Clock, 
  Zap,
  Activity,
  History,
  Loader2,
  AlertCircle,
  XCircle,
  Timer,
  CheckCircle2
} from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import { formatDateTime } from "@/lib/utils";

interface DashboardStats {
  users?: { total: number };
  tasks: {
    total: number;
    pending: number;
    in_progress: number;
    done: number;
    cancelled: number;
  };
  recent_activity?: Array<{
    id: number;
    details: string;
    record_type: string;
    created_at: string;
    users?: { name: string; email: string };
  }>;
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const endpoint = user.role === "admin" ? "/dashboard/stats" : "/dashboard/my-stats";
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, { withCredentials: true });
        setStats(response.data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    if (user.role) {
      fetchStats();
    }
  }, [user.role]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="size-10 text-indigo-500 animate-spin" />
        <p className="font-medium text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="size-10 text-rose-500" />
        <p className="font-bold text-rose-500 text-sm">{error || "Data unavailable"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="pb-6 border-b border-slate-100">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Welcome back, {user.name}!
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
           You have <span className="text-indigo-600 font-bold">{stats.tasks.total} total tasks</span> across the platform.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {user.role === "admin" && stats.users && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
             <div className="size-12 rounded-xl bg-indigo-50 flex items-center justify-center">
               <Users className="size-6 text-indigo-600" />
             </div>
             <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
                <h3 className="text-2xl font-bold text-slate-900">{stats.users.total}</h3>
             </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
           <div className="size-12 rounded-xl bg-amber-50 flex items-center justify-center">
             <Timer className="size-6 text-amber-600" />
           </div>
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Tasks</p>
              <h3 className="text-2xl font-bold text-slate-900">{stats.tasks.pending}</h3>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
           <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center">
             <Zap className="size-6 text-blue-600 fill-blue-600" />
           </div>
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">In Progress</p>
              <h3 className="text-2xl font-bold text-slate-900">{stats.tasks.in_progress}</h3>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
           <div className="size-12 rounded-xl bg-emerald-50 flex items-center justify-center">
             <CheckCircle2 className="size-6 text-emerald-600" />
           </div>
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed</p>
              <h3 className="text-2xl font-bold text-slate-900">{stats.tasks.done}</h3>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Recent Activity (Admin) or Summary (User) */}
         <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
               <History className="size-5 text-indigo-600" />
               <span>{user.role === 'admin' ? 'Recent Activity' : 'My Performance'}</span>
            </h2>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
               {user.role === 'admin' && stats.recent_activity ? (
                  <div className="divide-y divide-slate-100">
                     {stats.recent_activity.map((activity) => (
                       <div key={activity.id} className="p-5 flex items-start gap-4 hover:bg-slate-50 transition-all">
                          <div className="size-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                             <Activity className="size-5 text-slate-500" />
                          </div>
                          <div className="space-y-1">
                             <p className="text-sm font-semibold text-slate-900">{activity.details}</p>
                             <p className="text-xs text-slate-400 font-medium">
                                <span className="text-indigo-600">{activity.users?.name || 'System'}</span>
                                <span className="mx-2">•</span>
                                <span>{formatDateTime(activity.created_at)}</span>
                             </p>
                          </div>
                       </div>
                     ))}
                  </div>
               ) : (
                  <div className="p-8 space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div className="p-6 bg-rose-50/50 rounded-xl border border-rose-100 flex items-center justify-between">
                            <div>
                               <p className="text-xs font-bold text-rose-400 uppercase tracking-wider">Cancelled</p>
                               <p className="text-2xl font-bold text-rose-600">{stats.tasks.cancelled}</p>
                            </div>
                            <XCircle className="size-8 text-rose-200" />
                         </div>
                         <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-between">
                            <div>
                               <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Success Rate</p>
                               <p className="text-2xl font-bold text-indigo-600">
                                 {stats.tasks.total > 0 ? Math.round((stats.tasks.done / stats.tasks.total) * 100) : 0}%
                               </p>
                            </div>
                            <CheckSquare className="size-8 text-indigo-200" />
                         </div>
                      </div>
                      <div className="bg-indigo-600 p-6 rounded-2xl text-white">
                         <h3 className="font-bold flex items-center gap-2">
                            <Zap className="size-4 fill-white" />
                            Quick Tip
                         </h3>
                         <p className="text-indigo-100 text-sm mt-1">
                            Focus on completing your <span className="font-bold text-white">{stats.tasks.in_progress} active tasks</span> to improve your completion score.
                         </p>
                      </div>
                  </div>
               )}
            </div>
         </div>

         {/* Sidebar Widget */}
         <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
               <Activity className="size-5 text-indigo-600" />
               <span>Tasks Health</span>
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
               <div className="space-y-4">
                  <div className="space-y-2">
                     <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Completion Rate</span>
                        <span className="text-indigo-600">
                          {stats.tasks.total > 0 ? Math.round((stats.tasks.done / stats.tasks.total) * 100) : 0}%
                        </span>
                     </div>
                     <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500" 
                          style={{ width: `${stats.tasks.total > 0 ? (stats.tasks.done / stats.tasks.total) * 100 : 0}%` }}
                        ></div>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Workload</span>
                        <span className="text-amber-600">
                          {stats.tasks.total > 0 ? Math.round((stats.tasks.in_progress / stats.tasks.total) * 100) : 0}%
                        </span>
                     </div>
                     <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500" 
                          style={{ width: `${stats.tasks.total > 0 ? (stats.tasks.in_progress / stats.tasks.total) * 100 : 0}%` }}
                        ></div>
                     </div>
                  </div>
               </div>
               
               <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                     <div className="size-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                        {user.name.charAt(0)}
                     </div>
                     <div>
                        <p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
                        <p className="text-xs text-slate-400 font-medium mt-1 capitalize">{user.role}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
