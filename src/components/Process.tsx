import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Diagnose",
    description:
      "We map the bottlenecks, risk, and cost drivers across your current platform.",
  },
  {
    number: "02",
    title: "Prioritize",
    description:
      "You get a focused plan ranked by business impact, effort, and urgency.",
  },
  {
    number: "03",
    title: "Implement",
    description:
      "We work directly with your team to ship measurable improvements in small, safe releases.",
  },
  {
    number: "04",
    title: "Enable",
    description:
      "Clear documentation, knowledge transfer, and ownership keep the gains compounding.",
  },
];

const Process = () => (
  <section className="overflow-hidden bg-brand-navy px-6 py-24 text-brand-off-white md:py-32">
    <div className="container">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-mint">
            A low-friction engagement
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">
            Senior engineering, without the consulting theatre.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-stone">
            You work with the people doing the work. Progress stays visible,
            decisions stay practical, and every engagement is designed to make
            your internal team more capable.
          </p>

          <div className="mt-8 space-y-3 text-sm font-semibold text-brand-mint">
            {[
              "Clear scope before implementation",
              "Weekly progress and decision visibility",
              "Documentation your team can actually use",
            ].map((item) => (
              <p key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand-yellow" />
                {item}
              </p>
            ))}
          </div>

          <Link
            to="/contact"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-4 font-bold text-brand-navy transition hover:-translate-y-0.5"
          >
            Start with a free assessment
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              className="rounded-[1.75rem] border border-brand-mint/20 bg-brand-off-white/[0.06] p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="text-sm font-bold text-brand-yellow">{step.number}</span>
                <span className="h-px w-16 bg-brand-mint/40" />
              </div>
              <h3 className="text-2xl font-bold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-brand-stone">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Process;
