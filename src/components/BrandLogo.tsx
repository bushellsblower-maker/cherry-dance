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
      className={cx("max-w-full object-contain object-left", className ?? "h-16")}
    />
  );

  if (onDark) return image;

  return (
    <span className="inline-flex w-fit max-w-full items-center rounded-2xl bg-ink px-2 py-1">
      {image}
    </span>
  );
}
