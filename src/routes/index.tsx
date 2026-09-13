import { createFileRoute } from "@tanstack/react-router";
import { Booking } from "@/components/Booking";
import { Cabaret } from "@/components/Cabaret";
import { Classes } from "@/components/Classes";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { HenParties } from "@/components/HenParties";
import { Instructors } from "@/components/Instructors";
import { Shop } from "@/components/Shop";
import { Shows } from "@/components/Shows";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Socials } from "@/components/Socials";
import { WeddingDances } from "@/components/WeddingDances";
import { getSiteContent } from "@/lib/content.functions";

export const Route = createFileRoute("/")({
  loader: () => getSiteContent(),
  component: HomePage,
});

function HomePage() {
  const { content } = Route.useLoaderData();

  return (
    <div className="min-h-dvh">
      <SiteHeader content={content} />
      <main>
        <Hero content={content} />
        <Shows content={content} />
        <Classes content={content} />
        <Instructors content={content} />
        <WeddingDances content={content} />
        <HenParties content={content} />
        <Booking content={content} />
        <Shop content={content} />
        <Cabaret content={content} />
        <Socials content={content} />
        <Contact content={content} />
      </main>
      <SiteFooter content={content} />
    </div>
  );
}
