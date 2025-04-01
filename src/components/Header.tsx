import { useState, useEffect, useRef } from 'react';

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Contact', href: '#contact' }
];

const textContent = [
  {
    title: "Transform Your Space",
    description: "Premium digital wall painting that bring life to any environment. Our digital wall painting are designed with customizable colors and textures, offering endless possibilities to match your unique style and ambiance. Whether you need a calming atmosphere or a bold statement, our digital wall painting can be tailored to transform your space into something extraordinary.",
    bgGradient: "from-blue-900 to-purple-900"
  },
  {
    title: "Custom Digital Wall Designs",
    description: "Tailored murals designed specifically for your space. We offer a wide range of customizable colors, patterns, and textures to fit your vision. No matter your space's size or style, our team will work with you to create the perfect digital wall painting that blends seamlessly with your decor and enhances the ambiance of your environment.",
    bgGradient: "from-purple-900 to-indigo-900"
  },
  {
    title: "Versatile Sizes and Textures",
    description: "Our digital wall painting are available in any size, from small feature walls to grand installations. We offer customizable texture options that cater to both modern and classic aesthetics. With a range of choices, you can create a mural that fits your exact needs, making every wall a unique and eye-catching centerpiece.",
    bgGradient: "from-indigo-900 to-blue-900"
  },
  {
    title: "Seamless Installation",
    description: "Our expert installation team ensures that your digital wall painting is installed perfectly, creating a flawless, professional finish. We handle all aspects of the installation process, ensuring that your mural is applied with precision and care. With our reliable and efficient service, you can trust that your digital wall painting will be installed beautifully every time.",
    bgGradient: "from-blue-900 to-teal-900"
  }
];

export default function Header() {
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
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const contentRef = useRef(null);
  const progressBarRef = useRef(null);

  const currentContent = textContent[currentContentIndex];

  // Format time (seconds) to MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle video playback and content synchronization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Update current time
      if (!isSeeking) {
        setCurrentTime(video.currentTime);
      }

      // Update content based on video progress
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

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleCanPlay = () => {
      if (isVideoPlaying) {
        video.play().catch(e => console.log("Video auto-play prevented:", e));
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isVideoPlaying, currentContentIndex, isSeeking]);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleVideoPlayback = async () => {
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
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;

    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen().catch(err => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Handle manual content navigation
  const goToContentSegment = (index) => {
    if (!videoRef.current) return;

    const segmentDuration = videoRef.current.duration / textContent.length;
    const newTime = index * segmentDuration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setCurrentContentIndex(index);
  };

  const handleProgressBarMouseDown = () => {
    setIsSeeking(true);
  };

  const handleProgressBarMouseUp = (e) => {
    if (!videoRef.current || !progressBarRef.current) return;
    
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setIsSeeking(false);
  };

  const handleProgressBarMouseMove = (e) => {
    if (!isSeeking) return;
    
    const progressBar = progressBarRef.current;
    if (!progressBar) return;
    
    const rect = progressBar.getBoundingClientRect();
    const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const newTime = percent * duration;
    
    setCurrentTime(newTime);
  };

  const handleProgressBarClick = (e) => {
    if (!videoRef.current || !progressBarRef.current) return;
    
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
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
                Explore Our Collection
              </a>
            </div>
          </div>

          {/* Right Side - Video */}
          <div 
            ref={videoContainerRef}
            className={`w-full md:w-1/2 h-[400px] md:h-[600px] relative ${isFullscreen ? 'fixed inset-0 z-50 w-screen h-screen bg-black' : ''}`}
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className={`w-full h-full object-cover ${isFullscreen ? 'object-contain' : 'object-cover'}`}
            >
              <source src="/videos/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Progress bar container */}
            <div 
              className="absolute bottom-16 left-0 right-0 px-4 z-10"
              onMouseDown={handleProgressBarMouseDown}
              onMouseUp={handleProgressBarMouseUp}
              onMouseMove={handleProgressBarMouseMove}
              onMouseLeave={() => setIsSeeking(false)}
            >
              <div 
                ref={progressBarRef}
                className="w-full h-2 bg-gray-600/50 rounded-full cursor-pointer"
                onClick={handleProgressBarClick}
              >
                <div 
                  className="h-full bg-blue-500 rounded-full relative"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Time display */}
            <div className="absolute bottom-20 left-4 text-white text-sm z-10">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            
            {/* Controls container */}
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
              
              <button
                onClick={toggleMute}
                className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-all"
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {isMuted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343m0 0a7.975 7.975 0 010 11.314m-11.314 0a7.975 7.975 0 010-11.314m0 0a7.975 7.975 0 015.657-2.343" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-all"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 20h12M6 4h12m-6 6v8m0-8V4" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
              
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
            
            {!isFullscreen && (
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}