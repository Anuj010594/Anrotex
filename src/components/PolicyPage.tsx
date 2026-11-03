import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageHero from "./PageHero";
import SEO from "./SEO";
import { breadcrumbSchema } from "@/lib/seo";

export default function PolicyPage({ title, description, path, children }: {
  title: string;
  description: string;
  path: string;
  children: ReactNode;
}) {
  return <>
    <SEO title={`${title} | Anrotex`} description={description} path={path} structuredData={breadcrumbSchema([{ name: "Home", path: "/" }, { name: title, path }])} />
    <Navbar />
    <main className="bg-brand-off-white text-brand-navy">
      <PageHero eyebrow="Using our website" title={title} description={description} />
      <div className="container px-6 pb-24">
        <p className="mb-8 text-sm text-brand-teal">Effective 3 November 2026</p>
        <article className="article-content max-w-3xl">{children}</article>
      </div>
    </main>
    <Footer />
  </>;
}
