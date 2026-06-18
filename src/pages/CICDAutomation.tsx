import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function CICDAutomation() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      <Navbar />

      <main className="bg-background text-foreground pt-20">

      <section className="px-6 py-6 max-w-5xl mx-auto text-sm text-white/70 border-b border-border">
        <div className="flex items-center gap-2">
          <a href="/" className="hover:text-primary transition">Home</a>
          <span>/</span>
          <a href="/services" className="hover:text-primary transition">Services</a>
          <span>/</span>
          <span className="text-foreground font medium">CI/CD Automation</span>
       </div>
    </section>


        {/* HERO */}
        <section className="py-24 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Automate Deployments with
            <br />
            <span className="text-primary">CI/CD Pipelines</span>
          </h1>

          <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-8">
            We help engineering teams build fast, reliable, and secure CI/CD pipelines
            that reduce deployment failures and speed up releases.
          </p>

          <a href="/contact" className="inline-block px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold">
            Book a CI/CD Audit →
          </a>
        </section>

        {/* EXISTING CONTENT KEPT */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Common deployment bottlenecks</h2>
          <ul className="space-y-4 text-muted-foreground">
            <li>• Manual deployments causing downtime</li>
            <li>• Slow release cycles</li>
            <li>• Inconsistent environments</li>
            <li>• Lack of rollback mechanisms</li>
            <li>• Security gaps in deployment pipelines</li>
          </ul>
        </section>

        <section className="py-20 px-6 bg-card border-t border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">What we optimize</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li>• GitHub Actions pipelines</li>
              <li>• GitLab CI/CD workflows</li>
              <li>• Jenkins automation</li>
              <li>• Docker build optimization</li>
              <li>• Kubernetes deployment automation</li>
              <li>• Security and secret management</li>
            </ul>
          </div>
        </section>

        {/* RELATED READING */}
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-border">
          <h2 className="text-3xl font-bold mb-6">Related Reading</h2>
          <div className="grid md:grid-cols-1 gap-6">
            <a href="/blog/cicd-best-practices" className="block p-6 rounded-xl border border-border hover:border-primary hover:shadow-md transition">
              <h3 className="font-semibold mb-2">CI/CD Best Practices for Faster and Safer Deployments</h3>
              <p className="text-sm text-muted-foreground">
                Explore proven CI/CD patterns for better deployment speed and reliability.
              </p>
            </a>
          </div>
        </section>

        {/* COLLAPSIBLE FAQ */}
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-border">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: "Which CI/CD tools do you support?",
                a: "We support GitHub Actions, GitLab CI/CD, Jenkins, CircleCI, and custom pipelines."
              },
              {
                q: "Can you optimize existing CI/CD pipelines?",
                a: "Yes. We audit and improve deployment speed, reliability, security, and rollback mechanisms."
              },
              {
                q: "Do you implement rollback strategies?",
                a: "Yes. Rollback planning is part of every production-ready CI/CD system we build."
              }
            ].map((faq, index) => (
              <div key={index} className="border rounded-xl p-4">
                <button onClick={() => toggleFAQ(index)} className="w-full text-left text-xl font-semibold">
                  {faq.q}
                </button>

                {openFAQ === index && (
                  <div className="mt-3 text-muted-foreground animate-accordion-down">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center bg-card border-t border-border">
          <h2 className="text-3xl font-bold mb-6">Ship faster with confidence</h2>
          <p className="text-muted-foreground mb-8">
            Reduce deployment time and improve release reliability with modern CI/CD.
          </p>
          <a href="/contact" className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold">
            Get Started →
          </a>
        </section>
      </main>

        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Which CI/CD tools do you support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We support GitHub Actions, GitLab CI/CD, Jenkins, CircleCI, and custom pipelines."
                }
              },
              {
                "@type": "Question",
                name: "Can you optimize existing CI/CD pipelines?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. We audit and improve deployment speed, reliability, security, and rollback mechanisms."
                }
              },
              {
                "@type": "Question",
                name: "Do you implement rollback strategies?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Rollback planning is part of every production-ready CI/CD system we build."
                }
              }
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
         __html: JSON.stringify({
           "@context": "https://schema.org",
           "@type": "BreadcrumbList",
           itemListElement: [
             {
               "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.anrotex.com/"
              },
             {
               "@type": "ListItem",
               position: 2,
               name: "Services",
               item: "https://www.anrotex.com/services"
             },
            {
              "@type": "ListItem",
              position: 3,
              name: "CI/CD Automation",
              item: "https://www.anrotex.com/ci-cd-automation"
             }
           ]
         })
       }}
     />



      <Footer />
    </>
  );
}
