import { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

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
  { id: 11, src: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=600&h=400&fit=crop", title: "Convocation 2023", category: "Convocation" },
  { id: 12, src: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop", title: "Healthcare Workshop", category: "Events" },
];

export function Gallery3D() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filteredImages = activeCategory === "All"
    ? images
    : images.filter((img) => img.category === activeCategory);

  const openLightbox = (id: number) => setLightbox(id);
  const closeLightbox = () => setLightbox(null);

  const currentIndex = filteredImages.findIndex((img) => img.id === lightbox);

  const nextImage = useCallback(() => {
    if (currentIndex < filteredImages.length - 1) {
      setLightbox(filteredImages[currentIndex + 1].id);
    } else {
      setLightbox(filteredImages[0].id);
    }
  }, [currentIndex, filteredImages]);

  const prevImage = useCallback(() => {
    if (currentIndex > 0) {
      setLightbox(filteredImages[currentIndex - 1].id);
    } else {
      setLightbox(filteredImages[filteredImages.length - 1].id);
    }
  }, [currentIndex, filteredImages]);

  const currentImage = filteredImages.find((img) => img.id === lightbox);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
              activeCategory === category
                ? "gradient-gold text-foreground shadow-glow scale-105"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 3D Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => openLightbox(image.id)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer card-3d animate-3d-flip-in"
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <img
              src={image.src}
              alt={image.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-3 rounded-full glass scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                  <ZoomIn className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 rounded-full bg-accent text-foreground text-xs font-medium mb-2">
                  {image.category}
                </span>
                <h3 className="text-primary-foreground font-semibold">{image.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3D Lightbox */}
      {lightbox !== null && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-foreground/90 backdrop-blur-sm animate-fade-in" style={{ animationDuration: "0.2s" }} />

          {/* Close button */}
          <button
            className="absolute top-6 right-6 z-10 p-3 rounded-full glass text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation arrows */}
          <button
            className="absolute left-4 md:left-8 z-10 p-3 rounded-full glass text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-4 md:right-8 z-10 p-3 rounded-full glass text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image with 3D entrance */}
          <div
            key={lightbox}
            className="relative max-w-5xl w-full animate-3d-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage.src.replace("w=600", "w=1200").replace("h=400", "h=800")}
              alt={currentImage.title}
              className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent rounded-b-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-accent text-foreground text-xs font-medium mb-2">
                {currentImage.category}
              </span>
              <h3 className="text-primary-foreground text-xl font-display font-bold">{currentImage.title}</h3>
              <p className="text-primary-foreground/70 text-sm mt-1">
                {currentIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
