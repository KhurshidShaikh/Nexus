import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

import img1 from "../assets/55.jpg"
import img2 from "../assets/33.jpg"
import img3 from "../assets/59.jpg"

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [textHover, setTextHover] = useState(false);
  const containerRef = useRef(null);
  const animationFrameRef = useRef();

  // Enhanced blob creation with attractive green colors
  const createBlob = (x, y) => {
    const blob = document.createElement('div');
    blob.className = 'gooey-blob';
    const colors = [
      'radial-gradient(circle, rgba(34, 197, 94, 0.3), rgba(22, 163, 74, 0.1))',
      'radial-gradient(circle, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.1))',
      'radial-gradient(circle, rgba(52, 211, 153, 0.25), rgba(6, 182, 212, 0.08))',
      'radial-gradient(circle, rgba(101, 163, 13, 0.25), rgba(65, 131, 20, 0.08))'
    ];
    
    blob.style.cssText = `
      position: absolute;
      width: ${Math.random() * 80 + 40}px;
      height: ${Math.random() * 80 + 40}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      pointer-events: none;
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%);
      filter: blur(${Math.random() * 2 + 1}px);
      z-index: 1;
    `;
    
    containerRef.current?.appendChild(blob);
    
    // Slower, more elegant animation
    const animation = blob.animate([
      {
        transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
        opacity: 0
      },
      {
        transform: `translate(-50%, -50%) scale(1) rotate(${Math.random() * 180}deg) translate(${(Math.random() - 0.5) * 80}px, ${-Math.random() * 100 - 30}px)`,
        opacity: 0.8,
        offset: 0.4
      },
      {
        transform: `translate(-50%, -50%) scale(0.2) rotate(${Math.random() * 360}deg) translate(${(Math.random() - 0.5) * 150}px, ${-Math.random() * 200 - 80}px)`,
        opacity: 0
      }
    ], {
      duration: Math.random() * 4000 + 3000, // Slower duration: 3-7 seconds
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smoother easing
    });
    
    animation.onfinish = () => {
      blob.remove();
    };
  };

  // Enhanced mouse move handler with reduced frequency
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newMousePos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    setMousePos(newMousePos);
    
    // Less frequent blob creation for slower animation
    if (isHovering && Math.random() > 0.92) { // Reduced from 0.85 to 0.92
      createBlob(newMousePos.x, newMousePos.y);
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Enhanced background animation with much slower, professional movement
  useEffect(() => {
    const blobs = document.querySelectorAll('.background-blob');
    
    const animateBlobs = () => {
      blobs.forEach((blob, index) => {
        const time = Date.now() * 0.0002; // Much slower: reduced from 0.0008 to 0.0002
        const x = Math.sin(time * 0.1 + index * 0.3) * 15 + Math.cos(time * 0.08 + index) * 8; // Reduced movement range
        const y = Math.cos(time * 0.12 + index * 0.2) * 12 + Math.sin(time * 0.09 + index) * 6; // Reduced movement range
        const scale = 1 + Math.sin(time * 0.15 + index * 0.4) * 0.08; // Reduced scale variation
        const rotate = time * 2 + index * 10; // Much slower rotation
        
        blob.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`;
      });
      
      animationFrameRef.current = requestAnimationFrame(animateBlobs);
    };
    
    animateBlobs();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const slides = [
    {
      number: "01",
      title: "Lightning-Fast Charging",
      subtitle: "0-100% in 12 minutes with industry-leading lithium-titanate technology",
      category: "Innovation",
      image: img1
    },
    {
      number: "02", 
      title: "Military-Grade Resilience",
      subtitle: "25,000+ charge cycles with extreme-temperature operation (-40°C to 65°C)",
      category: "Reliability",
      image: img2
    },
    {
      number: "03",
      title: "Uncompromised Safety", 
      subtitle: "Zero thermal runaway during nail penetration, overcharge and deep discharge scenarios",
      category: "Certified",
      image: img3
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Enhanced SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="gooey" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="gooey"/>
            <feBlend in="SourceGraphic" in2="gooey"/>
          </filter>
          <filter id="textGooey" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -6" result="gooey"/>
            <feBlend in="SourceGraphic" in2="gooey"/>
          </filter>
          <filter id="textHoverGooey" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="gooey"/>
            <feBlend in="SourceGraphic" in2="gooey"/>
          </filter>
        </defs>
      </svg>

      {/* Enhanced Custom Cursor with Green Theme */}
      <div 
        className="fixed pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          opacity: isHovering ? 1 : 0
        }}
      >
        <div className="relative">
          <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
          <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full animate-ping opacity-60" />
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Enhanced Background Blobs with Green Theme */}
      <div className="absolute inset-0" style={{ filter: 'url(#gooey)' }}>
        {[...Array(8)].map((_, i) => {
          const colors = [
            'from-green-400/20 to-emerald-500/10',
            'from-emerald-400/20 to-green-500/10',
            'from-teal-400/15 to-green-500/8',
            'from-lime-400/18 to-emerald-500/9'
          ];
          return (
            <div
              key={i}
              className={`background-blob absolute rounded-full bg-gradient-to-r backdrop-blur-sm ${colors[i % colors.length]}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 200 + 80}px`,
                height: `${Math.random() * 200 + 80}px`,
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Navigation Numbers */}
        <div className="hidden lg:flex flex-col justify-center items-center w-20 space-y-8">
          {slides.map((slide, index) => (
            <motion.button
              key={slide.number}
              onClick={() => setCurrentSlide(index)}
              className={`transform transition-all duration-300 cursor-pointer ${
                currentSlide === index 
                  ? 'text-green-600 scale-110' 
                  : 'text-gray-400 hover:text-green-500'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-sm font-light mb-1">{String(index + 1).padStart(2, '0')}</div>
              <div className={`w-1 transition-all duration-300 ${
                currentSlide === index ? 'h-8 bg-green-500' : 'h-4 bg-gray-200'
              }`}></div>
            </motion.button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center px-6 lg:px-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content with Enhanced Gooey Text */}
            <div className="space-y-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full"
                onMouseEnter={() => setTextHover(true)}
                onMouseLeave={() => setTextHover(false)}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <motion.span 
                    className="text-6xl lg:text-8xl font-light text-gray-300 transition-all duration-500"
                    style={{ 
                      filter: textHover ? 'url(#textHoverGooey)' : 'url(#textGooey)',
                      transform: textHover ? 'scale(1.05)' : 'scale(1)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {slides[currentSlide].number}
                  </motion.span>
                  <motion.div 
                    className="text-sm text-green-600 uppercase tracking-wider font-medium transition-all duration-300"
                    style={{ 
                      filter: textHover ? 'url(#textGooey)' : 'none',
                      transform: textHover ? 'scale(1.1)' : 'scale(1)'
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {slides[currentSlide].category}
                  </motion.div>
                </div>
                
                <motion.h1 
                  className="text-4xl lg:text-6xl font-medium text-gray-800 leading-tight mb-6 transition-all duration-500"
                  style={{ 
                    filter: textHover ? 'url(#textHoverGooey)' : 'url(#textGooey)',
                    transform: textHover ? 'scale(1.02)' : 'scale(1)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>
                
                <motion.p 
                  className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl transition-all duration-300"
                  style={{ 
                    filter: textHover ? 'url(#textGooey)' : 'none',
                    transform: textHover ? 'scale(1.01)' : 'scale(1)'
                  }}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: textHover ? [0.9, 1, 0.9] : [0.8, 1, 0.8] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button 
                    className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl cursor-pointer"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(34, 197, 94, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={(e) => {
                      const rect = e.target.getBoundingClientRect();
                      createBlob(rect.left + rect.width/2 - containerRef.current.getBoundingClientRect().left, 
                                rect.top + rect.height/2 - containerRef.current.getBoundingClientRect().top);
                    }}
                  >
                    <span>See the details here</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                  
                  <motion.button 
                    className="group backdrop-blur-md bg-white/80 hover:bg-white text-gray-800 px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center space-x-2 border border-green-100 hover:border-green-200 shadow-sm cursor-pointer"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={(e) => {
                      const rect = e.target.getBoundingClientRect();
                      createBlob(rect.left + rect.width/2 - containerRef.current.getBoundingClientRect().left, 
                                rect.top + rect.height/2 - containerRef.current.getBoundingClientRect().top);
                    }}
                  >
                    <Play size={20} className="text-green-600" />
                    <span>Watch Demo</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
            
            {/* Right Content - Hero Image */}
            <motion.div 
              className="flex items-center justify-center lg:ml-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative w-full max-w-lg">
                <motion.div 
                  className="relative backdrop-blur-lg bg-white/80 border border-green-100 rounded-3xl p-8 shadow-lg"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(34, 197, 94, 0.2)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-square w-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={currentSlide}
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        className="w-full h-full object-cover rounded-2xl"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.6 }}
                      />
                    </AnimatePresence>
                  </div>
                  
                  <motion.div 
                    className="absolute -top-4 -right-4 backdrop-blur-lg bg-green-500/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md border border-green-100"
                    animate={{ 
                      boxShadow: [
                        '0 0 10px rgba(34, 197, 94, 0.3)',
                        '0 0 20px rgba(22, 163, 74, 0.5)',
                        '0 0 10px rgba(34, 197, 94, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {slides[currentSlide].number}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side Indicators */}
        <div className="hidden lg:flex flex-col justify-center items-center w-20 space-y-4">
          <div className="flex flex-col space-y-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-1 transition-all duration-300 cursor-pointer ${
                  currentSlide === index 
                    ? 'h-8 bg-green-500' 
                    : 'h-4 bg-gray-200 hover:bg-green-300'
                }`}
                whileHover={{ scale: 1.2, x: -2 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={24} className="text-green-500" />
      </motion.div>

      {/* Mobile Slide Indicators */}
      <div className="lg:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index ? 'bg-green-500 w-8' : 'bg-gray-300 w-2'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;