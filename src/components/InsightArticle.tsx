import { ArrowRight, Clock3 } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TrackedLink from "@/components/TrackedLink";

type TocItem = {
  id: string;
  label: string;
};

type InsightArticleProps = {
  eyebrow: string;
  title: string;
  description: string;
  published: string;
  updated: string;
  readTime: string;
  toc: TocItem[];
  ctaTitle: string;
  ctaDescription: string;
  ctaHref: string;
  ctaLabel: string;
  children: ReactNode;
};

const InsightArticle = ({
  eyebrow,
  title,
  description,
  published,
  updated,
  readTime,
  toc,
  ctaTitle,
  ctaDescription,
  ctaHref,
  ctaLabel,
  children,
}: InsightArticleProps) => (
  <>
    <Navbar />

    <header className="relative overflow-hidden bg-brand-off-white px-6 pb-16 pt-36 md:pb-20 md:pt-44">
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-brand-stone/70" />
      <div className="container relative">
        <nav
          className="flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-teal"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="transition hover:text-brand-navy">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/blog" className="transition hover:text-brand-navy">
            Insights
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-brand-navy">{eyebrow}</span>
        </nav>

        <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-5xl text-4xl font-bold leading-[1.02] tracking-[-0.05em] text-brand-navy md:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-brand-teal md:text-xl">
          {description}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-brand-navy/65">
          <span>Published {published}</span>
          <span>Updated {updated}</span>
          <span className="inline-flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            {readTime}
          </span>
        </div>
      </div>
    </header>

    <main className="bg-brand-off-white px-6 pb-24 md:pb-32">
      <div className="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-20">
        <article className="article-content min-w-0">{children}</article>

        <aside className="lg:pt-2">
          <div className="space-y-5 lg:sticky lg:top-28">
            <nav
              className="rounded-[1.5rem] border border-brand-navy/10 bg-brand-stone/55 p-6"
              aria-label="Article contents"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">
                In this guide
              </p>
              <ol className="mt-5 space-y-3">
                {toc.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group flex gap-3 text-sm font-semibold leading-snug text-brand-navy/75 transition hover:text-brand-navy"
                    >
                      <span className="text-brand-teal">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="rounded-[1.5rem] bg-brand-navy p-6 text-brand-off-white shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mint">
                Need a second set of eyes?
              </p>
              <h2 className="mt-4 text-2xl font-bold">{ctaTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-stone">
                {ctaDescription}
              </p>
              <TrackedLink
                to={ctaHref}
                eventSource={`article-sidebar:${eyebrow}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-5 py-3 text-sm font-bold text-brand-navy"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <Footer />
  </>
);

export default InsightArticle;
