import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";


const quickLinks = [
  { name: "About Us", path: "/about" },
  { name: "Admissions", path: "/admissions" },
  { name: "Gallery", path: "/gallery" },
  { name: "Results", path: "/results" },
  { name: "News", path: "/news" },
  { name: "Careers", path: "/careers" },
  { name: "FAQs", path: "/faqs" },
  { name: "Contact", path: "/contact" },
];

const colleges = [
  "SIMS College of Pharmacy",
  "SIMS College of Nursing",
  "SIMS College of Physiotherapy",
  "SIMS College of Education",
  "KSIMS College of Physiotherapy",
  "SIMS College of Life Sciences",
  "Aswini College of Nursing",
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center">
                <span className="font-display text-lg font-bold text-foreground">S</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">SIMS Group</h3>
                <p className="text-sm text-primary-foreground/70">of Institutions</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              A premier educational group committed to excellence in healthcare education, 
              producing skilled professionals for the healthcare industry since establishment.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Colleges */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Our Colleges</h4>
            <ul className="space-y-3">
              {colleges.map((college) => (
                <li key={college}>
                  <span className="text-sm text-primary-foreground/80">{college}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  Guntur-Vijayawada Highway,<br />
                  Beside Reliance Market,<br />
                  Guntur, Andhra Pradesh
                </span>
              </li>
              <li>
                <a href="tel:0863-2225201" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  <Phone className="h-5 w-5 text-accent" />
                  0863-2225201
                </a>
              </li>
              <li>
                <a href="mailto:info@simscollege.ac.in" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  <Mail className="h-5 w-5 text-accent" />
                  info@simscollege.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} SIMS Group of Institutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-accent transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
