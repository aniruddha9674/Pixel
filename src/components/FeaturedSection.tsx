"use client"

import { motion, useInView, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { useRef, useState, useCallback, useMemo } from 'react';
import { Play, ArrowRight } from 'lucide-react';

const featuredWorks = [
  {
    id: 1,
    title: 'Neon Dreams',
    category: '2D Animation',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Cosmic Journey',
    category: '3D Animation',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Abstract Flow',
    category: 'Motion Graphics',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Digital Reality',
    category: 'VFX',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'City Lights',
    category: 'Motion Graphics',
    thumbnail: 'https://images.unsplash.com/photo-1515705576963-95cad62945b6?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'Future Vision',
    category: '3D Animation',
    thumbnail: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=600&h=400&fit=crop',
  },
];

type Point = {
  x: number;
  y: number;
};

type LensProps = {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  position?: Point;
  defaultPosition?: Point; // ✅ OPTIONAL
  duration?: number;
  lensColor?: string;
  ariaLabel?: string;
};

const Lens = ({
  children,
  zoomFactor = 1.3,
  lensSize = 170,
  isStatic = false,
  position = { x: 0, y: 0 },
  defaultPosition,
  duration = 0.1,
  lensColor = "black",
  ariaLabel = "Zoom Area",
}: LensProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState<Point>(position);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentPosition = useMemo(() => {
    if (isStatic) return position;
    if (defaultPosition && !isHovering) return defaultPosition;
    return mousePosition;
  }, [isStatic, position, defaultPosition, isHovering, mousePosition]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") setIsHovering(false);
    },
    []
  );

  const maskImage = useMotionTemplate`
    radial-gradient(
      circle ${lensSize / 2}px 
      at ${currentPosition.x}px ${currentPosition.y}px,
      ${lensColor} 100%,
      transparent 100%
    )
  `;

  const LensContent = useMemo(() => {
    const { x, y } = currentPosition;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.58 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration }}
        className="absolute inset-0 overflow-hidden"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          transformOrigin: `${x}px ${y}px`,
          zIndex: 50,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${zoomFactor})`,
            transformOrigin: `${x}px ${y}px`,
          }}
        >
          {children}
        </div>
      </motion.div>
    );
  }, [
    currentPosition,
    lensSize,
    lensColor,
    zoomFactor,
    children,
    duration,
    maskImage,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative z-20 overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}

      {isStatic || defaultPosition ? (
        LensContent
      ) : (
        <AnimatePresence mode="popLayout">
          {isHovering && LensContent}
        </AnimatePresence>
      )}
    </div>
  );
};


export default function FeaturedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section ref={ref} className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/20 to-zinc-950" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Motion in <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-transparent bg-clip-text">Action</span>
            </h2>
            <p className="text-xl text-zinc-400">
              Featured creations from our talented members
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(work.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative cursor-pointer"
              >
                <Lens zoomFactor={1.5} lensSize={200}>
                  <div className="relative overflow-hidden rounded-2xl aspect-video">
                    <img
                      src={work.thumbnail}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    {/* Play Button */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={hoveredId === work.id ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-orange-500/90 flex items-center justify-center shadow-lg shadow-orange-500/50">
                        <Play className="w-6 h-6 text-white ml-1" fill="white" />
                      </div>
                    </motion.div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-xs uppercase tracking-wider text-orange-500 font-medium">
                        {work.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">
                        {work.title}
                      </h3>
                    </div>
                  </div>
                </Lens>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}