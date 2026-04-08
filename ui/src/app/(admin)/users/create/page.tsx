"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup.string().required("Full name is required").min(3, "Name must be at least 3 characters"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  role: yup.string().oneOf(["user", "admin"], "Invalid role").required("Role is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

export default function CreateUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);
    setErrors({});
    
    try {
      await userSchema.validate(formData, { abortEarly: false });
      
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, formData, { withCredentials: true });
      setSuccess(true);
      setFormData({ name: "", email: "", role: "user", password: "" });
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        setApiError(err.response?.data?.message || "Failed to create user. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Link 
        href="/users" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold group transition-all"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to User List</span>
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Add New User</h1>
        <p className="text-slate-500 mt-1 font-medium">Create a new member profile and assign a role.</p>
      </div>

      {success && (
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-center gap-4 text-emerald-800 shadow-sm animate-in zoom-in-95 duration-300">
          <div className="p-2 bg-emerald-100 rounded-full">
            <CheckCircle2 className="size-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="font-bold">User created successfully!</p>
            <p className="text-sm opacity-90">The new member has been added to your team.</p>
          </div>
          <button 
            onClick={() => setSuccess(false)}
            className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-all px-4 py-2 bg-white rounded-lg border border-emerald-200"
          >
            Create Another
          </button>
        </div>
      )}

      {apiError && (
        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl flex items-center gap-4 text-rose-800 shadow-sm animate-in shake duration-500">
          <div className="p-2 bg-rose-100 rounded-full">
            <AlertCircle className="size-6 text-rose-600" />
          </div>
          <div className="flex-1">
            <p className="font-bold">Execution Failed</p>
            <p className="text-sm opacity-90">{apiError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50" noValidate>
        <div className="p-10 space-y-10">
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-700 ${errors.name ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'}`}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                {errors.name && <p className="text-xs font-bold text-rose-500 mt-1 ml-1">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-700 ${errors.email ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'}`}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                {errors.email && <p className="text-xs font-bold text-rose-500 mt-1 ml-1">{errors.email}</p>}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">System Role</label>
                <select 
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-700 appearance-none ${errors.role ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'}`}
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && <p className="text-xs font-bold text-rose-500 mt-1 ml-1">{errors.role}</p>}
              </div>
              <div className="space-y-2 relative">
                <label className="text-sm font-bold text-slate-700">Set Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-700 ${errors.password ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'}`}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                {errors.password && <p className="text-xs font-bold text-rose-500 mt-1 ml-1">{errors.password}</p>}
              </div>
            </div>
          </section>

          <footer className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4">
             <Link 
              href="/users"
              className="w-full sm:w-auto px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-700 transition-all hover:bg-slate-50 rounded-xl text-center"
            >
              Discard Changes
            </Link>
            <button 
              disabled={loading}
              type="submit"
              className="w-full sm:w-auto px-10 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save className="size-5 group-hover:scale-110 transition-all" />
                  <span>Create User Account</span>
                </>
              )}
            </button>
          </footer>
        </div>
      </form>
    </div>
  );
}


