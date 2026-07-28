type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

const PageHero = ({ eyebrow, title, description }: PageHeroProps) => (
  <header className="bg-brand-off-white px-6 pb-16 pt-36 md:pb-20 md:pt-44">
    <div className="container">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
        {eyebrow}
      </p>
      <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.045em] text-brand-navy md:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-teal">
        {description}
      </p>
    </div>
  </header>
);

export default PageHero;
