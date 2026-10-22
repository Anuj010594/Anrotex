import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions" ;
import Services from "@/components/Services";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import Team from "@/components/Team" ;
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => (
  <>
    <SEO
      title="DevOps Consulting & Cloud Cost Optimization | Anrotex"
      description="DevOps consulting for small product teams and development agencies. Improve CI/CD, AWS costs and cloud reliability with hands-on engineering and clear handover."
      path="/"
      imageAlt="Anrotex — DevOps consulting, cloud cost optimization, and platform engineering"
    />
    <Navbar />
    <main>
      <Hero />
      <Solutions />
      <Services />
      <Process />
      <CaseStudies />
      <Team />
      <Contact />
    </main>
    <Footer />
  </>
);

export default Index;
