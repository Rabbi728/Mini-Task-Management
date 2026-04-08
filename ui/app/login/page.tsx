"use client";

import Link from "next/link";
import { 
  CheckCircle2, 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff,
  AlertCircle 
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, formData);
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);
      
      // Store token in cookie for proxy middleware
      document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;
      
      // Redirect to dashboard
      router.push("/");
    } catch (err: any) {
        console.log(err);
        
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Small Logo */}
      <div className="flex items-center gap-3 mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="size-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
          <CheckCircle2 className="size-6 text-white" />
        </div>
        <span className="text-xl font-black tracking-tight text-slate-900">MiniApp MS</span>
      </div>

      {/* Simplified Login Card */}
      <div className="w-full max-w-md bg-white p-8 lg:p-12 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 animate-in zoom-in-95 duration-500">
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Please enter your details to sign in.</p>
        </div>

        {error && (
          <div className="mb-6 bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-center gap-3 text-rose-600 animate-in shake duration-500">
            <AlertCircle className="size-5 shrink-0" />
            <p className="text-sm font-bold leading-tight">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 pl-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                required
                type="email" 
                placeholder="admin@miniapp.com"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-xl border-2 border-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all font-semibold text-slate-900 placeholder:text-slate-300 shadow-sm"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <Link href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Forgot password?</Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                required
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 rounded-xl border-2 border-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all font-semibold text-slate-900 placeholder:text-slate-300 shadow-sm"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <button 
            disabled={isLoading}
            type="submit"
            className="w-full py-4 bg-indigo-600 hover:bg-slate-900 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-70 group"
          >
            {isLoading ? (
              <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-50 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Don't have an account? <Link href="#" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">Contact management</Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
        MiniApp MS Engine v1.0.42
      </footer>
    </div>
  );
}

