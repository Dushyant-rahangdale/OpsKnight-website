"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
    Rocket,
    Lightbulb,
    Settings,
    Plug,
    Code2,
    Server,
    Shield,
    Boxes,
    Smartphone,
    ChevronDown,
    ExternalLink,
    BookOpen,
} from "lucide-react"

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
} from "@/components/ui/sidebar"
import { SidebarItem } from "@/lib/docs/sidebar"
import { DocsVersionSwitcher } from "@/components/docs/DocsVersionSwitcher"
import { DocsSearch } from "@/components/docs/DocsSearch"
import { cn } from "@/lib/utils"

// Section configuration with icons and colors
const SECTION_CONFIG: Record<string, {
    icon: React.ElementType;
    label: string;
    active: string;
    gradient: string;
}> = {
    "getting-started": {
        icon: Rocket,
        label: "text-amber-400",
        active: "data-[active=true]:border-l-amber-400 data-[active=true]:bg-amber-500/10 data-[active=true]:text-amber-100",
        gradient: "from-amber-500 to-orange-500",
    },
    "core-concepts": {
        icon: Lightbulb,
        label: "text-cyan-400",
        active: "data-[active=true]:border-l-cyan-400 data-[active=true]:bg-cyan-500/10 data-[active=true]:text-cyan-100",
        gradient: "from-cyan-500 to-blue-500",
    },
    administration: {
        icon: Settings,
        label: "text-emerald-400",
        active: "data-[active=true]:border-l-emerald-400 data-[active=true]:bg-emerald-500/10 data-[active=true]:text-emerald-100",
        gradient: "from-emerald-500 to-teal-500",
    },
    integrations: {
        icon: Plug,
        label: "text-blue-400",
        active: "data-[active=true]:border-l-blue-400 data-[active=true]:bg-blue-500/10 data-[active=true]:text-blue-100",
        gradient: "from-blue-500 to-indigo-500",
    },
    api: {
        icon: Code2,
        label: "text-rose-400",
        active: "data-[active=true]:border-l-rose-400 data-[active=true]:bg-rose-500/10 data-[active=true]:text-rose-100",
        gradient: "from-rose-500 to-pink-500",
    },
    deployment: {
        icon: Server,
        label: "text-lime-400",
        active: "data-[active=true]:border-l-lime-400 data-[active=true]:bg-lime-500/10 data-[active=true]:text-lime-100",
        gradient: "from-lime-500 to-green-500",
    },
    security: {
        icon: Shield,
        label: "text-red-400",
        active: "data-[active=true]:border-l-red-400 data-[active=true]:bg-red-500/10 data-[active=true]:text-red-100",
        gradient: "from-red-500 to-rose-500",
    },
    architecture: {
        icon: Boxes,
        label: "text-indigo-400",
        active: "data-[active=true]:border-l-indigo-400 data-[active=true]:bg-indigo-500/10 data-[active=true]:text-indigo-100",
        gradient: "from-indigo-500 to-purple-500",
    },
    mobile: {
        icon: Smartphone,
        label: "text-teal-400",
        active: "data-[active=true]:border-l-teal-400 data-[active=true]:bg-teal-500/10 data-[active=true]:text-teal-100",
        gradient: "from-teal-500 to-cyan-500",
    },
}

function getSectionKeyFromHref(href?: string) {
    if (!href) return undefined
    const parts = href.split("/").filter(Boolean)
    if (parts.length < 3) return undefined
    return parts[2]
}

function getSectionConfig(sectionKey?: string) {
    if (!sectionKey) return undefined
    return SECTION_CONFIG[sectionKey]
}

