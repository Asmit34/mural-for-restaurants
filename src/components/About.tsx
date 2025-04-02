import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

interface StatItem {
  value: string;
  label: string;
}

interface AboutProps {
  autoRotateInterval?: number;
}

export default function About({ autoRotateInterval = 5000 }: AboutProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const images = [
    {
      url: "https://i.postimg.cc/TP4M8VdK/Village-Art-2.jpg",
      alt: "Traditional Nepalese village art",
      caption: "Traditional Nepalese Village Art"
    },
    {
      url: "https://i.postimg.cc/4dYGn8Lv/Mountain-with-deer.jpg",
      alt: "Mountain landscape with deer",
      caption: "Himalayan Mountain Landscape"
    },
    {
      url: "https://i.postimg.cc/DZ4V7S0B/Village-Art-3.jpg",
      alt: "Detailed village artwork",
      caption: "Detailed Village Artwork"
    },
    {
      url: "https://i.postimg.cc/wTXptRVr/Newari-Art-2.jpg",
      alt: "Newari traditional painting",
      caption: "Newari Traditional Painting"
    },
    {
      url: "https://i.postimg.cc/Z5L4QvvN/Mount-Everest.jpg",
      alt: "Mount Everest digital painting",
      caption: "Mount Everest Digital Art"
    }
  ];

  const stats: StatItem[] = [
    { value: "7+", label: "Years Experience" },
    { value: "10k+", label: "Completed Projects" },
    { value: "100%", label: "Client Satisfaction" }
  ];

  const aboutTexts = [
    "At Best Art Technology, we transform spaces into immersive experiences. Our team blends traditional artistry with digital innovation to create breathtaking Digital Wall Painting.",
    "Each project begins with your vision. We collaborate closely to understand your space, brand, and aesthetic goals, then bring it to life with precision and creativity.",
    "With over a decade in the industry, we've perfected our craft across hundreds of installations nationwide, earning recognition for quality and innovation."
  ];

  // Handle image rotation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isAutoRotating) {
      timer = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
      }, autoRotateInterval);
    }

    return () => clearInterval(timer);
  }, [isAutoRotating, autoRotateInterval, images.length]);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    setIsAutoRotating(false);
    
    // Resume auto-rotation after manual selection
    const resumeTimer = setTimeout(() => {
      setIsAutoRotating(true);
    }, autoRotateInterval * 2);
    
    return () => clearTimeout(resumeTimer);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    enter: {
      opacity: 0,
      scale: 1.1,
      x: 20
    },
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      x: -20,
      transition: {
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const statItemVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <section 
      id="about" 
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 10% 20%, rgba(224, 231, 255, 0.8) 0%, rgba(224, 231, 255, 0.6) 50%, rgba(255, 255, 255, 1) 100%)'
      }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-16">
          {/* Text content - left side */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="lg:w-1/2"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
            >
              About Our Creative Studio
            </motion.h2>

            <motion.div variants={containerVariants} className="space-y-6">
              {aboutTexts.map((text, i) => (
                <motion.p 
                  key={i}
                  variants={itemVariants}
                  className="text-lg text-gray-700 leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={statItemVariants}
                  whileHover="hover"
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="text-2xl font-bold text-indigo-600">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Media content - right side */}
          <motion.div 
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:w-1/2 relative rounded-2xl overflow-hidden"
          >
            <div className="relative aspect-video rounded-xl shadow-2xl overflow-hidden border-4 border-white bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={imageVariants}
                  className="relative w-full h-full"
                >
                  <img
                    src={images[currentImageIndex].url}
                    alt={images[currentImageIndex].alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm font-medium">
                      {images[currentImageIndex].caption}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Image navigation */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => goToImage(index)}
                    whileHover={{ scale: 1.2 }}
                    aria-label={`View image ${index + 1}: ${images[index].caption}`}
                  />
                ))}
              </div>

              {/* Navigation arrows */}
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
                onClick={() => goToImage((currentImageIndex - 1 + images.length) % images.length)}
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
                onClick={() => goToImage((currentImageIndex + 1) % images.length)}
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Decorative elements */}
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -top-6 -left-6 w-32 h-32 bg-purple-100 rounded-full opacity-30 -z-10"
            />

            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-6 -right-6 w-40 h-40 bg-indigo-100 rounded-full opacity-30 -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}