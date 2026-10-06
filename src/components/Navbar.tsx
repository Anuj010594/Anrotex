import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import TrackedLink from "@/components/TrackedLink";

const links = [
  { label: "Services", path: "/services" },
  { label: "Results", path: "/case-studies" },
  { label: "About", path: "/", section: "#team" },
  { label: "Insights", path: "/blog" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navItem = (link: (typeof links)[number], mobile = false) => {
    const classes = mobile
      ? "block w-full py-3 text-left text-base font-medium text-brand-navy"
      : "text-sm font-medium text-brand-navy/70 transition-colors hover:text-brand-navy";

    if (location.pathname === "/" && link.section) {
      return (
        <a key={link.label} href={link.section} className={classes} onClick={() => setOpen(false)}>
          {link.label}
        </a>
      );
    }

    const destination = link.section ? `/${link.section}` : link.path;
    return (
      <Link key={link.label} to={destination} className={classes} onClick={() => setOpen(false)}>
        {link.label}
      </Link>
    );
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-brand-navy/10 bg-brand-off-white/90 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between px-6">
        <Link
          to="/"
          className="group inline-flex items-center gap-2.5 font-heading text-2xl font-bold tracking-[-0.04em] text-brand-navy"
          aria-label="Anrotex home"
        >
          <img
            src="/Anrotex-mark.png"
            alt=""
            width="40"
            height="40"
            decoding="async"
            className="h-10 w-10 shrink-0 object-contain"
            aria-hidden="true"
          />
          <span className="inline-flex items-center gap-2">
            Anrotex
            <span className="h-2.5 w-2.5 rounded-full bg-brand-yellow transition-transform group-hover:scale-125" />
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => navItem(link))}
          <TrackedLink
            to="/contact"
            eventSource="desktop-navigation"
            className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-2.5 text-sm font-semibold text-brand-off-white transition hover:-translate-y-0.5 hover:bg-brand-teal"
          >
            Book a consultation
            <ArrowUpRight className="h-4 w-4" />
          </TrackedLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-navy/15 text-brand-navy md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-brand-navy/10 bg-brand-off-white px-6 pb-7 pt-3 md:hidden">
          <div className="divide-y divide-brand-navy/10">
            {links.map((link) => navItem(link, true))}
          </div>
          <TrackedLink
            to="/contact"
            eventSource="mobile-navigation"
            onClick={() => setOpen(false)}
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-brand-navy px-5 py-3.5 text-sm font-semibold text-brand-off-white"
          >
            Book a consultation
            <ArrowUpRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
