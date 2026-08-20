import { Fragment } from "react";
import { Check, Minus } from "lucide-react";
import {
  COMPARE_SECTIONS,
  COMPARE_VENDORS,
  type CompareCell,
} from "@/lib/compare-matrix";

function Cell({ value, highlight }: { value: CompareCell; highlight?: boolean }) {
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
  return (
    <span
      className={`text-xs leading-snug ${highlight ? "font-medium text-slate-800" : "text-slate-600"}`}
    >
      {value}
    </span>
  );
}

export function CompareTable() {
  return (
    <div className="overflow-x-auto rounded-[14px] border border-slate-200 bg-white">
      <table className="w-full min-w-[1080px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="sticky left-0 z-20 bg-slate-50 px-4 py-3.5 text-xs font-medium uppercase tracking-wide text-slate-500">
              Capability
            </th>
            {COMPARE_VENDORS.map((vendor) => (
              <th
                key={vendor.id}
                className={
                  vendor.highlight
                    ? "border-x border-slate-200 bg-red-50 px-3 py-3.5 text-sm font-semibold text-[#d21a1b]"
                    : "bg-slate-50 px-3 py-3.5 text-sm font-medium text-slate-600"
                }
              >
                {vendor.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_SECTIONS.map((section) => (
            <Fragment key={section.title}>
              <tr key={section.title} className="border-t border-slate-200">
                <td
                  colSpan={COMPARE_VENDORS.length + 1}
                  className="bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {section.title}
                </td>
              </tr>
              {section.rows.map((row) => (
                <tr key={`${section.title}-${row.feature}`} className="border-t border-slate-100">
                  <td className="sticky left-0 z-10 bg-white px-4 py-3 align-top">
                    <p className="text-sm font-medium text-[#111827]">{row.feature}</p>
                    {row.source ? (
                      <p className="mt-1 max-w-[14rem] text-[11px] leading-snug text-slate-400">{row.source}</p>
                    ) : null}
                  </td>
                  {COMPARE_VENDORS.map((vendor) => (
                    <td
                      key={vendor.id}
                      className={
                        vendor.highlight
                          ? "border-x border-slate-100 bg-red-50/40 px-3 py-3 align-top"
                          : "px-3 py-3 align-top"
                      }
                    >
                      <Cell value={row.values[vendor.id]} highlight={vendor.highlight} />
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
