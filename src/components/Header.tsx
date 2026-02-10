import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const colleges = [{
  name: "SIMS College of Pharmacy",
  path: "/colleges/pharmacy"
}, {
  name: "SIMS College of Nursing",
  path: "/colleges/nursing"
}, {
  name: "SIMS College of Physiotherapy",
  path: "/colleges/physiotherapy"
}, {
  name: "SIMS College of Education",
  path: "/colleges/education"
}, {
  name: "KSIMS College of Physiotherapy",
  path: "/colleges/ksims-physiotherapy"
}, {
  name: "SIMS College of Life Sciences",
  path: "/colleges/life-sciences"
}, {
  name: "Aswini College of Nursing",
  path: "/colleges/aswini-nursing"
}];
const navLinks = [{
  name: "Home",
  path: "/"
}, {
  name: "About Us",
  path: "/about"
}, {
  name: "Colleges",
  path: "#",
  hasDropdown: true
}, {
  name: "Admissions",
  path: "/admissions"
}, {
  name: "Gallery",
  path: "/gallery"
}, {
  name: "Results",
  path: "/results"
}, {
  name: "News",
  path: "/news"
}, {
  name: "Careers",
  path: "/careers"
}, {
  name: "Contact",
  path: "/contact"
}];
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collegesOpen, setCollegesOpen] = useState(false);
  const location = useLocation();
  return <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="gradient-hero">
        <div className="container flex items-center justify-between py-2 text-sm text-primary-foreground">
          <div className="flex items-center gap-6">
            <a href="tel:0863-2225201" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">0863-2225201</span>
            </a>
            <a href="mailto:info@simscollege.ac.in" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">info@simscollege.ac.in</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth" className="hover:text-accent transition-colors font-medium">
              Student Portal
            </Link>
            <Link to="/auth" className="hover:text-accent transition-colors font-medium">
              Faculty Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center">
              <span className="font-display text-lg font-bold text-foreground">S</span>
            </div>
            <div className="hidden md:block">
              <h1 className="font-display text-lg font-bold text-primary leading-tight">SIMS Group</h1>
              <p className="text-xs text-muted-foreground">of Institutions</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => <div key={link.name} className="relative group">
                {link.hasDropdown ? <button className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors hover:bg-muted hover:text-primary ${location.pathname.includes("/colleges") ? "text-primary bg-muted" : "text-foreground"}`} onMouseEnter={() => setCollegesOpen(true)} onMouseLeave={() => setCollegesOpen(false)}>
                    {link.name}
                    <ChevronDown className="h-4 w-4" />
                  </button> : <Link to={link.path} className={`px-4 py-2 rounded-lg font-medium transition-colors hover:bg-muted hover:text-primary ${location.pathname === link.path ? "text-primary bg-muted" : "text-foreground"}`}>
                    {link.name}
                  </Link>}

                {/* Dropdown for colleges */}
                {link.hasDropdown && <div className={`absolute top-full left-0 mt-1 w-72 bg-card rounded-lg shadow-elegant border border-border overflow-hidden transition-all duration-200 ${collegesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`} onMouseEnter={() => setCollegesOpen(true)} onMouseLeave={() => setCollegesOpen(false)}>
                    {colleges.map(college => <Link key={college.path} to={college.path} className="block px-4 py-3 text-sm hover:bg-muted transition-colors border-b border-border last:border-0">
                        {college.name}
                      </Link>)}
                  </div>}
              </div>)}
          </div>

          {/* CTA Button */}
          <Button className="hidden lg:inline-flex gradient-gold text-foreground font-semibold hover:opacity-90 shadow-glow">
            Apply Now
          </Button>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && <div className="lg:hidden bg-card border-t border-border">
            <div className="container py-4 space-y-2">
              {navLinks.map(link => <div key={link.name}>
                  {link.hasDropdown ? <div className="space-y-1">
                      <button className="flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium hover:bg-muted" onClick={() => setCollegesOpen(!collegesOpen)}>
                        {link.name}
                        <ChevronDown className={`h-4 w-4 transition-transform ${collegesOpen ? "rotate-180" : ""}`} />
                      </button>
                      {collegesOpen && <div className="pl-4 space-y-1">
                          {colleges.map(college => <Link key={college.path} to={college.path} className="block px-4 py-2 text-sm rounded-lg hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
                              {college.name}
                            </Link>)}
                        </div>}
                    </div> : <Link to={link.path} className="block px-4 py-3 rounded-lg font-medium hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
                      {link.name}
                    </Link>}
                </div>)}
              <Button className="w-full mt-4 gradient-gold text-foreground font-semibold">
                Apply Now
              </Button>
            </div>
          </div>}
      </nav>
    </header>;
}