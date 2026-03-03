export default function Badge({ children, tone = "default" }) {
  const styles =
    tone === "success"
      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
      : tone === "warn"
        ? "bg-amber-500/15 text-amber-300 border-amber-500/40"
        : "bg-sky-500/15 text-sky-300 border-sky-500/40";

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles}`}>{children}</span>;
}
