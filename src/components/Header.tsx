import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

// Constants
const NAV_ITEMS = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Contact', href: '#contact' }
];

const TEXT_CONTENT = [
  {
    title: "Transform Your Space",
    description: "Premium digital wall painting that bring life to any environment. Our digital wall painting are designed with customizable colors and textures, offering endless possibilities to match your unique style and ambiance. Whether you need a calming atmosphere or a bold statement, our digital wall painting can be tailored to transform your space into something extraordinary.",
    price: "Starting from Rs. 160 per sq. ft.",
    bgGradient: "from-blue-900 to-purple-900",
    cta: "Explore Designs"
  },
  {
    title: "Custom Digital Wall Designs",
    description: "Tailored murals designed specifically for your space. We offer a wide range of customizable colors, patterns, and textures to fit your vision. No matter your space's size or style, our team will work with you to create the perfect digital wall painting that blends seamlessly with your decor and enhances the ambiance of your environment.",
    price: "Custom pricing based on size and complexity",
    bgGradient: "from-purple-900 to-indigo-900",
    cta: "Explore Designs"
  },
  {
    title: "Versatile Sizes and Textures",
    description: "Our digital wall painting are available in any size, from small feature walls to grand installations. We offer customizable texture options that cater to both modern and classic aesthetics. With a range of choices, you can create a mural that fits your exact needs, making every wall a unique and eye-catching centerpiece.",
    price: "Prices vary based on material and size",
    bgGradient: "from-indigo-900 to-blue-900",
    cta: "Explore Designs"
  },
  {
    title: "Seamless Installation",
    description: "Our expert installation team ensures that your digital wall painting is installed perfectly, creating a flawless, professional finish. We handle all aspects of the installation process, ensuring that your mural is applied with precision and care. With our reliable and efficient service, you can trust that your digital wall painting will be installed beautifully every time.",
    bgGradient: "from-blue-900 to-teal-900",
    cta: "Explore Designs"
  }
];

// Helper functions
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Components
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MuteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
  </svg>
);

const UnmuteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343m0 0a7.975 7.975 0 010 11.314m-11.314 0a7.975 7.975 0 010-11.314m0 0a7.975 7.975 0 015.657-2.343" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
  </svg>
);

const MaximizeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
  </svg>
);

const MinimizeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 20h12M6 4h12m-6 6v8m0-8V4" />
  </svg>
);

