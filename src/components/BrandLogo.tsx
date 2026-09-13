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
      src="/brand/logo.png"
      alt="Cherry Dance"
      className={cx("h-auto w-auto max-w-none object-contain", className ?? "h-16")}
    />
  );

  if (onDark) return image;

  return (
    <span className="inline-flex w-fit items-center rounded-2xl bg-ink px-2 py-1">
      {image}
    </span>
  );
}
