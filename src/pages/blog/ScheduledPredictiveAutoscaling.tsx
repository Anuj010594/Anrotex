import InsightArticle from "@/components/InsightArticle";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";

const path = "/blog/scheduled-predictive-kubernetes-autoscaling";
const title = "Scheduled and predictive Kubernetes autoscaling for existing clusters";
const description = "Plan scheduled and predictive Kubernetes scaling. Coordinate pods and nodes, measure startup time and test changes before the next traffic peak.";
const toc = [
  { id: "choose-a-method", label: "Choose the scaling method" },
  { id: "existing-cluster", label: "Check the existing cluster" },
  { id: "schedule-capacity", label: "Prepare for a known peak" },
  { id: "predictive-scaling", label: "Evaluate a forecast" },
  { id: "test-and-recover", label: "Test and recover safely" },
];

export default function ScheduledPredictiveAutoscaling() {
  return <>
    <SEO title="Scheduled & Predictive Kubernetes Scaling | Anrotex" description={description} path={path} type="article" structuredData={[
      articleSchema({ headline: title, description, path, datePublished: "2026-11-23", dateModified: "2026-11-23", reviewed: false }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Insights", path: "/blog" }, { name: "Scheduled and predictive scaling", path }]),
    ]} />
    <InsightArticle eyebrow="Preparing for peak traffic" title={title} description="Bring capacity online before a predictable traffic increase. Start with the workload you already run, measure how long it takes to become ready and keep a way to handle unexpected demand."
      published="23 November 2026" updated="23 November 2026" readTime="7 minute read" reviewed={false} toc={toc}
      ctaTitle="Prepare your cluster for its next peak." ctaDescription="Review scaling delays, controller settings and capacity limits with a plan your team can test." ctaHref="/contact?focus=kubernetes" ctaLabel="Discuss Kubernetes scaling">

      <p>For an existing Kubernetes project, use scheduled scaling when you know when demand will rise. Consider predictive scaling when past traffic patterns can support a useful forecast. Keep live demand signals available for traffic that does not follow the plan.</p>
      <p>Both approaches need to cover two layers: application replicas and the nodes that run them. More replicas will not serve requests while they are waiting for a node, downloading an image or failing a readiness check.</p>

      <h2 id="choose-a-method">Choose the method that matches the traffic</h2>
      <div className="overflow-x-auto" role="region" aria-label="Scaling method comparison" tabIndex={0}>
        <table>
          <thead><tr><th scope="col">Method</th><th scope="col">Useful when</th><th scope="col">Main trade-off</th></tr></thead>
          <tbody>
            <tr><th scope="row">Reactive</th><td>Demand changes unexpectedly. Scale from current CPU, queue depth or another useful signal.</td><td>New capacity takes time to become ready after demand arrives.</td></tr>
            <tr><th scope="row">Scheduled</th><td>A known event or business-hours peak has a planned start time.</td><td>The schedule may provision capacity for a peak that does not happen.</td></tr>
            <tr><th scope="row">Predictive</th><td>Demand has a recurring pattern that a forecast can estimate.</td><td>A bad forecast can leave capacity short or create unnecessary cost.</td></tr>
          </tbody>
        </table>
      </div>
      <p>Kubernetes <a href="https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/">Horizontal Pod Autoscaler (HPA)</a> changes replica counts from observed metrics; it does not forecast future demand by itself. <a href="https://kubernetes.io/docs/concepts/cluster-administration/node-autoscaling/">Node autoscaling</a> handles capacity for pods that need somewhere to run. Treat their settings as parts of one capacity plan.</p>

      <h2 id="existing-cluster">Start with the controllers and limits you already have</h2>
      <ol>
        <li><strong>Choose one workload.</strong> Record its current replicas, resource requests, peak traffic and acceptable response time.</li>
        <li><strong>Map who changes each setting.</strong> Include HPA or KEDA, Cluster Autoscaler or Karpenter, deployment tools and scheduled jobs. Avoid two independent controllers writing the same replica or node count.</li>
        <li><strong>Measure readiness time.</strong> Observe demand detection, node launch, image download, application startup and readiness checks. Use repeated measurements, including slower starts.</li>
        <li><strong>Check the ceiling.</strong> Confirm replica limits, node limits, subnet capacity and the database or queue capacity the workload needs.</li>
        <li><strong>Record the recovery configuration.</strong> Save the working settings and agree who can stop the rollout.</li>
      </ol>
      <p>Use the <TrackedLink to="/blog/cluster-autoscaling-limits-quotas" eventName="Article Click" eventSource="scheduled-scaling-quota-check">cluster limits and quotas checklist</TrackedLink> before increasing the planned maximum. An earlier start does not overcome an exhausted quota or a full subnet.</p>

      <h2 id="schedule-capacity">Prepare both pods and nodes for a known peak</h2>
      <p>KEDA’s <a href="https://keda.sh/docs/2.21/scalers/cron/">Cron scaler</a> defines a time window, timezone and desired replica count. During that window, the scheduled value can act as a floor alongside other scaling triggers. It is a pod-scaling setting, not a node reservation.</p>
      <p>If you use KEDA, bring the schedule and live demand triggers into the same agreed configuration. Review <a href="https://keda.sh/docs/2.21/concepts/scaling-deployments/#transferring-ownership-of-an-existing-hpa">ownership of the existing HPA</a> before moving it; do not leave a separate HPA competing for the same workload. Set minimum and maximum replicas for the application and verify the behaviour outside the scheduled window.</p>

      <h3>Example: a weekday peak at 09:00</h3>
      <p>Suppose a test environment takes up to eight minutes to add nodes and make the application ready. A starting schedule could prepare extra replicas at 08:45, leaving seven minutes for variation. These times are planning inputs to test against your own startup measurements.</p>
      <ol className="!list-none !pl-0 !space-y-0 grid gap-4 sm:grid-cols-2" aria-label="Example scaling timeline">
        {[
          ["08:45", "Raise the planned replica floor. Pods that cannot fit give the node autoscaler work to place."],
          ["Before 09:00", "Confirm enough pods are ready and serving healthy responses. Check new nodes and dependencies too."],
          ["During the peak", "Let live demand request more replicas within the tested limits. Watch errors, latency and pending pods."],
          ["After the peak", "Let demand fall before removing spare capacity. Check ongoing requests and jobs before scaling down."],
        ].map(([time, text]) => <li key={time} className="rounded-2xl border border-brand-navy/15 bg-brand-stone/40 p-5"><strong className="text-lg">{time}</strong><p className="!mb-0 !mt-2">{text}</p></li>)}
      </ol>
      <p>Choose the timezone your traffic follows and test daylight-saving changes, weekends and holidays. Set an alert for insufficient ready capacity before the event, so the team has time to respond.</p>
      <p>If you reserve extra node capacity separately, give that change a single owner and a tested removal process. AWS warns against directly changing <a href="https://docs.aws.amazon.com/eks/latest/APIReference/API_NodegroupScalingConfig.html">a managed node group’s desired size while Cluster Autoscaler controls it</a>. A second schedule that repeatedly resets that value can conflict with the autoscaler.</p>

      <h2 id="predictive-scaling">Evaluate a forecast before letting it change capacity</h2>
      <p>Compare forecasts with actual demand across busy periods, quiet periods and known exceptions. Record how often the forecast falls short, how much unused capacity it would create and how early it needs to act. Compare it with a simple schedule; a more complicated system should earn its place.</p>
      <p>AWS <a href="https://docs.aws.amazon.com/autoscaling/ec2/userguide/predictive-scaling-policy-overview.html">EC2 predictive scaling</a> supports a forecast-only mode. It targets Auto Scaling groups, so it is not a drop-in Kubernetes pod autoscaler. Do not attach an additional node-count controller to a group already managed by Cluster Autoscaler without designing how ownership will work.</p>
      <p>For a Kubernetes forecasting integration, check the supported versions, metric source and behaviour when a prediction is late or missing. Keep a tested baseline, a capacity ceiling and live demand scaling. Decide in advance when poor forecasts should disable prediction and return the workload to its previous settings.</p>

      <h2 id="test-and-recover">Test early peaks, missing signals and scale-down</h2>
      <p>Run a controlled trial in a test environment before changing production. Agree traffic levels, spending limits and pass criteria with the workload owner.</p>
      <ul>
        <li><strong>Traffic arrives early:</strong> check whether the current baseline and live scaling protect response time.</li>
        <li><strong>The peak is larger or longer:</strong> check whether extra replicas and nodes fit within the tested limits.</li>
        <li><strong>The metric or schedule fails:</strong> confirm the remaining capacity and alert behaviour.</li>
        <li><strong>A node cannot launch:</strong> check that the team can identify the failure without waiting for user reports.</li>
        <li><strong>Traffic falls:</strong> check that removing capacity does not interrupt active requests or long-running jobs.</li>
      </ul>
      <p>A <a href="https://kubernetes.io/docs/concepts/workloads/pods/disruptions/">PodDisruptionBudget</a> limits certain voluntary disruptions, but it does not protect against every failure or control a workload’s replica scale-down. Review application shutdown, workload scaling and node disruption separately.</p>
      <p>If the trial misses the agreed response-time or error limits, stop the new schedule or forecast and restore the previous scaling configuration. Confirm healthy capacity before removing extra nodes. Record the result so the next change starts from evidence.</p>
      <p>For the underlying resource and HPA settings, read the <TrackedLink to="/blog/kubernetes-scaling-best-practices" eventName="Article Click" eventSource="scheduled-scaling-foundations">Kubernetes scaling guide</TrackedLink>. For help applying this to an existing cluster, <TrackedLink to="/kubernetes-scaling" eventName="Service Click" eventSource="scheduled-scaling-service">see our Kubernetes review</TrackedLink> or <TrackedLink to="/contact?focus=kubernetes" eventSource="scheduled-scaling-enquiry">tell us about your next traffic peak</TrackedLink>.</p>
    </InsightArticle>
  </>;
}
