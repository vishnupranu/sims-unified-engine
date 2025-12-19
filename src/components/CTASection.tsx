import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-semibold mb-6">
            Start Your Journey
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Ready to Shape Your
            <span className="block text-gradient">Healthcare Career?</span>
          </h2>
          
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Join thousands of successful professionals who started their journey at SIMS. 
            Admissions are now open for the 2024-25 academic session.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="gradient-gold text-foreground font-semibold text-lg px-8 py-6 shadow-glow hover:opacity-90"
              asChild
            >
              <Link to="/admissions">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6"
              asChild
            >
              <Link to="/contact">
                Contact Admissions
              </Link>
            </Button>
          </div>

          {/* Contact methods */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <a 
              href="tel:0863-2225201"
              className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors"
            >
              <div className="p-2 rounded-full bg-accent text-foreground">
                <Phone className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm text-primary-foreground/70">Call Us</p>
                <p className="text-primary-foreground font-medium">0863-2225201</p>
              </div>
            </a>
            
            <a 
              href="mailto:info@simscollege.ac.in"
              className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors"
            >
              <div className="p-2 rounded-full bg-accent text-foreground">
                <Mail className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm text-primary-foreground/70">Email Us</p>
                <p className="text-primary-foreground font-medium">info@simscollege.ac.in</p>
              </div>
            </a>
            
            <a 
              href="https://wa.me/918632225201"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors"
            >
              <div className="p-2 rounded-full bg-accent text-foreground">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm text-primary-foreground/70">WhatsApp</p>
                <p className="text-primary-foreground font-medium">Chat with Us</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
