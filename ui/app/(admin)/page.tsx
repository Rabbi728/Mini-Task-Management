"use client";

import { 
  Users, 
  CheckSquare, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  Settings, 
  LayoutDashboard,
  Activity,
  Zap,
  Calendar
} from "lucide-react";
import Link from "next/link";

const stats = [
  { name: "Total Users", value: "12,345", change: "+12.5%", icon: Users, color: "bg-indigo-500", shadow: "shadow-indigo-500/30" },
  { name: "Active Tasks", value: "482", change: "+4.3%", icon: CheckSquare, color: "bg-emerald-500", shadow: "shadow-emerald-500/30" },
  { name: "SLA Progress", value: "94.2%", change: "+2.1%", icon: Clock, color: "bg-amber-500", shadow: "shadow-amber-500/30" },
  { name: "Growth Rate", value: "+24%", change: "+1.2%", icon: TrendingUp, color: "bg-rose-500", shadow: "shadow-rose-500/30" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-top-6 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-widest mb-4">
            <Zap className="size-3 fill-indigo-600" />
            <span>System Online</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-tr from-indigo-600 to-purple-600">Admin!</span>
          </h1>
          <p className="text-slate-500 mt-4 text-lg font-medium max-w-xl">
            Here's what's happening with your projects today. You have <span className="text-slate-900 font-bold decoration-indigo-500 underline decoration-4 underline-offset-4">12 urgent tasks</span> requiring attention.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3.5 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center gap-2 shadow-xl shadow-slate-200/50">
            <Calendar className="size-5" />
            <span>Schedule</span>
          </button>
          <Link 
            href="/admin/settings"
            className="p-3.5 bg-slate-900 text-white rounded-2xl hover:bg-black transition-all shadow-2xl shadow-slate-900/40"
          >
            <Settings className="size-6" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="group relative bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
             <div className={`absolute top-0 right-0 size-32 opacity-5 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150 ${stat.color}`}></div>
             <div className="relative flex flex-col h-full space-y-6">
                <div className={`size-14 rounded-2xl ${stat.color} flex items-center justify-center shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className="size-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">{stat.name}</p>
                  <div className="flex items-end gap-3 mt-1">
                    <h3 className="text-4xl font-black text-slate-900 leading-none">{stat.value}</h3>
                    <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">{stat.change}</span>
                  </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Bottom Layout - Table + Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Recent Activity */}
         <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Recent Tasks</h2>
              <Link href="/admin/tasks" className="text-sm font-black text-indigo-600 hover:text-indigo-700 underline decoration-2 underline-offset-4 tracking-tight">View All Tasks</Link>
            </div>
            
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/30 overflow-hidden">
               <div className="p-4 space-y-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-all rounded-[30px] group border border-transparent hover:border-slate-100">
                      <div className="flex items-center gap-5">
                         <div className="size-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 transition-colors group-hover:bg-indigo-100 group-hover:text-indigo-600">
                            <CheckSquare className="size-6" />
                         </div>
                         <div>
                            <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">Implement Auth Module #{1024 + i}</p>
                            <p className="text-sm text-slate-400 font-bold mt-1">Project: Enterprise CRM • Priority: <span className="text-rose-500">High</span></p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="hidden sm:flex -space-x-3">
                            {[1, 2, 3].map(u => (
                              <div key={u} className="size-10 rounded-xl bg-slate-200 border-4 border-white flex items-center justify-center text-[10px] font-black group-hover:border-indigo-50 transition-all">U{u}</div>
                            ))}
                         </div>
                         <button className="p-3 bg-slate-100 hover:bg-indigo-600 hover:text-white rounded-xl transition-all shadow-sm">
                            <ArrowUpRight className="size-5" />
                         </button>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Sidebar widgets */}
         <div className="space-y-10">
             <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 size-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                <div className="relative space-y-8">
                   <div className="size-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <Activity className="size-6 text-white" />
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-2xl font-black tracking-tight leading-tight">Advanced Analytics is ready.</h3>
                      <p className="text-slate-400 font-medium leading-relaxed">Upgrade your plan to unlock deep insights and predictive modeling features for your team.</p>
                   </div>
                   <button className="w-full py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-indigo-50 transition-all tracking-tight shadow-xl">
                      Explore Pro Features
                   </button>
                </div>
             </div>

             <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Team</h3>
                <div className="space-y-6">
                   {[
                    { name: "Sarah Connor", active: true, role: "Manager" },
                    { name: "James Bond", active: true, role: "DevOps" },
                    { name: "Lara Croft", active: false, role: "Designer" },
                   ].map(member => (
                     <div key={member.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="size-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-sm font-black text-indigo-600">
                             {member.name.split(' ').map(n => n[0]).join('')}
                           </div>
                           <div>
                              <p className="text-sm font-black text-slate-900">{member.name}</p>
                              <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">{member.role}</p>
                           </div>
                        </div>
                        <div className={`size-3 rounded-full ${member.active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-200'}`}></div>
                     </div>
                   ))}
                </div>
                <Link href="/admin/users" className="block text-center py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all border-2 border-dashed border-slate-100 hover:border-indigo-500 rounded-2xl">
                   Manage Everyone
                </Link>
             </div>
         </div>
      </div>
    </div>
  );
}
