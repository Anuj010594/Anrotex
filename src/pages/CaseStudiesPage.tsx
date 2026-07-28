import Navbar from "@/components/Navbar";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";

export default function CaseStudiesPage() {
  return (
    <>
      <SEO
        title="DevOps & Cloud Engineering Case Studies | Anrotex"
        description="See how Anrotex helps engineering teams reduce AWS costs, accelerate releases, migrate to Kubernetes, and improve cloud security and reliability."
        path="/case-studies"
      />
      <Navbar />
      <main className="min-h-screen">
        <PageHero
          eyebrow="Client results"
          title="Cloud engineering outcomes you can measure."
          description="Selected engagements connecting infrastructure improvements to cloud spend, release speed, reliability, and security."
        />
        <CaseStudies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
