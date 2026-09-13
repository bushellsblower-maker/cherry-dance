import { ArrowUpRight, Mail } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function Booking({ content }: { content: SiteContent }) {
  return (
    <section id="book" className="section-block scroll-mt-20">
      <div className="wrap overflow-hidden bg-gradient-to-br from-cherry to-cherry-deep p-5 text-white sm:p-7">
        <p className="chip bg-white/15 text-white">TeamUp</p>
        <h2 className="font-display mt-2 text-3xl sm:text-4xl">{content.booking.heading}</h2>
        <p className="mt-3 max-w-2xl text-white/90">{content.booking.body}</p>
        <p className="mt-2 max-w-2xl text-sm text-white/75">{content.booking.teamUpNote}</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <a href={content.booking.teamUpUrl} className="btn bg-white text-cherry">
            Open TeamUp schedule
            <ArrowUpRight size={18} />
          </a>
          <a
            href={`mailto:${content.booking.privateEmail}`}
            className="btn border border-white/30 bg-white/10 text-white"
          >
            <Mail size={16} />
            Private class email
          </a>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-white/80">{content.booking.privateNote}</p>
      </div>
    </section>
  );
}
