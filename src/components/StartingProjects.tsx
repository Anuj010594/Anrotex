import { ArrowRight } from "lucide-react";
import TrackedLink from "./TrackedLink";
import { STARTING_PROJECTS } from "@/lib/starting-projects";

export default function StartingProjects() {
  return (
    <section id="starting-projects" aria-labelledby="starting-projects-heading" className="scroll-mt-24 bg-brand-stone/50 px-6 py-20 md:py-24">
      <div className="container">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">A clear first step</p>
        <h2 id="starting-projects-heading" className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">Start with one project your team needs.</h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-brand-teal">Compare the scope, price and delivery window, then tell us about your workload. We confirm fit and agree the work before you commit.</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {STARTING_PROJECTS.map((project) => (
            <article key={project.focus} className="flex flex-col rounded-3xl border border-brand-navy/15 bg-brand-off-white p-6 md:p-8">
              <h3 className="text-2xl font-bold text-brand-navy">{project.name}</h3>
              <p className="mt-5 text-3xl font-bold text-brand-navy">{project.price}</p>
              <p className="mt-2 text-sm font-semibold text-brand-teal">{project.days} business days</p>
              <p className="mt-5 leading-relaxed text-brand-teal">{project.scope}</p>
              <div className="mt-auto pt-7">
                <TrackedLink to={`/services#${project.focus}`} eventName="Service Click" eventSource={`homepage-${project.focus}`} className="inline-flex items-center gap-2 font-bold text-brand-navy underline underline-offset-4">View scope and next steps <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></TrackedLink>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-brand-teal">Prices are in US dollars. Delivery starts after the scope is agreed and required access and inputs are ready. <TrackedLink to="/services#starting-projects" eventName="Service Click" eventSource="homepage-project-terms" className="font-semibold underline underline-offset-4">See deliverables, exclusions and pricing terms.</TrackedLink></p>
      </div>
    </section>
  );
}
