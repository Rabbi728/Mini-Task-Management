import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:pl-64">
        <Navbar />
        <div className="flex-1 px-8 py-10 mx-auto w-full">
          {children}
        </div>
        <footer className="px-8 py-6 text-sm text-slate-400 font-medium">
          <p>© 2026 MiniApp MS. All rights reserved. Build v1.0.42</p>
        </footer>
      </main>
    </div>
  );
}
