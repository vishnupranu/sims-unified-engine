import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | SIMS Group of Institutions</title>
        <meta 
          name="description" 
          content="Get in touch with SIMS Group of Institutions. Located on Guntur-Vijayawada Highway. Call 0863-2225201 or email info@simscollege.ac.in" 
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
                  Get in Touch
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                  We'd Love to Hear From You
                </h1>
                <p className="text-xl text-primary-foreground/80">
                  Have questions about admissions, courses, or our institutions? 
                  Reach out to us and we'll respond promptly.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-24">
            <div className="container">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                      Contact Information
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Feel free to reach out to us through any of the following channels.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border">
                      <div className="p-3 rounded-xl bg-primary text-primary-foreground">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Address</h3>
                        <p className="text-muted-foreground">
                          Guntur-Vijayawada Highway,<br />
                          Beside Reliance Market,<br />
                          Guntur, Andhra Pradesh
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border">
                      <div className="p-3 rounded-xl bg-secondary text-secondary-foreground">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                        <a href="tel:0863-2225201" className="text-muted-foreground hover:text-primary transition-colors">
                          0863-2225201
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border">
                      <div className="p-3 rounded-xl bg-accent text-foreground">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                        <a href="mailto:info@simscollege.ac.in" className="text-muted-foreground hover:text-primary transition-colors">
                          info@simscollege.ac.in
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border">
                      <div className="p-3 rounded-xl bg-primary text-primary-foreground">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Saturday<br />
                          9:00 AM - 5:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <div className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-elegant">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Full Name *
                          </label>
                          <Input
                            required
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Email Address *
                          </label>
                          <Input
                            required
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Subject *
                          </label>
                          <Input
                            required
                            placeholder="How can we help?"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Message *
                        </label>
                        <Textarea
                          required
                          placeholder="Tell us more about your inquiry..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="min-h-[150px] resize-none"
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full sm:w-auto gradient-gold text-foreground font-semibold">
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Map */}
          <section className="h-96 bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.6716234566!2d80.4538!3d16.3067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDE4JzI0LjEiTiA4MMKwMjcnMTMuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SIMS Location"
            />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
