import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { CollegesSection } from "@/components/CollegesSection";
import { NewsSection } from "@/components/NewsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
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
          <HeroSection />
          <CollegesSection />
          <NewsSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
