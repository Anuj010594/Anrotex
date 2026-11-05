import type { ReactNode } from "react";
import { ArrowDown, Download } from "lucide-react";
import InsightArticle from "@/components/InsightArticle";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { articleSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import DownloadNotice from "@/components/DownloadNotice";
import releaseSource from "../../../public/downloads/lambda-rollback/release.py?raw";
import testSource from "../../../public/downloads/lambda-rollback/test_release.py?raw";

const path = "/blog/aws-lambda-rollback-github-actions";
const title = "AWS Lambda Deployment Rollback with GitHub Actions";
const description = "Learn how to check an AWS Lambda release and switch back when it fails. Includes Python code, GitHub Actions steps and tests you can run on your computer.";
const sharingImage = `${SITE_URL}/images/og/cicd-guide.png`;
const releaseCode = releaseSource.slice(releaseSource.indexOf("def release("), releaseSource.indexOf('\n\ndef main('));
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
  --url "$API_URL" --region "$REGION" \\
  --confirm-test-account "$TEST_ACCOUNT_ID"`;
const localTest = `unzip lambda-rollback-tests.zip
cd lambda-rollback
python3 -B -m unittest -v test_release`;
const toc = [
  { id: "release-path", label: "Keep the working version available" },
  { id: "candidate-checks", label: "Check the new version first" },
  { id: "promotion", label: "Switch versions and check the app" },
  { id: "github-actions", label: "Control releases with GitHub Actions" },
  { id: "test-rollback", label: "Run the tests on your computer" },
  { id: "aws-acceptance", label: "Test the setup in AWS" },
];

function Code({ label, children }: { label: string; children: ReactNode }) {
  return <pre tabIndex={0} role="region" aria-label={label} className="mt-6 overflow-x-auto rounded-2xl bg-brand-navy p-5 text-sm leading-relaxed text-brand-off-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal"><code className="!bg-transparent !p-0 !text-inherit">{children}</code></pre>;
}

export default function LambdaDeploymentRollback() {
  return <>
    <SEO title={`${title} | Anrotex`} description={description} path={path} type="article" image={sharingImage} imageAlt="CI/CD from pull request to production — a release pipeline with a recovery path, by Anrotex." imageWidth={1731} imageHeight={909} structuredData={[
      articleSchema({ headline: title, description, path, datePublished: "2026-11-03", dateModified: "2026-11-05", image: sharingImage }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Insights", path: "/blog" }, { name: "Lambda deployment rollback", path }]),
    ]} />
    <InsightArticle eyebrow="AWS deployments" title={title} description="Check that a new version works before sending users to it. If the release fails, have a clear way to switch back to the previous version." published="3 November 2026" updated="5 November 2026" readTime="12 minute read" toc={toc} ctaTitle="Make releases easier to manage." ctaDescription="Set up a release process for one application in your existing AWS test environment. Get checks, a rollback test and clear instructions for your team." ctaHref="/services#cicd-setup" ctaLabel="See the US$1,500 pipeline setup">
      <p>A deployment can finish without errors while the application still fails for users. The new code might be running, but can it save data, read it back and allow the right people to use it?</p>
      <p>This guide explains how to check an AWS Lambda release and switch back to the previous version when those checks fail. Switching back is called a <strong>rollback</strong>. We use Python code from Anrotex's <TrackedLink to="/portfolio/cloud-operations" eventName="Case Study Click" eventSource="lambda-guide-project">Cloud Operations project</TrackedLink> and show how it connects to GitHub Actions.</p>
      <p>You can also <a href="#test-rollback">download the tests to run on your computer</a>. They let you try the release and safety checks without an AWS account.</p>

      <h2 id="release-path">1. Keep the working version available</h2>
      <p>Keep the current version running while you check the new one. Lambda supports this through an <strong>alias</strong>: a name that points to a particular version of your code. In this example, that name is <code>live</code>.</p>
      <p>API Gateway, the AWS service that receives requests for this application, sends them to <code>live</code>. Uploading a new version does not change that name's target. The application keeps using the previous version until the script switches it.</p>
      <p>Publishing a Lambda version saves its code and most settings. For the settings AWS allows you to change later, see its <a href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html" target="_blank" rel="noreferrer">function version documentation</a>.</p>
      <figure aria-label="Lambda release and rollback flow" className="mt-8 rounded-3xl border border-brand-navy/15 bg-brand-stone/40 p-5 md:p-8">
        <div className="rounded-2xl bg-brand-navy p-5 text-center font-bold text-brand-off-white">Upload the new version<br /><span className="text-sm font-normal text-brand-stone">The application keeps using the previous version</span></div>
        <ArrowDown className="mx-auto my-3 h-6 w-6 text-brand-teal" aria-hidden="true" />
        <div className="rounded-2xl border border-brand-teal/25 bg-brand-off-white p-5 text-center font-bold">Test the new version<br /><span className="text-sm font-normal text-brand-teal">If a check fails, stop and keep the previous version</span></div>
        <div className="my-3 flex items-center justify-center gap-2 text-sm font-bold text-brand-teal"><ArrowDown className="h-6 w-6" aria-hidden="true" />Checks pass</div>
        <div className="rounded-2xl bg-brand-mint p-5 text-center font-bold">Switch to the new version<br /><span className="text-sm font-normal">Check access, which version is running, and whether the app can save and read data</span></div>
        <ArrowDown className="mx-auto my-3 h-6 w-6 text-brand-teal" aria-hidden="true" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-brand-teal/30 bg-brand-off-white p-5"><strong>Checks pass</strong><p className="!mt-2 !text-sm">Keep using the new version.</p></div>
          <div className="rounded-2xl border border-brand-navy/20 bg-brand-yellow/25 p-5"><strong>Checks fail</strong><p className="!mt-2 !text-sm">Try to switch back. Report the release as failed.</p></div>
        </div>
        <figcaption className="mt-4 text-sm leading-relaxed text-brand-teal">If the script stops or cannot switch back, an engineer needs to check which version is running and restore service.</figcaption>
      </figure>
      <p>The script checks the app immediately after a release. It does not keep watching for problems later. It also stops if the alias is already splitting requests between multiple versions; this example expects one version to receive all requests.</p>

      <h2 id="candidate-checks">2. Check the new version before using it</h2>
      <p>First, the script records the version currently in use so it knows where to switch back. It then uploads and publishes the new code with <code>Publish=True</code> and waits for the update.</p>
      <p>Using <code>Qualifier=version</code>, it calls that specific version directly. The application continues to use the old version while these checks run:</p>
      <ul>
        <li><strong>Is this the right version?</strong> <code>GET /health</code> must return HTTP 200, the success response, and the code version we expect.</li>
        <li><strong>Can it save data?</strong> <code>POST /requests</code> must create a test record or return the same record if the check has already created it.</li>
        <li><strong>Can it read that data?</strong> A request for the saved record must return the expected content.</li>
      </ul>
      <p>If any check fails, the script stops before switching versions. Adapt these checks to the actions that matter in your application. Label test records clearly, decide when to delete them, and keep them out of customer reports.</p>
      <p>Calling Lambda directly does not check whether API Gateway allows the right people in. That check comes after the switch.</p>

      <h2 id="promotion">3. Switch versions, then check the application</h2>
      <p>After the first checks pass, the script changes <code>live</code> to point to the new version. Each change includes a <code>RevisionId</code>, a value AWS uses to detect whether someone else changed the alias in the meantime. If they did, AWS rejects our change. See the <a href="https://docs.aws.amazon.com/lambda/latest/api/API_UpdateAlias.html" target="_blank" rel="noreferrer">UpdateAlias reference</a>.</p>
      <p>Here is the complete <code>release()</code> function. The download also contains <code>candidate_check()</code>, which performs the checks described above.</p>
      <Code label="Python code to check a release and switch back after a failure">{releaseCode}</Code>
      <p>Next, the script tests the application through API Gateway. It checks that requests without AWS authentication are refused. It then uses AWS request signing, called SigV4, to make authenticated requests and check:</p>
      <ul>
        <li>The application is running the expected code version.</li>
        <li>It can create a record and read it back.</li>
        <li>Repeating the same request returns the same record instead of creating a duplicate.</li>
      </ul>
      <p>If these checks fail, the script tries to point <code>live</code> back to the previous version. It uses the latest revision value from its own change, so it will not overwrite another release that happened afterwards.</p>
      <p>The release is still reported as failed, even if switching back succeeds. The script does not test the application again after switching back; an engineer must confirm it works. If the switch fails, check the version now running before making another change.</p>
      <p>Switching code versions does not undo saved data, database changes or infrastructure changes. The old version must still be able to use the current data. Keep it available and plan database changes separately.</p>

      <h2 id="github-actions">4. Control releases with GitHub Actions</h2>
      <p>The GitHub Actions workflow runs tests when code is pushed or a pull request is opened. The release step runs only after those tests pass. Someone must start it manually from <code>main</code> and choose <code>deploy=true</code>.</p>
      <p>This part of the workflow sets those rules:</p>
      <Code label="GitHub Actions settings for starting a release">{workflow}</Code>
      <p>The full workflow also downloads the selected code, sets up Python and installs the package versions recorded for the project. It uses a specific version of <code>aws-actions/configure-aws-credentials</code> to get temporary AWS access.</p>
      <p>That access uses <strong>OIDC</strong>, which lets GitHub prove its identity to AWS without storing long-lived AWS keys. The workflow then builds the application package and runs the release script:</p>
      <p>Use the downloaded <code>release.py</code> and <code>smoke.py</code> in your project's <code>scripts</code> folder when following these commands.</p>
      <Code label="Commands to package and release the application">{releaseCommand}</Code>
      <p>The package contains <code>GITHUB_SHA</code>, the identifier for the chosen code commit. The checks use it to confirm which code is running. Set <code>FUNCTION</code> to the Lambda function name, <code>API_URL</code> to the application's address and <code>REGION</code> to its AWS region.</p>
      <p>Set <code>TEST_ACCOUNT_ID</code> to the 12-digit ID of your separate AWS test account. Before changing resources, the command checks the address and confirms that your AWS credentials belong to that account. Use the function name, not an ARN. You must still confirm that the account and application are suitable for testing.</p>
      <p>Before using the workflow:</p>
      <ul>
        <li><strong>Set up the AWS resources.</strong> API Gateway must send requests to the alias, and the previous Lambda version must still exist.</li>
        <li><strong>Control who can release.</strong> Allow only the intended branch to use the GitHub environment. Add reviewer approval if your plan supports it; an environment name alone does not require approval.</li>
        <li><strong>Limit AWS access.</strong> Configure the AWS role to trust only the intended repository and environment. Give it only the permissions the release needs. The <code>id-token: write</code> setting allows GitHub to request an identity token; it does not grant AWS permissions by itself.</li>
        <li><strong>Run one release at a time.</strong> Use the same <code>concurrency</code> group for releases to the same application. With <code>cancel-in-progress: false</code>, a new release will not cancel the one already running. A manual cancellation, timeout or network failure can still stop it.</li>
      </ul>
      <p>Use GitHub's guides to <a href="https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws" target="_blank" rel="noreferrer">connect to AWS with OIDC</a> and <a href="https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency" target="_blank" rel="noreferrer">control which jobs can run together</a> for the full setup. Check how waiting jobs are handled; not every queued release is guaranteed to run.</p>

      <h2 id="test-rollback">5. Run the tests on your computer</h2>
      <p>The download includes the release script and 23 tests. They simulate AWS and application responses on your computer, so you do not need an AWS account, access keys or extra Python packages. Network connections are blocked while these tests run. Use Python 3.10 or later; these tests passed with Python 3.14.</p>
      <p>The release code has been tested this way. It still needs testing in AWS before use with a real application.</p>
      <section aria-labelledby="test-results" className="mt-8 rounded-3xl border border-brand-navy/15 bg-brand-stone/55 p-6 md:p-8">
        <h3 id="test-results" className="!pt-0">Test results: 5 November 2026</h3>
        <p>All 23 automated tests passed with Python 3.14.6, using the files extracted from the downloadable ZIP. AWS and application responses were simulated. Network connections were blocked during the tests.</p>
        <ul>
          <li><strong>Checks pass:</strong> the script checks the new version, requests the switch, then checks the application.</li>
          <li><strong>A check fails before the switch:</strong> the script makes no request to change the running version.</li>
          <li><strong>A check fails after the switch:</strong> the script requests a return to the previous version and reports the release as failed.</li>
          <li><strong>Another release changes the version:</strong> a rejected update stops the script; it does not retry without the revision check.</li>
        </ul>
        <p>These results check the script's decisions. They do not measure recovery time or prove that an application is working in AWS. Follow the <a href="#aws-acceptance">AWS test steps below</a> to check your own setup.</p>
      </section>
      <TrackedLink to="/downloads/lambda-rollback-tests.zip" reloadDocument download="lambda-rollback-tests.zip" eventSource="lambda-guide-tests" className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 !text-base !font-bold !text-brand-off-white !no-underline transition hover:bg-brand-teal"><Download className="h-4 w-4 shrink-0" aria-hidden="true" />Download the rollback tests (.zip)</TrackedLink>
      <DownloadNotice />
      <p className="!text-sm">No email required. Read the README and terms inside the ZIP before running code. The test command below uses simulated responses; running the included release scripts directly can change AWS resources. Open a terminal in the folder where you saved the download, then run:</p>
      <Code label="Run the standalone Lambda rollback tests">{localTest}</Code>
      <p>The tests check what happens when:</p>
      <ul>
        <li>All checks pass and the steps run in the right order.</li>
        <li>The new version fails a check before the switch.</li>
        <li>The application fails a check after the switch.</li>
        <li>Someone else changes the alias during the release.</li>
        <li>The alias is already splitting requests between versions.</li>
        <li>The address or account details are wrong, or account confirmation is missing.</li>
        <li>A response tries to redirect a request, change its path or return too much data.</li>
      </ul>
      <p>This test checks that, after a failure, the script asks AWS to switch back to version 7:</p>
      <Code label="Test that gateway failure restores the previous Lambda version">{rollbackTest}</Code>
      <p>You should see <code>Ran 23 tests</code> followed by <code>OK</code>. A message containing <code>"event": "rollback"</code> is expected: the test deliberately causes a failure and checks the recovery action. The <code>-B</code> option keeps Python from creating extra cache files.</p>
      <p>To see the test catch a mistake, change its expected restored version from <code>"7"</code> to <code>"8"</code> and run it again. It should fail because the script requests version 7. Change the test back afterwards.</p>

      <h2 id="aws-acceptance">6. Test the setup in AWS before going live</h2>
      <p>The tests on your computer check what the script asks AWS to do. A separate AWS test must confirm that permissions work, requests reach the right version and the previous version can serve the application again.</p>
      <p>Use a separate AWS test environment, agree its budget and keep a known working version available. Then check the following:</p>
      <ol>
        <li>Confirm the AWS role, function, region and application address. Check that requests without authentication fail and authenticated requests work.</li>
        <li>Release a working version. Check its version identifier through API Gateway.</li>
        <li>Try a version that deliberately fails a check before the switch. Confirm that the application keeps using the old version.</li>
        <li>Cause a controlled failure after the switch. Check that the alias points back to the previous version, then test that the application works.</li>
        <li>Practise recovery when the release job stops or someone else changes the alias. Check its current version and revision, switch to the approved version, then test the application.</li>
      </ol>
      <p>This script tries to switch back after the first failed check through API Gateway. Temporary errors or a delay in the version switch could trigger that action too. Decide how long checks should wait and how many retries your application needs. If you want to move users gradually between versions, use a release approach designed for that and test it separately.</p>
      <div className="mt-10 rounded-3xl bg-brand-mint/60 p-6 md:p-8"><h2 className="!pt-0">Make your next release easier to manage</h2><p>The <TrackedLink to="/services#cicd-setup" eventName="Service Click" eventSource="lambda-guide-offer">US$1,500 CI/CD Pipeline Setup</TrackedLink> covers one application and one repository, deploying to an existing AWS test environment. We agree what to check and how to recover before starting the work.</p><p><TrackedLink to="/contact?focus=cicd-setup" eventSource="lambda-guide-enquiry">Discuss your pipeline setup</TrackedLink>, or use the <TrackedLink to="/blog/cicd-best-practices#release-kit" eventName="Article Click" eventSource="lambda-guide-checklist">release checklist</TrackedLink> to record the steps, who handles the release and what to do if it fails.</p></div>
    </InsightArticle>
  </>;
}
