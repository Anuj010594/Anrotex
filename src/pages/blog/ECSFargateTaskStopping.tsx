import InsightArticle from "@/components/InsightArticle";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import startupExample from "@/content/examples/ecs_startup.py?raw";

const path = "/blog/ecs-fargate-task-keeps-stopping";
const title = "ECS Fargate task keeps stopping? Find the cause and fix it";
const description = "Find why your ECS Fargate task stops. Read exit codes and logs, reproduce a startup failure, and check the fix before releasing again.";
const toc = [
  { id: "first-checks", label: "Start with the stopped task" },
  { id: "read-task-details", label: "Read the failure details" },
  { id: "follow-the-log", label: "Connect the error to the log" },
  { id: "try-the-failure", label: "Reproduce a startup failure" },
  { id: "fix-and-check", label: "Fix the setting and check it" },
  { id: "other-causes", label: "Check other causes" },
  { id: "verify-recovery", label: "Verify the ECS release" },
  { id: "get-help", label: "Get help with your deployment" },
];

const listTasks = `ECS_PROFILE="your-read-only-profile"
ECS_REGION="us-east-1"
ECS_CLUSTER="your-cluster"
ECS_SERVICE="your-service"

aws sts get-caller-identity \\
  --profile "$ECS_PROFILE" --region "$ECS_REGION" \\
  --query Account --output text

aws ecs list-tasks \\
  --profile "$ECS_PROFILE" --region "$ECS_REGION" \\
  --cluster "$ECS_CLUSTER" --service-name "$ECS_SERVICE" \\
  --desired-status STOPPED --output table`;

const describeTask = `ECS_TASK_ARN="paste-the-stopped-task-arn-here"

aws ecs describe-tasks \\
  --profile "$ECS_PROFILE" --region "$ECS_REGION" \\
  --cluster "$ECS_CLUSTER" --tasks "$ECS_TASK_ARN" \\
  --query '{failures:failures,tasks:tasks[].{task:taskArn,definition:taskDefinitionArn,stopCode:stopCode,stoppedReason:stoppedReason,stoppedAt:stoppedAt,containers:containers[].{name:name,exitCode:exitCode,reason:reason,imageDigest:imageDigest}}}' \\
  --output json`;

const codeClass = "mt-6 overflow-x-auto rounded-2xl bg-brand-navy p-5 text-sm leading-6 text-brand-off-white";
const inlineCodeClass = "!bg-transparent !p-0 !text-inherit";

