import { ArrowRight, Check, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";

const description = "DevOps consulting for CI/CD, Terraform, Kubernetes and cloud reliability. Get a prioritized assessment, scoped implementation and practical team handover.";
const deliverables = [
  ["Assessment and priorities", "A review of your release process, infrastructure configuration and operational pain points, with findings ranked by impact, effort and risk."],
  ["Infrastructure as Code", "Scoped Terraform changes in your repositories, with a review of state management, environment differences and the process for approving infrastructure changes."],
  ["Release and recovery workflows", "Version-controlled pipeline changes, deployment checks and documented recovery steps for the applications included in the engagement."],
  ["Workload and cloud efficiency", "Recommendations tied to workload demand, capacity and cloud spend. Each proposed change includes the operational tradeoffs and evidence needed to validate it."],
  ["Observability and access controls", "A review of service signals, actionable alerts, runbooks and deployment permissions, focused on the failure modes your team needs to detect and resolve."],
  ["Validation and handover", "Testing against your agreed requirements, clear documentation of the changes, and a walkthrough so your engineers can operate the system."],
];
const process = [
  ["Understand the current system", "Walk through a recent release or incident together. Review architecture, relevant configuration and operating data to identify where assistance would help."],
  ["Plan the work together", "Choose the priorities, repositories and environments. Agree what will be delivered, how it will be tested, and the access, pricing and timeline before work starts."],
  ["Implement in controlled steps", "Review changes with your engineers, validate in an agreed test environment and plan production changes with explicit recovery steps."],
  ["Measure and transfer ownership", "Compare results with the starting baseline. Leave configuration, runbooks and next steps with the team; scope any continuing support separately."],
];
const faqs = [
  ["What does DevOps consulting include?", "The engagement can cover an assessment, CI/CD, Terraform, Kubernetes, cloud cost efficiency, observability and access controls. We build the project around your priorities and agree which services and deliverables you need."],
  ["Can we start with an assessment only?", "Yes. An assessment produces findings and a prioritized improvement plan. Implementation is separately scoped, so your team can choose which recommendations to take forward and who will deliver them."],
  ["What access will you need?", "Start with architecture context, relevant configuration and release or incident history. Redacted exports or a walkthrough can support discovery. We agree the minimum permissions needed for each stage; an assessment does not require blanket production write access."],
  ["Do you work with our existing tools and cloud provider?", "Yes. We work with AWS, Google Cloud and Azure environments, including Terraform, Kubernetes and existing CI/CD tooling. We confirm the services and tooling in scope before work begins. A platform migration is a separate decision."],
  ["How are pricing, timing and ongoing support agreed?", "The initial consultation is free. Pricing and timing depend on the environments, dependencies, access and validation required. Implementation and ongoing support have an agreed scope; continuous monitoring or 24/7 incident response is not automatically included."],
];

export default function DevOpsConsulting() {
  return (
    <>
      <SEO title="DevOps Consulting Services for Growing Teams | Anrotex" description={description} path="/devops-consulting" structuredData={[
        serviceSchema({ name: "DevOps Consulting Services", description, path: "/devops-consulting", serviceType: "DevOps consulting" }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "DevOps Consulting", path: "/devops-consulting" }]),
      ]} />
      <Navbar />
      <main className="bg-brand-off-white text-brand-navy">
        <section className="px-6 pb-20 pt-32 md:pb-24 md:pt-40">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm font-semibold text-brand-teal">
              <Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/services">Services</Link><span aria-hidden="true">/</span><span aria-current="page">DevOps consulting</span>
            </nav>
            <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">Founder-led DevOps consulting</p>
                <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">DevOps consulting for infrastructure your team can operate.</h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-teal">Anrotex helps engineering teams improve releases, cloud reliability and infrastructure efficiency. Start with the bottleneck, agree a practical scope, and leave with changes your team understands.</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <TrackedLink to="/contact?focus=devops" eventSource="devops-hero" className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-4 font-bold text-brand-off-white transition hover:bg-brand-teal">Discuss your DevOps needs <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></TrackedLink>
                  <a href="#deliverables" className="inline-flex items-center rounded-full border border-brand-navy/20 px-6 py-4 font-bold hover:bg-brand-stone">See what you receive</a>
                </div>
                <p className="mt-5 text-sm text-brand-teal">Free initial consultation · Scope agreed before implementation</p>
              </div>
              <aside className="rounded-[2rem] bg-brand-navy p-7 text-brand-off-white md:p-9" aria-label="Engagement stages">
                <GitBranch className="h-8 w-8 text-brand-yellow" aria-hidden="true" />
                <h2 className="mt-6 text-2xl font-bold">From a recurring problem to a maintainable solution.</h2>
                <ol className="mt-6 space-y-5">
                  {[["Assess", "Find the bottleneck and record the starting point."], ["Implement", "Make the agreed changes and verify their effect."], ["Hand over", "Leave the configuration and operating knowledge with your team."]].map(([title, text], index) => (
                    <li key={title} className="flex gap-4 border-t border-brand-mint/20 pt-5"><span className="text-sm font-bold text-brand-yellow">0{index + 1}</span><div><p className="font-bold">{title}</p><p className="mt-1 text-sm leading-relaxed text-brand-stone">{text}</p></div></li>
                  ))}
                </ol>
              </aside>
            </div>
          </div>
        </section>
        <section className="border-y border-brand-navy/10 bg-brand-stone/50 px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:gap-16">
            <div><h2 className="text-3xl font-bold tracking-tight">When outside DevOps help is useful</h2><p className="mt-4 leading-relaxed text-brand-teal">For startups, growing product teams and established engineering organizations with a specific delivery or infrastructure problem. We work alongside the people who will own the system afterwards.</p></div>
            <ul className="space-y-4">{["Releases require manual work or depend on one engineer.", "Infrastructure differs between environments and is hard to reproduce.", "Cloud spend or capacity grows without a clear link to demand.", "Incidents reveal gaps in monitoring, access or recovery procedures."].map(item => <li key={item} className="flex gap-3 leading-relaxed"><Check className="mt-1 h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" />{item}</li>)}</ul>
          </div>
        </section>
        <section id="deliverables" className="scroll-mt-24 px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What your team receives</h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-brand-teal">An assessment can stand alone. For implementation, we agree which of these deliverables belong in your project before making changes.</p>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{deliverables.map(([title, text]) => <article key={title} className="rounded-3xl border border-brand-navy/10 p-6"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-brand-teal">{text}</p></article>)}</div>
          </div>
        </section>
        <section className="bg-brand-mint/40 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight">Choose where to start</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">{[
              ["/ci-cd-automation", "CI/CD automation", "For slow builds, fragile releases and recovery gaps. Review pipeline deliverables and the implementation process."],
              ["/kubernetes-scaling", "Kubernetes consulting", "For pending pods, unstable autoscaling or inefficient node capacity. See the cluster review scope and evidence needed."],
              ["/aws-cost-optimization", "AWS cost optimization", "For unexplained spend and idle capacity. See how an audit connects potential savings with operational risk."],
            ].map(([to, title, text]) => <article key={to} className="border-t border-brand-navy/20 pt-6"><h3 className="text-xl font-bold"><TrackedLink to={to} eventName="Service Click" eventSource="devops-workstreams" className="underline underline-offset-4">{title}</TrackedLink></h3><p className="mt-3 leading-relaxed text-brand-teal">{text}</p></article>)}</div>
          </div>
        </section>
        <section className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight">How the engagement works</h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-2">{process.map(([title, text], index) => <li key={title} className="flex gap-5"><span className="text-2xl font-bold text-brand-teal">0{index + 1}</span><div><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-brand-teal">{text}</p></div></li>)}</ol>
            <div className="mt-12 rounded-3xl bg-brand-stone/50 p-6 md:p-8"><h3 className="text-xl font-bold">Measure improvement against your baseline</h3><p className="mt-3 leading-relaxed text-brand-teal">Agree which measures matter: release lead time, failed deployments, recovery time, service reliability or cost per workload. Compare similar workloads and periods, and record tradeoffs alongside results.</p><TrackedLink to="/case-studies/fintech-aws-cost-reduction" eventName="Case Study Click" eventSource="devops-evidence" className="mt-5 inline-flex font-bold underline underline-offset-4">See how we improved a fintech platform</TrackedLink></div>
          </div>
        </section>
        <section className="border-y border-brand-navy/10 px-6 py-16">
          <div className="mx-auto max-w-6xl"><h2 className="text-3xl font-bold tracking-tight">Prepare for your own review</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{[["/blog/cicd-best-practices", "Review your release process"], ["/blog/kubernetes-scaling-best-practices", "Work through a Kubernetes scaling example"], ["/blog/reduce-aws-costs", "Build an AWS cost reduction checklist"]].map(([to, title]) => <TrackedLink key={to} to={to} eventName="Article Click" eventSource="devops-guides" className="rounded-2xl border border-brand-navy/15 p-6 font-bold underline underline-offset-4">{title}</TrackedLink>)}</div></div>
        </section>
        <section className="px-6 py-20"><div className="mx-auto max-w-4xl"><h2 className="text-3xl font-bold tracking-tight">Questions before an engagement</h2><div className="mt-8 divide-y divide-brand-navy/15">{faqs.map(([question, answer]) => <details key={question} className="py-5"><summary className="cursor-pointer text-lg font-bold marker:text-brand-teal">{question}</summary><p className="mt-4 leading-relaxed text-brand-teal">{answer}</p></details>)}</div></div></section>
        <section className="bg-brand-navy px-6 py-20 text-brand-off-white"><div className="mx-auto max-w-4xl text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">Start with the problem slowing your team down.</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-stone">Tell us about your stack, the recurring issue and the outcome you need. We will help define a practical next step.</p><TrackedLink to="/contact?focus=devops" eventSource="devops-footer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-4 font-bold text-brand-navy hover:bg-brand-off-white">Discuss your DevOps needs <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></TrackedLink></div></section>
      </main>
      <Footer />
    </>
  );
}
