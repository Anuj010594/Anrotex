import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const cases = [
  {
    tag: "FinTech",
    title: "Cut cloud costs by 42% for a Series B payments platform",
    metrics: ["42% cost reduction", "99.99% uptime", "3x faster deploys"],
    details: (
      <>
        <p className="mb-4">
         Re-architected a Series B payments platform on AWS using containerized microservices (Docker + Kubernetes/EKS) and implemented autoscaling with spot/on-demand mix to optimize compute costs. Introduced infrastructure as code (Terraform) and optimized storage, networking, and database usage (RDS tuning, read replicas, caching with Redis), resulting in a 42% cost reduction. Built a robust CI/CD pipeline (GitHub Actions/Jenkins) enabling blue-green deployments and rollback strategies, achieving 3x faster releases with 99.99% uptime and improved fault tolerance.

	</p>
      </>
    ),
  },
  {
    tag: "SaaS",
    title: "Zero-downtime Kubernetes migration for 2M+ daily users",
    metrics: ["0 downtime", "2M+ users", "< 200ms p99 latency", "High Availability"],
    details: (
      <>
        <p className="mb-4">
         Executed a zero-downtime migration from a monolithic architecture to Kubernetes (EKS), serving 2M+ daily users. Designed rolling deployments, canary releases, and traffic splitting via service mesh (Istio/Linkerd) and ALB ingress. Implemented horizontal pod autoscaling, optimized container resource requests/limits, and introduced observability using Prometheus, Grafana, and ELK stack. Achieved consistent {"< 200ms"} p99 latency through performance tuning, caching layers, and efficient API gateway routing, ensuring seamless scalability and high availability.
	</p>
      </>
    ),
  },
  {
    tag: "Healthcare",
    title: "HIPAA-compliant infrastructure on AWS with full audit trail",
    metrics: ["HIPAA compliant", "SOC 2 ready", "Automated auditing"],
    details: (
      <>
        <p className="mb-4">
         Designed and deployed a HIPAA-compliant AWS infrastructure with strict security and compliance controls, including VPC isolation, private subnets, encryption at rest (KMS) and in transit (TLS), and IAM least-privilege policies. Enabled centralized logging and monitoring using CloudTrail, CloudWatch, and AWS Config to maintain a complete audit trail. Automated compliance checks and reporting pipelines aligned with SOC 2 readiness using tools like AWS Security Hub and GuardDuty. Integrated secure CI/CD workflows with secrets management (AWS Secrets Manager) to ensure continuous compliance and data protection.

	</p>
      </>
    ),
  },
];

const CaseStudies = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="cases" className="py-28 px-6 bg-secondary/30">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-3 block">
            Case Studies
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Proven results
          </h2>
        </motion.div>

        {/* 🔥 FIX: items-start prevents stretching */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              className="p-8 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* NORMAL */}
              {activeIndex !== i && (
                <>
                  <span className="text-xs font-medium text-primary tracking-wider uppercase mb-4 block">
                    {c.tag}
                  </span>

                  <h3 className="font-heading text-lg font-semibold mb-6 leading-snug">
                    {c.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {c.metrics.map((m) => (
                      <span
                        key={m}
                        className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <span
                    onClick={() => setActiveIndex(i)}
                    className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all cursor-pointer"
                  >
                    Read more <ArrowUpRight className="w-4 h-4" />
                  </span>
                </>
              )}

              {/* EXPANDED */}
              {activeIndex === i && (
                <>
                  <span className="text-xs font-medium text-primary tracking-wider uppercase mb-4 block">
                    {c.tag}
                  </span>

                  <h3 className="font-heading text-lg font-semibold mb-4">
                    {c.title}
                  </h3>

                  <div className="text-left mb-6">{c.details}</div>

                  <button
                    onClick={() => setActiveIndex(null)}
                    className="px-4 py-2 rounded-lg bg-muted text-sm"
                  >
                    Close
                  </button>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
