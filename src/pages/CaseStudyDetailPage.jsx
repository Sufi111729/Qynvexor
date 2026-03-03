import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { caseStudies } from "../data/caseStudies";
import { SITE_URL } from "../config/site";
import { breadcrumbSchema } from "../utils/content";

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-bold text-white">Case study not found</h1>
        <Link to="/case-studies" className="mt-4 inline-block text-sky-300 hover:text-sky-200">
          Back to case studies
        </Link>
      </div>
    );
  }

  const crumbs = [
    { label: "Home", to: "/" },
    { label: "Case Studies", to: "/case-studies" },
    { label: study.title },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <SEO
        title={study.title}
        description={study.problem}
        path={`/case-studies/${study.slug}`}
        type="article"
        structuredData={[breadcrumbSchema(crumbs, SITE_URL)]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-4xl font-bold text-white">{study.title}</h1>
      <p className="mt-2 text-sm uppercase tracking-wide text-amber-300">Sample case study template</p>

      <div className="mt-8 grid gap-5">
        <Card>
          <h2 className="text-2xl font-semibold text-white">Problem</h2>
          <p className="mt-3 text-slate-300">{study.problem}</p>
        </Card>
        <Card>
          <h2 className="text-2xl font-semibold text-white">Solution</h2>
          <p className="mt-3 text-slate-300">{study.solution}</p>
        </Card>
        <Card>
          <h2 className="text-2xl font-semibold text-white">Stack</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
            {study.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-2xl font-semibold text-white">Outcome</h2>
          <p className="mt-3 text-slate-300">{study.outcome}</p>
        </Card>
      </div>
    </div>
  );
}
