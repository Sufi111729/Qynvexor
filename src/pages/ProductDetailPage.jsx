import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import FAQ from "../components/FAQ";
import { products } from "../data/products";
import { SITE_URL } from "../config/site";
import { breadcrumbSchema, faqSchema } from "../utils/content";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-bold text-white">Tool not found</h1>
        <p className="mt-3 text-slate-300">The requested tool page does not exist.</p>
        <Link to="/products" className="mt-4 inline-block text-sky-300 hover:text-sky-200">
          Back to products
        </Link>
      </div>
    );
  }

  const crumbs = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: product.name },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <SEO
        title={`${product.name} Tool`}
        description={product.description}
        path={`/products/${product.slug}`}
        type="article"
        structuredData={[breadcrumbSchema(crumbs, SITE_URL), faqSchema(product.faqs)]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-4xl font-bold text-white">{product.name}</h1>
      <p className="mt-3 text-slate-300">{product.description}</p>

      <Card className="mt-8">
        <h2 className="text-2xl font-semibold text-white">Key features</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
          {product.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </Card>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-white">Frequently asked questions</h2>
        <FAQ faqs={product.faqs} />
      </section>
    </div>
  );
}
