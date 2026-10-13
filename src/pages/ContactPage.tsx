import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
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
        <Contact standalone />
      </main>
      <Footer />
    </>
  );
}
