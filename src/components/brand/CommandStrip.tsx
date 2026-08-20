import { BRAND } from "@/lib/brand";

/** Quiet incident-topbar motif. Use once per page — slate, not severity red. */
export function CommandStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-3 overflow-x-auto whitespace-nowrap border-b border-slate-700/80 bg-slate-800 px-4 py-2 font-mono text-[11px] text-slate-300 ${className}`}
      aria-hidden="true"
    >
      <span className="font-medium text-slate-100">{BRAND.name}</span>
      <span className="text-slate-600">│</span>
      <span>INC · command</span>
      <span className="text-slate-600">│</span>
      <span>on-call rotation</span>
      <span className="text-slate-600">│</span>
      <span>status pages</span>
      <span className="ml-auto hidden text-slate-500 sm:inline">self-hosted · {BRAND.license}</span>
    </div>
  );
}
