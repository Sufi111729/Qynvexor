import Button from "../components/Button";
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { services } from "../data/services";
import { breadcrumbSchema } from "../utils/content";
import { SITE_URL } from "../config/site";

const crumbs = [
  { label: "Home", to: "/" },
  { label: "Services" },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <SEO
        title="Services"
        description="Web app development, SaaS engineering, API integrations, automation, document utilities, and UX performance optimization services."
        path="/services"
        structuredData={[breadcrumbSchema(crumbs, SITE_URL)]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-4xl font-bold text-white">Services</h1>
      <p className="mt-3 max-w-3xl text-slate-300">Delivery-focused software services tailored to product teams and operational workflows.</p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.id}>
            <SectionHeader title={service.title} description={service.summary} />
            <p className="mt-3 text-slate-300">{service.details}</p>
            <Button to="/contact" className="mt-5">
              Request a Quote
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
