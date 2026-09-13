import { Facebook, Instagram } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function Socials({ content }: { content: SiteContent }) {
  return (
    <section id="socials" className="section-block scroll-mt-20">
      <div className="wrap">
        <h2 className="font-display text-2xl text-cream sm:text-3xl">Stay in the studio loop</h2>
        <p className="mt-2 max-w-xl text-sm text-ink-soft">
          Cherry Dance on Facebook and Instagram. Cabaret Cerises has its own
          performance accounts in the cabaret section above.
        </p>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          <a
            href={content.socials.facebook}
            className="card flex items-center gap-3 no-underline transition hover:-translate-y-0.5"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-cherry text-white">
              <Facebook size={18} />
            </span>
            <span>
              <strong className="block text-cream">Facebook</strong>
              <span className="text-sm text-muted">cherrydancestudio7</span>
            </span>
          </a>
          <a
            href={content.socials.instagram}
            className="card flex items-center gap-3 no-underline transition hover:-translate-y-0.5"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-cherry text-white">
              <Instagram size={18} />
            </span>
            <span>
              <strong className="block text-cream">Instagram</strong>
              <span className="text-sm text-muted">@cherry_dance</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
