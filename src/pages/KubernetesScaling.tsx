import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function KubernetesScaling() {
  return (
    <>
      <Navbar />

      <main className="bg-background text-foreground">

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

      <Footer />
    </>
  );
}
