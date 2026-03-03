import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { useToast } from "../components/ToastProvider";
import { sendContactMessage } from "../utils/contactApi";
import { SITE_URL } from "../config/site";
import { breadcrumbSchema } from "../utils/content";

const crumbs = [
  { label: "Home", to: "/" },
  { label: "Contact" },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const { notify } = useToast();

  function validate() {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) nextErrors.email = "Valid email is required.";
    if (!form.message.trim() || form.message.trim().length < 10) nextErrors.message = "Message should be at least 10 characters.";
    return nextErrors;
  }

  async function onSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      notify("Please fix form errors and try again.", "error");
      return;
    }

    setLoading(true);
    setStatus("");
    try {
      await sendContactMessage(form);
      setStatus("success");
      setForm(initialForm);
      notify("Your message has been sent.", "success");
    } catch (error) {
      setStatus("error");
      notify(error.message || "Failed to send message.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <SEO
        title="Contact"
        description="Contact Qynvexor Technologies for web, SaaS, and automation development projects."
        path="/contact"
        structuredData={[breadcrumbSchema(crumbs, SITE_URL)]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-4xl font-bold text-white">Contact</h1>
      <p className="mt-3 text-slate-300">Email: hello@qynvexor.com</p>

      <Card className="mt-8">
        <h2 className="text-2xl font-semibold text-white">Send a message</h2>
        <form onSubmit={onSubmit} className="mt-6 grid gap-4" noValidate>
          <label className="text-sm text-slate-200">
            Name
            <input
              aria-label="Name"
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            />
            {errors.name ? <span className="mt-1 block text-xs text-rose-300">{errors.name}</span> : null}
          </label>

          <label className="text-sm text-slate-200">
            Email
            <input
              aria-label="Email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            />
            {errors.email ? <span className="mt-1 block text-xs text-rose-300">{errors.email}</span> : null}
          </label>

          <label className="text-sm text-slate-200">
            Phone (optional)
            <input
              aria-label="Phone"
              type="tel"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            />
          </label>

          <label className="text-sm text-slate-200">
            Message
            <textarea
              aria-label="Message"
              rows="5"
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            />
            {errors.message ? <span className="mt-1 block text-xs text-rose-300">{errors.message}</span> : null}
          </label>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
            {status === "success" ? <span className="text-sm text-emerald-300">Message sent successfully.</span> : null}
            {status === "error" ? <span className="text-sm text-rose-300">Unable to send message.</span> : null}
          </div>
        </form>
      </Card>

      <Card className="mt-6">
        <h2 className="text-xl font-semibold text-white">Backend Options</h2>
        <p className="mt-3 text-slate-300">
          Use `VITE_CONTACT_MODE=mock` for frontend-only mode or `VITE_CONTACT_MODE=api` with the provided Express endpoint at `/api/contact`.
        </p>
      </Card>
    </div>
  );
}
