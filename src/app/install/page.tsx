import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { CopyBlock } from "@/components/brand/CopyBlock";
import { SecretsGenerator } from "@/components/showcase/SecretsGenerator";
import { latestDocsHref } from "@/lib/docs/paths";

const title = "Install OpsKnight";
const description =
  "Deploy OpsKnight with Docker Compose, Helm, Kustomize, Cloud Run, ECS, or Linux Systemd. $0 license, 100% self-hosted on your infrastructure.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/install" },
  openGraph: { title, description, url: "/install" },
};

export default function InstallPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
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
            in the docs — this page is the operational checklist.
          </p>
        </div>
      </section>

      {/* Main Checklist */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          
          {/* Prerequisites */}
          <div>
            <h2 className="text-xl font-semibold text-[#111827]">Prerequisites</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#4b5563]">
              <li>Docker Engine 20+ and Compose 2+, or a Kubernetes 1.24+ cluster</li>
              <li>PostgreSQL 14+ (Compose automatically provisions PostgreSQL 15)</li>
              <li>
                <code className="font-mono text-xs text-[#111827]">NEXTAUTH_SECRET</code>{" "}
                and{" "}
                <code className="font-mono text-xs text-[#111827]">ENCRYPTION_KEY</code>{" "}
                configured before first start
              </li>
              <li>A stable HTTPS reverse proxy in production (for auth callbacks and webhook ingestion)</li>
            </ul>
            <div className="mt-6">
              <SecretsGenerator />
            </div>
          </div>

          {/* Docker Compose */}
          <div className="border-t border-slate-200 pt-10">
            <h2 className="text-xl font-semibold text-[#111827]">Docker Compose (Recommended Starter)</h2>
            <p className="mt-3 mb-4 text-sm leading-relaxed text-[#4b5563]">
              Clone the repository, copy <span className="font-mono text-xs text-[#111827]">env.example</span>{" "}
              to <span className="font-mono text-xs text-[#111827]">.env</span>, inject your generated secrets,
              and launch the stack:
            </p>
            <CopyBlock
              label="compose"
              value={`git clone https://github.com/opsknight-labs/OpsKnight.git
cd OpsKnight
cp env.example .env
# set NEXTAUTH_SECRET and ENCRYPTION_KEY in .env
docker compose up -d`}
            />
            <p className="mt-3 text-xs text-slate-500">
              Then navigate to <span className="font-mono text-[#111827]">http://localhost:3000/setup</span> to initialize the primary administrator account.
            </p>
            <p className="mt-3">
              <Link
                href={latestDocsHref("deployment/docker")}
                className="text-sm font-semibold text-[#d21a1b] hover:underline"
              >
                Docker Compose deployment guide →
              </Link>
            </p>
          </div>

          {/* Helm */}
          <div className="border-t border-slate-200 pt-10">
            <h2 className="text-xl font-semibold text-[#111827]">Kubernetes (Helm Chart)</h2>
            <p className="mt-3 mb-4 text-sm leading-relaxed text-[#4b5563]">
              For versioned, repeatable Kubernetes deployments with Horizontal Pod Autoscaling (HPA) and Ingress TLS:
            </p>
            <CopyBlock
              label="helm"
              value={`helm repo add opsknight https://charts.opsknight.com
helm repo update
helm upgrade --install opsknight opsknight/opsknight \\
  --namespace opsknight \\
  --create-namespace`}
            />
            <p className="mt-3">
              <Link
                href={latestDocsHref("deployment/helm")}
                className="text-sm font-semibold text-[#d21a1b] hover:underline"
              >
                Helm configuration &amp; values.yaml guide →
              </Link>
            </p>
          </div>

          {/* Other Topologies */}
          <div className="border-t border-slate-200 pt-10">
            <h2 className="text-xl font-semibold text-[#111827]">Other Supported Topologies</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#4b5563]">
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#111827]">· Kustomize &amp; GitOps:</span>
                <span>
                  Declarative base and overlay manifests designed for ArgoCD and Flux pipelines.{" "}
                  <Link href={latestDocsHref("deployment/kustomize")} className="font-medium text-[#d21a1b] hover:underline">
                    Kustomize guide
                  </Link>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#111827]">· Cloud &amp; Serverless Containers:</span>
                <span>
                  Deploy to AWS ECS / Fargate with RDS PostgreSQL, or GCP Cloud Run with Cloud SQL.{" "}
                  <Link href={latestDocsHref("deployment/docker")} className="font-medium text-[#d21a1b] hover:underline">
                    Cloud deployment guide
                  </Link>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#111827]">· Linux Systemd / Bare Metal:</span>
                <span>
                  Run as a native Node 20 LTS daemon service behind an Nginx or Caddy TLS reverse proxy.{" "}
                  <Link href={latestDocsHref("getting-started/installation")} className="font-medium text-[#d21a1b] hover:underline">
                    Installation walkthrough
                  </Link>
                </span>
              </li>
            </ul>
          </div>

          {/* Infrastructure Sizing */}
          <div className="border-t border-slate-200 pt-10">
            <h2 className="text-xl font-semibold text-[#111827]">Hardware Sizing Matrix</h2>
            <p className="mt-3 mb-4 text-sm leading-relaxed text-[#4b5563]">
              Recommended capacity for OpsKnight and PostgreSQL based on monthly alert volume:
            </p>
            <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 bg-slate-50 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-2.5">Tier</th>
                    <th className="px-4 py-2.5">Alert Volume</th>
                    <th className="px-4 py-2.5">Compute</th>
                    <th className="px-4 py-2.5">Topology</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                  <tr>
                    <td className="px-4 py-2.5 font-sans font-medium text-slate-900">Starter / Eval</td>
                    <td className="px-4 py-2.5 text-slate-500">&lt; 10k / mo</td>
                    <td className="px-4 py-2.5 text-slate-700">1 vCPU · 1 GB RAM</td>
                    <td className="px-4 py-2.5 text-slate-600 font-sans">Docker Compose ($5 VPS)</td>
                  </tr>
                  <tr className="bg-slate-50/40">
                    <td className="px-4 py-2.5 font-sans font-medium text-slate-900">Team / Growth</td>
                    <td className="px-4 py-2.5 text-slate-500">10k – 100k / mo</td>
                    <td className="px-4 py-2.5 text-slate-700">2 vCPU · 2 GB RAM</td>
                    <td className="px-4 py-2.5 text-slate-600 font-sans">2x Replicas + Managed DB</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-sans font-medium text-slate-900">Enterprise</td>
                    <td className="px-4 py-2.5 text-slate-500">100k+ / mo</td>
                    <td className="px-4 py-2.5 text-slate-700">4+ vCPU · 4–8 GB</td>
                    <td className="px-4 py-2.5 text-slate-600 font-sans">Kubernetes (HPA) + PgBouncer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* What this is not */}
          <div className="rounded-[14px] border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-[#111827]">What this is not</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
              There is no OpsKnight Cloud signup or hosted user seat meter. Native voice phone calls and SAML are not in this release (local accounts and OIDC single sign-on are supported). After installation, the canonical reference is the{" "}
              <Link href={latestDocsHref("getting-started/installation")} className="font-medium text-[#111827] underline">
                installation guide
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href={latestDocsHref("getting-started")}
              className="inline-flex h-11 items-center rounded-[12px] bg-[#d21a1b] px-6 text-sm font-semibold text-white hover:bg-[#b41516]"
            >
              Getting Started Docs
            </Link>
            <Link
              href="/security"
              className="text-sm font-semibold text-[#d21a1b] hover:underline"
            >
              Security &amp; hardening architecture →
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
