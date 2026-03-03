const BLOG_POSTS_KEY = "qynvexor_blog_posts_v1";
const BLOG_AUTH_KEY = "qynvexor_blog_auth_v1";

function nowIso() {
  return new Date().toISOString();
}

function todayYmd() {
  return new Date().toISOString().slice(0, 10);
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function safeParse(value, fallback) {
  try {
    if (!value) return fallback;
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function seedPosts() {
  const ts = nowIso();
  return [
    {
      id: makeId(),
      title: "How We Fixed Spring Boot Cold Starts on Free Hosting",
      slug: "fix-spring-boot-cold-starts-free-hosting",
      excerpt: "A real production issue with slow first request and restart loops, and how we stabilized it.",
      content:
        "Problem: very slow first request and random restarts on low-memory free hosting.\n\nRoot cause: default JVM and DB pool settings were too heavy for container limits.\n\nFix: reduced Hikari pool size, tuned JVM RAM flags, and improved readiness checks.",
      coverUrl: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80",
      tags: ["spring-boot", "performance", "deployment"],
      publishedAt: todayYmd(),
      updatedAt: ts,
      published: true,
    },
    {
      id: makeId(),
      title: "Technical SEO for SaaS: The 2026 Checklist",
      slug: "technical-seo-for-saas-2026-checklist",
      excerpt: "A practical framework to improve crawlability, speed, and conversion-focused pages.",
      content:
        "Start with site architecture, then optimize Core Web Vitals, internal linking, and structured data.\n\nMeasure pipeline impact, not only rankings.",
      coverUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
      tags: ["seo", "saas", "web-dev"],
      publishedAt: todayYmd(),
      updatedAt: ts,
      published: true,
    },
  ];
}

function normalizePost(raw) {
  const post = raw || {};
  return {
    id: String(post.id || makeId()),
    title: String(post.title || "Untitled"),
    slug: String(post.slug || "untitled"),
    excerpt: String(post.excerpt || ""),
    content: String(post.content || ""),
    coverUrl: String(post.coverUrl || ""),
    tags: Array.isArray(post.tags) ? post.tags.filter((t) => typeof t === "string") : [],
    publishedAt: String(post.publishedAt || todayYmd()),
    updatedAt: String(post.updatedAt || nowIso()),
    published: Boolean(post.published),
  };
}

export function getPosts() {
  const raw = localStorage.getItem(BLOG_POSTS_KEY);
  const parsed = safeParse(raw, []);

  if (!Array.isArray(parsed) || parsed.length === 0) {
    const seeded = seedPosts();
    localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(seeded));
    return seeded;
  }

  return parsed.map(normalizePost);
}

export function savePosts(posts) {
  const normalized = Array.isArray(posts) ? posts.map(normalizePost) : [];
  localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(normalized));
  return normalized;
}

export function upsertPost(post) {
  const next = normalizePost(post);
  const posts = getPosts();
  const index = posts.findIndex((p) => p.id === next.id);

  if (index >= 0) posts[index] = next;
  else posts.unshift(next);

  return savePosts(posts);
}

export function removePost(id) {
  const posts = getPosts();
  const filtered = posts.filter((p) => p.id !== id);
  return savePosts(filtered);
}

export function getPostBySlug(slug) {
  if (!slug) return null;
  return getPosts().find((p) => p.slug === slug) || null;
}

export function isAdminAuthenticated() {
  const auth = safeParse(localStorage.getItem(BLOG_AUTH_KEY), { loggedIn: false });
  return Boolean(auth?.loggedIn);
}

export function loginAdmin(username, password) {
  const ok = username === "admin" && password === "sufi";
  if (ok) {
    localStorage.setItem(BLOG_AUTH_KEY, JSON.stringify({ loggedIn: true, at: nowIso() }));
  }
  return ok;
}

export function logoutAdmin() {
  localStorage.removeItem(BLOG_AUTH_KEY);
}
