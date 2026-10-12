import { useEffect, useRef } from "react";

export default function PageLoadError({ retryUrl }: { retryUrl: string }) {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.title = "Please try again | Anrotex";
    heading.current?.focus();
  }, []);

  return (
    <main className="flex min-h-screen items-center bg-brand-off-white px-6 py-20 text-brand-navy">
      <div className="container max-w-2xl">
        <a href="/" className="text-2xl font-bold">Anrotex<span className="text-brand-teal">.</span></a>
        <h1 ref={heading} tabIndex={-1} className="mt-10 text-4xl font-bold tracking-tight outline-none sm:text-5xl">
          We couldn’t open this page.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-brand-teal">
          Please try again. If you need help with your cloud infrastructure or delivery process, you can also email us directly.
        </p>
        <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          {/* A full navigation fetches the current page and its assets after a deployment. */}
          <a href={retryUrl} className="inline-flex rounded-full bg-brand-navy px-7 py-4 font-bold text-brand-off-white hover:bg-brand-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-teal">
            Try again
          </a>
          <a href="mailto:sales@anrotex.com" className="font-semibold underline underline-offset-4">
            Email sales@anrotex.com
          </a>
        </div>
      </div>
    </main>
  );
}
