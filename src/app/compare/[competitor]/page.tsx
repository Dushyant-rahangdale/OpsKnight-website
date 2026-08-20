import { Fragment } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { COMPETITORS } from "@/lib/competitors";
import { BRAND } from "@/lib/brand";
import {
  COMPARE_AS_OF,
  COMPARE_FOOTNOTE,
  COMPARE_SECTIONS,
  COMPARE_SOURCE_LINKS,
  HONEST_BLURB,
  type CompareCell,
  vendorIdFromCompareSlug,
} from "@/lib/compare-matrix";
import { notFound } from "next/navigation";

const ALIAS_SLUGS = ["incident-io", "victorops"] as const;

function Cell({ value }: { value: CompareCell }) {
  if (value === true) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-[#d21a1b]">
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center text-slate-300">
        <Minus className="h-3.5 w-3.5" />
      </span>
    );
  }
  return <span className="text-sm leading-snug text-slate-700">{value}</span>;
}

export function generateStaticParams() {
  return [
    ...COMPETITORS.map((c) => ({ competitor: c.slug })),
    ...ALIAS_SLUGS.map((competitor) => ({ competitor })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor: slug } = await params;
  const vendorId = vendorIdFromCompareSlug(slug);
  const name = HONEST_BLURB[vendorId ?? ""]?.title ?? "this product";
  return {
    title: `OpsKnight vs ${name}`,
    description: `How OpsKnight v${BRAND.version} compares with ${name}: self-host vs SaaS, ${BRAND.license}, and capabilities that actually ship.`,
  };
}

export default async function CompetitorComparePage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor: slug } = await params;
  const vendorId = vendorIdFromCompareSlug(slug);
  if (!vendorId || vendorId === "opsknight") notFound();

  const blurb = HONEST_BLURB[vendorId];
  const navSlug =
    vendorId === "incidentio"
      ? "incidentio"
      : vendorId === "splunk"
        ? "splunk"
        : vendorId === "grafana"
          ? "grafana-oncall"
          : vendorId;

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-14">
        <header className="max-w-3xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Compare · v{BRAND.version} · as of {COMPARE_AS_OF}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-5xl">
            {BRAND.name} vs {blurb.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563] sm:text-lg">
            {blurb.body}
          </p>
        </header>

        <nav className="flex flex-wrap gap-2">
          {COMPETITORS.map((vendor) => {
            const active = vendor.slug === navSlug;
            return (
              <Link
                key={vendor.slug}
                href={vendor.href}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                  active
                    ? "border-red-600 bg-red-50 text-red-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                vs {vendor.shortName}
              </Link>
            );
          })}
        </nav>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-[#111827]">Side by side</h2>
          <div className="overflow-x-auto rounded-[14px] border border-slate-200 bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Capability
                  </th>
                  <th className="border-x border-slate-200 bg-red-50 px-4 py-3 text-sm font-semibold text-[#d21a1b]">
                    {BRAND.name}
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-slate-600">{blurb.title}</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_SECTIONS.map((section) => (
                  <Fragment key={section.title}>
                    <tr key={section.title} className="border-t border-slate-200">
                      <td colSpan={3} className="bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {section.title}
                      </td>
                    </tr>
                    {section.rows.map((row) => (
                      <tr key={`${section.title}-${row.feature}`} className="border-t border-slate-100">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-[#111827]">{row.feature}</p>
                          {row.source ? (
                            <p className="mt-1 text-[11px] leading-snug text-slate-400">{row.source}</p>
                          ) : null}
                        </td>
                        <td className="border-x border-slate-100 bg-red-50/40 px-4 py-3">
                          <Cell value={row.values.opsknight} />
                        </td>
                        <td className="px-4 py-3">
                          <Cell value={row.values[vendorId]} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">{COMPARE_FOOTNOTE}</p>
          <ul className="mt-3 columns-1 gap-x-8 text-[11px] leading-relaxed text-slate-500 sm:columns-2">
            {COMPARE_SOURCE_LINKS.map((link) => (
              <li key={link.href} className="break-inside-avoid pb-1">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d21a1b] hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/compare"
            className="inline-flex h-11 items-center rounded-[12px] bg-[#d21a1b] px-6 text-sm font-semibold text-white hover:bg-[#b41516]"
          >
            Full matrix and cost sketch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href={BRAND.links.docs}
            className="text-sm font-medium text-[#d21a1b] hover:underline"
          >
            Install docs
          </Link>
        </div>
      </div>
    </main>
  );
}
