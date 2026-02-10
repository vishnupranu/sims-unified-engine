import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Shaping the Future of",
    highlight: "Healthcare Education",
    description: "SIMS Group of Institutions — A premier educational group committed to producing world-class healthcare professionals.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=800&fit=crop",
    cta: { text: "Apply for Admission", link: "/admissions" },
  },
  {
    title: "Excellence in",
    highlight: "Pharmacy & Nursing",
    description: "AICTE & PCI approved programs with 100% placement assistance. State-of-the-art laboratories and simulation centers.",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=1200&h=800&fit=crop",
    cta: { text: "Explore Programs", link: "/about" },
  },
  {
    title: "World-Class",
    highlight: "Campus & Facilities",
    description: "Modern infrastructure, digital libraries, hospital attachments, and comfortable hostel accommodations for holistic development.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=800&fit=crop",
    cta: { text: "View Gallery", link: "/gallery" },
  },
  {
    title: "Join 5000+",
    highlight: "Successful Alumni",
    description: "Our graduates are making a difference across the healthcare industry — from Apollo Hospitals to KIMS and beyond.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop",
    cta: { text: "Read Stories", link: "/about" },
  },
];

export function HeroSlider3D() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goTo = useCallback((index: number, dir: "left" | "right") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "right");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "left");
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background images with 3D transition */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            opacity: i === current ? 1 : 0,
            transform: i === current
              ? "perspective(1200px) rotateY(0deg) scale(1)"
              : direction === "right"
                ? "perspective(1200px) rotateY(-15deg) scale(1.1)"
                : "perspective(1200px) rotateY(15deg) scale(1.1)",
          }}
        >
          <img
            src={s.image}
            alt={s.highlight}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 gradient-overlay" />
        </div>
      ))}

      {/* Decorative 3D floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-primary-foreground/5 blur-2xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            key={`badge-${current}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary-foreground/20 mb-8 animate-3d-flip-in"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-sm text-primary-foreground/90 font-medium">Admissions Open 2024-25</span>
          </div>

          {/* Main heading with 3D animation */}
          <h1
            key={`title-${current}`}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-3d-slide-in"
          >
            {slide.title}
            <span className="block text-gradient">{slide.highlight}</span>
          </h1>

          {/* Subheading */}
          <p
            key={`desc-${current}`}
            className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mb-10 animate-3d-slide-in"
            style={{ animationDelay: "0.15s" }}
          >
            {slide.description}
          </p>

          {/* CTA Buttons */}
          <div
            key={`cta-${current}`}
            className="flex flex-wrap gap-4 mb-16 animate-3d-slide-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              size="lg"
              className="gradient-gold text-foreground font-semibold text-lg px-8 py-6 shadow-glow hover:opacity-90 animate-pulse-glow"
              asChild
            >
              <Link to={slide.cta.link}>
                {slide.cta.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6"
              asChild
            >
              <Link to="/about">Explore Colleges</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
        <button
          onClick={prev}
          className="p-3 rounded-full glass text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Dots with progress */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "right" : "left")}
              className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
              style={{ width: i === current ? 32 : 8 }}
              aria-label={`Go to slide ${i + 1}`}
            >
              <div className="absolute inset-0 bg-primary-foreground/30 rounded-full" />
              {i === current && (
                <div className="absolute inset-0 bg-accent rounded-full animate-slide-progress" />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={next}
          className="p-3 rounded-full glass text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 left-8 z-20 glass rounded-full px-4 py-2 text-primary-foreground text-sm font-medium">
        <span className="text-accent font-bold">{String(current + 1).padStart(2, "0")}</span>
        <span className="mx-1 opacity-50">/</span>
        <span className="opacity-70">{String(slides.length).padStart(2, "0")}</span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block">
        <div className="w-8 h-12 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
