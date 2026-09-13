import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { mapsUrl } from "@/lib/utils";

export function Contact({ content }: { content: SiteContent }) {
  return (
    <section id="contact" className="section-block scroll-mt-20">
      <div className="wrap">
        <h2 className="font-display text-3xl text-cream sm:text-4xl">
          {content.contact.heading}
        </h2>
        <div className="mt-5 grid gap-2.5 md:grid-cols-2">
          {content.contact.addresses.map((place) => (
            <a
              key={place.label}
              href={mapsUrl(place.address)}
              className="card no-underline transition hover:-translate-y-0.5"
            >
              <p className="chip bg-cherry text-white">{place.label}</p>
              <p className="mt-3 flex items-start gap-2 text-cream">
                <MapPin className="mt-1 shrink-0 text-cherry" size={18} />
                {place.address}
              </p>
            </a>
          ))}
        </div>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          <a
            href={`tel:${content.contact.phone}`}
            className="card flex items-center gap-3 no-underline"
          >
            <Phone className="text-cherry" />
            <span>
              <strong className="block text-cream">Phone</strong>
              {content.contact.phoneDisplay}
            </span>
          </a>
          <a
            href={`mailto:${content.contact.email}`}
            className="card flex items-center gap-3 no-underline"
          >
            <Mail className="text-cherry" />
            <span>
              <strong className="block text-cream">Studio email</strong>
              {content.contact.email}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
