import { ArrowUpRight, Mail } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function Booking({ content }: { content: SiteContent }) {
  return (
    <section id="book" className="scroll-mt-24 py-12">
      <div className="wrap overflow-hidden rounded-[2rem] bg-gradient-to-br from-cherry to-cherry-deep p-6 text-white sm:p-10">
        <p className="chip bg-white/15 text-white">TeamUp</p>
        <h2 className="font-display mt-3 text-3xl sm:text-5xl">{content.booking.heading}</h2>
        <p className="mt-4 max-w-2xl text-lg text-white/90">{content.booking.body}</p>
        <p className="mt-3 max-w-2xl text-sm text-white/75">{content.booking.teamUpNote}</p>
        <div className="mt-8 flex flex-wrap gap-3">
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
        <p className="mt-6 max-w-2xl text-sm text-white/80">{content.booking.privateNote}</p>
      </div>
    </section>
  );
}
