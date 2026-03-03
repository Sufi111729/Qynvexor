import compressPdfRaw from "../content/blog/how-to-compress-pdf-without-losing-quality.md?raw";
import fastWebRaw from "../content/blog/best-practices-fast-web-apps-vite-tailwind.md?raw";
import seoBasicsRaw from "../content/blog/seo-basics-for-saas-tools.md?raw";
import imageResizeRaw from "../content/blog/image-resize-for-government-forms.md?raw";
import secureFilesRaw from "../content/blog/secure-file-handling-on-the-web.md?raw";
import cwvRaw from "../content/blog/how-to-improve-core-web-vitals.md?raw";
import saasSeo2026Raw from "../content/blog/saas-seo-strategy-in-2026.md?raw";
import { parseFrontmatter } from "../utils/content";

const rawPosts = [
  ["how-to-compress-pdf-without-losing-quality", compressPdfRaw],
  ["best-practices-fast-web-apps-vite-tailwind", fastWebRaw],
  ["seo-basics-for-saas-tools", seoBasicsRaw],
  ["image-resize-for-government-forms", imageResizeRaw],
  ["secure-file-handling-on-the-web", secureFilesRaw],
  ["how-to-improve-core-web-vitals", cwvRaw],
  ["saas-seo-strategy-2026-web-development-growth", saasSeo2026Raw],
];

const posts = rawPosts
  .map(([slug, raw]) => {
    const { meta, content } = parseFrontmatter(raw);
    return { slug, ...meta, content };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

export function getCategories() {
  return [...new Set(posts.map((post) => post.category))];
}

export function getTags() {
  return [...new Set(posts.flatMap((post) => post.tags || []))];
}
