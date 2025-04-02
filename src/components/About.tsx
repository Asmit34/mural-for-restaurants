import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://i.postimg.cc/TP4M8VdK/Village-Art-2.jpg",
    "https://i.postimg.cc/4dYGn8Lv/Mountain-with-deer.jpg",
    "https://i.postimg.cc/DZ4V7S0B/Village-Art-3.jpg",
    "https://i.postimg.cc/wTXptRVr/Newari-Art-2.jpg",
    "https://i.postimg.cc/Z5L4QvvN/Mount-Everest.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
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

  return (
    <section 
      id="about" 
      className="relative py-20 bg-indigo-50 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 10% 20%, rgba(224, 231, 255, 0.8) 0%, rgba(224, 231, 255, 0.6) 50%, rgba(255, 255, 255, 1) 100%)'
      }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4">
        <div ref={ref} className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text content - left side */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={container}
            className="lg:w-1/2"
          >
            <motion.h2
              variants={item}
              className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
            >
              About Our Creative Studio
            </motion.h2>

            <motion.div variants={item} className="space-y-6">
              {[
                "At Best Art Technology, we transform spaces into immersive experiences. Our team blends traditional artistry with digital innovation to create breathtaking murals and wall designs.",
                "Each project begins with your vision. We collaborate closely to understand your space, brand, and aesthetic goals, then bring it to life with precision and creativity.",
                "With over a decade in the industry, we've perfected our craft across hundreds of installations nationwide, earning recognition for quality and innovation."
              ].map((text, i) => (
                <motion.p 
                  key={i}
                  variants={item}
                  className="text-lg text-gray-700 leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            <motion.div 
              variants={item}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {[
                { value: "7+", label: "Years" },
                { value: "10k+", label: "Projects" },
                { value: "100%", label: "Satisfaction" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
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
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={`Studio work ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={imageVariants}
                />
              </AnimatePresence>
              
              {/* Image navigation dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
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