import Link from "next/link";
import { ArrowRight, Globe, Lock, Mail, Rss } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { latestDocsHref } from "@/lib/docs/paths";

const capabilities = [
  {
    icon: Globe,
    title: "Customers already know this URL",
    body: "Public page, optional custom domain. Same incident that pages on-call can show here.",
  },
  {
    icon: Lock,
    title: "Public, restricted, or private",
    body: "Hide titles, hide details, or keep it behind login. You choose what leaves the building.",
  },
  {
    icon: Mail,
    title: "They subscribe once",
    body: "Email when it breaks and when it recovers. JSON and RSS if they would rather poll.",
  },
];

export function StatusPageShowcase() {
  return (
    <section id="status-page" className="border-b border-slate-800 bg-[#0f172a] py-20 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <div>
            <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-red-300">
              Customer status page · live install
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              When it is down, they should not have to guess.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
              This is{" "}
              <a
                href={BRAND.links.status}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                status.opsknight.com
              </a>
              — our own OpsKnight status page. Open, acknowledged, and resolved
              incidents (including test events) are the product, not a mock.
            </p>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-slate-400 lg:justify-self-end">
            Statuspage is a separate bill at a lot of shops. Here it ships in the
            same install as paging. One page per install, optional custom domain,
            not a farm of sites per team.
          </p>
        </div>

        <div className="relative mt-10">
          <div className="absolute -inset-3 rounded-[24px] bg-[#d21a1b]/10 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[16px] border border-slate-700 bg-slate-950 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-[#020617] px-4 py-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/80" />
                <span className="ml-2 truncate font-mono text-[11px] text-slate-400">
                  {BRAND.links.status.replace(/^https:\/\//, "")}
                </span>
              </div>
              <Link
                href={BRAND.links.status}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[11px] font-semibold text-slate-300 hover:text-white"
              >
                Open full page
              </Link>
            </div>
            <iframe
              title="Live OpsKnight status page"
              src={BRAND.links.status}
              className="h-[min(70vh,44rem)] w-full bg-white"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="flex gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-white/5 ring-1 ring-white/10">
                  <Icon className="h-4 w-4 text-[#d21a1b]" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 flex items-center gap-2 text-xs text-slate-500">
          <Rss className="h-3.5 w-3.5" />
          90-day uptime · email subscribe · JSON and RSS · themes and your logo
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={BRAND.links.status}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-[12px] bg-white px-6 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Open status.opsknight.com
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href={latestDocsHref("core-concepts/status-page")}
            className="inline-flex h-11 items-center justify-center rounded-[12px] border border-white/15 px-6 text-sm font-semibold text-slate-200 hover:bg-white/5"
          >
            Status page docs
          </Link>
        </div>
      </div>
    </section>
  );
}
