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
      className={cx("w-auto max-w-none", className ?? "h-12")}
    />
  );

  if (onDark) return image;

  return (
    <span className="inline-flex w-fit items-center rounded-2xl bg-ink px-3 py-1.5">
      {image}
    </span>
  );
}
