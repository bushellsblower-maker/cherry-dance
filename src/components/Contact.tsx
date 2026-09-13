import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { mapsUrl } from "@/lib/utils";

export function Contact({ content }: { content: SiteContent }) {
  return (
    <section id="contact" className="scroll-mt-24 py-12">
      <div className="wrap">
        <h2 className="font-display text-3xl sm:text-5xl">{content.contact.heading}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {content.contact.addresses.map((place) => (
            <a
              key={place.label}
              href={mapsUrl(place.address)}
              className="rounded-3xl border border-cherry/10 bg-white p-5 no-underline transition hover:-translate-y-1"
            >
              <p className="chip bg-petal text-cherry">{place.label}</p>
              <p className="mt-4 flex items-start gap-2 text-lg">
                <MapPin className="mt-1 shrink-0 text-cherry" size={18} />
                {place.address}
              </p>
            </a>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            href={`tel:${content.contact.phone}`}
            className="flex items-center gap-3 rounded-3xl bg-cream-deep p-5 no-underline"
          >
            <Phone className="text-cherry" />
            <span>
              <strong className="block">Phone</strong>
              {content.contact.phoneDisplay}
            </span>
          </a>
          <a
            href={`mailto:${content.contact.email}`}
            className="flex items-center gap-3 rounded-3xl bg-cream-deep p-5 no-underline"
          >
            <Mail className="text-cherry" />
            <span>
              <strong className="block">Studio email</strong>
              {content.contact.email}
            </span>
          </a>
        </div>
        <div className="mt-10">
          <h3 className="font-display text-2xl">{content.instructors.heading}</h3>
          <p className="mt-2 text-sm text-muted">{content.instructors.note}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {content.instructors.people.map((person) => (
              <article key={person.name} className="rounded-3xl bg-white p-5 ring-1 ring-cherry/10">
                <h4 className="font-display text-xl">{person.name}</h4>
                <p className="mt-2 text-sm text-ink-soft">{person.role}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
