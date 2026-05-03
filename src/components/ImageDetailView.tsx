import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { images } from "./ImageGallerySection";

const ImageDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const index = Number(id);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center relative">

      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 right-5 text-white text-2xl"
      >
        ✕
      </button>

      {/* Image */}
      <img
        src={images[index]}
        className="max-h-[90vh] max-w-[95vw] object-contain rounded-xl"
      />
    </div>
  );
};

export default ImageDetailView;