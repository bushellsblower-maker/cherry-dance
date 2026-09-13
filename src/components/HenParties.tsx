import { ArrowUpRight, Mail } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function HenParties({ content }: { content: SiteContent }) {
  return (
    <section id="parties" className="scroll-mt-24 py-12">
      <div className="wrap">
        <p className="chip bg-cherry text-white">Adult parties</p>
        <h2 className="font-display mt-3 text-3xl sm:text-5xl">
          {content.henParties.heading}
        </h2>
        <p className="mt-3 max-w-2xl text-ink-soft">{content.henParties.intro}</p>
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {content.henParties.packages.map((pack) => (
            <article
              key={pack.name}
              className="rounded-3xl border border-cherry/10 bg-white p-5"
            >
              <h3 className="font-display text-2xl">{pack.name}</h3>
              <p className="mt-2 text-lg font-semibold text-cherry">{pack.price}</p>
              {pack.includes ? (
                <p className="mt-2 text-sm text-ink-soft">{pack.includes}</p>
              ) : null}
            </article>
          ))}
        </div>
        <p className="mt-6 text-ink-soft">{content.henParties.designNote}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="/#contact" className="btn btn-primary">
            <Mail size={16} />
            {content.henParties.contactLabel}
          </a>
          <a href={content.henParties.pageUrl} className="btn btn-ghost">
            {content.henParties.pageLabel}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
