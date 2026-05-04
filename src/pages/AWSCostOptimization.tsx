import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AwsCostOptimization() {
  return (
    <>
      <Navbar />

      <main className="bg-background text-foreground">

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
            href="/#contact"
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

        {/* CTA */}
        <section className="py-24 px-6 text-center bg-card border-t border-border">
          <h2 className="text-3xl font-bold mb-6">
            Stop overpaying for cloud
          </h2>

          <p className="text-muted-foreground mb-8">
            Get a detailed AWS cost audit and actionable optimization plan.
          </p>

          <a
            href="/#contact"
            className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold"
          >
            Request Free Audit →
          </a>
        </section>

      </main>

      <Footer />
    </>
  );
}
