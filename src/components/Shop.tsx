import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function Shop({ content }: { content: SiteContent }) {
  return (
    <section id="shop" className="section-block scroll-mt-20">
      <div className="wrap">
        <div className="grid items-start gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="chip bg-gold-dust text-ink">Link-out only</p>
            <h2 className="font-display mt-2 text-3xl text-cream sm:text-4xl">
              {content.shop.heading}
            </h2>
            <p className="mt-2 text-sm text-cream/85">{content.shop.body}</p>
            <p className="mt-1.5 text-sm text-muted">{content.shop.priceNote}</p>
            <a href={content.shop.url} className="btn btn-primary mt-4">
              {content.shop.ctaLabel}
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="grid gap-2">
            {content.shop.items.map((item) => (
              <article key={item.name} className="card py-3">
                <h3 className="font-display text-lg text-cream">{item.name}</h3>
                <p className="mt-1 text-sm text-gold-dust">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
