export default function Card({ children, className = "" }) {
  return (
    <article className={`rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-soft ${className}`}>
      {children}
    </article>
  );
}
