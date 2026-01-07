"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import createGlobe from "cobe";
import type { COBEOptions } from "cobe";
import { Frame, Play, Pen, Layers, Film, Box, Video, PenTool, Wand2 } from "lucide-react";

/* ---------------- Utility ---------------- */

const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

/* ---------------- Globe Config ---------------- */

const MOVEMENT_DAMPING = 720;

const BASE_GLOBE_CONFIG: Omit<
  COBEOptions,
  "width" | "height" | "onRender"
> = {
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.08 },
  ],
};

/* ---------------- Orbiting Icons ---------------- */

const orbitingIcons = [
  { Icon: Frame, delay: 0, color: "text-cyan-400" },
  { Icon: Play, delay: 0.25, color: "text-purple-400" },
  { Icon: Pen, delay: 0.5, color: "text-pink-400" },
  { Icon: Layers, delay: 0.75, color: "text-amber-400" },
];

const OrbitingIcon = ({ 
  Icon, 
  delay, 
  color 
}: { 
  Icon: any; 
  delay: number; 
  color: string;
}) => {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        x: "-50%",
        y: "-50%",
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
        delay: delay * 20,
      }}
    >
      <motion.div
        className="absolute"
        style={{
          left: "300px",
          top: "-20px",
        }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1, 1, 0.5],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 20,
          times: [0, 0.15, 0.85, 1],
        }}
      >
        <div className="relative">
          <motion.div
            className={cn("absolute inset-0 blur-xl opacity-60", color)}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={40} strokeWidth={1.5} />
          </motion.div>
          <Icon 
            className={cn(color, "relative z-10 drop-shadow-2xl")} 
            size={40} 
            strokeWidth={1.5}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ---------------- Globe Component ---------------- */

const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);

  const rotationX = useMotionValue(0);
  const rotationY = useMotionValue(0);

  const rotationXSpring = useSpring(rotationX, {
    damping: 30,
    stiffness: 100,
  });

  const rotationYSpring = useSpring(rotationY, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let width = canvasRef.current.offsetWidth;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvasRef.current, {
      ...BASE_GLOBE_CONFIG,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005;

        state.phi = phi + rotationXSpring.get();
        state.theta = Math.max(
          -1,
          Math.min(1, 0.3 + rotationYSpring.get())
        );

        state.width = width * 2;
        state.height = width * 2;
      },
    });

    canvasRef.current.style.opacity = "1";

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rotationXSpring, rotationYSpring]);

  return (
    <div
      className={cn(
        "relative aspect-square w-[60vw] max-w-[600px]",
        className
      )}
    >
      {orbitingIcons.map(({ Icon, delay, color }, i) => (
        <OrbitingIcon key={i} Icon={Icon} delay={delay} color={color} />
      ))}
      
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0 transition-opacity duration-500 cursor-grab relative z-10"
        onPointerDown={(e) => {
          pointerInteracting.current = {
            x: e.clientX,
            y: e.clientY,
          };
          canvasRef.current!.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (!pointerInteracting.current) return;

          const deltaX = e.clientX - pointerInteracting.current.x;
          const deltaY = e.clientY - pointerInteracting.current.y;

          rotationX.set(rotationX.get() + deltaX / MOVEMENT_DAMPING);
          rotationY.set(rotationY.get() + deltaY / MOVEMENT_DAMPING);

          pointerInteracting.current = {
            x: e.clientX,
            y: e.clientY,
          };
        }}
      />
    </div>
  );
};

/* ---------------- Domain Nodes ---------------- */

interface Domain {
  icon: React.ElementType;
  title: string;
  description: string;
  position: { x: number; y: number };
}

const domains: Domain[] = [
  { 
    icon: Film, 
    title: "2D Animation", 
    description: "Traditional and digital animation techniques",
    position: { x: -32, y: -15 }
  },
  { 
    icon: Box, 
    title: "3D Animation", 
    description: "Modeling, rigging, and character animation",
    position: { x: 32, y: -15 }
  },
  { 
    icon: Video, 
    title: "Motion Graphics", 
    description: "Dynamic text and visual effects",
    position: { x: -35, y: 15 }
  },
  { 
    icon: PenTool, 
    title: "Character Design", 
    description: "Creating memorable animated characters",
    position: { x: 35, y: 15 }
  },
  { 
    icon: Layers, 
    title: "Compositing", 
    description: "Combining visual elements seamlessly",
    position: { x: -28, y: 38 }
  },
  { 
    icon: Wand2, 
    title: "VFX", 
    description: "Visual effects and post-production",
    position: { x: 28, y: 38 }
  },
];

interface DomainNodeProps {
  domain: Domain;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const DomainNode: React.FC<DomainNodeProps> = ({ 
  domain, 
  index, 
  hoveredIndex, 
  setHoveredIndex 
}) => {
  const Icon = domain.icon;
  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;

  return (
    <div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${domain.position.x}vw), calc(-50% + ${domain.position.y}vh))`,
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="relative flex flex-col items-center">
        <div 
          className="relative w-20 h-20 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-500"
          style={{
            borderColor: isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)',
            backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            boxShadow: isHovered 
              ? '0 0 30px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.05)' 
              : 'none',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            opacity: isAnyHovered && !isHovered ? 0.4 : 1,
          }}
        >
          {isHovered && (
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
          )}
          
          <Icon 
            size={32} 
            className="relative z-10 transition-all duration-500"
            style={{
              color: isHovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)',
            }}
          />
        </div>

        <div 
          className="mt-6 text-center transition-all duration-500"
          style={{
            opacity: isAnyHovered && !isHovered ? 0.4 : 1,
          }}
        >
          <h3 
            className="text-lg font-medium tracking-wide whitespace-nowrap transition-colors duration-500"
            style={{
              color: isHovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
            }}
          >
            {domain.title}
          </h3>
          
          <div 
            className="overflow-hidden transition-all duration-500 ease-out"
            style={{
              maxHeight: isHovered ? '60px' : '0px',
              opacity: isHovered ? 1 : 0,
              marginTop: isHovered ? '8px' : '0px',
            }}
          >
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {domain.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ConnectorLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isVisible: boolean;
}

const ConnectorLine: React.FC<ConnectorLineProps> = ({ 
  startX, 
  startY, 
  endX, 
  endY, 
  isVisible 
}) => {
  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        width: `${length}%`,
        height: '1px',
        transformOrigin: 'left center',
        transform: `rotate(${angle}deg)`,
      }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          boxShadow: isVisible ? '0 0 8px rgba(255, 255, 255, 0.3)' : 'none',
        }}
      />
    </div>
  );
};

/* ---------------- Identity Section ---------------- */

export default function IdentitySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen bg-zinc-950 overflow-hidden flex items-center justify-center">
      {/* Ambient background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>



      {/* Globe with Domain Nodes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center relative"
      >
        <Globe />
      </motion.div>

      {/* Domain Nodes */}
      {domains.map((domain, index) => (
        <DomainNode
          key={index}
          domain={domain}
          index={index}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
      ))}

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
}