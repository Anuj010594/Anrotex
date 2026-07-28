import { ArrowRight, CheckCircle2 } from "lucide-react";
import InsightArticle from "@/components/InsightArticle";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";

const toc = [
  { id: "requests", label: "Set trustworthy resource requests" },
  { id: "hpa", label: "Configure HPA around demand" },
  { id: "nodes", label: "Coordinate pod and node scaling" },
  { id: "availability", label: "Protect availability while scaling" },
  { id: "observability", label: "Measure scaling behaviour" },
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
        description="Production Kubernetes scaling best practices for resource requests, HPA, node autoscaling, probes, disruption budgets, observability, and cost control."
        path="/blog/kubernetes-scaling-best-practices"
        type="article"
        structuredData={[
          articleSchema({
            headline: "Kubernetes Scaling Best Practices for Production Workloads",
            description:
              "A practical guide to Kubernetes scaling, autoscaling, resource requests, node capacity, availability, and production validation.",
            path: "/blog/kubernetes-scaling-best-practices",
            datePublished: "2026-06-17",
            dateModified: "2026-07-28",
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
        updated="28 July 2026"
        readTime="10 minute read"
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
          CPU and memory requests influence scheduling, node capacity, and
          utilisation-based autoscaling. Requests that are too high waste node
          capacity. Requests that are too low increase throttling, evictions, and
          the chance that the scheduler packs workloads onto nodes that cannot
          support real demand.
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

        <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-navy/10">
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

        <h2 id="testing">6. Validate scaling with production-like load</h2>

        <p>
          Test the complete scaling loop before trusting it in production:
          demand rises, metrics update, HPA requests replicas, the scheduler
          places pods, nodes are provisioned if necessary, the application starts,
          probes pass, and traffic reaches healthy replicas.
        </p>

        <ol>
          <li>Reproduce normal traffic, a rapid burst, and a sustained peak.</li>
          <li>Test when the cluster has spare capacity and when new nodes are needed.</li>
          <li>Observe downstream dependencies such as databases and external APIs.</li>
          <li>Verify behaviour during deployment, node drain, and zone disruption.</li>
          <li>Confirm that scale-down does not terminate active work or connections.</li>
          <li>Record recovery time, service-level impact, and cost after the test.</li>
        </ol>

        <p>
          Production scaling is successful only when the whole path meets the
          required response time. A fast HPA decision cannot compensate for
          ten-minute node provisioning or a five-minute application warm-up.
        </p>

        <h2 id="checklist">7. Production Kubernetes scaling checklist</h2>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-navy/10">
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
