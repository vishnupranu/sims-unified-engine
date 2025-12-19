import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const news = [
  {
    id: 1,
    title: "SIMS Pharmacy College Receives AICTE Approval for New Courses",
    excerpt: "The college has been approved to start two new postgraduate programs in pharmaceutical sciences.",
    date: "Dec 15, 2024",
    category: "Pharmacy",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "National Conference on Modern Nursing Practices Hosted",
    excerpt: "Over 500 nursing professionals attended the two-day conference focusing on patient care innovations.",
    date: "Dec 10, 2024",
    category: "Nursing",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Campus Placement Drive: 95% Students Placed",
    excerpt: "Leading healthcare organizations participated in the annual placement drive with record offers.",
    date: "Dec 5, 2024",
    category: "Placements",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop",
  },
];

const announcements = [
  {
    id: 1,
    title: "Admission Open for 2024-25 Academic Year",
    date: "Ongoing",
    urgent: true,
  },
  {
    id: 2,
    title: "Last Date for Fee Payment - December 31, 2024",
    date: "Dec 31",
    urgent: true,
  },
  {
    id: 3,
    title: "Winter Vacation: December 25 - January 1",
    date: "Dec 25",
    urgent: false,
  },
  {
    id: 4,
    title: "Sports Day Celebration - January 15, 2025",
    date: "Jan 15",
    urgent: false,
  },
];

export function NewsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* News */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2">
                  Latest Updates
                </span>
                <h2 className="font-display text-3xl font-bold text-foreground">
                  News & Events
                </h2>
              </div>
              <Link
                to="/news"
                className="hidden sm:flex items-center gap-2 text-primary font-medium hover:underline"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item, index) => (
                <article
                  key={item.id}
                  className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-elegant transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      {item.date}
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <Link
              to="/news"
              className="sm:hidden flex items-center justify-center gap-2 mt-6 text-primary font-medium"
            >
              View All News
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Announcements */}
          <div>
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-2">
                Important
              </span>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Announcements
              </h2>
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
              {announcements.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-5 hover:bg-muted/50 transition-colors cursor-pointer ${
                    index !== announcements.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {item.urgent && (
                      <span className="relative flex h-2 w-2 mt-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                      </span>
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">
                        {item.title}
                      </h4>
                      <span className="text-sm text-muted-foreground">
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="mt-8 p-6 bg-primary rounded-2xl text-primary-foreground">
              <h3 className="font-display text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/results" className="flex items-center gap-2 hover:text-accent transition-colors">
                    <ArrowRight className="h-4 w-4" />
                    Examination Results
                  </Link>
                </li>
                <li>
                  <Link to="/admissions" className="flex items-center gap-2 hover:text-accent transition-colors">
                    <ArrowRight className="h-4 w-4" />
                    Online Application
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="flex items-center gap-2 hover:text-accent transition-colors">
                    <ArrowRight className="h-4 w-4" />
                    Photo Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="flex items-center gap-2 hover:text-accent transition-colors">
                    <ArrowRight className="h-4 w-4" />
                    Career Opportunities
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
