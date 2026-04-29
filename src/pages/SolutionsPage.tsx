import Navbar from "@/components/Navbar";
import Solutions from "@/components/Solutions";
import Footer from "@/components/Footer";

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Solutions />
      </main>
      <Footer />
    </>
  );
}
