import {
  Radio,
  Siren,
  MessageSquare,
  FileCheck,
  Layers,
} from "lucide-react";
import { BRAND } from "@/lib/brand";

const steps = [
  {
    n: "01",
    icon: Radio,
    title: "Alert",
    body: `Signals arrive from monitoring tools and webhooks — ${BRAND.integrationCountLabel} native integrations, plus generic JSON.`,
  },
  {
    n: "02",
    icon: Layers,
    title: "Dedupe",
    body: "Related alerts are grouped into a single incident so the on-call engineer is not paged for every downstream symptom.",
  },
  {
    n: "03",
    icon: Siren,
    title: "Page",
    body: "Routing follows service ownership and the active rotation. Responders get SMS, email, push, Slack, or WhatsApp.",
  },
  {
    n: "04",
    icon: MessageSquare,
    title: "War room",
    body: "Slack ChatOps opens a dedicated channel, with optional video bridges so the team can work the incident together.",
  },
  {
    n: "05",
    icon: FileCheck,
    title: "Close the loop",
    body: "Resolve, record MTTA/MTTR, update the status page, and draft a postmortem from the timeline.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-slate-200 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            How it works
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            Alert → page → war room → write-up.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
            The same sequence every SRE already knows. OpsKnight runs it on your
            network — not as a millisecond scoreboard.
          </p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[14px] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <li key={step.n} className="bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <Icon className="h-5 w-5 text-[#2563eb]" strokeWidth={1.75} />
                  <span className="font-mono text-[11px] text-slate-400">{step.n}</span>
                </div>
                <h3 className="text-base font-semibold text-[#111827]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
