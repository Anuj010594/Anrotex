import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const posts = [
  {
    title: "How to Reduce AWS Costs Without Affecting Performance",
    description:
      "Learn practical strategies to reduce AWS spending while keeping your infrastructure fast and reliable.",
    link: "/blog/reduce-aws-costs"
  },
  {
    title: "CI/CD Best Practices for Faster and Safer Deployments",
    description:
      "Improve deployment speed and reliability with proven CI/CD automation practices.",
    link: "/blog/cicd-best-practices"
  },
  {
    title: "Kubernetes Scaling Best Practices for Production Workloads",
    description:
      "Optimize Kubernetes scaling to improve performance, availability, and cost efficiency.",
    link: "/blog/kubernetes-scaling-best-practices"
  }
];

export default function Blog() {
  return (
    <>
      <Navbar />

      <main className="bg-background text-foreground px-6 py-24">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              DevOps Insights & Engineering Guides
            </h1>

            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              Practical guides on cloud optimization, CI/CD automation,
              Kubernetes scaling, and infrastructure best practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.title}
                className="p-8 rounded-xl border border-border bg-card"
              >
                <h2 className="text-xl font-semibold mb-4">
                  {post.title}
                </h2>

                <p className="text-muted-foreground mb-6">
                  {post.description}
                </p>

                <a
                  href={post.link}
                  className="text-primary font-medium"
                >
                  Read article →
                </a>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
