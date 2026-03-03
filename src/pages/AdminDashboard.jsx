import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { getPosts, logoutAdmin, removePost, savePosts } from "../lib/blogStorage";
import { slugify } from "../lib/slugify";

function nowIso() {
  return new Date().toISOString();
}

function todayYmd() {
  return new Date().toISOString().slice(0, 10);
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function parseTags(value) {
  return String(value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function ensureUniqueSlug(base, posts, ignoreId = "") {
  const cleanBase = slugify(base) || "untitled-post";
  let candidate = cleanBase;
  let counter = 1;

  while (posts.some((p) => p.slug === candidate && p.id !== ignoreId)) {
    counter += 1;
    candidate = `${cleanBase}-${counter}`;
  }

  return candidate;
}

function sortByDate(posts) {
  return [...posts].sort((a, b) => {
    const da = a.publishedAt || "";
    const db = b.publishedAt || "";
    return db.localeCompare(da);
  });
}

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverUrl: "",
  tagsInput: "",
  publishedAt: todayYmd(),
  published: true,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(() => sortByDate(getPosts()));
  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState("");
  const [editForm, setEditForm] = useState(null);
  const [editSlugTouched, setEditSlugTouched] = useState(false);

  const postCount = useMemo(() => posts.length, [posts]);

  function updatePosts(next) {
    const sorted = sortByDate(next);
    setPosts(sorted);
    savePosts(sorted);
  }

  function onCreateTitleChange(value) {
    if (!slugTouched) {
      const unique = ensureUniqueSlug(value, posts);
      setForm((prev) => ({ ...prev, title: value, slug: unique }));
      return;
    }
    setForm((prev) => ({ ...prev, title: value }));
  }

  function onCreateSlugChange(value) {
    const candidate = slugify(value);
    setSlugTouched(true);
    setForm((prev) => ({ ...prev, slug: candidate }));
  }

  function onCreateSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    const desired = form.slug || slugify(form.title);
    const uniqueSlug = ensureUniqueSlug(desired, posts);
    if (uniqueSlug !== desired) {
      setError(`Slug already exists. Using '${uniqueSlug}' instead.`);
    }

    const next = {
      id: uid(),
      title: form.title.trim(),
      slug: uniqueSlug,
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      coverUrl: form.coverUrl.trim(),
      tags: parseTags(form.tagsInput),
      publishedAt: form.publishedAt || todayYmd(),
      updatedAt: nowIso(),
      published: Boolean(form.published),
    };

    updatePosts([next, ...posts]);
    setForm(emptyForm);
    setSlugTouched(false);
  }

  function onDelete(id) {
    if (!window.confirm("Delete this post?")) return;
    const next = removePost(id);
    setPosts(sortByDate(next));
    if (editId === id) {
      setEditId("");
      setEditForm(null);
      setEditSlugTouched(false);
    }
  }

  function startEdit(post) {
    setEditId(post.id);
    setEditSlugTouched(false);
    setEditForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverUrl: post.coverUrl,
      tagsInput: (post.tags || []).join(", "),
      publishedAt: post.publishedAt || todayYmd(),
      published: Boolean(post.published),
    });
  }

  function onEditTitleChange(value) {
    if (!editForm) return;
    if (!editSlugTouched) {
      const unique = ensureUniqueSlug(value, posts, editId);
      setEditForm((prev) => ({ ...prev, title: value, slug: unique }));
      return;
    }
    setEditForm((prev) => ({ ...prev, title: value }));
  }

  function onEditSlugChange(value) {
    if (!editForm) return;
    setEditSlugTouched(true);
    setEditForm((prev) => ({ ...prev, slug: slugify(value) }));
  }

  function saveEdit() {
    if (!editForm || !editId) return;
    if (!editForm.title.trim()) {
      setError("Edit failed: title is required.");
      return;
    }

    const desired = editForm.slug || slugify(editForm.title);
    const uniqueSlug = ensureUniqueSlug(desired, posts, editId);

    const next = posts.map((post) => {
      if (post.id !== editId) return post;
      return {
        ...post,
        title: editForm.title.trim(),
        slug: uniqueSlug,
        excerpt: editForm.excerpt.trim(),
        content: editForm.content.trim(),
        coverUrl: editForm.coverUrl.trim(),
        tags: parseTags(editForm.tagsInput),
        publishedAt: editForm.publishedAt || todayYmd(),
        updatedAt: nowIso(),
        published: Boolean(editForm.published),
      };
    });

    updatePosts(next);
    setEditId("");
    setEditForm(null);
    setEditSlugTouched(false);
  }

  function onLogout() {
    logoutAdmin();
    navigate("/admin", { replace: true });
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <SEO title="Admin Dashboard" description="Manage blog content" path="/admin/dashboard" noindex />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Blog Admin Dashboard</h1>
          <p className="mt-2 text-slate-300">Create, edit, and publish posts. Total posts: {postCount}</p>
        </div>
        <button onClick={onLogout} className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800">
          Logout
        </button>
      </div>

      {error ? <div className="mb-6 rounded-lg border border-amber-500/40 bg-amber-950/40 p-3 text-amber-200">{error}</div> : null}

      <form onSubmit={onCreateSubmit} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="text-xl font-semibold text-white">Create Post</h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-200">
            Title
            <input
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              value={form.title}
              onChange={(e) => onCreateTitleChange(e.target.value)}
              required
            />
          </label>

          <label className="text-sm text-slate-200">
            Slug
            <input
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              value={form.slug}
              onChange={(e) => onCreateSlugChange(e.target.value)}
              required
            />
          </label>

          <label className="text-sm text-slate-200 md:col-span-2">
            Excerpt
            <textarea
              rows={2}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              value={form.excerpt}
              onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
            />
          </label>

          <label className="text-sm text-slate-200 md:col-span-2">
            Content
            <textarea
              rows={8}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              required
            />
          </label>

          <label className="text-sm text-slate-200">
            Cover URL
            <input
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              value={form.coverUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, coverUrl: e.target.value }))}
              placeholder="https://..."
            />
          </label>

          <label className="text-sm text-slate-200">
            Tags (comma separated)
            <input
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              value={form.tagsInput}
              onChange={(e) => setForm((prev) => ({ ...prev, tagsInput: e.target.value }))}
              placeholder="react, vite, tailwind"
            />
          </label>

          <label className="text-sm text-slate-200">
            Published Date
            <input
              type="date"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              value={form.publishedAt}
              onChange={(e) => setForm((prev) => ({ ...prev, publishedAt: e.target.value }))}
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-200 md:mt-7">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
            />
            Published
          </label>
        </div>

        <button type="submit" className="mt-5 rounded-lg bg-sky-500 px-4 py-2 font-medium text-slate-950 hover:bg-sky-400">
          Save Post
        </button>
      </form>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-slate-300">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-slate-300">
                    No posts yet.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="border-t border-slate-800 text-slate-200">
                    <td className="px-4 py-3">{post.title}</td>
                    <td className="px-4 py-3 text-slate-400">{post.slug}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs ${post.published ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{post.publishedAt || "-"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(post)} className="rounded border border-slate-600 px-2 py-1 hover:bg-slate-800">
                          Edit
                        </button>
                        <button onClick={() => onDelete(post.id)} className="rounded border border-rose-700 px-2 py-1 text-rose-200 hover:bg-rose-950/40">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editForm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Edit Post</h3>
              <button onClick={() => setEditForm(null)} className="rounded border border-slate-700 px-3 py-1 text-sm text-slate-300 hover:bg-slate-800">
                Close
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Title
                <input
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
                  value={editForm.title}
                  onChange={(e) => onEditTitleChange(e.target.value)}
                />
              </label>

              <label className="text-sm text-slate-200">
                Slug
                <input
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
                  value={editForm.slug}
                  onChange={(e) => onEditSlugChange(e.target.value)}
                />
              </label>

              <label className="text-sm text-slate-200 md:col-span-2">
                Excerpt
                <textarea
                  rows={2}
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
                  value={editForm.excerpt}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                />
              </label>

              <label className="text-sm text-slate-200 md:col-span-2">
                Content
                <textarea
                  rows={8}
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
                  value={editForm.content}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, content: e.target.value }))}
                />
              </label>

              <label className="text-sm text-slate-200">
                Cover URL
                <input
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
                  value={editForm.coverUrl}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, coverUrl: e.target.value }))}
                />
              </label>

              <label className="text-sm text-slate-200">
                Tags
                <input
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
                  value={editForm.tagsInput}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, tagsInput: e.target.value }))}
                />
              </label>

              <label className="text-sm text-slate-200">
                Published Date
                <input
                  type="date"
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
                  value={editForm.publishedAt}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, publishedAt: e.target.value }))}
                />
              </label>

              <label className="flex items-center gap-2 text-sm text-slate-200 md:mt-7">
                <input
                  type="checkbox"
                  checked={editForm.published}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, published: e.target.checked }))}
                />
                Published
              </label>
            </div>

            <button onClick={saveEdit} className="mt-6 rounded-lg bg-sky-500 px-4 py-2 font-medium text-slate-950 hover:bg-sky-400">
              Update Post
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
