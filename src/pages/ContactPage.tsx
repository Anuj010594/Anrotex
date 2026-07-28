import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Book a DevOps Consultation | Anrotex"
        description="Talk with Anrotex about cloud costs, CI/CD, Kubernetes, reliability, observability, or infrastructure modernization. Reply within one business day."
        path="/contact"
      />
      <Navbar />
      <main className="min-h-screen">
        <PageHero
          eyebrow="Start a conversation"
          title="Talk directly with a DevOps and cloud engineering expert."
          description="Share the bottleneck, risk, or outcome you are working toward. We will respond with useful next steps within one business day."
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
