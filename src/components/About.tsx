import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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

  const mediaItem = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
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
            variants={mediaItem}
          >
            {/* Video/GIF container */}
            <div className="relative aspect-video rounded-xl shadow-2xl overflow-hidden border-4 border-white">
              {/* Replace with your actual video or GIF */}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-artist-painting-on-canvas-1172-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Fallback for browsers that don't support video */}
              <div className="absolute inset-0 flex items-center justify-center bg-indigo-100">
                <img 
                  src="https://i.giphy.com/media/3o7TKsrfld1j3lqQ7S/giphy.webp" 
                  alt="Art process animation"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </motion.div>
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