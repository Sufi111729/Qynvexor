import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Badge from "../components/Badge";
import SectionHeader from "../components/SectionHeader";
import SEO from "../components/SEO";
import FAQ from "../components/FAQ";
import { services } from "../data/services";
import { products } from "../data/products";
import { SITE_URL } from "../config/site";
import { faqSchema } from "../utils/content";

const homeFaqs = [
  {
    question: "What does Qynvexor Technologies build?",
    answer: "We build SaaS products, document tools, API workflows, and performance-focused web apps.",
  },
  {
    question: "Do you support existing products?",
    answer: "Yes. We can improve existing codebases with UX and performance optimization plans.",
  },
  {
    question: "Can you start with a small scope?",
    answer: "Yes. We typically start with discovery and phased delivery.",
  },
  {
    question: "Is there a consultation process?",
    answer: "Yes. Contact us with project context and we will respond with next steps.",
  },
];

export default function HomePage() {
  return (
    <>
      <SEO
        title="Software, SaaS & Web Utilities"
        description="Qynvexor Technologies builds modern SaaS apps, web utilities, and API automation products."
        path="/"
        structuredData={[faqSchema(homeFaqs)]}
      />

      <section className="mx-auto max-w-6xl px-6 pb-14 pt-16 md:pt-24">
        <div className="grid items-center gap-8 rounded-3xl border border-slate-800 bg-hero-grid bg-[size:18px_18px] p-8 md:grid-cols-2 md:p-12">
          <div>
            <Badge>Modern Product Engineering</Badge>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Build reliable software products with Qynvexor Technologies
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-300">
              We design and ship SaaS applications, API-driven systems, and document tooling with strong UX and technical SEO foundations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/services">Explore Services</Button>
              <Button to="/contact" variant="secondary">
                Contact
              </Button>
            </div>
          </div>
          <img
            src="/hero-utility.svg"
            alt="Illustration of Qynvexor Technologies software product dashboard"
            loading="lazy"
            className="w-full rounded-xl border border-slate-700"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-4">
          <p className="text-center text-sm font-medium text-sky-200">Building and improving since 2024</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <SectionHeader eyebrow="Services" title="What we deliver" description="From planning to support, we build systems that are secure, scalable, and user-friendly." />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id}>
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-slate-300">{service.summary}</p>
              <Link to="/services" className="mt-4 inline-block text-sm font-medium text-sky-300 hover:text-sky-200">
                Learn more
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <SectionHeader eyebrow="Products" title="Featured tools" description="Practical utilities built for document workflows, integrations, and automation use cases." />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {products.map((tool) => (
            <Card key={tool.slug}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                <Badge tone={tool.status === "Live" ? "success" : tool.status === "Beta" ? "warn" : "default"}>{tool.status}</Badge>
              </div>
              <p className="mt-3 text-slate-300">{tool.summary}</p>
              <Link to={`/products/${tool.slug}`} className="mt-4 inline-block text-sm font-medium text-sky-300 hover:text-sky-200">
                View details
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <SectionHeader eyebrow="Why us" title="Built for outcomes" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Security-aware", "Safer workflows with validation, access control, and dependable handling."],
            ["Fast delivery", "Lean execution model with milestones and continuous updates."],
            ["Clean UX", "Readable interfaces that reduce friction and cognitive overload."],
            ["Scalable foundations", "Architecture decisions that support future growth."],
          ].map(([title, copy]) => (
            <Card key={title}>
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-300">{copy}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <SectionHeader eyebrow="Process" title="Discover -> Build -> Launch -> Support" />
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {["Discover", "Build", "Launch", "Support"].map((step, idx) => (
            <Card key={step}>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">Step {idx + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{step}</h3>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mt-8">
          <FAQ faqs={homeFaqs} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-4">
        <Card className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Start your next product milestone</h2>
            <p className="mt-2 text-slate-300">Talk to Qynvexor Technologies about your roadmap and execution goals.</p>
          </div>
          <Button to="/contact">Contact Us</Button>
        </Card>
      </section>
    </>
  );
}
