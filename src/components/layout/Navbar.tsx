"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Github } from "lucide-react";
import { BRAND } from "@/lib/brand";

const navItems = [
  { label: "Product", href: "/#product-tour" },
  { label: "Integrations", href: "/integrations" },
  { label: "Compare", href: "/compare" },
  { label: "Changelog", href: "/changelog" },
  { label: "Docs", href: BRAND.links.docs },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-slate-800 bg-[#0f172a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
          >
            <Image
              src={BRAND.assets.logo}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="text-[15px] font-semibold tracking-tight text-white">
              {BRAND.name}
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={BRAND.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
            <Link
              href={BRAND.links.docs}
              className="inline-flex h-8 items-center justify-center rounded-[10px] bg-slate-800 hover:bg-slate-700 text-white border border-slate-700/80 px-3.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a] transition-colors"
            >
              Install
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-slate-300 hover:bg-white/5 hover:text-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-slate-800 py-3 md:hidden">
            <div className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={BRAND.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                GitHub
              </Link>
              <Link
                href={BRAND.links.docs}
                className="mx-3 mt-2 inline-flex h-10 items-center justify-center rounded-[10px] bg-[#2563eb] text-sm font-semibold text-white"
                onClick={() => setIsOpen(false)}
              >
              Install
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
