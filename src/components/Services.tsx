import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Blocks,
  Boxes,
  CloudCog,
  GitBranch,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: CloudCog,
    title: "Cloud cost optimization",
    description:
      "Find waste, right-size workloads, and put practical controls around AWS spend without trading away performance.",
    link: "/aws-cost-optimization",
    linkText: "Explore cost optimization",
  },
  {
    icon: GitBranch,
    title: "CI/CD & platform engineering",
    description:
      "Turn slow, fragile releases into automated delivery pipelines your team can trust.",
    link: "/ci-cd-automation",
    linkText: "Explore CI/CD automation",
  },
  {
    icon: Boxes,
    title: "Kubernetes reliability",
    description:
      "Build production-grade clusters with resilient scaling, safer releases, and clear operational ownership.",
    link: "/kubernetes-scaling",
    linkText: "Explore Kubernetes scaling",
  },
  {
    icon: Activity,
    title: "Observability & incident readiness",
    description:
      "Make failures visible sooner with useful telemetry, actionable alerts, and response playbooks.",
    link: "/devops-consulting",
    linkText: "Explore DevOps consulting",
  },
  {
    icon: Blocks,
    title: "Infrastructure as Code",
    description:
      "Create reusable Terraform and Pulumi foundations that are reviewable, repeatable, and easier to evolve.",
    link: "/devops-consulting",
    linkText: "See how we work",
  },
  {
    icon: ShieldCheck,
    title: "Secure cloud architecture",
    description:
      "Strengthen access, secrets, network boundaries, and auditability across your delivery lifecycle.",
    link: "/devops-consulting",
    linkText: "Discuss your architecture",
  },
];

const Services = () => (
  <section id="services" className="scroll-mt-24 bg-brand-off-white px-6 py-24 md:py-32">
    <div className="container">
      <motion.div
        className="mb-14 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
            What we solve
          </span>
          <h2 className="mt-4 max-w-xl text-4xl font-bold leading-tight tracking-[-0.04em] text-brand-navy md:text-6xl">
            Infrastructure that enables growth.
          </h2>
        </div>
        <div className="md:pb-2">
          <p className="max-w-2xl text-lg leading-relaxed text-brand-teal">
            From one painful bottleneck to a complete platform rebuild, we focus
            on the highest-leverage work first and leave your team stronger.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-navy underline decoration-brand-yellow decoration-4 underline-offset-4"
          >
            Tell us what is slowing you down
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            className="group flex min-h-[19rem] flex-col rounded-[1.75rem] border border-brand-navy/10 bg-brand-stone/55 p-7 transition duration-300 hover:-translate-y-1 hover:bg-brand-stone hover:shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.055 }}
          >
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-brand-off-white transition group-hover:rotate-3 group-hover:bg-brand-teal">
              <service.icon className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-[-0.025em] text-brand-navy">
              {service.title}
            </h3>
            <p className="mt-4 flex-1 leading-relaxed text-brand-teal">
              {service.description}
            </p>
            <Link
              to={service.link}
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-navy transition-all group-hover:gap-3"
            >
              {service.linkText}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
