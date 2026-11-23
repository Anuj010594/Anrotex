import InsightArticle from "@/components/InsightArticle";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";

const path = "/blog/cluster-autoscaling-limits-quotas";
const title = "Cluster autoscaling limits and quotas: what to check before traffic grows";
const description = "Check EKS and EC2 quotas, subnet IPs, node limits and pod capacity before traffic grows. Includes a practical checklist for a cluster review.";
const toc = [
  { id: "limits-to-review", label: "The limits to review" },
  { id: "capacity-example", label: "Check the capacity calculation" },
  { id: "find-the-blocker", label: "Find what blocked scaling" },
  { id: "buyer-checklist", label: "What to ask your provider" },
  { id: "test-before-peak", label: "Test before the next peak" },
];
const checks = [
  ["EC2 capacity quotas", "Check the applied regional vCPU quota for each relevant instance family and purchase option, including usage outside this cluster.", "A node launch is rejected even though the node group allows more nodes."],
  ["EKS and node-group limits", "Check managed node-group quotas, group minimum and maximum sizes, or the limits on the Karpenter NodePool you use.", "The autoscaler reaches a configured ceiling."],
  ["Subnet IP addresses", "Check available addresses in each subnet used by nodes and pods, plus your network plugin’s allocation settings.", "Instances cannot launch or pods cannot get an address."],
  ["Pod capacity on each node", "Check allocatable CPU and memory, pod count, network interfaces and the space used by system components.", "Aggregate capacity looks sufficient, but a pod still cannot fit."],
  ["Namespace and workload limits", "Check ResourceQuota, HPA maximum replicas and resource requests for the affected namespace and workload.", "New replicas are blocked before extra nodes would help."],
  ["Storage and dependencies", "Check volume attachment limits, storage availability by zone, database connections and downstream request limits.", "More pods start but remain unready, or overload a dependency."],
];

