"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { History, User, Calendar, Loader2, Info } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface ActivityLog {
  id: number;
  uuid: string;
  record_type: string;
  details: string;
  created_at: string;
  users?: {
    name: string;
    email: string;
  };
}

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/activity-logs`, { withCredentials: true });
        setLogs(response.data);
      } catch (err) {
        setError("Failed to load activity logs.");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Activity Logs</h1>
        <p className="text-slate-500 mt-1 font-medium">Track all operations and system modifications in real-time.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Operation</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Initiated By</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="size-8 text-indigo-500 animate-spin" />
                      <p className="text-sm font-medium text-slate-500">Retrieving system logs...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-rose-500">{error}</p>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-slate-500">No activity logs recorded yet.</p>
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                          <History className="size-4 text-indigo-600" />
                        </div>
                        <span className="text-sm font-bold text-slate-900 uppercase">
                          {log.record_type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2 max-w-md">
                         <Info className="size-4 text-slate-300 mt-0.5 shrink-0" />
                         <p className="text-sm text-slate-600 font-medium leading-relaxed">
                           {log.details}
                         </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="size-7 rounded-full bg-slate-100 flex items-center justify-center">
                          <User className="size-4 text-slate-400" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">
                          {log.users?.name || "System"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar className="size-4" />
                        <span className="text-sm font-medium">
                          {formatDateTime(log.created_at)}
                        </span>
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
