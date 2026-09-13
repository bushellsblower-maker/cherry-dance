import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function Shop({ content }: { content: SiteContent }) {
  return (
    <section id="shop" className="scroll-mt-24 py-12">
      <div className="wrap">
        <div className="grid items-start gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="chip bg-gold/20 text-ink">Link-out only</p>
            <h2 className="font-display mt-3 text-3xl sm:text-5xl">{content.shop.heading}</h2>
            <p className="mt-3 text-ink-soft">{content.shop.body}</p>
            <a href={content.shop.url} className="btn btn-primary mt-6">
              {content.ctas.shop} on cherry-dance.com
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="grid gap-3">
            {content.shop.items.map((item) => (
              <article
                key={item.name}
                className="rounded-3xl border border-cherry/10 bg-white p-5"
              >
                <h3 className="font-display text-2xl">{item.name}</h3>
                <p className="mt-2 text-sm text-ink-soft">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
