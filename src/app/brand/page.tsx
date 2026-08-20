import type { Metadata } from "next";
import { BRAND, BRAND_COLORS } from "@/lib/brand";
import { LogoMark } from "@/components/brand/LogoMark";

const title = "Brand";
const description =
  "OpsKnight mark, colors, and how to write about the product. Not affiliated with PagerDuty or other tools we ingest from.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/brand" },
  openGraph: { title, description, url: "/brand" },
};

const swatches: { name: string; hex: string; use: string }[] = [
  { name: "Chrome", hex: BRAND_COLORS.chrome, use: "Night surfaces: nav, footer, command chrome" },
  { name: "Canvas", hex: BRAND_COLORS.canvas, use: "Page background" },
  { name: "Ink", hex: BRAND_COLORS.ink, use: "Headings and body on canvas" },
  { name: "Pager", hex: BRAND_COLORS.accent, use: "The page: buttons, live signal, lantern in the mark" },
  { name: "Clear", hex: BRAND_COLORS.success, use: "Resolved / healthy" },
  { name: "Severity", hex: BRAND_COLORS.error, use: "Error and critical only" },
];

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <section className="border-b border-slate-200 bg-[#0f172a] pt-28 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <LogoMark size={48} />
          </div>
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-400">
            Brand · {BRAND.version}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Night chrome. Pager blue.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            OpsKnight is the desk that holds the watch. The mark is a watchtower
            with a lantern — not a cartoon knight. Blue is the page, not the
            wallpaper.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl space-y-14 px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-xl font-semibold text-[#111827]">Mark</h2>
            <p className="mt-3 text-[#4b5563]">
              Use the SVG. Do not recolor the lantern. Do not add a helmet, sword,
              or gradient. Clear space: one mark-width on all sides.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-[14px] border border-slate-800 bg-[#0f172a] p-6">
                <LogoMark size={40} />
                <div>
                  <p className="text-sm font-medium text-white">On chrome</p>
                  <a href="/brand/mark.svg" download className="text-xs text-slate-400 hover:text-white">
                    Download mark.svg
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-[14px] border border-slate-200 bg-white p-6">
                <LogoMark size={40} beacon={false} />
                <div>
                  <p className="text-sm font-medium text-[#111827]">On canvas</p>
                  <a href="/brand/mark-on-light.svg" download className="text-xs text-slate-500 hover:text-[#111827]">
                    Download mark-on-light.svg
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#111827]">Color</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {swatches.map((s) => (
                <div key={s.name} className="flex overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                  <div className="w-16 shrink-0" style={{ background: s.hex }} />
                  <div className="p-3">
                    <p className="text-sm font-semibold text-[#111827]">{s.name}</p>
                    <p className="font-mono text-[11px] text-slate-500">{s.hex}</p>
                    <p className="mt-1 text-xs text-[#4b5563]">{s.use}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#111827]">How to say it</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[#4b5563]">
              <li>OpsKnight — one word, capital O and K.</li>
              <li>Primary: self-hosted incident command. Support: Apache-2.0, you run it.</li>
              <li>
                PagerDuty, Slack, and other names identify those products. We are
                not affiliated. Events API v2 is an ingest adapter, not a clone.
              </li>
              <li>Do not claim drop-in replacement, hosted cloud, native voice, or SAML.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#111827]">Do not</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[#4b5563]">
              <li>Stretch, outline, or recolor the mark.</li>
              <li>Place the mark on a busy photograph.</li>
              <li>Invent testimonials, seat counts, or latency numbers.</li>
              <li>Use third-party logos except to label an integration, in their own mark.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
