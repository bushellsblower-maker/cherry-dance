import { ArrowUpRight, CalendarHeart, PartyPopper, ShoppingBag, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import type { SiteContent } from "@/lib/content";
import { formatShowDate, formatShowTime, upcomingShows } from "@/lib/content";

export function Hero({ content }: { content: SiteContent }) {
  const next = upcomingShows(content)[0];

  return (
    <section id="top" className="splash-bg relative overflow-hidden">
      <div className="wrap relative grid items-center gap-6 py-8 md:grid-cols-[1.15fr_0.85fr] md:py-10">
        <div className="rise-in">
          <BrandLogo onDark className="h-40 max-w-[min(100%,20rem)] sm:h-48 sm:max-w-[22rem] md:h-56 md:max-w-[26rem]" />
          <p className="chip mt-4 bg-cherry text-white">{content.hero.eyebrow}</p>
          <h1 className="font-display mt-3 text-3xl leading-[1.05] font-semibold text-balance text-cherry sm:text-5xl">
            {content.hero.title}
          </h1>
          <p className="mt-3 max-w-xl text-base text-cherry/90 sm:text-lg">
            {content.hero.subtitle}
          </p>
          <p className="mt-2 text-sm font-medium text-gold-dust">
            {content.hero.foundedLine}
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <a href={content.booking.teamUpUrl} className="btn btn-primary">
              {content.ctas.book}
              <ArrowUpRight size={18} />
            </a>
            <a href={content.shop.url} className="btn btn-line">
              <ShoppingBag size={16} />
              {content.ctas.shop}
            </a>
            <a href="/#shows" className="btn btn-line">
              <CalendarHeart size={16} />
              {content.ctas.shows}
            </a>
            <a href="/#parties" className="btn btn-line">
              <PartyPopper size={16} />
              {content.ctas.hens}
            </a>
          </div>
        </div>
        <div className="relative rise-in">
          <div className="card bg-ink/80 p-4 ring-1 ring-gold-dust/25 sm:p-5">
            <p className="chip bg-wine text-gold-soft">
              <Sparkles size={12} />
              Next on stage
            </p>
            {next ? (
              <>
                <h2 className="font-display mt-3 text-2xl leading-tight text-cream sm:text-3xl">
                  {next.title}
                </h2>
                <p className="mt-2 text-cherry">
                  {next.date ? formatShowDate(next.date) : ""}
                  {formatShowTime(next.time) ? ` · ${formatShowTime(next.time)}` : ""}
                </p>
                <p className="mt-1 text-sm text-cream/70">{next.venue}</p>
                <a href={next.ticketUrl} className="btn btn-gold mt-4 w-full">
                  {content.ctas.tickets}
                  <ArrowUpRight size={16} />
                </a>
              </>
            ) : (
              <p className="mt-3">Watch this space for the next show.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
