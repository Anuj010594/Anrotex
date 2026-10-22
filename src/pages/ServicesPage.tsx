import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { breadcrumbSchema } from "@/lib/seo";

const engagements = [
  {
    name: "AWS cost optimization",
    problem: "Your AWS bill is growing faster than your workload.",
    description: "Start with a focused cost review when you need to understand waste, compare savings options, and protect the performance your customers rely on.",
    deliverables: ["A cost baseline and prioritized findings", "Savings estimates with assumptions and risk checks", "An implementation sequence and a way to measure the result"],
    preparation: "Recent billing reports, your main workloads, and any Savings Plans or reservations already in place.",
    path: "/aws-cost-optimization",
    focus: "aws-audit",
    action: "Explore the AWS cost audit",
  },
  {
    name: "CI/CD automation",
    problem: "Releases take too long or need too many manual steps.",
    description: "Start with one application's release pipeline. Improve the route from commit to deployment, with the checks and recovery steps your application needs.",
    deliverables: ["A review of release bottlenecks and failure points", "Automated build, test and deployment workflows", "Release checks, recovery instructions and team handover"],
    preparation: "Your repository and pipeline tools, a recent release example, and the checks needed before production changes.",
    path: "/ci-cd-automation",
    focus: "cicd",
    action: "Explore CI/CD automation",
  },
  {
    name: "Kubernetes reliability and scaling",
    problem: "Traffic spikes, unstable workloads or cluster costs are hard to predict.",
    description: "Review how your workloads use resources, respond to demand and recover from disruption before changing capacity or scaling rules.",
    deliverables: ["A review of resource requests, limits and scaling behavior", "Workload and cluster changes tested against agreed load", "Availability checks and operating guidance for your team"],
    preparation: "Cluster and workload details, recent incidents, traffic patterns, and the metrics you already collect.",
    path: "/kubernetes-scaling",
    focus: "kubernetes",
    action: "Explore Kubernetes engineering",
  },
  {
    name: "DevOps and cloud engineering",
    problem: "Infrastructure, monitoring and delivery need to work together.",
    description: "Start with a defined piece of infrastructure work, such as a repeatable Terraform environment or useful monitoring and alerts. If the work spans several areas, agree what to tackle first.",
    deliverables: ["A prioritized plan across your infrastructure and delivery process", "Agreed changes to infrastructure, monitoring or operational workflows", "Documentation and handover so your team can maintain the changes"],
    preparation: "An outline of your platform, the biggest operational problems, and the outcome and timeline you have in mind.",
    path: "/devops-consulting",
    focus: "devops",
    action: "Explore DevOps consulting",
  },
];

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="DevOps & Cloud Engineering Services | Anrotex"
        description="AWS, CI/CD, Kubernetes and Terraform help for small product teams and development agencies. Compare focused projects, deliverables and what to bring to a first call."
        path="/services"
        structuredData={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])}
      />
      <Navbar />
      <main className="min-h-screen">
        <PageHero
          eyebrow="Cloud and platform engineering"
          title="DevOps help for your product or your next client project."
          description="Work directly with the engineers doing the work. Whether you run a small product team or deliver software for clients, we help you reduce AWS costs, improve releases and build infrastructure your team can maintain."
        />
        <section aria-labelledby="your-team" className="bg-brand-off-white px-6 pb-16 md:pb-20">
          <div className="container">
            <h2 id="your-team" className="max-w-3xl text-3xl font-bold tracking-tight text-brand-navy">Extra engineering help for the work ahead.</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <article className="flex flex-col rounded-3xl border border-brand-navy/15 bg-brand-mint/35 p-6 md:p-8">
                <h3 className="text-2xl font-bold tracking-tight text-brand-navy">For small product teams</h3>
                <p className="mt-4 leading-relaxed text-brand-teal">When a migration, unreliable releases or rising cloud costs need attention alongside product development, bring us a defined part of the work. We work with your founder, engineering lead or platform team.</p>
                <p className="mt-4 leading-relaxed text-brand-teal">Start with one workload or release pipeline. Agree the checks, deliver the changes and leave your engineers with the configuration and operating instructions.</p>
                <TrackedLink to="/contact?focus=devops" eventSource="services-product-team" className="mt-auto inline-flex items-center gap-2 pt-6 font-bold text-brand-navy underline underline-offset-4">Discuss your product's infrastructure <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></TrackedLink>
              </article>
              <article className="flex flex-col rounded-3xl border border-brand-navy/15 bg-brand-stone/55 p-6 md:p-8">
                <h3 className="text-2xl font-bold tracking-tight text-brand-navy">For agencies and delivery partners</h3>
                <p className="mt-4 leading-relaxed text-brand-teal">When a client project needs cloud setup, deployment automation or infrastructure changes, add engineering help for that part of the delivery. Work with us through your technical or delivery lead.</p>
                <p className="mt-4 leading-relaxed text-brand-teal">Start with one client environment or deployment workflow. Agree access, review responsibilities and handover with your team before the work begins.</p>
                <TrackedLink to="/contact?focus=devops" eventSource="services-agency" className="mt-auto inline-flex items-center gap-2 pt-6 font-bold text-brand-navy underline underline-offset-4">Discuss a client project <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></TrackedLink>
              </article>
            </div>
          </div>
        </section>
        <section aria-labelledby="choose-service" className="bg-brand-off-white px-6 pb-20 md:pb-28">
          <div className="container">
            <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
              <div>
                <h2 id="choose-service" className="text-3xl font-bold tracking-tight text-brand-navy">Where would you like to start?</h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-brand-teal">Compare the starting points below. If your challenge crosses several areas, we can help you choose the first step.</p>
                <p className="mt-3 max-w-2xl leading-relaxed text-brand-teal">Reviews can stand alone. We agree the scope of any implementation separately, so you can decide what to change next.</p>
              </div>
              <TrackedLink to="/contact" eventSource="services-help-choose" className="inline-flex shrink-0 items-center gap-2 font-bold text-brand-navy underline underline-offset-4">
                Help me choose <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {engagements.map((engagement) => (
                <article key={engagement.path} className="flex flex-col rounded-3xl border border-brand-navy/15 bg-brand-stone/45 p-6 md:p-8">
                  <h3 className="text-2xl font-bold tracking-tight text-brand-navy">{engagement.name}</h3>
                  <p className="mt-4 font-semibold text-brand-navy">{engagement.problem}</p>
                  <p className="mt-3 leading-relaxed text-brand-teal">{engagement.description}</p>
                  <h4 className="mt-7 font-bold text-brand-navy">What we can deliver</h4>
                  <ul className="mt-3 space-y-3">
                    {engagement.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex gap-3 leading-relaxed text-brand-teal"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" /><span>{deliverable}</span></li>
                    ))}
                  </ul>
                  <h4 className="mt-7 font-bold text-brand-navy">Bring to the first conversation</h4>
                  <p className="mt-2 leading-relaxed text-brand-teal">{engagement.preparation}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 pt-8">
                    <TrackedLink to={engagement.path} eventName="Service Click" eventSource="services-comparison" className="inline-flex items-center gap-2 font-bold text-brand-navy underline underline-offset-4">
                      {engagement.action} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </TrackedLink>
                    <TrackedLink to={`/contact?focus=${engagement.focus}`} eventSource={`services-enquiry:${engagement.focus}`} className="text-sm font-semibold text-brand-navy underline underline-offset-4">Discuss your project</TrackedLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="working-together" className="border-y border-brand-navy/10 bg-brand-stone/40 px-6 py-20 md:py-28">
          <div className="container">
            <h2 id="working-together" className="max-w-3xl text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">Agree the scope. Test the change. Leave your team ready.</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                ["01", "Start with a focused review", "Discuss the problem, your current setup and the outcome you need. Agree the deliverables, access, responsibilities and commercial terms before work begins."],
                ["02", "Implement with clear checks", "Work through the agreed changes with your team. Define how performance, cost or release reliability will be checked, and how a change can be reversed when needed."],
                ["03", "Hand over what has changed", "Review the result against the starting point. Walk through the configuration, operating instructions and remaining decisions so your team can run and maintain the work."],
              ].map(([number, title, description]) => (
                <article key={number} className="border-t border-brand-navy/20 pt-6">
                  <p className="text-sm font-bold text-brand-teal">{number}</p>
                  <h3 className="mt-4 text-xl font-bold text-brand-navy">{title}</h3>
                  <p className="mt-3 leading-relaxed text-brand-teal">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="first-conversation" className="bg-brand-off-white px-6 py-20 md:py-28">
          <div className="container grid gap-10 lg:grid-cols-2">
            <div>
              <h2 id="first-conversation" className="text-3xl font-bold tracking-tight text-brand-navy">A useful first call starts with your priorities.</h2>
              <p className="mt-5 leading-relaxed text-brand-teal">You do not need a complete specification. Tell us what is happening, who it affects, and what a better result would look like. A short outline of your tools, constraints and timeline is enough to begin.</p>
              <p className="mt-4 leading-relaxed text-brand-teal">Please keep passwords, access keys and customer data out of the enquiry form. If the work needs system access, we agree the permissions and a secure way to provide it separately.</p>
              <TrackedLink to="/contact" eventSource="services-first-call" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 font-bold text-brand-off-white">Book a free consultation <ArrowRight className="h-4 w-4" aria-hidden="true" /></TrackedLink>
            </div>
            <aside className="rounded-3xl bg-brand-mint/50 p-6 md:p-8">
              <h3 className="text-2xl font-bold text-brand-navy">See how the work connects.</h3>
              <p className="mt-4 leading-relaxed text-brand-teal">Our fintech case study covers cloud costs, infrastructure and release delivery in one engagement. Use it to explore the decisions involved and the questions to ask about your own platform.</p>
              <TrackedLink to="/case-studies/fintech-aws-cost-reduction" eventName="Case Study Click" eventSource="services-case-study" className="mt-6 inline-flex items-center gap-2 font-bold text-brand-navy underline underline-offset-4">Read the fintech case study <ArrowRight className="h-4 w-4" aria-hidden="true" /></TrackedLink>
            </aside>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
