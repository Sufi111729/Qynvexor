import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { loginAdmin, isAdminAuthenticated } from "../lib/blogStorage";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAdminAuthenticated()) {
    navigate("/admin/dashboard", { replace: true });
    return null;
  }

  function onSubmit(event) {
    event.preventDefault();
    setError("");

    const ok = loginAdmin(username.trim(), password);
    if (!ok) {
      setError("Invalid credentials. Use username: admin and password: sufi");
      return;
    }

    const next = location.state?.from === "/admin/dashboard" ? "/admin/dashboard" : "/admin/dashboard";
    navigate(next, { replace: true });
  }

  return (
    <section className="mx-auto max-w-md px-6 py-14">
      <SEO title="Admin Login" description="Qynvexor blog admin login" path="/admin" noindex />
      <h1 className="text-3xl font-bold text-white">Admin Login</h1>
      <p className="mt-2 text-slate-300">Sign in to manage blog posts.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <label className="block text-sm text-slate-200">
          Username
          <input
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label className="block text-sm text-slate-200">
          Password
          <input
            type="password"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error ? <p className="rounded-lg border border-rose-500/40 bg-rose-950/40 p-3 text-sm text-rose-200">{error}</p> : null}

        <button
          type="submit"
          className="w-full rounded-lg bg-sky-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-sky-400"
        >
          Login
        </button>
      </form>
    </section>
  );
}
