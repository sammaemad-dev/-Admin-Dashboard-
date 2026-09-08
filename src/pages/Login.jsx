import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/Login";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md flex flex-col items-center">
        <LoginForm />
        <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
          SEF Academy &bull; Admin Dashboard System
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
