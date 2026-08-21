import Link from "next/link";
import { getSidebar, SidebarItem } from "@/lib/docs/sidebar";
import { withTrailingSlash } from "@/lib/docs/paths";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function DocsPrevNext({ version, currentPath }: { version: string; currentPath: string }) {
  const sidebar = getSidebar(version);

  const flatten = (items: SidebarItem[]): { title: string; href: string }[] => {
    return items.reduce((acc, item) => {
      const arr = [] as { title: string; href: string }[];
      if (item.href) arr.push({ title: item.title, href: item.href });
      if (item.children) arr.push(...flatten(item.children));
      return acc.concat(arr);
    }, [] as { title: string; href: string }[]);
  };

  const flatList = flatten(sidebar);
  const currentIndex = flatList.findIndex(
    (item) => withTrailingSlash(item.href) === withTrailingSlash(currentPath)
  );

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? flatList[currentIndex - 1] : null;
  const next = currentIndex < flatList.length - 1 ? flatList[currentIndex + 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="mt-12 grid gap-4 border-t border-slate-200/90 pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-all hover:-translate-y-0.5 hover:border-[#d21a1b]/40 hover:bg-white hover:shadow-sm"
        >
          <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400 group-hover:text-[#d21a1b] transition-colors">
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            Previous
          </span>
          <span className="mt-2 text-sm font-semibold text-slate-800 group-hover:text-slate-900 line-clamp-1">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-right transition-all hover:-translate-y-0.5 hover:border-[#d21a1b]/40 hover:bg-white hover:shadow-sm sm:col-start-2"
        >
          <span className="flex items-center justify-end gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400 group-hover:text-[#d21a1b] transition-colors">
            Next
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="mt-2 text-sm font-semibold text-slate-800 group-hover:text-slate-900 line-clamp-1">
            {next.title}
          </span>
        </Link>
      ) : null}
    </div>
  );
}
