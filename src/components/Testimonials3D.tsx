import { useState, useEffect, useCallback } from "react";
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

export function Testimonials3D() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
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

        {/* 3D Carousel */}
        <div className="relative max-w-5xl mx-auto perspective-2000">
          <div className="relative flex items-center justify-center min-h-[400px]">
            {testimonials.map((t, i) => {
              const offset = i - current;
              const absOffset = Math.abs(offset);
              const isActive = i === current;

              return (
                <div
                  key={t.id}
                  className="absolute w-full max-w-3xl transition-all duration-700 ease-out cursor-pointer"
                  style={{
                    transform: `
                      perspective(1200px) 
                      translateX(${offset * 120}px) 
                      translateZ(${isActive ? 0 : -200 - absOffset * 80}px)
                      rotateY(${offset * -8}deg)
                      scale(${isActive ? 1 : 0.85 - absOffset * 0.05})
                    `,
                    opacity: absOffset > 2 ? 0 : isActive ? 1 : 0.4,
                    zIndex: testimonials.length - absOffset,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  onClick={() => !isActive && goTo(i)}
                >
                  <div className={`bg-card rounded-3xl border shadow-elegant p-8 md:p-12 transition-all duration-500 ${isActive ? "border-accent/30" : "border-border"}`}>
                    <Quote className="h-10 w-10 text-accent mb-6 opacity-60" />

                    <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-display">
                      "{t.content}"
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full gradient-gold flex items-center justify-center">
                          <Star className="h-3 w-3 text-foreground fill-foreground" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(t.rating)].map((_, j) => (
                            <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />
                          ))}
                        </div>
                        <h4 className="font-display font-bold text-foreground">{t.name}</h4>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                        <p className="text-sm text-primary font-medium">
                          {t.college} | Batch {t.batch}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-border hover:bg-muted hover:border-accent/30 transition-all group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-10 h-3 gradient-gold"
                      : "w-3 h-3 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full border border-border hover:bg-muted hover:border-accent/30 transition-all group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
