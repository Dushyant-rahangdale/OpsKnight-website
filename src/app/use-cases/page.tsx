import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

const title = "Use cases";
const description =
  "When OpsKnight is a fit: keep incident data on your stack, avoid per-seat paging, run Slack war rooms you already have.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/use-cases" },
  openGraph: { title, description, url: "/use-cases" },
};

const cases = [
  {
    title: "Incident data stays on your network",
    body: "Rotations, timelines, and postmortems live in your Postgres. That matters when the systems you page about are not allowed to ship their outages to a third-party SaaS.",
    href: "/docs/latest/security/",
    cta: "Security model",
  },
  {
    title: "On-call without a per-seat meter",
    body: "OpsKnight is Apache-2.0. You size the box, not a contract. Compare public list prices elsewhere if you are shopping — the product is the install, not a quote.",
    href: "/compare",
    cta: "Compare",
  },
  {
    title: "Slack you already run",
    body: "War rooms and ChatOps are outbound Slack you configure. Teams and Google Chat are outgoing webhooks. There is no native voice channel in this release.",
    href: "/docs/latest/integrations/communication/slack-chatops/",
    cta: "Slack ChatOps",
  },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <section className="border-b border-slate-200 pt-28 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Use cases · {BRAND.version}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-5xl sm:leading-[1.12]">
            Built for teams that already operate a stack.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#4b5563] sm:text-lg">
            These are situations the product is written for. They are not customer
            stories — we do not publish logos we do not have.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto grid max-w-3xl gap-6 px-4 sm:px-6 lg:px-8">
          {cases.map((item) => (
            <article
              key={item.title}
              className="rounded-[14px] border border-slate-200 bg-white p-6"
            >
              <h2 className="text-lg font-semibold text-[#111827]">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">{item.body}</p>
              <Link
                href={item.href}
                className="mt-4 inline-block text-sm font-semibold text-[#2563eb] hover:underline"
              >
                {item.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
