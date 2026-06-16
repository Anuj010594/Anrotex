import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CICDAutomation() {
  return (
    <>
      <Navbar />

      <main className="bg-background text-foreground">

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

          <a
            href="/contact"
            className="inline-block px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold"
          >
            Book a CI/CD Audit →
          </a>
        </section>

        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Common deployment bottlenecks
          </h2>

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
            <h2 className="text-3xl font-bold mb-6">
              What we optimize
            </h2>

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

        <section className="py-24 px-6 text-center bg-card border-t border-border">
          <h2 className="text-3xl font-bold mb-6">
            Ship faster with confidence
          </h2>

          <p className="text-muted-foreground mb-8">
            Reduce deployment time and improve release reliability with modern CI/CD.
          </p>

          <a
            href="/contact"
            className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold"
          >
            Get Started →
          </a>
        </section>

      </main>

      <Footer />
    </>
  );
}
