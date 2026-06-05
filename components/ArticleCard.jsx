import { formatPublishedAt } from "@/lib/news";

export default function ArticleCard({ article, featured = false }) {
  const { title, description, url, urlToImage, source, publishedAt } = article;

  return (
    <article
      className={`overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 ${
        featured ? "sm:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col"
      >
        {urlToImage && (
          <div
            className={`relative w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 ${
              featured ? "aspect-[16/9]" : "aspect-video"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlToImage}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className={`flex flex-1 flex-col ${featured ? "p-6" : "p-4"}`}>
          <p className="text-xs font-medium uppercase tracking-wider text-red-600">
            {source?.name ?? "News"}
          </p>
          <h2
            className={`mt-2 font-serif font-bold leading-snug text-zinc-900 transition-colors group-hover:text-red-600 dark:text-white dark:group-hover:text-red-500 ${
              featured ? "text-2xl sm:text-3xl" : "text-lg"
            }`}
          >
            {title}
          </h2>
          {description && (
            <p
              className={`mt-2 line-clamp-3 text-zinc-600 dark:text-zinc-400 ${
                featured ? "text-base" : "text-sm"
              }`}
            >
              {description}
            </p>
          )}
          {publishedAt && (
            <time
              dateTime={publishedAt}
              className="mt-auto pt-3 text-xs text-zinc-500 dark:text-zinc-500"
            >
              {formatPublishedAt(publishedAt)}
            </time>
          )}
        </div>
      </a>
    </article>
  );
}
