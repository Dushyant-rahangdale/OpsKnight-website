"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Boxes,
  ChevronDown,
  Code2,
  ExternalLink,
  Lightbulb,
  Plug,
  Rocket,
  Server,
  Settings,
  Shield,
  Smartphone,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarItem } from "@/lib/docs/sidebar";
import { DocsVersionSwitcher } from "@/components/docs/DocsVersionSwitcher";
import { DocsSearch } from "@/components/docs/DocsSearch";
import { pathsMatch } from "@/lib/docs/paths";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";
import type { DocsVersion } from "@/lib/docs/types";

const SECTION_ICONS: Record<string, React.ElementType> = {
  "getting-started": Rocket,
  "core-concepts": Lightbulb,
  administration: Settings,
  integrations: Plug,
  api: Code2,
  deployment: Server,
  security: Shield,
  architecture: Boxes,
  mobile: Smartphone,
};

function getSectionKeyFromHref(href?: string) {
  if (!href) return undefined;
  const parts = href.split("/").filter(Boolean);
  if (parts.length < 3) return undefined;
  return parts[2];
}

function pathMatches(href: string | undefined, active: string) {
  return pathsMatch(href, active);
}

function sectionContainsPath(item: SidebarItem, active: string): boolean {
  if (pathMatches(item.href, active)) return true;
  return item.children?.some((child) => sectionContainsPath(child, active)) ?? false;
}

function NavLink({
  item,
  activePath,
  nested = false,
}: {
  item: SidebarItem;
  activePath: string;
  nested?: boolean;
}) {
  if (item.children && item.children.length > 0) {
    return (
      <div className={nested ? "ml-2 mt-2" : ""}>
        {item.href ? (
          <Link
            href={item.href}
            className={cn(
              "mb-1 block rounded-md px-2 py-1.5 text-[12px] font-medium",
              pathMatches(item.href, activePath)
                ? "text-white"
                : "text-slate-400 hover:text-white"
            )}
          >
            {item.title}
          </Link>
        ) : (
          <p className="mb-1 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
            {item.title}
          </p>
        )}
        <ul className="space-y-0.5 border-l border-white/10 pl-2">
          {item.children.map((child) => (
            <li key={child.title}>
              <NavLink item={child} activePath={activePath} nested />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!item.href) {
    return (
      <span className="block px-2 py-1.5 text-[13px] text-slate-500">{item.title}</span>
    );
  }

  const active = pathMatches(item.href, activePath);
  return (
    <Link
      href={item.href}
      className={cn(
        "block rounded-md border-l-2 px-2 py-1.5 text-[13px] leading-snug",
        nested ? "ml-0" : "ml-1",
        active
          ? "border-[#2563eb] bg-white/10 text-white"
          : "border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
      )}
    >
      {item.title}
    </Link>
  );
}

function CollapsibleSection({
  item,
  activePath,
}: {
  item: SidebarItem;
  activePath: string;
}) {
  const sectionKey =
    getSectionKeyFromHref(item.children?.[0]?.href) ||
    getSectionKeyFromHref(item.href);
  const Icon = (sectionKey && SECTION_ICONS[sectionKey]) || BookOpen;
  const containsActive = sectionContainsPath(item, activePath);
  const [isOpen, setIsOpen] = React.useState(containsActive);

  React.useEffect(() => {
    if (containsActive) setIsOpen(true);
  }, [containsActive]);

  return (
    <SidebarGroup className="p-0">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-white/5"
      >
        <Icon
          className={cn(
            "h-4 w-4 shrink-0",
            containsActive ? "text-[#93c5fd]" : "text-slate-500"
          )}
        />
        <span
          className={cn(
            "min-w-0 flex-1 text-[12px] font-semibold tracking-wide",
            containsActive ? "text-white" : "text-slate-300"
          )}
        >
          {item.title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-slate-500 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <SidebarGroupContent className="pb-2">
          <SidebarMenu>
            {item.children?.map((child) => (
              <SidebarMenuItem key={child.title}>
                <NavLink item={child} activePath={activePath} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );
}

export function NewDocsSidebar({
  items,
  version,
  versions,
}: {
  items: SidebarItem[];
  version: string;
  versions: DocsVersion[];
}) {
  const pathname = usePathname();
  const activePath = pathname?.split("#")[0] ?? "";

  return (
    <Sidebar className="border-r border-white/10 [&_[data-sidebar=sidebar]]:!bg-[#0f172a]">
      <SidebarHeader className="shrink-0 border-b border-white/10 pb-3">
        <Link href="/" className="flex items-center gap-3 px-2 pt-1">
          <Image
            src="/logo-mark.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <div className="flex min-w-0 flex-col leading-none">
            <span className="truncate text-sm font-semibold text-white">
              {BRAND.name}
            </span>
            <span className="mt-1 font-mono text-[11px] tracking-wide text-slate-400">
              Documentation
            </span>
          </div>
        </Link>
        <div className="mt-3 px-1">
          <DocsVersionSwitcher currentVersion={version} versions={versions} />
        </div>
        <div className="mt-2 px-1 md:hidden">
          <DocsSearch version={version} />
        </div>
      </SidebarHeader>
      <SidebarContent className="custom-scrollbar px-2 py-2">
        {items.map((item) =>
          item.children && item.children.length > 0 ? (
            <CollapsibleSection
              key={item.title}
              item={item}
              activePath={activePath}
            />
          ) : (
            <div key={item.title} className="px-1">
              <NavLink item={item} activePath={activePath} />
            </div>
          )
        )}
      </SidebarContent>
      <SidebarFooter className="shrink-0 border-t border-white/10">
        <div className="flex flex-col gap-1.5">
          <Link
            href="/"
            className="rounded-lg px-2 py-1.5 text-xs text-slate-400 hover:bg-white/5 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/changelog"
            className="rounded-lg px-2 py-1.5 text-xs text-slate-400 hover:bg-white/5 hover:text-white"
          >
            Changelog
          </Link>
          <Link
            href={BRAND.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-slate-400 hover:bg-white/5 hover:text-white"
          >
            GitHub
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
