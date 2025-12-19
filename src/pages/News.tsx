import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const news = [
  {
    id: 1,
    title: "SIMS Pharmacy College Receives AICTE Approval for New Courses",
    excerpt: "The college has been approved to start two new postgraduate programs in pharmaceutical sciences, expanding our academic offerings.",
    content: "In a significant development, SIMS College of Pharmacy has received approval from AICTE to introduce two new postgraduate programs...",
    date: "Dec 15, 2024",
    category: "Pharmacy",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&h=400&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "National Conference on Modern Nursing Practices Successfully Hosted",
    excerpt: "Over 500 nursing professionals attended the two-day conference focusing on patient care innovations and evidence-based practices.",
    date: "Dec 10, 2024",
    category: "Nursing",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Campus Placement Drive: 95% Students Placed",
    excerpt: "Leading healthcare organizations participated in the annual placement drive with record offers for our graduating batch.",
    date: "Dec 5, 2024",
    category: "Placements",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
  },
  {
    id: 4,
    title: "New Simulation Lab Inaugurated at Physiotherapy College",
    excerpt: "The state-of-the-art simulation lab equipped with latest equipment will enhance practical training for physiotherapy students.",
    date: "Nov 28, 2024",
    category: "Physiotherapy",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&h=400&fit=crop",
  },
  {
    id: 5,
    title: "SIMS Students Win Inter-College Sports Championship",
    excerpt: "Our students brought glory to the institution by winning the overall championship in the inter-college sports competition.",
    date: "Nov 20, 2024",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
  },
  {
    id: 6,
    title: "MoU Signed with Leading Healthcare Chain",
    excerpt: "A memorandum of understanding has been signed with Apollo Hospitals for enhanced clinical training and placement opportunities.",
    date: "Nov 15, 2024",
    category: "Partnerships",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=400&fit=crop",
  },
];

const News = () => {
  const featuredNews = news.find(n => n.featured);
  const regularNews = news.filter(n => !n.featured);

  return (
    <>
      <Helmet>
        <title>News & Events | SIMS Group of Institutions</title>
        <meta 
          name="description" 
          content="Latest news, events, and announcements from SIMS Group of Institutions. Stay updated with campus activities and achievements." 
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
                  News & Events
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                  Latest Updates from SIMS
                </h1>
                <p className="text-xl text-primary-foreground/80">
                  Stay informed about our achievements, events, and announcements.
                </p>
              </div>
            </div>
          </section>

          {/* Featured News */}
          {featuredNews && (
            <section className="py-16">
              <div className="container">
                <div className="grid lg:grid-cols-2 gap-8 items-center bg-card rounded-3xl border border-border overflow-hidden shadow-elegant">
                  <div className="relative h-64 lg:h-full">
                    <img
                      src={featuredNews.image}
                      alt={featuredNews.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-accent text-foreground text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {featuredNews.category}
                      </span>
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {featuredNews.date}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                      {featuredNews.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6">
                      {featuredNews.excerpt}
                    </p>
                    <button className="flex items-center gap-2 text-primary font-medium hover:underline">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* All News */}
          <section className="py-16 bg-muted/50">
            <div className="container">
              <h2 className="font-display text-3xl font-bold text-foreground mb-12">
                All News & Updates
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularNews.map((item, index) => (
                  <article
                    key={item.id}
                    className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-elegant transition-all animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4" />
                        {item.date}
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2 mb-4">
                        {item.excerpt}
                      </p>
                      <button className="flex items-center gap-2 text-primary font-medium hover:underline">
                        Read More
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </article>
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

export default News;
