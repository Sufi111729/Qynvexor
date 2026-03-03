import Card from "../components/Card";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { SITE_URL } from "../config/site";
import { breadcrumbSchema } from "../utils/content";

const crumbs = [
  { label: "Home", to: "/" },
  { label: "About" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <SEO
        title="About"
        description="Learn about Qynvexor Technologies mission, values, and product engineering focus."
        path="/about"
        structuredData={[breadcrumbSchema(crumbs, SITE_URL)]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-4xl font-bold text-white">About Qynvexor Technologies</h1>
      <p className="mt-3 max-w-3xl text-slate-300">
        We are a software company focused on SaaS, APIs, automation, and document-first web tools.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <Card>
          <h2 className="text-xl font-semibold text-white">Mission</h2>
          <p className="mt-2 text-slate-300">Build reliable software solutions that simplify digital workflows.</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Vision</h2>
          <p className="mt-2 text-slate-300">Create practical, high-performing products that teams trust daily.</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Values</h2>
          <p className="mt-2 text-slate-300">Clarity, technical rigor, user-centered design, and continuous improvement.</p>
        </Card>
      </div>

      <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-2xl font-semibold text-white">Timeline</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
          <li>2024: Started delivering product engineering and utility-focused projects.</li>
          <li>2025: Expanded into SaaS workflows, API integrations, and UX optimization.</li>
          <li>Present: Continuously improving tools, architecture, and delivery quality.</li>
        </ul>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        <Card>
          <h2 className="text-2xl font-semibold text-white">Founder Note</h2>
          <p className="mt-3 text-slate-300">
            Our focus is execution quality. We prioritize clear scope, dependable delivery, and long-term maintainability over unnecessary complexity.
          </p>
        </Card>
        <Card>
          <h2 className="text-2xl font-semibold text-white">Tech Stack Highlights</h2>
          <p className="mt-3 text-slate-300">React, Vite, Tailwind CSS, Node.js, REST APIs, and modern performance tooling.</p>
        </Card>
      </section>
    </div>
  );
}
