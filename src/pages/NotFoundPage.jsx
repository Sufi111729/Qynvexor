import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 text-center">
      <SEO title="Page Not Found" description="The requested page could not be found." path="/404" noindex />
      <h1 className="text-4xl font-bold text-white">Page Not Found</h1>
      <p className="mt-4 text-slate-300">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 inline-block text-sky-300 hover:text-sky-200">
        Go to Home
      </Link>
    </div>
  );
}
