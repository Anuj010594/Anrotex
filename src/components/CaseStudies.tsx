import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    tag: "FinTech",
    title: "Cut cloud costs by 42% for a Series B payments platform",
    metrics: ["42% cost reduction", "99.99% uptime", "3x faster deploys"],
  },
  {
    tag: "SaaS",
    title: "Zero-downtime Kubernetes migration for 2M+ daily users",
    metrics: ["0 downtime", "2M+ users", "< 200ms p99 latency"],
  },
  {
    tag: "Healthcare",
    title: "HIPAA-compliant infrastructure on AWS with full audit trail",
    metrics: ["HIPAA compliant", "SOC 2 ready", "Automated auditing"],
  },
];

const CaseStudies = () => (
  <section id="cases" className="py-28 px-6 bg-secondary/30">
    <div className="container">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-3 block">Case Studies</span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold">Proven results</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {cases.map((c, i) => (
          <motion.div
            key={c.title}
            className="group p-8 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <span className="text-xs font-medium text-primary tracking-wider uppercase mb-4">{c.tag}</span>
            <h3 className="font-heading text-lg font-semibold mb-6 leading-snug flex-1">{c.title}</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {c.metrics.map((m) => (
                <span key={m} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                  {m}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all cursor-pointer">
              Read more <ArrowUpRight className="w-4 h-4" />
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CaseStudies;
