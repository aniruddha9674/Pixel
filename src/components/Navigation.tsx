import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from "../assets/Logo.jpeg" // Adjust the import path as needed

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Team', path: '/team' },
  { name: 'Events', path: '/events' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activePath, setActivePath] = useState('#about');

  const navRef = useRef(null);
  const bgRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    // Initial entrance animation using vanilla JS for smooth performance
    const nav = navRef.current;
    nav.style.transform = 'translateY(-100px)';
    nav.style.opacity = '0';

    requestAnimationFrame(() => {
      nav.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease';
      nav.style.transform = 'translateY(0)';
      nav.style.opacity = '1';
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = currentScrollY - lastScrollY.current;

          // Update scroll state with smooth background fade
          if (currentScrollY > 50 && !isScrolled) {
            setIsScrolled(true);
            if (bgRef.current) {
              bgRef.current.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
              bgRef.current.style.opacity = '1';
            }
          } else if (currentScrollY <= 50 && isScrolled) {
            setIsScrolled(false);
            if (bgRef.current) {
              bgRef.current.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
              bgRef.current.style.opacity = '0';
            }
          }

          // Handle navbar contraction with debouncing
          if (scrollDifference > 5 && currentScrollY > 100 && isVisible) {
            setIsVisible(false);
            if (navRef.current) {
              navRef.current.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
              navRef.current.style.width = '60%';
              navRef.current.style.borderRadius = '9999px';
              navRef.current.style.marginTop = '1rem';
            }
          } else if (scrollDifference < -5 && !isVisible) {
            setIsVisible(true);
            if (navRef.current) {
              navRef.current.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
              navRef.current.style.width = '100%';
              navRef.current.style.borderRadius = '0px';
              navRef.current.style.marginTop = '0rem';
            }
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled, isVisible]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 mx-auto"
        style={{ width: '100%' }}
      >
        {/* Background layer with fade effect */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-background/80 backdrop-blur-xl border-b border-border/50 rounded-lg"
          style={{ opacity: 0 }}
        />

        {/* Content layer */}
        <div className="relative">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2 group">
                <img
                  src={Logo}
                  alt="PixelCraft Logo"
                  className="w-12 h-12 rounded-lg "
                />
                <span className="font-display font-bold text-xl text-foreground group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  PixelCraft
                </span>
              </a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={() => {

                      setActivePath(link.path);
                    }}
                    className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                  >
                    {link.name}
                    {activePath === link.path && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary animate-fade-in rounded-full" />
                    )}
                  </a>
                ))}
              </div>



              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-foreground p-2 hover:bg-muted/50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-20 z-40 bg-background/95 backdrop-blur-xl border-b border-border md:hidden overflow-hidden animate-slide-up"
        >
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => {

                  setActivePath(link.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-lg font-medium py-2 transition-colors animate-fade-in ${activePath === link.path
                  ? 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
              </a>
            ))}

          </div>
        </div>
      )}
    </>
  );
}