// Collapsible section component
function CollapsibleSection({
    item,
    activePath,
    defaultOpen = false,
}: {
    item: SidebarItem;
    activePath: string;
    defaultOpen?: boolean;
}) {
    const sectionKey = getSectionKeyFromHref(item.children?.[0]?.href)
    const config = getSectionConfig(sectionKey)
    const Icon = config?.icon || BookOpen

    // Check if any child is active
    const hasActiveChild = item.children?.some(child => child.href === activePath) || false
    const [isOpen, setIsOpen] = React.useState(defaultOpen || hasActiveChild)

    // Update open state when active child changes
    React.useEffect(() => {
        if (hasActiveChild) setIsOpen(true)
    }, [hasActiveChild])

    return (
        <SidebarGroup>
            {/* Section Header - Clickable */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-white/5 transition-colors group"
            >
                <div className="flex items-center gap-3">
                    {/* Icon with gradient background */}
                    <div className={cn(
                        "p-1.5 rounded-lg transition-all",
                        hasActiveChild
                            ? `bg-gradient-to-br ${config?.gradient || "from-emerald-500 to-cyan-500"} shadow-lg`
                            : "bg-slate-800/80 group-hover:bg-slate-700"
                    )}>
                        <Icon className={cn(
                            "w-3.5 h-3.5",
                            hasActiveChild ? "text-white" : "text-slate-400 group-hover:text-slate-300"
                        )} />
                    </div>

                    {/* Title */}
                    <SidebarGroupLabel
                        className={cn(
                            "text-xs font-bold uppercase tracking-widest transition-colors p-0 m-0",
                            hasActiveChild ? config?.label : "text-slate-500 group-hover:text-slate-400"
                        )}
                    >
                        {item.title}
                    </SidebarGroupLabel>
                </div>

                {/* Chevron */}
                <ChevronDown className={cn(
                    "w-4 h-4 text-slate-500 transition-transform duration-200",
                    isOpen ? "rotate-180" : ""
                )} />
            </button>

            {/* Children - Collapsible */}
            <div className={cn(
                "overflow-hidden transition-all duration-200",
                isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            )}>
                <SidebarGroupContent className="mt-1">
                    <SidebarMenu>
                        {item.children?.map((child) => (
                            <SidebarMenuItem key={child.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={child.href === activePath}
                                    className={cn(
                                        "ml-6 border-l-2 border-transparent text-slate-400 hover:text-white hover:bg-white/5 data-[active=true]:bg-white/10 data-[active=true]:text-white data-[active=true]:font-medium",
                                        config?.active
                                    )}
                                >
                                    {child.href ? (
                                        <Link href={child.href} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
                                            {child.title}
                                        </Link>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
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
    )
}

// Helper to render recursive items
function renderSidebarItems(items: SidebarItem[], pathname: string, activePath: string) {
    return items.map((item, index) => {
        const isActive = item.href ? activePath === item.href : false
        const sectionKey = getSectionKeyFromHref(item.href)
        const config = getSectionConfig(sectionKey)

        // Group Header (Level 0 with children)
        if (item.children && item.children.length > 0) {
            return (
                <CollapsibleSection
                    key={item.title}
                    item={item}
                    activePath={activePath}
                    defaultOpen={index < 2} // First two sections open by default
                />
            )
        }

        // Standalone Item
        return (
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                        "border-l-2 border-transparent text-slate-400 hover:text-white hover:bg-white/5 data-[active=true]:bg-white/10 data-[active=true]:text-white",
                        config?.active
                    )}
                >
                    {item.href ? (
                        <Link href={item.href}>{item.title}</Link>
                    ) : (
                        <span>{item.title}</span>
                    )}
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    })
}

export function NewDocsSidebar({ items, version }: { items: SidebarItem[], version: string }) {
    const pathname = usePathname()
    const activePath = pathname?.split("#")[0] ?? ""

    return (
        <Sidebar className="border-r border-white/10 [&_[data-sidebar=sidebar]]:!bg-slate-900">
            <SidebarHeader className="border-b border-white/5 pb-4">
                {/* Logo Section */}
                <Link href="/" className="group flex items-center gap-3 px-2 pt-2 hover:opacity-90 transition-all">
                    <div className="relative flex h-9 w-9 items-center justify-center shrink-0">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Image
                            src="/logo-compressed.png"
                            alt="OpsSentinel Logo"
                            width={32}
                            height={32}
                            className="relative w-8 h-8 object-contain"
                        />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none transition-all group-data-[collapsible=icon]:hidden">
                        <span className="font-bold text-white group-hover:text-emerald-50 transition-colors">OpsSentinel</span>
                        <span className="text-[10px] text-emerald-400/70 uppercase tracking-wider font-medium">Documentation</span>
                    </div>
                </Link>

                {/* Version Switcher */}
                <div className="mt-4 px-2">
                    <DocsVersionSwitcher currentVersion={version} />
                </div>

                {/* Search - Mobile Only */}
                <div className="mt-2 px-2 md:hidden">
                    <DocsSearch version={version} />
                </div>


            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent className="custom-scrollbar px-2 py-4">
                <div className="space-y-2">
                    {renderSidebarItems(items, pathname || "", activePath)}
                </div>
            </SidebarContent>

            {/* Footer */}
            <div className="border-t border-white/5 p-4 mt-auto space-y-3">
                {/* Quick Links */}
                <div className="grid grid-cols-2 gap-2">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/compare"
                        className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        Compare
                    </Link>
                </div>

                {/* GitHub Link */}
                <Link
                    href="https://github.com/Dushyant-rahangdale/OpsSentinel"
                    target="_blank"
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-xs text-emerald-400 hover:from-emerald-500/20 hover:to-cyan-500/20 transition-all group"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span>Star on GitHub</span>
                    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Link>
            </div>

            <SidebarRail />
        </Sidebar>
    )
}
