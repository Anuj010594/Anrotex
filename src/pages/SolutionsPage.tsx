import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CloudOperationsCard from "@/components/CloudOperationsCard";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { STARTING_PROJECTS } from "@/lib/starting-projects";

const description = "DevOps support for development agencies delivering client projects. Get help with AWS, release pipelines and Terraform, with agreed scope, testing and handover.";
const projects = [
  { offer: STARTING_PROJECTS[0], path: "/aws-cost-optimization", need: "Your client needs a clearer view of their AWS environment." },
  { offer: STARTING_PROJECTS[1], path: "/ci-cd-automation", need: "The application is ready, but releases still need manual work." },
  { offer: STARTING_PROJECTS[2], path: "/terraform-aws", need: "A new application needs repeatable AWS environments." },
];
const faqs = [
  ["Can you work alongside our developers?", "Yes. Bring us a defined part of the cloud or release work. We agree how our engineers will work with your technical lead, where decisions are recorded and who approves changes."],
  ["Who speaks to our client?", "We agree communication responsibilities before starting. Your agency keeps ownership of its client relationship. If a client discussion needs our engineers, we arrange it with you first."],
  ["Can you help with an existing client environment?", "Yes. Start with the current setup and the change your client needs. Existing infrastructure changes are scoped separately from the Terraform AWS Foundation, which covers new infrastructure."],
  ["Is ongoing support included?", "The starting projects cover the agreed delivery and handover. Ongoing operations, additional environments and later changes need a separate agreement."],
];

export default function SolutionsPage() {
  return (
    <>
      <SEO title="DevOps Support for Development Agencies | Anrotex" description={description} path="/solutions" structuredData={[
        serviceSchema({ name: "DevOps support for development agencies", description, path: "/solutions", serviceType: "Cloud infrastructure delivery for development agencies" }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "For agencies", path: "/solutions" }]),
      ]} />
      <Navbar />
      <main className="bg-brand-off-white text-brand-navy">
        <PageHero eyebrow="For development agencies" title="DevOps support for your next client project." description="Keep your developers focused on the application. Anrotex can take on an agreed part of the AWS, release or Terraform work, alongside your delivery lead." />
        <section className="px-6 pb-20">
          <div className="container grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Bring us the part that needs cloud engineering.</h2>
              <p className="mt-4 leading-relaxed text-brand-teal">A client launch needs infrastructure. A release process has too many manual steps. An existing AWS account needs a review before the next phase. We help you define the work, deliver it and leave the people running it with clear instructions.</p>
              <TrackedLink to="/contact?focus=agency" eventSource="agency-hero" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-4 font-bold text-brand-off-white hover:bg-brand-teal">Discuss a client project <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></TrackedLink>
              <p className="mt-4 text-sm text-brand-teal">Free initial conversation · Scope agreed before work starts</p>
            </div>
            <aside className="rounded-3xl bg-brand-mint/50 p-6 md:p-8">
              <h2 className="text-2xl font-bold">Your client relationship stays with you.</h2>
              <ul className="mt-5 space-y-4">
                {["Your delivery lead sets the priorities and approves the agreed work.", "We agree who can authorize access and changes to each environment.", "Your team receives the configuration, test results and operating instructions."].map(item => <li key={item} className="flex gap-3 leading-relaxed"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </aside>
          </div>
        </section>
        <section aria-labelledby="agency-projects" className="border-y border-brand-navy/10 bg-brand-stone/40 px-6 py-20">
          <div className="container">
            <h2 id="agency-projects" className="text-3xl font-bold tracking-tight md:text-4xl">Start with a defined piece of work.</h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-brand-teal">These starting projects have a clear scope and price. If your client needs something wider, we agree a separate proposal before making changes.</p>
            <div className="mt-9 grid gap-6 lg:grid-cols-3">
              {projects.map(({ offer, path, need }) => <article key={path} className="flex flex-col rounded-3xl border border-brand-navy/15 bg-brand-off-white p-6 md:p-8">
                <p className="leading-relaxed text-brand-teal">{need}</p>
                <h3 className="mt-5 text-2xl font-bold">{offer.name}</h3>
                <p className="mt-4 text-2xl font-bold">{offer.price}</p>
                <p className="mt-2 text-sm text-brand-teal">{offer.days} business days after agreed access and inputs</p>
                <p className="mt-5 leading-relaxed text-brand-teal">{offer.scope}</p>
                <TrackedLink to={path} eventName="Service Click" eventSource={`agency-${offer.focus}`} className="mt-auto inline-flex items-center gap-2 pt-7 font-bold underline underline-offset-4">See scope and deliverables <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></TrackedLink>
              </article>)}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-brand-teal">One-time fees in US dollars. Applicable taxes, cloud usage and third-party licenses are additional. <TrackedLink to="/services#starting-projects" eventName="Service Click" eventSource="agency-project-terms" className="font-semibold underline underline-offset-4">Compare the full scope and exclusions.</TrackedLink></p>
          </div>
        </section>
        <section className="px-6 py-20">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Agree the responsibilities before delivery starts.</h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-2">
              {[
                ["Define the outcome", "Share the application, current infrastructure, deadline and the part your team needs help with. We agree the deliverables, exclusions and how you will check the result."],
                ["Arrange access and approvals", "Name the technical owner and the person who can approve environment changes. Agree the permissions, communication and review steps before providing access."],
                ["Deliver and test", "Review changes with your team and check them in the agreed environment. Production work follows the approved scope and change process."],
                ["Hand over the work", "Walk through the configuration, test results and operating instructions. Record remaining decisions and who owns support after the project."],
              ].map(([title, text], index) => <li key={title} className="border-t border-brand-navy/20 pt-5"><p className="text-sm font-bold text-brand-teal">0{index + 1}</p><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-brand-teal">{text}</p></li>)}
            </ol>
          </div>
        </section>
        <CloudOperationsCard source="agency" />
        <section className="px-6 py-16">
          <div className="container max-w-4xl"><h2 className="text-3xl font-bold">Questions before working together</h2><div className="mt-8 divide-y divide-brand-navy/15">{faqs.map(([question, answer]) => <details key={question} className="py-5"><summary className="cursor-pointer text-lg font-bold">{question}</summary><p className="mt-4 leading-relaxed text-brand-teal">{answer}</p></details>)}</div></div>
        </section>
        <section className="bg-brand-navy px-6 py-20 text-brand-off-white">
          <div className="container max-w-4xl"><h2 className="text-3xl font-bold md:text-4xl">Tell us what your client needs next.</h2><p className="mt-5 max-w-2xl leading-relaxed text-brand-stone">Start with the application, the cloud work involved and your timeline. An outline is enough for the first conversation. Please leave credentials and customer data out of the enquiry.</p><TrackedLink to="/contact?focus=agency" eventSource="agency-footer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-4 font-bold text-brand-navy hover:bg-brand-off-white">Discuss a client project <ArrowRight className="h-4 w-4" aria-hidden="true" /></TrackedLink></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
