import CategorySection from "@/components/landing-page/categories-section";
import FeaturesSection from "@/components/landing-page/features-section";
import Footer from "@/components/landing-page/Footer";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import TrendingSection from "@/components/landing-page/trending-section";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CategorySection />
      <TrendingSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
