import { motion } from "framer-motion";

const team = [
  {
    name: "Rohan",
    role: "Founder & DevOps Engineer",
    description:
      "Building scalable cloud infrastructure, CI/CD pipelines, and Kubernetes-based systems with a focus on performance, security, and cost optimization.",
  },
  {
    name: "Atul",
    role: "Co-Founder & Software Engineer",
    description:
      "Designing and developing robust, scalable applications with modern technologies, ensuring high performance and seamless user experience.",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-20 px-6 bg-background scroll-mt-24">
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-4xl font-bold mb-4">
          Meet the Team
        </h2>

        <p className="text-muted-foreground mb-4">
          Founder-led engineering. You work directly with the people building your systems.
        </p>

        <p className="text-sm text-primary mb-12">
          No middle layers. No outsourcing. Just direct collaboration.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="w-full max-w-md bg-card border rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">
                {member.name}
              </h3>

              <p className="text-primary font-medium mb-4">
                {member.role}
              </p>

              <p className="text-muted-foreground">
                {member.description}
              </p>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
