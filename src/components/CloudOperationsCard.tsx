import { ArrowRight } from "lucide-react";
import TrackedLink from "./TrackedLink";

export default function CloudOperationsCard({ source }: { source: string }) {
  return (
    <section aria-label="Cloud Operations engineering project" className="px-6 py-16 md:py-20">
      <div className="container">
        <article className="grid overflow-hidden rounded-[2rem] border border-brand-navy/15 bg-brand-off-white lg:grid-cols-2">
          <div className="flex items-center bg-brand-stone/50 p-4 md:p-8">
            <img src="/portfolio/cloud-operations/01-aws-architecture.png" width="1600" height="1100" loading="lazy" decoding="async" alt="Cloud Operations architecture: API Gateway, Lambda, DynamoDB and a GitHub Actions release gate" className="h-auto w-full rounded-xl" />
          </div>
          <div className="p-6 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">Built by Anrotex</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy">Cloud Operations: a release you can check and recover.</h2>
            <p className="mt-5 leading-relaxed text-brand-teal">An AWS operations API with repeatable Terraform infrastructure, candidate checks before release, and a rollback path when the deployed API fails its checks.</p>
            <p className="mt-4 text-sm leading-relaxed text-brand-teal">Explore the architecture, locally verified failure tests and recovery procedure.</p>
            <TrackedLink to="/portfolio/cloud-operations" eventName="Case Study Click" eventSource={`${source}-cloud-operations`} className="mt-6 inline-flex items-center gap-2 font-bold text-brand-navy underline underline-offset-4">Explore the engineering project <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></TrackedLink>
          </div>
        </article>
      </div>
    </section>
  );
}
