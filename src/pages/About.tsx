import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Target, Eye, Award, Users, BookOpen, Building } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "Striving for the highest standards in education and professional development.",
  },
  {
    icon: Users,
    title: "Compassion",
    description: "Instilling empathy and care as core values in healthcare education.",
  },
  {
    icon: BookOpen,
    title: "Innovation",
    description: "Embracing modern teaching methodologies and cutting-edge research.",
  },
  {
    icon: Award,
    title: "Integrity",
    description: "Maintaining ethical standards in all academic and professional endeavors.",
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | SIMS Group of Institutions</title>
        <meta 
          name="description" 
          content="Learn about SIMS Group of Institutions - our mission, vision, values and commitment to excellence in healthcare education since establishment." 
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="relative py-24 gradient-hero">
            <div className="container relative z-10">
              <div className="max-w-3xl">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-semibold mb-6">
                  About Us
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                  Pioneering Healthcare Education Since Establishment
                </h1>
                <p className="text-xl text-primary-foreground/80">
                  SIMS Group of Institutions is committed to producing skilled healthcare professionals 
                  who make a meaningful difference in society.
                </p>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-24">
            <div className="container">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-card rounded-3xl border border-border p-10 shadow-elegant">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-6">
                    <Target className="h-8 w-8" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To provide quality education in healthcare and allied sciences, fostering professional 
                    competence, ethical values, and a spirit of service among students to meet the evolving 
                    needs of the healthcare industry.
                  </p>
                </div>
                
                <div className="bg-card rounded-3xl border border-border p-10 shadow-elegant">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary text-secondary-foreground mb-6">
                    <Eye className="h-8 w-8" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Vision</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To be a nationally recognized institution of excellence in healthcare education, 
                    producing competent professionals who contribute to the advancement of healthcare 
                    services and community well-being.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-24 bg-muted/50">
            <div className="container">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                  Our Values
                </span>
                <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                  Principles That Guide Us
                </h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div 
                    key={value.title}
                    className="bg-card rounded-2xl border border-border p-8 text-center hover:shadow-elegant transition-shadow animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent text-foreground mb-6">
                      <value.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Infrastructure */}
          <section className="py-24">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                    Our Infrastructure
                  </span>
                  <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                    World-Class Facilities for Holistic Learning
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Our campus is equipped with state-of-the-art facilities including modern laboratories, 
                    well-stocked libraries, simulation centers, and comfortable hostels to ensure a 
                    comprehensive learning experience.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Advanced simulation labs for hands-on training",
                      "Digital library with extensive medical literature",
                      "Hospital attachments for clinical exposure",
                      "Sports facilities and recreational areas",
                      "Comfortable hostel accommodations",
                      "Modern auditoriums and seminar halls",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop" 
                    alt="Campus building" 
                    className="rounded-2xl shadow-elegant"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop" 
                    alt="Library" 
                    className="rounded-2xl shadow-elegant mt-8"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=400&h=300&fit=crop" 
                    alt="Laboratory" 
                    className="rounded-2xl shadow-elegant"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=400&h=300&fit=crop" 
                    alt="Classroom" 
                    className="rounded-2xl shadow-elegant mt-8"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
