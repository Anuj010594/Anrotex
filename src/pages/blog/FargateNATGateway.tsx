import { ArrowDown, ArrowRight } from "lucide-react";
import InsightArticle from "@/components/InsightArticle";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import costExample from "@/content/examples/fargate_network_costs.py?raw";
import endpointExample from "@/content/examples/fargate-endpoints/main.tf?raw";
import endpointTests from "@/content/examples/fargate-endpoints/endpoints.tftest.hcl?raw";

const path = "/blog/ecs-fargate-nat-gateway-vpc-endpoints";
const title = "Does your ECS Fargate app need a NAT gateway?";
const description = "Compare NAT gateway and VPC endpoint costs for ECS Fargate. See two network designs, a Python cost example and Terraform checks before changing routes.";
const toc = [
  { id: "map-connections", label: "Map the connections" },
  { id: "network-designs", label: "Compare the network designs" },
  { id: "cost-comparison", label: "Compare monthly costs" },
  { id: "run-calculation", label: "Run the cost example" },
  { id: "terraform-example", label: "Check the Terraform example" },
  { id: "check-connectivity", label: "Test the connections" },
  { id: "choose-design", label: "Choose the right design" },
];
const codeClass = "mt-6 overflow-x-auto rounded-2xl bg-brand-navy p-5 text-sm leading-6 text-brand-off-white";
const inlineCodeClass = "!bg-transparent !p-0 !text-inherit";
const costOutput = `AWS only / NAT: US$77.50
AWS only / endpoints: US$59.40
External API / NAT: US$78.40
External API / NAT + endpoints: US$133.30`;

function NetworkDiagram({ endpoints }: { endpoints: boolean }) {
  return <figure className="mt-7 rounded-3xl border border-brand-navy/15 bg-brand-stone/40 p-5 md:p-7">
    <figcaption className="font-bold text-brand-navy">{endpoints ? "Design B: private connections to the four AWS services" : "Design A: a NAT gateway in each Availability Zone"}</figcaption>
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      {["A", "B"].map(zone => <div key={zone} className="rounded-2xl border border-brand-navy/15 bg-brand-off-white p-4 text-center text-sm leading-6">
        <p className="!mt-0 font-bold">Availability Zone {zone}</p>
        <div className="mt-4 rounded-xl bg-brand-mint/50 p-3 font-semibold">Fargate task<br /><span className="font-normal">Private subnet · no public IP</span></div>
        <ArrowDown aria-hidden="true" className="mx-auto my-3 h-5 w-5" />
        <div className="rounded-xl border border-brand-navy/20 p-3 font-semibold">{endpoints ? "Four interface endpoint network connections" : "Public NAT gateway in AZ " + zone}<br /><span className="font-normal">{endpoints ? "ECR API · ECR registry · Logs · Secrets" : "Public subnet · one Elastic IP"}</span></div>
        <ArrowDown aria-hidden="true" className="mx-auto my-3 h-5 w-5" />
        <div className="rounded-xl bg-brand-navy p-3 text-brand-off-white">{endpoints ? "AWS services over private connections" : "Internet gateway → public AWS service addresses and external APIs"}</div>
      </div>)}
    </div>
    <div className="mt-5 flex flex-col items-center gap-3 rounded-xl border border-brand-navy/15 bg-brand-mint/40 p-4 text-center text-sm font-semibold leading-6 sm:flex-row sm:justify-between">
      <span>Image-layer traffic<br />from both task subnets</span><ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 rotate-90 sm:rotate-0" /><span>S3 gateway endpoint<br />on both route tables</span><ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 rotate-90 sm:rotate-0" /><span>ECR image layers<br />stored in S3</span>
    </div>
    <p className="!mt-4 !text-sm !leading-6">{endpoints ? "An endpoint connection is available in each AZ. DNS and routing determine which one a task uses. External IPv4 APIs still need a separate outbound path." : "Each task uses its own AZ’s NAT gateway. S3 image layers use the gateway endpoint instead of passing through NAT."}</p>
  </figure>;
}

