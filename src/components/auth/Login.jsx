import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (apiError) {
      setApiError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) {
      return;
    }

    try {
      const result = await login(formData.email.trim(), formData.password);
      toast.success(result.message || "Login successfully");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Invalid credentials";
      setApiError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 mb-4 ring-8 ring-indigo-50 dark:ring-indigo-950/40">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Admin Portal
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Sign in with your administrator credentials to access the control panel
        </p>
      </div>

      {/* Global API Error Banner */}
      {apiError && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 dark:bg-red-950/40 p-4 text-sm text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/50"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="font-medium">{apiError}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Mail className="h-5 w-5" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              disabled={loading}
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className={`block w-full rounded-xl border bg-slate-50 dark:bg-slate-800/60 pl-11 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 transition focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-slate-300 dark:border-slate-700 focus:border-indigo-600 focus:ring-indigo-600/20"
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Lock className="h-5 w-5" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              disabled={loading}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`block w-full rounded-xl border bg-slate-50 dark:bg-slate-800/60 pl-11 pr-11 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 transition focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-slate-300 dark:border-slate-700 focus:border-indigo-600 focus:ring-indigo-600/20"
              }`}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={loading}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white py-2.5 px-4 text-sm font-semibold shadow-sm shadow-indigo-600/30 transition focus:outline-none focus:ring-2 focus:ring-indigo-600/40 disabled:cursor-not-allowed disabled:opacity-70 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Logging in...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
