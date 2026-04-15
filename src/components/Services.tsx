import { motion } from "framer-motion";
import { Cloud, DollarSign, Shield, Activity, Container, Workflow, ArrowRightLeft, Network, LifeBuoy } from "lucide-react";

const services = [
  { icon: Cloud, title: "Cloud Architecture", description: "AWS, GCP, and Azure — designed for scale, security, and cost control." },
  { icon: DollarSign, title: "Cost Optimization", description: "Reduce cloud spend with right-sizing, auto-scaling, and efficient resource utilization." },
  { icon: Container, title: "Containerization & Orchestration", description: "Production-grade K8s clusters + Docker for high availability." },
  { icon: Shield, title: "DevSecOps", description: "Zero-trust networking, secrets management, and audit-ready infrastructure." },
  { icon: Activity, title: "Observability", description: "Full-stack monitoring, logging, and alerting with Datadog, Grafana, and more." },
  { icon: Workflow, title: "Infrastructure as Code", description: "Terraform and Pulumi modules that make infrastructure reproducible." },
  { icon: LifeBuoy, title: "Incident Management & Support", description: "24/7 monitoring & rapid issue resolution." },
  { icon: Network, title: "Scalable Infrastructure Design", description: "Auto-scaling, load balancing & high availability." },
  { icon: ArrowRightLeft, title: "Migration Services", description: "Seamless on-prem to cloud migration." },

];

const Services = () => (
  <section id="services" className="py-28 px-6">
    <div className="container">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-primary text-base font-medium tracking-widest uppercase mb-3 block">DevOps-as-a-Service:</span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold">What we Provide</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            className="group p-8 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <s.icon className="w-8 h-8 text-primary mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="font-heading text-xl font-semibold mb-3">{s.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
