import type { SiteContent } from "@/lib/content";

const ACCENTS = ["bg-petal", "bg-gold/20", "bg-cream-deep", "bg-blush/30"];

export function Classes({ content }: { content: SiteContent }) {
  return (
    <section id="classes" className="scroll-mt-24 py-12">
      <div className="wrap">
        <p className="chip bg-petal text-cherry">Weeknight timetable</p>
        <h2 className="font-display mt-3 text-3xl sm:text-5xl">{content.classes.heading}</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">{content.classes.intro}</p>
        <p className="mt-2 text-sm text-muted">{content.classes.note}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {content.classes.groups.map((group, index) => (
            <article
              key={group.id}
              className="rounded-3xl border border-cherry/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-(--shadow-lift)"
            >
              <p className={`chip ${ACCENTS[index % ACCENTS.length]} text-ink`}>{group.name}</p>
              <ul className="mt-4 space-y-2">
                {group.sessions.map((session) => (
                  <li key={session} className="text-ink-soft">
                    {session}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-6 rounded-3xl bg-ink p-6 text-cream">
          <h3 className="font-display text-2xl">Private classes</h3>
          <p className="mt-3 max-w-3xl text-cream/80">{content.classes.privateNote}</p>
        </div>
      </div>
    </section>
  );
}
