import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { STARTING_PROJECTS } from "@/lib/starting-projects";

const [, , foundation] = STARTING_PROJECTS;
const description = `Terraform AWS setup for one containerized application on ECS Fargate. ${foundation.price} for staging and production configuration, checks, documentation and handover.`;
const faqs = [
  ["What kind of application fits this project?", "A stateless HTTP application with a working container image and health endpoint. Stateless means the application does not rely on files stored inside a running container to retain customer data. We confirm the application's dependencies before agreeing the scope."],
  ["Can our application connect to an existing database?", "Tell us which database and other services the application uses, where they run and how it connects to them. We review those dependencies before confirming fit. Creating a database, moving data or changing an existing database is outside the foundation's fixed scope."],
  ["Does the foundation include Kubernetes or several AWS accounts?", "The fixed-price foundation uses ECS Fargate in one AWS account and region. Kubernetes, EKS, multiple accounts and multiple regions need a separate design and quote."],
  ["Can you bring our existing AWS resources into Terraform?", "That needs a separate scope. This foundation creates new infrastructure. Importing existing resources requires a review of ownership, dependencies and the risk of changing running services."],
  ["Does the price include AWS running costs?", "No. We prepare a running-cost estimate and agree a budget before provisioning. AWS usage, applicable taxes and third-party licenses are additional to the project fee. Actual usage can differ from the estimate."],
  ["Will you move our live traffic or build a deployment pipeline?", "Live traffic cutover and CI/CD pipeline creation are separate projects. This engagement validates the supplied application in staging and provisions the agreed production infrastructure after approval."],
  ["Who owns the Terraform code and access afterwards?", "Your team receives the project configuration and operating instructions. Handover covers the remote state location, access, environment settings and how to review a proposed change before applying it. Ongoing operations need a separate agreement."],
];

