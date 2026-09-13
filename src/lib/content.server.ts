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
      const content = SiteContentSchema.parse(parsed.content ?? parsed);
      return {
        content,
        persistence: "kv",
        updatedAt: parsed.updatedAt ?? null,
      };
    }
    return { content: cloneSeed(), persistence: "kv", updatedAt: null };
  }

  if (memory.__cherryContent) {
    return {
      content: memory.__cherryContent.content,
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
