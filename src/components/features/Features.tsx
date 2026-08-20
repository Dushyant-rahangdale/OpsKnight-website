import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function Features() {
  return (
    <section id="features" className="border-b border-slate-200 bg-[#f8fafc] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            What you get
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-[2.5rem] sm:leading-tight">
            Something breaks. The right people know. The team talks. Customers see an update.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
            OpsKnight is the software that runs that night — on machines you
            already operate. No extra fee per engineer for the product itself.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          <article className="overflow-hidden rounded-[16px] border border-slate-200 bg-white">
            <div className="grid lg:grid-cols-[1.4fr_1fr]">
              <div className="p-8 md:p-10">
                <p className="font-mono text-[11px] font-medium tracking-wide text-[#d21a1b]">
                  01 · Who gets woken up
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#111827] sm:text-3xl">
                  The person on call gets the page. If they miss it, the next person does.
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4b5563]">
                  You set a schedule (who is covering this week, including
                  timezones and last-minute swaps). When monitoring fires,
                  OpsKnight messages them by email, SMS, Slack, WhatsApp, or a
                  notification on their phone. Missed pages move to the next
                  person on the policy.
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  Phone <em>calls</em> are not included — paging is text, chat,
                  and push.
                </p>
              </div>
              <div className="flex flex-col justify-end border-t border-slate-200 bg-slate-50 p-8 lg:border-l lg:border-t-0 md:p-10">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Tonight’s rotation
                </p>
                <ol className="mt-4 space-y-3">
                  <li className="rounded-[12px] border border-slate-200 bg-white px-4 py-3">
                    <p className="text-sm font-semibold text-[#111827]">Primary</p>
                    <p className="mt-0.5 text-xs text-[#4b5563]">Gets the first message</p>
                  </li>
                  <li className="rounded-[12px] border border-dashed border-slate-300 px-4 py-3">
                    <p className="text-sm font-medium text-slate-700">If no answer</p>
                    <p className="mt-0.5 text-xs text-[#4b5563]">Secondary, then the team</p>
                  </li>
                </ol>
              </div>
            </div>
          </article>

          <div className="grid gap-4 lg:grid-cols-5">
            <article className="rounded-[16px] border border-slate-800 bg-[#0f172a] p-8 text-white lg:col-span-3 md:p-10">
              <p className="font-mono text-[11px] font-medium tracking-wide text-red-300">
                02 · How the team talks
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                A Slack channel opens for that incident. Everyone who should be
                there is invited.
              </h3>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-300">
                Acknowledge and resolve from Slack. Optionally drop in a Jitsi,
                Zoom, or Google Meet link. The incident keeps a timeline of what
                people did — so you are not reconstructing the night from
                screenshots.
              </p>
              <p className="mt-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-slate-400">
                #inc-payments-1842
              </p>
            </article>

            <article className="rounded-[16px] border border-slate-200 bg-white p-8 lg:col-span-2 md:p-10">
              <p className="font-mono text-[11px] font-medium tracking-wide text-[#d21a1b]">
                03 · What customers see
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-[#111827]">
                A status page they can actually open.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                Public, restricted, or private. Your own domain if you want.
                Subscribers get updates. One page per install — not unlimited
                sites per team.
              </p>
              <Link
                href="/#status-page"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#d21a1b] hover:underline"
              >
                How we ship it
              </Link>
            </article>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-[16px] border border-slate-200 bg-white p-7">
              <p className="font-mono text-[11px] font-medium tracking-wide text-slate-400">
                04 · After
              </p>
              <h3 className="mt-3 text-lg font-semibold text-[#111827]">
                Write what happened from the timeline.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">
                Postmortems and follow-up tasks live on the incident. You write
                them. OpsKnight does not invent a report for you.
              </p>
            </article>
            <article className="rounded-[16px] border border-slate-200 bg-white p-7">
              <p className="font-mono text-[11px] font-medium tracking-wide text-slate-400">
                05 · On the phone
              </p>
              <h3 className="mt-3 text-lg font-semibold text-[#111827]">
                Ack from a phone. No extra app-store product.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">
                Install the site on the home screen. Push notifications and
                optional biometrics. Same login as the desktop app.
              </p>
            </article>
            <article className="rounded-[16px] border border-slate-200 bg-white p-7">
              <p className="font-mono text-[11px] font-medium tracking-wide text-slate-400">
                06 · Where it runs
              </p>
              <h3 className="mt-3 text-lg font-semibold text-[#111827]">
                On your servers. Data stays with you.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">
                Docker or Kubernetes, {BRAND.license}. There is no OpsKnight
                cloud you rent. You still pay hosting, SMS, and Slack.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
