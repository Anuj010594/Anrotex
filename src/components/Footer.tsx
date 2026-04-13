const Footer = () => (
  <footer className="border-t border-border py-12 px-6">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-heading text-lg font-bold tracking-tight">
        <span className="text-primary">Anro</span>tex
      </span>
      <p className="text-muted-foreground text-xs">
        © {new Date().getFullYear()} Anrotex. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
