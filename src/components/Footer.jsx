import { Link } from "react-router-dom";
import { BUSINESS_EMAIL } from "../config/site";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <img
            src="/logo-qynvexor-wordmark.svg"
            alt="Qynvexor Technologies"
            className="h-10 w-auto"
            loading="lazy"
          />
          <p className="mt-2 text-sm text-slate-400">
            Building and improving software products and web utilities since 2024.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-200">Quick Links</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <Link to="/services" className="hover:text-white">
              Services
            </Link>
            <Link to="/products" className="hover:text-white">
              Products
            </Link>
            <Link to="/blog" className="hover:text-white">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-200">Legal</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <p>Email: {BUSINESS_EMAIL}</p>
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
      <p className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        Copyright {new Date().getFullYear()} Qynvexor Technologies. All rights reserved.
      </p>
    </footer>
  );
}
