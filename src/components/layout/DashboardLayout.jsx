import { Outlet, useNavigate } from "react-router-dom";
import { LogOut, ShieldCheck, User } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully");
    // Replace history entry so user cannot return using back button
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight leading-tight">
                Admin Dashboard
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                SEF Academy Portal
              </p>
            </div>
          </div>

          {/* User profile & Logout action */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2.5 text-right">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-none">
                  {user?.username || user?.email || "Administrator"}
                </p>
                <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                  {user?.role || "admin"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-400"
              title="Logout"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area - Supports Nested Routes */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
