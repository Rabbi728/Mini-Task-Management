"use client";

import Link from "next/link";
import { ArrowLeft, Save, CheckCircle2, AlertCircle, Loader2, Layout, AlignLeft, User, ListChecks } from "lucide-react";
import { useState, useEffect, use } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as yup from "yup";

const taskSchema = yup.object().shape({
    title: yup.string().required("Task title is required").min(3, "Title must be at least 3 characters"),
    description: yup.string().required("Description is required"),
    status: yup.string().oneOf(["PENDING", "IN_PROGRESS", "DONE", "CANCELLED"], "Invalid status").required("Status is required"),
    assigned_user: yup.number().transform((value) => (isNaN(value) || value === null ? null : value)).nullable().notRequired(),
});

interface UserOption {
    id: number;
    name: string;
}

export default function EditTaskPage({
    params
}: {
    params: Promise<{ uuid: string }>
}) {
    const router = useRouter();
    const { uuid } = use(params);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "PENDING",
        assigned_user: "" as any,
    });

    const [users, setUsers] = useState<UserOption[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const usersRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, { withCredentials: true });
                setUsers(usersRes.data);

                const taskRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${uuid}`, { withCredentials: true });
                const task = taskRes.data;
                setFormData({
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    assigned_user: task.assigned_user || "",
                });
            } catch (err) {
                setApiError("Failed to load task data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [uuid]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setApiError(null);
        setErrors({});

        try {
            const validatedData = await taskSchema.validate({
                ...formData,
                assigned_user: formData.assigned_user === "" ? null : parseInt(formData.assigned_user)
            }, { abortEarly: false });

            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${uuid}`, validatedData, { withCredentials: true });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            if (err instanceof yup.ValidationError) {
                const validationErrors: Record<string, string> = {};
                err.inner.forEach((error) => {
                    if (error.path) validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            } else {
                setApiError(err.response?.data?.message || "Failed to update task. Please try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="size-10 text-indigo-500 animate-spin" />
                <p className="text-slate-500 font-medium">Loading task data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <Link
                href="/tasks"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold group transition-all"
            >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Task Dashboard</span>
            </Link>

            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Edit Task</h1>
                <p className="text-slate-500 mt-1 font-medium">Update parameters for task UUID: {uuid}</p>
            </div>
...

            {success && (
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-center gap-4 text-emerald-800 shadow-sm animate-in zoom-in-95 duration-300">
                    <div className="p-2 bg-emerald-100 rounded-full">
                        <CheckCircle2 className="size-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold">Task updated successfully!</p>
                        <p className="text-sm opacity-90">The task modifications have been saved.</p>
                    </div>
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
                        <div className="grid grid-cols-1 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Layout className="size-4 text-indigo-500" />
                                    <span>Task Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Configure Redis Cluster"
                                    className={`w-full px-4 py-4 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-bold text-slate-700 ${errors.title ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'}`}
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                                {errors.title && <p className="text-xs font-bold text-rose-500 mt-1 ml-1">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <AlignLeft className="size-4 text-indigo-500" />
                                    <span>Mission Description</span>
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Detailed breakdown of the task requirements..."
                                    className={`w-full px-4 py-4 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-medium text-slate-700 ${errors.description ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'}`}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                                {errors.description && <p className="text-xs font-bold text-rose-500 mt-1 ml-1">{errors.description}</p>}
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6 pt-6 border-t border-slate-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <ListChecks className="size-4 text-indigo-500" />
                                    <span>Current Status</span>
                                </label>
                                <select
                                    className={`w-full px-4 py-4 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-bold text-slate-700 appearance-none cursor-pointer ${errors.status ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'}`}
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="PENDING">PENDING</option>
                                    <option value="IN_PROGRESS">IN PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                    <option value="CANCELLED">CANCELLED</option>
                                </select>
                                {errors.status && <p className="text-xs font-bold text-rose-500 mt-1 ml-1">{errors.status}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <User className="size-4 text-indigo-500" />
                                    <span>Assigned Operational Agent</span>
                                </label>
                                <select
                                    className={`w-full px-4 py-4 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-bold text-slate-700 appearance-none cursor-pointer ${errors.assigned_user ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'}`}
                                    value={formData.assigned_user}
                                    onChange={(e) => setFormData({ ...formData, assigned_user: e.target.value })}
                                >
                                    <option value="">Unassigned</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                                {errors.assigned_user && <p className="text-xs font-bold text-rose-500 mt-1 ml-1">{errors.assigned_user}</p>}
                            </div>
                        </div>
                    </section>

                    <footer className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => router.push("/tasks")}
                            className="w-full sm:w-auto px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-700 transition-all hover:bg-slate-50 rounded-xl text-center"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={submitting}
                            type="submit"
                            className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-slate-900 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 group disabled:opacity-70"
                        >
                            {submitting ? (
                                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Save className="size-5 group-hover:scale-110 transition-all" />
                                    <span>Sync Record</span>
                                </>
                            )}
                        </button>
                    </footer>
                </div>
            </form>
        </div>
    );
}
