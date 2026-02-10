import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Gallery3D } from "@/components/Gallery3D";

const Gallery = () => {
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
          <section className="relative py-24 gradient-hero overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-accent blur-3xl animate-float" />
              <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-secondary blur-3xl animate-float" style={{ animationDelay: "3s" }} />
            </div>
            <div className="container relative z-10">
              <div className="max-w-3xl">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-semibold mb-6 animate-3d-flip-in">
                  Photo Gallery
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-3d-slide-in">
                  Capturing Moments of
                  <span className="block text-gradient">Excellence</span>
                </h1>
                <p className="text-xl text-primary-foreground/80 animate-3d-slide-in" style={{ animationDelay: "0.15s" }}>
                  A glimpse into the vibrant campus life, events, and achievements at SIMS.
                </p>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section className="py-24">
            <div className="container">
              <Gallery3D />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Gallery;
