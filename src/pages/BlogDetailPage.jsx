import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/SEO";
import { getPostBySlug } from "../data/blog";
import { SITE_URL } from "../config/site";
import { breadcrumbSchema, markdownToBlocks } from "../utils/content";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-bold text-white">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-sky-300 hover:text-sky-200">
          Back to blog
        </Link>
      </div>
    );
  }

  const crumbs = [
    { label: "Home", to: "/" },
    { label: "Blog", to: "/blog" },
    { label: post.title },
  ];

  const blocks = markdownToBlocks(post.content);

  return (
    <article className="mx-auto max-w-4xl px-6 py-14">
      <SEO
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        structuredData={[breadcrumbSchema(crumbs, SITE_URL)]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-4xl font-bold text-white">{post.title}</h1>
      <p className="mt-3 text-sm text-slate-400">{post.date}</p>
      <p className="mt-3 text-slate-300">{post.description}</p>

      <div className="prose mt-8 max-w-none text-slate-300">
        {blocks.map((block, index) => {
          if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
          if (block.type === "h3") return <h3 key={index}>{block.text}</h3>;
          if (block.type === "list") {
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }
          return <p key={index}>{block.text}</p>;
        })}
      </div>
    </article>
  );
}
