import { ArrowRight, Check, GitBranch, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";

const description =
  "Build or improve GitHub Actions, GitLab CI/CD, and Jenkins pipelines. Get practical testing, deployment, rollback, and handover support from Anrotex.";

const deliverables = [
  ["Pipeline assessment", "A map of build times, manual steps, release failures, and access risks, with a prioritized improvement plan."],
  ["Version-controlled workflows", "Build, test, and deployment configuration in your repositories, with reusable steps where they reduce maintenance."],
  ["Release controls", "Agreed quality checks, environment approvals, and artifact promotion so the team knows what is being released."],
  ["Rollback procedures", "Documented recovery steps that account for application versions, configuration, and database compatibility."],
  ["Access and secrets review", "A review of runner access, credentials, and deployment permissions, with changes scoped to your environment."],
  ["Documentation and handover", "Runbooks, troubleshooting guidance, and a walkthrough so your engineers can operate and change the pipeline."],
];

const tools = [
  ["GitHub Actions", "Review workflow triggers, job dependencies, build caching, runners, and environment controls. Keep checks and deployment permissions appropriate to each repository."],
  ["GitLab CI/CD", "Improve pipeline stages, reusable jobs, artifacts, runners, and environment promotion. Make the path from a merge request to a production release explicit."],
  ["Jenkins", "Review Jenkinsfiles, agents, shared libraries, and credentials. Reduce fragile manual steps and document the parts your team needs to maintain."],
];

const process = [
  ["Assess the current release", "Walk through a representative change from commit to production. Review pipeline runs, deployment history, dependencies, and the incidents that matter to your team."],
  ["Agree the scope", "Rank changes by impact and risk. Define the repositories, environments, access, deliverables, and acceptance checks before implementation."],
  ["Implement and validate", "Make changes in small steps. Exercise the proposed release and recovery path in an agreed test environment before a controlled production rollout."],
  ["Measure and hand over", "Compare the agreed measures with the baseline, explain the remaining tradeoffs, and leave the configuration and runbooks with your engineers."],
];

const faqs = [
  ["Can you improve our existing CI/CD pipeline?", "Yes. We start with the current workflow and its bottlenecks. An engagement can focus on slow builds, unreliable releases, manual approvals, or rollback readiness without requiring a tool migration."],
  ["What access do you need?", "An assessment starts with relevant pipeline configuration, run history, and architecture context. We agree the minimum repository, runner, and environment permissions needed before implementation. Production changes follow an agreed rollout plan."],
  ["How do you handle rollbacks and database changes?", "We review application and database compatibility together. A previous application artifact is only useful if it still works with the current schema and configuration. The recovery plan can include a rollback, a forward fix, or a staged migration, depending on the workload."],
  ["How long does an engagement take, and what does it cost?", "Scope depends on the number of repositories and environments, the current tooling, testing gaps, and access requirements. The initial consultation is free. We agree implementation scope, pricing, and timing before work starts."],
  ["Will our team own the pipeline afterwards?", "Yes. The agreed configuration and documentation stay with your team. Handover covers normal releases, common failures, and the recovery steps included in the engagement. Ongoing support can be scoped separately."],
];

export default function CICDAutomation() {
  return (
    <>
      <SEO
        title="CI/CD Automation Services & Pipeline Consulting | Anrotex"
        description={description}
        path="/ci-cd-automation"
        structuredData={[
          serviceSchema({ name: "CI/CD Automation Services", description, path: "/ci-cd-automation", serviceType: "CI/CD pipeline consulting and implementation" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "CI/CD Automation", path: "/ci-cd-automation" },
          ]),
        ]}
      />
      <Navbar />
      <main className="bg-brand-off-white text-brand-navy">
        <section className="px-6 pb-20 pt-32 md:pb-24 md:pt-40">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm font-semibold text-brand-teal">
              <Link to="/">Home</Link><span aria-hidden="true">/</span>
              <Link to="/services">Services</Link><span aria-hidden="true">/</span>
              <span aria-current="page">CI/CD automation</span>
            </nav>
            <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">Founder-led pipeline consulting</p>
                <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  CI/CD automation for faster, safer releases.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-teal">
                  Build or improve GitHub Actions, GitLab CI/CD, and Jenkins pipelines with Anrotex. We help engineering teams remove manual release steps, make failures easier to diagnose, and establish a recovery path they can use.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <TrackedLink to="/contact?focus=cicd" eventSource="cicd-hero" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-6 py-4 font-bold text-brand-off-white transition hover:bg-brand-teal">
                    Discuss your pipeline <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                  <a href="#deliverables" className="inline-flex items-center rounded-full border border-brand-navy/20 px-6 py-4 font-bold transition hover:bg-brand-stone">See what you receive</a>
                </div>
                <p className="mt-5 text-sm text-brand-teal">Free initial consultation · Scope agreed before implementation</p>
              </div>
              <aside className="rounded-[2rem] bg-brand-navy p-7 text-brand-off-white md:p-9" aria-label="A release path your team can operate">
                <GitBranch className="h-8 w-8 text-brand-yellow" aria-hidden="true" />
                <h2 className="mt-6 text-2xl font-bold">A release path your team can operate.</h2>
                <ol className="mt-6 space-y-5">
                  {[
                    ["Build & test", "Find failures before a release reaches users."],
                    ["Promote & deploy", "Know which artifact is moving into each environment."],
                    ["Verify & recover", "Check the outcome and prepare the next action."],
                  ].map(([title, text], index) => (
                    <li key={title} className="flex gap-4 border-t border-brand-mint/20 pt-5">
                      <span className="text-sm font-bold text-brand-yellow">0{index + 1}</span>
                      <div><p className="font-bold">{title}</p><p className="mt-1 text-sm leading-relaxed text-brand-stone">{text}</p></div>
                    </li>
                  ))}
                </ol>
              </aside>
            </div>
          </div>
        </section>

        <section className="border-y border-brand-navy/10 bg-brand-stone/50 px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:gap-16">
            <div><h2 className="text-3xl font-bold tracking-tight">When a pipeline review helps</h2><p className="mt-4 leading-relaxed text-brand-teal">For teams whose delivery process has become a source of delay or operational risk. We can improve an established platform or help put the first repeatable release process in place.</p></div>
            <ul className="space-y-4">
              {["Build queues and repeated work slow down feedback.", "Releases depend on manual steps or one engineer's knowledge.", "Staging and production follow different deployment paths.", "A failed release has no rehearsed recovery procedure."].map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed"><Check className="mt-1 h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="deliverables" className="scroll-mt-24 px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">From assessment to handover</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">What your team receives</h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-brand-teal">We agree the deliverables for your repositories and environments before work starts. Depending on that scope, the engagement includes:</p>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {deliverables.map(([title, text]) => (
                <article key={title} className="rounded-3xl border border-brand-navy/10 p-6"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-brand-teal">{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-mint/40 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Work with the tools you already use</h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-brand-teal">The right starting point is your current release path. A tool migration is a separate decision, based on the constraints it would solve.</p>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {tools.map(([title, text]) => (
                <article key={title} className="border-t border-brand-navy/20 pt-6"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-brand-teal">{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How the engagement works</h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-2">
              {process.map(([title, text], index) => (
                <li key={title} className="flex gap-5"><span className="text-2xl font-bold text-brand-teal">0{index + 1}</span><div><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-brand-teal">{text}</p></div></li>
              ))}
            </ol>
            <div className="mt-12 flex gap-4 rounded-3xl bg-brand-stone/50 p-6 md:p-8">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-brand-teal" aria-hidden="true" />
              <div><h3 className="text-xl font-bold">Agree how improvement will be measured</h3><p className="mt-3 leading-relaxed text-brand-teal">Use your own baseline: build duration, time spent waiting for a release, failed deployments, and recovery time. Validate the agreed changes against comparable runs and document what remains outside the engagement.</p></div>
            </div>
          </div>
        </section>

        <section className="border-y border-brand-navy/10 px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
            <article><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">Related client work</p><h2 className="mt-4 text-2xl font-bold">Safer release flow for a fintech platform</h2><p className="mt-4 leading-relaxed text-brand-teal">Our published fintech case study describes blue-green delivery and Terraform as part of a broader infrastructure engagement. Read the workstreams and the context behind the reported outcomes.</p><TrackedLink to="/case-studies/fintech-aws-cost-reduction" eventName="Case Study Click" eventSource="cicd-evidence" className="mt-5 inline-flex items-center gap-2 font-bold underline underline-offset-4">Read the fintech case study <ArrowRight className="h-4 w-4" aria-hidden="true" /></TrackedLink></article>
            <article><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">Start with your own review</p><h2 className="mt-4 text-2xl font-bold">CI/CD practices to discuss with your team</h2><p className="mt-4 leading-relaxed text-brand-teal">Review the basics of testing, small releases, Infrastructure as Code, and recovery planning before deciding where outside help would be useful.</p><TrackedLink to="/blog/cicd-best-practices" eventName="Article Click" eventSource="cicd-guide" className="mt-5 inline-flex items-center gap-2 font-bold underline underline-offset-4">Read the CI/CD guide <ArrowRight className="h-4 w-4" aria-hidden="true" /></TrackedLink></article>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Questions before an engagement</h2>
            <div className="mt-8 divide-y divide-brand-navy/15">
              {faqs.map(([question, answer]) => (
                <details key={question} className="py-5"><summary className="cursor-pointer text-lg font-bold marker:text-brand-teal">{question}</summary><p className="mt-4 leading-relaxed text-brand-teal">{answer}</p></details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-navy px-6 py-20 text-brand-off-white">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Make your next release easier to operate.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-stone">Tell us which tools you use, what slows releases down, and what your team needs to improve. We will help define a practical next step.</p>
            <TrackedLink to="/contact?focus=cicd" eventSource="cicd-footer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-4 font-bold text-brand-navy transition hover:bg-brand-off-white">Discuss your CI/CD needs <ArrowRight className="h-4 w-4" aria-hidden="true" /></TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
