import Link from "next/link";
import { ArrowRight, CheckCircle2, LayoutDashboard, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <CheckCircle2 className="size-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight">MiniApp MS</span>
        </div>
        <Link 
          href="/admin" 
          className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2"
        >
          <span>Admin Portal</span>
          <ArrowRight className="size-4" />
        </Link>
      </nav>

      <main className="relative pt-40 pb-20 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest mb-8 animate-in slide-in-from-bottom-2 duration-500">
          <Zap className="size-4 fill-indigo-600" />
          <span>New Version 2.0 is Live</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8 max-w-4xl animate-in slide-in-from-bottom-4 duration-700">
          Manage your <span className="text-transparent bg-clip-text bg-gradient-to-tr from-indigo-600 to-purple-600">Enterprise</span> Workflow with Ease.
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl leading-relaxed mb-12 animate-in slide-in-from-bottom-6 duration-1000">
          A premium administration system built for high-performance teams. Real-time updates, advanced analytics, and seamless group management.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 animate-in slide-in-from-bottom-8 duration-1000">
          <Link 
            href="/admin"
            className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-[24px] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-3 group"
          >
            <LayoutDashboard className="size-6 transition-transform group-hover:rotate-12" />
            <span>Go to Dashboard</span>
          </Link>
          <Link 
            href="/admin/users"
            className="px-10 py-5 bg-white border-2 border-slate-200 text-slate-900 font-black text-lg rounded-[24px] transition-all hover:border-indigo-500 hover:text-indigo-600 shadow-xl shadow-slate-200/20 flex items-center justify-center gap-3 group"
          >
            <ShieldCheck className="size-6 transition-transform group-hover:scale-110" />
            <span>User Management</span>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 w-full text-left">
           {[
            { title: "Smart Automation", desc: "Automate repetitive tasks with our intelligent workflow engine.", icon: Zap },
            { title: "Team Collaboration", desc: "Real-time sync across your entire team for better productivity.", icon: ShieldCheck },
            { title: "Elite Security", desc: "Enterprise-grade encryption and granular role-based access control.", icon: CheckCircle2 }
           ].map((feature, i) => (
             <div key={i} className="group p-8 rounded-[32px] border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-all duration-300">
                <div className="size-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                   <feature.icon className="size-6" />
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
             </div>
           ))}
        </div>
      </main>

      <footer className="py-20 px-8 border-t border-slate-100 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
        © 2026 MiniApp MS. Designed for the Future of Work.
      </footer>
    </div>
  );
}