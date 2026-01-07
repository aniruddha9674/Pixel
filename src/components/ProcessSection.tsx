import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Palette, Play, Sparkles } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Step {
  word: string;
  description: string;
  icon: LucideIcon;
  number: string;
}

const steps: Step[] = [
  {
    word: "IDEATE",
    description: "Where concepts are born through collaborative exploration and strategic thinking.",
    icon: Lightbulb,
    number: "01",
  },
  {
    word: "DESIGN",
    description: "Crafting visual narratives with precision, artistry, and intentional detail.",
    icon: Palette,
    number: "02",
  },
  {
    word: "ANIMATE",
    description: "Breathing life into every frame through motion that moves audiences.",
    icon: Play,
    number: "03",
  },
  {
    word: "SHOWCASE",
    description: "Delivering polished experiences that captivate and leave lasting impressions.",
    icon: Sparkles,
    number: "04",
  },
];

const ProcessSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextStep = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % steps.length);
      setIsTransitioning(false);
    }, 400);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextStep, 4000);
    return () => clearInterval(interval);
  }, [nextStep]);

  const currentStep = steps[currentIndex];
  const Icon = currentStep.icon;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center px-6 md:px-12">
      {/* Minimal ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      
      {/* Top branding */}
      <motion.header
        className="absolute top-8 md:top-12 left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="text-[10px] md:text-xs tracking-ultra-wide text-muted-foreground uppercase">
          PixelCraft Animation Club
        </span>
      </motion.header>

      {/* Step indicator */}
      <motion.div
        className="absolute top-24 md:top-28 left-0 right-0 flex justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsTransitioning(false);
                }, 400);
              }
            }}
            className="group relative p-2"
            aria-label={`Go to step ${index + 1}`}
          >
            <div
              className={`h-[1px] w-8 md:w-12 transition-all duration-500 ${
                index === currentIndex ? "bg-foreground" : "bg-muted-foreground/30"
              }`}
            />
          </button>
        ))}
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        {/* Step number */}
        <AnimatePresence mode="wait">
          <motion.span
            key={`number-${currentIndex}`}
            className="text-xs md:text-sm tracking-ultra-wide text-muted-foreground mb-6 md:mb-8 font-body"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {currentStep.number} / 04
          </motion.span>
        </AnimatePresence>

        {/* Main headline */}
        <div className="relative h-[120px] md:h-[180px] lg:h-[220px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`headline-${currentIndex}`}
              className="text-[4rem] md:text-[8rem] lg:text-[10rem] font-light tracking-tight leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              initial={{ 
                opacity: 0, 
                y: 60,
                filter: "blur(12px)",
              }}
              animate={{ 
                opacity: isTransitioning ? 0.3 : 1, 
                y: 0,
                filter: isTransitioning ? "blur(4px)" : "blur(0px)",
              }}
              exit={{ 
                opacity: 0, 
                y: -60,
                filter: "blur(12px)",
              }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {currentStep.word}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Icon */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`icon-${currentIndex}`}
            className="mt-8 md:mt-12 mb-6 md:mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" strokeWidth={1.5} />
          </motion.div>
        </AnimatePresence>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${currentIndex}`}
            className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed font-body font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          >
            {currentStep.description}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-muted-foreground/30 to-transparent" />
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <span className="text-[10px] md:text-xs tracking-wide text-muted-foreground/50 font-body">
          Our Creative Process
        </span>
      </motion.footer>
    </section>
  );
};

export default ProcessSection;