import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const images = [
  "https://imglink.cc/cdn/BzC5K-E_uW.jpg",
  "https://imglink.cc/cdn/4FcjG9M7pi.jpg",
  // "https://imglink.cc/cdn/yBpm9_XzVX.jpg",
  "https://imglink.cc/cdn/CpVdsCmmjF.jpg",
  "https://imglink.cc/cdn/lvqJixRuJJ.jpg",
  "https://imglink.cc/cdn/9VViYwukh5.jpg",
  "https://imglink.cc/cdn/-n18TXEVak.jpg",
  "https://imglink.cc/cdn/tvHv0gxIr9.jpg",
  "https://imglink.cc/cdn/4rjvPbzwSU.jpg",
  "https://imglink.cc/cdn/y709xhevyg.jpg",
  "https://imglink.cc/cdn/TixeW4ty98.jpg",
  "https://imglink.cc/cdn/HzAGyoXI4y.jpg",
  "https://imglink.cc/cdn/lWjjOFUPzw.jpg",
  "https://imglink.cc/cdn/TbpAsIN_xX.jpg",
  "https://imglink.cc/cdn/0Hwi_4vwZz.jpg",
  // "https://imglink.cc/cdn/F03AIsNxeg.jpg",
  "https://imglink.cc/cdn/ubtbOFYDLG.jpg",
  "https://imglink.cc/cdn/PIT4ioAkUY.jpg",
  "https://imglink.cc/cdn/UGregfyL9F.jpg",
  "https://imglink.cc/cdn/dMH86ySlRp.jpg",
  // "https://imglink.cc/cdn/p-UtNuW5qX.jpg",
  // "https://imglink.cc/cdn/gUX4geMFJA.jpg",
  // "https://imglink.cc/cdn/uWbTz9kk2-.jpg",
  "https://imglink.cc/cdn/t6GhRjrS17.jpg",
  "https://imglink.cc/cdn/jFsVkdGcRL.jpeg",
  "https://imglink.cc/cdn/7cBHwAzCMy.jpeg",
  // "https://imglink.cc/cdn/8-jxXSYUEA.mp4",
  "https://imglink.cc/cdn/1-JGYqb8uv.jpeg",
  "https://imglink.cc/cdn/fAjaz9JP1G.jpeg",
  "https://imglink.cc/cdn/N8NEpTxj4z.jpeg",
  "https://imglink.cc/cdn/XWSboQJkAc.jpeg",
  "https://imglink.cc/cdn/7-4ZZVGjYP.jpeg",
  "https://imglink.cc/cdn/xhspj0gsL-.jpeg",
  "https://imglink.cc/cdn/u33tla5pPA.jpeg",
  "https://imglink.cc/cdn/KKbd9kF9TS.jpeg",
  "https://imglink.cc/cdn/NGgPsV3mng.jpeg",
  "https://imglink.cc/cdn/UNxXDrN19m.jpeg",
  "https://imglink.cc/cdn/h_j7gy62-Y.jpeg",
  "https://imglink.cc/cdn/TwrAUb_uJ-.jpeg",
  "https://imglink.cc/cdn/BoFsNh-Jsa.jpeg",
  "https://imglink.cc/cdn/yeCnt-mwRl.jpeg",
  "https://imglink.cc/cdn/wlmYnMl5zC.jpeg",
  "https://imglink.cc/cdn/xcvuMt8JLu.jpeg",
  "https://imglink.cc/cdn/yC8CG3nhIq.jpeg",
  "https://imglink.cc/cdn/RLKsP2NqxV.jpeg"
];

const swipeConfidenceThreshold = 100;

const HandPaintingGallery: React.FC = () => {
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

          <div className="w-full flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Hand Painting
            </h2>
            <p className="text-gray-600 mt-3">
              Explore our latest Hand Painting Design
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

export default HandPaintingGallery;