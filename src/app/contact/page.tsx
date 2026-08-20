import Link from "next/link";
import { ArrowRight, BookOpen, Github, Mail, MessageSquare, Shield } from "lucide-react";
import { BRAND } from "@/lib/brand";

const paths = [
  {
    n: "01",
    title: "You are installing or configuring",
    body: "Start in the docs. Most “it doesn’t start” questions are Compose secrets or the first-boot keys.",
    href: BRAND.links.docs,
    cta: "Open docs",
    icon: BookOpen,
    external: false,
  },
  {
    n: "02",
    title: "Something is broken in the product",
    body: "File a GitHub issue. Include Compose vs Helm, version, and logs. That is the public tracker — not a private queue.",
    href: BRAND.links.issues,
    cta: "Open an issue",
    icon: Github,
    external: true,
  },
  {
    n: "03",
    title: "You want to talk it through",
    body: "Discussions are for how-to threads and design questions that are not a bug.",
    href: BRAND.links.discussions,
    cta: "Open Discussions",
    icon: MessageSquare,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <section className="relative overflow-hidden border-b border-slate-200 pt-28 pb-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0 opacity-[0.45]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15, 23, 42, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.045) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)]">
            <header className="max-w-2xl">
              <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
                Community · v{BRAND.version} · {BRAND.license}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-5xl sm:leading-[1.12]">
                The people who write OpsKnight are on GitHub. There is no ticket desk.
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[#4b5563] sm:text-lg">
                We named this Community on purpose. “Contact” sounds like a sales
                form and an SLA. This project is self-hosted software — you get
                answers in the open, or a private note when the topic should stay
                private.
              </p>
            </header>

            <aside className="overflow-hidden rounded-[14px] border border-slate-800 bg-[#0f172a] p-6 text-slate-200">
              <p className="font-mono text-[11px] font-medium tracking-wide text-slate-400">
                Private only
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Partnerships, press, and things that should not be a public issue.
                Not on-call coverage for your install.
              </p>
              <a
                href={`mailto:${BRAND.links.email}`}
                className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-white hover:underline"
              >
                <Mail className="h-4 w-4 text-slate-400" />
                {BRAND.links.email}
              </a>
              <Link
                href={BRAND.links.security}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 text-sm text-slate-300 hover:text-white hover:underline"
              >
                <Shield className="h-4 w-4 text-slate-400" />
                Security advisories — not a public bug ticket
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Pick a door
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-[#111827] sm:text-3xl">
            Three public paths. One private mailbox.
          </h2>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-[14px] border border-slate-200 bg-slate-200 lg:grid-cols-3">
            {paths.map((path) => {
              const Icon = path.icon;
              const className =
                "flex h-full flex-col bg-white p-6 md:p-8 hover:bg-slate-50";
              const inner = (
                <>
                  <div className="mb-6 flex items-center justify-between">
                    <Icon className="h-5 w-5 text-[#2563eb]" strokeWidth={1.75} />
                    <span className="font-mono text-[11px] text-slate-400">{path.n}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111827]">{path.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4b5563]">{path.body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#2563eb]">
                    {path.cta}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </>
              );
              return (
                <li key={path.n} className="bg-white">
                  {path.external ? (
                    <a href={path.href} target="_blank" rel="noopener noreferrer" className={className}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={path.href} className={className}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="mt-8 rounded-[14px] border border-slate-200 bg-[#f8fafc] p-6 md:p-8">
            <h3 className="text-base font-semibold text-[#111827]">When you file an issue</h3>
            <ul className="mt-4 grid gap-3 text-sm text-[#4b5563] sm:grid-cols-3">
              <li>
                <span className="font-mono text-[11px] text-slate-400">01 · Install</span>
                <p className="mt-1">Compose, Helm, or Docker — and {BRAND.name} {BRAND.version} if you know it.</p>
              </li>
              <li>
                <span className="font-mono text-[11px] text-slate-400">02 · Evidence</span>
                <p className="mt-1">Logs or a screenshot. Redact secrets. Do not paste ENCRYPTION_KEY.</p>
              </li>
              <li>
                <span className="font-mono text-[11px] text-slate-400">03 · Expectation</span>
                <p className="mt-1">What you thought would happen, and what actually happened.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
