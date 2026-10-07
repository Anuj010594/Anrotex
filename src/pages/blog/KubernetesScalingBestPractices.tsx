import { ArrowRight, CheckCircle2 } from "lucide-react";
import InsightArticle from "@/components/InsightArticle";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";

const toc = [
  { id: "requests", label: "Set trustworthy resource requests" },
  { id: "hpa", label: "HPA calculation and YAML example" },
  { id: "nodes", label: "Coordinate pod and node scaling" },
  { id: "availability", label: "Protect availability while scaling" },
  { id: "observability", label: "Measure and troubleshoot scaling" },
  { id: "testing", label: "Validate with production-like load" },
  { id: "checklist", label: "Production scaling checklist" },
];

const signals = [
  "Pending pods and unschedulable reasons",
  "CPU throttling, memory pressure, and OOM kills",
  "Replica count and HPA desired-replica changes",
  "Node utilisation and node-provisioning latency",
  "p95/p99 latency, error rate, and queue depth",
  "Cost per workload, request, or customer",
];

export default function KubernetesScalingBestPractices() {
  return (
    <>
      <SEO
        title="Kubernetes Scaling & Autoscaling Best Practices | Anrotex"
        description="Kubernetes scaling best practices with a worked HPA calculation, autoscaling YAML, troubleshooting commands and a production validation checklist."
        path="/blog/kubernetes-scaling-best-practices"
        type="article"
        structuredData={[
          articleSchema({
            headline: "Kubernetes Scaling Best Practices for Production Workloads",
            description:
              "A practical guide to Kubernetes scaling, autoscaling, resource requests, node capacity, availability, and production validation.",
            path: "/blog/kubernetes-scaling-best-practices",
            datePublished: "2026-06-17",
            dateModified: "2026-10-07",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/blog" },
            {
              name: "Kubernetes Scaling Best Practices",
              path: "/blog/kubernetes-scaling-best-practices",
            },
          ]),
        ]}
      />

      <InsightArticle
        eyebrow="Kubernetes scaling"
        title="Kubernetes scaling best practices for production workloads"
        description="Reliable Kubernetes autoscaling depends on accurate resource requests, meaningful demand signals, coordinated node capacity, and safeguards that keep traffic healthy during change."
        published="17 June 2026"
        updated="7 October 2026"
        readTime="13 minute read"
        toc={toc}
        ctaTitle="Make your cluster scale predictably."
        ctaDescription="Get a production-focused review of workload requests, autoscaling policies, node capacity, reliability controls, and Kubernetes cost drivers."
        ctaHref="/kubernetes-scaling"
        ctaLabel="Explore the cluster review"
      >
        <div className="rounded-[1.75rem] border border-brand-navy/10 bg-brand-stone/55 p-6 md:p-8">
          <p className="m-0 text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">
            The operating principle
          </p>
          <p className="mt-3 text-xl font-semibold leading-relaxed text-brand-navy">
            Kubernetes scaling is a control system. Workload requests describe
            capacity, metrics describe demand, autoscalers change replicas and
            nodes, and availability controls determine whether that change is safe.
          </p>
        </div>

        <p>
          Scaling in Kubernetes is often treated as an HPA configuration task.
          In production, the result depends on a much larger chain: container
          resource requests, metrics freshness, application startup time, node
          provisioning, scheduling constraints, traffic readiness, and downstream
          dependencies.
        </p>

        <p>
          The objective is not simply to add replicas. It is to meet a service
          objective during normal traffic, bursts, deployments, and infrastructure
          disruption—without leaving permanently idle capacity behind.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {signals.map((item) => (
            <p
              key={item}
              className="!m-0 flex items-start gap-3 rounded-2xl border border-brand-navy/10 bg-brand-off-white p-4 text-sm font-semibold leading-relaxed text-brand-navy"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
              {item}
            </p>
          ))}
        </div>

        <h2 id="requests">1. Set resource requests from measured demand</h2>

        <p>
          Requests tell the scheduler how much capacity to reserve; CPU requests
          also provide the denominator for utilisation-based HPA. Oversized requests
          leave capacity unused. Undersized requests can pack too much real demand
          onto a node. A low request does not itself impose a CPU throttle.
        </p>
        <p>
          CPU limits constrain CPU time and can cause throttling. Memory limits can
          lead to an out-of-memory termination when usage exceeds the boundary.
          Node-pressure eviction is a separate mechanism. See the official{" "}
          <a href="https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/" target="_blank" rel="noreferrer">Kubernetes resource requests and limits documentation</a>
          {" "}before changing either setting.
        </p>

        <p>
          Begin with workload-level evidence: CPU usage and throttling, memory
          working set, OOM kills, request latency, queue depth, and behaviour
          during deployments or batch work. Use percentiles and known peaks
          rather than one average value.
        </p>

        <h3>Separate requests from limits intentionally</h3>

        <ul>
          <li>
            Set CPU requests so scheduling and HPA calculations have a useful
            baseline.
          </li>
          <li>
            Set memory requests with enough headroom for normal variation and
            startup behaviour.
          </li>
          <li>
            Treat CPU limits carefully when throttling would damage latency.
          </li>
          <li>
            Treat memory limits as a hard failure boundary because exceeding them
            can terminate the container.
          </li>
          <li>
            Review sidecars separately; their usage can distort pod-level
            utilisation.
          </li>
        </ul>

        <p>
          Resource recommendations are a starting point. Validate changes against
          application service-level objectives before rolling them across every
          workload.
        </p>

        <h2 id="hpa">2. Configure Horizontal Pod Autoscaler around demand</h2>

        <p>
          The{" "}
          <a
            href="https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/"
            rel="noreferrer"
            target="_blank"
          >
            Kubernetes Horizontal Pod Autoscaler
          </a>{" "}
          periodically adjusts replica count to match observed metrics. When
          scaling on CPU utilisation, the calculation depends on CPU requests.
          If the relevant requests are missing, HPA cannot calculate that
          utilisation correctly.
        </p>

        <h3>Choose a signal that represents load</h3>

        <p>
          CPU works well for CPU-bound services whose usage increases with
          traffic. It is less useful for queue workers, network-bound services,
          or applications where latency rises before CPU does. In those cases,
          consider custom or external metrics such as queue depth, concurrent
          work, requests per second, or a carefully selected business workload
          signal.
        </p>

        <ul>
          <li>Keep a minimum replica count that can serve normal traffic safely.</li>
          <li>Set a maximum that respects downstream and regional constraints.</li>
          <li>Use multiple metrics when a single signal can miss real saturation.</li>
          <li>
            Configure scale-up behaviour for bursts and scale-down stabilisation
            to avoid oscillation.
          </li>
          <li>
            Account for application warm-up before new replicas receive traffic
            or contribute misleading metrics.
          </li>
        </ul>

        <p>
          HPA is not capacity planning. If the cluster cannot provision or place
          the replicas HPA requests, the workload still fails to scale.
        </p>

        <h3 id="hpa-example">Worked example: three replicas become four</h3>
        <p>
          Consider a CPU-bound API with three ready pods, each containing one
          container requesting <code>500m</code> CPU. If each uses <code>400m</code>,
          observed utilisation is 80%. At a 60% target, the simplified calculation is:
        </p>
        <pre tabIndex={0} aria-label="HPA replica calculation" className="mt-6 overflow-x-auto rounded-2xl bg-brand-navy p-5 text-sm leading-6 text-brand-off-white"><code className="!bg-transparent !p-0 !text-inherit">{`observed utilisation = 400m / 500m × 100 = 80%
desired replicas = ceil(3 × 80 / 60) = 4`}</code></pre>
        <p>
          Four pods reserve 2 vCPU instead of 1.5 vCPU. That is requested capacity,
          not measured usage or a cloud bill. This example assumes fresh metrics,
          ready pods and evenly distributed load; readiness, missing metrics,
          tolerance and scaling policies can alter the controller's actual decision.
        </p>
        <h3>An autoscaling/v2 HPA manifest</h3>
        <p>
          This HPA configuration targets an existing <code>example-api</code>
          {" "}Deployment in a test namespace named <code>scaling-demo</code>. It does
          not create an application or install a metrics provider. Resource metrics
          must be available, commonly through Metrics Server, and the containers
          need CPU requests. Choose replica bounds from your own capacity tests.
        </p>
        <pre tabIndex={0} aria-label="Example HPA YAML" className="mt-6 overflow-x-auto rounded-2xl bg-brand-navy p-5 text-sm leading-6 text-brand-off-white"><code className="!bg-transparent !p-0 !text-inherit">{`apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: example-api
  namespace: scaling-demo
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: example-api
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 60
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Pods
          value: 1
          periodSeconds: 60`}</code></pre>
        <p>
          The 60% target is relative to requested CPU. The lower bound keeps three
          replicas; the upper bound caps this workload at ten. The five-minute
          scale-down window considers recent recommendations, while the policy
          permits at most one pod removal per minute. Adjust these values to your workload and capacity needs. See the{" "}
          <a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/" target="_blank" rel="noreferrer">official HPA walkthrough</a>
          {" "}for a complete sample application and metrics setup.
        </p>
        <p>
          Before adopting it, confirm that ten replicas fit your node, quota and
          downstream limits. Keep GitOps or manual replica updates from fighting
          the autoscaler. Before rollout, test the manifest with your application's startup,
          readiness and traffic patterns.
        </p>

        <h2 id="nodes">3. Coordinate workload scaling with node autoscaling</h2>

        <p>
          Pod and node autoscaling solve different problems. HPA changes workload
          replicas. Node autoscaling adds or removes compute capacity when pods
          cannot be scheduled or when nodes remain underutilised.
        </p>

        <p>
          Kubernetes{" "}
          <a
            href="https://kubernetes.io/docs/concepts/cluster-administration/node-autoscaling/"
            rel="noreferrer"
            target="_blank"
          >
            node autoscaling guidance
          </a>{" "}
          highlights that node provisioning decisions rely on pod resource
          requests. Inflated requests can force unnecessary nodes; unrealistic
          low requests can create unstable bin-packing and performance.
        </p>

        <div tabIndex={0} role="region" aria-label="Scaling layers comparison" className="mt-8 overflow-x-auto rounded-2xl border border-brand-navy/10">
          <table>
            <thead>
              <tr>
                <th>Layer</th>
                <th>Primary decision</th>
                <th>Common failure</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HPA</td>
                <td>How many workload replicas are needed?</td>
                <td>Wrong metric or missing requests</td>
              </tr>
              <tr>
                <td>Scheduler</td>
                <td>Where can each pod run?</td>
                <td>Constraints leave pods pending</td>
              </tr>
              <tr>
                <td>Node autoscaler</td>
                <td>What compute capacity should exist?</td>
                <td>Slow provisioning or unsuitable node pools</td>
              </tr>
              <tr>
                <td>Application</td>
                <td>When is a replica ready for traffic?</td>
                <td>Cold starts or dependency saturation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Design node pools around scheduling reality</h3>

        <ul>
          <li>
            Keep node families and sizes understandable; too many pools make
            placement and consolidation harder to reason about.
          </li>
          <li>
            Check topology constraints, affinities, taints, persistent volumes,
            GPUs, architecture, and zone availability.
          </li>
          <li>
            Measure time from an unschedulable pod to a ready application replica.
          </li>
          <li>
            Use disruption-tolerant workloads for Spot capacity and maintain
            fallback capacity where required.
          </li>
        </ul>

        <h2 id="availability">4. Protect availability during scaling and change</h2>

        <p>
          A replica should not receive production traffic merely because its
          process started. Kubernetes{" "}
          <a
            href="https://kubernetes.io/docs/concepts/workloads/pods/probes/"
            rel="noreferrer"
            target="_blank"
          >
            startup, readiness, and liveness probes
          </a>{" "}
          serve different purposes:
        </p>

        <ul>
          <li>
            <strong>Startup probes</strong> protect slow-starting applications
            from premature liveness failures.
          </li>
          <li>
            <strong>Readiness probes</strong> decide whether a pod should receive
            traffic.
          </li>
          <li>
            <strong>Liveness probes</strong> recover containers that are running
            but cannot make progress.
          </li>
        </ul>

        <p>
          Add graceful termination, appropriate rolling-update settings, and a{" "}
          <a
            href="https://kubernetes.io/docs/concepts/workloads/pods/disruptions/"
            rel="noreferrer"
            target="_blank"
          >
            PodDisruptionBudget
          </a>{" "}
          where voluntary disruption must preserve a minimum level of
          availability. Ensure that the budget does not make legitimate cluster
          maintenance impossible.
        </p>

        <h2 id="observability">5. Measure whether scaling actually works</h2>

        <p>
          A healthy autoscaler is one that keeps the application inside its
          service objective with acceptable cost—not one that changes replica
          counts frequently.
        </p>

        <ul>
          <li>Track current and desired replicas alongside the driving metric.</li>
          <li>Alert on pending pods, failed scheduling, and node-provisioning delay.</li>
          <li>Correlate scale events with latency, errors, throttling, and saturation.</li>
          <li>Watch readiness time and the delay before new capacity serves traffic.</li>
          <li>Measure node fragmentation and unused requested capacity.</li>
          <li>Review scale-down events for connection draining and workload churn.</li>
        </ul>

        <p>
          Keep the view workload-centric. Cluster-average CPU can look healthy
          while a single customer-facing deployment is throttled or waiting for
          nodes.
        </p>

        <h3>Read the evidence before changing replica limits</h3>
        <p>
          These commands inspect the example workload. Use the intended cluster
          context and replace the namespace and resource names with your own.
          For a pending pod, use its actual name in the last command. The official{" "}
          <a href="https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/" target="_blank" rel="noreferrer">pod debugging guide</a>
          {" "}explains how pod state and scheduler events narrow down a failure.
        </p>
        <pre tabIndex={0} aria-label="Read-only Kubernetes diagnostics" className="mt-6 overflow-x-auto rounded-2xl bg-brand-navy p-5 text-sm leading-6 text-brand-off-white"><code className="!bg-transparent !p-0 !text-inherit">{`kubectl config current-context
kubectl -n scaling-demo get hpa example-api
kubectl -n scaling-demo describe hpa example-api
kubectl -n scaling-demo top pods --containers
kubectl -n scaling-demo get pods -o wide
kubectl -n scaling-demo describe pod <pending-pod-name>`}</code></pre>
        <div tabIndex={0} role="region" aria-label="Autoscaling troubleshooting table" className="mt-8 overflow-x-auto rounded-2xl border border-brand-navy/10">
          <table><thead><tr><th>Symptom</th><th>Evidence to inspect</th><th>Next decision</th></tr></thead><tbody>
            <tr><td>HPA metric is unknown</td><td>HPA conditions and events, CPU requests, and whether top pods returns metrics</td><td>Resolve missing requests or metrics availability before tuning the target.</td></tr>
            <tr><td>Desired replicas rise, pods stay pending</td><td>Pod scheduling events, node capacity, affinity, taints and quota</td><td>Identify the placement constraint; increasing maxReplicas alone does not create suitable nodes.</td></tr>
            <tr><td>Replicas rise, latency does not improve</td><td>Ready pod count, startup time, per-pod traffic, database connections and queue depth</td><td>Check whether demand reaches new replicas or a shared dependency is saturated.</td></tr>
            <tr><td>Replica count repeatedly reverses</td><td>Metric history, HPA recommendations, rollout timing and competing replica updates</td><td>Determine whether the signal, stabilization or another controller causes the change.</td></tr>
          </tbody></table>
        </div>

        <h2 id="testing">6. Validate scaling with production-like load</h2>

        <p>
          Test the complete scaling loop before trusting it in production:
          demand rises, metrics update, HPA requests replicas, the scheduler
          places pods, nodes are provisioned if necessary, the application starts,
          probes pass, and traffic reaches healthy replicas.
        </p>

        <ol>
          <li><strong>Record the baseline.</strong> In an agreed test environment, capture the manifest revision, resource settings, node pool configuration and a representative traffic profile. Set acceptable p95 latency, error rate, readiness delay and dependency load before testing.</li>
          <li><strong>Run normal demand.</strong> Record current and desired replicas, CPU usage and requests, ready pods, latency and errors. Confirm the scaling metric is available and follows demand.</li>
          <li><strong>Apply a repeatable burst and sustained peak.</strong> Record the load rate, duration and timestamps for metric change, HPA recommendation and new ready capacity. Repeat with spare nodes and with node provisioning required.</li>
          <li><strong>Observe dependencies and recovery.</strong> Track database connections, queue depth and API limits. Stop the test at the agreed service thresholds; use the documented recovery procedure if a change causes regression.</li>
          <li><strong>Return to normal load.</strong> Watch scale-down through the configured stabilization period and until replicas settle. Check connection draining, active jobs and service health. Test rollout or drain scenarios separately under an approved disruption plan.</li>
          <li><strong>Compare and document.</strong> Repeat the same load profile after one scoped change. Compare service health, time to ready capacity, pod/node time and estimated cost over equal periods. Save results, remaining risks and the rollout decision.</li>
        </ol>

        <p>
          Production scaling is successful only when the whole path meets the
          required response time. A fast HPA decision cannot compensate for
          ten-minute node provisioning or a five-minute application warm-up.
        </p>

        <h2 id="checklist">7. Production Kubernetes scaling checklist</h2>

        <div tabIndex={0} role="region" aria-label="Production scaling checklist" className="mt-8 overflow-x-auto rounded-2xl border border-brand-navy/10">
          <table>
            <thead>
              <tr>
                <th>Area</th>
                <th>Verification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Resources</td>
                <td>Requests reflect measured usage and known peaks</td>
              </tr>
              <tr>
                <td>Metrics</td>
                <td>Fresh, available, and causally related to demand</td>
              </tr>
              <tr>
                <td>HPA</td>
                <td>Safe minimum, bounded maximum, stable scale-down behaviour</td>
              </tr>
              <tr>
                <td>Nodes</td>
                <td>Compatible capacity can arrive inside the required time</td>
              </tr>
              <tr>
                <td>Availability</td>
                <td>Probes, rollout settings, termination, and disruption controls</td>
              </tr>
              <tr>
                <td>Dependencies</td>
                <td>Database, queue, API, and regional limits can support the peak</td>
              </tr>
              <tr>
                <td>Evidence</td>
                <td>Load tests validate latency, errors, recovery time, and cost</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Common Kubernetes scaling mistakes</h2>

        <ul>
          <li>Enabling HPA before fixing missing or unrealistic requests.</li>
          <li>Scaling only on CPU when another signal represents demand better.</li>
          <li>Ignoring application startup and readiness time.</li>
          <li>Adding replicas faster than a database or API can support them.</li>
          <li>Leaving topology and scheduling constraints out of capacity tests.</li>
          <li>Optimizing node utilisation without protecting workload reliability.</li>
        </ul>

        <div className="mt-14 rounded-[2rem] bg-brand-mint p-7 md:p-10">
          <p className="!m-0 text-xs font-bold uppercase tracking-[0.18em] text-brand-navy">
            From autoscaling symptoms to a safe plan
          </p>
          <h2 className="!pt-4">Review your cluster as one scaling system.</h2>
          <p>
            Anrotex connects resource requests, workload autoscaling, node
            capacity, availability controls, observability, and cloud spend into
            one prioritised improvement plan.
          </p>
          <TrackedLink
            to="/kubernetes-scaling"
            eventSource="kubernetes-guide-bottom"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 text-sm font-bold text-brand-off-white"
          >
            See the Kubernetes review
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </InsightArticle>
    </>
  );
}
