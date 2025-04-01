import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MuralShowcase = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Adjusted ranges to stop animation earlier
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 100], { clamp: true });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const imageOverlay = useTransform(scrollYProgress, [0, 0.2], [0.3, 0]);

  const details = [
    {
      title: "Commercial Grade Durability",
      description: "UV-resistant, washable materials rated for 20+ years in high-traffic areas, perfect for busy restaurants and hotel spaces",
      color: "bg-blue-100",
      border: "border-blue-200",
    },
    {
      title: "Health & Safety Compliant",
      description: "Eco-Conscious & Compliant, VOC-free materials meeting international hospitality safety standards",
      color: "bg-green-100",
      border: "border-green-200",
    },
    {
      title: "Professional Installation",
      description: "Expert team handling everything from surface preparation to final touches, with minimal disruption to your business operations",
      color: "bg-purple-100",
      border: "border-purple-200",
    },
    {
      title: "Custom Environment Integration",
      description: "Designs optimized for specific lighting conditions, viewing distances, and architectural features unique to your space",
      color: "bg-yellow-100",
      border: "border-yellow-200",
    },
    {
      title: "3D Visualization Service",
      description: "Advanced digital mockups showing how your mural will look in your exact space, with different lighting conditions and times of day",
      color: "bg-pink-100",
      border: "border-pink-200",
    },
    {
      title: "Brand & Theme Integration",
      description: "Seamless incorporation of your restaurant's cuisine style or hotel's aesthetic into the artwork, enhancing guest experience",
      color: "bg-orange-100",
      border: "border-orange-200",
    },
    {
      title: "Climate-Adaptive Materials",
      description: "Specially formulated for kitchen heat, humidity, and temperature variations common in hospitality environments",
      color: "bg-teal-100",
      border: "border-teal-200",
    },
    {
      title: "Comprehensive Warranty",
      description: "15-year+ commercial warranty covering fading, peeling, and color integrity, with annual maintenance service options",
      color: "bg-indigo-100",
      border: "border-indigo-200",
    },
  ];

  return (
    <section ref={ref} className="relative min-h-[200vh] bg-gradient-to-b from-gray-100 to-gray-200" id="showcase">
      {/* Initial full-screen section - adjusted for mobile */}
      <div className="h-[50vh] md:h-screen w-full sticky top-0 overflow-hidden">
        {/* Gradient background layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20 z-0" />

        {/* Background image with parallax effect - now properly visible on mobile */}
        <motion.div
          className="absolute inset-0 h-full w-full"
          style={{ scale, y }}
        >
          <div className="relative w-full h-full">
            <img
              src="https://i.postimg.cc/qB9J6TdN/Mount-Everest-Art.jpg"
              alt="Featured Mural"
              className="absolute inset-0 w-full h-full object-cover md:object-center"
              style={{
                objectPosition: 'center center',
                minHeight: '120%',
                minWidth: '100%'
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-purple-900/30"
              style={{ opacity: imageOverlay }}
            />
          </div>
        </motion.div>

        {/* Title overlay - adjusted for mobile */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: titleOpacity }}
        >
          <div className="text-center text-white bg-black/40 backdrop-blur-sm p-4 md:p-8 rounded-xl border border-white/20 mx-4">
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4">
              Commercial Mural Excellence
            </h2>
            <p className="text-sm md:text-lg lg:text-xl max-w-2xl mx-auto px-2 md:px-4">
              Transforming Hospitality Spaces with Premium Wall Art Solutions
            </p>
          </div>
        </motion.div>
      </div>

      {/* Details section - adjusted spacing for mobile */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 py-10 md:py-20"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-blue-400 filter blur-3xl"></div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-purple-400 filter blur-3xl"></div>
        </div>

        {/* First row of details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {details.slice(0, 4).map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${detail.color} ${detail.border} p-6 rounded-lg shadow-lg border-2 transform hover:scale-105 transition-transform backdrop-blur-sm bg-opacity-70`}
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{detail.title}</h3>
              <p className="text-gray-700">{detail.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Centered showcase image */}
        <motion.div
          className="my-12 flex justify-center relative z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">Premium Quality</span>
            </div>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-white/30"
              initial={{ boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.3)" }}
              animate={{ boxShadow: "0 0 0 20px rgba(255, 255, 255, 0)" }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Second row of details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {details.slice(4).map((detail, index) => (
            <motion.div
              key={index + 4}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${detail.color} ${detail.border} p-6 rounded-lg shadow-lg border-2 transform hover:scale-105 transition-transform backdrop-blur-sm bg-opacity-70`}
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{detail.title}</h3>
              <p className="text-gray-700">{detail.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default MuralShowcase;