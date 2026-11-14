# Scoped project offers — 27 October 2026

Approved scope: add the three existing offers to the website, preserve the selected project in enquiries and analytics, connect the free AWS worksheet to the review offer, and publish the approved matching LinkedIn post on Anuj Dhadge's personal profile after the website is live. All development remains on `main`.

## Website changes

- `/services#starting-projects` presents independent AWS Infrastructure Review (US$500 / 5 business days), CI/CD Pipeline Setup (US$1,500 / 10 business days) and Terraform AWS Foundation (US$3,000 / 15 business days) offers.
- Each includes scope, deliverables, prerequisites, exclusions and completion checks. Prices, input-dependent timelines and common terms follow the approved 26 October Contra/Clutch setup records. The AWS review remains distinct from the broader cost optimization audit.
- `/contact?focus=aws-review`, `?focus=cicd-setup` and `?focus=terraform-foundation` select the respective project. The form shows the price and scope, and keeps its existing submission, retry and consent behavior.
- The shared project allowlist accepts all three offers for API validation, email subject/body and GA4 `service_interest`. Existing `form_start`, `form_error` and confirmed `generate_lead` events are reused; no new tracking system or personal-data parameters were added.
- The AWS worksheet remains downloadable without email. Its section now links to `/services#aws-review`.
- Services and contact sitemap dates reflect this substantive update. Existing guide metadata and other sitemap dates were retained; a commercial link alone does not justify resetting the article's substantive update date.

## Verification

- All 17 Vitest tests passed, including delivery of each project label to mocked SMTP and preservation of each offer in GA4 events without form details.
- Production build and prerender completed; all 14 routes, focused offer links, selected form options and free worksheet path passed SEO checks.
- App/API TypeScript checks, targeted ESLint and whitespace checks passed.
- Browser checks confirmed all three CTA selections, the worksheet-to-offer-to-form journey, and message preservation when changing the selected project.
- Desktop and 390-pixel iframe layout checked visually. This is a responsive layout check, not a physical-device test.
- No test enquiry was sent to the production inbox. New labels were verified through the existing mocked delivery tests.

Screenshots and navigation evidence: `docs/analytics/2026-10-27/`.

## LinkedIn launch

The user explicitly selected: “Publish on my personal profile.”
Caption: `marketing/linkedin/2026-10-27/aws-review-caption.txt`.
Alt text: `marketing/linkedin/2026-10-27/aws-review-alt-text.txt`.
Existing image: `marketing/contra/2026-10-26/aws-review.png`.
Destination: Anuj Dhadge's personal LinkedIn profile.
Campaign: `aws-review-launch-oct2026`; source/medium `linkedin / social`; content `personal-offer`.
Link destination: `/services#aws-review`, preserving the campaign parameters.

Publication status at preparation: website commit and protected-main exception pending; LinkedIn publication waits for successful live verification. No messages, comments, invitations or schedules are included.
