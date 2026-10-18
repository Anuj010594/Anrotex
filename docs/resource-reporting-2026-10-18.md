# Sitemap corrections and resource-to-enquiry reporting

Implemented on 18 October 2026. GA4 property: **Anrotex website (558510601)**.

## Sitemap

Corrected two stale `lastmod` values using the dates of the substantive page changes in Git:

| URL | Previous date | Correct date | Page change |
| --- | --- | --- | --- |
| `/services` | 2026-07-28 | 2026-10-12 | Buyer decision page and engagement details, `3b5c110` |
| `/contact` | 2026-10-07 | 2026-10-13 | Service-specific enquiries and submission recovery, `201ceb3` |

The other sitemap dates remain unchanged. This batch does not add public-facing copy or change page content. The sitemap change requires deployment; the GA4 reports are saved independently of Vercel.

## Saved GA4 reports

Open [Anrotex — visits to enquiries](https://analytics.google.com/analytics/web/?authuser=1#/analysis/a411624868p558510601/edit/npnXSh4ESj6phkdAmvrgLA).

Added four tabs to the existing exploration. The original Service-link journey, All enquiry paths and Target-market enquiries tabs remain in place.

### Resource interest

- Rows: Event placement, Session source, Session campaign, Country.
- Values: Event count and Active users.
- Event name exactly matches `cta_click`.
- Event placement matches `^(aws-guide-worksheet(-measurement)?|cicd-guide-(checklist|release-review|workflow))$`.
- Session source does not exactly match `qa`.

The table distinguishes the links to each resource and the campaigns/sources bringing those visitors. Two placements can point to the same file; use the mapping below when combining counts. Active users are not additive across rows.

### Resource-to-enquiry funnels

Each is a closed funnel with three steps: the specified resource click, then `form_start`, then `generate_lead`. Steps are indirectly followed, allowing navigation and other events between them. The resource condition is applied only to the first step, so it does not exclude subsequent form events.

| Tab | First step | Event placement regex |
| --- | --- | --- |
| AWS worksheet to enquiry | AWS worksheet clicked: `cta_click` | `^aws-guide-worksheet(-measurement)?$` |
| CI/CD checklist to enquiry | Release checklist clicked: `cta_click` | `^cicd-guide-(checklist|release-review)$` |
| CI/CD workflow to enquiry | CI workflow clicked: `cta_click` | `^cicd-guide-workflow$` |

All three use Session source as the default breakdown and exclude Session source exactly matching `qa`. Session campaign and Country are available in the exploration variables for further analysis. No segment comparison is applied by default. The existing Target-market enquiries tab retains the six markets: United States, Germany, Poland, Australia, United Arab Emirates and Canada.

### Resource mapping

| File | Event placement |
| --- | --- |
| `/downloads/aws-cost-review-worksheet.xlsx` | `aws-guide-worksheet`, `aws-guide-worksheet-measurement` |
| `/downloads/cicd-release-checklist.txt` | `cicd-guide-checklist`, `cicd-guide-release-review` |
| `/downloads/node-ci.yml` | `cicd-guide-workflow` |

These use the existing TrackedLink `CTA Click` event, mapped to GA4 `cta_click`, with the existing `event_source` parameter registered as Event placement. No tracking code, new custom dimension, extra event, key-event setting, consent setting or account-level filter was introduced. Downloads remain interest signals; only a successful form submission emits `generate_lead`.

## Reading the results

- The date control remains Last 28 days. On verification it covered **20 September–17 October 2026**, and the new resource views had **no matching activity**. The resources were released on 17 October; this is a baseline, not evidence of improved conversion.
- Event count measures tracked link clicks, not completed file transfers or files opened. Multiple clicks by one person can increase the count.
- Funnels count users who complete the sequence within the selected period. There is no same-session constraint or explicit elapsed-time limit. They show an observed journey, not proof that a resource caused an enquiry. One person may appear in more than one resource funnel.
- Consent choices, staff opt-out, browser restrictions and identity continuity limit what GA4 can observe. The report-level QA exclusion covers source `qa`; it cannot identify an untagged staff visit. Existing collection exclusions remain unchanged.
- Session source/campaign are GA4's session attribution dimensions. Country is visitor geography, not verified company or buying-contact location. Use tagged distribution links and verify buyer location separately.
- Reconcile genuine `generate_lead` activity with received enquiries before counting business opportunities. Resources and form starts are not enquiries.
- Review the summary for resource interest, then the corresponding funnel for starts and received enquiries. Compare complete, processed periods and avoid conclusions from a handful of users.

## Verification

- Parsed the sitemap: 14 unique URLs, valid non-future dates and the two expected corrected dates.
- `npm run build` passed, prerendering 14 routes and a 404 page.
- `npm run check:seo` passed for prerendered pages, hosting routes and missing-page responses.
- `git diff --check` passed.
- Reloaded GA4 and confirmed the summary rows, metrics and all three filters persisted.
- Reopened all three saved funnel definitions and verified the resource event/placement conditions, form-start and confirmed-submission steps. Checked the closed-funnel setting, Session source breakdown and QA exclusion on the report views.
- No production enquiry was submitted and no synthetic resource clicks were generated. Collection uses the already deployed tracking; this batch verifies report configuration, not a new live end-to-end submission.

Screenshots are saved locally under `/private/tmp/anrotex-reporting-20261018/` (`resource-interest.png` and `checklist-funnel.png`). Unrelated working-tree edits are excluded from this batch's commit.
