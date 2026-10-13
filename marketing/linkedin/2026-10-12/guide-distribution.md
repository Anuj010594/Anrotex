# AWS and CI/CD guide distribution — 12 October 2026

Post 1 was published on Anuj Dhadge's personal profile on 12 October 2026 with explicit owner authorization. Posts 2–4 remain prepared and unpublished. These excerpts point to existing guides; no new article or client-result claim is needed. Intended readers are engineering leaders and platform teams at buyers in the US, Germany, Poland, Australia, UAE and Canada. Organic posts cannot guarantee those locations. Any direct outreach needs a separate authorization and a check against `docs/linkedin-outreach.md`.

## Publication record

- Account: [Anuj Dhadge](https://www.linkedin.com/in/anuj-dhadge-929963408/), personal profile; identity and Anrotex co-founder affiliation checked in the signed-in LinkedIn UI.
- Published: 12 October 2026, approximately 19:50 IST.
- [AWS cost-baseline post](https://www.linkedin.com/feed/update/urn:li:activity:7515415933289508864/).
- LinkedIn displayed “Post successful”; the published text was verified on its permalink.
- The shortened text link `https://lnkd.in/daTVRJzx` was checked and resolves to the exact tagged URL in Post 1, including `#baseline`. The generated preview card links to the canonical guide URL without campaign tags, so its clicks may not appear under this campaign.
- No other post, comment, direct message or follow-up was sent in this batch.

## Post 1 — AWS cost baseline

A lower AWS invoice does not always mean your infrastructure became more efficient.

Before changing resources, agree how you will measure the result:

• Keep the billing period, accounts, regions and cost basis consistent.
• Separate credits and one-off charges from recurring costs.
• Compare spend with workload volume and performance.
• Check whether a saving in one service moved cost into another.

Then choose one change with a clear owner, a recovery plan and a way to check the outcome.

Our AWS cost guide walks through the baseline, cleanup sequence and measurement approach:
https://www.anrotex.com/blog/reduce-aws-costs?utm_source=linkedin&utm_medium=social&utm_campaign=aws-guide-oct2026&utm_content=cost-baseline#baseline

#AWS #CloudCostOptimization #DevOps

## Post 2 — EC2 rightsizing

Low average CPU is a starting point for an EC2 review. It is not enough to approve a smaller instance.

Check peak demand, memory, network and storage throughput. Include scheduled jobs and the capacity needed when another replica fails.

Before rollout, test the candidate against agreed latency and error limits. Keep the previous configuration available, then compare effective cost and performance over a representative period.

Our worked example shows the arithmetic and the checks together, so you can replace the sample inputs with your own:
https://www.anrotex.com/blog/reduce-aws-costs?utm_source=linkedin&utm_medium=social&utm_campaign=aws-guide-oct2026&utm_content=ec2-rightsizing#rightsizing-example

#AWS #EC2 #CloudEngineering

## Post 3 — CI/CD checks

Updated on 13 October 2026 as the next prepared post. [Copy-ready text](../2026-10-13/cicd-release-checks.txt) is the single source for publication. It retains the `cicd-guide-oct2026` campaign and `release-checks` content tag.

- [Matching sharing image](../../../public/images/og/cicd-guide.png).
- Image description: CI/CD from pull request to production — build, test and release with confidence. A release pipeline with a recovery path, by Anrotex.
- Prepared for review; not published or scheduled. Publication on the personal profile needs the owner's authorization for this post.
- Keep the tagged URL in the post text. After the website deployment, check the guide's LinkedIn preview before publishing and record the final permalink here.

## Post 4 — Recovery planning

Keeping the previous application build is only one part of a recovery plan.

A database migration, changed configuration or new dependency can stop the old build from working.

Before the next release, agree:

• Which health signals will stop the rollout.
• Who can make that decision.
• Whether the previous version still works with the current data and configuration.
• How the team will verify recovery.

Test the procedure before you need it during an incident.

The recovery section of our CI/CD guide gives your team a practical starting point:
https://www.anrotex.com/blog/cicd-best-practices?utm_source=linkedin&utm_medium=social&utm_campaign=cicd-guide-oct2026&utm_content=recovery-plan#rollback

#SoftwareDelivery #CICD #ReliabilityEngineering

## Publishing and measurement notes

- Publish remaining posts only after the owner authorizes their destination account and final text. Post 1 is complete as recorded above.
- Use one excerpt at a time; adapt it to the audience's actual problem. For communities, check their rules and add the link only where it helps answer a relevant question. Do not bulk-post or buy links.
- Keep the tagged external link intact. Do not add campaign tags to internal site links, or use recipient names, email addresses or individual IDs in tags.
- All four links use the allowlisted UTM characters. The fragment opens a useful section but is not sent to analytics. Use Session campaign and Session source / medium to assess referral traffic.
- GA4 measures consenting visits only. Exclude source `qa` and campaigns beginning `batch6-`; exclude later verification campaigns as well. Staff should open `https://www.anrotex.com/?analytics=off` once per working browser.
- Record publication date, account and permalink after an authorized publication. Compare article readership, service visits, form starts and received enquiries. A received enquiry still needs qualification; clicks alone are not leads or evidence of better rankings.
- First useful comparison is after real distribution and processed data, not against today's test events. The existing early review date is 22 October; no automation has been scheduled.

## References checked on 12 October 2026

- Existing Anrotex AWS and CI/CD guides, including their baseline, example, workflow and recovery sections.
- [AWS Compute Optimizer EC2 recommendations](https://docs.aws.amazon.com/compute-optimizer/latest/ug/view-ec2-recommendations.html): capacity recommendations, utilization and performance risk.
- [GitHub Actions secure use](https://docs.github.com/en/actions/reference/security/secure-use): workflow permissions and deployment security.
- [Google Analytics funnel exploration](https://support.google.com/analytics/answer/9327974): step sequencing and open versus closed funnels.
