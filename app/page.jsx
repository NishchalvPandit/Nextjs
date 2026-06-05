import Link from "next/link";
import ArticleList from "@/components/ArticleList";
import { CATEGORIES } from "@/lib/categories";
import { fetchTopHeadlines } from "@/lib/news";

export const revalidate = 300;

export default async function Home() {
  const { articles, error } = await fetchTopHeadlines({ pageSize: 7 });

  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <section className="border-b border-zinc-200 pb-10 dark:border-zinc-800">
        <p className="text-sm font-medium uppercase tracking-wider text-red-600">
          Breaking
        </p>
        <h1 className="mt-2 max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
          Your source for headlines that matter
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Browse by category to explore the latest news across AI, business,
          entertainment, and more.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Top headlines
        </h2>
        <ArticleList articles={articles} error={error} />
      </section>

      <section className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Categories
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map(({ label, slug }) => (
            <li key={slug}>
              <Link
                href={`/${slug}`}
                className="block rounded-lg border border-zinc-200 bg-white px-4 py-3 font-medium text-zinc-900 transition-colors hover:border-red-200 hover:bg-red-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:border-red-900 dark:hover:bg-red-950/40"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
