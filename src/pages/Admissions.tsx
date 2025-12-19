import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight, FileText, CreditCard, GraduationCap, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const programs = [
  { college: "SIMS College of Pharmacy", programs: ["B.Pharm", "D.Pharm", "Pharm.D"] },
  { college: "SIMS College of Nursing", programs: ["B.Sc Nursing", "GNM", "ANM"] },
  { college: "SIMS College of Physiotherapy", programs: ["BPT", "MPT"] },
  { college: "SIMS College of Education", programs: ["B.Ed", "D.Ed"] },
  { college: "SIMS College of Life Sciences", programs: ["B.Sc", "M.Sc"] },
  { college: "Aswini College of Nursing", programs: ["B.Sc Nursing", "GNM"] },
];

const steps = [
  {
    icon: FileText,
    title: "Online Application",
    description: "Fill out the online application form with accurate details.",
  },
  {
    icon: CreditCard,
    title: "Pay Application Fee",
    description: "Submit the application fee through secure online payment.",
  },
  {
    icon: GraduationCap,
    title: "Document Verification",
    description: "Submit required documents for verification process.",
  },
  {
    icon: Calendar,
    title: "Counseling & Admission",
    description: "Attend counseling session and complete admission formalities.",
  },
];

const Admissions = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    program: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted successfully! Our team will contact you shortly.");
    setFormData({ name: "", email: "", phone: "", college: "", program: "" });
  };

  const selectedCollege = programs.find(p => p.college === formData.college);

  return (
    <>
      <Helmet>
        <title>Admissions 2024-25 | SIMS Group of Institutions</title>
        <meta 
          name="description" 
          content="Apply now for admissions at SIMS Group of Institutions. Pharmacy, Nursing, Physiotherapy, Education courses. Online application open for 2024-25 session." 
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="relative py-24 gradient-hero">
            <div className="container relative z-10">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-semibold mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  Admissions Open 2024-25
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                  Begin Your Journey Towards Excellence
                </h1>
                <p className="text-xl text-primary-foreground/80">
                  Take the first step towards a rewarding career in healthcare. 
                  Apply now and join thousands of successful professionals.
                </p>
              </div>
            </div>
          </section>

          {/* Application Form */}
          <section className="py-24">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-16">
                {/* Form */}
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                    Quick Application
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Fill in your details and our admission counselors will reach out to guide you.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        required
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-12"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <Input
                          required
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone Number *
                        </label>
                        <Input
                          required
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Select College *
                      </label>
                      <Select
                        value={formData.college}
                        onValueChange={(value) => setFormData({ ...formData, college: value, program: "" })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Choose a college" />
                        </SelectTrigger>
                        <SelectContent>
                          {programs.map((p) => (
                            <SelectItem key={p.college} value={p.college}>
                              {p.college}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedCollege && (
                      <div className="animate-fade-in">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Select Program *
                        </label>
                        <Select
                          value={formData.program}
                          onValueChange={(value) => setFormData({ ...formData, program: value })}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Choose a program" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedCollege.programs.map((program) => (
                              <SelectItem key={program} value={program}>
                                {program}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <Button type="submit" size="lg" className="w-full gradient-gold text-foreground font-semibold">
                      Submit Application
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      By submitting, you agree to our terms and privacy policy.
                    </p>
                  </form>
                </div>

                {/* Why Choose Us */}
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                    Why Choose SIMS?
                  </h2>

                  <div className="space-y-6">
                    {[
                      "AICTE, PCI, INC approved programs",
                      "Experienced faculty from industry and academia",
                      "State-of-the-art laboratories and simulation centers",
                      "Hospital attachments for clinical training",
                      "100% placement assistance",
                      "Affordable fee structure with scholarships",
                      "Hostel facilities for outstation students",
                      "Industry-integrated curriculum",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <CheckCircle2 className="h-6 w-6 text-secondary shrink-0 mt-0.5" />
                        <span className="text-lg text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 p-8 rounded-3xl bg-muted">
                    <h3 className="font-display text-xl font-bold text-foreground mb-4">
                      Need Help?
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Our admission counselors are here to guide you through the process.
                    </p>
                    <div className="space-y-3">
                      <a href="tel:0863-2225201" className="flex items-center gap-3 text-primary font-medium hover:underline">
                        📞 0863-2225201
                      </a>
                      <a href="mailto:admissions@simscollege.ac.in" className="flex items-center gap-3 text-primary font-medium hover:underline">
                        ✉️ admissions@simscollege.ac.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Admission Process */}
          <section className="py-24 bg-muted/50">
            <div className="container">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                  Simple Steps
                </span>
                <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                  Admission Process
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our streamlined admission process ensures a hassle-free experience for all applicants.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, index) => (
                  <div 
                    key={step.title}
                    className="relative bg-card rounded-2xl border border-border p-8 text-center animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full gradient-gold text-foreground font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 mt-2">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Admissions;
