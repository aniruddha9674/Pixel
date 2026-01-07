import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Types
type Category = "all" | "events" | "workshops" | "behind-the-scenes" | "awards";

interface GalleryImage {
    id: string;
    src: string;
    title: string;
    location: string;
    year: string;
    category: Category;
    size: "small" | "medium" | "large" | "tall" | "wide";
}

// Data - Replace these URLs with your own images
const galleryImages: GalleryImage[] = [
    {
        id: "1",
        src: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800&h=1000&fit=crop",
        title: "Studio Session",
        location: "New York City",
        year: "2024",
        category: "events",
        size: "large",
    },
    {
        id: "2",
        src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=900&fit=crop",
        title: "Lighting Masterclass",
        location: "Los Angeles",
        year: "2024",
        category: "workshops",
        size: "tall",
    },
    {
        id: "3",
        src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&h=500&fit=crop",
        title: "Golden Frame Awards",
        location: "London",
        year: "2023",
        category: "awards",
        size: "wide",
    },
    {
        id: "4",
        src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=750&fit=crop",
        title: "Fashion Week Prep",
        location: "Paris",
        year: "2024",
        category: "behind-the-scenes",
        size: "medium",
    },
    {
        id: "5",
        src: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=900&fit=crop",
        title: "Golden Hour Collective",
        location: "Santorini",
        year: "2023",
        category: "events",
        size: "tall",
    },
    {
        id: "6",
        src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=750&fit=crop",
        title: "Portrait Series",
        location: "Milan",
        year: "2024",
        category: "events",
        size: "medium",
    },
    {
        id: "7",
        src: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=900&h=500&fit=crop",
        title: "Product Photography",
        location: "Tokyo",
        year: "2023",
        category: "workshops",
        size: "wide",
    },
    {
        id: "8",
        src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=1000&fit=crop",
        title: "Film Production",
        location: "Vancouver",
        year: "2024",
        category: "behind-the-scenes",
        size: "large",
    },
    {
        id: "9",
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=600&fit=crop",
        title: "Creative Workshop",
        location: "Berlin",
        year: "2024",
        category: "workshops",
        size: "small",
    },
    {
        id: "10",
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=750&fit=crop",
        title: "Animation Showcase",
        location: "Amsterdam",
        year: "2023",
        category: "events",
        size: "medium",
    },
    {
        id: "11",
        src: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=600&h=900&fit=crop",
        title: "VFX Breakdown",
        location: "Seoul",
        year: "2024",
        category: "behind-the-scenes",
        size: "tall",
    },
    {
        id: "12",
        src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&h=600&fit=crop",
        title: "Motion Graphics",
        location: "Toronto",
        year: "2023",
        category: "workshops",
        size: "small",
    },
    {
        id: "13",
        src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=750&fit=crop",
        title: "3D Rendering Workshop",
        location: "Singapore",
        year: "2024",
        category: "workshops",
        size: "medium",
    },
    {
        id: "14",
        src: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=900&h=500&fit=crop",
        title: "Annual Gala",
        location: "Dubai",
        year: "2023",
        category: "awards",
        size: "wide",
    },
    {
        id: "15",
        src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=900&fit=crop",
        title: "Set Design",
        location: "Mumbai",
        year: "2024",
        category: "behind-the-scenes",
        size: "tall",
    },
    {
        id: "16",
        src: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&h=600&fit=crop",
        title: "Color Grading Class",
        location: "Barcelona",
        year: "2023",
        category: "workshops",
        size: "small",
    },
    {
        id: "17",
        src: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&h=1000&fit=crop",
        title: "Annual Conference",
        location: "San Francisco",
        year: "2024",
        category: "events",
        size: "large",
    },
    {
        id: "18",
        src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=750&fit=crop",
        title: "Equipment Setup",
        location: "Sydney",
        year: "2023",
        category: "behind-the-scenes",
        size: "medium",
    },
];

const categories: { id: Category; label: string }[] = [
    { id: "all", label: "All Work" },
    { id: "events", label: "Events" },
    { id: "workshops", label: "Workshops" },
    { id: "behind-the-scenes", label: "Behind the Scenes" },
    { id: "awards", label: "Awards" },
];

