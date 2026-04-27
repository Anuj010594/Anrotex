const Footer = () => {
  return (
    <footer className="border-t border-border py-16 px-6 bg-background">
      <div className="container grid md:grid-cols-2 gap-10 items-start">

        {/* LEFT SECTION */}
        <div>
          <h2 className="font-heading text-2xl font-bold tracking-tight mb-4">
            <span className="text-primary">Anro</span>tex
          </h2>

          <p className="text-muted-foreground text-sm mb-6">
            © {new Date().getFullYear()} Anrotex. All rights reserved.
          </p>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Address:</span>{" "}
              Pune, India
            </p>

            <p>
              <span className="font-medium text-foreground">Email:</span>{" "}
              rohan@anrotex.com
            </p>

            <p>
              <span className="font-medium text-foreground">Phone:</span>{" "}
              +91 7972702722
            </p>
          </div>
        </div>

        {/* RIGHT SECTION (EMPTY SPACE FOR BALANCE / FUTURE USE) */}
        <div className="hidden md:block" />

      </div>

      {/* BOTTOM LINE */}
      <div className="mt-12 border-t border-border pt-6 text-center">
        <p className="text-xs text-muted-foreground">
          Built for modern DevOps-driven businesses.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
