import { z } from "zod";

export const PersistenceSchema = z.enum(["kv", "memory", "seed"]);
export type Persistence = z.infer<typeof PersistenceSchema>;

export const PerformanceStatusSchema = z.enum([
  "upcoming",
  "passed",
  "scheduled",
]);
export type PerformanceStatus = z.infer<typeof PerformanceStatusSchema>;

export const PerformanceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  date: z.string().optional(),
  time: z.string().optional(),
  dates: z.array(z.string()).optional(),
  venue: z.string().min(1),
  price: z.string().optional(),
  ticketUrl: z.string().min(1),
  status: PerformanceStatusSchema,
  notes: z.string().optional(),
  ageRestricted: z.boolean().optional(),
});
export type Performance = z.infer<typeof PerformanceSchema>;

export const ClassGroupSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  sessions: z.array(z.string()),
});
export type ClassGroup = z.infer<typeof ClassGroupSchema>;

export const AddressSchema = z.object({
  label: z.string().min(1),
  address: z.string().min(1),
});
export type Address = z.infer<typeof AddressSchema>;

export const ShopItemSchema = z.object({
  name: z.string().min(1),
  detail: z.string().min(1),
});
export type ShopItem = z.infer<typeof ShopItemSchema>;

export const HenPackageSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  includes: z.string().optional(),
});
export type HenPackage = z.infer<typeof HenPackageSchema>;

export const ReviewSchema = z.object({
  text: z.string().min(1),
  by: z.string().optional(),
});
export type Review = z.infer<typeof ReviewSchema>;

export const InstructorSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  photo: z.string().min(1),
  bio: z.string().min(1),
  quote: z.string().optional(),
  quoteBy: z.string().optional(),
});
export type Instructor = z.infer<typeof InstructorSchema>;

export const SiteContentSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    foundedLine: z.string(),
  }),
  classes: z.object({
    heading: z.string(),
    intro: z.string(),
    note: z.string(),
    groups: z.array(ClassGroupSchema),
    privateNote: z.string(),
  }),
  booking: z.object({
    heading: z.string(),
    body: z.string(),
    teamUpNote: z.string(),
    privateNote: z.string(),
    teamUpUrl: z.string(),
    privateEmail: z.string(),
  }),
  shop: z.object({
    heading: z.string(),
    body: z.string(),
    url: z.string(),
    ctaLabel: z.string(),
    priceNote: z.string(),
    items: z.array(ShopItemSchema),
  }),
  henParties: z.object({
    heading: z.string(),
    intro: z.string(),
    designOwn: z.string(),
    designNote: z.string(),
    contactLabel: z.string(),
    pageUrl: z.string(),
    pageLabel: z.string(),
    heroImage: z.string(),
    photos: z.array(z.string()),
    packages: z.array(HenPackageSchema),
    reviews: z.array(ReviewSchema),
  }),
  wedding: z.object({
    heading: z.string(),
    intro: z.string(),
    firstDanceTitle: z.string(),
    personalTouch: z.string(),
    personalNote: z.string(),
    sessionRate: z.string(),
    sessionNote: z.string(),
    pageUrl: z.string(),
    pageLabel: z.string(),
    photos: z.array(z.string()),
    review: ReviewSchema,
  }),
  socials: z.object({
    facebook: z.string(),
    instagram: z.string(),
  }),
  cabaret: z.object({
    name: z.string(),
    eyebrow: z.string(),
    description: z.string(),
    email: z.string(),
    facebook: z.string(),
    instagram: z.string(),
    ticketsHome: z.string(),
    wixSite: z.string(),
  }),
  performances: z.array(PerformanceSchema),
  contact: z.object({
    heading: z.string(),
    email: z.string(),
    phone: z.string(),
    phoneDisplay: z.string(),
    addresses: z.array(AddressSchema),
    cabaretEmail: z.string(),
  }),
  instructors: z.object({
    heading: z.string(),
    note: z.string(),
    pageUrl: z.string(),
    pageLabel: z.string(),
    people: z.array(InstructorSchema),
  }),
  ctas: z.object({
    book: z.string(),
    shop: z.string(),
    shows: z.string(),
    tickets: z.string(),
    hens: z.string(),
    wedding: z.string(),
  }),
});
export type SiteContent = z.infer<typeof SiteContentSchema>;

export type ContentPayload = {
  content: SiteContent;
  persistence: Persistence;
  updatedAt: string | null;
};

export function formatShowDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShowTime(time?: string) {
  if (!time) return null;
  const [h, m] = time.split(":");
  if (!h) return time;
  const hour = Number(h);
  if (Number.isNaN(hour)) return time;
  const suffix = hour >= 12 ? "pm" : "am";
  const hour12 = hour % 12 || 12;
  return m && m !== "00" ? `${hour12}.${m}${suffix}` : `${hour12}${suffix}`;
}

export function upcomingShows(content: SiteContent) {
  return content.performances.filter((show) => show.status === "upcoming");
}

export function scheduledShows(content: SiteContent) {
  return content.performances.filter((show) => show.status === "scheduled");
}

export function pastShows(content: SiteContent) {
  return content.performances.filter((show) => show.status === "passed");
}
