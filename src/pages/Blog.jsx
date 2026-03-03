import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { getPosts } from "../lib/blogStorage";

function sortPosts(posts) {
  return [...posts].sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
}

export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const all = getPosts();
      const published = all.filter((post) => post.published);
      setPosts(sortPosts(published));
      setLoading(false);
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <SEO title="Blog" description="Insights on web development, SEO, and SaaS engineering." path="/blog" />

      <h1 className="text-4xl font-bold text-white">Blog</h1>
      <p className="mt-3 text-slate-300">Latest published articles and technical guides.</p>

      {loading ? <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-slate-200">Loading posts...</div> : null}

      {!loading && posts.length === 0 ? (
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-slate-300">
          No published posts yet.
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">
            {post.coverUrl ? (
              <img
                src={post.coverUrl}
                alt={post.title}
                className="h-44 w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : null}

            <div className="p-5">
              <p className="text-xs text-slate-400">{post.publishedAt || "Date unavailable"}</p>
              <h2 className="mt-2 text-xl font-semibold text-white">{post.title}</h2>
              <p className="mt-3 text-sm text-slate-300">{post.excerpt || "No excerpt available."}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {(post.tags || []).map((tag) => (
                  <span key={`${post.id}-${tag}`} className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>

              <Link to={`/blog/${post.slug}`} className="mt-5 inline-block text-sm font-medium text-sky-300 hover:text-sky-200">
                Read post
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
