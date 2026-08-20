import { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About OpsKnight",
  description:
    "OpsKnight is self-hosted incident command. Other product names identify those products. Not affiliated with PagerDuty or Atlassian.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] pt-32 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 font-mono text-[11px] text-slate-500">{BRAND.version}</p>
        <h1 className="text-4xl font-semibold tracking-tight text-[#111827]">
          About {BRAND.name}
        </h1>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-[#4b5563]">
          <p>
            OpsKnight is a self-hosted incident command center. It exists because
            per-seat on-call products get expensive as teams grow, and because
            incident data belongs on the same infrastructure as the systems it
            describes.
          </p>
          <p>
            The name is the job: hold the watch at 2am. The mark is a watchtower
            with a pager lantern — not a costume knight, and not a clone of
            anyone else’s product.
          </p>
          <h2 className="pt-4 text-2xl font-semibold text-[#111827]">Who it is for</h2>
          <p>
            SRE and platform teams that already run Postgres, Docker, or
            Kubernetes. Teams that cannot put incident timelines in a vendor
            cloud. Teams that would rather operate a pager than meter seats.
            {BRAND.integrationCountLabel} inbound parsers, Slack war rooms, one
            status page, local accounts and OIDC.
          </p>
          <h2 className="pt-4 text-2xl font-semibold text-[#111827]">Who it is not for</h2>
          <p>
            Anyone who needs a hosted cloud, native voice calls, or SAML in this
            release. Anyone who needs a PagerDuty clone — Events API v2 is an
            ingest adapter. Change the destination URL and test.
          </p>
          <h2 className="pt-4 text-2xl font-semibold text-[#111827]">Mission</h2>
          <p>
            Make on-call, paging, war rooms, status pages, and postmortems
            available to any engineering team that can run Docker Compose or Helm
            — without a SaaS lock-in.
          </p>
          <h2 className="pt-4 text-2xl font-semibold text-[#111827]">License</h2>
          <p>
            The product is licensed under {BRAND.license}. Source lives on GitHub.
            There is no hosted Enterprise Cloud offering.
          </p>
          <h2 className="pt-4 text-2xl font-semibold text-[#111827]">Maintainer</h2>
          <p>
            Created and maintained by{" "}
            <a
              href={BRAND.authors[0].url}
              className="font-medium text-[#111827] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {BRAND.authors[0].name}
            </a>
            . Press and partnership notes: {BRAND.links.email}.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href={BRAND.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-[12px] bg-[#2563eb] px-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            GitHub
          </a>
          <Link
            href="/install"
            className="inline-flex h-10 items-center rounded-[12px] border border-slate-200 bg-white px-5 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Install
          </Link>
          <Link
            href="/brand"
            className="inline-flex h-10 items-center rounded-[12px] border border-slate-200 bg-white px-5 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Brand
          </Link>
        </div>
      </div>
    </main>
  );
}
