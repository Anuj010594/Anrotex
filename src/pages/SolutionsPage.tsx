import Navbar from "@/components/Navbar";
import Solutions from "@/components/Solutions";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";

export default function SolutionsPage() {
  return (
    <>
      <SEO
        title="Cloud Infrastructure Solutions for Growth | Anrotex"
        description="Solve rising cloud costs, unreliable releases, Kubernetes scaling issues, and observability gaps with practical DevOps and platform engineering."
        path="/solutions"
      />
      <Navbar />
      <main className="min-h-screen">
        <PageHero
          eyebrow="Solutions for growing teams"
          title="Remove the infrastructure bottlenecks holding growth back."
          description="We connect cloud and DevOps work to the outcomes that matter: faster releases, lower spend, better reliability, and less operational risk."
        />
        <Solutions />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