const VideoControls = ({
  isPlaying,
  isMuted,
  isFullscreen,
  currentTime,
  duration,
  segmentCount,
  currentSegment,
  onPlayPause,
  onMute,
  onFullscreen,
  onSeek,
  onSegmentChange
}) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 to-transparent">
      {/* Progress bar */}
      <div 
        className="w-full h-2 bg-gray-600/50 rounded-full cursor-pointer mb-2"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const percent = (e.clientX - rect.left) / rect.width;
          onSeek(percent * duration);
        }}
      >
        <div 
          className="h-full bg-blue-500 rounded-full relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Time display */}
        <div className="text-white text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {/* Main controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPlayPause}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-all"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          
          <button
            onClick={onMute}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-all"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <MuteIcon /> : <UnmuteIcon />}
          </button>
          
          <button
            onClick={onFullscreen}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-all"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
          </button>
        </div>

        {/* Segment indicators */}
        <div className="flex items-center gap-1 bg-black/50 rounded-full px-2">
          {Array.from({ length: segmentCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSegmentChange(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentSegment ? 'bg-white w-3 h-3' : 'bg-white/50'}`}
              aria-label={`Go to segment ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

VideoControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  segmentCount: PropTypes.number.isRequired,
  currentSegment: PropTypes.number.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  onMute: PropTypes.func.isRequired,
  onFullscreen: PropTypes.func.isRequired,
  onSeek: PropTypes.func.isRequired,
  onSegmentChange: PropTypes.func.isRequired
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [orientation, setOrientation] = useState(
    typeof window !== 'undefined' ? window.orientation : 0
  );
  
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const contentRef = useRef(null);

  const currentContent = TEXT_CONTENT[currentContentIndex];

  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle orientation changes
  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.orientation);
      // Lock to landscape when in fullscreen on mobile
      if (isFullscreen && isMobile) {
        try {
          screen.orientation.lock('landscape').catch(e => {
            console.log("Orientation lock failed:", e);
          });
        } catch (e) {
          console.log("Orientation API not supported:", e);
        }
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [isFullscreen, isMobile]);

  // Video event handlers
  const handleTimeUpdate = useCallback(() => {
    if (!isSeeking && videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      
      // Update content based on video progress
      const progress = videoRef.current.currentTime / duration;
      const newIndex = Math.min(
        Math.floor(progress * TEXT_CONTENT.length),
        TEXT_CONTENT.length - 1
      );
      
      if (newIndex !== currentContentIndex) {
        setCurrentContentIndex(newIndex);
      }
    }
  }, [isSeeking, duration, currentContentIndex]);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsVideoLoaded(true);
    }
  }, []);

  const handleCanPlay = useCallback(() => {
    if (isVideoPlaying && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Video play prevented:", e));
    }
  }, [isVideoPlaying]);

  // Setup video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [handleLoadedMetadata, handleCanPlay, handleTimeUpdate]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
      
      // On mobile, handle orientation when exiting fullscreen
      if (!isNowFullscreen && isMobile) {
        try {
          screen.orientation.unlock();
        } catch (e) {
          console.log("Orientation unlock not supported:", e);
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isMobile]);

  // Control functions
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleVideoPlayback = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!videoContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen
        await videoContainerRef.current.requestFullscreen();
        
        // On mobile, try to lock to landscape
        if (isMobile) {
          try {
            await screen.orientation.lock('landscape');
          } catch (e) {
            console.log("Orientation lock not supported:", e);
          }
        }
        
        setIsFullscreen(true);
      } else {
        // Exit fullscreen
        await document.exitFullscreen();
        
        // On mobile, unlock orientation
        if (isMobile) {
          try {
            screen.orientation.unlock();
          } catch (e) {
            console.log("Orientation unlock not supported:", e);
          }
        }
        
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error(`Fullscreen error: ${err.message}`);
    }
  }, [isMobile]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }, []);

  const handleSeek = useCallback((newTime) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, []);

  const goToContentSegment = useCallback((index) => {
    if (!videoRef.current) return;

    const segmentDuration = duration / TEXT_CONTENT.length;
    const newTime = index * segmentDuration;
    handleSeek(newTime);
    setCurrentContentIndex(index);
  }, [duration, handleSeek]);

  return (
    <div className="relative">
      {/* Navigation Bar with updated styling */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-indigo-900/90 backdrop-blur-lg py-4' 
            : 'bg-gradient-to-r from-indigo-900/70 via-purple-900/70 to-indigo-900/70 backdrop-blur-md py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <motion.h1 
              className="text-white text-2xl font-bold animate-text-shimmer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Best Art Technology
            </motion.h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-white relative group overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button with animation */}
            <motion.button 
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Navigation with animation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="md:hidden mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="flex flex-col space-y-4 pb-4"
                  variants={{
                    open: { transition: { staggerChildren: 0.1 } },
                    closed: { transition: { staggerChildren: 0.05 } }
                  }}
                >
                  {NAV_ITEMS.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="text-white hover:text-blue-400 transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                      whileHover={{ x: 10 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="pt-20">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Dynamic Text Content */}
          <div 
            ref={contentRef}
            className={`w-full md:w-1/2 flex items-center justify-center p-8 min-h-[400px] md:min-h-[600px] bg-gradient-to-br ${currentContent.bgGradient} transition-all duration-500`}
          >
            <div className="max-w-lg">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
                {currentContent.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-xl mb-4 text-gray-200">
                {currentContent.description}
              </p>
              <p className="text-lg font-medium mb-6 text-blue-200">
                {currentContent.price}
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
          <div 
            ref={videoContainerRef}
            className={`w-full md:w-1/2 h-[400px] md:h-[600px] relative ${isFullscreen ? 'fixed inset-0 z-50 w-screen h-screen bg-black' : ''}`}
            onDoubleClick={toggleFullscreen}
          >
            {!isVideoLoaded && (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="animate-pulse text-white">Loading video...</div>
              </div>
            )}
            
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              className={`w-full h-full ${isFullscreen ? (isMobile ? 'object-contain' : 'object-cover') : 'object-cover'} ${!isVideoLoaded ? 'hidden' : 'block'}`}
              poster="/images/video-poster.jpg"
            >
              <source src="/videos/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Controls */}
            <VideoControls
              isPlaying={isVideoPlaying}
              isMuted={isMuted}
              isFullscreen={isFullscreen}
              currentTime={currentTime}
              duration={duration}
              segmentCount={TEXT_CONTENT.length}
              currentSegment={currentContentIndex}
              onPlayPause={toggleVideoPlayback}
              onMute={toggleMute}
              onFullscreen={toggleFullscreen}
              onSeek={handleSeek}
              onSegmentChange={goToContentSegment}
            />
            
            {!isFullscreen && (
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;