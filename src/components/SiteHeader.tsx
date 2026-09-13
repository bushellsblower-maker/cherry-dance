import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import type { SiteContent } from "@/lib/content";

const NAV = [
  { href: "/#shows", label: "Shows" },
  { href: "/#classes", label: "Classes" },
  { href: "/#parties", label: "Parties" },
  { href: "/#book", label: "Book" },
  { href: "/#shop", label: "Shop" },
  { href: "/#cabaret", label: "Cabaret" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-cherry/10 bg-cream/80 backdrop-blur-xl">
      <div className="wrap flex items-center justify-between py-3">
        <a href="/#top" className="flex items-center no-underline">
          <BrandLogo className="h-9" />
        </a>
        <nav className="hidden items-center gap-5 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft no-underline hover:text-cherry"
            >
              {item.label}
            </a>
          ))}
          <a href={content.booking.teamUpUrl} className="btn btn-primary py-2 text-sm">
            {content.ctas.book}
          </a>
        </nav>
        <button
          type="button"
          className="btn btn-ghost px-3 py-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-cherry/10 bg-cream px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-medium text-ink no-underline"
                onClick={() => setOpen(false)}
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
