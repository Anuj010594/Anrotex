# SEO batch 1 — baseline and implementation record

Recorded on 6 October 2026, before deployment. The implementation was locally
validated when this baseline was captured; verify production after the Git push
triggers the Vercel deployment.

## Scope and sources

This batch establishes the search baseline, fixes missing-page handling, improves
the CI/CD service page, strengthens navigation, and checks enquiry instrumentation.
It does not establish that a lack of recent updates caused the traffic decline.

Sources:

- User-supplied `anrotex.com-Performance-on-Search-2026-10-06/` CSV export in Downloads.
- [Search Console performance](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aanrotex.com), inspected on 6 October with Web search and the last 28 days compared with the previous period.
- [Page indexing](https://search.google.com/search-console/index?resource_id=sc-domain%3Aanrotex.com), URL Inspection, Sitemaps, Manual actions, and Security issues in the verified domain property.
- Public HTTP checks of all 14 main-site sitemap URLs, host variants, and an intentionally nonexistent URL on 6 October.

The domain property includes `revenue.anrotex.com`. Property totals below are not
exclusive to `www.anrotex.com`. Page rows are page-level aggregations and must not
be summed to reconstruct property totals. Query tables omit some searches; the
export's 60 visible queries have 1,000 impressions and zero clicks, while the
property has 42 clicks. A reliable branded/non-branded click split is unavailable
from that export.

## Performance baseline

The supplied daily chart covers 28 April–3 October 2026 (159 days), despite the
export filter saying “Last 16 months.” It contains 42 clicks and 1,264 impressions:
3.32% aggregate CTR and approximately 46.61 impression-weighted average position.

| Property metric | 9 Aug–5 Sep | 6 Sep–3 Oct | Change |
| --- | ---: | ---: | ---: |
| Clicks | 2 | 2 | 0 |
| Impressions | 199 | 111 | -88 (-44.2%) |
| CTR | 1.0% | 1.8% | +0.8 percentage points |
| Average position | 50.2 | 40.4 | 9.8 positions better |

The improvement in average position does not establish that individual rankings
improved across the site: the query, country, device, and page mix changed.
Click volume is too small for reliable short-term conversion or CTR conclusions.

### Recent page comparison

All rows are on `https://www.anrotex.com` unless a full hostname is shown.
All rows except the homepage have zero clicks in both periods; the homepage has
two clicks in each period. Positions are rounded values displayed by Search Console.

| Page | Previous impressions | Latest impressions | Previous position | Latest position |
| --- | ---: | ---: | ---: | ---: |
| `/` | 47 | 22 | 17.0 | 8.4 |
| `/ci-cd-automation` | 108 | 63 | 59.4 | 46.5 |
| `/case-studies/fintech-aws-cost-reduction` | 28 | 17 | 41.9 | 24.5 |
| `/devops-consulting` | 26 | 12 | 6.7 | 25.3 |
| `/kubernetes-scaling` | 7 | 11 | 12.9 | 3.0 |
| `/case-studies` | 14 | 9 | 13.9 | 3.0 |
| `/aws-cost-optimization` | 19 | 8 | 72.0 | 77.1 |
| `https://revenue.anrotex.com/` | 0 | 6 | — | 4.8 |
| `https://revenue.anrotex.com/guides/usage-based-billing-reconciliation` | 0 | 5 | — | 8.0 |
| `/solutions` | 5 | 1 | 8.4 | 5.0 |

The AWS cost article has 650 impressions in the full export but is absent from
this recent page comparison. Its historical volume should not be mistaken for
current demand. The CI/CD page has the largest recent page-level impression loss
in the comparison, supporting its selection for the first rewrite. The DevOps
page's position deterioration deserves investigation in the next content batch.

### Queries to track consistently

These exact queries have zero clicks in both periods. A dash means there were no
impressions; Search Console's displayed position of zero is not a ranking.

| Query | Previous impressions | Latest impressions | Previous position | Latest position |
| --- | ---: | ---: | ---: | ---: |
| ci/cd automation services | 97 | 44 | 61.0 | 51.8 |
| ci cd automation services | 3 | 7 | 128.7 | 72.6 |
| ci/cd pipeline automation services | 2 | 1 | 48.0 | 25.0 |
| cloud cost optimization audit | 9 | 5 | 85.2 | 86.8 |
| card cost reduction for fintechs | 1 | 3 | 57.0 | 35.7 |
| anrotex it systems company | 17 | 2 | 1.7 | 1.0 |
| anro tech | 5 | 2 | 63.4 | 57.0 |
| antimetal cost optimization | 2 | 2 | 85.0 | 88.0 |
| aws cost reduction dallas | 3 | 0 | 91.3 | — |

For the principal CI/CD query, impressions fell by 53 even as the displayed
average position improved. The evidence does not support describing the whole
decline as a ranking loss or expecting a new title alone to recover it.

### Country and device context

| Segment | Previous impressions | Latest impressions | Previous position | Latest position |
| --- | ---: | ---: | ---: | ---: |
| United States | 77 | 40 | 44.5 | 46.4 |
| United Kingdom | 34 | 15 | 43.3 | 27.7 |
| Poland | 32 | 14 | 47.5 | 53.7 |
| India | 23 | 16 | 72.6 | 49.4 |
| Desktop | 184 | 95 | 53.0 | 45.7 |
| Mobile | 14 | 16 | 8.4 | 9.1 |
| Tablet | 1 | 0 | 125.0 | — |

Both periods' two clicks came from India. Device clicks changed from two desktop
clicks to one desktop and one mobile click. Compare the same target countries and
devices after deployment instead of optimizing only the blended position.

## Indexing and technical findings

The aggregate Page indexing report was last updated on 21 September: 13 indexed
URLs and six excluded URLs. Individual URL Inspection checks on 6 October confirmed:

| URL | Google status | Details and action |
| --- | --- | --- |
| `/ci-cd-automation` | Indexed | Last crawl 22 Sep; Googlebot smartphone; fetch successful; crawl/indexing allowed; Google selected the inspected canonical. Refresh content and request recrawl after deployment. |
| `/services` | Discovered, currently not indexed | No last crawl. Already in the submitted sitemap. Add prominent internal links in this batch and inspect after deployment. |
| `/contact` | Crawled, currently not indexed | Last crawl 28 Jul; fetch successful; no canonical reported for that crawl. Current live HTML has the correct canonical and index directive. Reinspect after deployment; a contact page is not the main commercial search target. |
| HTTP/non-www homepage variants (three URLs) | Page with redirect | Expected redirects to the HTTPS www homepage. Preserve these redirects. A failed validation label does not make deliberate canonical redirects defects. |
| `https://anrotex.com/solutions` | Historical redirect error | Example last crawled 30 Apr; validation marked passed. Current request redirects once with 308 to the correct www page and finishes with 200. No current loop reproduced. |

Additional checks:

- The www sitemap reports **Success**, 14 discovered pages, last read 28 September.
  The revenue sitemap separately reports Success, six discovered pages, last read
  1 October. Neither sitemap was resubmitted during the local implementation.
- All 14 live www sitemap pages return HTTP 200, a matching canonical, an index
  directive, and one H1 in the initial HTML. Robots and sitemap endpoints return 200.
- HTTP apex reaches HTTPS www in two permanent 308 redirects; HTTPS apex and HTTP
  www each redirect once. The CI/CD trailing-slash variant returns 200 with its
  slashless canonical.
- `/seo-audit-nonexistent-20261006` incorrectly returns HTTP 200 and homepage HTML
  in production. The local change removes the Vercel catch-all rewrite, generates
  `404.html` with noindex, and returns status 404 in the worker fallback.
- Search Console reports **no manual actions** and **no security issues**.
- Core Web Vitals has **no data** for mobile and desktop. This is not a passing
  performance score. No lab performance score is asserted by this batch.
- Overview reports nine HTTPS URLs, zero non-HTTPS URLs, and five valid breadcrumb
  items with zero invalid items. These report counts have different coverage and
  update schedules from the current sitemap.

## Implemented locally

1. Rewrote `/ci-cd-automation` around buyer questions: fit, scoped deliverables,
   GitHub Actions/GitLab/Jenkins, implementation steps, recovery planning,
   measurement, handover, and five accessible FAQs. Reused the site's design.
2. Set the title to **CI/CD Automation Services & Pipeline Consulting | Anrotex**
   and the description to **Build or improve GitHub Actions, GitLab CI/CD, and
   Jenkins pipelines. Get practical testing, deployment, rollback, and handover
   support from Anrotex.**
3. Reused Service and Breadcrumb schema helpers. FAQ answers are in the initial
   HTML and use native disclosure elements. Added links to the existing guide
   and fintech case study without inventing new numerical client results.
4. Main navigation now links directly to `/services` and `/case-studies`.
5. Both CI/CD enquiry buttons use `/contact?focus=cicd`, selecting **Improve
   deployment speed** in the form. CTA sources distinguish hero and footer.
6. Changed only the CI/CD sitemap lastmod to 6 October for its substantive update.
7. Fixed missing-page handling and added `npm run check:seo` to validate all 14
   prerendered pages, metadata, structured-data JSON, internal destinations,
   enquiry defaults, hosting rewrites, and worker 404 responses.
8. Added a focused analytics test covering events queued before the analytics
   client loads, dispatch to the loaded client, and server rendering safety.

## Verification and measurement limits

Passed: production build; TypeScript; targeted ESLint for changed source and
checks; four unit tests; SEO checks across all 14 routes; and `git diff --check`.
Browser checks at 1280×900 and 390×844 passed for responsive layout, no horizontal
overflow, mobile navigation, FAQ expansion, and the selected enquiry priority.

The local Vercel debug client recorded **CTA Click**, **Lead Form Started**, and
**Lead Form Error**. A local-only dummy submission exercised the failure path;
Vite has no email API, so the form retained its input and showed an error rather
than falsely claiming success. Debug mode sends no analytics events to Vercel.

Successful lead delivery and production analytics ingestion have **not** been
verified. The existing form emits **Lead Form Submitted** only after the API
reports success. Confirm that the hosting plan supports custom events and that
the production dashboard receives them before treating event totals as a business
baseline. Do not report visits, enquiries, or conversion rates from the code test.

## Deployment and follow-up

Follow the existing README's lead-form configuration and credential-rotation
requirement. Complete the checks below after the Git push triggers deployment.

1. Confirm Vercel deployed the pushed revision and record the deployment date.
   Direct-load every sitemap route; check redirects, canonical
   tags, robots, sitemap, and an unknown URL's actual HTTP 404 response on the host.
2. Complete an explicitly authorized test enquiry and confirm delivery plus the
   corresponding successful-submit event in the production analytics dashboard.
3. Use live URL Inspection on CI/CD, services, and contact. After successful live
   checks, request indexing of the updated pages. Do not request indexing of
   unpublished local content or deliberately redirected hostname variants.
4. At 7–14 days, check recrawl/indexing and technical regressions. At 28 complete
   days after deployment, compare the same page/query/country/device cohorts with
   the preceding 28 days. Review again at 56 days if volumes remain small.
5. Track CI/CD impressions, clicks, position, CTA clicks, and qualified enquiries
   together. Keep revenue-subdomain results separate using a www page filter.
   Record subsequent content changes so comparisons remain interpretable.

These are follow-up checkpoints, not scheduled automations. Rankings and clicks
are outcomes to measure after Google recrawls; this batch does not guarantee them.
