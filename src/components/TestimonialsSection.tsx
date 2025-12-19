import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "Pharmacist at Apollo Hospitals",
    college: "SIMS College of Pharmacy",
    batch: "2018",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face",
    content: "SIMS provided me with an exceptional foundation in pharmaceutical sciences. The practical exposure and industry connections helped me secure my dream job immediately after graduation.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sanjay Reddy",
    role: "Senior Physiotherapist",
    college: "SIMS College of Physiotherapy",
    batch: "2019",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    content: "The clinical training at SIMS was unparalleled. The faculty's dedication and state-of-the-art facilities prepared me for real-world challenges in physiotherapy practice.",
    rating: 5,
  },
  {
    id: 3,
    name: "Kavitha Naidu",
    role: "Nursing Supervisor at KIMS",
    college: "SIMS College of Nursing",
    batch: "2017",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    content: "SIMS nursing program transformed my career. The compassionate care philosophy and rigorous training made me the healthcare professional I am today.",
    rating: 5,
  },
  {
    id: 4,
    name: "Ramesh Kumar",
    role: "School Principal",
    college: "SIMS College of Education",
    batch: "2016",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    content: "The B.Ed program at SIMS equipped me with innovative teaching methodologies. Their emphasis on practical teaching experience was invaluable for my career in education.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
            Success Stories
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            What Our Alumni Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from our graduates who are making a difference in healthcare and education across the nation.
          </p>
        </div>

        {/* Testimonial carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl border border-border shadow-elegant p-8 md:p-12">
            <Quote className="h-12 w-12 text-accent mb-6" />
            
            <div className="min-h-[200px]">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-display">
                "{testimonials[currentIndex].content}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <h4 className="font-display font-bold text-foreground">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {testimonials[currentIndex].college} | Batch {testimonials[currentIndex].batch}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-border hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-8 bg-accent" : "bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={next}
              className="p-3 rounded-full border border-border hover:bg-muted transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
