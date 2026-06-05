import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleList from "@/components/ArticleList";
import { CATEGORY_SLUGS, getCategoryBySlug } from "@/lib/categories";
import { fetchNewsBySlug } from "@/lib/news";

export const revalidate = 300;

export function generateStaticParams() {
  return [...CATEGORY_SLUGS].map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const item = getCategoryBySlug(category);
  if (!item) return { title: "Not Found" };
  return {
    title: `${item.label} News | NewsHeadline`,
    description: `Latest ${item.label} headlines and stories.`,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const item = getCategoryBySlug(category);

  if (!item) {
    notFound();
  }

  const { articles, error } = await fetchNewsBySlug(category);

  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wider text-red-600">
        Category
      </p>
      <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
        {item.label}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        Top stories and breaking news in {item.label}.
      </p>

      <ArticleList articles={articles} error={error} />

      <Link
        href="/"
        className="mt-10 inline-flex text-sm font-medium text-red-600 hover:text-red-700 dark:hover:text-red-500"
      >
        ← Back to home
      </Link>
    </main>
  );
}
