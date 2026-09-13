import { Facebook, Instagram } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function Socials({ content }: { content: SiteContent }) {
  return (
    <section id="socials" className="scroll-mt-24 py-12">
      <div className="wrap">
        <h2 className="font-display text-3xl sm:text-4xl">Stay in the studio loop</h2>
        <p className="mt-3 max-w-xl text-ink-soft">
          Cherry Dance on Facebook and Instagram. Cabaret Cerises has its own
          performance accounts in the cabaret section above.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            href={content.socials.facebook}
            className="flex items-center gap-4 rounded-3xl bg-white p-5 no-underline shadow-sm ring-1 ring-cherry/10 transition hover:-translate-y-1"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-petal text-cherry">
              <Facebook />
            </span>
            <span>
              <strong className="block">Facebook</strong>
              <span className="text-sm text-muted">cherrydancestudio7</span>
            </span>
          </a>
          <a
            href={content.socials.instagram}
            className="flex items-center gap-4 rounded-3xl bg-white p-5 no-underline shadow-sm ring-1 ring-cherry/10 transition hover:-translate-y-1"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-petal text-cherry">
              <Instagram />
            </span>
            <span>
              <strong className="block">Instagram</strong>
              <span className="text-sm text-muted">@cherry_dance</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
