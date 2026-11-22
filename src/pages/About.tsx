import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Team from "@/components/Team";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { breadcrumbSchema, guideReviewer, SITE_URL } from "@/lib/seo";

const guides = [
  ["Reduce AWS costs", "/blog/reduce-aws-costs"],
  ["CI/CD best practices", "/blog/cicd-best-practices"],
  ["Kubernetes scaling", "/blog/kubernetes-scaling-best-practices"],
  ["Lambda rollback with GitHub Actions", "/blog/aws-lambda-rollback-github-actions"],
];

export default function About() {
  return <>
    <SEO title="About Anrotex | Cloud & DevOps Engineers" description="Meet the engineers behind Anrotex IT Systems LLP. Based in Pune, India, we help small product teams and development agencies with AWS, Terraform and release delivery." path="/about" structuredData={[
      { "@context": "https://schema.org", "@type": "AboutPage", "@id": `${SITE_URL}/about#webpage`, url: `${SITE_URL}/about`, name: "About Anrotex", mainEntity: { "@id": `${SITE_URL}/#organization` } },
      { "@context": "https://schema.org", ...guideReviewer, worksFor: { "@id": `${SITE_URL}/#organization` } },
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
    ]} />
    <Navbar />
    <main className="bg-brand-off-white text-brand-navy">
      <PageHero eyebrow="About Anrotex" title="Work directly with the engineers building your cloud infrastructure." description="We help small product teams and development agencies with AWS costs, release pipelines and infrastructure. Start with a defined piece of work, agree how it will be checked, and leave your team with code and instructions they can use." />
      <section className="px-6 pb-16">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div><h2 className="text-3xl font-bold">Based in Pune. Working with teams abroad.</h2><p className="mt-5 leading-relaxed text-brand-teal">Anrotex IT Systems LLP is based in Pune, India. We work remotely with product and delivery teams, agreeing communication, system access and responsibilities before a project starts.</p><p className="mt-4 leading-relaxed text-brand-teal">For a product team, that might mean reviewing one AWS workload or improving one release pipeline. For an agency, it can mean delivering the cloud portion of a client project alongside its technical lead.</p><TrackedLink to="/solutions" eventName="Service Click" eventSource="about-agency" className="mt-5 inline-block font-semibold underline underline-offset-4">How we work with development agencies</TrackedLink></div>
          <aside className="rounded-3xl border border-brand-navy/15 bg-brand-stone/60 p-7"><h2 className="text-2xl font-bold">Company details</h2><dl className="mt-5 space-y-4 leading-relaxed"><div><dt className="font-semibold">Registered name</dt><dd>Anrotex IT Systems LLP</dd></div><div><dt className="font-semibold">Location</dt><dd>Pune, India</dd></div><div><dt className="font-semibold">LLPIN</dt><dd>ACY-8754</dd></div><div><dt className="font-semibold">Contact</dt><dd><a href="mailto:sales@anrotex.com" className="underline underline-offset-4">sales@anrotex.com</a><br /><a href="tel:+917972702722" className="underline underline-offset-4">+91 79727 02722</a></dd></div></dl><div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold"><a href="https://www.linkedin.com/company/anrotex-solutions/" className="underline underline-offset-4">LinkedIn</a><a href="https://techbehemoths.com/company/anrotex-it-systems-llp" className="underline underline-offset-4">TechBehemoths</a><a href="https://www.goodfirms.co/company/anrotex-it-systems-llp" className="underline underline-offset-4">GoodFirms</a></div></aside>
        </div>
      </section>
      <Team />
      <section id="anuj-dhadge" className="scroll-mt-28 bg-brand-stone/60 px-6 py-16 md:py-20">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div><p className="text-sm font-semibold">Anuj Dhadge · Co-Founder · DevOps Engineer</p><h2 className="mt-4 text-3xl font-bold">Technical guidance from the people doing the work.</h2><p className="mt-5 leading-relaxed text-brand-teal">Anuj focuses on application architecture and cost optimization. He reviews Anrotex’s guides on AWS costs, release pipelines, Kubernetes scaling and Lambda rollback.</p><p className="mt-4 leading-relaxed text-brand-teal">The guides explain the decisions behind a change, the checks to run and the limits to consider before applying it to your own systems.</p><a href="https://www.linkedin.com/in/anuj-dhadge-929963408/" className="mt-5 inline-block font-semibold underline underline-offset-4">Connect with Anuj on LinkedIn</a></div>
          <div><h3 className="text-xl font-bold">Read the guides</h3><ul className="mt-5 divide-y divide-brand-navy/15">{guides.map(([label, path]) => <li key={path}><TrackedLink to={path} eventName="Article Click" eventSource="about-reviewed-guide" className="flex items-center justify-between gap-4 py-4 font-semibold underline underline-offset-4">{label}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></TrackedLink></li>)}</ul></div>
        </div>
      </section>
      <section className="px-6 py-16 md:py-20"><div className="container"><h2 className="text-3xl font-bold">Explore the work before we talk.</h2><div className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl border border-brand-navy/15 p-7"><h3 className="text-2xl font-bold">Cloud Operations</h3><p className="mt-4 leading-relaxed text-brand-teal">An AWS engineering project connecting an authenticated API, Terraform infrastructure and release recovery. Explore the architecture, code walkthrough and test results.</p><TrackedLink to="/portfolio/cloud-operations" eventName="Case Study Click" eventSource="about-project" className="mt-5 inline-block font-semibold underline underline-offset-4">Explore the engineering project</TrackedLink></article>
        <article className="rounded-3xl border border-brand-navy/15 p-7"><h3 className="text-2xl font-bold">Inside an AWS review</h3><p className="mt-4 leading-relaxed text-brand-teal">See how a review connects resource usage to a recommendation, a cost estimate and checks before making a change.</p><TrackedLink to="/aws-review-preview" eventName="Service Click" eventSource="about-aws-preview" className="mt-5 inline-block font-semibold underline underline-offset-4">See what an AWS review includes</TrackedLink></article>
      </div><div className="mt-10 flex flex-wrap items-center gap-6"><TrackedLink to="/contact" eventSource="about-enquiry" className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-7 py-4 font-semibold text-brand-off-white">Discuss your project<ArrowRight className="h-4 w-4" aria-hidden="true" /></TrackedLink><TrackedLink to="/services#starting-projects" eventName="Service Click" eventSource="about-offers" className="font-semibold underline underline-offset-4">Compare scope and prices</TrackedLink></div></div></section>
    </main><Footer />
  </>;
}
