import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/BrandLogo";
import type { SiteContent } from "@/lib/content";

export function SiteFooter({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="wrap grid gap-6 py-8 md:grid-cols-3">
        <div>
          <BrandLogo onDark className="h-16" />
          <p className="mt-2 max-w-xs text-sm text-ink-soft">
            Dance and fitness classes in central Eastbourne. Founded in 2012 by
            Cheryl Cooper.
          </p>
          <p className="mt-2 text-xs text-gold-dust">{content.instructors.note}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-cream">Studio</p>
          <a className="mt-2 block text-ink-soft" href={content.socials.facebook}>
            Facebook
          </a>
          <a className="mt-1 block text-ink-soft" href={content.socials.instagram}>
            Instagram
          </a>
          <a className="mt-1 block text-ink-soft" href={content.booking.teamUpUrl}>
            Book on TeamUp
          </a>
          <a className="mt-1 block text-ink-soft" href={content.shop.url}>
            Shop on Clothing Kings
          </a>
          <a className="mt-1 block text-ink-soft" href="/#wedding">
            Wedding dances
          </a>
          <a className="mt-1 block text-ink-soft" href="/#parties">
            Hen &amp; adult parties
          </a>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-cream">Cabaret Cerises</p>
          <a className="mt-2 block text-ink-soft" href={content.cabaret.facebook}>
            Performance Facebook
          </a>
          <a className="mt-1 block text-ink-soft" href={content.cabaret.instagram}>
            Instagram
          </a>
          <a className="mt-1 block text-ink-soft" href={content.cabaret.ticketsHome}>
            Tickets
          </a>
          <Link to="/go-live" className="mt-4 block text-muted no-underline">
            Go-live notes
          </Link>
          <Link to="/admin" className="mt-1 block text-muted no-underline">
            Demo CMS
          </Link>
        </div>
      </div>
    </footer>
  );
}
