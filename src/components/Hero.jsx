import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Play, ChevronDown } from "lucide-react"
import HyperspeedBackground from "./HyperspeedBackground"

const Hero = () => {
  const [textHover, setTextHover] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef(null)
  
  const fullText = "NEXUS ENERGY"

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 150) // Speed of typing

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText])

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const newMousePos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }

    setMousePos(newMousePos)
  }, [])

  // Function to scroll to customers section
  const scrollToCustomers = () => {
    const customersSection = document.getElementById('customers')
    if (customersSection) {
      customersSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Hyperspeed Background Effect */}
      <HyperspeedBackground />

      {/* Simplified SVG Filters for better performance */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="gooey" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -5"
              result="gooey"
            />
          </filter>
          <filter id="textGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Main Content */}
      <div className="relative z-20 flex min-h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center px-6 lg:px-16">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="w-full"
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-black text-gray-800 leading-tight mb-4 transition-all duration-700 liquid-text cursor-pointer"
                style={{
                  filter: textHover ? "url(#textLiquid)" : "none",
                  transform: textHover ? "scale(1.02)" : "scale(1)",
                }}
                onMouseEnter={() => setTextHover(true)}
                onMouseLeave={() => setTextHover(false)}
                whileHover={{
                  scale: 1.05,
                  y: -5
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <span className="inline-block">
                  {displayText.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      className={`inline-block ${char === ' ' ? 'w-4 sm:w-6 md:w-8 lg:w-12 xl:w-16' : ''}`}
                      whileHover={{
                        y: -10,
                        rotate: 5,
                        scale: 1.2
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut"
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <span 
                    className={`inline-block w-2 bg-blue-500 ml-1 transition-opacity duration-150 ${
                      showCursor ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ 
                      animation: showCursor ? 'blink 1s infinite' : 'none',
                      height: '0.8em',
                      verticalAlign: 'baseline',
                      marginTop: '0.3em'
                    }}
                  />
                </span>
              </motion.h1>

              {/* Dynamic Subtitle */}
              <motion.h2
                className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-700 mb-6 cursor-pointer animate-float"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  y: -3
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                  Powering Tomorrow's Innovation
                </span>
              </motion.h2>

              <motion.p
                className="text-xl lg:text-2xl xl:text-3xl text-gray-600 leading-relaxed mb-8 max-w-4xl mx-auto font-light liquid-text cursor-pointer animate-gentle-float"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.02,
                  y: -2
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                  Revolutionizing Energy Storage
                </span>{" "}
                <span className="text-gray-600">
                  with cutting-edge battery technology for a sustainable tomorrow
                </span>
              </motion.p>

              {/* Enhanced Subtitle with Key Benefits */}
              <motion.div
                className="flex flex-wrap justify-center gap-6 mb-12 text-sm lg:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              >
                <motion.div 
                  className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                  whileHover={{ scale: 1.1, y: -8 }}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse group-hover:animate-ping"></div>
                  <span className="text-blue-700 font-medium group-hover:text-blue-800 transition-colors duration-300">99.8% Uptime</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  whileHover={{ scale: 1.1, y: -8 }}
                >
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse group-hover:animate-ping"></div>
                  <span className="text-indigo-700 font-medium group-hover:text-indigo-800 transition-colors duration-300">40% Cost Reduction</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full hover:bg-green-100 hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  whileHover={{ scale: 1.1, y: -8 }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse group-hover:animate-ping"></div>
                  <span className="text-green-700 font-medium group-hover:text-green-800 transition-colors duration-300">Zero Emissions</span>
                </motion.div>
              </motion.div>

              {/* Enhanced CTA Section */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                style={{ pointerEvents: 'auto' }}
              >
                <motion.button
                  onClick={scrollToCustomers}
                  className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-12 py-5 rounded-full font-bold transition-all duration-500 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl cursor-pointer relative overflow-hidden text-lg"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 40px rgba(59, 130, 246, 0.3)",
                    y: -2,
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ filter: "url(#textGlow)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  <span className="relative z-10">Explore Our Solutions</span>
                  <ArrowRight
                    size={20}
                    className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              >
                <p className="text-sm text-gray-500 mb-4">Trusted by Industry Leaders</p>
                <div className="flex justify-center items-center space-x-8 opacity-60">
                  <div className="text-xs text-gray-400">⚡ ASIL-D Certified</div>
                  <div className="text-xs text-gray-400">🛡️ ISO 9001:2015</div>
                  <div className="text-xs text-gray-400">🌱 Green Technology</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ pointerEvents: 'none' }}
      >
        <ChevronDown size={24} className="text-blue-500 opacity-70" />
      </motion.div>

      <style>{`
  .liquid-text {
    transition: transform 0.2s ease-out;
  }

  .liquid-text:hover {
    transform: scale(1.01);
  }

  .background-blob {
    animation: gentleFloat 8s ease-in-out infinite;
  }

  @keyframes gentleFloat {
    0%, 100% {
      transform: translateY(0px) scale(1);
    }
    50% {
      transform: translateY(-10px) scale(1.02);
    }
  }

  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0;
    }
  }

  @keyframes gradient-x {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 3s ease infinite;
  }

  /* Enhanced hover effects */
  .liquid-text:hover {
    text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  }

  /* Glow effect for main text */
  .liquid-text:hover span {
    filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
  }

  /* Magnetic hover effect */
  .magnetic-hover {
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .magnetic-hover:hover {
    transform: translateY(-2px) scale(1.02);
  }

  /* Continuous floating animations */
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }

  .animate-gentle-float {
    animation: gentleFloat 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  @keyframes gentleFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-4px);
    }
  }

  /* Enhanced text animations */
  .liquid-text:hover {
    animation: textGlow 2s ease-in-out infinite;
  }

  @keyframes textGlow {
    0%, 100% {
      text-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    }
    50% {
      text-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
    }
  }
`}</style>
    </div>
  )
}

export default Hero
