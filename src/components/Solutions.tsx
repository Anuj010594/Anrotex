import { motion } from "framer-motion";

const outcomes = [
  {
    value: "42%",
    label: "cloud cost reduction",
    context: "for a fintech platform",
  },
  {
    value: "3×",
    label: "faster deployments",
    context: "with automated delivery",
  },
  {
    value: "0",
    label: "migration downtime",
    context: "for 2M+ daily users",
  },
  {
    value: "2M+",
    label: "daily users supported",
    context: "during Kubernetes migration",
  },
];

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="border-y border-brand-navy/10 bg-brand-stone px-6 py-14"
    >
      <div className="container">
        <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-navy">
              Selected engagement outcomes
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
              Engineering measured by business impact.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-brand-navy/75">
            We connect infrastructure work to the numbers your engineering and
            leadership teams actually care about.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-brand-navy/10 bg-brand-navy/10 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome.label}
              className="bg-brand-off-white p-6 md:p-7"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <p className="text-4xl font-bold tracking-[-0.04em] text-brand-navy">
                {outcome.value}
              </p>
              <p className="mt-3 font-semibold text-brand-navy">{outcome.label}</p>
              <p className="mt-1 text-sm text-brand-teal">{outcome.context}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
