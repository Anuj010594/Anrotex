import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#cases" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container flex items-center justify-between h-20 px-6">
        <a href="#" className="font-heading text-3xl font-bold tracking-tight">
          <span className="text-primary">Anro</span>tex
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-base text-muted-foreground hover:text-foreground transition">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition">
            Get started
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-6 space-y-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground transition">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="block px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium text-center">
            Get started
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
