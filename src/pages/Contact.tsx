import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mail, MapPin, Send, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/pixel_craft_pccoer', color: 'hover:text-pink-500' },

];

const FloatingInput = ({
  id,
  label,
  type = 'text',
  value,
  onChange
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      inputRef.current.style.transform = 'translateY(-2px)';
    } else if (inputRef.current) {
      inputRef.current.style.transform = 'translateY(0)';
    }
  }, [focused]);

  return (
    <div ref={inputRef} className="relative group">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full px-4 py-4 pt-6 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all duration-300 text-foreground"
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${focused || value
            ? 'top-2 text-xs text-primary'
            : 'top-1/2 -translate-y-1/2 text-muted-foreground'
          }`}
      >
        {label}
      </label>
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
        style={{
          boxShadow: focused ? '0 0 0 3px hsl(var(--primary) / 0.1)' : 'none',
          opacity: focused ? 1 : 0
        }}
      />
    </div>
  );
};

const FloatingTextarea = ({
  id,
  label,
  rows = 5,
  value,
  onChange
}: {
  id: string;
  label: string;
  rows?: number;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focused && textareaRef.current) {
      textareaRef.current.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      textareaRef.current.style.transform = 'translateY(-2px)';
    } else if (textareaRef.current) {
      textareaRef.current.style.transform = 'translateY(0)';
    }
  }, [focused]);

  return (
    <div ref={textareaRef} className="relative group">
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full px-4 py-4 pt-6 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all duration-300 text-foreground resize-none"
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${focused || value
            ? 'top-2 text-xs text-primary'
            : 'top-6 text-muted-foreground'
          }`}
      >
        {label}
      </label>
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
        style={{
          boxShadow: focused ? '0 0 0 3px hsl(var(--primary) / 0.1)' : 'none',
          opacity: focused ? 1 : 0
        }}
      />
    </div>
  );
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animations
    const hero = heroRef.current;
    const cards = cardsRef.current;
    const form = formRef.current;

    if (hero) {
      hero.style.opacity = '0';
      hero.style.transform = 'translateY(30px)';
      setTimeout(() => {
        hero.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
      }, 100);
    }

    if (cards) {
      cards.style.opacity = '0';
      cards.style.transform = 'translateX(-30px)';
      setTimeout(() => {
        cards.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        cards.style.opacity = '1';
        cards.style.transform = 'translateX(0)';
      }, 300);
    }

    if (form) {
      form.style.opacity = '0';
      form.style.transform = 'translateX(30px)';
      setTimeout(() => {
        form.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        form.style.opacity = '1';
        form.style.transform = 'translateX(0)';
      }, 400);
    }
  }, []);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Message sent successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
<Navigation />
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Minimal animated background */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
              animation: 'float 8s ease-in-out infinite'
            }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--secondary) / 0.15) 0%, transparent 70%)',
              animation: 'float 10s ease-in-out infinite reverse'
            }}
          />
        </div>

        <div ref={heroRef} className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-8">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </a>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            Get in <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Touch</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? Want to collaborate? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start max-w-6xl mx-auto">

            {/* Contact Info - Left Side */}
            <div ref={cardsRef} className="lg:col-span-2 space-y-6">

              {/* Email Card */}
              <div className="group relative overflow-hidden rounded-2xl p-6 bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <Mail className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">Email Us</h3>
                    <p className="text-muted-foreground">pixelcraft@pccoer.in</p>
                    <p className="text-muted-foreground text-sm mt-1">We reply within 24 hours</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>

              {/* Location Card */}
              <div className="group relative overflow-hidden rounded-2xl p-6 bg-card/50 border border-border/50 hover:border-secondary/50 transition-all duration-500 hover:shadow-lg hover:shadow-secondary/5 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <MapPin className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">PCCOER Building, Room 512</p>
                    <p className="text-muted-foreground text-sm mt-1">College Campus</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/5 to-secondary/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>

              {/* Social Links */}
              <div className="rounded-2xl p-6 bg-card/50 border border-border/50">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Connect With Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`w-12 h-12 rounded-xl bg-muted/50 border border-border/30 flex items-center justify-center text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110 hover:border-current hover:-translate-y-1 hover:shadow-lg`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div ref={formRef} className="lg:col-span-3">
              <div className="rounded-3xl p-8 md:p-10 bg-card/50 border border-border/50 backdrop-blur-sm">
                <h2 className="font-display text-2xl font-bold mb-8">Send a Message</h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FloatingInput
                      id="name"
                      label="Your Name"
                      value={formData.name}
                      onChange={(value) => setFormData({ ...formData, name: value })}
                    />
                    <FloatingInput
                      id="email"
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(value) => setFormData({ ...formData, email: value })}
                    />
                  </div>

                  <FloatingInput
                    id="subject"
                    label="Subject"
                    value={formData.subject}
                    onChange={(value) => setFormData({ ...formData, subject: value })}
                  />

                  <FloatingTextarea
                    id="message"
                    label="Your Message"
                    rows={6}
                    value={formData.message}
                    onChange={(value) => setFormData({ ...formData, message: value })}
                  />

                  <div
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <button
                      onClick={handleSubmit}
                      className="w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-500 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                      disabled={isSubmitting}
                    >
                      {/* Shimmer effect */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700"
                        style={{
                          transform: isHovering ? 'translateX(100%)' : 'translateX(-100%)',
                        }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}