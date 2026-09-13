import { ArrowUpRight, Mail } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function WeddingDances({ content }: { content: SiteContent }) {
  const { wedding } = content;

  return (
    <section id="wedding" className="section-block scroll-mt-20">
      <div className="wrap">
        <p className="chip bg-gold-dust text-ink">First dance</p>
        <h2 className="font-display mt-2 text-3xl text-cherry sm:text-4xl">
          {wedding.heading}
        </h2>
        <p className="mt-3 max-w-3xl text-cream/85">{wedding.intro}</p>
        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {wedding.photos.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="h-52 w-full object-cover sm:h-56"
            />
          ))}
        </div>
        <blockquote className="card mt-5 border-l-4 border-cherry text-sm text-cream/90 italic">
          “{wedding.review.text}”
          {wedding.review.by ? (
            <footer className="mt-2 not-italic font-semibold text-gold-dust">
              — {wedding.review.by}
            </footer>
          ) : null}
        </blockquote>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <a href="/#contact" className="btn btn-primary">
            <Mail size={16} />
            Contact the studio
          </a>
          <a href={wedding.pageUrl} className="btn btn-line">
            {wedding.pageLabel}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
