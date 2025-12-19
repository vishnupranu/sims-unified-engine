import { ArrowRight, Pill, Heart, Activity, BookOpen, Microscope, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const colleges = [
  {
    name: "SIMS College of Pharmacy",
    description: "Producing skilled pharmacists with cutting-edge knowledge in pharmaceutical sciences.",
    icon: Pill,
    color: "bg-pharmacy/10 text-pharmacy border-pharmacy/20",
    iconBg: "bg-pharmacy",
    path: "/colleges/pharmacy",
    programs: ["B.Pharm", "D.Pharm", "Pharm.D"],
  },
  {
    name: "SIMS College of Nursing",
    description: "Training compassionate nurses equipped to provide excellent patient care.",
    icon: Heart,
    color: "bg-nursing/10 text-nursing border-nursing/20",
    iconBg: "bg-nursing",
    path: "/colleges/nursing",
    programs: ["B.Sc Nursing", "GNM", "ANM"],
  },
  {
    name: "SIMS College of Physiotherapy",
    description: "Developing expert physiotherapists for rehabilitation and wellness.",
    icon: Activity,
    color: "bg-physiotherapy/10 text-physiotherapy border-physiotherapy/20",
    iconBg: "bg-physiotherapy",
    path: "/colleges/physiotherapy",
    programs: ["BPT", "MPT"],
  },
  {
    name: "SIMS College of Education",
    description: "Preparing future educators with modern teaching methodologies.",
    icon: BookOpen,
    color: "bg-education/10 text-education border-education/20",
    iconBg: "bg-education",
    path: "/colleges/education",
    programs: ["B.Ed", "D.Ed"],
  },
  {
    name: "SIMS College of Life Sciences",
    description: "Exploring biological sciences with research-oriented education.",
    icon: Microscope,
    color: "bg-life-sciences/10 text-life-sciences border-life-sciences/20",
    iconBg: "bg-life-sciences",
    path: "/colleges/life-sciences",
    programs: ["B.Sc", "M.Sc"],
  },
  {
    name: "Aswini College of Nursing",
    description: "Excellence in nursing education with hands-on clinical training.",
    icon: Stethoscope,
    color: "bg-nursing/10 text-nursing border-nursing/20",
    iconBg: "bg-nursing",
    path: "/colleges/aswini-nursing",
    programs: ["B.Sc Nursing", "GNM"],
  },
];

export function CollegesSection() {
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

        {/* Colleges grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college, index) => (
            <Link
              key={college.path}
              to={college.path}
              className="group relative bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${college.iconBg} text-primary-foreground mb-6`}>
                <college.icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {college.name}
              </h3>
              <p className="text-muted-foreground mb-6">
                {college.description}
              </p>

              {/* Programs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {college.programs.map((program) => (
                  <span
                    key={program}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${college.color}`}
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
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-foreground font-semibold shadow-glow hover:opacity-90 transition-opacity"
          >
            Apply for 2024-25 Session
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
