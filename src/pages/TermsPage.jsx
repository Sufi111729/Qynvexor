import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/SEO";
import { SITE_URL } from "../config/site";
import { breadcrumbSchema } from "../utils/content";

const crumbs = [
  { label: "Home", to: "/" },
  { label: "Terms of Service" },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14 prose">
      <SEO
        title="Terms of Service"
        description="Terms of service template for Qynvexor Technologies."
        path="/terms-of-service"
        structuredData={[breadcrumbSchema(crumbs, SITE_URL)]}
      />
      <Breadcrumbs items={crumbs} />
      <h1>Terms of Service</h1>
      <p>These terms govern use of websites, tools, and related services operated by Qynvexor Technologies.</p>
      <h2>Use of Services</h2>
      <p>Users agree to lawful use, accurate submissions, and responsible access to platform features.</p>
      <h2>Intellectual Property</h2>
      <p>All content, branding, and software components remain the property of Qynvexor Technologies unless stated otherwise.</p>
      <h2>Limitation of Liability</h2>
      <p>Services are provided on an as-available basis and liability is limited to the extent permitted by law.</p>
      <h2>Updates</h2>
      <p>Terms may be revised over time. Continued use indicates acceptance of updates.</p>
    </div>
  );
}
