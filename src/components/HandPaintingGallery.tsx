import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const handPaintingImages = [
  "https://imglink.cc/cdn/BzC5K-E_uW.jpg",
  "https://imglink.cc/cdn/4FcjG9M7pi.jpg",
  "https://imglink.cc/cdn/yBpm9_XzVX.jpg",
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
  "https://imglink.cc/cdn/F03AIsNxeg.jpg",
  "https://imglink.cc/cdn/ubtbOFYDLG.jpg",
  "https://imglink.cc/cdn/PIT4ioAkUY.jpg",
  "https://imglink.cc/cdn/UGregfyL9F.jpg",
  "https://imglink.cc/cdn/dMH86ySlRp.jpg",
  "https://imglink.cc/cdn/p-UtNuW5qX.jpg",
  "https://imglink.cc/cdn/gUX4geMFJA.jpg",
  "https://imglink.cc/cdn/uWbTz9kk2-.jpg",
  "https://imglink.cc/cdn/t6GhRjrS17.jpg"
];

const HandPaintingGallery: React.FC = () => {
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
    setSelectedIndex(
      (selectedIndex + 1) % handPaintingImages.length
    );
  };

  const prevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      (selectedIndex - 1 + handPaintingImages.length) %
        handPaintingImages.length
    );
  };

  return (
    <section className="w-full min-h-screen bg-white py-10">
      <div className="container mx-auto px-4">

        {/* TITLE */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Hand Painting Collection
          </h1>
          <p className="text-gray-600 mt-2">
            Exclusive handcrafted designs
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6">
          {handPaintingImages.map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer overflow-hidden rounded-xl shadow-lg"
              onClick={() => openImage(index)}
            >
              <img
                src={img}
                alt={`Hand Painting ${index + 1}`}
                className="w-full h-[500px] object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        {/* LIGHTBOX */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >

              {/* CLOSE */}
              <button
                onClick={closeImage}
                className="absolute top-5 right-5 text-white bg-white/20 p-2 rounded-full hover:bg-white/30"
              >
                <X size={30} />
              </button>

              {/* LEFT */}
              <button
                onClick={prevImage}
                className="absolute left-3 md:left-8 text-white bg-white/20 p-2 rounded-full hover:bg-white/30"
              >
                <ChevronLeft size={40} />
              </button>

              {/* IMAGE */}
              <motion.img
                key={selectedIndex}
                src={handPaintingImages[selectedIndex]}
                alt="Hand Painting Preview"
                className="max-h-[85vh] max-w-[95vw] object-contain rounded-xl shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* RIGHT */}
              <button
                onClick={nextImage}
                className="absolute right-3 md:right-8 text-white bg-white/20 p-2 rounded-full hover:bg-white/30"
              >
                <ChevronRight size={40} />
              </button>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default HandPaintingGallery;