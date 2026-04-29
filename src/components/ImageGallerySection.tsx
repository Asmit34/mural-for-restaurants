import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const images = [
    "https://imglink.cc/cdn/axULVVqvXq.jpg",
    "https://imglink.cc/cdn/zWqtOFVOHK.jpg",
    "https://imglink.cc/cdn/kIQ4YkFLep.jpg",
    "https://imglink.cc/cdn/UymqEF1Mh4.jpg",
    "https://imglink.cc/cdn/A1ybDXTSQX.jpg",
    "https://imglink.cc/cdn/l9irmImujh.jpg",
    "https://imglink.cc/cdn/uZNE3bFDHh.jpg",
    "https://imglink.cc/cdn/H7UqtYim4b.jpg",
    "https://imglink.cc/cdn/63YXmovxwc.jpg",
    "https://imglink.cc/cdn/WNE5ix-Ei-.jpg",
    "https://imglink.cc/cdn/xy6ySMQ2pl.jpg",
    "https://imglink.cc/cdn/xLyeGJvys-.jpg",
    "https://imglink.cc/cdn/Gn28fnW-tN.jpg",
    "https://imglink.cc/cdn/EPX2JwPcXC.jpg",
    "https://imglink.cc/cdn/24OG2lmPIu.jpg"
];

const ImageGallerySection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeImage = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const prevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      (selectedIndex - 1 + images.length) % images.length
    );
  };

  return (
    <section className="w-full py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            New Collection
          </h2>
          <p className="text-gray-600 mt-3">
            Explore our latest wall mural designs
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-6">
        {images.map((image, index) => (
            <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer overflow-hidden rounded-2xl shadow-lg"
            onClick={() => openImage(index)}
            >
            <div className="w-full h-[280px] sm:h-[400px] md:h-[550px] lg:h-[700px] overflow-hidden">
                <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
            </div>
            </motion.div>
        ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Close Button */}
              <button
                onClick={closeImage}
                className="absolute top-5 right-5 z-50 bg-white/20 p-2 rounded-full text-white hover:bg-white/30"
              >
                <X size={28} />
              </button>

              {/* Left Arrow */}
              <button
                onClick={prevImage}
                className="absolute left-3 md:left-8 z-50 bg-white/20 p-2 rounded-full text-white hover:bg-white/30"
              >
                <ChevronLeft size={30} />
              </button>

              {/* Main Image */}
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex]}
                alt="Selected"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="
                  max-h-[85vh]
                  max-w-[95vw]
                  object-contain
                  rounded-xl
                  shadow-2xl
                "
              />

              {/* Right Arrow */}
              <button
                onClick={nextImage}
                className="absolute right-3 md:right-8 z-50 bg-white/20 p-2 rounded-full text-white hover:bg-white/30"
              >
                <ChevronRight size={30} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ImageGallerySection;