import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function KubernetesScaling() {
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
          <span className="text-foreground font medium">Kubernetes Scaling</span>
       </div>
    </section>

      
        {/* HERO */}
        <section className="py-24 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Scale Kubernetes Workloads
            <br />
            <span className="text-primary">without downtime</span>
          </h1>

          <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-8">
            We help teams optimize Kubernetes clusters for performance, cost-efficiency,
            and high availability across production workloads.
          </p>

          <a
            href="/contact"
            className="inline-block px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold"
          >
            Get Cluster Audit →
          </a>
        </section>

        {/* PROBLEMS */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Common Kubernetes scaling issues
          </h2>

          <ul className="space-y-4 text-muted-foreground">
            <li>• Resource overprovisioning</li>
            <li>• High infrastructure costs</li>
            <li>• Pod instability under load</li>
            <li>• Inefficient autoscaling configuration</li>
            <li>• Cluster performance bottlenecks</li>
          </ul>
        </section>

        {/* SOLUTIONS */}
        <section className="py-20 px-6 bg-card border-t border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              What we optimize
            </h2>

            <ul className="space-y-4 text-muted-foreground">
              <li>• Horizontal Pod Autoscaler (HPA)</li>
              <li>• Vertical Pod Autoscaler (VPA)</li>
              <li>• Cluster Autoscaler tuning</li>
              <li>• Resource requests & limits optimization</li>
              <li>• EKS cost reduction strategies</li>
              <li>• Observability and alerting</li>
            </ul>
          </div>
        </section>

        {/* RELATED READING */}
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-border">
          <h2 className="text-3xl font-bold mb-6">
            Related Reading
          </h2>

          <div className="grid md:grid-cols-1 gap-6">
            <a
              href="/blog/kubernetes-scaling-best-practices"
              aria-label="Read article about Kubernetes scaling best practices"
              className="block p-6 rounded-xl border border-border hover:border-primary hover:shadow-md transition"
            >
              <h3 className="font-semibold mb-2">
                Kubernetes Scaling Best Practices for Production Workloads
              </h3>

              <p className="text-sm text-muted-foreground">
                Learn autoscaling, node optimization, and performance best practices.
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
                Do you optimize Kubernetes autoscaling?
              </button>

              {openFAQ === 0 && (
                <div className="mt-3 text-muted-foreground animate-accordion-down">
                  Yes, we optimize HPA, VPA, and Cluster Autoscaler configurations.
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="border rounded-xl p-4">
              <button
                onClick={() => toggleFAQ(1)}
                className="w-full text-left text-xl font-semibold"
              >
                Can you reduce EKS costs?
              </button>

              {openFAQ === 1 && (
                <div className="mt-3 text-muted-foreground animate-accordion-down">
                  Yes, we improve node utilization, autoscaling efficiency, and workload optimization.
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="border rounded-xl p-4">
              <button
                onClick={() => toggleFAQ(2)}
                className="w-full text-left text-xl font-semibold"
              >
                Do you support production Kubernetes clusters?
              </button>

              {openFAQ === 2 && (
                <div className="mt-3 text-muted-foreground animate-accordion-down">
                  Yes, we work with production-grade Kubernetes clusters across AWS, GCP, and Azure.
                </div>
              )}
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center bg-card border-t border-border">
          <h2 className="text-3xl font-bold mb-6">
            Improve performance, reduce waste
          </h2>

          <p className="text-muted-foreground mb-8">
            Build resilient Kubernetes infrastructure that scales with your business.
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
                name: "Do you optimize Kubernetes autoscaling?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we optimize HPA, VPA, and Cluster Autoscaler configurations."
                }
              },
              {
                "@type": "Question",
                 name: "Can you reduce EKS costs?",
                 acceptedAnswer: {
                  "@type": "Answer",
                   text: "Yes, we improve node utilization, autoscaling efficiency, and workload optimization."
                }
              },
             {
                "@type": "Question",
                 name: "Do you support production Kubernetes clusters?",
                 acceptedAnswer: {
                 "@type": "Answer",
                 text: "Yes, we work with production-grade Kubernetes clusters across AWS, GCP, and Azure."
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
             name: "Kubernetes Scaling",
             item: "https://www.anrotex.com/kubernetes-scaling"
           }
         ]
       })
     }}
  />
 




      <Footer />
    </>
  );
}
