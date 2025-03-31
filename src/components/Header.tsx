import { useState, useEffect, useRef } from 'react';

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Contact', href: '#contact' }
];

// Text content that changes with video progress
const textContent = [
  {
    title: "Transform Your Space",
    description: "Premium murals that bring life to any environment",
    cta: "View Collection",
    bgGradient: "from-blue-900 to-purple-900"
  },
  {
    title: "Custom Art Solutions",
    description: "Tailored designs for your unique space",
    cta: "See Options",
    bgGradient: "from-purple-900 to-indigo-900"
  },
  {
    title: "Premium Materials",
    description: "Museum-grade quality that lasts",
    cta: "Learn More",
    bgGradient: "from-indigo-900 to-blue-900"
  },
  {
    title: "Expert Installation",
    description: "Flawless results every time",
    cta: "Get Started",
    bgGradient: "from-blue-900 to-teal-900"
  }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const videoRef = useRef(null);
  const contentRef = useRef(null);

  // Current content based on video progress
  const currentContent = textContent[currentContentIndex];

  // Check for mobile viewport
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle video playback and content synchronization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Change content at specific intervals (every 25% of video)
      const progress = video.currentTime / video.duration;
      const segmentCount = textContent.length;
      const newIndex = Math.min(
        Math.floor(progress * segmentCount),
        segmentCount - 1
      );
      
      if (newIndex !== currentContentIndex) {
        setCurrentContentIndex(newIndex);
      }
    };

    const handleCanPlay = () => {
      if (isVideoPlaying) {
        video.play().catch(e => console.log("Auto-play prevented:", e));
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isVideoPlaying, currentContentIndex]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  // Handle manual content navigation
  const goToContentSegment = (index) => {
    if (videoRef.current) {
      const segmentDuration = videoRef.current.duration / textContent.length;
      videoRef.current.currentTime = index * segmentDuration;
      setCurrentContentIndex(index);
    }
  };

  return (
    <div className="relative">
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 py-4' : 'bg-black/60 py-6'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-2xl font-bold">
              Best Art
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-blue-400 transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4">
              <div className="flex flex-col space-y-4 pb-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-blue-400 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-20">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Dynamic Text Content */}
          <div 
            ref={contentRef}
            className={`w-full md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br ${currentContent.bgGradient} transition-all duration-500`}
          >
            <div className="max-w-lg">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
                {currentContent.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-xl mb-8 text-gray-200">
                {currentContent.description}
              </p>
              <a
                href="#products"
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                {currentContent.cta}
              </a>
            </div>
          </div>

          {/* Right Side - Video */}
          <div className="w-full md:w-1/2 h-[400px] md:h-[600px] relative">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/output.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Controls */}
            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
              <button
                onClick={toggleVideoPlayback}
                className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-all"
                aria-label={isVideoPlaying ? "Pause video" : "Play video"}
              >
                {isVideoPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
              
              {/* Content Indicator Dots */}
              <div className="flex items-center gap-1 bg-black/50 rounded-full px-2">
                {textContent.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToContentSegment(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentContentIndex ? 'bg-white w-3 h-3' : 'bg-white/50'}`}
                    aria-label={`Go to segment ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}