export default function ClusterAutoscalingLimits() {
  return <>
    <SEO title="Cluster Autoscaling Limits & Quotas | Anrotex" description={description} path={path} type="article" structuredData={[
      articleSchema({ headline: title, description, path, datePublished: "2026-11-23", dateModified: "2026-11-23", reviewed: false }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Insights", path: "/blog" }, { name: "Cluster autoscaling limits", path }]),
    ]} />
    <InsightArticle eyebrow="Kubernetes capacity" title={title} description="A cluster can ask for more capacity and still fail to get it. Check the cloud account, network, nodes and workloads together before relying on autoscaling."
      published="23 November 2026" updated="23 November 2026" readTime="7 minute read" reviewed={false} toc={toc}
      ctaTitle="Find your cluster’s next limit." ctaDescription="Review the capacity, quotas and workload settings behind pending pods or slow scaling." ctaHref="/contact?focus=kubernetes" ctaLabel="Discuss a cluster review">

      <h2 id="limits-to-review">What service limits and quotas should buyers review for cluster autoscaling?</h2>
      <p>Start with cloud compute quotas, node-group bounds, available subnet addresses, per-node pod capacity and namespace quotas. Then check storage and downstream services. For Amazon EKS, a higher EC2 quota alone does not solve all of these constraints.</p>
      <p>Pods run your application; nodes are the servers they run on. A namespace groups workloads inside the cluster. Each layer has limits that can stop extra capacity becoming available.</p>
      <div className="overflow-x-auto" role="region" aria-label="Cluster autoscaling limits checklist" tabIndex={0}>
        <table>
          <thead><tr><th scope="col">Limit</th><th scope="col">What to check</th><th scope="col">What you may see</th></tr></thead>
          <tbody>{checks.map(([limit, check, symptom]) => <tr key={limit}><th scope="row">{limit}</th><td>{check}</td><td>{symptom}</td></tr>)}</tbody>
        </table>
      </div>
      <p>Use the values applied to your account and region. AWS distinguishes applied values from default quotas in its <a href="https://docs.aws.amazon.com/eks/latest/userguide/service-quotas.html">EKS quota guidance</a>. Record the current value, present usage, expected peak and who will request any increase.</p>
      <p><a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-resource-limits.html">EC2 quotas</a> apply beyond a single Kubernetes cluster. Include other instances using the same quota when calculating headroom. Request increases before the planned event; an approved quota is still not a reservation of available instances in a particular zone.</p>

      <h2 id="capacity-example">Check the calculation at the smallest usable unit</h2>
      <p>Suppose an application needs 24 pods at peak. Each requests 0.5 CPU and 1 GiB of memory. A node has 3 CPUs and 6 GiB left for this application after operating-system and cluster overhead.</p>
      <ul>
        <li>CPU permits 3 ÷ 0.5 = 6 application pods per node.</li>
        <li>Memory permits 6 ÷ 1 = 6 application pods per node.</li>
        <li>The basic capacity is 24 ÷ 6 = 4 nodes, before spare capacity and placement rules.</li>
        <li>If a rolling release temporarily needs 6 extra pods, that peak is 30 pods and needs at least 5 nodes on the same assumptions.</li>
      </ul>
      <p>Now check whether those pods can actually be placed. Zone spread, anti-affinity rules, per-node pod limits and storage can raise the requirement. Losing a zone may need more spare capacity than losing one node. Other workloads also share the cluster.</p>
      <p>Calculate EC2 quota use from each instance’s full vCPU count, not the CPU left for application pods. Keep the failure scenario and release surge in the capacity plan rather than treating the four-node baseline as a safe operating target.</p>

      <h2 id="find-the-blocker">Find where scaling stopped</h2>
      <ol>
        <li><strong>No extra replicas requested:</strong> check the demand metric, its freshness and the workload’s replica ceiling.</li>
        <li><strong>Replica creation rejected:</strong> check namespace events and quotas. Adding nodes cannot fix a namespace quota rejection.</li>
        <li><strong>Pods exist but remain pending:</strong> read scheduling events for resource shortages, placement rules or volumes.</li>
        <li><strong>The autoscaler cannot add nodes:</strong> check its events alongside cloud launch failures, group limits and permissions.</li>
        <li><strong>Nodes are ready but pods cannot start:</strong> check network address allocation, image pulls and storage attachment.</li>
      </ol>
      <p>Kubernetes <a href="https://kubernetes.io/docs/concepts/policy/resource-quotas/">ResourceQuota</a> constrains a namespace independently of the available nodes. For EKS networking, AWS explains how <a href="https://docs.aws.amazon.com/eks/latest/best-practices/ip-opt.html">pod address allocation and subnet sizing</a> affect growth. Check each subnet; a total across all zones can hide a shortage in the one your workload needs.</p>
      <p>For managed node groups, Cluster Autoscaler stays within <a href="https://docs.aws.amazon.com/eks/latest/APIReference/API_NodegroupScalingConfig.html">the configured minimum and maximum</a>. For Karpenter, inspect <a href="https://karpenter.sh/docs/concepts/nodepools/">NodePool limits and placement requirements</a>. Its limit checks can briefly lag during rapid provisioning, so a resource limit is not an exact spending cap.</p>

      <h2 id="buyer-checklist">What to ask your cloud provider or delivery partner</h2>
      <p>Ask for a short capacity record for each production workload. It should contain:</p>
      <ul>
        <li>The account, region, cluster and node pools covered.</li>
        <li>Applied quotas, actual usage and enough room for releases and the agreed failure scenario.</li>
        <li>Free subnet addresses by zone and any restrictions on instance types.</li>
        <li>Expected peak pods and nodes, with the assumptions behind the calculation.</li>
        <li>Alerts, a named responder and the action to take when a limit is approached.</li>
        <li>A test record showing when capacity became ready and whether users saw errors or slower responses.</li>
      </ul>
      <p>Ask which limits can be raised and which require a design change. A quota request, a larger subnet and a change to application resource requests solve different problems.</p>

      <h2 id="test-before-peak">Test the growth path before the next peak</h2>
      <p>In a test environment, increase load gradually and record the time from extra demand to healthy application capacity. Include a release during load and an agreed node-failure scenario. Set a spending limit for the exercise and stop if response time, errors or dependency load cross the agreed threshold.</p>
      <p>Use the <TrackedLink to="/blog/kubernetes-scaling-best-practices" eventName="Article Click" eventSource="autoscaling-limits-foundations">Kubernetes scaling guide</TrackedLink> for resource requests and HPA settings. For predictable busy periods, follow the <TrackedLink to="/blog/scheduled-predictive-kubernetes-autoscaling" eventName="Article Click" eventSource="autoscaling-limits-schedule">scheduled and predictive scaling guide</TrackedLink>.</p>
      <p><TrackedLink to="/kubernetes-scaling" eventName="Service Click" eventSource="autoscaling-limits-service">See what a Kubernetes review covers</TrackedLink>, or <TrackedLink to="/contact?focus=kubernetes" eventSource="autoscaling-limits-enquiry">tell us where your cluster stops scaling</TrackedLink>. Share the symptom, cloud provider and approximate workload count to start.</p>
    </InsightArticle>
  </>;
}
