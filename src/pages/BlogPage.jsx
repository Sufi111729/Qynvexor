import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { getAllPosts, getCategories, getTags } from "../data/blog";
import { SITE_URL } from "../config/site";
import { breadcrumbSchema } from "../utils/content";

const crumbs = [
  { label: "Home", to: "/" },
  { label: "Blog" },
];

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();
  const tags = getTags();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState("All");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const categoryMatch = activeCategory === "All" || post.category === activeCategory;
      const tagMatch = activeTag === "All" || post.tags?.includes(activeTag);
      const query = search.toLowerCase();
      const textMatch =
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query);
      return categoryMatch && tagMatch && textMatch;
    });
  }, [activeCategory, activeTag, posts, search]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <SEO
        title="Blog"
        description="SEO, performance, document tooling, and secure product engineering insights."
        path="/blog"
        structuredData={[breadcrumbSchema(crumbs, SITE_URL)]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-4xl font-bold text-white">Blog</h1>
      <p className="mt-3 text-slate-300">Practical articles on technical SEO, performance, and utility-first product engineering.</p>

      <div className="mt-8 grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 md:grid-cols-3">
        <label className="text-sm text-slate-200">
          Search posts
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            placeholder="Search by keyword"
          />
        </label>

        <label className="text-sm text-slate-200">
          Category
          <select
            value={activeCategory}
            onChange={(event) => setActiveCategory(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          >
            <option>All</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>

        <label className="text-sm text-slate-200">
          Tag
          <select
            value={activeTag}
            onChange={(event) => setActiveTag(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          >
            <option>All</option>
            {tags.map((tag) => (
              <option key={tag}>{tag}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Card key={post.slug}>
            <p className="text-xs uppercase tracking-wide text-sky-300">{post.category}</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{post.title}</h2>
            <p className="mt-2 text-sm text-slate-400">{post.date}</p>
            <p className="mt-3 text-slate-300">{post.description}</p>
            <Link to={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-medium text-sky-300 hover:text-sky-200">
              Read article
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
