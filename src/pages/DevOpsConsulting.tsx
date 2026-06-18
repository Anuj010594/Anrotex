import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function DevOpsConsulting() {
  
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
        <span className="text-foreground font-medium">Devops Consulting</span>
     </div>
   </section>


        {/* HERO */}
        <section className="py-24 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Expert DevOps Consulting
            <br />
            <span className="text-primary">for modern engineering teams</span>
          </h1>

          <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-8">
            We help startups and enterprises improve deployment speed,
            cloud reliability, scalability, and infrastructure efficiency.
          </p>

          <a
            href="/contact"
            className="inline-block px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold"
          >
            Book a Free Consultation →
          </a>
        </section>

        {/* CHALLENGES */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Common DevOps challenges
          </h2>

          <ul className="space-y-4 text-muted-foreground">
            <li>• Slow and unreliable deployments</li>
            <li>• Rising cloud costs</li>
            <li>• Lack of observability and monitoring</li>
            <li>• Security gaps in infrastructure</li>
            <li>• Scaling bottlenecks under growth</li>
          </ul>
        </section>

        {/* SERVICES */}
        <section className="py-20 px-6 bg-card border-t border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              What we help with
            </h2>

            <ul className="space-y-4 text-muted-foreground">
              <li>• CI/CD pipeline automation</li>
              <li>• Kubernetes architecture and scaling</li>
              <li>• AWS cost optimization</li>
              <li>• Infrastructure as Code (Terraform)</li>
              <li>• Monitoring and observability</li>
              <li>• DevSecOps implementation</li>
            </ul>
          </div>
        </section>

        {/* RESULTS */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Why teams choose Anrotex
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl">
              <h3 className="text-xl font-semibold mb-2">50%</h3>
              <p className="text-muted-foreground">
                Faster deployments
              </p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="text-xl font-semibold mb-2">40%</h3>
              <p className="text-muted-foreground">
                Lower infrastructure costs
              </p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="text-xl font-semibold mb-2">99.9%</h3>
              <p className="text-muted-foreground">
                Infrastructure uptime
              </p>
            </div>
          </div>
        </section>

        {/* RELATED READING */}
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-border">
          <h2 className="text-3xl font-bold mb-6">
            Related Reading
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <a
              href="/blog/reduce-aws-costs"
              aria-label="Read article about reducing AWS costs"
              className="block p-6 rounded-xl border border-border hover:border-primary hover:shadow-md transition"
            >
              <h3 className="font-semibold mb-2">
                Reduce AWS Costs
              </h3>

              <p className="text-sm text-muted-foreground">
                Learn practical ways to optimize AWS infrastructure costs.
              </p>
            </a>

            <a
              href="/blog/cicd-best-practices"
              aria-label="Read article about CI/CD best practices"
              className="block p-6 rounded-xl border border-border hover:border-primary hover:shadow-md transition"
            >
              <h3 className="font-semibold mb-2">
                CI/CD Best Practices
              </h3>

              <p className="text-sm text-muted-foreground">
                Improve release speed, reliability, and deployment automation.
              </p>
            </a>

            <a
              href="/blog/kubernetes-scaling-best-practices"
              aria-label="Read article about Kubernetes scaling"
              className="block p-6 rounded-xl border border-border hover:border-primary hover:shadow-md transition"
            >
              <h3 className="font-semibold mb-2">
                Kubernetes Scaling Guide
              </h3>

              <p className="text-sm text-muted-foreground">
                Learn autoscaling and production optimization strategies.
              </p>
            </a>

          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-border">
          <h2 className="text-3xl font-bold mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">

            {/* FAQ 1 */}
            <div className="border rounded-xl p-4">
              <button
                onClick={() => toggleFAQ(0)}
                className="w-full text-left text-xl font-semibold"
              >
                What does DevOps consulting include?
              </button>

              {openFAQ === 0 && (
                <div className="mt-3 text-muted-foreground animate-accordion-down">
                  Our DevOps consulting includes CI/CD, cloud optimization, Kubernetes scaling, observability, and infrastructure automation.
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="border rounded-xl p-4">
              <button
                onClick={() => toggleFAQ(1)}
                className="w-full text-left text-xl font-semibold"
              >
                Do you work with startups and enterprises?
              </button>

              {openFAQ === 1 && (
                <div className="mt-3 text-muted-foreground animate-accordion-down">
                  Yes, we support startups, scaleups, and enterprise engineering teams.
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="border rounded-xl p-4">
              <button
                onClick={() => toggleFAQ(2)}
                className="w-full text-left text-xl font-semibold"
              >
                Which cloud providers do you support?
              </button>

              {openFAQ === 2 && (
                <div className="mt-3 text-muted-foreground animate-accordion-down">
                  We support AWS, Google Cloud Platform, and Microsoft Azure.
                </div>
              )}
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center bg-card border-t border-border">
          <h2 className="text-3xl font-bold mb-6">
            Build better infrastructure with Anrotex
          </h2>

          <p className="text-muted-foreground mb-8">
            Let’s improve reliability, speed, and cost-efficiency together.
          </p>

          <a
            href="/contact"
            className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold"
          >
            Talk to Us →
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
                name: "What does DevOps consulting include?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our DevOps consulting includes CI/CD, cloud optimization, Kubernetes scaling, observability, and infrastructure automation."
                }
              },
             {
                "@type": "Question",
                name: "Do you work with startups and enterprises?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we support startups, scaleups, and enterprise engineering teams."
                }
              },
            {
                "@type": "Question",
                name: "Which cloud providers do you support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We support AWS, Google Cloud Platform, and Microsoft Azure."
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
             name: "DevOps Consulting",
             item: "https://www.anrotex.com/devops-consulting"
            }
          ]
        })
      }}
   />





      <Footer />
    </>
  );
}
