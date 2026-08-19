import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COMPETITORS } from "@/lib/competitors";

export function Comparison() {
  return (
    <section className="border-b border-slate-200 bg-[#f8fafc] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Versus the usual stack
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            Same job as the paid on-call products. You operate the software.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
            The full matrix, honest gaps, and a cost sketch (your invoice rates,
            not our claimed list prices) live on the compare page.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {COMPETITORS.map((vendor) => (
            <Link
              key={vendor.slug}
              href={vendor.href}
              className="rounded-[12px] border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
            >
              <p className="text-sm font-semibold text-[#111827]">{vendor.name}</p>
              <p className="mt-1 text-[11px] text-[#4b5563]">{vendor.category}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2563eb] hover:underline"
          >
            See cost vs the usual SaaS on-call stack
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
