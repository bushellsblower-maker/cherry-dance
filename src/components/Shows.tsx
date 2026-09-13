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
    return <span className="chip bg-gold/20 text-ink">Scheduled</span>;
  }
  return <span className="chip bg-cream-deep text-muted">Recent</span>;
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
        "flex h-full flex-col rounded-3xl border p-5 transition hover:-translate-y-1",
        featured
          ? "border-cherry/20 bg-white shadow-(--shadow-lift)"
          : "border-cherry/10 bg-white/70",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <StatusChip status={show.status} />
        {show.ageRestricted ? (
          <span className="chip bg-ink text-gold-soft">18+</span>
        ) : null}
      </div>
      <h3 className="font-display mt-4 text-2xl leading-tight">{show.title}</h3>
      <p className="mt-3 flex items-start gap-2 text-sm text-ink-soft">
        <Clock3 size={16} className="mt-0.5 shrink-0" />
        <span>
          {dateLabel}
          {timeLabel ? ` · ${timeLabel}` : ""}
          {show.price ? ` · ${show.price}` : ""}
        </span>
      </p>
      <p className="mt-2 flex items-start gap-2 text-sm text-ink-soft">
        <MapPin size={16} className="mt-0.5 shrink-0" />
        {show.venue}
      </p>
      {show.notes ? <p className="mt-3 text-sm text-muted">{show.notes}</p> : null}
      <a href={show.ticketUrl} className="btn btn-primary mt-5 self-start">
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
    <section id="shows" className="scroll-mt-24 py-8 md:py-12">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="chip bg-petal text-cherry">Don&apos;t hunt for dates</p>
            <h2 className="font-display mt-3 text-3xl sm:text-5xl">Upcoming performances</h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
              Cabaret Cerises dates with direct Online Ticket Seller event links.
              All listed shows are 18+. Ticket prices are not published here —
              open the seller page for current availability.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
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
          <div className="mt-10">
            <h3 className="font-display text-2xl">2027 Grove Theatre season</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Friday dates at The Grove Theatre, Eastbourne. Each date has its own
              Online Ticket Seller event. Typically 8–10pm; 18+; no door sales.
              Grove Theatre is stairs only, with no wheelchair access (as stated
              on the ticket pages).
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="mt-10">
            <h3 className="font-display text-2xl">Just gone</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
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
