import Link from "next/link";
import { ArrowRight, Globe, Lock, Mail, Rss } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { latestDocsHref } from "@/lib/docs/paths";
import { getLiveStatusPage } from "@/lib/status-live";

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

function overallLabel(status: string) {
  const key = status.toLowerCase();
  if (key === "operational") return { title: "All systems operational", tone: "ok" as const };
  if (key === "degraded") return { title: "Degraded performance", tone: "warn" as const };
  if (key === "outage" || key === "major_outage") return { title: "Major outage", tone: "bad" as const };
  return { title: status.replaceAll("_", " "), tone: "bad" as const };
}

function incidentTone(status: string) {
  const key = status.toUpperCase();
  if (key === "RESOLVED") return "text-[#059669] bg-emerald-50";
  if (key === "ACKNOWLEDGED") return "text-amber-800 bg-amber-50";
  return "text-red-800 bg-red-50";
}

function formatWhen(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export async function StatusPageShowcase() {
  const live = await getLiveStatusPage();
  const banner = overallLabel(live?.status || "outage");
  const incidents = (live?.incidents || []).slice(0, 8);
  const host = BRAND.links.status.replace(/^https:\/\//, "");

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
                {host}
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
          <div className="relative overflow-hidden rounded-[16px] border border-slate-200 bg-[#f8fafc] text-slate-900 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/80" />
                <span className="ml-2 truncate font-mono text-[11px] text-slate-400">{host}</span>
              </div>
              <Link
                href={BRAND.links.status}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[11px] font-semibold text-[#d21a1b] hover:underline"
              >
                Open full page
              </Link>
            </div>

            <div className="px-5 py-6 sm:px-7">
              {live ? (
                <>
                  <p className="text-xs font-medium text-slate-500">OpsKnight Status</p>
                  <div
                    className={`mt-3 flex items-center gap-2 rounded-[12px] border px-4 py-3 ${
                      banner.tone === "ok"
                        ? "border-emerald-200 bg-emerald-50"
                        : banner.tone === "warn"
                          ? "border-amber-200 bg-amber-50"
                          : "border-red-200 bg-red-50"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        banner.tone === "ok"
                          ? "bg-[#059669]"
                          : banner.tone === "warn"
                            ? "bg-amber-500"
                            : "bg-[#d21a1b]"
                      }`}
                    />
                    <p className="text-sm font-semibold text-[#111827]">{banner.title}</p>
                  </div>

                  <ul className="mt-5 divide-y divide-slate-200 rounded-[12px] border border-slate-200 bg-white">
                    {(live.services.length > 0 ? live.services : [{ name: "OpsKnight", status: live.status }]).map(
                      (svc) => (
                        <li key={svc.name} className="flex items-center justify-between gap-3 px-4 py-3">
                          <span className="text-sm font-medium text-[#111827]">{svc.name}</span>
                          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            {(svc.status || "").replaceAll("_", " ")}
                            {typeof svc.activeIncidents === "number" ? ` · ${svc.activeIncidents} active` : ""}
                          </span>
                        </li>
                      )
                    )}
                  </ul>

                  <div className="mt-4 overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                    <p className="border-b border-slate-200 px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                      Recent incidents
                    </p>
                    <ul className="divide-y divide-slate-100">
                      {incidents.map((incident) => (
                        <li key={incident.id} className="px-4 py-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase ${incidentTone(incident.status)}`}
                            >
                              {incident.status}
                            </span>
                            <span className="text-sm font-medium text-[#111827]">{incident.title}</span>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">
                            {incident.service || "Service"}
                            {formatWhen(incident.createdAt) ? ` · ${formatWhen(incident.createdAt)}` : ""}
                            {incident.resolvedAt ? ` · resolved ${formatWhen(incident.resolvedAt)}` : ""}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-3 text-[11px] text-slate-400">
                    Live records from {host}
                    {live.updatedAt ? ` · updated ${formatWhen(live.updatedAt)}` : ""}. The full
                    page also has subscribe, uptime, and themes.
                  </p>
                </>
              ) : (
                <p className="text-sm text-slate-600">
                  Could not load {host} for this build.{" "}
                  <Link href={BRAND.links.status} className="font-medium text-[#d21a1b] underline">
                    Open the live status page
                  </Link>
                  .
                </p>
              )}
            </div>
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
