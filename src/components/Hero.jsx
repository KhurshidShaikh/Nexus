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
  const splashRef = useRef(null)
  
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

  // Splash cursor effect
  const createSplash = useCallback((x, y) => {
    if (!splashRef.current) return

    const splash = document.createElement('div')
    splash.className = 'splash-particle'
    
    const colors = [
      'rgba(59, 130, 246, 0.8)', // Blue
      'rgba(37, 99, 235, 0.8)', // Indigo
      'rgba(29, 78, 216, 0.8)', // Dark blue
      'rgba(147, 197, 253, 0.8)', // Light blue
      'rgba(219, 234, 254, 0.8)', // Very light blue
    ]
    
    const size = Math.random() * 20 + 10
    const color = colors[Math.floor(Math.random() * colors.length)]
    
    splash.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 1000;
      animation: splashAnimation 0.8s ease-out forwards;
    `

    splashRef.current.appendChild(splash)

    // Remove splash after animation
    setTimeout(() => {
      if (splash.parentNode) {
        splash.remove()
      }
    }, 800)
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const newMousePos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }

    setMousePos(newMousePos)

    if (isHovering && Math.random() > 0.7) {
      createSplash(newMousePos.x, newMousePos.y)
    }
  }, [isHovering, createSplash])

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
      {/* Splash container */}
      <div ref={splashRef} className="absolute inset-0 pointer-events-none z-50" />

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
              style={{ pointerEvents: 'none' }}
            >
              <motion.h1
                className="text-6xl lg:text-8xl xl:text-9xl font-black text-gray-800 leading-tight mb-8 transition-all duration-700 liquid-text"
                style={{
                  filter: textHover ? "url(#textLiquid)" : "none",
                  transform: textHover ? "scale(1.02)" : "scale(1)",
                }}
              >
                <span className="inline-block">
                  {displayText}
                  <span 
                    className={`inline-block w-2 h-16 lg:h-20 xl:h-24 bg-blue-500 ml-1 transition-opacity duration-150 ${
                      showCursor ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ 
                      animation: showCursor ? 'blink 1s infinite' : 'none',
                      verticalAlign: 'top'
                    }}
                  />
                </span>
              </motion.h1>

              <motion.p
                className="text-xl lg:text-2xl xl:text-3xl text-gray-600 leading-relaxed mb-12 max-w-4xl mx-auto font-light liquid-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                Empowering a Sustainable Future Through Efficient Energy Storage
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
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

      <style jsx>{`
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

  @keyframes splashAnimation {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.5);
      opacity: 0.8;
    }
    100% {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
  }
`}</style>
    </div>
  )
}

export default Hero
