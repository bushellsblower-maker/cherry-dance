import { cx } from "@/lib/utils";

export function BrandLogo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const image = (
    <img
      src="/cherry-dance-logo.png"
      alt="Cherry Dance"
      className={cx("h-10 w-auto", className)}
    />
  );

  if (onDark) return image;

  return (
    <span className="inline-flex items-center rounded-xl bg-ink px-2 py-1">
      {image}
    </span>
  );
}
