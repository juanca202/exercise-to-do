"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/todo", label: "To-do", testId: "nav-link-todo" },
  { href: "/notes", label: "Notes", testId: "nav-link-notes" },
] as const;

/**
 * Main navigation shown across every route: links between To-do and Notes.
 */
export function MainNav() {
  const pathname = usePathname();

  return (
    <nav
      data-testid="main-nav"
      aria-label="Navegación principal"
      className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="mx-auto flex w-full max-w-2xl gap-1 px-4 py-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-testid={item.testId}
              aria-current={active ? "page" : undefined}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                active
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
