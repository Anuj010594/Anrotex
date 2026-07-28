import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const team = [
  {
    initials: "RD",
    name: "Rohan",
    role: "Founder · DevOps Engineer",
    description:
      "Cloud architecture, CI/CD, Kubernetes, reliability, and cost optimization.",
  },
  {
    initials: "AD",
    name: "Anuj",
    role: "Co-Founder · Solution Architect",
    description:
      "Scalable application architecture, platform engineering, and product delivery.",
  },
];

export default function Team() {
  return (
    <section id="team" className="scroll-mt-24 bg-brand-off-white px-6 py-24 md:py-32">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
              Who you work with
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] text-brand-navy md:text-6xl">
              Senior engineers, not account managers.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-teal">
              Anrotex is founder-led by design. The people in your strategy
              calls are the same people reviewing architecture and shipping the
              work.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Direct access to technical decision-makers",
                "No opaque hand-offs or outsourced delivery",
                "Recommendations grounded in your actual constraints",
              ].map((item) => (
                <p key={item} className="flex items-start gap-3 font-semibold text-brand-navy">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                  {item}
                </p>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {team.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-[1.75rem] border border-brand-navy/10 bg-brand-stone p-7"
              >
                <div className="mb-12 flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy text-lg font-bold text-brand-yellow">
                  {member.initials}
                </div>
                <h3 className="text-2xl font-bold text-brand-navy">{member.name}</h3>
                <p className="mt-1 text-sm font-bold text-brand-navy/75">{member.role}</p>
                <p className="mt-5 leading-relaxed text-brand-navy/75">
                  {member.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
