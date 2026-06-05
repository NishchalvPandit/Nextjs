import ArticleCard from "@/components/ArticleCard";

export default function ArticleList({ articles, error }) {
  if (error) {
    return (
      <p className="mt-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
        {error}
      </p>
    );
  }

  if (!articles.length) {
    return (
      <p className="mt-8 text-zinc-600 dark:text-zinc-400">
        No articles available right now. Try again later.
      </p>
    );
  }

  const [featured, ...rest] = articles;

  return (
    <div className="mt-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ArticleCard article={featured} featured />
        {rest.map((article, index) => (
          <ArticleCard
            key={`${article.url}-${index}`}
            article={article}
          />
        ))}
      </div>
    </div>
  );
}
