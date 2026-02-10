import { ArrowRight, Pill, Heart, Activity, BookOpen, Microscope, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState, type MouseEvent } from "react";

const colleges = [
  {
    name: "SIMS College of Pharmacy",
    description: "Producing skilled pharmacists with cutting-edge knowledge in pharmaceutical sciences.",
    icon: Pill,
    color: "from-[hsl(280,60%,45%)] to-[hsl(280,60%,35%)]",
    iconBg: "bg-pharmacy",
    tagColor: "bg-pharmacy/10 text-pharmacy border-pharmacy/20",
    path: "/colleges/pharmacy",
    programs: ["B.Pharm", "D.Pharm", "Pharm.D"],
  },
  {
    name: "SIMS College of Nursing",
    description: "Training compassionate nurses equipped to provide excellent patient care.",
    icon: Heart,
    color: "from-[hsl(340,65%,47%)] to-[hsl(340,65%,37%)]",
    iconBg: "bg-nursing",
    tagColor: "bg-nursing/10 text-nursing border-nursing/20",
    path: "/colleges/nursing",
    programs: ["B.Sc Nursing", "GNM", "ANM"],
  },
  {
    name: "SIMS College of Physiotherapy",
    description: "Developing expert physiotherapists for rehabilitation and wellness.",
    icon: Activity,
    color: "from-[hsl(200,70%,45%)] to-[hsl(200,70%,35%)]",
    iconBg: "bg-physiotherapy",
    tagColor: "bg-physiotherapy/10 text-physiotherapy border-physiotherapy/20",
    path: "/colleges/physiotherapy",
    programs: ["BPT", "MPT"],
  },
  {
    name: "SIMS College of Education",
    description: "Preparing future educators with modern teaching methodologies.",
    icon: BookOpen,
    color: "from-[hsl(150,50%,40%)] to-[hsl(150,50%,30%)]",
    iconBg: "bg-education",
    tagColor: "bg-education/10 text-education border-education/20",
    path: "/colleges/education",
    programs: ["B.Ed", "D.Ed"],
  },
  {
    name: "SIMS College of Life Sciences",
    description: "Exploring biological sciences with research-oriented education.",
    icon: Microscope,
    color: "from-[hsl(120,45%,40%)] to-[hsl(120,45%,30%)]",
    iconBg: "bg-life-sciences",
    tagColor: "bg-life-sciences/10 text-life-sciences border-life-sciences/20",
    path: "/colleges/life-sciences",
    programs: ["B.Sc", "M.Sc"],
  },
  {
    name: "Aswini College of Nursing",
    description: "Excellence in nursing education with hands-on clinical training.",
    icon: Stethoscope,
    color: "from-[hsl(340,65%,47%)] to-[hsl(340,65%,37%)]",
    iconBg: "bg-nursing",
    tagColor: "bg-nursing/10 text-nursing border-nursing/20",
    path: "/colleges/aswini-nursing",
    programs: ["B.Sc Nursing", "GNM"],
  },
];

function Card3D({ college, index }: { college: typeof colleges[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 20;
    const rotateY = (x - 0.5) * 20;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
    setGlare({ x: x * 100, y: y * 100, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <Link
      to={college.path}
      className="block animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-card rounded-2xl border border-border p-8 shadow-sm transition-all duration-300 ease-out overflow-hidden group"
        style={{ transform, transformStyle: "preserve-3d" }}
      >
        {/* Glare effect */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, hsla(0,0%,100%,${glare.opacity}), transparent 60%)`,
          }}
        />

        {/* Floating icon with 3D lift */}
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${college.iconBg} text-primary-foreground mb-6 transition-transform duration-300 group-hover:translate-y-[-4px]`}
          style={{ transform: "translateZ(30px)" }}
        >
          <college.icon className="h-7 w-7" />
        </div>

        {/* Content */}
        <h3
          className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors"
          style={{ transform: "translateZ(20px)" }}
        >
          {college.name}
        </h3>
        <p className="text-muted-foreground mb-6" style={{ transform: "translateZ(10px)" }}>
          {college.description}
        </p>

        {/* Programs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {college.programs.map((program) => (
            <span
              key={program}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${college.tagColor}`}
            >
              {program}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <div className="flex items-center text-primary font-medium">
          <span>Learn More</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
        </div>

        {/* Bottom gradient line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${college.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />
      </div>
    </Link>
  );
}

export function Colleges3D() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Our Institutions
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Excellence Across Multiple
            <span className="text-gradient"> Healthcare Disciplines</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            SIMS Group comprises seven specialized institutions, each dedicated to producing
            skilled professionals in their respective fields.
          </p>
        </div>

        {/* 3D Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college, index) => (
            <Card3D key={college.path} college={college} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-foreground font-semibold shadow-glow hover:opacity-90 transition-opacity animate-pulse-glow"
          >
            Apply for 2024-25 Session
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
