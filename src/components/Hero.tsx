import { ArrowUpRight, CalendarHeart, PartyPopper, ShoppingBag, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { CherryMark } from "@/components/CherryMark";
import type { SiteContent } from "@/lib/content";
import { formatShowDate, formatShowTime, upcomingShows } from "@/lib/content";

export function Hero({ content }: { content: SiteContent }) {
  const next = upcomingShows(content)[0];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-petal/70 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blush/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
      </div>
      <div className="wrap relative grid items-center gap-10 py-14 md:grid-cols-[1.15fr_0.85fr] md:py-20">
        <div className="rise-in">
          <BrandLogo className="h-14" />
          <p className="chip mt-5 bg-petal text-cherry">{content.hero.eyebrow}</p>
          <h1 className="font-display mt-4 text-4xl leading-[1.05] font-semibold text-balance sm:text-6xl">
            {content.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">{content.hero.subtitle}</p>
          <p className="mt-3 text-sm font-medium text-cherry">{content.hero.foundedLine}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={content.booking.teamUpUrl} className="btn btn-primary">
              {content.ctas.book}
              <ArrowUpRight size={18} />
            </a>
            <a href={content.shop.url} className="btn btn-ghost">
              <ShoppingBag size={16} />
              {content.ctas.shop}
            </a>
            <a href="/#shows" className="btn btn-ghost">
              <CalendarHeart size={16} />
              {content.ctas.shows}
            </a>
            <a href="/#parties" className="btn btn-ghost">
              <PartyPopper size={16} />
              {content.ctas.hens}
            </a>
          </div>
        </div>
        <div className="relative rise-in">
          <div className="absolute -left-4 top-6 float-cherry">
            <CherryMark className="h-16 w-16 drop-shadow-lg" />
          </div>
          <div className="absolute -right-2 bottom-8 float-cherry float-cherry-delay">
            <CherryMark className="h-12 w-12 opacity-80" />
          </div>
          <div className="rounded-[2rem] bg-ink p-6 text-cream shadow-(--shadow-lift) sm:p-8">
            <p className="chip bg-wine text-gold-soft">
              <Sparkles size={12} />
              Next on stage
            </p>
            {next ? (
              <>
                <h2 className="font-display mt-4 text-3xl leading-tight">{next.title}</h2>
                <p className="mt-3 text-petal">
                  {next.date ? formatShowDate(next.date) : ""}
                  {formatShowTime(next.time) ? ` · ${formatShowTime(next.time)}` : ""}
                </p>
                <p className="mt-1 text-sm text-cream/70">{next.venue}</p>
                <a href={next.ticketUrl} className="btn btn-gold mt-6 w-full">
                  {content.ctas.tickets}
                  <ArrowUpRight size={16} />
                </a>
              </>
            ) : (
              <p className="mt-4">Watch this space for the next show.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
