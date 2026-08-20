type LogoMarkProps = {
  size?: number;
  className?: string;
  beacon?: boolean;
};

/** Watchtower mark: night chrome, pager-blue lantern. */
export function LogoMark({ size = 28, className = "", beacon = true }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden
      fill="none"
    >
      <rect width="32" height="32" rx="7" fill="#0f172a" />
      <path
        d="M8 25.5h16"
        stroke="#e2e8f0"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M11 25V14.5L16 9l5 5.5V25"
        stroke="#f8fafc"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <rect
        x="14.5"
        y="15.25"
        width="3"
        height="5.5"
        rx="0.6"
        fill="#2563eb"
        className={beacon ? "logo-beacon" : undefined}
      />
    </svg>
  );
}
