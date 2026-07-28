import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import TrackedLink from "@/components/TrackedLink";

const cases = [
  {
    tag: "FinTech · AWS & Kubernetes",
    title: "A Series B payments platform cut cloud costs without slowing growth.",
    metric: "42%",
    metricLabel: "lower cloud spend",
    supporting: ["3× faster releases", "Terraform-managed"],
    details:
      "We re-architected the platform around containerized services, improved autoscaling, tuned RDS and caching, and introduced Terraform plus safer blue-green delivery.",
    href: "/case-studies/fintech-aws-cost-reduction",
  },
  {
    tag: "SaaS · Platform migration",
    title: "A zero-downtime Kubernetes migration serving 2M+ daily users.",
    metric: "0",
    metricLabel: "migration downtime",
    supporting: ["2M+ daily users", "<200ms p99 latency"],
    details:
      "Rolling deployments, canary releases, workload right-sizing, and end-to-end observability created a safer path from monolith to Kubernetes.",
    href: "",
  },
  {
    tag: "Healthcare · Security",
    title: "A healthcare platform became audit-ready on AWS.",
    metric: "100%",
    metricLabel: "centralized audit trail",
    supporting: ["HIPAA aligned", "SOC 2 ready"],
    details:
      "We strengthened network isolation, encryption, least-privilege access, centralized logging, and automated compliance checks across the delivery workflow.",
    href: "",
  },
];

const CaseStudies = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="cases" className="scroll-mt-24 bg-brand-stone px-6 py-24 md:py-32">
      <div className="container">
        <motion.div
          className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-navy">
              Client outcomes
            </span>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-[-0.04em] text-brand-navy md:text-6xl">
              Results you can explain to the board.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-brand-navy/75">
            Practical infrastructure work, tied to cost, speed, reliability,
            and risk.
          </p>
        </motion.div>

        <div className="grid items-start gap-5 lg:grid-cols-3">
          {cases.map((caseStudy, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.article
                key={caseStudy.title}
                className="overflow-hidden rounded-[1.75rem] border border-brand-navy/10 bg-brand-off-white"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="border-b border-brand-navy/10 p-7">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-brand-teal">
                    {caseStudy.tag}
                  </span>
                  <div className="mt-8 flex items-end gap-3">
                    <span className="text-6xl font-bold tracking-[-0.06em] text-brand-navy">
                      {caseStudy.metric}
                    </span>
                    <span className="max-w-24 pb-1 text-sm font-semibold leading-tight text-brand-teal">
                      {caseStudy.metricLabel}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-bold leading-snug text-brand-navy">
                    {caseStudy.title}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {caseStudy.supporting.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-brand-mint px-3 py-1.5 text-xs font-bold text-brand-navy"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p
                        className="mt-5 border-t border-brand-navy/10 pt-5 text-sm leading-relaxed text-brand-teal"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {caseStudy.details}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-navy"
                    aria-expanded={isOpen}
                  >
                    {isOpen ? "Show less" : "How we did it"}
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </button>
                  {caseStudy.href && (
                    <TrackedLink
                      to={caseStudy.href}
                      eventName="Case Study Click"
                      eventSource="case-studies-grid"
                      className="ml-5 mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-teal"
                    >
                      Read the full case study
                      <ArrowUpRight className="h-4 w-4" />
                    </TrackedLink>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-bold text-brand-navy"
          >
            Discuss a similar outcome
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
