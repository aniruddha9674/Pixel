import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import  Navigation  from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Zap, Users, Trophy, Rocket, Heart, Star } from 'lucide-react';
import { useState } from 'react';

const skillLevels = [
  {
    level: 'Beginner',
    description: 'New to animation? Perfect! We\'ll teach you everything from scratch.',
    icon: Sparkles,
    gradient: 'from-accent to-accent/60',
  },
  {
    level: 'Intermediate',
    description: 'Know the basics? Level up with advanced techniques and real projects.',
    icon: Zap,
    gradient: 'from-primary to-primary/60',
  },
  {
    level: 'Advanced',
    description: 'Already skilled? Lead projects, mentor others, and build your portfolio.',
    icon: Rocket,
    gradient: 'from-secondary to-secondary/60',
  },
];

const benefits = [
  { icon: Zap, title: 'Weekly Workshops', description: 'Hands-on training sessions every week' },
  { icon: Users, title: 'Collaborative Projects', description: 'Work with talented peers on real projects' },
  { icon: Trophy, title: 'Portfolio Building', description: 'Create work that impresses employers' },
  { icon: Sparkles, title: 'Industry Mentors', description: 'Learn from working professionals' },
  { icon: Heart, title: 'Creative Community', description: 'Find your tribe of fellow animators' },
  { icon: Star, title: 'Recognition', description: 'Showcase your work at festivals and events' },
];

const FloatingInput = ({ 
  id, 
  label, 
  type = 'text',
  ...props 
}: { 
  id: string; 
  label: string; 
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        className="peer w-full px-4 py-4 pt-6 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground"
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value !== '');
        }}
        {...props}
      />
      <label 
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          focused || hasValue 
            ? 'top-2 text-xs text-primary' 
            : 'top-1/2 -translate-y-1/2 text-muted-foreground'
        }`}
      >
        {label}
      </label>
      {/* Focus glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ boxShadow: focused ? '0 0 20px hsl(25 100% 55% / 0.15)' : 'none' }}
        animate={{ opacity: focused ? 1 : 0 }}
      />
    </div>
  );
};

const FloatingSelect = ({ 
  id, 
  label,
  options,
}: { 
  id: string; 
  label: string;
  options: { value: string; label: string }[];
}) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <select
        id={id}
        className="peer w-full px-4 py-4 pt-6 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground appearance-none cursor-pointer"
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value !== '');
        }}
        defaultValue=""
      >
        <option value="" disabled></option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <label 
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          focused || hasValue 
            ? 'top-2 text-xs text-primary' 
            : 'top-1/2 -translate-y-1/2 text-muted-foreground'
        }`}
      >
        {label}
      </label>
      {/* Dropdown arrow */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

const Join = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, hsl(25 100% 55% / 0.4) 0%, transparent 60%)' }}
            animate={{
              scale: [1, 1.3, 1],
              y: [0, -50, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, hsl(280 100% 65% / 0.5) 0%, transparent 60%)' }}
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, 30, 0],
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
            Start Your Animation
            <br />
            <span className="text-gradient">Journey</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            No experience needed. Just creativity, curiosity, and the desire to bring ideas to life.
          </motion.p>
        </div>
      </section>

      {/* Who Can Join - Skill Levels */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Who Can <span className="text-gradient">Join?</span>
            </h2>
            <p className="text-muted-foreground">Everyone. Seriously.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {skillLevels.map((skill, index) => (
              <motion.div
                key={skill.level}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="glass rounded-2xl p-8 border border-border/30 hover:border-primary/50 transition-all duration-500 h-full text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center mx-auto mb-6`}>
                    <skill.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">{skill.level}</h3>
                  <p className="text-muted-foreground">{skill.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What You'll <span className="text-gradient">Get</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-start gap-4 p-5 glass rounded-xl border border-border/30"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Form */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass rounded-3xl p-8 md:p-12 border border-border/30">
                <h2 className="font-display text-3xl font-bold mb-2 text-center">Join PixelCraft</h2>
                <p className="text-muted-foreground text-center mb-10">Fill in your details and we'll reach out!</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FloatingInput id="firstName" label="First Name" />
                    <FloatingInput id="lastName" label="Last Name" />
                  </div>
                  
                  <FloatingInput id="email" label="Email Address" type="email" />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FloatingSelect 
                      id="year" 
                      label="Year of Study"
                      options={[
                        { value: '1', label: '1st Year' },
                        { value: '2', label: '2nd Year' },
                        { value: '3', label: '3rd Year' },
                        { value: '4', label: '4th Year' },
                        { value: 'grad', label: 'Graduate' },
                      ]}
                    />
                    <FloatingSelect 
                      id="skill" 
                      label="Skill Level"
                      options={[
                        { value: 'beginner', label: 'Beginner' },
                        { value: 'intermediate', label: 'Intermediate' },
                        { value: 'advanced', label: 'Advanced' },
                      ]}
                    />
                  </div>

                  <FloatingSelect 
                    id="interest" 
                    label="Primary Interest"
                    options={[
                      { value: '2d', label: '2D Animation' },
                      { value: '3d', label: '3D Animation' },
                      { value: 'motion', label: 'Motion Graphics' },
                      { value: 'vfx', label: 'VFX' },
                      { value: 'story', label: 'Storyboarding' },
                      { value: 'all', label: 'All of the above!' },
                    ]}
                  />

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="hero" 
                      size="xl" 
                      className="w-full relative overflow-hidden"
                      disabled={isSubmitting}
                    >
                      {/* Ripple effect on click */}
                      <motion.span
                        className="absolute inset-0 bg-white/20 rounded-xl"
                        initial={{ scale: 0, opacity: 0.5 }}
                        whileTap={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative z-10">
                        {isSubmitting ? 'Submitting...' : 'Join Now'}
                      </span>
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, hsl(25 100% 55% / 0.15) 0%, hsl(280 100% 65% / 0.15) 50%, hsl(185 100% 50% / 0.1) 100%)',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Still Thinking?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              The best time to start was yesterday. The second best time is now.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <a href="#join-form">Join PixelCraft</a>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/contact">Have Questions?</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Join;