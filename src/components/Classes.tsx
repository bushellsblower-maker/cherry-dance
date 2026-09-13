import type { SiteContent } from "@/lib/content";

const ACCENTS = [
  "bg-[#6b1224] text-cream",
  "bg-gold-dust text-ink",
  "bg-cherry text-white",
  "bg-[#3d0710] text-cream",
];

export function Classes({ content }: { content: SiteContent }) {
  return (
    <section id="classes" className="section-block scroll-mt-20">
      <div className="wrap">
        <p className="chip bg-cherry text-white">Weeknight timetable</p>
        <h2 className="font-display mt-2 text-3xl text-cream sm:text-4xl">
          {content.classes.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-cream/85">{content.classes.intro}</p>
        <p className="mt-1.5 text-sm text-muted">{content.classes.note}</p>
        <div className="mt-5 grid gap-2.5 md:grid-cols-2">
          {content.classes.groups.map((group, index) => (
            <article key={group.id} className={`p-4 ${ACCENTS[index % ACCENTS.length]}`}>
              <p className="font-display text-xl tracking-wide uppercase">{group.name}</p>
              <ul className="mt-2.5 space-y-1 text-sm">
                {group.sessions.map((session) => (
                  <li key={session}>{session}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="card mt-4 bg-ink/70 p-4">
          <h3 className="font-display text-xl text-gold-dust">Private classes</h3>
          <p className="mt-2 max-w-3xl text-sm text-cream/80">{content.classes.privateNote}</p>
        </div>
      </div>
    </section>
  );
}
