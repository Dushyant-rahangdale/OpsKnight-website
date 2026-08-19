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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarItem } from "@/lib/docs/sidebar";
import { DocsVersionSwitcher } from "@/components/docs/DocsVersionSwitcher";
import { DocsSearch } from "@/components/docs/DocsSearch";
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

function CollapsibleSection({
  item,
  activePath,
  defaultOpen = false,
}: {
  item: SidebarItem;
  activePath: string;
  defaultOpen?: boolean;
}) {
  const sectionKey = getSectionKeyFromHref(item.children?.[0]?.href);
  const Icon = (sectionKey && SECTION_ICONS[sectionKey]) || BookOpen;
  const hasActiveChild =
    item.children?.some((child) => child.href === activePath) || false;
  const [isOpen, setIsOpen] = React.useState(defaultOpen || hasActiveChild);

  React.useEffect(() => {
    if (hasActiveChild) setIsOpen(true);
  }, [hasActiveChild]);

  return (
    <SidebarGroup>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-auto w-full items-start justify-between rounded-lg px-2 py-2.5 hover:bg-white/5"
      >
        <div className="flex min-w-0 flex-1 items-start gap-2.5">
          <Icon
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0",
              hasActiveChild ? "text-[#60a5fa]" : "text-slate-500"
            )}
          />
          <SidebarGroupLabel
            className={cn(
              "m-0 block h-auto w-full p-0 text-left text-[11px] font-semibold uppercase tracking-wider",
              hasActiveChild ? "text-white" : "text-slate-400"
            )}
          >
            {item.title}
          </SidebarGroupLabel>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-slate-500 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden",
          isOpen ? "max-h-[2000px]" : "max-h-0"
        )}
      >
        <SidebarGroupContent>
          <SidebarMenu>
            {item.children?.map((child) => (
              <SidebarMenuItem key={child.title}>
                <SidebarMenuButton
                  asChild={Boolean(child.href)}
                  isActive={child.href === activePath}
                  className="ml-5 h-auto items-start border-l-2 border-transparent py-2 text-slate-400 hover:bg-white/5 hover:text-white data-[active=true]:border-[#2563eb] data-[active=true]:bg-white/10 data-[active=true]:text-white"
                >
                  {child.href ? (
                    <Link href={child.href} className="block min-w-0 flex-1 text-[13px] leading-snug">
                      {child.title}
                    </Link>
                  ) : (
                    <span className="block min-w-0 flex-1 text-[13px] leading-snug">
                      {child.title}
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </div>
    </SidebarGroup>
  );
}

function renderSidebarItems(
  items: SidebarItem[],
  activePath: string
) {
  return items.map((item, index) => {
    if (item.children && item.children.length > 0) {
      return (
        <CollapsibleSection
          key={item.title}
          item={item}
          activePath={activePath}
          defaultOpen={index < 2}
        />
      );
    }
    const isActive = item.href ? activePath === item.href : false;
    return (
      <SidebarMenuItem key={item.title} className="mb-0.5">
        <SidebarMenuButton
          asChild={Boolean(item.href)}
          isActive={isActive}
          className="h-auto items-start border-l-2 border-transparent py-2 text-slate-400 hover:bg-white/5 hover:text-white data-[active=true]:border-[#2563eb] data-[active=true]:bg-white/10 data-[active=true]:text-white"
        >
          {item.href ? (
            <Link href={item.href} className="text-[13px] leading-snug">
              {item.title}
            </Link>
          ) : (
            <span className="text-[13px] leading-snug">{item.title}</span>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  });
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
      <SidebarHeader className="border-b border-white/10 pb-4">
        <Link href="/" className="flex items-center gap-3 px-2 pt-2">
          <Image
            src="/logo-mark.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-white">{BRAND.name}</span>
            <span className="mt-1 font-mono text-[11px] tracking-wide text-slate-400">
              Documentation
            </span>
          </div>
        </Link>
        <div className="mt-4 px-2">
          <DocsVersionSwitcher currentVersion={version} versions={versions} />
        </div>
        <div className="mt-2 px-2 md:hidden">
          <DocsSearch version={version} />
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        {renderSidebarItems(items, activePath)}
      </SidebarContent>
      <div className="mt-auto space-y-2 border-t border-white/10 p-3">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/"
            className="rounded-lg border border-white/10 px-2 py-1.5 text-center text-xs text-slate-400 hover:bg-white/5 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/changelog"
            className="rounded-lg border border-white/10 px-2 py-1.5 text-center text-xs text-slate-400 hover:bg-white/5 hover:text-white"
          >
            Changelog
          </Link>
        </div>
        <Link
          href={BRAND.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 hover:text-white"
        >
          GitHub
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
