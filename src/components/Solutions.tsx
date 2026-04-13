import { motion } from "framer-motion";
import { useState } from "react";

const solutions = [
  {
    title: "DevOps-as-a-Service",
    description:
      "Seamless integration, automation, pipelines, and faster delivery with enterprise-grade DevOps.",
    color: "from-blue-500 to-cyan-500",
    details: (
      <>
        <p className="mb-4">
          We understand the importance of agility in software development.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li><b>CI/CD Pipeline Automation:</b> Faster and reliable deployments.</li>
          <li><b>Cloud Infrastructure:</b> AWS, Azure & GCP optimization.</li>
          <li><b>Containerization:</b> Docker & Kubernetes scaling.</li>
          <li><b>Monitoring:</b> Prometheus, Grafana, ELK.</li>
          <li><b>DevSecOps:</b> Security across lifecycle.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Custom Software Development",
    description:
      "Innovative, scalable, and secure applications tailored to your business goals.",
    color: "from-purple-500 to-pink-500",
    details: (
      <>
        <p className="mb-4">
          Our team builds scalable and future-ready applications.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li><b>Web Apps:</b> Fast, modern applications.</li>
          <li><b>Mobile Apps:</b> iOS, Android & cross-platform.</li>
          <li><b>Enterprise Tools:</b> Custom large-scale systems.</li>
          <li><b>Modernization:</b> Upgrade legacy systems.</li>
          <li><b>Agile:</b> Iterative development process.</li>
        </ul>
      </>
    ),
  },
];

export default function Solutions() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto text-center">
        
        <h2 className="text-4xl font-bold mb-4">
          Tailored Solutions
        </h2>

        <p className="text-muted-foreground mb-12">
          Explore our core services designed to meet your business needs.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          {solutions.map((item, index) => (
            <motion.div
              key={index}
              className="w-full max-w-md bg-card border rounded-2xl p-6 shadow-lg transition duration-300"
            >
              {/* NORMAL VIEW */}
              {activeIndex !== index && (
                <>
                  <h3 className="text-xl font-semibold mb-4">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground mb-6">
                    {item.description}
                  </p>

                  <button
                    onClick={() => setActiveIndex(index)}
                    className={`w-full py-2 rounded-lg bg-gradient-to-r ${item.color} text-white`}
                  >
                    Learn More →
                  </button>
                </>
              )}

              {/* EXPANDED VIEW */}
              {activeIndex === index && (
                <>
                  <h3 className="text-xl font-semibold mb-4">
                    {item.title}
                  </h3>

                  <div className="text-left mb-6">
                    {item.details}
                  </div>

                  <button
                    onClick={() => setActiveIndex(null)}
                    className="px-4 py-2 rounded-lg bg-muted"
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
}
