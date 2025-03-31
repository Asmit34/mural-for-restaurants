import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const products = {
  murals: [
    {
      id: 1,
      title: 'Boudhanath Stupa Relief',
      image: 'https://i.postimg.cc/gJT75mK8/Bouddhanath.jpg',
      description: 'Description: Stylized relief of Boudhanath Stupa in soft rose-pink with gold line accents. Creates a tactile, sculptural effect and serene, cultural atmosphere. Customizable colors and dimensions to seamlessly integrate with your existing decor, ensuring a perfect fit for any space and enhancing the overall ambiance. Ideal for luxury hotels, spas, or restaurants seeking a sophisticated, tranquil ambiance.',
      marketingAngle: "Add spiritual elegance and textural artistry. This unique mural brings the serenity of Boudhanath Stupa to your space, tailored to your decor with customizable options.",
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 2,
      title: 'Bhaktapur Durbar Square Sketch',
      image: 'https://i.postimg.cc/nLTg4vjd/Bhaktapur.jpg',
      description: 'Description: Stylized sketch of Bhaktapur Durbar Square, featuring detailed architectural outlines and a soft, warm-toned (pinkish) palette. Captures the historical charm and intricate craftsmanship of the square. Customizable colors and dimensions to create a unique and personalized statement, tailored to your specific design vision and spatial requirements. Ideal for hotels, restaurants, or cafes seeking a unique, artistic, and culturally rich ambiance.',
      marketingAngle: 'Infuse your space with artistic elegance and historical charm. This sketch of Bhaktapur Durbar Square offers a unique visual experience, customizable to perfectly complement your decor.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor',
      thumbnails: [
        'https://i.postimg.cc/3r13xvxx/Bhaktapur-Darbar-Square.jpg',
        'https://i.postimg.cc/NfHXt3y7/Bhaktapur-Darbar-Square.jpg',
        'https://i.postimg.cc/0yGJM70z/Bhaktapur-2.jpg'
      ],
    },
    {
      id: 3,
      title: 'Gorkha Darbar Sketch (Monochrome',
      image: 'https://i.postimg.cc/DmVMv6Hz/Gorkha-Darbar.jpg',
      description: 'Description: Detailed monochrome sketch of Gorkha Darbar, featuring the palace architecture against a backdrop of Himalayan mountains. Captures the historical significance and natural beauty of the location. Customizable colors and dimensions to maximize the impact of the mural, whether its a grand focal point or a subtle backdrop, adapting to any setting. Ideal for hotels, cultural centers, or restaurants seeking a sophisticated and culturally rich ambiance with a modern touch.',
      marketingAngle: 'Elevate your space with a blend of history and contemporary artistry. This Gorkha Darbar mural offers a sophisticated and culturally immersive experience, tailored to your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'

    },
    {
      id: 4,
      title: ' Bhaktapur Durbar Square Relief',
      image: 'https://i.postimg.cc/q7pW6mRh/Bhaktapur-Sketch-Art.jpg',
      description: 'Textured relief rendering of Bhaktapur Durbar Square, featuring intricate architectural details highlighted in gold against a rich brown background. Creates a sophisticated, sculptural effect with a sense of historical grandeur. Customizable colors and dimensions to seamlessly integrate with your existing decor, ensuring a perfect fit for any space and enhancing the overall ambiance. Ideal for luxury hotels, restaurants, or cultural spaces seeking a distinguished aesthetic.',
      marketingAngle: 'Add a touch of timeless elegance and cultural depth. This relief mural captures the essence of Bhaktapur, offering a unique and customizable statement piece for your space.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 5,
      title: 'Kathmandu Skyline Sketch (Sepia Tones)',
      image: 'https://i.postimg.cc/7Y0xgWxm/Kathmandu.jpg',
      description: ' Detailed sketch of the Kathmandu skyline, featuring iconic temples and stupas against a backdrop of the Himalayan mountains. Rendered in sepia tones, creating a nostalgic and culturally rich atmosphere. Captures the unique architecture and landscape of the city. Ideal for hotels, cultural centers, or restaurants seeking a sophisticated and artistic ambiance.',
      marketingAngle: 'Bring the timeless charm of Kathmandu to your space. This sepia-toned skyline sketch offers a unique blend of artistry and cultural immersion, tailored to your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 6,
      title: 'Lumbini Sketch (Textured Vintage)',
      image: 'https://i.postimg.cc/nVsVLLN8/Lumbini.jpg',
      description: 'Textured vintage sketch of Lumbini, the birthplace of Buddha, featuring the Mayadevi Temple and surrounding gardens. Uses a muted, aged palette to create a serene and historically rich atmosphere. Captures the architectural details and spiritual significance of the site. Customizable colors and dimensions to seamlessly integrate with your existing decor, ensuring a perfect fit for any space and enhancing the overall ambiance. Ideal for hotels, cultural centers, or meditation spaces seeking a tranquil and evocative ambiance.',
      marketingAngle: 'Infuse your space with peace and historical significance. This Lumbini sketch, with its textured vintage aesthetic, offers a serene and culturally immersive experience, tailored to your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 7,
      title: 'Mount Everest Sketch (Textured Vintage)',
      image: 'https://i.postimg.cc/Z5L4QvvN/Mount-Everest.jpg',
      description: 'Textured vintage sketch of the Mount Everest region, featuring dramatic mountain peaks, misty valleys, and figures amidst the landscape. Uses a muted, aged palette with hints of green to create a serene yet adventurous atmosphere. Captures the grandeur of the Himalayas and the spirit of exploration. Customizable colors and dimensions to seamlessly integrate with your existing decor, ensuring a perfect fit for any space and enhancing the overall ambiance. Ideal for hotels, travel agencies, or lounges seeking a captivating and nature-inspired design.',
      marketingAngle: '"Capture the majesty of Everest with a touch of timeless artistry. This textured vintage sketch brings the epic landscape to your space, offering a serene yet adventurous aesthetic, tailored to your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 8,
      title: 'Everest Region Sketch (Warm Hues)',
      image: 'https://i.postimg.cc/qB9J6TdN/Mount-Everest-Art.jpg',
      description: 'Stylized sketch of the Everest region, featuring dramatic mountain peaks, misty valleys, and figures amidst the landscape. Warm, muted hues (pinkish tones) create a serene yet adventurous atmosphere. Captures the grandeur of the Himalayas and the spirit of exploration. Customizable colors and dimensions to seamlessly integrate with your existing decor, ensuring a perfect fit for any space and enhancing the overall ambiance. Ideal for hotels, travel agencies, or lounges seeking a captivating and nature-inspired design.',
      marketingAngle: 'Capture the majesty of Everest. This warm-toned sketch brings the epic landscape to your space, offering a serene yet adventurous aesthetic, customized to fit your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 9,
      title: 'Fishtail Mountain Yak Sketch (Warm Hues)',
      image: 'https://i.postimg.cc/DZ4V7S0B/Village-Art-3.jpg',
      description: 'Detailed sketch of a dramatic Himalayan mountain range, featuring rugged peaks and misty valleys. Warm, muted tones (pinkish-brown) create a serene and majestic atmosphere. Captures the grandeur of the landscape and the sense of adventure. Customizable colors and dimensions to maximize the impact of the mural, whether its a grand focal point or a subtle backdrop, adapting to any setting.. Ideal for hotels, lounges, or travel agencies seeking a captivating and nature-inspired design.',
      marketingAngle: 'Bring the majestic beauty of the Himalayas to your space. This warm-toned mountain sketch offers a dramatic and serene aesthetic, customized to fit your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 10,
      title: 'Heritage Sketch (Monochrome)',
      image: 'https://i.postimg.cc/13yZDR73/Temple-Art-nepal.jpg',
      description: 'Detailed monochrome sketch showcasing iconic heritage sites and landscapes from the different Valley. Features temples, stupas, mountains, and cultural elements, creating a rich tapestry of the regions history and beauty. Ideal for hotels, cultural centers, or restaurants seeking a sophisticated and immersive cultural experience.',
      marketingAngle: 'Bring the heart of Valleys heritage to your space. This detailed sketch offers a timeless and culturally rich aesthetic, tailored to your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 11,
      title: 'Himalayan Village Path Sketch',
      image: 'https://i.postimg.cc/zfBZPtrm/Village-Art.jpg',
      description: ' Detailed sketch of a Himalayan village path leading towards a mountain peak, featuring traditional houses and a figure walking along the path. Monochromatic with fine lines, creating a serene and rustic atmosphere. Captures the essence of rural life and the natural landscape. Customizable colors and dimensions to create a unique and personalized statement, tailored to your specific design vision and spatial requirements. Ideal for hotels, restaurants, or cafes seeking a tranquil and authentic ambiance.',
      marketingAngle: 'Bring the peaceful charm of a Himalayan village to your space. This detailed sketch offers a glimpse into rural life and natural beauty, creating a serene and authentic atmosphere, customized to fit your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 12,
      title: 'Newari Women at Well Sketch',
      image: 'https://i.postimg.cc/wTXptRVr/Newari-Art-2.jpg',
      description: 'Detailed sketch depicting two Newari women drawing water from a traditional well, set against a backdrop of historic architecture. Monochromatic with subtle warm tones, creating a nostalgic and culturally rich atmosphere. Captures a moment of daily life and architectural detail. Customizable colors and dimensions, allowing you to tailor the mural to perfectly match your establishments aesthetic and create a memorable experience for your guests. Ideal for hotels, restaurants, or cultural centers seeking a sophisticated and authentic touch.',
      marketingAngle: 'Add a touch of cultural heritage and timeless charm to your space. This detailed sketch captures a serene moment of Newari life, offering a unique and authentic aesthetic, customized to fit your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 13,
      title: 'Pokhara Lakeside Sketch (Warm Tones)',
      image: 'https://i.postimg.cc/Hn8N1RSK/Fishtail-with-fewa.jpg',
      description: 'Stylized sketch of Pokhara serene lakeside, featuring mountains reflected in the water and traditional boats. Warm, muted tones (pinkish) create a tranquil and inviting atmosphere. Captures the beauty of the landscape and the peaceful essence of Pokhara. Customizable colors and dimensions to maximize the impact of the mural, whether its a grand focal point or a subtle backdrop, adapting to any setting. Ideal for hotels, restaurants, or spas seeking a calming, nature-inspired design.',
      marketingAngle: 'Bring the peaceful beauty of Pokhara to your space. This warm-toned lakeside sketch offers a tranquil escape and a touch of natural elegance, customized to fit your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id:14,
      title: 'Traditional nepali village',
      image: 'https://i.postimg.cc/qvQHwfWX/Traditional-Village-Art.jpg',
      description: 'Monochromatic relief-style sketch of a traditional Nepali village nestled in a dramatic mountain valley. Creates a sense of depth and rustic charm through textured details. Captures the essence of rural life and the natural landscape.Customizable colors and dimensions, providing flexibility to adapt the mural to any space, from expansive lobbies to intimate dining areas, ensuring a perfect fit. Ideal for hotels, restaurants, or lounges seeking a serene and artistic design.',
      marketingAngle: 'Bring the tranquil beauty of a traditional Nepali village to your space. This monochromatic relief mural offers a sophisticated and rustic aesthetic, customized to fit your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 15,
      title: ' Himalayan Village Panorama',
      image: 'https://i.postimg.cc/Rhwjn2ct/Yak-Village.jpg',
      description: 'Panoramic relief-style mural featuring a sprawling Himalayan village against a backdrop of majestic mountains. Warm, muted tones create a sense of peace and rustic charm. Detailed textures and a wide perspective bring the scene to life. Customizable colors and dimensions to create a unique and personalized statement, tailored to your specific design vision and spatial requirements. Ideal for hotels, restaurants, or lounges seeking a serene, nature-inspired ambiance.',
      marketingAngle: 'Create a tranquil escape with this panoramic Himalayan vista. This detailed relief mural brings the beauty of the mountains to your space, customized to fit your unique design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 16,
      title: ' Everest Explorers Sketch (Red Accent)',
      image: 'https://i.postimg.cc/HkmT39nH/Mount-Everest-Climbing.jpg',
      description: 'Detailed sketch of Mount Everest featuring explorers amidst the dramatic landscape, rendered with a striking red accent against a muted background. Captures the grandeur of the mountain and the spirit of adventure. Customizable colors and dimensions to seamlessly integrate with your existing decor, ensuring a perfect fit for any space and enhancing the overall ambiance. Ideal for hotels, restaurants, or lounges seeking a sophisticated, nature-inspired, and artistic design.',
      marketingAngle: 'Embark on a visual journey to the summit. This Everest explorers sketch, with its bold red accent, brings the thrill of adventure to your space, tailored to your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 17,
      title: 'Himalayan Village Relief (Red Accent)',
      image: 'https://i.postimg.cc/C5DVsRVz/Mountain-Village.jpg',
      description: 'Relief-style mural depicting a Himalayan village amidst mountains, featuring a distinct red accent against a muted background. Creates a striking visual contrast and a sense of rustic charm. Textural details and depth enhance the scene. Customizable colors and dimensions, providing flexibility to adapt the mural to any space, from expansive lobbies to intimate dining areas, ensuring a perfect fit. Ideal for hotels, restaurants, or lounges seeking a unique and eye-catching nature-inspired design.',
      marketingAngle: 'Add a touch of dramatic beauty to your space. This relief mural, with its bold red accent, brings the Himalayan landscape to life, tailored to your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 18,
      title: 'Himalayan Caravan Sketch (Monochrome)',
      image: 'https://i.postimg.cc/JnSLXbvf/Mountain-Yak.jpg',
      description: 'Detailed monochrome sketch of a caravan traversing a rugged Himalayan mountain landscape. Captures the grandeur of the mountains and the spirit of adventure. Customizable colors and dimensions to maximize the impact of the mural, whether its a grand focal point or a subtle backdrop, adapting to any setting. Ideal for hotels, travel agencies, or lounges seeking a dramatic, nature-inspired design.',
      marketingAngle: 'Bring the tranquility of the Himalayas to your space. This detailed monochrome sketch offers a timeless aesthetic and a sense of peaceful retreat, customized to fit your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 19,
      title: 'Himalayan Village Relief (Warm Orange)',
      image: 'https://i.postimg.cc/vmHbw85N/Mountain-House.jpg',
      description: 'Relief-style mural depicting a Himalayan village amidst mountains, featuring a warm orange palette. Creates a cozy and inviting atmosphere with a touch of rustic charm. Textural details and depth enhance the scene. Customizable colors and dimensions to create a unique and personalized statement, tailored to your specific design vision and spatial requirements. Ideal for hotels, restaurants, or lounges seeking a unique and eye-catching nature-inspired design.',
      marketingAngle: 'Infuse your space with the warmth and beauty of the Himalayas. This relief mural, with its inviting orange hues, brings the landscape to life, tailored to your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 20,
      title: 'Newari Women at Well Sketch',
      image: 'https://i.postimg.cc/XNy3bzy4/Newari-Art.jpg',
      description: 'Detailed sketch depicting two Newari women drawing water from a traditional well, set against a backdrop of historic architecture. Monochromatic with subtle warm tones, creating a nostalgic and culturally rich atmosphere. Captures a moment of daily life and architectural detail. Customizable colors and dimensions, allowing you to tailor the mural to perfectly match your establishments aesthetic and create a memorable experience for your guests. Ideal for hotels, restaurants, or cultural centers seeking a sophisticated and authentic touch.',
      marketingAngle: 'Add a touch of cultural heritage and timeless charm to your space. This detailed sketch captures a serene moment of Newari life, offering a unique and authentic aesthetic, customized to fit your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 21,
      title: 'Swoyambhunath Stupa Relief (Two-Tone)',
      image: 'https://i.postimg.cc/SNF4NfW8/Swoyambhunath.jpg',
      description: 'Relief-style mural of Boudhanath Stupa, featuring a striking two-tone color scheme: a warm coral-pink background with a contrasting green for the stupa details. Creates a visually captivating and culturally rich atmosphere. Textural details and depth enhance the scene. Customizable colors and dimensions, providing flexibility to adapt the mural to any space, from expansive lobbies to intimate dining areas, ensuring a perfect fit. Ideal for hotels, restaurants, or cultural centers seeking a sophisticated and authentic touch.',
      marketingAngle: 'Infuse your space with cultural vibrancy and artistic flair. This Boudhanath Stupa relief mural, with its bold two-tone palette, creates a captivating focal point, tailored to your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 22,
      title: 'Himalayan Village Terraces Sketch (Orange Palette)',
      image: 'https://i.postimg.cc/TP4M8VdK/Village-Art-2.jpg',
      description: 'Stylized sketch of a Himalayan village with terraced fields, featuring a warm, muted color palette (reds, oranges, yellows). Creates a cozy and serene atmosphere with a touch of rustic charm. Captures the unique landscape and village life. Customizable colors and dimensions, providing flexibility to adapt the mural to any space, from expansive lobbies to intimate dining areas, ensuring a perfect fit. Ideal for hotels, restaurants, or lounges seeking a peaceful, nature-inspired design.',
      marketingAngle: 'Infuse your space with the warmth and tranquility of the Himalayas. This inviting mural brings a touch of rustic beauty and peaceful scenery, customized to fit your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 23,
      title: 'Himalayan Village Relief (Warm Orange)',
      image: 'https://i.postimg.cc/Gp7rL0Qh/Mountain-village-art.jpg',
      description: 'Relief-style mural depicting a Himalayan village amidst mountains, featuring a warm orange palette. Creates a cozy and inviting atmosphere with a touch of rustic charm. Textural details and depth enhance the scene. Customizable colors and dimensions to maximize the impact of the mural, whether its a grand focal point or a subtle backdrop, adapting to any setting. Ideal for hotels, restaurants, or lounges seeking a unique and eye-catching nature-inspired design.',
      marketingAngle: 'Infuse your space with the warmth and beauty of the Himalayas. This relief mural, with its inviting orange hues, brings the landscape to life, tailored to your design vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 24,
      title: 'White Deer Family Relief',
      image: 'https://i.postimg.cc/V66TDdXz/Deer-Painting.jpg',
      description: 'Elegant relief-style mural featuring a family of white deer amidst stylized, textured branches. Creates a sophisticated and serene atmosphere with a touch of nature-inspired artistry. Customizable colors and dimensions, allowing you to tailor the mural to perfectly match your establishments aesthetic and create a memorable experience for your guests. Ideal for hotels, spas, or luxury residences seeking a calming and visually captivating design.',
      marketingAngle: 'Bring a touch of serene elegance to your space. This white deer family relief mural offers a unique blend of nature-inspired artistry and sophisticated design, tailored to your vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
    {
      id: 25,
      title: ' Mountain Deer Relief (Monochrome)',
      image: 'https://i.postimg.cc/4dYGn8Lv/Mountain-with-deer.jpg',
      description: ' Monochromatic relief-style mural depicting a serene mountain landscape with deer amidst stylized trees and rocky terrain. Creates a tranquil and sophisticated atmosphere with a touch of nature-inspired artistry. Customizable colors and dimensions to create a unique and personalized statement, tailored to your specific design vision and spatial requirements. Ideal for hotels, spas, or luxury residences seeking a calming and visually captivating design.',
      marketingAngle: 'Bring the serene beauty of the mountains indoors. This monochromatic deer relief mural offers a unique blend of nature-inspired artistry and sophisticated design, tailored to your vision.',
      details: 'Premium, fade-resistant pigments | Durable, long-lasting textures | Seamless integration with existing decor'
    },
  ],
  canvas: [
    {
      id: 1,
      title: 'Abstract Canvas Collection',
      image: 'https://i.postimg.cc/VsVHgf7F/Yak-Mountain.jpg',
      description: 'Contemporary abstract artworks that bring energy to modern spaces. Each piece is hand-finished for unique texture and depth.',
      details: 'Gallery-wrapped edges | UV-protective varnish | Ready to hang'
    },
    {
      id: 2,
      title: 'Digital Art Prints',
      image: 'https://i.postimg.cc/Kvpm9jc0/Village-Mountain-Art.jpg',
      description: 'High-resolution digital artworks printed on premium canvas with archival-quality inks that resist fading for decades.',
      details: 'Museum-grade canvas | 1.5" depth stretcher bars | Optional framing'
    },
    {
      id: 3,
      title: 'Abstract Canvas Collection',
      image: 'https://i.postimg.cc/W1DTxVhT/Village-nepal.jpg',
      description: 'Contemporary abstract artworks that bring energy to modern spaces. Each piece is hand-finished for unique texture and depth.',
      details: 'Gallery-wrapped edges | UV-protective varnish | Ready to hang'
    },
    {
      id: 4,
      title: 'Digital Art Prints',
      image: 'https://i.postimg.cc/DwtnTNXs/Village-Yak.jpg',
      description: 'High-resolution digital artworks printed on premium canvas with archival-quality inks that resist fading for decades.',
      details: 'Museum-grade canvas | 1.5" depth stretcher bars | Optional framing'
    },
    {
      id: 5,
      title: 'Abstract Canvas Collection',
      image: 'https://i.postimg.cc/LsLR6VtW/Yak-Mountain.jpg',
      description: 'Contemporary abstract artworks that bring energy to modern spaces. Each piece is hand-finished for unique texture and depth.',
      details: 'Gallery-wrapped edges | UV-protective varnish | Ready to hang'
    },
    {
      id: 6,
      title: 'Digital Art Prints',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2940&auto=format&fit=crop',
      description: 'High-resolution digital artworks printed on premium canvas with archival-quality inks that resist fading for decades.',
      details: 'Museum-grade canvas | 1.5" depth stretcher bars | Optional framing'
    },
    {
      id: 7,
      title: 'Abstract Canvas Collection',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=2858&auto=format&fit=crop',
      description: 'Contemporary abstract artworks that bring energy to modern spaces. Each piece is hand-finished for unique texture and depth.',
      details: 'Gallery-wrapped edges | UV-protective varnish | Ready to hang'
    },
    {
      id: 8,
      title: 'Digital Art Prints',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2940&auto=format&fit=crop',
      description: 'High-resolution digital artworks printed on premium canvas with archival-quality inks that resist fading for decades.',
      details: 'Museum-grade canvas | 1.5" depth stretcher bars | Optional framing'
    },
  ],
};

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredProducts = useMemo(() => {
    let result = { ...products };

    if (filter !== 'all') {
      result = { [filter]: products[filter] };
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return {
        murals: result.murals?.filter(product => 
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        ) || [],
        canvas: result.canvas?.filter(product => 
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        ) || []
      };
    }
    
    return result;
  }, [filter, products, searchQuery]);

  const sortedProducts = useMemo(() => {
    const sortFunctions = {
      'default': (a, b) => a.id - b.id,
      'title-asc': (a, b) => a.title.localeCompare(b.title),
      'title-desc': (a, b) => b.title.localeCompare(a.title),
    };

    const sorter = sortFunctions[sortOption] || sortFunctions['default'];
    
    return {
      murals: [...filteredProducts.murals || []].sort(sorter),
      canvas: [...filteredProducts.canvas || []].sort(sorter)
    };
  }, [filteredProducts, sortOption]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const showMurals = filter === 'all' || filter === 'murals';
  const showCanvas = filter === 'all' || filter === 'canvas';

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50" id="products">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-200"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Our Premium Collections
          </span>
        </motion.h2>
        
        <motion.div 
          className="max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <input
            type="text"
            className="w-full px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg bg-white/80 backdrop-blur-sm"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {['all', 'murals', 'canvas'].map((filterType) => (
              <motion.button
                key={filterType}
                className={`px-4 py-2 rounded-full ${filter === filterType ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' : 'bg-white text-gray-700 shadow-sm'}`}
                onClick={() => setFilter(filterType)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterType === 'all' ? 'All Products' : filterType === 'murals' ? 'Murals Only' : 'Canvas Only'}
              </motion.button>
            ))}
            
            <motion.select 
              className="px-4 py-2 rounded-full bg-white text-gray-700 shadow-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              whileHover={{ scale: 1.05 }}
            >
              <option value="default">Default Sorting</option>
              <option value="title-asc">Sort by Title (A-Z)</option>
              <option value="title-desc">Sort by Title (Z-A)</option>
            </motion.select>
          </div>
        </motion.div>
        
        <div className={`grid ${showMurals && showCanvas ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-3 h-[1200px] md:h-[700px]`}>
          {showMurals && (
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-semibold p-6 text-gray-800 bg-gradient-to-r from-blue-50 to-purple-50 sticky top-0 z-10 border-b border-white/20">
                Digital Wal Painting <span className="ml-2 text-sm text-gray-500"></span>
              </h3>
              <div className="overflow-y-auto h-[1200px] md:h-[600px] p-4">
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-1">
                  {sortedProducts.murals && sortedProducts.murals.length > 0 ? (
                    sortedProducts.murals.map((product, index) => (
                      <motion.div
                        key={`mural-${product.id}`}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="relative h-40 sm:h-48">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                            <h4 className="text-white text-lg font-semibold drop-shadow-md">{product.title}</h4>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      className="text-center text-gray-500 py-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {searchQuery ? 'No murals match your search' : 'No murals available'}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {showCanvas && (
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/20"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-semibold p-6 text-gray-800 bg-gradient-to-r from-purple-50 to-blue-50 sticky top-0 z-10 border-b border-white/20">
                Canvas <span className="ml-2 text-sm text-gray-500"></span>
              </h3>
              <div className="overflow-y-auto h-[1200px] md:h-[600px] p-4">
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-1">
                  {sortedProducts.canvas && sortedProducts.canvas.length > 0 ? (
                    sortedProducts.canvas.map((product, index) => (
                      <motion.div
                        key={`canvas-${product.id}`}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 + 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="relative h-40 sm:h-48">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                            <h4 className="text-white text-lg font-semibold drop-shadow-md">{product.title}</h4>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      className="text-center text-gray-500 py-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {searchQuery ? 'No canvas prints match your search' : 'No canvas prints available'}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Full-size Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-[60]" // Increased z-index
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseImage}
          >
            <motion.div
              className="relative max-w-6xl w-full max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Full size"
                className="max-w-full max-h-[90vh] object-contain"
              />
              <motion.button 
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 shadow-lg hover:bg-black/75"
                onClick={handleCloseImage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" // Lower z-index
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/30"
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <motion.img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-96 object-contain bg-gray-100 cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => handleImageClick(selectedProduct.image)}
                />
                <motion.button 
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                  onClick={handleClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              
              <div className="p-8">
                <motion.h3 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedProduct.title}
                </motion.h3>
                
                <motion.div
                  className="prose max-w-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-gray-700 mb-6 text-lg">
                    {selectedProduct.description}
                  </p>
                  
                  {selectedProduct.marketingAngle && (
                    <motion.div
                      className="bg-blue-50/50 p-5 rounded-xl mb-6 border border-blue-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h4 className="font-semibold text-blue-800 mb-2">Why Choose This:</h4>
                      <p className="text-gray-700">
                        {selectedProduct.marketingAngle}
                      </p>
                    </motion.div>
                  )}
                  
                  {selectedProduct.details && (
                    <motion.div
                      className="bg-purple-50/50 p-5 rounded-xl mb-8 border border-purple-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h4 className="font-semibold text-purple-800 mb-2">Product Details:</h4>
                      <p className="text-gray-700">
                        {selectedProduct.details}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
                
                {selectedProduct.thumbnails && (
                  <div className="px-8 pb-8">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Additional Views:</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {selectedProduct.thumbnails.map((thumbnail, index) => (
                        <motion.img
                          key={index}
                          src={thumbnail}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg cursor-pointer hover:shadow-md transition-all"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleImageClick(thumbnail)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Products;