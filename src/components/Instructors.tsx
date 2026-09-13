import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { cx } from "@/lib/utils";

export function Instructors({ content }: { content: SiteContent }) {
  return (
    <section>
      <div id="instructors" className="wrap section-block scroll-mt-20 pb-3">
        <p className="chip bg-cherry text-white">The team</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl text-cream sm:text-4xl">
            {content.instructors.heading}
          </h2>
          <a href={content.instructors.pageUrl} className="btn btn-line py-1.5 text-sm">
            {content.instructors.pageLabel}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      {content.instructors.people.map((person, index) => {
        const light = index % 2 === 0;
        return (
          <article
            key={person.name}
            className={cx(light ? "bg-petal/90 text-ink" : "splash-bleed text-cream")}
          >
            <div className="wrap grid items-start gap-4 py-6 md:grid-cols-[200px_1fr] md:gap-6">
              <img
                src={person.photo}
                alt={person.name}
                className={cx(
                  "w-full max-h-72 object-contain object-top",
                  light ? "bg-white/40" : "bg-black/30",
                )}
              />
              <div>
                <h3 className="font-display text-3xl tracking-wide text-cherry uppercase sm:text-4xl">
                  {person.name}
                </h3>
                <p
                  className={cx(
                    "mt-1 text-sm font-semibold",
                    light ? "text-ink/70" : "text-gold-dust",
                  )}
                >
                  {person.role}
                </p>
                <p
                  className={cx(
                    "mt-3 text-sm leading-relaxed sm:text-[0.95rem]",
                    light ? "text-ink/85" : "text-cream/85",
                  )}
                >
                  {person.bio}
                </p>
                {person.quote ? (
                  <blockquote className="mt-3 border-l-2 border-cherry pl-3 text-sm text-cherry italic">
                    “{person.quote}”
                    {person.quoteBy ? (
                      <footer className="mt-1 not-italic font-semibold">
                        — {person.quoteBy}
                      </footer>
                    ) : null}
                  </blockquote>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
      <p className="wrap py-4 text-sm text-gold-dust">{content.instructors.note}</p>
    </section>
  );
}
