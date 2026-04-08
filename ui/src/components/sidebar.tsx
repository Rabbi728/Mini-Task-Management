"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Users, 
  LogOut, 
  LayoutDashboard, 
  CheckSquare, 
  Bell,
  Search,
  Menu,
  X,
  History,
  Briefcase
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import axios from "axios";


const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "My Tasks", href: "/my-tasks", icon: Briefcase },
  { name: "Team Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Team Members", href: "/users", icon: Users },
  { name: "Activity Logs", href: "/activity-logs", icon: History },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const filteredNavigation = navigation.filter(item => {
    if (user.role === 'admin') {
        return ["Dashboard", "Team Tasks", "Team Members", "Activity Logs"].includes(item.name);
    } else {
        return ["Dashboard", "My Tasks"].includes(item.name);
    }
  });

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout API failed", err);
    } finally {
      clearUser();
      
      localStorage.removeItem("token");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/login");
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-all"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-slate-200 lg:hidden"
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-100 flex flex-col transition-transform duration-300 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        border-r border-slate-800
      `}>
        <div className="p-6 flex items-center space-x-3">
          <div className="p-2 bg-indigo-600 rounded-xl">
            <CheckSquare className="size-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">MiniApp MS</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? "bg-indigo-600/10 text-indigo-400 border border-indigo-600/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100 border border-transparent"}
                `}
              >
                <item.icon className={`size-5 transition-transform group-hover:scale-110 ${isActive ? "text-indigo-400" : "text-slate-500"}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="size-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white uppercase">
                {user.name.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate leading-none">{user.name || "Guest User"}</p>
                <p className="text-xs text-slate-400 truncate mt-1">{user.email || "guest@example.com"}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-700 hover:text-white rounded-xl transition-colors"
            >
              <LogOut className="size-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
