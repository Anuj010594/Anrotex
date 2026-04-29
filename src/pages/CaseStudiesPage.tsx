import Navbar from "@/components/Navbar";
import CaseStudies from "@/components/CaseStudies";
import Footer from "@/components/Footer";

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <CaseStudies />
      </main>
      <Footer />
    </>
  );
}
