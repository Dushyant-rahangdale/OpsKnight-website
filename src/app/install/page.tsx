import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { CopyBlock } from "@/components/brand/CopyBlock";
import { latestDocsHref } from "@/lib/docs/paths";

const title = "Install OpsKnight";
const description =
  "Run OpsKnight with Docker Compose or Helm. PostgreSQL, NEXTAUTH_SECRET, and ENCRYPTION_KEY are required. There is no hosted cloud.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/install" },
  openGraph: { title, description, url: "/install" },
};

export default function InstallPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <section className="border-b border-slate-200 pt-28 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Install · {BRAND.version} · {BRAND.license}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-5xl sm:leading-[1.12]">
            Run it on machines you already operate.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#4b5563] sm:text-lg">
            OpsKnight is self-hosted. Compose is the shortest path. Helm is the
            production path. After boot, open port 3000 and create the first admin
            on <span className="font-mono text-sm">/setup</span>. Full steps live
            in the docs — this page is the checklist.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-xl font-semibold text-[#111827]">You need</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[#4b5563]">
              <li>Docker Engine 20+ and Compose 2+, or a Kubernetes cluster</li>
              <li>PostgreSQL 14+ (Compose can start this for you)</li>
              <li>
                <code className="font-mono text-sm text-[#111827]">NEXTAUTH_SECRET</code>{" "}
                and{" "}
                <code className="font-mono text-sm text-[#111827]">ENCRYPTION_KEY</code>
              </li>
              <li>A stable HTTPS base URL in production (auth callbacks)</li>
            </ul>
            <p className="mt-4 text-sm text-slate-500">{BRAND.deploy.secretsNote}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#111827]">Docker Compose</h2>
            <p className="mt-3 mb-4 text-[#4b5563]">
              Clone the repo, copy <span className="font-mono text-sm">env.example</span>{" "}
              to <span className="font-mono text-sm">.env</span>, set the secrets,
              then start.
            </p>
            <CopyBlock
              label="compose"
              value={`git clone https://github.com/opsknight-labs/OpsKnight.git
cd OpsKnight
cp env.example .env
# set DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET, ENCRYPTION_KEY
docker compose up -d`}
            />
            <p className="mt-3 text-sm text-slate-500">
              Generate secrets with{" "}
              <span className="font-mono">openssl rand -base64 32</span> and{" "}
              <span className="font-mono">openssl rand -hex 32</span>. Then open{" "}
              <span className="font-mono">http://localhost:3000</span>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#111827]">Helm</h2>
            <p className="mt-3 mb-4 text-[#4b5563]">
              For repeatable Kubernetes installs. Chart source is in the product
              repo and a dedicated charts repo.
            </p>
            <CopyBlock label="helm" value={BRAND.deploy.helm} />
            <p className="mt-3">
              <Link
                href={latestDocsHref("deployment/helm")}
                className="text-sm font-semibold text-[#d21a1b] hover:underline"
              >
                Helm deployment docs
              </Link>
            </p>
          </div>

          <div className="rounded-[14px] border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-[#111827]">What this is not</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
              There is no OpsKnight Cloud signup. Native voice paging is not in
              this release. SAML is not in this release (local accounts and OIDC
              are). After install, the canonical reference is the{" "}
              <Link href={latestDocsHref("getting-started/installation")} className="font-medium text-[#111827] underline">
                installation guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
