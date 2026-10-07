import { ArrowRight } from "lucide-react";
import InsightArticle from "@/components/InsightArticle";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import workflow from "@/content/node-ci.yml?raw";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";

const toc = [
  { id: "stages", label: "Choose the right pipeline stages" },
  { id: "testing", label: "Make checks fast and dependable" },
  { id: "github-actions", label: "GitHub Actions workflow example" },
  { id: "deployment", label: "Control production deployments" },
  { id: "rollback", label: "Plan and test recovery" },
  { id: "troubleshooting", label: "Troubleshoot pipeline failures" },
  { id: "measurement", label: "Measure delivery improvements" },
  { id: "checklist", label: "Before your next release" },
];

export default function CICDBestPractices() {
  return (
    <>
      <SEO
        title="CI/CD Best Practices & GitHub Actions Example | Anrotex"
        description="Build a dependable CI/CD pipeline with a GitHub Actions example, practical testing steps, deployment approvals, rollback guidance, and a release checklist."
        path="/blog/cicd-best-practices"
        type="article"
        structuredData={[
          articleSchema({
            headline: "CI/CD best practices: from pull request to production",
            description:
              "A practical CI/CD guide with a Node.js workflow, deployment controls, recovery steps, and troubleshooting advice.",
            path: "/blog/cicd-best-practices",
            datePublished: "2026-06-17",
            dateModified: "2026-10-07",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/blog" },
            { name: "CI/CD best practices", path: "/blog/cicd-best-practices" },
          ]),
        ]}
      />

      <InsightArticle
        eyebrow="CI/CD automation"
        title="CI/CD best practices: from pull request to production"
        description="Build a pipeline that catches failures early, releases the version you tested, and gives your team a dependable way to recover."
        published="17 June 2026"
        updated="7 October 2026"
        readTime="12 minute read"
        toc={toc}
        ctaTitle="Make releases easier to trust."
        ctaDescription="Tell us where your pipeline slows down or breaks. We can help with testing, deployment automation, and recovery."
        ctaHref="/contact?focus=cicd"
        ctaLabel="Discuss your pipeline"
      >
        <div className="rounded-[1.75rem] border border-brand-navy/10 bg-brand-stone/55 p-6 md:p-8">
          <p className="!mt-0 text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">A reliable release starts here</p>
          <p className="mt-3 text-xl font-semibold leading-relaxed text-brand-navy">
            Check every change, build from a known commit, control access to
            production, and confirm that the application works after deployment.
          </p>
        </div>
        <p>
          Continuous integration checks changes as developers combine their work.
          Continuous delivery keeps a tested version ready for release, with a
          production approval where your team needs one. Continuous deployment
          takes that final step automatically after the required checks pass.
        </p>
        <p>
          Start with the part of delivery that causes the most friction: slow
          feedback, unreliable tests, manual configuration, or difficult recovery.
          If you need help choosing and implementing the changes, explore our{" "}
          <TrackedLink to="/ci-cd-automation" eventName="Service Click" eventSource="cicd-guide-intro">CI/CD automation services</TrackedLink>.
        </p>

        <h2 id="stages">1. Give each pipeline stage a clear job</h2>
        <p>
          A useful pipeline moves from inexpensive checks to more demanding ones.
          Catch syntax and type errors before starting a long integration suite.
          Reserve production access for the deployment stage.
        </p>
        <ol>
          <li><strong>Check the change.</strong> Review the diff, lint the code, check types where applicable, and run focused unit tests.</li>
          <li><strong>Test the connections.</strong> Exercise the database, API contracts, authentication, and critical dependencies in an isolated environment.</li>
          <li><strong>Build the release.</strong> Create the application package or container image and record its commit and digest.</li>
          <li><strong>Verify in staging.</strong> Use production-like configuration and test the user journeys affected by the change.</li>
          <li><strong>Deploy and observe.</strong> Release the approved version, run smoke checks, and watch application health before declaring success.</li>
        </ol>
        <p>
          Keep releases small enough to understand and reverse. Infrastructure
          changes belong in version control too: review a Terraform plan before
          applying it, and coordinate changes to application code and infrastructure.
        </p>

        <h2 id="testing">2. Make checks fast enough to use and dependable enough to trust</h2>
        <p>
          Keep the runtime version and dependency lockfile consistent between
          developer machines and CI. For npm projects, <code>npm ci</code> installs
          from the lockfile and fails when it disagrees with <code>package.json</code>.
          Commit the matching lockfile instead of regenerating it during a build.
          See the <a href="https://docs.npmjs.com/cli/v11/commands/npm-ci/" target="_blank" rel="noreferrer">npm ci reference</a> for installation options.
        </p>
        <ul>
          <li>Run tests without watch mode so the job finishes with a clear pass or fail.</li>
          <li>Use isolated test data and predictable clocks where time affects behavior.</li>
          <li>Give flaky tests an owner and a fix date. Repeatedly rerunning a failure until it passes hides the problem.</li>
          <li>Cache dependency downloads, then measure whether the cache reduces runtime. Keep credentials and production data out of caches.</li>
          <li>Set timeouts and keep useful failure logs. Split independent suites only when their runtime justifies the extra jobs.</li>
        </ul>
        <p>
          Require the checks that protect your application before merging. Include
          dependency and security checks suited to your stack, with a clear process
          for investigating findings. A build passing by itself says little about
          whether sign-in, payments, or background jobs still work.
        </p>

        <h2 id="github-actions">3. Build and test a Node.js app with GitHub Actions</h2>
        <p>
          Save this workflow as <code>.github/workflows/node-ci.yml</code> in a
          Node.js 24 project. It expects a committed <code>package-lock.json</code>,
          scripts named <code>lint</code>, <code>test:ci</code>, and <code>build</code>,
          and build output in <code>dist/</code>. For a Vitest project,{" "}
          <code>test:ci</code> can run <code>vitest run</code>; use your test runner&apos;s
          equivalent for other frameworks.
        </p>
        <p>
          Pull requests targeting <code>main</code> run the same checks as pushes
          to <code>main</code>. A successful push also saves the build as an artifact
          named with its commit SHA. The workflow uses GitHub-hosted runners and
          public npm dependencies; private packages need separately scoped registry access.
        </p>
        <pre aria-label="Node.js CI workflow" tabIndex={0} className="mt-7 max-w-full overflow-x-auto rounded-2xl bg-brand-navy p-5 text-sm leading-7 text-brand-off-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal md:p-7"><code className="!bg-transparent !p-0 !text-inherit">{workflow}</code></pre>
        <p>
          The action references pin specific releases of{" "}
          <a href="https://github.com/actions/checkout" target="_blank" rel="noreferrer">checkout</a>,{" "}
          <a href="https://github.com/actions/setup-node" target="_blank" rel="noreferrer">setup-node</a>, and{" "}
          <a href="https://github.com/actions/upload-artifact" target="_blank" rel="noreferrer">upload-artifact</a>.
          Review updates to those references as part of dependency maintenance.
          The npm cache stores package downloads; dependencies are still installed
          with <code>npm ci</code> on each run.
        </p>
        <h3>Check the workflow before relying on it</h3>
        <ol>
          <li>Run <code>npm ci</code>, <code>npm run lint</code>, <code>npm run test:ci</code>, and <code>npm run build</code> locally with Node.js 24. Confirm the output directory matches the workflow.</li>
          <li>Open a test pull request. Introduce a failing test and confirm the job fails; fix it and confirm the job passes.</li>
          <li>After merging, download the artifact from the successful main-branch run. Check that it contains the expected files and no credentials.</li>
          <li>Make the job a required check in your repository rules, then connect the successful build to your deployment platform.</li>
        </ol>
        <p>
          The 14-day artifact retention is useful for testing this setup. Choose
          release storage and retention that cover your recovery needs before
          using these artifacts for production. GitHub&apos;s{" "}
          <a href="https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs" target="_blank" rel="noreferrer">Node.js workflow guide</a>{" "}
          covers additional package managers and build configurations.
        </p>

        <h2 id="deployment">4. Control what can reach production</h2>
        <p>
          Configure your deployment platform to accept only the intended branch,
          successful checks, and approved build. A separate hosting integration
          may start deploying before GitHub Actions finishes; check its settings
          so a failed test cannot be followed by a production release.
        </p>
        <p>
          Promote the same tested artifact where your platform supports it.
          If a frontend embeds environment settings at build time, test the exact
          production-configured build before promotion. Record its commit and
          release identifier so the running version is easy to trace.
        </p>
        <h3>Approvals and deployment order</h3>
        <p>
          For a GitHub Actions deployment job, reference a production environment
          and configure its allowed branches and required reviewers where your
          GitHub plan supports them. An environment name alone does not create an
          approval requirement. See{" "}
          <a href="https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments" target="_blank" rel="noreferrer">GitHub&apos;s environment settings</a>.
        </p>
        <p>
          Canceling an outdated test run can save time. Production deployments
          need a different policy: serialize changes to the same environment,
          avoid interrupting a migration halfway through, and check that an older
          run cannot overwrite a newer release. GitHub provides{" "}
          <a href="https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency" target="_blank" rel="noreferrer">workflow and job concurrency controls</a>{" "}
          for managing overlapping runs.
        </p>
        <h3>Keep deployment credentials out of build jobs</h3>
        <p>
          Give each job only the permissions it needs. Keep secrets out of source
          code, logs, browser bundles, and uploaded artifacts. Run untrusted pull
          request code without production credentials or access to privileged
          self-hosted runners. Follow GitHub&apos;s{" "}
          <a href="https://docs.github.com/en/actions/reference/security/secure-use" target="_blank" rel="noreferrer">Actions security guidance</a>{" "}
          when choosing triggers and third-party actions.
        </p>
        <p>
          For AWS deployments, use short-lived credentials through OIDC where
          possible. Restrict the role&apos;s trust policy to the intended repository
          and branch or environment, using the subject format your repository
          actually issues. GitHub&apos;s{" "}
          <a href="https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws" target="_blank" rel="noreferrer">AWS OIDC setup</a>{" "}
          explains the configuration.
        </p>

        <h2 id="rollback">5. Make recovery part of the release</h2>
        <p>
          Keep a known-good application version available and decide what would
          trigger a rollback: failed smoke checks, elevated errors, slow critical
          requests, or a growing queue. Assign someone to watch these signals
          during the rollout and give them a clear recovery procedure.
        </p>
        <ul>
          <li><strong>Check compatibility.</strong> The previous application must still work with the current database schema, configuration, and external APIs.</li>
          <li><strong>Separate destructive migrations.</strong> Add compatible schema changes first, migrate usage, and remove old structures only after recovery no longer depends on them.</li>
          <li><strong>Test the recovery path.</strong> Rehearse reverting a release in staging, including application health checks and background processing.</li>
          <li><strong>Plan data recovery separately.</strong> Reverting code does not undo writes or restore deleted data. Understand backup restoration and any acceptable data-loss window.</li>
        </ul>
        <p>
          Canary and blue-green releases can reduce exposure to a bad deployment,
          but both need working health checks, enough capacity, and compatible data
          changes. Our{" "}
          <TrackedLink to="/case-studies/fintech-aws-cost-reduction" eventName="Case Study Click" eventSource="cicd-guide-recovery">fintech case study</TrackedLink>{" "}
          explains how blue-green delivery and Terraform helped improve a payments
          platform&apos;s release process.
        </p>

        <h2 id="troubleshooting">6. Find the cause of recurring pipeline failures</h2>
        <p>Start with the first failing stage and compare it with the last successful run. On smaller screens, scroll the table to see every column.</p>
        <div role="region" aria-label="CI/CD troubleshooting" tabIndex={0} className="mt-7 overflow-x-auto rounded-2xl border border-brand-navy/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal">
          <table>
            <thead><tr><th scope="col">Problem</th><th scope="col">What to inspect</th><th scope="col">Next step</th></tr></thead>
            <tbody>
              <tr><td>Works locally, fails in CI</td><td>Runtime, lockfile, file-name casing, environment variables, and working directory</td><td>Reproduce with a clean install and the same commands and runtime.</td></tr>
              <tr><td>Tests hang or pass intermittently</td><td>Watch mode, shared data, external services, timeouts, and timing assumptions</td><td>Use a single-run test command and isolate the unstable dependency.</td></tr>
              <tr><td>Builds wait longer than they run</td><td>Runner queue time, parallel job limits, and unnecessary duplicate runs</td><td>Measure queue and execution time separately before adding runners.</td></tr>
              <tr><td>Deployment is blocked</td><td>Environment reviewers, allowed branches, token permissions, and cloud trust policy</td><td>Find the specific failed requirement and correct it without broadening access.</td></tr>
              <tr><td>Deployment passes, application fails</td><td>Deployed commit, configuration, readiness checks, migrations, and dependency health</td><td>Stop the rollout and use the tested recovery procedure if health limits are exceeded.</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          If Kubernetes workloads become unhealthy during releases, use the{" "}
          <TrackedLink to="/blog/kubernetes-scaling-best-practices#availability" eventName="Article Click" eventSource="cicd-guide-kubernetes">Kubernetes availability checks</TrackedLink>{" "}
          to review readiness, rollout capacity, and autoscaling together.
        </p>

        <h2 id="measurement">7. Measure the whole delivery process</h2>
        <p>
          A faster build helps only if the change reaches users safely. Track time
          waiting for runners, test execution, review, approval, and deployment.
          Then compare similar applications and release types over the same period.
        </p>
        <ul>
          <li><strong>Feedback time:</strong> How long developers wait for the checks they need to act on.</li>
          <li><strong>Time to production:</strong> Time from a recorded code change to that version running in production.</li>
          <li><strong>Release frequency:</strong> Successful production releases per application over a defined period.</li>
          <li><strong>Failed releases and recovery:</strong> Releases needing intervention, and time from failure detection to restored service.</li>
          <li><strong>Cost per successful run:</strong> Runner, test environment, storage, and related infrastructure costs.</li>
        </ul>
        <p>
          Agree the start and end points for each measure so comparisons stay
          useful. Review faster delivery alongside error rates and recovery time.
          For expensive build or test environments, the{" "}
          <TrackedLink to="/blog/reduce-aws-costs#idle-resources" eventName="Article Click" eventSource="cicd-guide-costs">AWS cleanup checklist</TrackedLink>{" "}
          can help identify resources left running between jobs.
        </p>

        <h2 id="checklist">8. Before your next release</h2>
        <ul>
          <li>Required checks pass for the commit being released.</li>
          <li>The artifact, runtime settings, and destination are identifiable.</li>
          <li>Deployment access and any required approvals are configured.</li>
          <li>Only the intended release can update production at that time.</li>
          <li>Database and configuration changes support the recovery plan.</li>
          <li>Smoke checks cover a critical user journey, not just an HTTP response.</li>
          <li>Someone is watching health signals and can stop or reverse the rollout.</li>
          <li>The previous release remains available for the agreed recovery period.</li>
        </ul>

        <div className="mt-14 rounded-[1.75rem] border border-brand-navy/10 bg-brand-stone/55 p-6 md:p-8">
          <p className="!mt-0 text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">Improve your release process</p>
          <h2 className="!pt-4">Spend less time fixing deployments.</h2>
          <p>
            Anrotex helps teams improve GitHub Actions, GitLab CI/CD, and Jenkins
            pipelines, from automated checks to rollout and recovery. See what our{" "}
            <TrackedLink to="/ci-cd-automation" eventName="Service Click" eventSource="cicd-guide-footer">CI/CD consulting service includes</TrackedLink>,
            or tell us about the release problem you want to solve.
          </p>
          <TrackedLink to="/contact?focus=cicd" eventSource="cicd-guide-footer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 text-base font-bold text-brand-off-white transition hover:bg-brand-teal">
            Discuss your pipeline <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </TrackedLink>
        </div>
      </InsightArticle>
    </>
  );
}
