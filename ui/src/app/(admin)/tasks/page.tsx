"use client";

import Link from "next/link";
import { Plus, Edit2, Trash2, CheckSquare, Clock, User, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface Task {
  id: number;
  uuid: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
  assigned_user: number | null;
  users_tasks_assigned_userTousers?: {
    name: string;
    email: string;
  };
  users_tasks_created_byTousers?: {
    name: string;
    email: string;
  };
  created_at: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, { withCredentials: true });
        setTasks(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (uuid: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#f87171",
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
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${uuid}`, { withCredentials: true });
        setTasks(tasks.filter((task) => task.uuid !== uuid));
        
        Swal.fire({
          title: "Deleted!",
          text: "Task has been deleted.",
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
          text: "Failed to delete task. Please try again.",
          icon: "error",
          confirmButtonColor: "#4f46e5",
          customClass: {
            popup: "rounded-3xl border border-slate-200 shadow-2xl",
          }
        });
      }
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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Task Management</h1>
          <p className="text-slate-500 mt-1 font-medium">Orchestrate your workspace and monitor team progress.</p>
        </div>
        <Link 
          href="/tasks/create"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/20 group"
        >
          <Plus className="size-5 transition-transform group-hover:rotate-90" />
          <span>Add New Task</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Task Info</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Created By</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="size-8 text-indigo-500 animate-spin" />
                      <p className="text-sm font-medium text-slate-500">Fetching tasks...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-rose-500">{error}</p>
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-slate-500">No tasks found.</p>
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`size-10 rounded-xl flex items-center justify-center shadow-sm ring-2 ring-white ${task.status === 'DONE' ? 'bg-emerald-500' : 'bg-indigo-500'}`}>
                          <CheckSquare className="size-5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase truncate max-w-[200px]">{task.title}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Clock className="size-3 text-slate-400" />
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                              Created: {new Date(task.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="size-7 rounded-full bg-slate-100 flex items-center justify-center">
                          <User className="size-4 text-slate-500" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">
                          {task.users_tasks_assigned_userTousers?.name || "Unassigned"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="size-7 rounded-full bg-slate-100 flex items-center justify-center">
                          <User className="size-4 text-slate-500" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">
                          {task.users_tasks_created_byTousers?.name || "Unassigned"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(task.status)}`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/tasks/${task.uuid}/edit`}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Edit2 className="size-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(task.uuid)}
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
