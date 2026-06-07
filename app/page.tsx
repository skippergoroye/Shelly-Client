import CategorySection from "@/components/landing-page/categories-section";
import FeaturesSection from "@/components/landing-page/features-section";
import Footer from "@/components/landing-page/Footer";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import { TestimonialMarquee } from "@/components/landing-page/testimonial-marquee";



export default function Home() {
  return (
    <main>
      <TestimonialMarquee />
      <Navbar variant="top-14" />
      <Hero />
      <CategorySection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
