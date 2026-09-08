import { useAuth } from "../context/AuthContext";
import { Shield, Key, Mail, UserCheck } from "lucide-react";

const DashboardHome = () => {
  const { user, token } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-medium text-indigo-100 mb-3">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Authenticated Session &bull; Protected Route
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, {user?.username || "Admin"}!
            </h2>
            <p className="text-sm text-indigo-100/90 mt-1 max-w-xl">
              You are signed in as an administrator. The authentication system is active, JWT is stored securely, and role verification is enforced.
            </p>
          </div>
        </div>
      </div>

      {/* Auth State Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Active User Role
              </p>
              <p className="text-sm font-semibold capitalize text-slate-900 dark:text-white">
                {user?.role || "admin"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                User Email
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">
                {user?.email || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                JWT Token Status
              </p>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {token ? "Active & Verified" : "Missing"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
