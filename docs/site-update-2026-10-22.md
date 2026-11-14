# GA4 markets and service positioning — 22 October 2026

Prepared on `main` following `ee74e9a`. The user requested the nine-country GA4 update and clearer homepage/services copy for small product teams and development agencies.

## GA4 change completed

Updated the **Target-market enquiries** tab in [Anrotex — visits to enquiries](https://analytics.google.com/analytics/web/?authuser=1#/analysis/a411624868p558510601/edit/npnXSh4ESj6phkdAmvrgLA), property **Anrotex website** (`558510601`). Added United Kingdom, Netherlands and Singapore to the six existing countries.

The saved Country filter is **matches regex**:

```text
^(United States|Canada|Australia|Germany|Poland|United Kingdom|Netherlands|Singapore|United Arab Emirates)$
```

Reloaded the exploration and verified that the full expression persisted. The **Session source does not exactly match qa** filter, closed three-step funnel (Site visit → Enquiry started → Enquiry received), Session source breakdown and rolling 28-day date range remain in place. No other exploration tab or property setting was edited. This supersedes the six-country configuration documented on 12 October.

This view describes visitor geography. It does not establish a prospective company's location, buyer qualification or acceptance of India-based delivery. The changed filter can alter historical counts, so use the same nine-country filter on both sides of future comparisons. GA4 remains limited by analytics consent and browser blocking.

Evidence: [saved GA4 filters after reload](analytics/2026-10-22/target-market-funnel.png).

## Website changes prepared

- Homepage introduction names small product teams and development agencies. The primary action is “Discuss your project”; a tracked “Explore services” link leads to the buyer decision page.
- Shared service introduction describes a specific first scope: one release pipeline, an AWS cost review or a Terraform environment, with agreed scope and handover. Its link now opens `/services`. This component also appears on `/solutions`.
- `/services` explains product-team projects and agency client delivery in two separate cards, each with a tracked enquiry link. Both use the existing `/contact?focus=devops` flow and preserve the visitor's ability to choose another priority.
- CI/CD and DevOps descriptions emphasize a defined initial piece of work. Existing service comparisons, preparation guidance, deliverables, case-study links and form behavior remain.
- Updated homepage and services meta descriptions. Existing URLs, page titles and structured data remain.
- Updated only `/`, `/services` and `/solutions` sitemap dates to 22 October, matching the affected content.
- Copy contains no campaign labels, internal audience classifications, editorial disclaimers or newly invented client results, prices or guarantees.

New CTA event placements use the existing tracking component and `cta_click` event: `homepage-hero-services`, `services-product-team`, and `services-agency`. The existing `services-intro` placement now points to `/services`. There is no new event schema, personal-data collection or audience question in the form.

## Verification

- Production build and API typecheck passed; all 14 public pages plus the 404 page prerendered.
- Application TypeScript check and ESLint on all four changed source files passed.
- All 13 existing tests passed, including analytics and enquiry delivery/security tests. No new tests were added for copy changes.
- SEO checks passed across 14 pages: canonical URLs, one H1, metadata, structured data, internal links, anchors and hosting routes.
- Browser verification followed both homepage services links and both audience enquiry links. Each audience link opened the DevOps-specific form with “DevOps consulting” selected. The homepage primary action reached the existing contact form.
- Desktop and 390 × 844 viewport checks found readable layouts and no horizontal document overflow on the homepage or services page. No browser warnings or errors were captured in these checks.
- Changed copy was checked for internal/editorial labels; `git diff --check` passed.
- No live enquiry was submitted. Localhost is excluded by the existing analytics implementation, so these interactions did not add test leads or business events.

Visual evidence: [services desktop](analytics/2026-10-22/services-desktop.png), [services mobile](analytics/2026-10-22/services-mobile.png), [homepage mobile](analytics/2026-10-22/homepage-mobile.png), [homepage services introduction](analytics/2026-10-22/homepage-services-desktop.png).

## Publication status

GA4 is updated and verified. Website changes are prepared locally on `main`, pending a commit-specific protected-branch push approval and Vercel deployment. GitHub identity `Anuj010594` was verified. Main currently enforces administrator protection, one approving review, stale-review dismissal and strict backend/frontend/terraform checks. No protection setting has been changed.

Existing unrelated changes in `src/components/Footer.tsx` and `marketing/linkedin/2026-10-12/guide-distribution.md` are excluded from this batch. The local preview includes that pre-existing footer edit; the website update commit does not include it.

After deployment, verify the three affected production pages, sitemap dates and enquiry navigation. Ranking, click and enquiry impact requires subsequent processed data; this update does not guarantee a ranking change.
