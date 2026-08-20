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

const sampleServices = [
  { name: "API", state: "Operational" },
  { name: "Ingest", state: "Operational" },
  { name: "Dashboard", state: "Operational" },
];

export function StatusPageShowcase() {
  return (
    <section id="status-page" className="border-b border-slate-800 bg-[#0f172a] py-20 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-red-300">
              Customer status page · included
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              When it is down, they should not have to guess.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
              Statuspage is a separate bill at a lot of shops. Here it ships in the
              same install as paging: a page customers can open, subscribe to, and
              put on{" "}
              <span className="font-mono text-sm text-slate-200">status.yourdomain.com</span>
              . One page per install — not a farm of sites per team.
            </p>

            <ul className="mt-8 space-y-5">
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

            <p className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <Rss className="h-3.5 w-3.5" />
              90-day uptime on the page · themes and your logo · not native Statuspage.io
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={BRAND.links.status}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-[12px] bg-white px-6 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Open a live install
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href={latestDocsHref("core-concepts/status-page")}
                className="inline-flex h-11 items-center justify-center rounded-[12px] border border-white/15 px-6 text-sm font-semibold text-slate-200 hover:bg-white/5"
              >
                Status page docs
              </Link>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
              Live URL is our own OpsKnight page. It may show test incidents. The
              panel on the right is a layout illustration, not a screenshot of that
              URL.
            </p>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-4 rounded-[24px] bg-[#d21a1b]/10 blur-2xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[16px] border border-slate-200 bg-[#f8fafc] text-slate-900 shadow-2xl shadow-black/40">
              <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="ml-2 truncate font-mono text-[11px] text-slate-400">
                  status.yourcompany.com
                </span>
              </div>

              <div className="px-5 py-6 sm:px-7">
                <p className="text-xs font-medium text-slate-500">Acme Status</p>
                <div className="mt-3 flex items-center gap-2 rounded-[12px] border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-[#059669]" />
                  <p className="text-sm font-semibold text-emerald-900">All systems operational</p>
                </div>

                <ul className="mt-5 divide-y divide-slate-200 rounded-[12px] border border-slate-200 bg-white">
                  {sampleServices.map((svc) => (
                    <li key={svc.name} className="flex items-center justify-between gap-3 px-4 py-3">
                      <span className="text-sm font-medium text-[#111827]">{svc.name}</span>
                      <span className="flex items-center gap-3">
                        <span className="hidden h-2 w-24 overflow-hidden rounded-full bg-slate-100 sm:block" aria-hidden>
                          <span className="block h-full w-[92%] rounded-full bg-emerald-400/80" />
                        </span>
                        <span className="text-xs font-medium text-[#059669]">{svc.state}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 rounded-[12px] border border-slate-200 bg-white px-4 py-3">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    Recent
                  </p>
                  <p className="mt-1 text-sm text-[#111827]">Elevated API latency</p>
                  <p className="mt-0.5 text-xs text-slate-500">Resolved · customers saw it here, not in a ticket queue</p>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-[12px] border border-dashed border-slate-300 px-4 py-3">
                  <p className="text-xs text-slate-600">Stay in the loop</p>
                  <span className="rounded-md bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white">
                    Subscribe
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
