"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Github } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { BrandLockup } from "@/components/brand/BrandLockup";

const navItems = [
  { label: "Product", href: "/#product-tour" },
  { label: "Install", href: "/#run" },
  { label: "Integrations", href: "/integrations" },
  { label: "Compare", href: "/compare" },
  { label: "Changelog", href: "/changelog" },
  { label: "Docs", href: BRAND.links.docs },
  { label: "Community", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-slate-800 bg-[#0f172a]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#d21a1b] via-[#d21a1b]/40 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <BrandLockup size={28} />

          <div className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium leading-snug text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d21a1b]"
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
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d21a1b]"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
            <Link
              href="/#run"
              className="inline-flex h-8 items-center justify-center rounded-[10px] bg-[#d21a1b] px-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#b41516] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d21a1b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
            >
              Install
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-slate-300 hover:bg-white/5 hover:text-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d21a1b]"
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
                href="/#run"
                className="mx-3 mt-2 inline-flex h-10 items-center justify-center rounded-[10px] bg-[#d21a1b] text-sm font-semibold text-white"
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
