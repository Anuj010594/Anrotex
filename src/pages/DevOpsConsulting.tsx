import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DevOpsConsulting() {
  return (
    <>
      <Navbar />

      <main className="bg-background text-foreground">

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

      <Footer />
    </>
  );
}
