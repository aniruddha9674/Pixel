"use client"

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Play, Sparkles, ArrowRight, Settings, Zap, RotateCcw, Palette, X } from 'lucide-react';
import { useInView } from 'framer-motion';
import { annotate } from 'rough-notation';

// Built-in cn utility
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

type ComicTextProps = {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  fontSize?: number;
};

function ComicText({
  children,
  className,
  style,
  fontSize = 5,
}: ComicTextProps) {
  const dotColor = "#EF4444";
  const backgroundColor = "#FACC15";

  return (
    <motion.div
      className={cn("text-center select-none", className)}
      style={{
        fontSize: `${fontSize}rem`,
        fontFamily: "'Bangers', 'Comic Sans MS', 'Impact', sans-serif",
        fontWeight: 900,
        WebkitTextStroke: `${fontSize * 0.35}px #000000`,
        transform: "skewX(-10deg)",
        textTransform: "uppercase",
        filter: `
          drop-shadow(5px 5px 0px #000000) 
          drop-shadow(3px 3px 0px ${dotColor})
        `,
        backgroundColor,
        backgroundImage: `radial-gradient(circle at 1px 1px, ${dotColor} 1px, transparent 0)`,
        backgroundSize: "8px 8px",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.175, 0.885, 0.32, 1.275],
        type: "spring",
      }}
    >
      {children}
    </motion.div>
  );
}

// Interactive Hover Button Component
function InteractiveHoverButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="bg-primary h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </button>
  );
}

// Highlighter Component
function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 1,
  padding = 2,
  multiline = true,
  isView = false,
}) {
  const elementRef = useRef(null);
  const annotationRef = useRef(null);

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  });

  const shouldShow = !isView || isInView;

  useEffect(() => {
    if (!shouldShow) return;
    const element = elementRef.current;
    if (!element || annotationRef.current) return;

    const annotation = annotate(element, {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    });

    annotationRef.current = annotation;
    annotation.show();

    const resizeObserver = new ResizeObserver(() => {
      annotation.hide();
      annotation.show();
    });

    resizeObserver.observe(element);

    return () => {
      annotation.remove();
      annotationRef.current = null;
      resizeObserver.disconnect();
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ]);

  return (
    <span ref={elementRef} className="relative inline-block">
      {children}
    </span>
  );
}

