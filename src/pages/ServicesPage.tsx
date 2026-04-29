import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Services />
      </main>
      <Footer />
    </>
  );
}
