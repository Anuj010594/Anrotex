import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AwsCostReductionBlog() {
  return (
    <>
      <Navbar />

      <main className="bg-background text-foreground max-w-4xl mx-auto px-6 py-24">

        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">
          How to Reduce AWS Costs Without Affecting Performance
        </h1>

        <p className="text-muted-foreground mb-8">
          Cloud costs can quietly spiral out of control. As infrastructure grows,
          unused resources, inefficient scaling, and poor visibility often become
          major cost drivers.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          1. Identify idle resources
        </h2>

        <p className="text-muted-foreground mb-8">
          Unused EC2 instances, unattached EBS volumes, and old snapshots
          are among the most common sources of wasted AWS spend.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          2. Right-size your workloads
        </h2>

        <p className="text-muted-foreground mb-8">
          Many teams overprovision compute. Analyze usage and scale
          instance sizes according to actual demand.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          3. Use autoscaling effectively
        </h2>

        <p className="text-muted-foreground mb-8">
          Autoscaling ensures resources match traffic needs dynamically,
          reducing overprovisioning while maintaining reliability.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          4. Optimize storage lifecycle
        </h2>

        <p className="text-muted-foreground mb-8">
          Move infrequently used data to cheaper storage tiers like S3 Glacier.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          Final thoughts
        </h2>

        <p className="text-muted-foreground mb-8">
          AWS optimization isn’t just about cutting costs — it’s about building
          sustainable infrastructure that scales efficiently.
        </p>

        <a
          href="/aws-cost-optimization"
          className="inline-block px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold"
        >
          Get an AWS Cost Audit →
        </a>

      </main>

      <Footer />
    </>
  );
}
