import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSlider3D } from "@/components/HeroSlider3D";
import { Colleges3D } from "@/components/Colleges3D";
import { NewsSection } from "@/components/NewsSection";
import { Testimonials3D } from "@/components/Testimonials3D";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SIMS Group of Institutions | Premier Healthcare Education in Andhra Pradesh</title>
        <meta 
          name="description" 
          content="SIMS Group of Institutions - A premier educational group offering Pharmacy, Nursing, Physiotherapy, Education and Life Sciences programs in Guntur, Andhra Pradesh." 
        />
        <meta name="keywords" content="SIMS College, Pharmacy College Guntur, Nursing College, Physiotherapy College, Healthcare Education, Andhra Pradesh" />
        <link rel="canonical" href="https://simscollege.ac.in" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <HeroSlider3D />
          <Colleges3D />
          <NewsSection />
          <Testimonials3D />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
