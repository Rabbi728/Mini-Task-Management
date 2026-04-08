"use client";

import Link from "next/link";
import { Plus, Edit2, Trash2, ShieldCheck, Mail, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface User {
  id: number;
  uuid: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (uuid: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5", // indigo-600
      cancelButtonColor: "#f87171", // rose-400
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "rounded-3xl border border-slate-200 shadow-2xl",
        title: "text-slate-900 font-bold",
        htmlContainer: "text-slate-500 font-medium",
        confirmButton: "px-6 py-2.5 rounded-xl font-bold",
        cancelButton: "px-6 py-2.5 rounded-xl font-bold"
      }
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${uuid}`);
        setUsers(users.filter((user) => user.uuid !== uuid));
        
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
          confirmButtonColor: "#4f46e5",
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            popup: "rounded-3xl border border-slate-200 shadow-2xl",
          }
        });
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete user. Please try again.",
          icon: "error",
          confirmButtonColor: "#4f46e5",
          customClass: {
            popup: "rounded-3xl border border-slate-200 shadow-2xl",
          }
        });
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your team members and their permissions.</p>
        </div>
        <Link 
          href="/users/create"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/20 group"
        >
          <Plus className="size-5 transition-transform group-hover:rotate-90" />
          <span>Add New User</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">User Profile</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Role & access</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="size-8 text-indigo-500 animate-spin" />
                      <p className="text-sm font-medium text-slate-500">Fetching users...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-rose-500">{error}</p>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-slate-500">No users found.</p>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="size-11 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-indigo-100 ring-2 ring-white">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase">{user.name}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Mail className="size-3 text-slate-400" />
                            <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-slate-100">
                          <ShieldCheck className="size-4 text-slate-500" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 uppercase">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/users/${user.uuid}/edit`}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Edit2 className="size-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(user.uuid)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


