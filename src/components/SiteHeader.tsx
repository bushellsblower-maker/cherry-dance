import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import type { SiteContent } from "@/lib/content";

const NAV = [
  { href: "/#shows", label: "Shows" },
  { href: "/#classes", label: "Classes" },
  { href: "/#instructors", label: "Instructors" },
  { href: "/#wedding", label: "Wedding" },
  { href: "/#parties", label: "Hens" },
  { href: "/#book", label: "Book" },
  { href: "/#shop", label: "Shop" },
  { href: "/#cabaret", label: "Cabaret" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false);

  function goTo(href: string) {
    setOpen(false);
    const id = href.split("#")[1];
    window.setTimeout(() => {
      if (!id) {
        window.location.href = href;
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
      window.history.replaceState(null, "", href);
    }, 80);
  }

  return (
    <header className="sticky top-0 z-40 overflow-x-hidden border-b border-white/10 bg-ink/90 backdrop-blur-xl">
      <div className="wrap flex items-center justify-between py-1.5">
        <a href="/#top" className="flex max-w-[11rem] items-center no-underline sm:max-w-[13.5rem]">
          <BrandLogo onDark className="h-[4.1rem] sm:h-[4.75rem]" />
        </a>
        <nav className="hidden items-center gap-3.5 xl:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-cream/85 no-underline hover:text-cherry"
            >
              {item.label}
            </a>
          ))}
          <a href={content.booking.teamUpUrl} className="btn btn-primary py-1.5 text-sm">
            {content.ctas.book}
          </a>
        </nav>
        <button
          type="button"
          className="btn btn-line px-3 py-1.5 xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-ink px-4 py-3 xl:hidden">
          <div className="flex flex-col gap-2">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-medium text-cream no-underline"
                onClick={(event) => {
                  event.preventDefault();
                  goTo(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
            <a href={content.booking.teamUpUrl} className="btn btn-primary">
              {content.ctas.book}
            </a>
            <Link to="/admin" className="text-sm text-muted no-underline">
              Admin
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
