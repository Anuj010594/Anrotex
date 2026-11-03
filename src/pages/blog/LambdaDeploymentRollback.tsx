import type { ReactNode } from "react";
import { ArrowDown, Download } from "lucide-react";
import InsightArticle from "@/components/InsightArticle";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { articleSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import releaseSource from "../../../public/downloads/lambda-rollback/release.py?raw";
import testSource from "../../../public/downloads/lambda-rollback/test_release.py?raw";

const path = "/blog/aws-lambda-rollback-github-actions";
const title = "AWS Lambda Deployment Rollback with GitHub Actions";
const description = "Follow Anrotex’s Lambda release code: check a candidate, promote the live alias, detect a failed release and roll back. Download five tests to run without AWS.";
const sharingImage = `${SITE_URL}/images/og/cicd-guide.png`;
const releaseCode = releaseSource.slice(releaseSource.indexOf("def release("), releaseSource.indexOf('\n\nif __name__'));
const rollbackTest = testSource.slice(testSource.indexOf("    def test_gateway_failure"), testSource.indexOf("    def test_concurrent_alias"));
const workflow = `release:
  if: github.event_name == 'workflow_dispatch' && inputs.deploy && github.ref == 'refs/heads/main'
  needs: verify
  runs-on: ubuntu-latest
  timeout-minutes: 15
  environment: aws-sandbox
  concurrency:
    group: aws-sandbox-release
    cancel-in-progress: false
  permissions:
    contents: read
    id-token: write`;
const releaseCommand = `python scripts/package.py --release "$GITHUB_SHA"
python scripts/release.py --function "$FUNCTION" \\
  --artifact build/function.zip --release "$GITHUB_SHA" \\
  --url "$API_URL" --region "$REGION"`;
const localTest = `unzip lambda-rollback-tests.zip
cd lambda-rollback
python3 -m unittest -v test_release`;
const toc = [
  { id: "release-path", label: "The release and rollback path" },
  { id: "candidate-checks", label: "Check the candidate version" },
  { id: "promotion", label: "Promote and restore the alias" },
  { id: "github-actions", label: "Connect GitHub Actions" },
  { id: "test-rollback", label: "Reproduce a failed release locally" },
  { id: "aws-acceptance", label: "Checks before a live AWS release" },
];

function Code({ label, children }: { label: string; children: ReactNode }) {
  return <pre tabIndex={0} role="region" aria-label={label} className="mt-6 overflow-x-auto rounded-2xl bg-brand-navy p-5 text-sm leading-relaxed text-brand-off-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal"><code className="!bg-transparent !p-0 !text-inherit">{children}</code></pre>;
}

export default function LambdaDeploymentRollback() {
  return <>
    <SEO title={`${title} | Anrotex`} description={description} path={path} type="article" image={sharingImage} imageAlt="CI/CD from pull request to production — a release pipeline with a recovery path, by Anrotex." imageWidth={1731} imageHeight={909} structuredData={[
      articleSchema({ headline: title, description, path, datePublished: "2026-11-03", dateModified: "2026-11-03", image: sharingImage }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Insights", path: "/blog" }, { name: "Lambda deployment rollback", path }]),
    ]} />
    <InsightArticle eyebrow="AWS release engineering" title={title} description="Check the version you intend to release, move traffic only after it passes, and restore the previous version when the deployed API fails its checks." published="3 November 2026" updated="3 November 2026" readTime="12 minute read" toc={toc} ctaTitle="Build a pipeline your team can operate." ctaDescription="Start with one application and an existing AWS staging target. The CI/CD Pipeline Setup includes release checks, a compatible rollback test and handover." ctaHref="/services#cicd-setup" ctaLabel="See the US$1,500 pipeline setup">
      <p>A successful upload is not enough to declare a release healthy. In our <TrackedLink to="/portfolio/cloud-operations" eventName="Case Study Click" eventSource="lambda-guide-project">Cloud Operations project</TrackedLink>, we publish a Lambda version, check it directly, point the <code>live</code> alias at it, then test the API Gateway endpoint. If those final checks fail, the release script attempts to restore the previous alias version and exits with an error.</p>
      <p>This walkthrough uses the project's release code. Its decision paths have been tested locally with a mocked Lambda client; live AWS deployment and GitHub Actions execution remain to be verified. You can reproduce the five release tests below without an AWS account.</p>

      <h2 id="release-path">1. Separate publishing from moving traffic</h2>
      <p>The API Gateway integration targets a Lambda alias, rather than <code>$LATEST</code>. Publishing new code therefore does not move the API's traffic. A published version fixes the code and most configuration; the alias selects which version receives requests. See <a href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html" target="_blank" rel="noreferrer">AWS's function version documentation</a> for the configuration and runtime-management details.</p>
      <figure aria-label="Lambda release and rollback flow" className="mt-8 rounded-3xl border border-brand-navy/15 bg-brand-stone/40 p-5 md:p-8">
        <div className="rounded-2xl bg-brand-navy p-5 text-center font-bold text-brand-off-white">Publish a new version<br /><span className="text-sm font-normal text-brand-stone">The live alias still points to the previous version</span></div>
        <ArrowDown className="mx-auto my-3 h-6 w-6 text-brand-teal" aria-hidden="true" />
        <div className="rounded-2xl border border-brand-teal/25 bg-brand-off-white p-5 text-center font-bold">Check the candidate directly<br /><span className="text-sm font-normal text-brand-teal">Failure → stop; leave the live alias unchanged</span></div>
        <div className="my-3 flex items-center justify-center gap-2 text-sm font-bold text-brand-teal"><ArrowDown className="h-6 w-6" aria-hidden="true" />Checks pass</div>
        <div className="rounded-2xl bg-brand-mint p-5 text-center font-bold">Promote the live alias<br /><span className="text-sm font-normal">Then check authentication, release identity and persistence through API Gateway</span></div>
        <ArrowDown className="mx-auto my-3 h-6 w-6 text-brand-teal" aria-hidden="true" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-brand-teal/30 bg-brand-off-white p-5"><strong>Checks pass</strong><p className="!mt-2 !text-sm">Keep the new version. Record release success.</p></div>
          <div className="rounded-2xl border border-brand-navy/20 bg-brand-yellow/25 p-5"><strong>Checks fail</strong><p className="!mt-2 !text-sm">Attempt to restore the previous version. Mark the release failed.</p></div>
        </div>
        <figcaption className="mt-4 text-sm leading-relaxed text-brand-teal">Revision checks guard alias changes. If restoration fails or the runner stops, an operator must inspect and recover the release.</figcaption>
      </figure>
      <p>This is an immediate deployment smoke test with rollback. It is not a weighted canary or a continuous incident-recovery system. The script rejects aliases that already have additional version weights.</p>

      <h2 id="candidate-checks">2. Check the candidate before promotion</h2>
      <p>The script remembers the current alias version and revision, uploads the ZIP with <code>Publish=True</code>, and waits for the function update. It invokes the numbered candidate directly using <code>Qualifier=version</code>. A candidate failure stops execution before the alias update.</p>
      <ul>
        <li><strong>Release identity:</strong> <code>GET /health</code> must return 200 and the expected commit identifier.</li>
        <li><strong>A real write:</strong> <code>POST /requests</code> must create or retrieve the release's verification record.</li>
        <li><strong>A real read:</strong> the stored record must be retrievable with the expected content.</li>
      </ul>
      <p>These are the Cloud Operations API contracts. Replace them with your own application's critical operations. The checks write labelled verification records: agree their retention and keep them out of customer reports. Direct Lambda invocation does not prove gateway authentication, which is checked after promotion.</p>

      <h2 id="promotion">3. Promote the alias, then check the API</h2>
      <p>This is the complete <code>release()</code> function from the project. The downloadable file also includes <code>candidate_check()</code>. Each alias update supplies a <code>RevisionId</code> so an unexpected concurrent change is rejected rather than overwritten. AWS documents that condition in the <a href="https://docs.aws.amazon.com/lambda/latest/api/API_UpdateAlias.html" target="_blank" rel="noreferrer">UpdateAlias API reference</a>.</p>
      <Code label="Python release function: publish, verify, promote and roll back">{releaseCode}</Code>
      <p>The gateway probe first checks that unsigned requests are denied. It then signs requests with SigV4 and verifies the release identifier, record creation, idempotent retry and retrieval. A 200 response alone would miss a wrong release or broken persistence.</p>
      <p>If the probe raises an exception, the script requests the old version using the revision returned by its own promotion. Even after a successful restoration request, the release remains failed. The script does not re-probe the restored endpoint; the operator must confirm recovery. If the restoration request fails, do not retry blindly over a later deployment.</p>
      <p>Application rollback does not undo database writes, schema migrations or infrastructure changes. Keep the previous version available, preserve backwards-compatible data contracts, and plan any migration separately.</p>

      <h2 id="github-actions">4. Put the release behind a verified GitHub Actions job</h2>
      <p>The project's workflow runs verification for pull requests and pushes. A separate release job requires manual dispatch with <code>deploy=true</code>, the <code>main</code> branch and a successful <code>verify</code> job. These are the job controls from that workflow:</p>
      <Code label="GitHub Actions release job controls">{workflow}</Code>
      <p>This is a workflow excerpt, not a complete application deployment. The project also checks out the selected commit, sets up Python, installs its locked dependencies and uses a commit-pinned <code>aws-actions/configure-aws-credentials</code> action. It obtains temporary credentials for a scoped AWS role through OIDC, then runs:</p>
      <Code label="Cloud Operations package and release commands">{releaseCommand}</Code>
      <p>The packaging script embeds <code>GITHUB_SHA</code> in the artifact so the candidate and endpoint checks can identify the intended release. <code>FUNCTION</code>, <code>API_URL</code> and <code>REGION</code> come from environment configuration, alongside the release role ARN.</p>
      <ul>
        <li>Provision and review the infrastructure before releasing. API Gateway must invoke the alias, and the previous version must exist.</li>
        <li>Restrict the GitHub environment to the intended branch. Configure required reviewers where your repository plan supports them; naming an environment alone does not create an approval gate.</li>
        <li>Restrict the AWS trust policy to the expected repository and environment subject. <code>id-token: write</code> permits requesting an OIDC token; the AWS role policy determines AWS access.</li>
        <li>Use the same concurrency group for releases to the same target. <code>cancel-in-progress: false</code> avoids cancelling a running release when a new one arrives, but manual cancellation, timeouts and network failures can still interrupt recovery.</li>
      </ul>
      <p>Follow GitHub's <a href="https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws" target="_blank" rel="noreferrer">AWS OIDC configuration guide</a> and <a href="https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency" target="_blank" rel="noreferrer">workflow concurrency documentation</a> when adapting these controls. Do not assume concurrency preserves every queued release.</p>

      <h2 id="test-rollback">5. Reproduce a failed release locally</h2>
      <p>Download the release code, gateway probe and five standalone tests. The tests use Python's standard library and a mocked Lambda client. They make no network requests and need no AWS credentials or SDK. Use Python 3.10 or later; we verified the package with Python 3.14.</p>
      <TrackedLink to="/downloads/lambda-rollback-tests.zip" reloadDocument download="lambda-rollback-tests.zip" eventSource="lambda-guide-tests" className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 !text-base !font-bold !text-brand-off-white !no-underline transition hover:bg-brand-teal"><Download className="h-4 w-4 shrink-0" aria-hidden="true" />Download the rollback tests (.zip)</TrackedLink>
      <p className="!text-sm">No email required. Unzip the download, then run these commands from your downloads directory:</p>
      <Code label="Run the standalone Lambda rollback tests">{localTest}</Code>
      <p>The suite checks successful ordering, rejection before promotion, restoration after gateway failure, refusal to overwrite an alias conflict and rejection of weighted aliases. This is the failed-gateway test:</p>
      <Code label="Test that gateway failure restores the previous Lambda version">{rollbackTest}</Code>
      <p>Expected result: <code>Ran 5 tests</code> followed by <code>OK</code>. A JSON rollback event is expected during the failure test. The test verifies that the release raised an error and requested version 7 using the revision returned by promotion.</p>
      <p>For a useful negative check, change the expected restored version in the test from <code>"7"</code> to <code>"8"</code> and rerun it. That assertion should fail. Restore the test afterwards. This confirms that the test detects a wrong rollback target.</p>

      <h2 id="aws-acceptance">6. Verify AWS behavior before relying on the workflow</h2>
      <p>Local tests verify decisions and SDK arguments. They cannot prove IAM permissions, OIDC trust, service readiness or alias propagation. Rehearse the workflow in an isolated AWS environment with a reviewed budget and a known working previous version.</p>
      <ol>
        <li>Confirm the deployment role, function, region and API endpoint. Check that unsigned requests fail and signed requests work.</li>
        <li>Release a valid candidate and confirm the expected release identifier through API Gateway.</li>
        <li>Reject a deliberately invalid candidate before promotion; confirm the old version remains selected.</li>
        <li>Exercise a controlled post-promotion failure, inspect the alias and verify the previous release through the endpoint after restoration.</li>
        <li>Rehearse the operator procedure for a stopped runner or alias conflict. Record the current revision, restore only the reviewed version and verify service health.</li>
      </ol>
      <p>Choose bounded retry and timeout behavior appropriate to the endpoint, including transient errors and alias propagation. This implementation rolls back on the first failed gateway probe. Longer observation windows or gradual traffic shifts need a different deployment strategy and acceptance tests.</p>
      <div className="mt-10 rounded-3xl bg-brand-mint/60 p-6 md:p-8"><h2 className="!pt-0">Apply this to your team's release process</h2><p>The <TrackedLink to="/services#cicd-setup" eventName="Service Click" eventSource="lambda-guide-offer">US$1,500 CI/CD Pipeline Setup</TrackedLink> covers one application, one repository and an existing AWS staging target. We agree compatible release checks and rollback behavior before implementation.</p><p><TrackedLink to="/contact?focus=cicd-setup" eventSource="lambda-guide-enquiry">Discuss your pipeline setup</TrackedLink>, or use the <TrackedLink to="/blog/cicd-best-practices#release-kit" eventName="Article Click" eventSource="lambda-guide-checklist">release checklist</TrackedLink> to prepare the current workflow, ownership and recovery requirements.</p></div>
    </InsightArticle>
  </>;
}
