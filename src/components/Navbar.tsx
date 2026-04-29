import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Services", href: "/services", scroll: "#services" },
  { label: "Case Studies", href: "/case-studies", scroll: "#cases" },
  { label: "Team", href: "/", scroll: "#team" },
  { label: "Contact", href: "/contact", scroll: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container flex items-center justify-between h-20 px-6">
        
        {/* Logo */}
        <Link to="/" className="font-heading text-3xl font-bold tracking-tight">
          <span className="text-primary">Anro</span>tex
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) =>
            location.pathname === "/" ? (
              // On homepage → smooth scroll
              <button
                key={l.label}
                onClick={() => handleScroll(l.scroll)}
                className="text-base text-muted-foreground hover:text-foreground transition"
              >
                {l.label}
              </button>
            ) : (
              // On other pages → route navigation
              <Link
                key={l.label}
                to={l.href}
                className="text-base text-muted-foreground hover:text-foreground transition"
              >
                {l.label}
              </Link>
            )
          )}

          {location.pathname === "/" ? (
            <button
              onClick={() => handleScroll("#contact")}
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition"
            >
              Get started
            </button>
          ) : (
            <Link
              to="/contact"
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition"
            >
              Get started
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-6 space-y-4">
          {links.map((l) =>
            location.pathname === "/" ? (
              <button
                key={l.label}
                onClick={() => {
                  handleScroll(l.scroll);
                  setOpen(false);
                }}
                className="block text-sm text-muted-foreground hover:text-foreground transition"
              >
                {l.label}
              </button>
            ) : (
              <Link
                key={l.label}
                to={l.href}
                onClick={() => setOpen(false)}
                className="block text-sm text-muted-foreground hover:text-foreground transition"
              >
                {l.label}
              </Link>
            )
          )}

          {location.pathname === "/" ? (
            <button
              onClick={() => {
                handleScroll("#contact");
                setOpen(false);
              }}
              className="block px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium text-center"
            >
              Get started
            </button>
          ) : (
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium text-center"
            >
              Get started
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
