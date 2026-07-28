import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="DevOps & Cloud Engineering Services | Anrotex"
        description="Explore DevOps consulting, AWS cost optimization, Kubernetes reliability, CI/CD automation, observability, and Infrastructure as Code services."
        path="/services"
      />
      <Navbar />
      <main className="min-h-screen">
        <PageHero
          eyebrow="Cloud and platform engineering"
          title="DevOps services built around measurable outcomes."
          description="Fix delivery bottlenecks, strengthen cloud reliability, and control infrastructure costs with senior engineers working directly with your team."
        />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
