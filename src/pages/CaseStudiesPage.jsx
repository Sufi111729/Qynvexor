import { Link } from "react-router-dom";
import Card from "../components/Card";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { caseStudies } from "../data/caseStudies";
import { SITE_URL } from "../config/site";
import { breadcrumbSchema } from "../utils/content";

const crumbs = [
  { label: "Home", to: "/" },
  { label: "Case Studies" },
];

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <SEO
        title="Case Studies"
        description="Sample implementation stories showing approach, stack, and outcomes for web products and tooling."
        path="/case-studies"
        structuredData={[breadcrumbSchema(crumbs, SITE_URL)]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-4xl font-bold text-white">Case Studies / Work</h1>
      <p className="mt-3 text-slate-300">Sample templates that demonstrate how we approach problems and implementation strategy.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <Card key={study.slug}>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">Sample</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{study.title}</h2>
            <p className="mt-2 text-sm text-slate-300">Industry: {study.industry}</p>
            <p className="mt-3 text-slate-300">{study.problem}</p>
            <Link to={`/case-studies/${study.slug}`} className="mt-4 inline-block text-sm font-medium text-sky-300 hover:text-sky-200">
              Read case study
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
