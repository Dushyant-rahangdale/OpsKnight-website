import Link from "next/link";
import { LogoMark } from "@/components/brand/LogoMark";
import { BRAND } from "@/lib/brand";

type BrandLockupProps = {
  href?: string;
  size?: number;
  subtitle?: string;
  className?: string;
};

export function BrandLockup({
  href = "/",
  size = 28,
  subtitle,
  className = "",
}: BrandLockupProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] ${className}`}
    >
      <LogoMark size={size} />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate text-[15px] font-semibold tracking-tight text-white">
          {BRAND.name}
        </span>
        {subtitle ? (
          <span className="mt-1 font-mono text-[11px] tracking-wide text-slate-400">
            {subtitle}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
