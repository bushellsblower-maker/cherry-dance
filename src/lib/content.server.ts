import seed from "@/data/site-content.json";
import {
  SiteContentSchema,
  type Persistence,
  type SiteContent,
} from "@/lib/content";

const CONTENT_KEY = "site-content";

type KvLike = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

type MemoryBucket = {
  content: SiteContent;
  updatedAt: string;
};

const memory = globalThis as typeof globalThis & {
  __cherryContent?: MemoryBucket;
};

function cloneSeed(): SiteContent {
  return SiteContentSchema.parse(structuredClone(seed));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeNamedPeople(
  seedPeople: SiteContent["instructors"]["people"],
  stored: unknown,
): SiteContent["instructors"]["people"] {
  if (!Array.isArray(stored)) return seedPeople;
  return seedPeople.map((person) => {
    const match = stored.find(
      (entry) => isRecord(entry) && entry.name === person.name,
    );
    if (!isRecord(match)) return person;
    return {
      ...person,
      ...match,
      photo:
        typeof match.photo === "string" && match.photo
          ? match.photo
          : person.photo,
      bio: typeof match.bio === "string" && match.bio ? match.bio : person.bio,
      quote:
        typeof match.quote === "string" && match.quote
          ? match.quote
          : person.quote,
      quoteBy:
        typeof match.quoteBy === "string" && match.quoteBy
          ? match.quoteBy
          : person.quoteBy,
    };
  });
}

function hydrateContent(stored: unknown): SiteContent {
  const base = cloneSeed();
  if (!isRecord(stored)) return base;

  const next: SiteContent = {
    ...base,
    ...stored,
    hero: { ...base.hero, ...(isRecord(stored.hero) ? stored.hero : {}) },
    classes: {
      ...base.classes,
      ...(isRecord(stored.classes) ? stored.classes : {}),
      groups: Array.isArray(isRecord(stored.classes) ? stored.classes.groups : null)
        ? (stored.classes as SiteContent["classes"]).groups
        : base.classes.groups,
    },
    booking: {
      ...base.booking,
      ...(isRecord(stored.booking) ? stored.booking : {}),
    },
    shop: {
      ...base.shop,
      ...(isRecord(stored.shop) ? stored.shop : {}),
      items: Array.isArray(isRecord(stored.shop) ? stored.shop.items : null)
        ? (stored.shop as SiteContent["shop"]).items
        : base.shop.items,
    },
    henParties: {
      ...base.henParties,
      ...(isRecord(stored.henParties) ? stored.henParties : {}),
      packages: Array.isArray(
        isRecord(stored.henParties) ? stored.henParties.packages : null,
      )
        ? (stored.henParties as SiteContent["henParties"]).packages
        : base.henParties.packages,
      reviews: Array.isArray(
        isRecord(stored.henParties) ? stored.henParties.reviews : null,
      ) && (stored.henParties as { reviews: unknown[] }).reviews.length
        ? (stored.henParties as SiteContent["henParties"]).reviews
        : base.henParties.reviews,
      heroImage:
        isRecord(stored.henParties) &&
        typeof stored.henParties.heroImage === "string" &&
        stored.henParties.heroImage
          ? stored.henParties.heroImage
          : base.henParties.heroImage,
      designOwn:
        isRecord(stored.henParties) &&
        typeof stored.henParties.designOwn === "string" &&
        stored.henParties.designOwn
          ? stored.henParties.designOwn
          : base.henParties.designOwn,
    },
    wedding: {
      ...base.wedding,
      ...(isRecord(stored.wedding) ? stored.wedding : {}),
      photos:
        isRecord(stored.wedding) &&
        Array.isArray(stored.wedding.photos) &&
        stored.wedding.photos.length
          ? (stored.wedding.photos as string[])
          : base.wedding.photos,
      review: {
        ...base.wedding.review,
        ...(isRecord(stored.wedding) && isRecord(stored.wedding.review)
          ? stored.wedding.review
          : {}),
      },
    },
    socials: {
      ...base.socials,
      ...(isRecord(stored.socials) ? stored.socials : {}),
    },
    cabaret: {
      ...base.cabaret,
      ...(isRecord(stored.cabaret) ? stored.cabaret : {}),
    },
    performances: Array.isArray(stored.performances)
      ? (stored.performances as SiteContent["performances"])
      : base.performances,
    contact: {
      ...base.contact,
      ...(isRecord(stored.contact) ? stored.contact : {}),
      addresses: Array.isArray(
        isRecord(stored.contact) ? stored.contact.addresses : null,
      )
        ? (stored.contact as SiteContent["contact"]).addresses
        : base.contact.addresses,
    },
    instructors: {
      ...base.instructors,
      ...(isRecord(stored.instructors) ? stored.instructors : {}),
      people: mergeNamedPeople(
        base.instructors.people,
        isRecord(stored.instructors) ? stored.instructors.people : undefined,
      ),
    },
    ctas: { ...base.ctas, ...(isRecord(stored.ctas) ? stored.ctas : {}) },
  };

  return SiteContentSchema.parse(next);
}

async function getKv(): Promise<KvLike | null> {
  try {
    const mod = (await import("cloudflare:workers")) as {
      env?: { SITE_CONTENT?: KvLike };
    };
    return mod.env?.SITE_CONTENT ?? null;
  } catch {
    return null;
  }
}

export async function readSiteContent(): Promise<{
  content: SiteContent;
  persistence: Persistence;
  updatedAt: string | null;
}> {
  const kv = await getKv();
  if (kv) {
    const raw = await kv.get(CONTENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as {
        content?: unknown;
        updatedAt?: string;
      };
      return {
        content: hydrateContent(parsed.content ?? parsed),
        persistence: "kv",
        updatedAt: parsed.updatedAt ?? null,
      };
    }
    return { content: cloneSeed(), persistence: "kv", updatedAt: null };
  }

  if (memory.__cherryContent) {
    return {
      content: hydrateContent(memory.__cherryContent.content),
      persistence: "memory",
      updatedAt: memory.__cherryContent.updatedAt,
    };
  }

  return { content: cloneSeed(), persistence: "seed", updatedAt: null };
}

export async function writeSiteContent(content: SiteContent): Promise<{
  persistence: Persistence;
  updatedAt: string;
}> {
  const parsed = SiteContentSchema.parse(content);
  const updatedAt = new Date().toISOString();
  const kv = await getKv();
  if (kv) {
    await kv.put(CONTENT_KEY, JSON.stringify({ content: parsed, updatedAt }));
    return { persistence: "kv", updatedAt };
  }

  memory.__cherryContent = { content: parsed, updatedAt };
  return { persistence: "memory", updatedAt };
}

export async function resetSiteContent() {
  const content = cloneSeed();
  const saved = await writeSiteContent(content);
  return { content, ...saved };
}
