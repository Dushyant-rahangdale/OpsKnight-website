import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { latestDocsHref } from "@/lib/docs/paths";
import { getLiveStatusPage } from "@/lib/status-live";

function overallLabel(status: string) {
  const key = status.toLowerCase();
  if (key === "operational") return { title: "All systems operational", tone: "ok" as const };
  if (key === "degraded") return { title: "Degraded performance", tone: "warn" as const };
  if (key === "outage" || key === "major_outage") return { title: "Major outage", tone: "bad" as const };
  return { title: status.replaceAll("_", " "), tone: "bad" as const };
}

function incidentTone(status: string) {
  const key = status.toUpperCase();
  if (key === "RESOLVED") return "text-[#059669]";
  if (key === "ACKNOWLEDGED") return "text-amber-700";
  return "text-[#d21a1b]";
}

export async function StatusPageShowcase() {
  const live = await getLiveStatusPage();
  const banner = overallLabel(live?.status || "unknown");
  const incidents = (live?.incidents || []).slice(0, 3);
  const host = BRAND.links.status.replace(/^https:\/\//, "");

  return (
    <section id="status-page" className="border-b border-slate-200 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Customer status page
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            They should not have to file a ticket to ask if it is down.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
            Same install as paging. Public, restricted, or private. One page,
            optional custom domain.{" "}
            <a
              href={BRAND.links.status}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#111827] underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500"
            >
              {host}
            </a>{" "}
            is ours — including test incidents — so you can see open, ack, and resolved.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[14px] border border-slate-200 bg-slate-50">
          <div className="grid lg:grid-cols-[minmax(16rem,1fr)_minmax(0,1.4fr)]">
            <div className="border-b border-slate-200 bg-white p-6 lg:border-r lg:border-b-0 md:p-8">
              <h3 className="text-xl font-semibold tracking-tight text-[#111827]">
                Included, not a second SaaS.
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#4b5563]">
                <li>Subscribe by email. JSON and RSS if they poll.</li>
                <li>90-day uptime on the page. Your logo and a theme if you want.</li>
                <li>Not unlimited sites per team — one page per install.</li>
              </ul>
              <Link
                href={BRAND.links.status}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#d21a1b] hover:underline"
              >
                Open the live page
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={latestDocsHref("core-concepts/status-page")}
                className="mt-3 block text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline"
              >
                Status page docs
              </Link>
            </div>

            <div className="p-6 md:p-8">
              {live ? (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-medium text-slate-500">{host}</p>
                    <span
                      className={`text-xs font-semibold ${
                        banner.tone === "ok"
                          ? "text-[#059669]"
                          : banner.tone === "warn"
                            ? "text-amber-700"
                            : "text-[#d21a1b]"
                      }`}
                    >
                      {banner.title}
                    </span>
                  </div>
                  <ul className="mt-4 divide-y divide-slate-200 rounded-[12px] border border-slate-200 bg-white">
                    {incidents.map((incident) => (
                      <li key={incident.id} className="flex items-start justify-between gap-3 px-4 py-3">
                        <p className="text-sm text-[#111827]">{incident.title}</p>
                        <span
                          className={`shrink-0 font-mono text-[10px] font-semibold uppercase ${incidentTone(incident.status)}`}
                        >
                          {incident.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[11px] text-slate-400">
                    Three live rows. The rest of the page is on {host}.
                  </p>
                </>
              ) : (
                <p className="text-sm text-[#4b5563]">
                  Live preview was not available for this build.{" "}
                  <Link href={BRAND.links.status} className="font-medium text-[#d21a1b] underline">
                    Open {host}
                  </Link>
                  .
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
