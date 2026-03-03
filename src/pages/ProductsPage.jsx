import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../components/Badge";
import Card from "../components/Card";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { products } from "../data/products";
import { breadcrumbSchema } from "../utils/content";
import { SITE_URL } from "../config/site";

const statuses = ["All", "Live", "Beta", "Coming soon"];
const crumbs = [
  { label: "Home", to: "/" },
  { label: "Products" },
];

export default function ProductsPage() {
  const [activeStatus, setActiveStatus] = useState("All");

  const filtered = useMemo(() => {
    if (activeStatus === "All") return products;
    return products.filter((item) => item.status === activeStatus);
  }, [activeStatus]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <SEO
        title="Products & Tools"
        description="Explore Qynvexor Technologies tools across live, beta, and upcoming product tracks."
        path="/products"
        structuredData={[breadcrumbSchema(crumbs, SITE_URL)]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-4xl font-bold text-white">Products & Tools</h1>
      <p className="mt-3 text-slate-300">Utility-first products for document operations, API workflows, and automation tasks.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeStatus === status
                ? "border-sky-400 bg-sky-500/20 text-sky-100"
                : "border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <Card key={tool.slug}>
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl font-semibold text-white">{tool.name}</h2>
              <Badge tone={tool.status === "Live" ? "success" : tool.status === "Beta" ? "warn" : "default"}>{tool.status}</Badge>
            </div>
            <p className="mt-3 text-slate-300">{tool.summary}</p>
            <Link to={`/products/${tool.slug}`} className="mt-4 inline-block text-sm font-medium text-sky-300 hover:text-sky-200">
              View Tool
            </Link>
          </Card>
        ))}
      </div>

      <section className="mt-14 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-2xl font-semibold text-white">Roadmap</h2>
        <p className="mt-2 text-slate-300">Upcoming updates include broader API automation templates and expanded document utility modules.</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
          <li>Workflow templates and webhook triggers</li>
          <li>Enhanced collaboration features</li>
          <li>Additional export and report formats</li>
        </ul>
      </section>
    </div>
  );
}
