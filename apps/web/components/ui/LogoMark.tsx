/**
 * CLI Academy logomark — terminal prompt `>_` symbol in a rounded square.
 * Uses a static gradient ID; because both instances (navbar + sidebar) are
 * on the same page and share the same colours the ID collision is harmless.
 */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <rect width="36" height="36" rx="10" fill="url(#lm-grad)" />
      {/* > chevron */}
      <path
        d="M10 12L17.5 18L10 24"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* _ cursor */}
      <line
        x1="20"
        y1="24"
        x2="27"
        y2="24"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="lm-grad"
          x1="0"
          y1="0"
          x2="36"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#14B8B8" />
          <stop offset="100%" stopColor="#0C7A7A" />
        </linearGradient>
      </defs>
    </svg>
  );
}
