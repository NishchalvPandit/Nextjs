export const CATEGORIES = [
  { label: "AI", slug: "ai" },
  { label: "Business", slug: "business" },
  { label: "Entertainment", slug: "entertainment" },
  { label: "Gen Z", slug: "gen-z" },
  { label: "Health", slug: "health" },
  { label: "India", slug: "india" },
  { label: "Nepal", slug: "nepal" },
  { label: "More", slug: "more" },
  { label: "Sports", slug: "sports" },
  { label: "Technology", slug: "technology" },
];

export const CATEGORY_SLUGS = new Set(CATEGORIES.map((c) => c.slug));

export function getCategoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}
