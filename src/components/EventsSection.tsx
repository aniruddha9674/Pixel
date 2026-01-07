import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, ArrowRight, X } from 'lucide-react';

const upcomingEvent = {
  title: 'Animation Workshop: Character Design',
  date: 'January 15, 2024',
  time: '4:00 PM - 6:00 PM',
  location: 'Design Studio, Room 302',
  poster: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
};

const pastEvents = [
  { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop',
    title: 'Motion Graphics Workshop',
    date: 'December 10, 2024',
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=600&fit=crop',
    title: '3D Animation Bootcamp',
    date: 'November 22, 2024',
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&h=600&fit=crop',
    title: 'VFX Masterclass',
    date: 'November 5, 2024',
  },
];

// Modal Component
const EventModal = ({ event, onClose }: { event: typeof pastEvents[0] | typeof upcomingEvent | null; onClose: () => void }) => {
  if (!event) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute -top-12 right-0 text-gray-400 hover:text-white transition-colors p-2"
          >
            <X size={28} />
          </motion.button>

          {/* Image Container */}
          <div className="relative aspect-[4/3] bg-zinc-900 rounded-2xl overflow-hidden border border-gray-800">
            <img
              src={'image' in event ? event.image : event.poster}
              alt={event.title}
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 to-transparent" />

            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
            >
              <div className="flex items-center gap-2 text-orange-400 mb-3">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{event.date}</span>
              </div>
              <h2 className="font-display text-2xl md:text-4xl text-white mt-2 font-bold">
                {event.title}
              </h2>
              {'time' in event && (
                <p className="text-gray-300 mt-2">
                  {event.time} • {event.location}
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedEvent, setSelectedEvent] = useState<typeof pastEvents[0] | typeof upcomingEvent | null>(null);

  return (
    <>
      <section ref={ref} className="py-32 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white">
              Upcoming <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Events</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Featured Event Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group cursor-pointer"
              onClick={() => setSelectedEvent(upcomingEvent)}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-500">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={upcomingEvent.poster}
                    alt={upcomingEvent.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-2 text-orange-400 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">{upcomingEvent.date}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      {upcomingEvent.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {upcomingEvent.time} • {upcomingEvent.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Past Events & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-display text-xl font-semibold text-white mb-4">
                  Past Events
                </h3>
                <div className="flex gap-4">
                  {pastEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="relative overflow-hidden rounded-xl w-24 h-24 cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 hover:bg-transparent transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <a 
                href="/events" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-orange-500 text-white rounded-full hover:bg-orange-500 transition-all duration-300 group"
              >
                View All Events
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </>
  );
}