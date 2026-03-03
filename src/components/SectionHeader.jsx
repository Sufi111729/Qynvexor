export default function SectionHeader({ eyebrow, title, description, align = "left" }) {
  return (
    <header className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? <p className="mb-2 text-xs uppercase tracking-[0.25em] text-sky-300">{eyebrow}</p> : null}
      <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
      {description ? <p className="mt-3 max-w-3xl text-slate-300">{description}</p> : null}
    </header>
  );
}
