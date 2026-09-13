import { createServerFn } from "@tanstack/react-start";
import { SiteContentSchema } from "@/lib/content";
import {
  readSiteContent,
  resetSiteContent,
  writeSiteContent,
} from "@/lib/content.server";

export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async () => readSiteContent(),
);

export const saveSiteContent = createServerFn({ method: "POST" })
  .validator(SiteContentSchema)
  .handler(async ({ data }) => {
    const saved = await writeSiteContent(data);
    return { content: data, ...saved };
  });

export const resetSiteContentFn = createServerFn({ method: "POST" }).handler(
  async () => resetSiteContent(),
);
