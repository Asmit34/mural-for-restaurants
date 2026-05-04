import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const images = [
  "https://imglink.cc/cdn/bID_RCbxjr.jpg",
  "https://imglink.cc/cdn/lwvLi4tSGH.jpg",
  "https://imglink.cc/cdn/m0DBTC20Zm.jpg",
  "https://imglink.cc/cdn/pEEyAwwpyn.jpg",
  "https://imglink.cc/cdn/cd5CBzM8UV.jpg",
  "https://imglink.cc/cdn/VTmSptktLH.jpg",
  "https://imglink.cc/cdn/WPnaPJfUtf.jpg",
  "https://imglink.cc/cdn/KiwEj_mcrc.jpg",
  "https://imglink.cc/cdn/xpp8pabX6D.jpg",
  "https://imglink.cc/cdn/P2DJF8_zNx.jpg",
  "https://imglink.cc/cdn/W2_7fH7gWw.jpg",
  "https://imglink.cc/cdn/E9QMOcaICM.jpg",
  "https://imglink.cc/cdn/9Cg4G9dobO.jpg",
  "https://imglink.cc/cdn/pz0Wf0N8FH.jpg",
  "https://imglink.cc/cdn/gUNg3Pvwx7.jpg",
  "https://imglink.cc/cdn/F7dHk-E-g4.jpg",
  "https://imglink.cc/cdn/uIF6OF8U_-.jpg",
  "https://imglink.cc/cdn/zx8XLxU6b3.jpg",
  "https://imglink.cc/cdn/aXAtAzfYCn.jpg",
  "https://imglink.cc/cdn/VRwoS0Y7jN.jpg",
  "https://imglink.cc/cdn/T4nhHwQblo.jpg",
  "https://imglink.cc/cdn/w6tFbAcqlp.jpg",
  "https://imglink.cc/cdn/bPrXiSMiL5.jpg",
  "https://imglink.cc/cdn/QunfoqHuwF.jpg",
  "https://imglink.cc/cdn/mVAwA3HfWB.jpg",
  "https://imglink.cc/cdn/riy4XIie-J.jpg",
  "https://imglink.cc/cdn/FyWB9TolU7.jpg",
  "https://imglink.cc/cdn/GEaZ23j6mn.jpg",
  "https://imglink.cc/cdn/zQP1_-IBOo.jpg",
];

const swipeConfidenceThreshold = 100;

const ImageGallerySection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

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

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -swipeConfidenceThreshold) {
      nextImage();
    } else if (info.offset.x > swipeConfidenceThreshold) {
      prevImage();
    }
  };

  return (
    <section className="w-full py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">

        {/* TITLE + BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between mb-8"
        >

          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              New Collection
            </h2>
            <p className="text-gray-600 mt-3">
              Explore our latest wall mural designs
            </p>
          </div>

          {/* ✅ FIXED BUTTON (INTERNAL NAVIGATION)
          <button
            onClick={() => navigate("/hand-painting")}
            className="
              mt-5 md:mt-0
              px-6 py-3
              bg-black
              text-white
              rounded-xl
              font-medium
              hover:bg-gray-800
              transition
              duration-300
            "
          >
            Explore our hand painting
          </button> */}

        </motion.div>

        {/* IMAGE GRID */}
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

        {/* LIGHTBOX */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >

              {/* CLOSE */}
              <button
                onClick={closeImage}
                className="absolute top-5 right-5 z-50 bg-white/20 p-2 rounded-full text-white hover:bg-white/30"
              >
                <X size={28} />
              </button>

              {/* LEFT */}
              <button
                onClick={prevImage}
                className="absolute left-3 md:left-8 z-50 bg-white/20 p-2 rounded-full text-white hover:bg-white/30"
              >
                <ChevronLeft size={30} />
              </button>

              {/* IMAGE */}
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex]}
                alt="Selected"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={handleDragEnd}
                className="max-h-[85vh] max-w-[95vw] object-contain rounded-xl shadow-2xl cursor-grab active:cursor-grabbing select-none"
              />

              {/* RIGHT */}
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