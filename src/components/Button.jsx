import { Link } from "react-router-dom";

export default function Button({ to, children, variant = "primary", className = "", ...props }) {
  const styles =
    variant === "secondary"
      ? "bg-slate-800 text-slate-100 hover:bg-slate-700"
      : variant === "ghost"
        ? "border border-slate-600 text-slate-200 hover:bg-slate-800"
        : "bg-brand-600 text-white hover:bg-brand-500";

  const base = `inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition ${styles} ${className}`;

  if (to) {
    return (
      <Link to={to} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button className={base} {...props}>
      {children}
    </button>
  );
}