export default function TerraformAWS() {
  return (
    <>
      <SEO title="Terraform AWS Setup & Consulting | Anrotex" description={description} path="/terraform-aws" structuredData={[
        serviceSchema({ name: foundation.name, description, path: "/terraform-aws", serviceType: "Terraform AWS infrastructure setup" }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Terraform AWS setup", path: "/terraform-aws" }]),
      ]} />
      <Navbar />
      <main className="bg-brand-off-white text-brand-navy">
        <PageHero eyebrow="Terraform AWS Foundation" title="Terraform AWS setup for your next application." description="Give your team AWS environments they can review, rebuild and maintain. We use Terraform to define the infrastructure in code, then test the agreed setup and hand it over to your engineers." />
        <section id="terraform-foundation" aria-labelledby="foundation-heading" className="scroll-mt-24 px-6 pb-20">
          <div className="container grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <h2 id="foundation-heading" className="text-3xl font-bold">{foundation.name}</h2>
              <p className="mt-5 text-4xl font-bold">{foundation.price}<span className="ml-2 text-sm font-normal">one-time fee</span></p>
              <p className="mt-3 font-semibold text-brand-teal">{foundation.days} business days after agreed access and inputs</p>
              <p className="mt-5 max-w-2xl leading-relaxed text-brand-teal">{foundation.scope}</p>
              <TrackedLink to={`/contact?focus=${foundation.focus}`} eventSource="terraform-hero" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-4 font-bold text-brand-off-white hover:bg-brand-teal">{foundation.action} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></TrackedLink>
              <TrackedLink to="/services#terraform-foundation" eventName="Service Click" eventSource="terraform-project-terms" className="mt-5 block font-semibold underline underline-offset-4">Full scope and pricing terms</TrackedLink>
              <p className="mt-5 text-sm leading-relaxed text-brand-teal">Prices are in US dollars. Applicable taxes, AWS usage and third-party licenses are additional. We confirm fit, scope and the running-cost budget before work starts.</p>
            </div>
            <aside className="rounded-3xl bg-brand-mint/50 p-6 md:p-8">
              <h2 className="text-2xl font-bold">What you receive</h2>
              <ul className="mt-5 space-y-5">{foundation.deliverables.map(item => <li key={item} className="flex gap-3 leading-relaxed"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" /><span>{item}</span></li>)}</ul>
            </aside>
          </div>
        </section>
        <section aria-labelledby="aws-environments" className="border-y border-brand-navy/10 bg-brand-stone/40 px-6 py-20">
          <div className="container">
            <h2 id="aws-environments" className="text-3xl font-bold tracking-tight md:text-4xl">One application. Two environments. A clear path to change.</h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-brand-teal">ECS Fargate runs your application containers without a server fleet for your team to manage. Terraform defines the network, application services and permissions. We agree capacity, access and expected costs before creating resources.</p>
            <figure className="mt-9 rounded-3xl border border-brand-navy/15 bg-brand-off-white p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-2">
                {["Staging", "Production"].map(environment => <div key={environment} className="rounded-2xl border border-brand-navy/15 p-5 md:p-6">
                  <h3 className="text-xl font-bold">{environment}</h3>
                  <ol className="mt-5 space-y-3">
                    {[["Load balancer", "Routes incoming requests to the application."], ["ECS Fargate service", "Runs the supplied container image."], ["Logs and alarms", "Help your team see failures and investigate them."]].map(([title, text]) => <li key={title} className="rounded-xl bg-brand-stone/50 p-4"><p className="font-bold">{title}</p><p className="mt-1 text-sm leading-relaxed text-brand-teal">{text}</p></li>)}
                  </ol>
                  <p className="mt-4 text-sm leading-relaxed text-brand-teal">{environment === "Staging" ? "Check the application before approving production provisioning." : "Provision after approval; moving live traffic is a separate step."}</p>
                </div>)}
              </div>
              <figcaption className="mt-6 text-sm leading-relaxed text-brand-teal">The foundation covers staging and production configuration in one AWS account and region. Network boundaries, capacity and access are agreed for your application. ECR stores the container image; protected remote state records the resources Terraform manages.</figcaption>
            </figure>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {[
                ["Review before changing", "See what Terraform proposes to create, change or remove. Your team can review the plan before it is applied."],
                ["Keep environment settings clear", "Keep staging and production settings distinct so capacity, permissions and changes can be reviewed for the intended environment."],
                ["Protect the record of your infrastructure", "Restrict access to remote state and document where it is stored. State connects the configuration to the AWS resources it manages."],
              ].map(([title, text]) => <article key={title}><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-brand-teal">{text}</p></article>)}
            </div>
          </div>
        </section>
        <section className="px-6 py-20">
          <div className="container grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Check whether your application is ready</h2>
              <p className="mt-5 leading-relaxed text-brand-teal">This foundation suits a new web application or API that can run from a container image. Before we agree the project, check that:</p>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-brand-teal">
                <li>The image starts successfully and has an endpoint that reports whether the application is healthy.</li>
                <li>Customer data is kept outside the running container, and you can describe any database or other service it needs.</li>
                <li>You have an AWS account, a preferred region and a budget for running staging and production.</li>
              </ul>
              <p className="mt-4 leading-relaxed text-brand-teal">{foundation.inputs}</p>
              <p className="mt-4 leading-relaxed text-brand-teal">Does the application start locally but stop on ECS? <TrackedLink to="/blog/ecs-fargate-task-keeps-stopping" eventName="Article Click" eventSource="terraform-ecs-troubleshooting" className="font-semibold underline underline-offset-4">Follow the stopped-task diagnosis and startup example.</TrackedLink></p>
              <p className="mt-4 leading-relaxed text-brand-teal">Planning the network budget? <TrackedLink to="/blog/ecs-fargate-nat-gateway-vpc-endpoints" eventName="Article Click" eventSource="terraform-network-costs" className="font-semibold underline underline-offset-4">Compare NAT gateways and private endpoints for Fargate.</TrackedLink></p>
            </div>
            <aside className="rounded-3xl bg-brand-stone/50 p-6 md:p-8"><h2 className="text-2xl font-bold">What needs a separate scope</h2><p className="mt-4 leading-relaxed text-brand-teal">{foundation.exclusions}</p><p className="mt-5 leading-relaxed text-brand-teal">Already running on AWS? <TrackedLink to="/aws-cost-optimization" eventName="Service Click" eventSource="terraform-existing-aws" className="font-semibold underline underline-offset-4">Start with an infrastructure review</TrackedLink> to understand the existing environment.</p></aside>
          </div>
        </section>
        <section className="bg-brand-mint/40 px-6 py-20">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Know how the work will be checked.</h2>
            <ol className="mt-9 grid gap-8 md:grid-cols-3">
              {[
                ["Agree the design and budget", "Review the architecture, required access, expected running costs and the checks that will confirm the work is complete."],
                ["Build and check staging", "Provision the agreed staging infrastructure and check the supplied application's health endpoint. Review the results before approving production provisioning."],
                ["Provision and hand over", "Create the approved production infrastructure, review a subsequent Terraform plan and walk through the code and operating instructions with your team."],
              ].map(([title, text], index) => <li key={title} className="border-t border-brand-navy/20 pt-5"><p className="text-sm font-bold">0{index + 1}</p><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-brand-navy">{text}</p></li>)}
            </ol>
            <p className="mt-9 max-w-4xl leading-relaxed text-brand-navy">{foundation.acceptance}</p>
          </div>
        </section>
        <section className="px-6 py-20">
          <div className="container grid gap-10 md:grid-cols-2">
            <div><h2 className="text-2xl font-bold">Explore our Terraform work</h2><p className="mt-4 leading-relaxed text-brand-teal">Our Cloud Operations project shows how we use Terraform, access controls and release checks together for a Lambda API. Explore its architecture and test results to see the engineering decisions behind the work.</p><TrackedLink to="/portfolio/cloud-operations" eventName="Case Study Click" eventSource="terraform-project" className="mt-5 inline-flex items-center gap-2 font-bold underline underline-offset-4">Explore Cloud Operations <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></TrackedLink></div>
            <aside className="rounded-3xl border border-brand-navy/15 p-6 md:p-8"><h2 className="text-2xl font-bold">Need a release pipeline too?</h2><p className="mt-4 leading-relaxed text-brand-teal">Once an AWS staging environment is ready, the CI/CD Pipeline Setup can add build checks, deployment and a compatible-version rollback test for one application.</p><TrackedLink to="/ci-cd-automation#cicd-setup" eventName="Service Click" eventSource="terraform-cicd" className="mt-5 inline-block font-bold underline underline-offset-4">See the separate pipeline setup</TrackedLink></aside>
          </div>
        </section>
        <section className="px-6 pb-20">
          <div className="container max-w-4xl"><h2 className="text-3xl font-bold">Questions before getting started</h2><div className="mt-8 divide-y divide-brand-navy/15">{faqs.map(([question, answer]) => <details key={question} className="py-5"><summary className="cursor-pointer text-lg font-bold">{question}</summary><p className="mt-4 leading-relaxed text-brand-teal">{answer}</p></details>)}</div></div>
        </section>
        <section className="bg-brand-navy px-6 py-20 text-brand-off-white">
          <div className="container max-w-4xl"><h2 className="text-3xl font-bold md:text-4xl">Give your application a maintainable AWS foundation.</h2><p className="mt-5 max-w-2xl leading-relaxed text-brand-stone">Tell us about your application, preferred AWS region and timeline. We will confirm whether this project fits before asking for access.</p><TrackedLink to={`/contact?focus=${foundation.focus}`} eventSource="terraform-footer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-4 font-bold text-brand-navy hover:bg-brand-off-white">{foundation.action} <ArrowRight className="h-4 w-4" aria-hidden="true" /></TrackedLink></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
