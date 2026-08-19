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
      <SidebarInset className="bg-[#f8fafc] min-h-screen">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 px-4 bg-white sticky top-0 z-10">
          <SidebarTrigger className="-ml-1 text-slate-500 hover:text-slate-900 transition-colors" />
          <div className="h-4 w-px bg-slate-200" />
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <span className="font-medium text-slate-900">Documentation</span>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:block w-64 lg:w-80">
              <DocsSearch version={version} />
            </div>

            <span className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium">
              {version}
            </span>
          </div>
        </header>

        <div className="relative">
          <div className="relative p-4 lg:p-10 max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
