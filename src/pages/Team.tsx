import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import  Navigation  from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Linkedin, Twitter, Instagram, Github } from 'lucide-react';
import { useState } from 'react';

const teamMembers = [
  {
    name: 'Alex Rivera',
    role: 'President',
    category: 'core',
    bio: 'Motion designer with a passion for storytelling. Led 3 award-winning student films.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    socials: { linkedin: '#', twitter: '#', instagram: '#' },
  },
  {
    name: 'Maya Chen',
    role: 'Vice President',
    category: 'core',
    bio: '3D artist specializing in character animation. Pixar internship alumna.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    socials: { linkedin: '#', twitter: '#', instagram: '#' },
  },
  {
    name: 'Jordan Lee',
    role: 'Creative Director',
    category: 'core',
    bio: 'VFX enthusiast and visual storyteller. Brings big-screen magic to student projects.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    socials: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    name: 'Priya Sharma',
    role: 'Events Lead',
    category: 'leads',
    bio: 'Organizer extraordinaire with a love for 2D animation. Runs our legendary workshops.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    socials: { linkedin: '#', instagram: '#' },
  },
  {
    name: 'Marcus Johnson',
    role: 'Technical Lead',
    category: 'leads',
    bio: 'Pipeline wizard and render farm keeper. Makes sure nothing crashes (usually).',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Emma Wilson',
    role: 'Community Manager',
    category: 'leads',
    bio: 'Building bridges between creatives. The glue that holds PixelCraft together.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    socials: { linkedin: '#', twitter: '#', instagram: '#' },
  },
  {
    name: 'David Kim',
    role: '2D Animation Lead',
    category: 'leads',
    bio: 'Traditional animator at heart. Frame by frame, story by story.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    socials: { instagram: '#' },
  },
  {
    name: 'Sofia Martinez',
    role: 'Motion Graphics Lead',
    category: 'leads',
    bio: 'After Effects wizard. Turns boring presentations into visual experiences.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    socials: { linkedin: '#', twitter: '#' },
  },
];

const categories = [
  { id: 'all', label: 'Everyone' },
  { id: 'core', label: 'Core Team' },
  { id: 'leads', label: 'Domain Leads' },
];

const SocialIcon = ({ type, href }: { type: string; href: string }) => {
  const icons = {
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
    github: Github,
  };
  const Icon = icons[type as keyof typeof icons];
  if (!Icon) return null;

  return (
    <motion.a
      href={href}
      className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.1 }}
    >
      <Icon className="w-4 h-4" />
    </motion.a>
  );
};

const Team = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredMembers = activeCategory === 'all' 
    ? teamMembers 
    : teamMembers.filter(m => m.category === activeCategory);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, hsl(280 100% 65% / 0.5) 0%, transparent 70%)' }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, hsl(25 100% 55% / 0.4) 0%, transparent 70%)' }}
            animate={{
              scale: [1.2, 1, 1.2],
              y: [0, -30, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
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

          <motion.h1 
            className="font-display text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Meet the <span className="text-gradient">Creators</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            The passionate minds behind PixelCraft, dedicated to making animation accessible to every student.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'glass border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 pb-32">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.name}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group"
              >
                <div className="glass rounded-2xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-500">
                  {/* Image container */}
                  <div className="relative aspect-square overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    {/* Overlay on hover */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                    >
                      <p className="text-foreground text-sm">{member.bio}</p>
                    </motion.div>
                    {/* Default gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
                  </div>
                  
                  {/* Info */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium text-sm mb-4">
                      {member.role}
                    </p>
                    
                    {/* Social icons with staggered animation on hover */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {Object.entries(member.socials).map(([type, href], i) => (
                        <motion.div
                          key={type}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <SocialIcon type={type} href={href} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;