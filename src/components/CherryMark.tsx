export function CherryMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M32 18c6-10 16-12 20-8"
        stroke="#2f7a3a"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M32 18c-2-8 2-14 8-16"
        stroke="#2f7a3a"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="22" cy="40" r="14" fill="#c81e3a" />
      <circle cx="42" cy="38" r="13" fill="#9b1530" />
      <circle cx="18" cy="34" r="4" fill="#ffd0db" opacity="0.7" />
    </svg>
  );
}
