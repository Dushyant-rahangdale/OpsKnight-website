import Link from "next/link";
import { PropsWithChildren } from "react";
import { getSidebar } from "@/lib/docs/sidebar";
import { NewDocsSidebar } from "@/components/docs/NewDocsSidebar";
import { DocsSearch } from "@/components/docs/DocsSearch";
import { DOC_VERSIONS } from "@/lib/docs/versions";
import { notFound } from "next/navigation";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import "highlight.js/styles/atom-one-dark.css";

export default async function DocsLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ version: string }> }>) {
  const { version } = await params;
  if (!DOC_VERSIONS.some(v => v.id === version)) {
    notFound();
  }
  const sidebar = getSidebar(version);

  return (
    <SidebarProvider defaultOpen>
      <NewDocsSidebar items={sidebar} version={version} versions={DOC_VERSIONS} />
      <SidebarInset className="bg-slate-950 min-h-screen">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/5 px-4 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-10">
          <SidebarTrigger className="-ml-1 text-slate-400 hover:text-white transition-colors" />
          <div className="h-4 w-px bg-white/10" />
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <span className="font-medium text-white">Documentation</span>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:block w-64 lg:w-80">
              <DocsSearch version={version} />
            </div>

            <span className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              {version}
            </span>
          </div>
        </header>

        {/* Background effects */}
        <div className="relative">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Content */}
          <div className="relative p-4 lg:p-10 max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
