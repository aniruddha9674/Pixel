import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import  Navigation  from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const upcomingEvents = [
  {
    id: 1,
    title: 'Animation Workshop: Character Design',
    date: 'January 15, 2026',
    time: '4:00 PM - 6:00 PM',
    location: 'Design Studio, Room 302',
    description: 'Learn the fundamentals of character design for animation. From concept sketches to final designs, master the art of creating memorable characters.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    featured: true,
    targetDate: new Date('2026-01-15T16:00:00'),
  },
  {
    id: 2,
    title: 'Motion Graphics Masterclass',
    date: 'January 22, 2025',
    time: '3:00 PM - 5:00 PM',
    location: 'Media Lab',
    description: 'Advanced techniques in After Effects and motion design. Perfect for those ready to level up their motion graphics game.',
    image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=500&fit=crop',
    featured: false,
    targetDate: new Date('2025-01-22T15:00:00'),
  },
  {
    id: 3,
    title: '3D Modeling Basics',
    date: 'February 5, 2025',
    time: '2:00 PM - 5:00 PM',
    location: 'Animation Lab',
    description: 'Start your 3D journey with Blender. Learn modeling fundamentals that will set you up for success.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=500&fit=crop',
    featured: false,
    targetDate: new Date('2025-02-05T14:00:00'),
  },
];

const pastEvents = [
  {
    id: 4,
    title: '3D Animation Bootcamp',
    date: 'December 10, 2024',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=400&fit=crop',
    attendees: 45,
  },
  {
    id: 5,
    title: 'VFX Breakdown Session',
    date: 'November 28, 2024',
    image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&h=400&fit=crop',
    attendees: 62,
  },
  {
    id: 6,
    title: 'Storyboarding Essentials',
    date: 'November 15, 2024',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    attendees: 38,
  },
  {
    id: 7,
    title: 'Industry Talk: Pixar',
    date: 'October 20, 2024',
    image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&h=400&fit=crop',
    attendees: 120,
  },
];

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  return (
    <div className="flex gap-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <motion.div 
            className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-muted/50 border border-primary/30 flex items-center justify-center"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <motion.span 
              key={value}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-display text-2xl md:text-3xl font-bold text-primary"
            >
              {String(value).padStart(2, '0')}
            </motion.span>
          </motion.div>
          <span className="text-xs text-muted-foreground mt-2 block capitalize">{unit}</span>
        </div>
      ))}
    </div>
  );
};

const Events = () => {
  const featuredEvent = upcomingEvents.find(e => e.featured);
  const otherUpcoming = upcomingEvents.filter(e => !e.featured);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navigation />
      
      {/* Hero Section with Featured Event */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24">
        {/* Background image with overlay */}
        {featuredEvent && (
          <>
            <div className="absolute inset-0">
              <img 
                src={featuredEvent.image} 
                alt="" 
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
            </div>

            {/* Animated glow effect */}
            <motion.div
              className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, hsl(25 100% 55% / 0.15) 0%, transparent 70%)' }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </>
        )}

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          {featuredEvent && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Next Workshop
                  </span>
                  
                  <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-foreground">
                    {featuredEvent.title}
                  </h1>
                  
                  <p className="text-lg text-muted-foreground mb-8">
                    {featuredEvent.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>{featuredEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>{featuredEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>{featuredEvent.location}</span>
                    </div>
                  </div>

                  <Button variant="hero" size="xl">
                    Reserve Your Spot
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col items-center"
              >
                <h3 className="text-muted-foreground text-sm uppercase tracking-widest mb-6">Starts In</h3>
                <CountdownTimer targetDate={featuredEvent.targetDate} />
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Other Upcoming Events */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold flex items-center gap-4">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              More <span className="text-gradient">Upcoming</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {otherUpcoming.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="glass rounded-2xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-500 relative">
                  {/* Glow border animation */}
                  <motion.div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, transparent 0%, hsl(25 100% 55% / 0.1) 50%, transparent 100%)',
                    }}
                  />
                  
                  <div className="relative aspect-video overflow-hidden">
                    <motion.img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
                      Upcoming
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        {event.time}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="py-32 relative bg-muted/20">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-muted-foreground">
              Past Events
            </h2>
            <p className="text-muted-foreground mt-2">Moments that shaped our community</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  {/* Hover overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                  >
                    <h3 className="font-display text-lg font-bold text-foreground">{event.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">{event.date}</span>
                      <span className="text-xs text-primary font-medium">{event.attendees} attended</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;