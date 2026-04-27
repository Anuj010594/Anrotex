import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <section id="contact" className="py-28 px-6 scroll-mt-24">
      <div className="container max-w-2xl">
        
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary text-sm uppercase tracking-widest">
            Contact
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s talk infrastructure
          </h2>

          <p className="text-muted-foreground">
            Tell us about your project and we&apos;ll get back within 24 hours.
          </p>
        </motion.div>

        {/* Success State */}
        {submitted ? (
          <motion.div
            className="text-center p-12 rounded-xl bg-card border border-primary/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Message sent</h3>
            <p className="text-muted-foreground text-sm">
              We&apos;ll be in touch soon.
            </p>
          </motion.div>
        ) : (
          <motion.form
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);

              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);

              const data = {
                name: String(formData.get("name") || ""),
                email: String(formData.get("email") || ""),
                company: String(formData.get("company") || ""),
                message: String(formData.get("message") || ""),
              };

              try {
                const res = await fetch("/api/send", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                });

                const result = await res.json();

                if (result.success) {
                  setSubmitted(true);
                  form.reset();
                } else {
                  alert(result.error || "Something went wrong.");
                }
              } catch (error) {
                console.error(error);
                alert("Cannot connect to server.");
              }

              setLoading(false);
            }}
          >
            {/* Inputs */}
            <div className="grid sm:grid-cols-2 gap-5">
              
              <input
                name="name"
                type="text"
                placeholder="Name"
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition text-sm"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition text-sm"
              />

              <input
                name="company"
                type="text"
                placeholder="Company Name"
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition text-sm sm:col-span-2"
              />
            </div>

            {/* Textarea */}
            <textarea
              name="message"
              placeholder="Tell us about your project..."
              rows={5}
              required
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition text-sm resize-none"
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition"
            >
              {loading ? "Sending..." : "Send Message"}
              <ArrowRight className="w-4 h-4" />
            </button>

          </motion.form>
        )}
      </div>
    </section>
  );
};

export default Contact;
