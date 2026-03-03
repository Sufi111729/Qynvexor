import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/SEO";
import { SITE_URL } from "../config/site";
import { breadcrumbSchema } from "../utils/content";

const crumbs = [
  { label: "Home", to: "/" },
  { label: "Privacy Policy" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14 prose">
      <SEO
        title="Privacy Policy"
        description="Privacy policy template for Qynvexor Technologies."
        path="/privacy-policy"
        structuredData={[breadcrumbSchema(crumbs, SITE_URL)]}
      />
      <Breadcrumbs items={crumbs} />
      <h1>Privacy Policy</h1>
      <p>This template explains how Qynvexor Technologies collects, uses, and protects user information.</p>
      <h2>Information We Collect</h2>
      <p>We may collect contact details, usage analytics, and service interaction data necessary for product operations.</p>
      <h2>How We Use Information</h2>
      <p>Information is used to provide services, support requests, improve performance, and maintain security.</p>
      <h2>Data Retention</h2>
      <p>Data is retained only as needed for service delivery, legal requirements, and operational integrity.</p>
      <h2>Contact</h2>
      <p>For privacy-related requests, contact hello@qynvexor.com.</p>
    </div>
  );
}
