import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { breadcrumbSchema } from "@/lib/seo";

const posts = [
  {
    topic: "AWS costs",
    problem: "Understand where your AWS budget goes.",
    title: "How to Reduce AWS Costs: A Practical Checklist",
    description:
      "Follow a worked EC2 example, assess operational risks, and measure savings across compute, storage, and network costs.",
    link: "/blog/reduce-aws-costs",
    sections: [
      { id: "baseline", label: "Build a cost baseline" },
      { id: "rightsizing-example", label: "Work through an EC2 savings example" },
    ],
  },
  {
    topic: "CI/CD",
    problem: "Find what slows down your releases.",
    title: "CI/CD Best Practices: From Pull Request to Production",
    description:
      "Follow a GitHub Actions workflow, troubleshoot pipeline failures, and prepare deployment checks and a recovery plan.",
    link: "/blog/cicd-best-practices",
    sections: [
      { id: "github-actions", label: "See a GitHub Actions workflow" },
      { id: "troubleshooting", label: "Troubleshoot pipeline failures" },
    ],
  },
  {
    topic: "Kubernetes",
    problem: "Keep workloads healthy as demand changes.",
    title: "Kubernetes Scaling Best Practices for Production Workloads",
    description:
      "Work through an HPA calculation and YAML example, diagnose scaling failures, and validate changes with a repeatable checklist.",
    link: "/blog/kubernetes-scaling-best-practices",
    sections: [
      { id: "hpa", label: "Understand how HPA scales replicas" },
      { id: "checklist", label: "Check your production scaling setup" },
    ],
  },
];

export default function Blog() {
  return (
    <>
      <SEO
        title="DevOps, Kubernetes & AWS Insights | Anrotex"
        description="Practical engineering guides on AWS cost optimization, CI/CD automation, Kubernetes scaling, cloud reliability, and modern DevOps practices."
        path="/blog"
        structuredData={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Insights", path: "/blog" }])}
      />
      <Navbar />

      <main className="bg-brand-off-white text-brand-navy">
        <PageHero
          eyebrow="Insights from Anrotex"
          title="DevOps insights and engineering guides"
          description="Start with the cloud or delivery problem you want to solve. Use the examples, troubleshooting steps and checklists to plan your next change."
        />
        <section aria-labelledby="engineering-guides" className="px-6 pb-20 md:pb-28">
          <div className="container">
            <h2 id="engineering-guides" className="mb-8 text-2xl font-bold tracking-tight">Choose a guide for your next decision.</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.title}
                  className="flex flex-col rounded-3xl border border-brand-navy/15 bg-brand-stone/45 p-6 md:p-8"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">{post.topic}</p>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight">
                    <TrackedLink to={post.link} eventName="Article Click" eventSource="blog-list-title" className="hover:underline">
                      {post.title}
                    </TrackedLink>
                  </h3>
                  <p className="mt-5 font-semibold">{post.problem}</p>
                  <p className="mt-3 leading-relaxed text-brand-teal">
                    {post.description}
                  </p>
                  <div className="mt-auto pt-7">
                    <TrackedLink to={post.link} eventName="Article Click" eventSource="blog-list" className="inline-flex items-center gap-2 font-bold underline underline-offset-4">
                      Read the full guide <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </TrackedLink>
                    <p className="mt-6 border-t border-brand-navy/15 pt-5 text-sm font-semibold text-brand-teal">Or go straight to:</p>
                    <ul className="mt-3 space-y-3">
                      {post.sections.map((section) => (
                        <li key={section.id}>
                          <TrackedLink to={`${post.link}#${section.id}`} eventName="Article Click" eventSource="blog-section" className="text-sm font-semibold underline decoration-brand-teal/40 underline-offset-4 hover:decoration-brand-teal">
                            {section.label}
                          </TrackedLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section aria-labelledby="engineering-help" className="border-t border-brand-navy/10 bg-brand-mint/45 px-6 py-16 md:py-20">
          <div className="container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 id="engineering-help" className="text-3xl font-bold tracking-tight">Want help applying this to your platform?</h2>
              <p className="mt-4 leading-relaxed text-brand-teal">Compare our AWS cost reviews, CI/CD automation, Kubernetes engineering and broader DevOps support to find the right starting point.</p>
            </div>
            <TrackedLink to="/services" eventName="Service Click" eventSource="blog-services" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 font-bold text-brand-off-white transition hover:bg-brand-teal">
              Compare the services <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </TrackedLink>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
