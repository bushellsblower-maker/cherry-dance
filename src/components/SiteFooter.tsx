import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/BrandLogo";
import type { SiteContent } from "@/lib/content";

export function SiteFooter({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-cherry/10 bg-cream-deep/70">
      <div className="wrap grid gap-8 py-12 md:grid-cols-3">
        <div>
          <BrandLogo className="h-12" />
          <p className="mt-3 max-w-xs text-sm text-ink-soft">
            Dance and fitness classes in central Eastbourne. Founded in 2012 by
            Cheryl Cooper.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Studio</p>
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
          <a className="mt-1 block text-ink-soft" href="/#parties">
            Hen &amp; adult parties
          </a>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Cabaret Cerises</p>
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
