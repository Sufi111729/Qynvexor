import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { getPosts } from "../lib/blogStorage";

function isHtmlContent(text) {
  return /<\/?[a-z][\s\S]*>/i.test(String(text || ""));
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPosts().find((item) => item.slug === slug && item.published);

  if (!post) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-14">
        <SEO title="Post Not Found" description="Requested blog post does not exist." path={`/blog/${slug || ""}`} noindex />
        <h1 className="text-3xl font-bold text-white">Post not found</h1>
        <p className="mt-3 text-slate-300">The post may be unpublished or the URL is invalid.</p>
        <Link to="/blog" className="mt-5 inline-block text-sky-300 hover:text-sky-200">
          Back to blog
        </Link>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-14">
      <SEO title={post.title} description={post.excerpt || "Blog post"} path={`/blog/${post.slug}`} type="article" />

      {post.coverUrl ? (
        <img
          src={post.coverUrl}
          alt={post.title}
          className="mb-8 h-64 w-full rounded-2xl border border-slate-800 object-cover md:h-80"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}

      <h1 className="text-4xl font-bold text-white">{post.title}</h1>
      <p className="mt-3 text-sm text-slate-400">Published: {post.publishedAt || "Date unavailable"}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(post.tags || []).map((tag) => (
          <span key={`${post.id}-${tag}`} className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-300">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-slate-200">
        {isHtmlContent(post.content) ? (
          <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <div className="whitespace-pre-wrap leading-7">{post.content}</div>
        )}
      </div>

      <Link to="/blog" className="mt-6 inline-block text-sky-300 hover:text-sky-200">
        Back to blog
      </Link>
    </article>
  );
}
