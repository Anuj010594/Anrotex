import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-28 px-6">
      <div className="container max-w-2xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-3 block">Contact</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Let&apos;s talk infrastructure</h2>
          <p className="text-muted-foreground">Tell us about your project and we&apos;ll get back within 24 hours.</p>
        </motion.div>

        {submitted ? (
          <motion.div
            className="text-center p-12 rounded-xl bg-card border border-primary/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-heading text-xl font-semibold mb-2">Message sent</h3>
            <p className="text-muted-foreground text-sm">We&apos;ll be in touch soon.</p>
          </motion.div>
        ) : (
          <motion.form
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition font-body text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition font-body text-sm"
              />
            </div>
            <textarea
              placeholder="Tell us about your project..."
              rows={5}
              required
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition font-body text-sm resize-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-base hover:brightness-110 transition glow"
            >
              Send message <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default Contact;
