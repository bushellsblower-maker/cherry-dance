import { ArrowUpRight, Mail } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function HenParties({ content }: { content: SiteContent }) {
  const hens = content.henParties;
  const photos = hens.photos.length ? hens.photos : [hens.heroImage];
  const singles = hens.packages.slice(0, 3);
  const bundles = hens.packages.slice(3);

  return (
    <section id="parties" className="section-block scroll-mt-20">
      <div className="wrap">
        <div className="mb-4 grid gap-2 sm:grid-cols-3">
          {photos.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="h-48 w-full object-cover sm:h-56"
            />
          ))}
        </div>
        <p className="chip bg-cherry text-white">Adult parties</p>
        <h2 className="font-display mt-2 text-3xl text-cream sm:text-4xl">
          {hens.heading}
        </h2>
        <p className="mt-3 max-w-2xl text-cream/85">{hens.intro}</p>
        <div className="mt-5 grid gap-2.5 md:grid-cols-3">
          {singles.map((pack) => (
            <article key={pack.name} className="card">
              <h3 className="font-display text-xl tracking-wide text-cherry">
                {pack.name}
              </h3>
              <p className="mt-1.5 text-sm text-cream/85">{pack.price}</p>
              {pack.includes ? (
                <p className="mt-1.5 text-sm text-cream/70">{pack.includes}</p>
              ) : null}
            </article>
          ))}
        </div>
        <div className="mt-2.5 grid gap-2.5 md:grid-cols-2">
          {bundles.map((pack) => (
            <article key={pack.name} className="card">
              <h3 className="font-display text-xl tracking-wide text-cherry">
                {pack.name}
              </h3>
              <p className="mt-1 font-semibold text-gold-dust">{pack.price}</p>
              {pack.includes ? (
                <p className="mt-1.5 text-sm text-cream/80">{pack.includes}</p>
              ) : null}
            </article>
          ))}
        </div>
        <div className="mt-5 bg-cherry px-4 py-4 text-center">
          <p className="font-display text-xl tracking-wide text-white uppercase sm:text-2xl">
            {hens.designOwn}
          </p>
          <p className="mt-1.5 text-sm text-white/85">{hens.designNote}</p>
        </div>
        <div className="mt-5 grid gap-2.5 md:grid-cols-2">
          {hens.reviews.map((review) => (
            <blockquote key={review.text} className="card text-sm text-cream/85 italic">
              “{review.text}”
              {review.by ? (
                <footer className="mt-2 not-italic font-semibold text-gold-dust">
                  — {review.by}
                </footer>
              ) : null}
            </blockquote>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <a href="/#contact" className="btn btn-primary">
            <Mail size={16} />
            {hens.contactLabel}
          </a>
          <a href={hens.pageUrl} className="btn btn-line">
            {hens.pageLabel}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
