import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  getSiteContent,
  resetSiteContentFn,
  saveSiteContent,
} from "@/lib/content.functions";
import type { Persistence, SiteContent } from "@/lib/content";
import { SiteContentSchema } from "@/lib/content";

export const Route = createFileRoute("/admin")({
  loader: () => getSiteContent(),
  component: AdminPage,
});

function emptyShow(): SiteContent["performances"][number] {
  return {
    id: `show-${crypto.randomUUID()}`,
    title: "",
    date: "",
    venue: "",
    ticketUrl: "https://cabaretcerises.onlineticketseller.com/",
    status: "upcoming",
  };
}

function AdminPage() {
  const loaded = Route.useLoaderData();
  const [draft, setDraft] = useState<SiteContent>(() =>
    structuredClone(loaded.content),
  );
  const [persistence, setPersistence] = useState<Persistence>(loaded.persistence);
  const [updatedAt, setUpdatedAt] = useState(loaded.updatedAt);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const jsonPreview = useMemo(() => JSON.stringify(draft, null, 2), [draft]);

  const persistLabel =
    persistence === "kv"
      ? "Cloudflare KV"
      : persistence === "memory"
        ? "in-memory (this isolate only)"
        : "seed JSON (not yet saved)";

  async function save() {
    setBusy(true);
    setStatus(null);
    try {
      const parsed = SiteContentSchema.parse(draft);
      const result = await saveSiteContent({ data: parsed });
      setDraft(result.content);
      setPersistence(result.persistence);
      setUpdatedAt(result.updatedAt);
      setStatus(
        result.persistence === "kv"
          ? "Saved to Cloudflare KV."
          : "Saved in memory for this Worker isolate. Bind SITE_CONTENT KV for durable saves.",
      );
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    setBusy(true);
    setStatus(null);
    try {
      const result = await resetSiteContentFn();
      setDraft(result.content);
      setPersistence(result.persistence);
      setUpdatedAt(result.updatedAt);
      setStatus("Reset to research-pack seed.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Reset failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-dvh bg-cream">
      <div className="border-b border-amber-300 bg-amber-100 px-4 py-3 text-center text-sm font-semibold text-amber-950">
        Demo CMS — no authentication yet. Do not put real secrets here. Anyone
        who can open /admin can edit.
      </div>
      <div className="wrap py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link to="/" className="text-sm text-cherry no-underline">
              ← Public site
            </Link>
            <h1 className="font-display mt-2 text-4xl">Content editor</h1>
            <p className="mt-2 text-sm text-ink-soft">
              Persistence: {persistLabel}
              {updatedAt ? ` · last write ${updatedAt}` : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-ghost" onClick={reset} disabled={busy}>
              Reset to seed
            </button>
            <button type="button" className="btn btn-primary" onClick={save} disabled={busy}>
              {busy ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
        {status ? (
          <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-cherry/10">
            {status}
          </p>
        ) : null}

        <section className="mt-8 rounded-3xl bg-white p-5 ring-1 ring-cherry/10">
          <h2 className="font-display text-2xl">Hero</h2>
          <Field
            label="Eyebrow"
            value={draft.hero.eyebrow}
            onChange={(value) =>
              setDraft({ ...draft, hero: { ...draft.hero, eyebrow: value } })
            }
          />
          <Field
            label="Title"
            value={draft.hero.title}
            onChange={(value) =>
              setDraft({ ...draft, hero: { ...draft.hero, title: value } })
            }
          />
          <TextArea
            label="Subtitle"
            value={draft.hero.subtitle}
            onChange={(value) =>
              setDraft({ ...draft, hero: { ...draft.hero, subtitle: value } })
            }
          />
          <Field
            label="Founded line"
            value={draft.hero.foundedLine}
            onChange={(value) =>
              setDraft({ ...draft, hero: { ...draft.hero, foundedLine: value } })
            }
          />
        </section>

        <section className="mt-6 rounded-3xl bg-white p-5 ring-1 ring-cherry/10">
          <h2 className="font-display text-2xl">Class timetable notes</h2>
          <Field
            label="Heading"
            value={draft.classes.heading}
            onChange={(value) =>
              setDraft({ ...draft, classes: { ...draft.classes, heading: value } })
            }
          />
          <TextArea
            label="Intro"
            value={draft.classes.intro}
            onChange={(value) =>
              setDraft({ ...draft, classes: { ...draft.classes, intro: value } })
            }
          />
          <TextArea
            label="Timetable note"
            value={draft.classes.note}
            onChange={(value) =>
              setDraft({ ...draft, classes: { ...draft.classes, note: value } })
            }
          />
          <TextArea
            label="Private classes note"
            value={draft.classes.privateNote}
            onChange={(value) =>
              setDraft({
                ...draft,
                classes: { ...draft.classes, privateNote: value },
              })
            }
          />
          {draft.classes.groups.map((group, index) => (
            <div key={group.id} className="mt-4 rounded-2xl bg-cream p-4">
              <Field
                label="Group name"
                value={group.name}
                onChange={(value) => {
                  const groups = draft.classes.groups.slice();
                  groups[index] = { ...group, name: value };
                  setDraft({ ...draft, classes: { ...draft.classes, groups } });
                }}
              />
              <TextArea
                label="Sessions (one per line)"
                value={group.sessions.join("\n")}
                onChange={(value) => {
                  const groups = draft.classes.groups.slice();
                  groups[index] = {
                    ...group,
                    sessions: value.split("\n").filter(Boolean),
                  };
                  setDraft({ ...draft, classes: { ...draft.classes, groups } });
                }}
              />
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-3xl bg-white p-5 ring-1 ring-cherry/10">
          <h2 className="font-display text-2xl">CTA & booking URLs</h2>
          <Field
            label="TeamUp URL"
            value={draft.booking.teamUpUrl}
            onChange={(value) =>
              setDraft({ ...draft, booking: { ...draft.booking, teamUpUrl: value } })
            }
          />
          <Field
            label="Shop URL (Clothing Kings catalog)"
            value={draft.shop.url}
            onChange={(value) =>
              setDraft({ ...draft, shop: { ...draft.shop, url: value } })
            }
          />
          <Field
            label="Shop CTA label"
            value={draft.shop.ctaLabel}
            onChange={(value) =>
              setDraft({ ...draft, shop: { ...draft.shop, ctaLabel: value } })
            }
          />
          <TextArea
            label="Shop body"
            value={draft.shop.body}
            onChange={(value) =>
              setDraft({ ...draft, shop: { ...draft.shop, body: value } })
            }
          />
          <TextArea
            label="Shop price note"
            value={draft.shop.priceNote}
            onChange={(value) =>
              setDraft({ ...draft, shop: { ...draft.shop, priceNote: value } })
            }
          />
          <TextArea
            label="Booking TeamUp note"
            value={draft.booking.teamUpNote}
            onChange={(value) =>
              setDraft({
                ...draft,
                booking: { ...draft.booking, teamUpNote: value },
              })
            }
          />
          <Field
            label="Tickets home"
            value={draft.cabaret.ticketsHome}
            onChange={(value) =>
              setDraft({
                ...draft,
                cabaret: { ...draft.cabaret, ticketsHome: value },
              })
            }
          />
          <Field
            label="Book CTA label"
            value={draft.ctas.book}
            onChange={(value) =>
              setDraft({ ...draft, ctas: { ...draft.ctas, book: value } })
            }
          />
          <Field
            label="Shop CTA label"
            value={draft.ctas.shop}
            onChange={(value) =>
              setDraft({ ...draft, ctas: { ...draft.ctas, shop: value } })
            }
          />
          <Field
            label="Shows CTA label"
            value={draft.ctas.shows}
            onChange={(value) =>
              setDraft({ ...draft, ctas: { ...draft.ctas, shows: value } })
            }
          />
          <Field
            label="Hen parties CTA label"
            value={draft.ctas.hens}
            onChange={(value) =>
              setDraft({ ...draft, ctas: { ...draft.ctas, hens: value } })
            }
          />
          <TextArea
            label="Booking body"
            value={draft.booking.body}
            onChange={(value) =>
              setDraft({ ...draft, booking: { ...draft.booking, body: value } })
            }
          />
        </section>

        <section className="mt-6 rounded-3xl bg-white p-5 ring-1 ring-cherry/10">
          <h2 className="font-display text-2xl">Shop items</h2>
          <p className="mt-2 text-sm text-muted">
            Clothing Kings examples only. Mark prices ex VAT. Do not use outdated
            Wix /shop tiles.
          </p>
          {draft.shop.items.map((item, index) => (
            <div key={`${item.name}-${index}`} className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field
                label="Item"
                value={item.name}
                onChange={(value) => {
                  const items = draft.shop.items.slice();
                  items[index] = { ...item, name: value };
                  setDraft({ ...draft, shop: { ...draft.shop, items } });
                }}
              />
              <Field
                label="Detail / price"
                value={item.detail}
                onChange={(value) => {
                  const items = draft.shop.items.slice();
                  items[index] = { ...item, detail: value };
                  setDraft({ ...draft, shop: { ...draft.shop, items } });
                }}
              />
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-3xl bg-white p-5 ring-1 ring-cherry/10">
          <h2 className="font-display text-2xl">Hen &amp; adult parties</h2>
          <Field
            label="Heading"
            value={draft.henParties.heading}
            onChange={(value) =>
              setDraft({
                ...draft,
                henParties: { ...draft.henParties, heading: value },
              })
            }
          />
          <TextArea
            label="Intro"
            value={draft.henParties.intro}
            onChange={(value) =>
              setDraft({
                ...draft,
                henParties: { ...draft.henParties, intro: value },
              })
            }
          />
          <TextArea
            label="Design-your-own note"
            value={draft.henParties.designNote}
            onChange={(value) =>
              setDraft({
                ...draft,
                henParties: { ...draft.henParties, designNote: value },
              })
            }
          />
          <Field
            label="Contact CTA label"
            value={draft.henParties.contactLabel}
            onChange={(value) =>
              setDraft({
                ...draft,
                henParties: { ...draft.henParties, contactLabel: value },
              })
            }
          />
          <Field
            label="Hen parties page URL"
            value={draft.henParties.pageUrl}
            onChange={(value) =>
              setDraft({
                ...draft,
                henParties: { ...draft.henParties, pageUrl: value },
              })
            }
          />
          {draft.henParties.packages.map((pack, index) => (
            <div key={`${pack.name}-${index}`} className="mt-4 rounded-2xl bg-cream p-4">
              <Field
                label="Package name"
                value={pack.name}
                onChange={(value) => {
                  const packages = draft.henParties.packages.slice();
                  packages[index] = { ...pack, name: value };
                  setDraft({
                    ...draft,
                    henParties: { ...draft.henParties, packages },
                  });
                }}
              />
              <Field
                label="Price"
                value={pack.price}
                onChange={(value) => {
                  const packages = draft.henParties.packages.slice();
                  packages[index] = { ...pack, price: value };
                  setDraft({
                    ...draft,
                    henParties: { ...draft.henParties, packages },
                  });
                }}
              />
              <TextArea
                label="Includes (optional)"
                value={pack.includes ?? ""}
                onChange={(value) => {
                  const packages = draft.henParties.packages.slice();
                  packages[index] = { ...pack, includes: value || undefined };
                  setDraft({
                    ...draft,
                    henParties: { ...draft.henParties, packages },
                  });
                }}
              />
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-3xl bg-white p-5 ring-1 ring-cherry/10">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl">Performances</h2>
            <button
              type="button"
              className="btn btn-ghost py-2 text-sm"
              onClick={() =>
                setDraft({
                  ...draft,
                  performances: [...draft.performances, emptyShow()],
                })
              }
            >
              Add show
            </button>
          </div>
          {draft.performances.map((show, index) => (
            <div key={show.id} className="mt-4 rounded-2xl bg-cream p-4">
              <Field
                label="Title"
                value={show.title}
                onChange={(value) => {
                  const performances = draft.performances.slice();
                  performances[index] = { ...show, title: value };
                  setDraft({ ...draft, performances });
                }}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Date (YYYY-MM-DD)"
                  value={show.date ?? ""}
                  onChange={(value) => {
                    const performances = draft.performances.slice();
                    performances[index] = { ...show, date: value };
                    setDraft({ ...draft, performances });
                  }}
                />
                <Field
                  label="Time (HH:MM, optional)"
                  value={show.time ?? ""}
                  onChange={(value) => {
                    const performances = draft.performances.slice();
                    performances[index] = { ...show, time: value || undefined };
                    setDraft({ ...draft, performances });
                  }}
                />
              </div>
              <Field
                label="Venue"
                value={show.venue}
                onChange={(value) => {
                  const performances = draft.performances.slice();
                  performances[index] = { ...show, venue: value };
                  setDraft({ ...draft, performances });
                }}
              />
              <Field
                label="Ticket URL"
                value={show.ticketUrl}
                onChange={(value) => {
                  const performances = draft.performances.slice();
                  performances[index] = { ...show, ticketUrl: value };
                  setDraft({ ...draft, performances });
                }}
              />
              <label className="mt-3 block text-sm font-medium">
                Status
                <select
                  className="mt-1 w-full rounded-xl border border-cherry/15 bg-white px-3 py-2"
                  value={show.status}
                  onChange={(event) => {
                    const performances = draft.performances.slice();
                    performances[index] = {
                      ...show,
                      status: event.target.value as typeof show.status,
                    };
                    setDraft({ ...draft, performances });
                  }}
                >
                  <option value="upcoming">upcoming</option>
                  <option value="scheduled">scheduled</option>
                  <option value="passed">passed</option>
                </select>
              </label>
              <label className="mt-3 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(show.ageRestricted)}
                  onChange={(event) => {
                    const performances = draft.performances.slice();
                    performances[index] = {
                      ...show,
                      ageRestricted: event.target.checked,
                    };
                    setDraft({ ...draft, performances });
                  }}
                />
                18+
              </label>
              <TextArea
                label="Notes"
                value={show.notes ?? ""}
                onChange={(value) => {
                  const performances = draft.performances.slice();
                  performances[index] = { ...show, notes: value || undefined };
                  setDraft({ ...draft, performances });
                }}
              />
              <button
                type="button"
                className="mt-3 text-sm text-cherry"
                onClick={() =>
                  setDraft({
                    ...draft,
                    performances: draft.performances.filter((_, i) => i !== index),
                  })
                }
              >
                Remove show
              </button>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-3xl bg-white p-5 ring-1 ring-cherry/10">
          <h2 className="font-display text-2xl">Socials</h2>
          <Field
            label="Cherry Dance Facebook"
            value={draft.socials.facebook}
            onChange={(value) =>
              setDraft({ ...draft, socials: { ...draft.socials, facebook: value } })
            }
          />
          <Field
            label="Cherry Dance Instagram"
            value={draft.socials.instagram}
            onChange={(value) =>
              setDraft({
                ...draft,
                socials: { ...draft.socials, instagram: value },
              })
            }
          />
          <Field
            label="Cabaret Facebook"
            value={draft.cabaret.facebook}
            onChange={(value) =>
              setDraft({
                ...draft,
                cabaret: { ...draft.cabaret, facebook: value },
              })
            }
          />
          <Field
            label="Cabaret Instagram"
            value={draft.cabaret.instagram}
            onChange={(value) =>
              setDraft({
                ...draft,
                cabaret: { ...draft.cabaret, instagram: value },
              })
            }
          />
        </section>

        <section className="mt-6 rounded-3xl bg-white p-5 ring-1 ring-cherry/10">
          <h2 className="font-display text-2xl">Contact</h2>
          <Field
            label="Studio email"
            value={draft.contact.email}
            onChange={(value) =>
              setDraft({ ...draft, contact: { ...draft.contact, email: value } })
            }
          />
          <Field
            label="Phone (tel:)"
            value={draft.contact.phone}
            onChange={(value) =>
              setDraft({ ...draft, contact: { ...draft.contact, phone: value } })
            }
          />
          <Field
            label="Phone display"
            value={draft.contact.phoneDisplay}
            onChange={(value) =>
              setDraft({
                ...draft,
                contact: { ...draft.contact, phoneDisplay: value },
              })
            }
          />
          <Field
            label="Cabaret email"
            value={draft.contact.cabaretEmail}
            onChange={(value) =>
              setDraft({
                ...draft,
                contact: { ...draft.contact, cabaretEmail: value },
              })
            }
          />
          {draft.contact.addresses.map((place, index) => (
            <div key={`${place.label}-${index}`} className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field
                label="Address label"
                value={place.label}
                onChange={(value) => {
                  const addresses = draft.contact.addresses.slice();
                  addresses[index] = { ...place, label: value };
                  setDraft({ ...draft, contact: { ...draft.contact, addresses } });
                }}
              />
              <Field
                label="Address"
                value={place.address}
                onChange={(value) => {
                  const addresses = draft.contact.addresses.slice();
                  addresses[index] = { ...place, address: value };
                  setDraft({ ...draft, contact: { ...draft.contact, addresses } });
                }}
              />
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-3xl bg-white p-5 ring-1 ring-cherry/10">
          <h2 className="font-display text-2xl">Raw JSON</h2>
          <p className="mt-2 text-sm text-muted">
            Seed lives in <code>src/data/site-content.json</code>. KV overrides it
            once you save in production.
          </p>
          <pre className="mt-3 max-h-80 overflow-auto rounded-2xl bg-ink p-4 text-xs text-cream">
            {jsonPreview}
          </pre>
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mt-3 block text-sm font-medium">
      {label}
      <input
        className="mt-1 w-full rounded-xl border border-cherry/15 bg-white px-3 py-2 font-normal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mt-3 block text-sm font-medium">
      {label}
      <textarea
        className="mt-1 min-h-24 w-full rounded-xl border border-cherry/15 bg-white px-3 py-2 font-normal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