export default function FargateNATGateway() {
  return <>
    <SEO title="ECS Fargate: NAT Gateway vs VPC Endpoints | Anrotex" description={description} path={path} type="article" structuredData={[
      articleSchema({ headline: title, description, path, datePublished: "2026-11-28", dateModified: "2026-11-28", reviewed: false }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Insights", path: "/blog" }, { name: "Fargate networking costs", path }]),
    ]} />
    <InsightArticle eyebrow="ECS Fargate networking" title={title}
      description="Your containers need images, logs, secrets and sometimes an external API. Follow those connections before deciding whether a NAT gateway or private endpoints make sense."
      published="28 November 2026" updated="28 November 2026" readTime="12 minute read" reviewed={false} toc={toc}
      ctaTitle="Review your AWS costs and connections." ctaDescription="Our US$500 infrastructure review covers one workload, one account and region, and up to 20 agreed resources. Changes are scoped separately."
      ctaHref="/contact?focus=aws-review" ctaLabel="Discuss an AWS review">

      <div className="rounded-3xl border border-brand-navy/15 bg-brand-mint/40 p-6 md:p-8">
        <p className="!mt-0"><strong>A Fargate task does not always need a NAT gateway. It needs a working route to every service it uses.</strong></p>
        <p>Private endpoints can cover supported AWS services. If your IPv4-only application also calls a public payment, email or other external API, those endpoints alone are not enough. Keep an appropriate outbound route.</p>
        <p>In the example below, replacing NAT with four interface endpoints lowers the monthly networking subtotal from <strong>US$77.50 to US$59.40</strong>. Keeping NAT and adding those endpoints raises the external-API design from <strong>US$78.40 to US$133.30</strong>. The connections you need determine which comparison applies.</p>
      </div>

      <h2 id="map-connections">Start with the application’s connections</h2>
      <p>Consider one Linux Fargate application on platform version 1.4.0 or later. Its tasks run in private IPv4 subnets across two Availability Zones in US East (Ohio), <code>us-east-2</code>. It pulls a private ECR image, sends logs to CloudWatch Logs and receives a secret through its task definition.</p>
      <p>One version of the application needs only those AWS services. Another also calls an external IPv4 API. We keep that difference visible throughout the comparison.</p>
      <div className="overflow-x-auto" role="region" aria-label="Fargate application connections" tabIndex={0}>
        <table><thead><tr><th scope="col">Connection</th><th scope="col">Private route for this example</th><th scope="col">What to check</th></tr></thead><tbody>
          <tr><td>ECR authentication and image details</td><td><code>ecr.api</code> interface endpoint</td><td>Task execution role permissions and private DNS</td></tr>
          <tr><td>ECR registry</td><td><code>ecr.dkr</code> interface endpoint</td><td>HTTPS access and private DNS</td></tr>
          <tr><td>Container image layers</td><td>S3 gateway endpoint</td><td>Both task route tables and access to ECR’s regional layer bucket</td></tr>
          <tr><td>Container logs</td><td><code>logs</code> interface endpoint</td><td>Existing log group and execution role permissions</td></tr>
          <tr><td>Secret injected at task startup</td><td><code>secretsmanager</code> interface endpoint</td><td>Execution role access to the secret and its encryption key, where required</td></tr>
          <tr><td>External IPv4 API</td><td>NAT or another approved internet-access path</td><td>The API’s actual hostname, port and access requirements</td></tr>
        </tbody></table>
      </div>
      <p>AWS documents the <a href="https://docs.aws.amazon.com/AmazonECR/latest/userguide/vpc-endpoints.html">ECR API, registry and S3 endpoint requirements</a>. <a href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html">Secrets Manager endpoints</a> provide private access to that service; they do not supply IAM permission by themselves.</p>
      <p>List additional connections your application makes, including SSM Parameter Store, STS, KMS, telemetry and third-party APIs. A task that retrieves a secret at runtime uses its application task role, which may differ from the <a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html">execution role used at startup</a>. Add the correct endpoint and permissions for the actual caller.</p>

      <h2 id="network-designs">Compare the two network designs</h2>
      <p>A <strong>NAT gateway</strong> lets private IPv4 tasks initiate connections to public addresses. A <strong>VPC interface endpoint</strong> gives private access to a particular supported service. An <strong>S3 gateway endpoint</strong> adds routes for regional S3 traffic and has no additional endpoint hourly or data-processing charge.</p>
      <NetworkDiagram endpoints={false} />
      <NetworkDiagram endpoints />
      <p>The diagrams show outbound traffic. An internet-facing load balancer can still send customer requests to private tasks; that incoming path is separate. A public subnet alone does not give a Fargate task internet access when the task has no public IP. AWS explains the <a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/networking-outbound.html">public and private subnet options</a>.</p>
      <p>The NAT example uses two zonal public NAT gateways. AWS also offers <a href="https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateways-regional.html">regional NAT gateways</a>, billed by active AZ and processed data. Account for every active AZ and public address when pricing that design. IPv6 and managed outbound proxies are other designs to assess separately against all of your dependencies.</p>
      <p><strong>Four interface endpoints across two AZs means eight billed endpoint network connections.</strong> Merely placing endpoints in both AZs does not guarantee every request remains within its AZ; check DNS resolution and traffic paths if cross-AZ charges matter.</p>

      <h2 id="cost-comparison">Compare the monthly networking costs</h2>
      <p>Rates checked on <strong>28 November 2026</strong> for <strong>US East (Ohio)</strong>. The calculation uses 730 hours, two NAT gateways where needed, one public IPv4 address per NAT gateway, and four interface endpoints in each of two AZs where needed. Both designs already use an S3 gateway endpoint.</p>
      <div className="overflow-x-auto" role="region" aria-label="AWS networking rates used in the comparison" tabIndex={0}>
        <table><thead><tr><th scope="col">Charge</th><th scope="col">Rate used</th><th scope="col">Monthly fixed cost</th></tr></thead><tbody>
          <tr><td>NAT gateway hours</td><td>US$0.045 per gateway-hour</td><td>2 × 730 × US$0.045 = US$65.70</td></tr>
          <tr><td>NAT public IPv4 addresses</td><td>US$0.005 per address-hour</td><td>2 × 730 × US$0.005 = US$7.30</td></tr>
          <tr><td>NAT data processing</td><td>US$0.045 per GB</td><td>Depends on traffic through NAT</td></tr>
          <tr><td>Interface endpoint hours</td><td>US$0.01 per endpoint-AZ-hour</td><td>4 × 2 × 730 × US$0.01 = US$58.40</td></tr>
          <tr><td>Interface endpoint processing</td><td>US$0.01 per GB in the first 1 PB monthly regional tier</td><td>Depends on traffic through the endpoints</td></tr>
          <tr><td>S3 gateway endpoint</td><td>No endpoint hourly or processing charge</td><td>US$0.00 in both designs</td></tr>
        </tbody></table>
      </div>
      <p>Sources: <a href="https://aws.amazon.com/vpc/pricing/">AWS NAT gateway and public IPv4 pricing</a>, <a href="https://aws.amazon.com/privatelink/pricing/">AWS PrivateLink pricing</a>, and the <a href="https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonVPC/current/us-east-2/index.json">Ohio VPC price list</a>. Rates can change. The 730-hour month is a calculation assumption; actual billable time can differ.</p>
      <p>Assume <strong>100 GB per month</strong>, counting requests and responses, goes through the four AWS interface services. Image-layer downloads use the S3 gateway route and are outside that 100 GB. The external-API version also processes <strong>20 GB through NAT</strong>.</p>
      <div className="overflow-x-auto" role="region" aria-label="Monthly NAT and endpoint comparison" tabIndex={0}>
        <table><thead><tr><th scope="col">Application needs</th><th scope="col">Design</th><th scope="col">Fixed cost</th><th scope="col">Processing</th><th scope="col">Monthly subtotal</th></tr></thead><tbody>
          <tr><td>AWS services only</td><td>NAT + S3 gateway</td><td>US$73.00</td><td>100 × US$0.045 = US$4.50</td><td><strong>US$77.50</strong></td></tr>
          <tr><td>AWS services only</td><td>Interface endpoints + S3 gateway</td><td>US$58.40</td><td>100 × US$0.01 = US$1.00</td><td><strong>US$59.40</strong></td></tr>
          <tr><td>AWS services + external API</td><td>NAT + S3 gateway</td><td>US$73.00</td><td>120 × US$0.045 = US$5.40</td><td><strong>US$78.40</strong></td></tr>
          <tr><td>AWS services + external API</td><td>NAT + interface endpoints + S3 gateway</td><td>US$131.40</td><td>100 × US$0.01 + 20 × US$0.045 = US$1.90</td><td><strong>US$133.30</strong></td></tr>
        </tbody></table>
      </div>
      <p>These are <strong>networking subtotals</strong>. Add internet data transfer, cross-AZ and cross-region transfer where applicable, Fargate, load balancer charges and its public addresses, ECR storage, S3 requests, logging, secrets, taxes and other services. No free-tier allowance or discount is included.</p>
      <h3>When does adding endpoints pay for itself?</h3>
      <p>If NAT must remain, moving eligible traffic from US$0.045 to US$0.01 per GB saves US$0.035 per GB in processing. Four endpoints across two AZs add US$58.40 per month. That needs about <strong>1,669 GB per month</strong> of eligible traffic to cover the added endpoint hours: <code>58.40 ÷ 0.035</code>. This threshold excludes transfer differences and assumes the same pricing tier.</p>
      <p>A smaller endpoint set has a different threshold. For example, routing image layers through the S3 gateway can avoid NAT processing without adding interface endpoint hours for that S3 traffic. Choose endpoints for their access requirements as well as their cost. Keep a required private connection even when it is not the cheapest option.</p>

      <h2 id="run-calculation">Run the cost calculation on your computer</h2>
      <p>Save this as <code>fargate_network_costs.py</code> and run it with Python 3. It makes no network requests and needs no AWS credentials. Read the <a href="/downloads-policy">code usage and safe-use terms</a> before using the examples.</p>
      <pre className={codeClass} aria-label="Python Fargate networking cost calculation" tabIndex={0}><code className={inlineCodeClass}>{costExample}</code></pre>
      <pre className={codeClass} aria-label="Run the networking cost calculation" tabIndex={0}><code className={inlineCodeClass}>python3 fargate_network_costs.py</code></pre>
      <pre className={codeClass} aria-label="Verified networking calculation output" tabIndex={0}><code className={inlineCodeClass}>{costOutput}</code></pre>
      <p>The calculation checks also cover idle-month charges, invalid traffic inputs, a missing internet route and the break-even point. Change the traffic inputs to explore your workload; update the rates and endpoint count if your design differs. The first-tier endpoint rate assumes total regional interface traffic remains within that tier.</p>

      <h2 id="terraform-example">Check the private endpoint configuration</h2>
      <p>This Terraform example adds the four interface endpoints and the ECR image-layer route to an <strong>existing, separate Ohio test VPC</strong>. It requires two subnets in different AZs, their two route tables, the task security group and an existing execution role. It does not create the VPC, tasks, NAT gateways, IAM roles or default internet routes.</p>
      <p>The VPC needs DNS support and DNS hostnames enabled. Existing task egress and network ACLs must permit HTTPS to the endpoints and S3. The interface security group accepts HTTPS only from the supplied task security group. Endpoint policies restrict access to the named execution role; that role must still have the appropriate IAM permissions.</p>
      <p>The S3 policy allows image-layer reads from ECR’s Ohio bucket. <strong>If your application also uses other S3 buckets, add their required permissions before associating this endpoint with its route tables.</strong> Otherwise, moving S3 traffic onto the endpoint can block those requests. Check for existing endpoints and private DNS conflicts first.</p>
      <details className="mt-6 rounded-2xl border border-brand-navy/15 p-5">
        <summary className="cursor-pointer font-bold text-brand-navy">Show main.tf</summary>
        <pre className={codeClass} aria-label="Terraform private Fargate endpoints" tabIndex={0}><code className={inlineCodeClass}>{endpointExample}</code></pre>
      </details>
      <p>The example uses an execution role for image pulls, log delivery and startup secret injection. If application code calls these services using another role, review the endpoint policy for that caller too. Existing log groups, secret permissions and any required KMS permissions remain your responsibility. AWS provides further guidance on <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/cloudwatch-logs-and-interface-VPC.html">CloudWatch Logs endpoints and testing</a>.</p>
      <h3>Run the configuration tests without creating resources</h3>
      <p>Use Terraform 1.7 or later. Save <code>main.tf</code> and the following <code>endpoints.tftest.hcl</code> in a new directory. The test uses Terraform’s mock AWS provider and sample IDs, so it checks the planned configuration without making AWS API calls.</p>
      <details className="mt-6 rounded-2xl border border-brand-navy/15 p-5">
        <summary className="cursor-pointer font-bold text-brand-navy">Show endpoints.tftest.hcl</summary>
        <pre className={codeClass} aria-label="Terraform endpoint configuration tests" tabIndex={0}><code className={inlineCodeClass}>{endpointTests}</code></pre>
      </details>
      <pre className={codeClass} aria-label="Validate and test the Terraform endpoint example" tabIndex={0}><code className={inlineCodeClass}>{`terraform init -backend=false
terraform fmt -check
terraform validate
terraform test`}</code></pre>
      <p><code>init</code> downloads the pinned AWS provider and writes local setup files. The checks verify the four endpoints, private DNS, two supplied subnets, HTTPS access, execution-role restrictions and the S3 image-layer route. They also reject a configuration with only one subnet.</p>
      <p>Configuration tests do not prove that real subnet IDs belong to different AZs or that a running application can connect. Use the checks below in staging before removing any working route. Review any real Terraform plan with your infrastructure owner; applying it creates billable endpoints and changes S3 routing.</p>

      <h2 id="check-connectivity">Test every connection before changing production</h2>
      <ol>
        <li><strong>Confirm the network.</strong> Check that both task subnets belong to the intended VPC and different AZs. Inspect their route tables, DNS settings, task egress, endpoint security groups and network ACLs.</li>
        <li><strong>Start a new task in each AZ.</strong> Use the intended image and task definition. Confirm that the image pulls, the application starts and the health check passes.</li>
        <li><strong>Check new logs.</strong> Find the log stream for each new task and verify that fresh entries arrive. Old logs do not prove the new route works.</li>
        <li><strong>Check secret use.</strong> Confirm the intended secret is available to the application without printing its value. Exercise the application operation that needs it.</li>
        <li><strong>Check external calls.</strong> Use the external provider’s test environment and a harmless operation. A basic health check may pass while payment or email requests fail.</li>
        <li><strong>Prove the selected path.</strong> In an isolated staging subnet, test the endpoint design without a default NAT route. A successful test while NAT remains available can hide a missing endpoint. Restore the staging route if a required connection fails.</li>
        <li><strong>Repeat after a replacement.</strong> Launch a replacement task and repeat the checks. Keep the previous working configuration available until the agreed checks pass.</li>
      </ol>
      <p>AWS documents an extra requirement for the <a href="https://docs.aws.amazon.com/AmazonECR/latest/userguide/vpc-endpoints.html">first pull through an ECR pull-through cache</a>: it can still require NAT. Windows images can have external layer dependencies too. The Linux private-image example here does not remove those exceptions.</p>
      <p>If a task fails before your application logs appear, follow our <TrackedLink to="/blog/ecs-fargate-task-keeps-stopping" eventName="Article Click" eventSource="fargate-network-task-failure">ECS stopped-task guide</TrackedLink>. Separate networking failures from missing IAM permissions, image errors and application startup problems.</p>

      <h2 id="choose-design">Choose the design that fits the workload</h2>
      <ul>
        <li><strong>Only supported AWS connections:</strong> assess whether endpoints cover every startup and runtime dependency, then compare their full cost with NAT.</li>
        <li><strong>External IPv4 APIs:</strong> preserve a suitable outbound route. Add endpoints where access controls or enough eligible traffic justify them.</li>
        <li><strong>NAT processing dominated by S3:</strong> investigate the S3 gateway route first, including the endpoint policy and every affected bucket.</li>
        <li><strong>Unclear dependencies:</strong> map connections and test them before changing routes. Record expected charges and compare billed usage after the change.</li>
      </ul>
      <p>Use our <TrackedLink to="/blog/reduce-aws-costs#worksheet" eventName="Article Click" eventSource="fargate-network-worksheet">AWS cost-review worksheet</TrackedLink> to record the traffic, proposed change, owner and checks. For new ECS infrastructure, see the <TrackedLink to="/terraform-aws" eventName="Service Click" eventSource="fargate-network-foundation">Terraform AWS Foundation</TrackedLink>.</p>
      <p>For an existing workload, our <TrackedLink to="/services#aws-review" eventName="Service Click" eventSource="fargate-network-review">US$500 AWS Infrastructure Review</TrackedLink> covers one account and region, and up to 20 agreed resources. It provides findings and a practical action plan; implementation is scoped separately. <TrackedLink to="/aws-review-preview" eventName="Service Click" eventSource="fargate-network-preview">Preview the findings and action plan.</TrackedLink></p>
      <p><TrackedLink to="/contact?focus=aws-review" eventSource="fargate-network-enquiry" className="inline-flex rounded-full bg-brand-navy px-6 py-3 font-bold !text-brand-off-white !no-underline">Discuss your AWS networking costs</TrackedLink></p>
    </InsightArticle>
  </>;
}
