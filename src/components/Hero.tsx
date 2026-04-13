import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 text-primary text-sm font-medium tracking-wide">
            DevOps · Cloud · Infrastructure · Software Developement
          </span>
        </motion.div>

        <motion.h1
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Engineer your cloud.
          <br />
          <span className="text-gradient">Ship with confidence.</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Anrotex helps engineering teams design, build, and scale cloud infrastructure
          that&apos;s secure, observable, and cost-efficient.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-base hover:brightness-110 transition glow"
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-heading font-medium text-base hover:bg-secondary transition"
          >
            Our services
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
