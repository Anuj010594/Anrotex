import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { breadcrumbSchema } from "@/lib/seo";

const capabilities = [
  ["Requests that survive retries", "A Python API validates requests, checks ownership and uses atomic DynamoDB writes. Repeating the same request with the same key returns the existing record instead of creating a duplicate."],
  ["Infrastructure your team can review", "Terraform defines API Gateway, Lambda, DynamoDB, scoped IAM permissions, logs, alarms and budget notifications. The infrastructure and application releases have separate review steps."],
  ["A checked path to release", "The release script probes a published candidate before moving the live alias. If the subsequent API Gateway checks fail, it requests restoration of the previous version, guarded against concurrent alias changes."],
  ["Recovery instructions alongside the code", "The project includes a local backup and restore exercise, release failure tests and an operating runbook. The workflow uses temporary AWS credentials through GitHub OIDC."],
];

export default function CloudOperations() {
  return <>
    <SEO title="Cloud Operations: AWS Engineering Project | Anrotex" description="Explore Anrotex’s AWS operations API: Terraform infrastructure, Lambda release checks, rollback tests and a documented recovery procedure." path="/portfolio/cloud-operations" structuredData={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Cloud Operations", path: "/portfolio/cloud-operations" }])]} />
    <Navbar />
    <main className="bg-brand-off-white text-brand-navy">
      <PageHero eyebrow="Built by Anrotex" title="Reliable operations. Checked releases. Clear recovery." description="Cloud Operations brings an authenticated requests API, repeatable AWS infrastructure and a tested release procedure together in one engineering project." />
      <section className="px-6 pb-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <div><h2 className="text-3xl font-bold">The problem we set out to solve</h2><p className="mt-5 leading-relaxed text-brand-teal">A retry should not create a duplicate operation. A deployment should prove that the application works. And a failed release should leave the team with a clear recovery action. We built Cloud Operations to connect those decisions in a small, inspectable system.</p><p className="mt-4 leading-relaxed text-brand-teal">The API records operational requests; it does not execute infrastructure changes submitted by callers.</p></div>
            <aside className="rounded-3xl bg-brand-mint/50 p-6 md:p-8"><h2 className="text-2xl font-bold">Validation completed</h2><p className="mt-4 leading-relaxed text-brand-teal">26 automated tests passed in the local verification run on 27 October 2026, including emulated DynamoDB operations and mocked Lambda release failures. Terraform validation and six configuration assertions also passed.</p><p className="mt-4 text-sm leading-relaxed text-brand-teal">Live AWS deployment, IAM/OIDC access, alarm delivery and cloud recovery remain to be verified.</p></aside>
          </div>
          <figure className="mt-12"><a href="/portfolio/cloud-operations/01-aws-architecture.png" className="block rounded-3xl border border-brand-navy/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal" aria-label="Open the full-size Cloud Operations architecture diagram"><img src="/portfolio/cloud-operations/01-aws-architecture.png" width="1600" height="1100" alt="IAM-authenticated requests pass through API Gateway and the Lambda live alias to DynamoDB. GitHub Actions uses an OIDC release role to check candidates and promote or restore the alias. CloudWatch feeds SNS alerts." className="h-auto w-full rounded-3xl" /></a><figcaption className="mt-3 text-sm text-brand-teal">The AWS design and release path. Open the diagram to inspect it at full size.</figcaption></figure>
          <div className="mt-12 grid gap-6 md:grid-cols-2">{capabilities.map(([title, text]) => <article key={title} className="rounded-3xl border border-brand-navy/15 p-6 md:p-8"><h2 className="text-2xl font-bold">{title}</h2><p className="mt-4 leading-relaxed text-brand-teal">{text}</p></article>)}</div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div><h2 className="text-2xl font-bold">Retry and recovery checks</h2><p className="mt-4 leading-relaxed text-brand-teal">A local exercise sent 100 requests using the same retry key: one record was created and 99 attempts returned it. A separate backup exercise restored 25 records and confirmed that their contents matched.</p><p className="mt-4 leading-relaxed text-brand-teal">These checks demonstrate application behavior under the tested conditions. Live service limits, permissions and recovery timing need their own AWS acceptance tests.</p></div>
            <aside className="rounded-3xl bg-brand-navy p-6 text-brand-off-white md:p-8"><h2 className="text-2xl font-bold">Run the rollback tests yourself</h2><p className="mt-4 leading-relaxed text-brand-stone">Follow the candidate checks, alias promotion and failed-release recovery in our code walkthrough. Download the test files and reproduce the release decisions without an AWS account.</p><TrackedLink to="/blog/aws-lambda-rollback-github-actions" eventName="Article Click" eventSource="cloud-operations-rollback" className="mt-6 inline-flex items-center gap-2 font-bold text-brand-yellow underline underline-offset-4">Read the Lambda rollback guide <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></TrackedLink></aside>
          </div>
        </div>
      </section>
      <section className="bg-brand-stone/60 px-6 py-20">
        <div className="container"><h2 className="text-3xl font-bold">Apply the approach to your workload</h2><p className="mt-5 max-w-3xl leading-relaxed text-brand-teal">Start with an existing AWS workload or one application's release pipeline. We agree the scope, required access and acceptance checks before work starts.</p><div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl bg-brand-off-white p-7"><h3 className="text-2xl font-bold">Review your AWS infrastructure</h3><p className="mt-4 leading-relaxed text-brand-teal">Understand the architecture, cost and reliability priorities for one workload with the US$500 AWS Infrastructure Review.</p><TrackedLink to="/services#aws-review" eventName="Service Click" eventSource="cloud-operations-aws-review" className="mt-5 inline-block font-bold underline underline-offset-4">See review scope and deliverables</TrackedLink><br /><TrackedLink to="/contact?focus=aws-review" eventSource="cloud-operations-aws-enquiry" className="mt-5 inline-flex items-center gap-2 font-bold">Discuss an AWS review <ArrowRight className="h-4 w-4" aria-hidden="true" /></TrackedLink></article>
          <article className="rounded-3xl bg-brand-off-white p-7"><h3 className="text-2xl font-bold">Improve your release pipeline</h3><p className="mt-4 leading-relaxed text-brand-teal">Build, check and deploy one application to an existing AWS staging target with the US$1,500 CI/CD Pipeline Setup.</p><TrackedLink to="/services#cicd-setup" eventName="Service Click" eventSource="cloud-operations-cicd-setup" className="mt-5 inline-block font-bold underline underline-offset-4">See pipeline scope and deliverables</TrackedLink><br /><TrackedLink to="/contact?focus=cicd-setup" eventSource="cloud-operations-cicd-enquiry" className="mt-5 inline-flex items-center gap-2 font-bold">Discuss a pipeline setup <ArrowRight className="h-4 w-4" aria-hidden="true" /></TrackedLink></article>
        </div><p className="mt-7 text-sm text-brand-teal">Need broader infrastructure work? Explore our <TrackedLink to="/devops-consulting" eventName="Service Click" eventSource="cloud-operations-devops" className="font-semibold underline underline-offset-4">DevOps and Terraform services</TrackedLink>.</p></div>
      </section>
    </main><Footer />
  </>;
}
