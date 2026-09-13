import { ArrowUpRight, Instagram, Facebook } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function Cabaret({ content }: { content: SiteContent }) {
  return (
    <section id="cabaret" className="scroll-mt-20 py-2">
      <div className="sparkle-field relative overflow-hidden">
        <span className="twinkle absolute top-8 left-[12%] h-1.5 w-1.5 rounded-full bg-gold-dust" />
        <span className="twinkle absolute top-16 right-[18%] h-1 w-1 rounded-full bg-gold-soft [animation-delay:0.6s]" />
        <span className="twinkle absolute bottom-20 left-1/3 h-1 w-1 rounded-full bg-white [animation-delay:1.1s]" />
        <span className="twinkle absolute top-1/2 right-10 h-1.5 w-1.5 rounded-full bg-gold-dust [animation-delay:1.8s]" />
        <div className="wrap relative py-10 text-cream">
          <p className="chip bg-gold-dust/15 text-gold-soft">{content.cabaret.eyebrow}</p>
          <h2 className="font-cabaret mt-3 text-3xl tracking-[0.18em] uppercase sm:text-5xl">
            {content.cabaret.name}
          </h2>
          <p className="mt-3 max-w-2xl text-cream/80">{content.cabaret.description}</p>
          <p className="chip mt-3 bg-wine text-gold-soft">18+ · adult-only</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <a href={content.cabaret.ticketsHome} className="btn btn-gold">
              Ticket office
              <ArrowUpRight size={16} />
            </a>
            <a href={content.cabaret.facebook} className="btn btn-line">
              <Facebook size={16} />
              Performance page
            </a>
            <a href={content.cabaret.instagram} className="btn btn-line">
              <Instagram size={16} />
              @CabaretCerises
            </a>
          </div>
          <p className="mt-5 text-sm text-cream/60">
            Shows and tickets: {content.cabaret.email}
          </p>
        </div>
      </div>
    </section>
  );
}
