import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/SEO";
import { SITE_URL } from "../config/site";
import { breadcrumbSchema } from "../utils/content";

const crumbs = [
  { label: "Home", to: "/" },
  { label: "Cookie Policy" },
];

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14 prose">
      <SEO
        title="Cookie Policy"
        description="Cookie policy template for Qynvexor Technologies."
        path="/cookie-policy"
        structuredData={[breadcrumbSchema(crumbs, SITE_URL)]}
      />
      <Breadcrumbs items={crumbs} />
      <h1>Cookie Policy</h1>
      <p>This policy outlines how Qynvexor Technologies uses cookies and similar technologies.</p>
      <h2>Essential Cookies</h2>
      <p>These cookies support core functions such as navigation, sessions, and security controls.</p>
      <h2>Analytics Cookies</h2>
      <p>Analytics may be used to understand performance and improve user experience.</p>
      <h2>Managing Cookies</h2>
      <p>You can adjust browser settings to block or remove cookies, though some features may be affected.</p>
    </div>
  );
}