// Control Slider Component
function ControlSlider({ label, value, min, max, step = 1, onChange, formatValue = (v) => v }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/70 font-medium">{label}</span>
        <span className="text-xs font-bold text-purple-300">{formatValue(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer 
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:h-4 
          [&::-webkit-slider-thumb]:w-4 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-gradient-to-r 
          [&::-webkit-slider-thumb]:from-purple-500 
          [&::-webkit-slider-thumb]:to-pink-500
          [&::-webkit-slider-thumb]:border 
          [&::-webkit-slider-thumb]:border-white/30"
      />
    </div>
  );
}

export default function HeroSection() {
  const canvasRef = useRef(null);
  const [showControls, setShowControls] = useState(false);
  const [settings, setSettings] = useState({
    particleCount: 150,
    particleSize: 3,
    movementSpeed: 1.5,
    drag: 0.95,
    connectionDistance: 100,
    mouseForce: 2.0,
    colors: ['#00d4ff', '#0099ff', '#ff00cc'],
  });

  const mouseRef = useRef({ x: null, y: null, radius: 100 });
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  // Initialize particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < settings.particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * settings.particleSize + 1,
          speedX: Math.random() * 3 - 1.5,
          speedY: Math.random() * 3 - 1.5,
          color: settings.colors[Math.floor(Math.random() * settings.colors.length)],
          originalSize: null,
        });
      }
    };

    const updateParticle = (particle) => {
      // Apply drag
      particle.speedX *= settings.drag;
      particle.speedY *= settings.drag;

      // Mouse interaction
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseRef.current.radius && mouseRef.current.x !== null) {
        const angle = Math.atan2(dy, dx);
        const force = settings.mouseForce * (mouseRef.current.radius - distance) / mouseRef.current.radius;

        particle.speedX -= Math.cos(angle) * force;
        particle.speedY -= Math.sin(angle) * force;
      }

      // Update position
      particle.x += particle.speedX * settings.movementSpeed;
      particle.y += particle.speedY * settings.movementSpeed;

      // Bounce off walls
      if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1;
      if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1;

      // Keep within bounds
      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));
    };

    const drawParticle = (particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    };

    const connectParticles = () => {
      for (let a = 0; a < particlesRef.current.length; a++) {
        for (let b = a + 1; b < particlesRef.current.length; b++) {
          const dx = particlesRef.current[a].x - particlesRef.current[b].x;
          const dy = particlesRef.current[a].y - particlesRef.current[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < settings.connectionDistance) {
            const opacity = 1 - (distance / settings.connectionDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesRef.current[a].x, particlesRef.current[a].y);
            ctx.lineTo(particlesRef.current[b].x, particlesRef.current[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(10, 10, 12, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        updateParticle(particle);
        drawParticle(particle);
      });

      connectParticles();

      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse handlers
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    // Initialize
    resizeCanvas();
    initParticles();
    animate();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [settings]);

  // Handle setting changes
  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings({
      particleCount: 150,
      particleSize: 3,
      movementSpeed: 1.5,
      drag: 0.95,
      connectionDistance: 100,
      mouseForce: 2.0,
      colors: ['#00d4ff', '#0099ff', '#ff00cc'],
    });
  };

  const randomizeSettings = () => {
    setSettings({
      particleCount: Math.floor(Math.random() * 491) + 10,
      particleSize: Math.floor(Math.random() * 20) + 1,
      movementSpeed: Math.random() * 4.9 + 0.1,
      drag: Math.random() * 0.19 + 0.8,
      connectionDistance: Math.floor(Math.random() * 251) + 50,
      mouseForce: Math.random() * 5,
      colors: [
        `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
        `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
        `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
      ],
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />

      {/* Floating Orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/20 to-transparent blur-3xl z-0"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-orange-500/20 to-transparent blur-3xl z-0"
      />

      {/* Controls Toggle Button - Left Bottom */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowControls(!showControls)}
        className="fixed bottom-6 left-6 z-50 p-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/70 transition-all shadow-2xl"
      >
        {showControls ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Settings className="w-5 h-5 text-white" />
        )}
      </motion.button>

      {/* Particle Controls - Slides from Left */}
      <motion.div
        initial={false}
        animate={{
          x: showControls ? 0 : -400,
          opacity: showControls ? 1 : 0
        }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed bottom-20 left-6 z-40 w-80 p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Particle Controls
            </h3>
            <div className="flex gap-2">
              <button
                onClick={randomizeSettings}
                className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors"
                title="Randomize"
              >
                <Zap className="w-4 h-4" />
              </button>
              <button
                onClick={resetSettings}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <ControlSlider
              label="Particle Count"
              value={settings.particleCount}
              min={10}
              max={500}
              step={10}
              onChange={(v) => handleSettingChange('particleCount', parseInt(v))}
            />

            <ControlSlider
              label="Particle Size"
              value={settings.particleSize}
              min={1}
              max={20}
              onChange={(v) => handleSettingChange('particleSize', parseInt(v))}
            />

            <ControlSlider
              label="Movement Speed"
              value={settings.movementSpeed}
              min={0.1}
              max={5}
              step={0.1}
              formatValue={(v) => v.toFixed(1)}
              onChange={(v) => handleSettingChange('movementSpeed', parseFloat(v))}
            />

            <ControlSlider
              label="Drag"
              value={settings.drag}
              min={0.8}
              max={0.99}
              step={0.01}
              formatValue={(v) => v.toFixed(2)}
              onChange={(v) => handleSettingChange('drag', parseFloat(v))}
            />

            <ControlSlider
              label="Connection Distance"
              value={settings.connectionDistance}
              min={50}
              max={300}
              step={10}
              onChange={(v) => handleSettingChange('connectionDistance', parseInt(v))}
            />

            <ControlSlider
              label="Mouse Force"
              value={settings.mouseForce}
              min={0}
              max={5}
              step={0.1}
              formatValue={(v) => v.toFixed(1)}
              onChange={(v) => handleSettingChange('mouseForce', parseFloat(v))}
            />

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70 font-medium">Colors</span>
                <Palette className="w-4 h-4 text-purple-300" />
              </div>
              <div className="flex gap-3">
                {settings.colors.map((color, index) => (
                  <div key={index} className="flex-1">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => {
                        const newColors = [...settings.colors];
                        newColors[index] = e.target.value;
                        handleSettingChange('colors', newColors);
                      }}
                      className="w-full h-8 rounded-lg cursor-pointer border-2 border-white/20 hover:border-purple-400 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-white/50 text-center">
              Move mouse to interact • Adjust settings in real-time
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Centered */}
      <div className="relative z-20 container mx-auto px-6 lg:px-8 h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight"
            >
              <div className="mb-4">
                <ComicText fontSize={4.5}>Crafting Motion</ComicText>
              </div>
              <div>
                <ComicText fontSize={4.5}>Creating Stories</ComicText>
              </div>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl text-white max-w-3xl mx-auto mb-10 font-bold"
              style={{
                fontFamily: "'Montserrat', 'Arial Black', sans-serif",
                fontWeight: 900,
                letterSpacing: '-0.5px',
                lineHeight: '1.3',
              }}
            >
              A student animation club where{' '}

              imagination

              meets{' '}

              motion

              . Create, animate, and bring your ideas to life.
            </motion.p>


          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}