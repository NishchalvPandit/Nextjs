"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/categories";

function NavLink({ href, label, onNavigate }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-red-600 text-white"
          : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
      <nav
        className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="shrink-0 font-serif text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl"
        >
          <span className="text-red-600">News</span>
          <span className="text-zinc-900 dark:text-white">Headline</span>
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex lg:gap-1">
          {CATEGORIES.map(({ label, slug }) => (
            <li key={slug}>
              <NavLink href={`/${slug}`} label={label} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-zinc-700 hover:bg-zinc-100 md:hidden dark:text-zinc-300 dark:hover:bg-zinc-800"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
          {menuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 top-14 z-40 bg-black/30 md:hidden sm:top-16"
          aria-label="Close menu overlay"
          onClick={closeMenu}
        />
      )}

      <div
        id="mobile-nav"
        className={`border-t border-zinc-200 bg-white md:hidden dark:border-zinc-800 dark:bg-zinc-950 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
          {CATEGORIES.map(({ label, slug }) => (
            <li key={slug}>
              <NavLink
                href={`/${slug}`}
                label={label}
                onNavigate={closeMenu}
              />
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
