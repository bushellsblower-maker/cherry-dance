import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/go-live")({
  component: GoLivePage,
});

function GoLivePage() {
  return (
    <div className="min-h-dvh bg-cream">
      <div className="wrap py-10">
        <Link to="/" className="text-sm text-cherry no-underline">
          ← Back to site
        </Link>
        <p className="chip mt-6 bg-petal text-cherry">Owner handbook</p>
        <h1 className="font-display mt-3 text-4xl">Go live</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          This preview at cherry.cybush.uk is supportable once the steps below are
          in place. The long-form checklist lives in{" "}
          <code>docs/GO_LIVE.md</code>.
        </p>
        <ol className="mt-8 list-decimal space-y-4 pl-5 text-ink-soft">
          <li>
            Put authentication in front of <code>/admin</code> (Cloudflare Access,
            Workers Auth, magic link, or a password). Do not leave the demo CMS
            public.
          </li>
          <li>
            Decide who can edit, and add an audit trail before more than one
            person writes content.
          </li>
          <li>
            Bind KV (already named <code>SITE_CONTENT</code>) in production so
            saves survive deploys. File JSON is only the seed.
          </li>
          <li>
            Choose whether cherry-dance.com stays on Wix, or this Worker becomes
            the public site after a domain cutover.
          </li>
          <li>
            Keep TeamUp, Online Ticket Seller, and the Wix shop as systems of
            record. This site should link out, not clone checkout.
          </li>
          <li>
            Plan image uploads (R2 + Images / CDN) instead of stuffing photos
            into the repo.
          </li>
          <li>
            If you add a contact form, handle GDPR: consent, retention, and a
            real mailbox.
          </li>
          <li>
            Snapshot KV (or export JSON from Admin) for backups and rollback.
          </li>
          <li>
            After each show, move it to “passed”, add the next ticket URL, and
            keep Grove 2027 dates marked scheduled until the box office lists
            them.
          </li>
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/admin" className="btn btn-primary">
            Open demo CMS
          </Link>
          <p className="text-sm text-muted">
            Full checklist: <code>docs/GO_LIVE.md</code> in the repository.
          </p>
        </div>
      </div>
    </div>
  );
}
