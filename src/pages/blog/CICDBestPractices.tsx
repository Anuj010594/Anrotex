import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CICDBestPractices() {
  return (
    <>
      <Navbar />

      <main className="bg-background text-foreground max-w-4xl mx-auto px-6 py-24">

        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">
          CI/CD Best Practices for Faster and Safer Deployments
        </h1>

        <p className="text-muted-foreground mb-8">
          CI/CD pipelines are essential for modern software delivery. But poorly
          configured pipelines can slow teams down and introduce risk.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          1. Automate testing early
        </h2>

        <p className="text-muted-foreground mb-8">
          Catch bugs before deployment by integrating unit, integration,
          and security tests into your pipeline.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          2. Keep deployments small
        </h2>

        <p className="text-muted-foreground mb-8">
          Smaller releases reduce risk and make rollbacks easier.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          3. Use infrastructure as code
        </h2>

        <p className="text-muted-foreground mb-8">
          Terraform and Pulumi help ensure consistency across environments.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          4. Implement rollback strategies
        </h2>

        <p className="text-muted-foreground mb-8">
          Every pipeline should have a tested rollback plan.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          Final thoughts
        </h2>

        <p className="text-muted-foreground mb-8">
          Strong CI/CD pipelines improve reliability, speed, and developer confidence.
        </p>

        <a
          href="/ci-cd-automation"
          className="inline-block px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold"
        >
          Improve your CI/CD Pipeline →
        </a>

      </main>

      <Footer />
    </>
  );
}
