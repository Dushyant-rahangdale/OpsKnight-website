import Link from "next/link";
import Image from "next/image";
import { Github, Mail, Heart } from "lucide-react";
import { BRAND } from "@/lib/brand";

const footerLinks = {
  product: [
    { label: "Product", href: "/#product-tour" },
    { label: "Integrations", href: "/integrations" },
    { label: "Changelog", href: "/changelog" },
    { label: "Compare", href: "/compare" },
    { label: "Status demo", href: BRAND.links.status },
  ],
  resources: [
    { label: "Documentation", href: BRAND.links.docs },
    { label: "Quickstart", href: "/docs/latest/getting-started/" },
    { label: "Helm charts", href: BRAND.links.helmCharts },
  ],
  community: [
    { label: "Contact", href: "/contact" },
    { label: "GitHub Discussions", href: BRAND.links.discussions },
    { label: "Issues", href: BRAND.links.issues },
    { label: "Contributing", href: BRAND.links.contributing },
    { label: "Sponsor", href: BRAND.links.sponsor },
  ],
  legal: [
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: `${BRAND.license} License`, href: BRAND.links.license },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0f172a] pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-5 inline-flex items-center gap-2.5">
              <Image
                src={BRAND.assets.logo}
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <span className="text-base font-semibold text-white">{BRAND.name}</span>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-400">
              Self-hosted incident command center. On-call, paging, war rooms, and
              status pages on your infrastructure.
            </p>
            <p className="mb-6 font-mono text-xs text-slate-500">
              {BRAND.license} · {BRAND.version} · {BRAND.integrationCountLabel} integrations
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a
                href={BRAND.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${BRAND.links.email}`}
                className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href={BRAND.links.sponsor}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
                aria-label="Sponsor"
              >
                <Heart className="h-5 w-5" />
              </a>
            </div>
          </div>

          {(
            [
              ["Product", footerLinks.product],
              ["Resources", footerLinks.resources],
              ["Community", footerLinks.community],
              ["Legal", footerLinks.legal],
            ] as const
          ).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold text-white">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {BRAND.name}. {BRAND.license}.
          </p>
          <a
            href={BRAND.links.status}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#059669]" />
            Live status demo
          </a>
        </div>
      </div>
    </footer>
  );
}