// Category Filter Component
const CategoryFilter = ({ activeCategory, onCategoryChange }: { activeCategory: Category; onCategoryChange: (cat: Category) => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
        >
            {categories.map((category, index) => (
                <motion.button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`px-6 py-3 rounded-full text-sm tracking-wider transition-all duration-500 font-medium ${activeCategory === category.id
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                            : "glass border border-border/30 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {category.label}
                </motion.button>
            ))}
        </motion.div>
    );
};

// Gallery Card Component
const GalleryCard = ({ image, index, onClick }: { image: GalleryImage; index: number; onClick: () => void }) => {
    const sizeClasses = {
        small: "col-span-1 row-span-1",
        medium: "col-span-1 row-span-1",
        large: "col-span-2 row-span-2",
        tall: "col-span-1 row-span-2",
        wide: "col-span-2 row-span-1",
    };

    const offset = index % 3 === 0 ? 30 : index % 3 === 1 ? -20 : 10;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                duration: 0.8,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={`relative group cursor-pointer rounded-2xl overflow-hidden border border-border/30 hover:border-primary/50 ${sizeClasses[image.size]}`}
            onClick={onClick}
            style={{ transform: `translateY(${offset}px)` }}
            whileHover={{ y: offset - 8 }}
        >
            {/* Glow border animation */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, transparent 0%, hsl(25 100% 55% / 0.1) 50%, transparent 100%)',
                }}
            />

            <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
                loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: "radial-gradient(circle at 50% 100%, hsl(25 100% 55% / 0.15) 0%, transparent 60%)",
                }}
            />

            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                >
                    <span className="inline-block text-primary text-xs font-medium tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {image.year}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl text-foreground mb-1 font-bold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        {image.title}
                    </h3>
                    <p className="text-muted-foreground text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                        {image.location}
                    </p>
                </motion.div>
            </div>

            <div className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-4 h-px bg-primary/60" />
                <div className="absolute top-0 right-0 w-px h-4 bg-primary/60" />
            </div>
        </motion.div>
    );
};

// Lightbox Modal Component
const LightboxModal = ({ image, onClose, images, onNavigate }: { image: GalleryImage | null; onClose: () => void; images: GalleryImage[]; onNavigate: (img: GalleryImage) => void }) => {
    const currentIndex = image ? images.findIndex((img) => img.id === image.id) : -1;

    const goToPrevious = useCallback(() => {
        if (currentIndex > 0) {
            onNavigate(images[currentIndex - 1]);
        }
    }, [currentIndex, images, onNavigate]);

    const goToNext = useCallback(() => {
        if (currentIndex < images.length - 1) {
            onNavigate(images[currentIndex + 1]);
        }
    }, [currentIndex, images, onNavigate]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!image) return;
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") goToPrevious();
            if (e.key === "ArrowRight") goToNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [image, onClose, goToPrevious, goToNext]);

    useEffect(() => {
        if (image) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [image]);

    return (
        <AnimatePresence>
            {image && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-background/95 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 w-full max-w-6xl mx-4 md:mx-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            onClick={onClose}
                            className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground transition-colors p-2"
                        >
                            <X size={28} />
                        </motion.button>

                        <div className="relative aspect-[16/10] bg-card rounded-2xl overflow-hidden border border-border/30">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={image.id}
                                    src={image.src}
                                    alt={image.title}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 to-transparent" />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                            >
                                <span className="text-primary text-sm tracking-widest font-medium">
                                    {image.year}
                                </span>
                                <h2 className="font-display text-2xl md:text-4xl text-foreground mt-2 font-bold">
                                    {image.title}
                                </h2>
                                <p className="text-muted-foreground mt-1">{image.location}</p>
                            </motion.div>
                        </div>

                        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4">
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: currentIndex > 0 ? 1 : 0.3, x: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToPrevious();
                                }}
                                disabled={currentIndex === 0}
                                className="pointer-events-auto p-3 rounded-full bg-card/80 backdrop-blur-sm text-foreground hover:bg-card border border-border/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={24} />
                            </motion.button>

                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: currentIndex < images.length - 1 ? 1 : 0.3, x: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToNext();
                                }}
                                disabled={currentIndex === images.length - 1}
                                className="pointer-events-auto p-3 rounded-full bg-card/80 backdrop-blur-sm text-foreground hover:bg-card border border-border/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={24} />
                            </motion.button>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-center mt-4 text-muted-foreground text-sm"
                        >
                            {currentIndex + 1} / {images.length}
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Main Gallery Component
const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("all");
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const filteredImages = useMemo(() => {
        if (activeCategory === "all") return galleryImages;
        return galleryImages.filter((img) => img.category === activeCategory);
    }, [activeCategory]);

    return (
        <div className="min-h-screen bg-background overflow-hidden">
            <Navigation />

            {/* Hero Section with Animated Background */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24">
                {/* Animated gradient orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full opacity-20"
                        style={{ background: 'radial-gradient(circle, hsl(25 100% 55% / 0.4) 0%, transparent 70%)' }}
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-15"
                        style={{ background: 'radial-gradient(circle, hsl(280 100% 65% / 0.4) 0%, transparent 70%)' }}
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [0, -90, 0],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </motion.div>

                    <motion.h1
                        className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Moments We
                        <br />
                        <span className="text-gradient">Crafted</span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-muted-foreground max-w-3xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        A curated collection of visual stories from our creative sessions, workshops, and award-winning productions.
                    </motion.p>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2">
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-primary"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* Gallery Section */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6 lg:px-8">
                    <CategoryFilter
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />

                    <motion.div
                        layout
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredImages.map((image, index) => (
                                <GalleryCard
                                    key={image.id}
                                    image={image}
                                    index={index}
                                    onClick={() => setSelectedImage(image)}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    <AnimatePresence>
                        {filteredImages.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-20"
                            >
                                <p className="text-muted-foreground text-lg">
                                    No images found in this category.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <LightboxModal
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                    images={filteredImages}
                    onNavigate={setSelectedImage}
                />
            </section>

            <Footer />
        </div>
    );
};

export default Gallery;