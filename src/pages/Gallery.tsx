import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { X } from "lucide-react";

const categories = ["All", "Campus", "Events", "Labs", "Sports", "Convocation"];

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop", title: "Campus Building", category: "Campus" },
  { id: 2, src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop", title: "Graduation Ceremony", category: "Convocation" },
  { id: 3, src: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=600&h=400&fit=crop", title: "Chemistry Lab", category: "Labs" },
  { id: 4, src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop", title: "Sports Day", category: "Sports" },
  { id: 5, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop", title: "Annual Function", category: "Events" },
  { id: 6, src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop", title: "Library", category: "Campus" },
  { id: 7, src: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&h=400&fit=crop", title: "Pharmacy Lab", category: "Labs" },
  { id: 8, src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop", title: "Nursing Training", category: "Labs" },
  { id: 9, src: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=600&h=400&fit=crop", title: "Classroom", category: "Campus" },
  { id: 10, src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop", title: "Student Seminar", category: "Events" },
  { id: 11, src: "https://images.unsplash.com/photo-1461896836934- voices-d1d7eb7c6b2e?w=600&h=400&fit=crop", title: "Sports Meet", category: "Sports" },
  { id: 12, src: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=600&h=400&fit=crop", title: "Convocation 2023", category: "Convocation" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Photo Gallery | SIMS Group of Institutions</title>
        <meta 
          name="description" 
          content="Explore the photo gallery of SIMS Group of Institutions - campus life, events, laboratories, sports and convocation ceremonies." 
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
                  Photo Gallery
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                  Capturing Moments of Excellence
                </h1>
                <p className="text-xl text-primary-foreground/80">
                  A glimpse into the vibrant campus life, events, and achievements at SIMS.
                </p>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section className="py-24">
            <div className="container">
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                      activeCategory === category
                        ? "gradient-gold text-foreground shadow-glow"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Images Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages.map((image, index) => (
                  <div
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-elegant transition-all animate-scale-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-accent text-foreground text-xs font-medium mb-2">
                          {image.category}
                        </span>
                        <h3 className="text-primary-foreground font-semibold">
                          {image.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Lightbox */}
          {selectedImage && (
            <div 
              className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="absolute top-6 right-6 p-2 rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Gallery;
