import Link from "next/link";
import { Mail, MessageSquare, Shield, Users } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 pb-24">
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 font-mono text-[11px] text-slate-500">Contact</p>
        <h1 className="text-4xl font-semibold tracking-tight text-[#111827]">
          Need help?
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4b5563]">
          There is no ticket portal and no SLA. Bugs and features go to GitHub.
          Private or security questions go to email. Include how you deployed
          (Compose, Kubernetes, or PWA) and what you expected versus what happened.
        </p>

        <div className="mt-10 rounded-[14px] border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-[#111827]">When you write</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#4b5563]">
            <li>Share deployment type: Compose, Helm/Kubernetes, or the PWA.</li>
            <li>Include logs or a screenshot when you can.</li>
            <li>Say what you expected and what actually happened.</li>
          </ul>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[14px] border border-slate-200 bg-white p-6">
            <MessageSquare className="h-5 w-5 text-[#2563eb]" />
            <h2 className="mt-4 text-lg font-semibold text-[#111827]">GitHub issues</h2>
            <p className="mt-2 text-sm text-[#4b5563]">
              Public tracker for bugs, questions, and feature requests.
            </p>
            <Link
              href={BRAND.links.issues}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-10 items-center rounded-[12px] bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Open an issue
            </Link>
          </div>
          <div className="rounded-[14px] border border-slate-200 bg-white p-6">
            <Users className="h-5 w-5 text-[#2563eb]" />
            <h2 className="mt-4 text-lg font-semibold text-[#111827]">Discussions</h2>
            <p className="mt-2 text-sm text-[#4b5563]">
              Longer how-to threads that are not a bug report.
            </p>
            <Link
              href={BRAND.links.discussions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-10 items-center rounded-[12px] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Open Discussions
            </Link>
          </div>
          <div className="rounded-[14px] border border-slate-200 bg-white p-6">
            <Mail className="h-5 w-5 text-[#2563eb]" />
            <h2 className="mt-4 text-lg font-semibold text-[#111827]">Email</h2>
            <p className="mt-2 text-sm text-[#4b5563]">
              Private questions and partnerships. Not a 24/7 support desk.
            </p>
            <a
              href={`mailto:${BRAND.links.email}`}
              className="mt-5 inline-flex h-10 items-center rounded-[12px] border border-slate-200 bg-white px-4 font-mono text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              {BRAND.links.email}
            </a>
          </div>
          <div className="rounded-[14px] border border-slate-200 bg-white p-6">
            <Shield className="h-5 w-5 text-[#2563eb]" />
            <h2 className="mt-4 text-lg font-semibold text-[#111827]">Security</h2>
            <p className="mt-2 text-sm text-[#4b5563]">
              Vulnerability reports through GitHub Security Advisories. Do not
              file a public issue for an unpatched hole.
            </p>
            <Link
              href={BRAND.links.security}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-10 items-center rounded-[12px] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Report a vulnerability
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
