import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function AwsCostOptimization() {
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
        <span className="text-foreground font-medium">AWS Cost Optimization</span>
      </div>
   </section>



        {/* HERO */}
        <section className="py-24 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Reduce AWS Costs by 30–50%
            <br />
            <span className="text-primary">Without hurting performance</span>
          </h1>

          <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-8">
            We help startups and engineering teams identify waste, optimize infrastructure,
            and cut unnecessary cloud spend—while improving reliability and scalability.
          </p>

          <a
            href="/contact"
            className="inline-block px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold"
          >
            Get a Free Cost Audit →
          </a>
        </section>

        {/* PROBLEM */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Why your AWS bill keeps increasing
          </h2>

          <ul className="space-y-4 text-muted-foreground">
            <li>• Over-provisioned EC2 instances</li>
            <li>• Idle resources running 24/7</li>
            <li>• No autoscaling or inefficient scaling</li>
            <li>• Unoptimized storage & data transfer costs</li>
            <li>• Lack of monitoring and cost visibility</li>
          </ul>
        </section>

        {/* SOLUTION */}
        <section className="py-20 px-6 bg-card border-t border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              How we reduce your cloud costs
            </h2>

            <ul className="space-y-4 text-muted-foreground">
              <li>• Rightsizing compute (EC2, RDS, EKS)</li>
              <li>• Implementing autoscaling strategies</li>
              <li>• Spot instances & reserved instances optimization</li>
              <li>• Storage lifecycle & cost tuning (S3, EBS)</li>
              <li>• Infrastructure as Code cleanup (Terraform)</li>
              <li>• Monitoring & cost alerting setup</li>
            </ul>
          </div>
        </section>

        {/* RESULTS */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Real Results
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl">
              <h3 className="text-xl font-semibold mb-2">42%</h3>
              <p className="text-muted-foreground">Cost reduction for fintech client</p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="text-xl font-semibold mb-2">0 downtime</h3>
              <p className="text-muted-foreground">While optimizing infrastructure</p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="text-xl font-semibold mb-2">2x efficiency</h3>
              <p className="text-muted-foreground">Better resource utilization</p>
            </div>
          </div>
        </section>

        {/* RELATED READING */}
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-border">
          <h2 className="text-3xl font-bold mb-6">
            Related Reading
          </h2>

          <div className="grid md:grid-cols-1 gap-6">
            <a
              href="/blog/reduce-aws-costs"
              aria-label="Read article about reducing AWS costs"
              className="block p-6 rounded-xl border border-border hover:border-primary hover:shadow-md transition"
            >
              <h3 className="font-semibold mb-2">
                How to Reduce AWS Costs Without Affecting Performance
              </h3>

              <p className="text-sm text-muted-foreground">
                Learn practical strategies to cut AWS spend while maintaining performance.
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
                How much can AWS optimization reduce costs?
              </button>

              {openFAQ === 0 && (
                <div className="mt-3 text-muted-foreground animate-accordion-down">
                  Most companies reduce AWS costs by 20% to 50% depending on current infrastructure inefficiencies.
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="border rounded-xl p-4">
              <button
                onClick={() => toggleFAQ(1)}
                className="w-full text-left text-xl font-semibold"
              >
                How long does an AWS cost audit take?
              </button>

              {openFAQ === 1 && (
                <div className="mt-3 text-muted-foreground animate-accordion-down">
                  A full AWS cost audit usually takes between 3 to 7 business days.
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="border rounded-xl p-4">
              <button
                onClick={() => toggleFAQ(2)}
                className="w-full text-left text-xl font-semibold"
              >
                Do you optimize EKS, RDS, and S3 too?
              </button>

              {openFAQ === 2 && (
                <div className="mt-3 text-muted-foreground animate-accordion-down">
                  Yes. We optimize EC2, EKS, RDS, S3, CloudFront, and other AWS services.
                </div>
              )}
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center bg-card border-t border-border">
          <h2 className="text-3xl font-bold mb-6">
            Stop overpaying for cloud
          </h2>

          <p className="text-muted-foreground mb-8">
            Get a detailed AWS cost audit and actionable optimization plan.
          </p>

          <a
            href="/contact"
            className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold"
          >
            Request Free Audit →
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
                name: "How much can AWS optimization reduce costs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most companies can reduce AWS costs by 20% to 50% depending on infrastructure inefficiencies."
                }
              },
              {
                "@type": "Question",
                name: "How long does an AWS audit take?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A full AWS cost audit usually takes 3 to 7 business days."
                }
              },
              {
                "@type": "Question",
                name: "Do you optimize EKS, RDS, and S3 too?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we optimize EC2, EKS, RDS, S3, and other AWS services."
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
                 name: "AWS Cost Optimization",
                 item: "https://www.anrotex.com/aws-cost-optimization"
                }
               ]
             })
           }}
        />




      <Footer />
    </>
  );
}