export default function ECSFargateTaskStopping() {
  return <>
    <SEO title="ECS Fargate Task Keeps Stopping? Causes & Fixes | Anrotex" description={description} path={path} type="article" structuredData={[
      articleSchema({ headline: title, description, path, datePublished: "2026-11-25", dateModified: "2026-11-28", reviewed: false }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Insights", path: "/blog" }, { name: "ECS Fargate troubleshooting", path }]),
    ]} />
    <InsightArticle eyebrow="ECS Fargate troubleshooting" title={title}
      description="Your container runs on your laptop. On AWS, it starts, stops and gets replaced. Follow the stopped-task details to the application error, then check that your fix holds."
      published="25 November 2026" updated="28 November 2026" readTime="9 minute read" reviewed={false} toc={toc}
      ctaTitle="Get your deployment working reliably." ctaDescription="Tell us which ECS service is failing and what changed. We can help investigate the cause and agree the work needed."
      ctaHref="/contact?focus=devops" ctaLabel="Discuss an ECS problem">

      <div className="rounded-3xl border border-brand-navy/15 bg-brand-mint/40 p-6 md:p-8">
        <p className="!mt-0"><strong>“Essential container in task exited” tells you what stopped. The exit code and application log help explain why.</strong></p>
        <p>Start with the failed task, its named container and the log from the same attempt. A replacement task has a different ID and may already be hiding the failure you need to inspect.</p>
      </div>

      <h2 id="first-checks">Start with the task that stopped</h2>
      <p>A task is the group of containers ECS runs together. If a container marked as essential stops, ECS stops the other containers in that task too. A service then tries to maintain its requested number of tasks, which can create a repeating start-and-stop pattern. AWS explains the <a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definition_environment">essential container setting</a> in its task definition reference.</p>
      <p>In the ECS console, open your cluster, choose <strong>Tasks</strong> and filter for <strong>Stopped</strong>. Open a failed task and record its stop time, task definition revision, stopped reason and container exit codes. Check the service’s events around the same time.</p>
      <p>Save these details promptly. AWS documents a one-hour window for stopped tasks in the console. Its <a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/stopped-task-errors.html">stopped-task guide</a> shows where to find the information.</p>

      <h2 id="read-task-details">Read the failure details without changing the service</h2>
      <p>With the AWS CLI installed, use an authorised profile that can read the relevant ECS details. Replace the profile, region, cluster and service below. Check that the account ID returned by the first command is the account you intended to inspect.</p>
      <pre className={codeClass} aria-label="List stopped ECS service tasks" tabIndex={0}><code className={inlineCodeClass}>{listTasks}</code></pre>
      <p>Choose the ARN—the task’s full identifier—from the failed attempt you are investigating. The list is not a promise that the first result is the newest failure. Paste the chosen ARN below.</p>
      <pre className={codeClass} aria-label="Read an ECS task stopped reason and container exit codes" tabIndex={0}><code className={inlineCodeClass}>{describeTask}</code></pre>
      <p>These commands read account and task information. If <code>tasks</code> is empty, check <code>failures</code>, the account, region, cluster and task ARN. The task record may also have expired. The <a href="https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DescribeTasks.html">DescribeTasks response</a> includes both task results and lookup failures.</p>
      <ul>
        <li><strong>stopCode and stoppedReason:</strong> the task-level explanation, such as an essential container ending or the service stopping the task.</li>
        <li><strong>Container name, exitCode and reason:</strong> which process ended and any extra detail ECS recorded. An exit code may be absent if the container never started.</li>
        <li><strong>Task definition and image digest:</strong> the configuration revision and exact image involved. Compare them with the last working release.</li>
      </ul>

      <h2 id="follow-the-log">Connect the exit code to the application log</h2>
      <p>Open the failing container’s log stream for that task ID and time. With the <code>awslogs</code> driver configured, the application’s standard output and error output are sent to CloudWatch Logs. AWS describes the required setup in its <a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html">container logging guide</a>.</p>
      <p>Suppose the application ends with code <code>1</code> and logs:</p>
      <pre className={codeClass} aria-label="Missing application setting error" tabIndex={0}><code className={inlineCodeClass}>Startup failed: APP_MESSAGE is required.</code></pre>
      <p>That message identifies the missing setting. Check whether it reaches the failing container in the new task definition. Increasing memory or starting another identical task will not supply it.</p>
      <p>If there is no application log, check the stopped reason first: the container may have failed before the application ran. Also check the log configuration, destination and task execution role’s logging permissions. Use the failed task’s records; <a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html">ECS Exec operates on running containers</a>.</p>

      <h2 id="try-the-failure">Reproduce a missing-setting failure on your computer</h2>
      <p>This small Python application requires a non-secret greeting called <code>APP_MESSAGE</code>. Without it, startup ends with code <code>1</code>. With it, the application serves a greeting and a health response.</p>
      <figure className="mt-7 rounded-3xl border border-brand-navy/15 bg-brand-stone/40 p-5 md:p-7">
        <figcaption className="font-bold text-brand-navy">One setting changes the startup result</figcaption>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-brand-off-white p-5">
            <p className="!mt-0 font-bold">Setting missing</p>
            <ol className="!mt-3 !space-y-2 !text-base"><li>Application starts.</li><li>It reports the missing setting.</li><li>It exits with code 1.</li></ol>
          </div>
          <div className="rounded-2xl bg-brand-mint/60 p-5">
            <p className="!mt-0 font-bold">Setting supplied</p>
            <ol className="!mt-3 !space-y-2 !text-base"><li>Application checks its setting.</li><li>The web server starts.</li><li>A health request returns 200.</li></ol>
          </div>
        </div>
      </figure>
      <p>Use Python 3 in a separate test environment. Save the following as <code>app.py</code>. It listens only on your computer at <code>127.0.0.1</code> and uses no AWS credentials. Read our <a href="/downloads-policy">code usage and safe-use terms</a> before running it.</p>
      <pre className={codeClass} aria-label="Python startup failure example" tabIndex={0}><code className={inlineCodeClass}>{startupExample}</code></pre>
      <p>In a macOS or Linux terminal, run it without the setting:</p>
      <pre className={codeClass} aria-label="Run the example with missing configuration" tabIndex={0}><code className={inlineCodeClass}>{`env -u APP_MESSAGE python3 app.py
echo $?`}</code></pre>
      <p>The application reports the missing setting, and the next command prints its exit code:</p>
      <pre className={codeClass} aria-label="Observed startup failure output" tabIndex={0}><code className={inlineCodeClass}>{`Startup failed: APP_MESSAGE is required.
1`}</code></pre>

      <h2 id="fix-and-check">Supply the setting and check the response</h2>
      <p>Run the same file with the setting supplied. Keep this terminal open while you check the application.</p>
      <pre className={codeClass} aria-label="Start the correctly configured local application" tabIndex={0}><code className={inlineCodeClass}>APP_MESSAGE=hello DEMO_PORT=18080 python3 app.py</code></pre>
      <p>It reports <code>Listening on http://127.0.0.1:18080</code>. In a second terminal, request both the health endpoint and the greeting:</p>
      <pre className={codeClass} aria-label="Check the local health endpoint and application response" tabIndex={0}><code className={inlineCodeClass}>{`curl --fail --silent --show-error http://127.0.0.1:18080/health
curl --fail --silent --show-error http://127.0.0.1:18080/`}</code></pre>
      <pre className={codeClass} aria-label="Observed successful application responses" tabIndex={0}><code className={inlineCodeClass}>{`ok
hello`}</code></pre>
      <p>Both requests return HTTP <code>200</code>. Repeat them while the application remains running, then press <strong>Ctrl+C</strong> in the first terminal to stop it. If port 18080 is already occupied, choose another unused port and use it in both curl commands.</p>
      <p>The failure message and successful responses above come from this local Python example. Use this small server for the exercise; your deployed application should use its usual production server.</p>

      <h3>Apply the same diagnosis to your ECS application</h3>
      <p>If your own application log identifies a missing non-secret setting, add it to the correct container’s environment list through your usual task-definition or infrastructure code process. For this greeting example, the entry would be:</p>
      <pre className={codeClass} aria-label="Non-secret application setting in a container definition" tabIndex={0}><code className={inlineCodeClass}>{`"environment": [
  { "name": "APP_MESSAGE", "value": "hello" }
]`}</code></pre>
      <p>Keep the other container settings and existing environment entries. Register a new task definition revision and test it in staging before changing production. An existing running container does not pick up a newly registered revision automatically. Use your approved secret store for passwords and tokens, and keep their values out of logs and screenshots.</p>
      <p>For a web application on ECS, also check that its server listens on the configured container port and an interface reachable by the load balancer, usually <code>0.0.0.0</code>. The local exercise above intentionally binds to your computer’s loopback address.</p>

      <h2 id="other-causes">When the evidence points to another cause</h2>
      <p>The same short error message can accompany different failures. Use the exit code together with the stopped reason, logs and service events.</p>
      <div className="overflow-x-auto" role="region" aria-label="ECS stopped task diagnosis table" tabIndex={0}>
        <table>
          <thead><tr><th scope="col">What you see</th><th scope="col">What to investigate</th><th scope="col">What would support the fix</th></tr></thead>
          <tbody>
            <tr><td>Exit code 0</td><td>The command completed successfully. A setup script may have finished without starting the long-running web process. Completion can be normal for a one-off job.</td><td>The intended service process remains running and answers requests.</td></tr>
            <tr><td>Exit code 1</td><td>An application error. Read the first useful error around startup: missing configuration, a failed dependency or an invalid command.</td><td>The identified error is resolved and the same startup path succeeds.</td></tr>
            <tr><td>Exit code 137</td><td>The process was killed. Look for an out-of-memory reason and memory metrics, or a forced stop after the shutdown timeout.</td><td>Evidence identifies why it was killed; the application passes a representative test after the change.</td></tr>
            <tr><td>CannotPullContainerError or ResourceInitializationError</td><td>Image retrieval or startup preparation. Follow the specific reason for registry access, networking, secrets or logging setup.</td><td>The task reaches application startup and produces the expected logs.</td></tr>
            <tr><td>Service events report failed health checks</td><td>Check the load balancer path, port, response, network access and startup timing. A container can be running while the service is unreachable.</td><td>Both the application check and the load balancer target check pass.</td></tr>
          </tbody>
        </table>
      </div>
      <p><strong>Code 137 alone does not prove a memory shortage.</strong> Match it to the <a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/out-of-memory.html">out-of-memory reason</a>, available memory measurements and shutdown events before changing capacity. A process can also be forcibly stopped when it does not finish within the configured <a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definition_timeout">stop timeout</a>.</p>
      <p>For failed health checks, test the exact configured check. A <a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/healthcheck.html">container health check</a> runs inside the container, while a load balancer checks the application over the network. They can fail for different reasons.</p>

      <p>If image pulls, logs or secrets fail after a network change, trace the routes in our <TrackedLink to="/blog/ecs-fargate-nat-gateway-vpc-endpoints" eventName="Article Click" eventSource="ecs-troubleshooting-network">Fargate NAT gateway and private endpoint guide</TrackedLink>.</p>

      <h2 id="verify-recovery">Check that the ECS release stays healthy</h2>
      <p>Once the cause is understood, review the proposed change and deploy it to the agreed test environment. Keep the last compatible working revision available while validating the new one.</p>
      <ol>
        <li><strong>Confirm the version.</strong> Check the task definition revision and image digest on the new task.</li>
        <li><strong>Check the startup log.</strong> Confirm the earlier error is gone and required dependencies connect.</li>
        <li><strong>Check both health paths.</strong> Test the configured container check, if present, and the load balancer target status.</li>
        <li><strong>Make a real application request.</strong> A basic health response may not exercise a database or other important dependency.</li>
        <li><strong>Watch for replacement tasks.</strong> Allow enough time for your configured startup and health-check intervals, and exercise representative traffic. Repeated task replacement means the investigation is still open.</li>
        <li><strong>Check the alert.</strong> In staging, use an agreed failure test to confirm the alert reaches the person responsible for recovery.</li>
      </ol>
      <p>Keep the task ID, failed revision, useful log line, change and verification result together. For failures that disappear before someone can investigate, consider <a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-lifecycle-events.html">ECS event capture</a> with an agreed retention period and cost. Avoid putting credentials or customer data into an incident note.</p>
      <p>Our <TrackedLink to="/blog/cicd-best-practices#release-kit" eventName="Article Click" eventSource="ecs-guide-release-checklist">release checklist</TrackedLink> helps record the tested version, health checks, recovery steps and owner before the next rollout.</p>

      <h2 id="get-help">Choose the help that fits your situation</h2>
      <p>For an existing ECS service that keeps failing, start with <TrackedLink to="/devops-consulting" eventName="Service Click" eventSource="ecs-guide-existing-service">DevOps consulting</TrackedLink>. Share the symptom, recent changes and the outcome you need. We agree the investigation and implementation scope before work starts.</p>
      <p>If releases repeatedly introduce configuration mistakes, explore <TrackedLink to="/ci-cd-automation" eventName="Service Click" eventSource="ecs-guide-pipeline">CI/CD automation</TrackedLink> for checks before and after deployment. For a new stateless application that needs AWS infrastructure, see the scope of our <TrackedLink to="/terraform-aws" eventName="Service Click" eventSource="ecs-guide-new-foundation">Terraform AWS Foundation</TrackedLink>.</p>
      <p><TrackedLink to="/contact?focus=devops" eventSource="ecs-guide-enquiry" className="inline-flex rounded-full bg-brand-navy px-6 py-3 font-bold !text-brand-off-white !no-underline">Discuss your ECS deployment</TrackedLink></p>
    </InsightArticle>
  </>;
}
