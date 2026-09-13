import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import type { Performance, SiteContent } from "@/lib/content";
import {
  formatShowDate,
  formatShowTime,
  pastShows,
  scheduledShows,
  upcomingShows,
} from "@/lib/content";
import { cx } from "@/lib/utils";

function StatusChip({ status }: { status: Performance["status"] }) {
  if (status === "upcoming") {
    return <span className="chip bg-cherry text-white">Upcoming</span>;
  }
  if (status === "scheduled") {
    return <span className="chip bg-gold-dust/20 text-gold-soft">Scheduled</span>;
  }
  return <span className="chip bg-white/10 text-muted">Recent</span>;
}

function ShowCard({
  show,
  ticketsLabel,
  featured = false,
}: {
  show: Performance;
  ticketsLabel: string;
  featured?: boolean;
}) {
  const dateLabel = show.date ? formatShowDate(show.date) : show.dates?.map(formatShowDate).join(" · ");
  const timeLabel = formatShowTime(show.time);

  return (
    <article
      className={cx(
        "card flex h-full flex-col",
        featured ? "ring-1 ring-cherry/40" : "",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <StatusChip status={show.status} />
        {show.ageRestricted ? (
          <span className="chip bg-ink text-gold-soft">18+</span>
        ) : null}
      </div>
      <h3 className="font-display mt-2.5 text-xl leading-tight text-cream">{show.title}</h3>
      <p className="mt-2 flex items-start gap-2 text-sm text-ink-soft">
        <Clock3 size={16} className="mt-0.5 shrink-0" />
        <span>
          {dateLabel}
          {timeLabel ? ` · ${timeLabel}` : ""}
          {show.price ? ` · ${show.price}` : ""}
        </span>
      </p>
      <p className="mt-1.5 flex items-start gap-2 text-sm text-ink-soft">
        <MapPin size={16} className="mt-0.5 shrink-0" />
        {show.venue}
      </p>
      {show.notes ? <p className="mt-2 text-sm text-muted">{show.notes}</p> : null}
      <a href={show.ticketUrl} className="btn btn-primary mt-4 self-start py-1.5 text-sm">
        {ticketsLabel}
        <ArrowUpRight size={16} />
      </a>
    </article>
  );
}

export function Shows({ content }: { content: SiteContent }) {
  const upcoming = upcomingShows(content);
  const scheduled = scheduledShows(content);
  const recent = pastShows(content);

  return (
    <section id="shows" className="section-block scroll-mt-20">
      <div className="wrap">
        <p className="chip bg-cherry text-white">Don&apos;t hunt for dates</p>
        <h2 className="font-display mt-2 text-3xl text-cream sm:text-4xl">
          Upcoming performances
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-cream/80">
          Cabaret Cerises dates with direct Online Ticket Seller event links.
          All listed shows are 18+. Ticket prices are not published here —
          open the seller page for current availability.
        </p>
        <div className="mt-5 grid gap-2.5 md:grid-cols-2">
          {upcoming.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              ticketsLabel={content.ctas.tickets}
              featured
            />
          ))}
        </div>
        {scheduled.length ? (
          <div className="mt-6">
            <h3 className="font-display text-xl text-gold-dust">2027 Grove Theatre season</h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Friday dates at The Grove Theatre, Eastbourne. Each date has its own
              Online Ticket Seller event. Typically 8–10pm; 18+; no door sales.
              Grove Theatre is stairs only, with no wheelchair access (as stated
              on the ticket pages).
            </p>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {scheduled.map((show) => (
                <ShowCard
                  key={show.id}
                  show={show}
                  ticketsLabel={content.ctas.tickets}
                />
              ))}
            </div>
          </div>
        ) : null}
        {recent.length ? (
          <div className="mt-6">
            <h3 className="font-display text-xl text-gold-dust">Just gone</h3>
            <div className="mt-3 grid gap-2.5 md:grid-cols-2">
              {recent.map((show) => (
                <ShowCard
                  key={show.id}
                  show={show}
                  ticketsLabel="Venue page"
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
