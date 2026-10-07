import { ArrowRight, CheckCircle2 } from "lucide-react";
import InsightArticle from "@/components/InsightArticle";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";

const toc = [
  { id: "baseline", label: "Build a trustworthy cost baseline" },
  { id: "idle-resources", label: "Remove idle and orphaned resources" },
  { id: "ec2", label: "Reduce EC2 costs safely" },
  { id: "rightsizing-example", label: "A worked EC2 savings example" },
  { id: "storage-databases", label: "Optimize storage and databases" },
  { id: "commitments", label: "Use commitments at the right time" },
  { id: "guardrails", label: "Prevent costs from returning" },
  { id: "measure-savings", label: "Measure savings after the change" },
  { id: "plan", label: "A practical 30-day plan" },
];

const quickWins = [
  "Unattached EBS volumes and obsolete snapshots",
  "Idle or oversized EC2 and RDS resources",
  "Non-production workloads running outside working hours",
  "S3 data without lifecycle or retention rules",
  "NAT Gateway and cross-zone data-transfer patterns",
  "Commitment discounts that no longer match usage",
];

export default function AwsCostReductionBlog() {
  return (
    <>
      <SEO
        title="How to Reduce AWS Costs: A Practical Checklist | Anrotex"
        description="Reduce AWS costs with a step-by-step checklist, an EC2 rightsizing example, risk checks, and a method to measure savings after changes."
        path="/blog/reduce-aws-costs"
        type="article"
        structuredData={[
          articleSchema({
            headline: "How to reduce AWS costs: a practical checklist",
            description:
              "An AWS cost reduction checklist with a worked EC2 example, operational risk checks, and a method for verifying savings.",
            path: "/blog/reduce-aws-costs",
            datePublished: "2026-06-16",
            dateModified: "2026-10-07",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/blog" },
            { name: "Reduce AWS Costs", path: "/blog/reduce-aws-costs" },
          ]),
        ]}
      />

      <InsightArticle
        eyebrow="AWS cost optimization"
        title="How to reduce AWS costs: a practical checklist"
        description="The safest way to lower an AWS bill is to remove waste first, right-size from real utilization data, and buy commitments only after demand is understood."
        published="16 June 2026"
        updated="7 October 2026"
        readTime="14 minute read"
        toc={toc}
        ctaTitle="Find the waste in your AWS estate."
        ctaDescription="Get a focused review of the highest-value cost opportunities, their operational risk, and the order in which to address them."
        ctaHref="/aws-cost-optimization"
        ctaLabel="Explore the AWS cost review"
      >
        <div className="rounded-[1.75rem] border border-brand-navy/10 bg-brand-stone/55 p-6 md:p-8">
          <p className="m-0 text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">
            The short answer
          </p>
          <p className="mt-3 text-xl font-semibold leading-relaxed text-brand-navy">
            To reduce your AWS bill safely, establish a reliable baseline, remove
            resources that provide no value, right-size compute and storage using
            utilization data, then introduce commitments and guardrails.
          </p>
        </div>

        <p>
          AWS cost reduction is not a one-time exercise and it should not begin
          with indiscriminate shutdowns. A useful optimization program connects
          every saving to a workload owner, a performance constraint, and a way
          to verify that the change did not create new reliability risk.
        </p>

        <p>
          The opportunities below are ordered deliberately. Start with visibility
          and reversible cleanup. Move to rightsizing and architecture changes
          once you understand workload behavior. Purchase Savings Plans or
          reservations only after the underlying demand is stable.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {quickWins.map((item) => (
            <p
              key={item}
              className="!m-0 flex items-start gap-3 rounded-2xl border border-brand-navy/10 bg-brand-off-white p-4 text-sm font-semibold leading-relaxed text-brand-navy"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
              {item}
            </p>
          ))}
        </div>

        <h2 id="baseline">1. Build a trustworthy AWS cost baseline</h2>

        <p>
          Start with the last three complete billing months, then inspect recent
          daily spend for changes hidden by monthly totals. Break down the largest
          services before reviewing individual resources. Include month-end jobs,
          traffic peaks, deployments, and seasonal events when choosing the
          utilization window; three months alone may not capture an annual peak.
        </p>

        <p>
          Save the dates, account and region filters, currency, and cost basis
          alongside the report. AWS Cost Explorer offers{" "}
          <a href="https://docs.aws.amazon.com/cost-management/latest/userguide/ce-exploring-data.html" rel="noreferrer" target="_blank">
            different cost views
          </a>
          : amortized cost spreads commitment fees over their term, while net
          amortized cost also reflects applicable discounts. Use the same basis
          before and after a change, and account separately for credits, refunds,
          tax, and one-off charges. A lower invoice after a credit does not establish
          a lower recurring run rate.
        </p>

        <p>
          Start with AWS Cost Explorer and{" "}
          <a
            href="https://docs.aws.amazon.com/cost-management/latest/userguide/cost-optimization-hub.html"
            rel="noreferrer"
            target="_blank"
          >
            AWS Cost Optimization Hub
          </a>
          . Cost Optimization Hub consolidates recommendations for rightsizing,
          idle resources, Savings Plans, and reservations across supported AWS
          services. Treat its estimated savings as a prioritized investigation
          list—not an instruction to implement every recommendation automatically.
        </p>

        <h3>Create a cost map that engineering can act on</h3>

        <ul>
          <li>
            Break spend down by account, service, region, environment, and
            workload.
          </li>
          <li>
            Activate cost-allocation tags for owner, product, environment, and
            cost centre.
          </li>
          <li>
            Separate production, non-production, shared-platform, and unallocated
            spend.
          </li>
          <li>
            Record unit metrics such as cost per customer, transaction, build, or
            request where they are meaningful.
          </li>
        </ul>

        <p>
          AWS documents how activated{" "}
          <a
            href="https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/custom-tags.html"
            rel="noreferrer"
            target="_blank"
          >
            cost-allocation tags
          </a>{" "}
          can feed Cost Explorer reports and budgets. The immediate objective is
          accountability: every meaningful cost should have an owner who can
          explain what business outcome it supports.
        </p>

        <h2 id="idle-resources">2. Remove idle and orphaned resources first</h2>

        <p>
          Idle-resource cleanup is usually the lowest-risk place to begin because
          it removes spend without changing the capacity of a healthy production
          workload. Verify ownership and recovery requirements before deletion,
          then work through:
        </p>

        <ul>
          <li>Unattached EBS volumes and snapshots outside the retention policy.</li>
          <li>Unused Elastic IP addresses and old load balancers.</li>
          <li>Stopped EC2 instances that still retain paid storage.</li>
          <li>Idle RDS instances, replicas, and non-production databases.</li>
          <li>Development environments running overnight or on weekends.</li>
          <li>Old container images, log groups, and backups with no expiry policy.</li>
        </ul>

        <p>
          Use a quarantine window for uncertain resources: tag the item, notify
          its presumed owner, stop it when safe, monitor for impact, and delete it
          only after the agreed recovery window. This makes cleanup repeatable
          without turning cost optimization into an outage exercise.
        </p>

        <div className="mt-8 rounded-2xl border border-brand-navy/10 bg-brand-stone/55 p-6">
          <h3 className="!mt-0">Stopping a resource does not stop every charge</h3>
          <p>
            A stopped EC2 instance no longer incurs instance usage charges, but
            retained EBS volumes and Elastic IP addresses can still cost money.
            Check the{" "}
            <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html" rel="noreferrer" target="_blank">
              EC2 billing rules by instance state
            </a>{" "}
            before forecasting savings; commitments also need a separate review.
          </p>
          <p>
            For supported RDS instances, stopping leaves storage and other
            retained-resource charges in place, and RDS automatically starts the
            instance again after seven consecutive days. Use the{" "}
            <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_StopInstance.html" rel="noreferrer" target="_blank">
              RDS stopping limitations and billing guidance
            </a>{" "}
            when planning a non-production schedule.
          </p>
        </div>

        <h2 id="ec2">3. How to reduce EC2 costs safely</h2>

        <p>
          EC2 cost reduction should use CPU, memory, network, disk, and
          application-level performance data. CPU alone is not enough for
          memory-heavy databases, network appliances, or workloads with bursty
          latency requirements.
        </p>

        <p>
          Verify that memory data actually exists. Compute Optimizer can use
          memory metrics collected through the CloudWatch agent or supported
          external observability integrations; see its{" "}
          <a href="https://docs.aws.amazon.com/compute-optimizer/latest/ug/ec2-metrics-analyzed.html" rel="noreferrer" target="_blank">
            EC2 metrics requirements
          </a>
          . Missing memory data is a reason to collect more evidence before
          approving a smaller instance.
        </p>

        <h3>Rightsize from observed demand</h3>

        <p>
          AWS Compute Optimizer analyzes resource configuration and utilization
          metrics to produce rightsizing recommendations and projected
          price-performance tradeoffs. Review the{" "}
          <a
            href="https://docs.aws.amazon.com/compute-optimizer/latest/ug/view-ec2-recommendations.html"
            rel="noreferrer"
            target="_blank"
          >
            EC2 recommendation details
          </a>
          , then validate the proposed instance family and size against peak
          traffic, memory headroom, storage throughput, network requirements, and
          recovery targets.
        </p>

        <h3>Match capacity to time and demand</h3>

        <ul>
          <li>
            Schedule predictable non-production workloads to stop outside working
            hours.
          </li>
          <li>
            Use Auto Scaling groups so steady-state capacity does not need to
            cover every peak.
          </li>
          <li>
            Evaluate Graviton-compatible instance families after application and
            dependency testing.
          </li>
          <li>
            Use Spot Instances for interruption-tolerant workers, batch jobs, and
            flexible container capacity—not for workloads that cannot handle
            interruption.
          </li>
        </ul>

        <h3>Compare potential savings and performance risks</h3>
        <p className="text-sm">On small screens, scroll the table horizontally to see all four columns.</p>
        <div role="region" aria-label="AWS cost opportunities and verification" tabIndex={0} className="mt-8 overflow-x-auto rounded-2xl border border-brand-navy/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal">
          <table>
            <thead>
              <tr>
                <th>Opportunity</th>
                <th>Potential benefit</th>
                <th>Risk to check</th>
                <th>How to verify</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Downsize an EC2 instance</td>
                <td>Lower hourly compute cost</td>
                <td>Memory, throughput, and headroom during peaks or failover</td>
                <td>Compare billed usage and peak latency, errors, and saturation</td>
              </tr>
              <tr>
                <td>Schedule non-production</td>
                <td>Fewer paid instance hours</td>
                <td>Overnight jobs, restart dependencies, and access requirements</td>
                <td>Check the schedule, billed hours, and retained storage charges</td>
              </tr>
              <tr>
                <td>Remove an orphaned volume</td>
                <td>Eliminate unnecessary storage charges</td>
                <td>Unknown owner, recovery dependency, or retention requirement</td>
                <td>Confirm approval and recovery policy, then check storage usage</td>
              </tr>
              <tr>
                <td>Change an S3 lifecycle rule</td>
                <td>Lower cost for older or temporary data</td>
                <td>Retrieval, transition fees, minimum durations, and recovery time</td>
                <td>Compare total storage and access cost after the transition</td>
              </tr>
              <tr>
                <td>Review NAT and transfer paths</td>
                <td>Reduce avoidable processing or transfer charges</td>
                <td>Connectivity, routing, and endpoint costs</td>
                <td>Check gateway hours, processed bytes, and related transfer charges</td>
              </tr>
              <tr>
                <td>Buy a commitment</td>
                <td>Discount eligible, stable usage</td>
                <td>Unused commitment after migrations or demand changes</td>
                <td>Track utilization and total effective cost, not coverage alone</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="rightsizing-example">4. Worked example: test a smaller EC2 instance</h2>
        <p>
          Suppose a service has three replicas, each with 4 vCPUs and 8 GiB of
          memory. Across 28 representative days, including scheduled jobs and a
          known traffic peak, the highest observed five-minute CPU value is 30%
          and memory reaches 2.5 GiB per instance. This makes a 2-vCPU, 4-GiB
          instance in the same architecture a candidate for testing. Those
          observations alone do not prove it can handle shorter bursts or failover.
        </p>
        <div className="mt-6 rounded-2xl border border-brand-navy/10 bg-brand-stone/55 p-6">
          <p className="!mt-0 font-bold">Calculate the monthly compute cost</p>
          <p>
            For this example, use $0.20/hour before and $0.12/hour after,
            730 hours per month, three replicas in both configurations, and no
            Savings Plans or Reserved Instances covering the usage.
          </p>
          <ul>
            <li>Current compute: 3 × 730 × $0.20 = <strong>$438.00/month</strong>.</li>
            <li>Candidate compute: 3 × 730 × $0.12 = <strong>$262.80/month</strong>.</li>
            <li>Potential reduction: <strong>$175.20/month, or 40% of this compute cost</strong>.</li>
          </ul>
          <p className="!mb-0">
            This excludes storage, data transfer, support, tax, and testing costs.
            Replace the sample rates with those for your region, operating system,
            instance type, and purchase arrangement. The 40% difference applies only to the compute charges in this example.
          </p>
        </div>
        <ol>
          <li>Check the candidate&apos;s network and EBS throughput, CPU credits where relevant, memory headroom, and application compatibility.</li>
          <li>Test representative peaks and failure scenarios against agreed latency, error-rate, queue, and saturation limits.</li>
          <li>Keep the previous configuration ready for rollback, then use an approved staged rollout with an owner watching the metrics.</li>
          <li>Compare actual usage and effective cost after a representative observation period; record any extra capacity or costs needed to maintain performance.</li>
        </ol>
        <p>
          See the checks to make before switching instance sizes in our{" "}
          <TrackedLink to="/aws-cost-optimization#sample-finding" eventName="Service Click" eventSource="aws-guide-example">
            EC2 rightsizing example
          </TrackedLink>.
        </p>

        <h2 id="storage-databases">5. Optimize EBS, S3, RDS, and EKS together</h2>

        <h3>EBS and snapshot hygiene</h3>

        <p>
          Look for unattached volumes, oversized provisioned IOPS, obsolete
          snapshots, and volumes whose type no longer matches the workload. Treat
          snapshot retention as a documented recovery policy instead of allowing
          backups to accumulate indefinitely.
        </p>

        <h3>S3 lifecycle and access patterns</h3>

        <p>
          S3 costs include storage, requests, retrieval, and data movement. Use
          access-pattern evidence before moving data between classes.{" "}
          <a
            href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/cost-optimization.html"
            rel="noreferrer"
            target="_blank"
          >
            AWS S3 cost-optimization guidance
          </a>{" "}
          describes lifecycle rules, Intelligent-Tiering, and purpose-built
          storage classes. Include retrieval and transition fees, minimum storage
          durations, and recovery requirements in the comparison. Add expiry rules for temporary objects, incomplete
          multipart uploads, and logs that exceed their required retention.
        </p>

        <h3>RDS and database costs</h3>

        <p>
          Review instance class, storage, IOPS, replicas, Multi-AZ requirements,
          backup retention, and database connection patterns together. A smaller
          database instance is not a saving if it increases latency or moves the
          bottleneck into application retries.
        </p>

        <h3>EKS and container platforms</h3>

        <p>
          For EKS, connect pod requests to actual workload usage, then review node
          utilization and autoscaling. Requests influence scheduling and capacity
          allocation; CPU limits can cause throttling, while exceeding memory
          limits can cause a container to be killed. Review{" "}
          <a href="https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/" rel="noreferrer" target="_blank">
            Kubernetes requests and limits
          </a>{" "}
          separately, then optimize workload and node capacity together.
        </p>

        <h3>NAT Gateways and data transfer</h3>
        <p>
          Separate gateway hours, processed data, and transfer charges before
          changing routes. The{" "}
          <a href="https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-pricing.html" rel="noreferrer" target="_blank">
            AWS NAT Gateway pricing guidance
          </a>{" "}
          helps identify which charges a change could affect. For suitable
          VPC-to-S3 traffic, an{" "}
          <a href="https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html" rel="noreferrer" target="_blank">
            S3 gateway endpoint
          </a>{" "}
          has no additional endpoint charge and can avoid routing that traffic
          through NAT. Interface endpoints have different pricing. Check routing
          and connectivity requirements, and include any remaining gateway hours
          and transfer costs in the estimate.
        </p>

        <h2 id="commitments">6. Buy Savings Plans and reservations last</h2>

        <p>
          Commitment discounts can be valuable for stable baseline usage, but
          they do not remove waste. Buying a commitment against oversized or
          unnecessary infrastructure can lock the wrong cost structure in place.
        </p>

        <ol>
          <li>Remove idle resources and correct obvious configuration waste.</li>
          <li>Rightsize workloads and observe the new baseline.</li>
          <li>Separate stable usage from variable or interruptible capacity.</li>
          <li>Model commitment coverage conservatively.</li>
          <li>Track utilisation and renewal dates as owned financial decisions.</li>
        </ol>

        <p>
          <a href="https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html" rel="noreferrer" target="_blank">
            Savings Plans
          </a>{" "}
          involve a spending commitment per hour for one or three years. Reducing
          covered usage does not automatically reduce that payment. Check whether
          freed coverage can serve other eligible usage, and avoid adding a
          rightsizing estimate to a commitment estimate that assumes the old
          resource size. Model the combined final configuration once.
        </p>

        <h2 id="guardrails">7. Prevent the AWS bill from growing back</h2>

        <p>
          Savings decay when optimization remains a quarterly clean-up exercise.
          Add lightweight controls to normal engineering work:
        </p>

        <ul>
          <li>Budgets and anomaly alerts routed to accountable owners.</li>
          <li>Mandatory ownership and environment tags in Infrastructure as Code.</li>
          <li>Cost impact included in architecture and pull-request reviews.</li>
          <li>Expiry dates for temporary environments and experiments.</li>
          <li>A weekly review of unexpected spend and a monthly unit-cost review.</li>
          <li>A visible backlog ranked by saving, effort, and operational risk.</li>
        </ul>

        <h2 id="measure-savings">8. Verify savings after implementation</h2>
        <p>
          Keep three numbers separate: the estimated opportunity, the change in
          recurring effective cost, and the impact on the cash bill. A rightsizing
          change can release committed capacity without immediately reducing cash
          payments. Label the result accordingly.
        </p>
        <ol>
          <li><strong>Record the baseline.</strong> Save the reporting dates, resource scope, cost basis, commitment assumptions, traffic volume, and performance targets before making the change.</li>
          <li><strong>Log the rollout.</strong> Record what changed, its owner, deployment date, testing costs, and any rollback or replacement capacity.</li>
          <li><strong>Compare like-for-like periods.</strong> Include the same business cycles, use a complete observation window, and check cost per useful unit alongside total spend. Separate demand changes, credits, pricing changes, and unrelated releases.</li>
          <li><strong>Accept or revise the result.</strong> Verify reliability targets and costs across affected services. Record recurring savings separately from one-off implementation costs, and revisit the estimate if costs moved elsewhere.</li>
        </ol>
        <p>
          For example, cost per 1,000 successful transactions equals the scoped
          cost divided by successful transactions, multiplied by 1,000. Use a unit
          that reflects the workload: reduced spend during a traffic drop is not
          by itself evidence of improved efficiency.
        </p>
        <p>
          Our{" "}
          <TrackedLink to="/case-studies/fintech-aws-cost-reduction" eventName="Case Study Click" eventSource="aws-guide-measurement">
            fintech AWS cost-reduction case study
          </TrackedLink>{" "}
          shows how infrastructure improvements, Terraform, and blue-green
          delivery helped a payments platform lower AWS costs and release faster.
        </p>

        <h2 id="plan">9. A practical 30-day AWS cost-reduction plan</h2>

        <div role="region" aria-label="30-day AWS cost reduction plan" tabIndex={0} className="mt-8 overflow-x-auto rounded-2xl border border-brand-navy/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal">
          <table>
            <thead>
              <tr>
                <th>Period</th>
                <th>Work</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Days 1–5</td>
                <td>Baseline, ownership, tags, anomalies and idle-resource scan</td>
                <td>Cost map and verified quick-win list</td>
              </tr>
              <tr>
                <td>Days 6–12</td>
                <td>EC2, RDS, EBS, S3, network and container review</td>
                <td>Prioritised opportunity register with risk notes</td>
              </tr>
              <tr>
                <td>Days 13–21</td>
                <td>Implement low-risk cleanup and test rightsizing changes</td>
                <td>Initial cost and performance evidence; longer observation where needed</td>
              </tr>
              <tr>
                <td>Days 22–30</td>
                <td>Model commitments and install budgets, alerts and ownership</td>
                <td>Guardrails and a 60-day implementation backlog</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Common AWS cost-reduction mistakes</h2>

        <ul>
          <li>Buying Savings Plans before removing idle or oversized capacity.</li>
          <li>Rightsizing from average CPU while ignoring peaks and memory.</li>
          <li>Deleting resources without ownership and recovery checks.</li>
          <li>Optimizing one service while moving cost into network or storage.</li>
          <li>Celebrating forecast savings without measuring realised spend.</li>
          <li>Treating FinOps as a finance-only responsibility.</li>
        </ul>

        <div className="mt-14 rounded-[2rem] bg-brand-mint p-7 md:p-10">
          <p className="!m-0 text-xs font-bold uppercase tracking-[0.18em] text-brand-navy">
            Turn the guide into an action plan
          </p>
          <h2 className="!pt-4">Get a focused AWS cost review.</h2>
          <p>
            Anrotex reviews your AWS usage and costs, checks how changes could
            affect performance, and gives your engineers a prioritized plan
            they can put into action.
          </p>
          <TrackedLink
            to="/aws-cost-optimization"
            eventSource="aws-guide-bottom"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 text-sm font-bold text-brand-off-white"
          >
            See what the review includes
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </InsightArticle>
    </>
  );
}
