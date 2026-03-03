export function breadcrumbSchema(items, baseUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.to ? `${baseUrl}${item.to}` : undefined,
    })),
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function markdownToBlocks(markdown) {
  const lines = markdown.split("\n");
  const blocks = [];
  let list = [];

  const flushList = () => {
    if (list.length) {
      blocks.push({ type: "list", items: list });
      list = [];
    }
  };

  lines.forEach((raw) => {
    const line = raw.trim();
    if (!line) {
      flushList();
      return;
    }
    if (line.startsWith("## ")) {
      flushList();
      blocks.push({ type: "h2", text: line.replace("## ", "") });
      return;
    }
    if (line.startsWith("### ")) {
      flushList();
      blocks.push({ type: "h3", text: line.replace("### ", "") });
      return;
    }
    if (line.startsWith("- ")) {
      list.push(line.replace("- ", ""));
      return;
    }
    flushList();
    blocks.push({ type: "p", text: line });
  });

  flushList();
  return blocks;
}

export function parseFrontmatter(fileText) {
  const match = fileText.match(/^---([\s\S]*?)---([\s\S]*)$/);
  if (!match) {
    return { meta: {}, content: fileText };
  }

  const metadata = {};
  match[1]
    .trim()
    .split("\n")
    .forEach((line) => {
      const [key, ...rest] = line.split(":");
      metadata[key.trim()] = rest.join(":").trim();
    });

  if (metadata.tags) {
    metadata.tags = metadata.tags.split(",").map((tag) => tag.trim());
  } else {
    metadata.tags = [];
  }

  return {
    meta: metadata,
    content: match[2].trim(),
  };
}
