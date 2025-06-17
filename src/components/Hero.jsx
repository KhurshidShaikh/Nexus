import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Play, ChevronDown } from "lucide-react"
import img1 from "../assets/55.jpg"
import img2 from "../assets/33.jpg"
import img3 from "../assets/59.jpg"

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [textHover, setTextHover] = useState(false)
  const containerRef = useRef(null)
  const animationFrameRef = useRef()
  const cursorTrailRef = useRef([])
  const bubbleCountRef = useRef(0)

  // Optimized bubble creation with performance controls
  const createBubble = useCallback((x, y, type = "normal", intensity = 1) => {
    if (bubbleCountRef.current > 20) return // Reduced max bubbles for performance

    bubbleCountRef.current++
    const bubble = document.createElement("div")
    bubble.className = "liquid-bubble"

    const bubbleTypes = {
      normal: {
        colors: ["rgba(34, 197, 94, 0.15)", "rgba(16, 185, 129, 0.18)", "rgba(52, 211, 153, 0.12)"],
        size: Math.random() * 40 + 20, // Reduced size
        duration: Math.random() * 2000 + 2000, // Shorter duration
      },
      liquid: {
        colors: ["rgba(34, 197, 94, 0.2)", "rgba(16, 185, 129, 0.22)"],
        size: Math.random() * 50 + 25,
        duration: Math.random() * 1800 + 2200,
      },
      sparkle: {
        colors: ["rgba(34, 197, 94, 0.25)", "rgba(16, 185, 129, 0.28)"],
        size: Math.random() * 30 + 15,
        duration: Math.random() * 1500 + 1800,
      },
    }

    const config = bubbleTypes[type]
    const size = config.size * intensity
    const colors = config.colors

    bubble.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]} 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    left: ${x}px;
    top: ${y}px;
    transform: translate(-50%, -50%);
    z-index: 1;
    will-change: transform, opacity;
    animation: optimizedBubbleFloat ${config.duration}ms ease-out forwards;
  `

    containerRef.current?.appendChild(bubble)

    setTimeout(() => {
      if (bubble.parentNode) {
        bubble.remove()
        bubbleCountRef.current--
      }
    }, config.duration)
  }, [])

  // Cursor trail effect
  const updateCursorTrail = useCallback(
    (x, y) => {
      cursorTrailRef.current.push({ x, y, time: Date.now() })

      // Keep only recent trail points
      const now = Date.now()
      cursorTrailRef.current = cursorTrailRef.current.filter((point) => now - point.time < 1000)

      // Create trailing bubbles
      if (isHovering && cursorTrailRef.current.length > 5) {
        const trailPoint = cursorTrailRef.current[cursorTrailRef.current.length - 3]
        if (trailPoint && Math.random() > 0.7) {
          createBubble(trailPoint.x, trailPoint.y, "liquid", 0.6)
        }
      }
    },
    [isHovering, createBubble],
  )

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const newMousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      setMousePos(newMousePos)

      if (isHovering) {
        const rand = Math.random()

        // Reduced bubble creation frequency
        if (rand > 0.97) {
          createBubble(newMousePos.x, newMousePos.y, "liquid", 0.8)
        } else if (rand > 0.95) {
          createBubble(newMousePos.x, newMousePos.y, "sparkle", 0.6)
        } else if (rand > 0.93) {
          createBubble(newMousePos.x, newMousePos.y, "normal", 0.5)
        }
      }
    },
    [isHovering, createBubble],
  )

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  // Enhanced background animation
  useEffect(() => {
    const blobs = document.querySelectorAll(".background-blob")

    const animateBlobs = () => {
      blobs.forEach((blob, index) => {
        const time = Date.now() * 0.0001
        const phase = index * Math.PI * 0.4

        const x = Math.sin(time * 0.3 + phase) * 12 + Math.cos(time * 0.2 + phase) * 6
        const y = Math.cos(time * 0.25 + phase) * 8 + Math.sin(time * 0.15 + phase) * 4
        const scale = 1 + Math.sin(time * 0.4 + phase) * 0.08
        const rotate = time * 0.5 + index * 5
        const morphX = 50 + Math.sin(time * 0.6 + phase) * 10
        const morphY = 50 + Math.cos(time * 0.8 + phase) * 10

        blob.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`
        blob.style.borderRadius = `${morphX}% ${100 - morphX}% ${morphY}% ${100 - morphY}% / ${morphY}% ${morphX}% ${100 - morphY}% ${100 - morphX}%`
        blob.style.opacity = 0.15 + Math.sin(time * 0.2 + phase) * 0.05
      })

      animationFrameRef.current = requestAnimationFrame(animateBlobs)
    }

    animateBlobs()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const slides = [
    {
      number: "01",
      title: "Lightning-Fast Charging",
      subtitle: "0-100% in 12 minutes with industry-leading lithium-titanate technology",
      category: "Innovation",
      image: img1,
    },
    {
      number: "02",
      title: "Military-Grade Resilience",
      subtitle: "25,000+ charge cycles with extreme-temperature operation (-40°C to 65°C)",
      category: "Reliability",
      image: img2,
    },
    {
      number: "03",
      title: "Uncompromised Safety",
      subtitle: "Zero thermal runaway during nail penetration, overcharge and deep discharge scenarios",
      category: "Certified",
      image:img3,
    },
  ]

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/40 to-green-50/60"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
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

      {/* Enhanced Custom Cursor */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
          opacity: isHovering ? 1 : 0,
        }}
      >
        <div className="relative">
          <motion.div
            className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{ filter: "url(#liquidGlow)" }}
          />
          <motion.div
            className="absolute inset-0 w-6 h-6 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg" />
        </div>
      </div>

      {/* Optimized Background Blobs */}
      <div className="absolute inset-0 z-0">
        {[...Array(4)].map((_, i) => {
          const colors = [
            "from-green-300/8 to-emerald-400/4",
            "from-emerald-300/6 to-green-400/3",
            "from-teal-300/5 to-green-400/2",
            "from-lime-300/7 to-emerald-400/3",
          ]
          return (
            <div
              key={i}
              className={`background-blob absolute bg-gradient-to-br ${colors[i % colors.length]}`}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                width: `${Math.random() * 100 + 60}px`,
                height: `${Math.random() * 100 + 60}px`,
                borderRadius: "50%",
                willChange: "transform",
              }}
            />
          )
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex min-h-screen">
        {/* Left Navigation Numbers */}
        <div className="hidden lg:flex flex-col justify-center items-center w-20 space-y-8">
          {slides.map((slide, index) => (
            <motion.button
              key={slide.number}
              onClick={() => setCurrentSlide(index)}
              className={`transform transition-all duration-500 cursor-pointer ${
                currentSlide === index ? "text-green-600 scale-110" : "text-gray-400 hover:text-green-500"
              }`}
              whileHover={{ scale: 1.15, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={(e) => {
                const rect = e.target.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2 - containerRef.current.getBoundingClientRect().left
                const centerY = rect.top + rect.height / 2 - containerRef.current.getBoundingClientRect().top
                createBubble(centerX, centerY, "sparkle", 0.8)
              }}
            >
              <div className="text-sm font-light mb-2">{String(index + 1).padStart(2, "0")}</div>
              <div
                className={`w-0.5 transition-all duration-500 ${
                  currentSlide === index ? "h-12 bg-green-500" : "h-6 bg-gray-200"
                }`}
              ></div>
            </motion.button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center px-6 lg:px-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content with Liquid Typography */}
            <div className="space-y-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="w-full"
                onMouseEnter={() => setTextHover(true)}
                onMouseLeave={() => setTextHover(false)}
              >
                <div className="flex items-center space-x-6 mb-8">
                  <motion.span
                    className="text-7xl lg:text-9xl font-extralight text-gray-200 transition-all duration-700 liquid-text"
                    style={{
                      filter: textHover ? "url(#textLiquid)" : "none",
                      transform: textHover ? "scale(1.02)" : "scale(1)",
                    }}
                    key={`number-${currentSlide}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onMouseEnter={(e) => {
                      const rect = e.target.getBoundingClientRect()
                      const centerX = rect.left + rect.width / 2 - containerRef.current.getBoundingClientRect().left
                      const centerY = rect.top + rect.height / 2 - containerRef.current.getBoundingClientRect().top

                      // Reduced to 2 bubbles
                      for (let i = 0; i < 2; i++) {
                        setTimeout(() => {
                          createBubble(
                            centerX + (Math.random() - 0.5) * 50,
                            centerY + (Math.random() - 0.5) * 25,
                            "liquid",
                            0.8,
                          )
                        }, i * 200)
                      }
                    }}
                  >
                    {slides[currentSlide].number}
                  </motion.span>
                  <motion.div
                    className="text-sm text-green-600 uppercase tracking-widest font-medium transition-all duration-500 liquid-text"
                    style={{
                      filter: textHover ? "url(#textGlow)" : "none",
                    }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    key={`category-${currentSlide}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {slides[currentSlide].category}
                  </motion.div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`title-${currentSlide}`}
                    className="text-5xl lg:text-7xl font-light text-gray-800 leading-tight mb-6 transition-all duration-700 liquid-text"
                    style={{
                      filter: textHover ? "url(#textLiquid)" : "none",
                      transform: textHover ? "scale(1.01)" : "scale(1)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    onMouseEnter={(e) => {
                      const rect = e.target.getBoundingClientRect()
                      // Single bubble in center
                      createBubble(
                        rect.left + rect.width / 2 - containerRef.current.getBoundingClientRect().left,
                        rect.top + rect.height / 2 - containerRef.current.getBoundingClientRect().top,
                        "liquid",
                        0.6,
                      )
                    }}
                  >
                    {slides[currentSlide].title}
                  </motion.h1>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={`subtitle-${currentSlide}`}
                    className="text-xl text-gray-600 leading-relaxed mb-10 max-w-lg font-light liquid-text"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    onMouseEnter={(e) => {
                      const rect = e.target.getBoundingClientRect()
                      // Single small bubble
                      createBubble(
                        rect.left + Math.random() * rect.width - containerRef.current.getBoundingClientRect().left,
                        rect.top + Math.random() * rect.height - containerRef.current.getBoundingClientRect().top,
                        "normal",
                        0.4,
                      )
                    }}
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-full font-medium transition-all duration-500 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl cursor-pointer relative overflow-hidden"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 40px rgba(34, 197, 94, 0.3)",
                      y: -2,
                    }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={(e) => {
                      const rect = e.target.getBoundingClientRect()
                      const centerX = rect.left + rect.width / 2 - containerRef.current.getBoundingClientRect().left
                      const centerY = rect.top + rect.height / 2 - containerRef.current.getBoundingClientRect().top

                      // Reduced to 2 bubbles instead of 6
                      for (let i = 0; i < 2; i++) {
                        setTimeout(() => {
                          createBubble(
                            centerX + (Math.random() - 0.5) * 30,
                            centerY + (Math.random() - 0.5) * 15,
                            i === 0 ? "liquid" : "sparkle",
                            1.0,
                          )
                        }, i * 150)
                      }
                    }}
                    style={{ filter: "url(#textGlow)" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                    <span className="relative z-10">See the details here</span>
                    <ArrowRight
                      size={18}
                      className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </motion.button>

                  <motion.button
                    className="group backdrop-blur-md bg-white/90 hover:bg-white text-gray-800 px-10 py-4 rounded-full font-medium transition-all duration-500 flex items-center justify-center space-x-3 border border-green-100 hover:border-green-200 shadow-sm cursor-pointer relative overflow-hidden"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 8px 30px rgba(16, 185, 129, 0.2)",
                      y: -1,
                    }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={(e) => {
                      const rect = e.target.getBoundingClientRect()
                      const centerX = rect.left + rect.width / 2 - containerRef.current.getBoundingClientRect().left
                      const centerY = rect.top + rect.height / 2 - containerRef.current.getBoundingClientRect().top

                      // Single sparkle bubble
                      createBubble(centerX, centerY, "sparkle", 0.8)
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-300/10 to-emerald-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
                    <Play size={18} className="relative z-10 text-green-600" />
                    <span className="relative z-10">Watch Demo</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Hero Image */}
            <motion.div
              className="flex items-center justify-center lg:ml-8"
              initial={{ opacity: 0, scale: 0.95, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-lg">
                <motion.div
                  className="relative backdrop-blur-xl bg-white/90 border border-green-100/50 rounded-3xl p-8 shadow-xl"
                  whileHover={{
                    scale: 1.01,
                    boxShadow: "0 20px 60px rgba(34, 197, 94, 0.15)",
                    y: -5,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onMouseEnter={(e) => {
                    const rect = e.target.getBoundingClientRect()
                    const centerX = rect.left + rect.width / 2 - containerRef.current.getBoundingClientRect().left
                    const centerY = rect.top + rect.height / 2 - containerRef.current.getBoundingClientRect().top

                    for (let i = 0; i < 8; i++) {
                      setTimeout(() => {
                        createBubble(
                          centerX + (Math.random() - 0.5) * rect.width,
                          centerY + (Math.random() - 0.5) * rect.height,
                          i % 2 === 0 ? "liquid" : "normal",
                          0.8,
                        )
                      }, i * 100)
                    }
                  }}
                >
                  <div className="aspect-square w-full bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-2xl flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        className="w-full h-full object-cover rounded-2xl"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </AnimatePresence>
                  </div>

                  <motion.div
                    className="absolute -top-3 -right-3 backdrop-blur-xl bg-green-500/95 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-white/20"
                    animate={{
                      boxShadow: [
                        "0 0 15px rgba(34, 197, 94, 0.3)",
                        "0 0 25px rgba(22, 163, 74, 0.4)",
                        "0 0 15px rgba(34, 197, 94, 0.3)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    style={{ filter: "url(#textGlow)" }}
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
          <div className="flex flex-col space-y-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-0.5 transition-all duration-500 cursor-pointer ${
                  currentSlide === index ? "h-12 bg-green-500" : "h-6 bg-gray-200 hover:bg-green-300"
                }`}
                whileHover={{ scale: 1.5, x: -3 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={(e) => {
                  const rect = e.target.getBoundingClientRect()
                  const centerX = rect.left + rect.width / 2 - containerRef.current.getBoundingClientRect().left
                  const centerY = rect.top + rect.height / 2 - containerRef.current.getBoundingClientRect().top
                  createBubble(centerX, centerY, "sparkle", 0.6)
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <ChevronDown size={24} className="text-green-500 opacity-70" />
      </motion.div>

      {/* Mobile Slide Indicators */}
      <div className="lg:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              currentSlide === index ? "bg-green-500 w-8" : "bg-gray-300 w-1.5"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-emerald-50/30 to-green-50/50"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/20 via-transparent to-emerald-50/30"></div>

        <div className="absolute top-16 right-8 w-96 h-96 bg-gradient-to-br from-green-400/25 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 left-6 w-80 h-80 bg-gradient-to-tr from-emerald-400/30 to-green-500/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-green-300/35 to-emerald-400/30 rounded-full blur-2xl animate-pulse delay-500"></div>

        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-green-300/20 to-emerald-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
        <div className="absolute bottom-1/3 left-1/5 w-40 h-40 bg-gradient-to-tl from-emerald-300/25 to-green-400/20 rounded-full blur-2xl animate-pulse delay-2000"></div>

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>

        <div className="absolute top-32 left-1/4 w-8 h-8 bg-green-400/50 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-48 right-1/3 w-5 h-5 bg-emerald-400/60 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-2/3 left-1/8 w-4 h-4 bg-green-300/70 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/3 right-1/6 w-6 h-6 bg-emerald-300/55 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-green-400/65 rounded-full animate-bounce delay-1200"></div>

        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/90 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/70 to-transparent"></div>

        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-300/30 to-transparent animate-pulse"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent animate-pulse delay-1000"></div>

        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, rgba(52, 211, 153, 0.05) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <style jsx>{`
  @keyframes optimizedBubbleFloat {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }
    20% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.6;
    }
    100% {
      transform: translate(-50%, -50%) scale(0) translateY(-60px);
      opacity: 0;
    }
  }

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
`}</style>
    </div>
  )
}

export default Hero
