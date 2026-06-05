const NEWS_API_BASE = "https://newsapi.org/v2";

/** How each site category maps to News API top-headlines or everything. */
const SLUG_NEWS_CONFIG = {
  ai: { endpoint: "everything", q: "artificial intelligence" },
  business: { endpoint: "top-headlines", category: "business" },
  entertainment: { endpoint: "top-headlines", category: "entertainment" },
  "gen-z": { endpoint: "everything", q: "Gen Z" },
  health: { endpoint: "top-headlines", category: "health" },
  india: { endpoint: "top-headlines", country: "in" },
  nepal: { endpoint: "everything", q: "Nepal" },
  more: { endpoint: "top-headlines", category: "general" },
  sports: { endpoint: "top-headlines", category: "sports" },
  technology: { endpoint: "top-headlines", category: "technology" },
};

function getApiKey() {
  return process.env.NEWS_API_KEY;
}

function buildNewsUrl(slug, pageSize) {
  const config = SLUG_NEWS_CONFIG[slug];
  if (!config) return null;

  const params = new URLSearchParams({
    pageSize: String(pageSize),
    language: "en",
  });

  if (config.endpoint === "top-headlines") {
    if (config.category) params.set("category", config.category);
    if (config.country) params.set("country", config.country);
    else if (!config.category) params.set("country", "us");
    return `${NEWS_API_BASE}/top-headlines?${params}`;
  }

  params.set("q", config.q);
  params.set("sortBy", "publishedAt");
  return `${NEWS_API_BASE}/everything?${params}`;
}

export async function fetchNewsBySlug(slug, { pageSize = 12 } = {}) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return { articles: [], error: "News API key is not configured." };
  }

  const url = buildNewsUrl(slug, pageSize);
  if (!url) {
    return { articles: [], error: "Unknown category." };
  }

  try {
    const res = await fetch(url, {
      headers: { "X-Api-Key": apiKey },
      next: { revalidate: 300 },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        articles: [],
        error: data.message || "Failed to load news.",
      };
    }

    const articles = (data.articles ?? []).filter(
      (a) => a.title && a.title !== "[Removed]" && a.url
    );

    return { articles, error: null };
  } catch {
    return { articles: [], error: "Could not reach the news service." };
  }
}

export async function fetchTopHeadlines({ pageSize = 8 } = {}) {
  return fetchNewsBySlug("more", { pageSize });
}

export function formatPublishedAt(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
