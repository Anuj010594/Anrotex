import { ArrowUpRight, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const serviceLinks = [
  { label: "DevOps consulting", href: "/devops-consulting" },
  { label: "AWS cost optimization", href: "/aws-cost-optimization" },
  { label: "Kubernetes scaling", href: "/kubernetes-scaling" },
  { label: "CI/CD automation", href: "/ci-cd-automation" },
];

const companyLinks = [
  { label: "Case studies", href: "/case-studies" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => (
  <footer className="bg-brand-navy px-6 pb-8 pt-20 text-brand-off-white">
    <div className="container">
      <div className="grid gap-12 border-b border-brand-mint/20 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-3xl font-bold tracking-[-0.04em]"
          >
            Anrotex
            <span className="h-2.5 w-2.5 rounded-full bg-brand-yellow" />
          </Link>
          <a
            href="https://www.linkedin.com/company/anrotex-solutions/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-fit items-center gap-2 text-sm text-brand-stone transition hover:text-brand-off-white"
            aria-label="Follow Anrotex Solutions on LinkedIn"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>
          <p className="mt-5 max-w-md leading-relaxed text-brand-stone">
            Founder-led cloud, DevOps, and platform engineering for teams that
            need to ship faster, run reliably, and spend less.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 font-bold text-brand-yellow"
          >
            Book a free strategy call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mint">
            Services
          </h3>
          <div className="mt-5 space-y-3">
            {serviceLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-sm text-brand-stone transition hover:text-brand-off-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mint">
            Company
          </h3>
          <div className="mt-5 space-y-3">
            {companyLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-sm text-brand-stone transition hover:text-brand-off-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-7 space-y-2 text-sm text-brand-stone">
            <a href="mailto:rohan@anrotex.com" className="block hover:text-brand-off-white">
              rohan@anrotex.com
            </a>
            <a href="tel:+917972702722" className="block hover:text-brand-off-white">
              +91 79727 02722
            </a>
            <p>Pune, India</p>
            <p className="font-semibold text-brand-off-white">LLPIN : ACY-8754</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-7 text-xs text-brand-stone sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Anrotex. All rights reserved.</p>
        <p>Cloud engineering with measurable outcomes.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
