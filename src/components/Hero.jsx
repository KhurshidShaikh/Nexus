import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

import img1 from "../assets/55.jpg";
import img2 from "../assets/33.jpg";
import img3 from "../assets/59.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [isVisible, setIsVisible] = useState(false);
  // const [bubbles, setBubbles] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  const slides = [
    {
      number: "01",
      title: "Lightning-Fast Charging",
      subtitle:
        "0-100% in 12 minutes with industry-leading lithium-titanate technology",
      category: "Innovation",
      image: img1,
    },
    {
      number: "02",
      title: "Military-Grade Resilience",
      subtitle:
        "25,000+ charge cycles with extreme-temperature operation (-40°C to 65°C)",
      category: "Reliability",
      image: img2,
    },
    {
      number: "03",
      title: "Uncompromised Safety",
      subtitle:
        "Zero thermal runaway during nail penetration, overcharge and deep discharge scenarios",
      category: "Certified",
      image: img3,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* SVG Filter for Gooey Effect */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="gooey" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="12"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -8"
              result="gooey"
            />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
          <filter id="text-gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -5"
              result="gooey"
            />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
          <filter id="letter-wave">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
          </filter>
          <filter
            id="gooey-strong"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="18"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -12"
              result="gooey"
            />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
          <filter id="gooey-light" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 12 -5"
              result="gooey"
            />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
          <filter id="wave-distort">
            <feTurbulence baseFrequency="0.01" numOctaves="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
          </filter>
          <filter id="liquid-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -5"
              result="liquid"
            />
            <feBlend in="SourceGraphic" in2="liquid" />
          </filter>
        </defs>
      </svg>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Navigation Numbers */}
        <div className="hidden lg:flex flex-col justify-center items-center w-20 space-y-8">
          {slides.map((slide, index) => (
            <motion.button
              key={slide.number}
              onClick={() => setCurrentSlide(index)}
              className={`transform transition-all duration-500 cursor-pointer ${
                currentSlide === index
                  ? "text-green-600 scale-110"
                  : "text-gray-400 hover:text-green-500"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              // onHoverStart={() => generateBubble(60, window.innerHeight / 2)}
            >
              <div className="text-sm font-light mb-1">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div
                className={`w-1 transition-all duration-500 ${
                  currentSlide === index
                    ? "h-8 bg-green-500"
                    : "h-4 bg-gray-200"
                }`}
              ></div>
            </motion.button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center px-6 lg:px-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <motion.span
                    className="text-6xl lg:text-8xl font-light text-green-100 relative"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(34, 197, 94, 0.3)",
                        "0 0 40px rgba(34, 197, 94, 0.5)",
                        "0 0 20px rgba(34, 197, 94, 0.3)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ filter: "url(#gooey)" }}
                  >
                    {slides[currentSlide].number}

                    {/* Bubble effect around number */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-green-400/30 rounded-full"
                        style={{
                          left: `${20 + i * 20}%`,
                          top: `${20 + (i % 2) * 40}%`,
                        }}
                        animate={{
                          scale: [0.5, 1.2, 0.5],
                          opacity: [0.3, 0.8, 0.3],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 2 + i * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </motion.span>
                  <div className="text-sm text-green-600 uppercase tracking-wider font-medium">
                    {slides[currentSlide].category}
                  </div>
                </div>

                <h1 className="text-4xl lg:text-6xl font-medium text-gray-800 leading-tight mb-6 relative">
                  {slides[currentSlide].title
                    .split(" ")
                    .map((word, wordIndex) => (
                      <motion.span
                        key={wordIndex}
                        className="inline-block relative mr-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: wordIndex * 0.1,
                          type: "spring",
                          stiffness: 100,
                        }}
                        style={{
                          filter: "url(#text-gooey)",
                          fontFamily:
                            "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          letterSpacing: "-0.01em",
                          fontWeight: 500,
                          whiteSpace: "normal",
                          wordBreak: "keep-all",
                        }}
                      >
                        {word === "Uncompromised" ? (
                          <span style={{ display: "inline-block" }}>
                            {word}
                          </span>
                        ) : (
                          word.split("").map((letter, letterIndex) => (
                            <motion.span
                              key={`${wordIndex}-${letterIndex}`}
                              className="inline-block relative"
                              whileHover={{
                                y: [-2, 2, -2],
                                scale: [1, 1.05, 1],
                                transition: {
                                  duration: 0.3,
                                  ease: "easeInOut",
                                },
                              }}
                              style={{
                                transformOrigin: "center center",
                                display: "inline-block",
                                padding: "0 0.01em",
                              }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-emerald-500/5 rounded-sm -z-10"
                                initial={{ opacity: 0 }}
                                whileHover={{
                                  opacity: [0.05, 0.15, 0.05],
                                  scale: [1, 1.05, 1],
                                  transition: {
                                    duration: 0.6,
                                    ease: "easeInOut",
                                  },
                                }}
                                style={{ filter: "url(#gooey-light)" }}
                              />
                              <motion.span
                                className="relative z-10"
                                animate={{
                                  y: [0, -0.5, 0, 0.5, 0],
                                  transition: {
                                    duration: 3 + letterIndex * 0.1,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: letterIndex * 0.03,
                                  },
                                }}
                              >
                                {letter}
                              </motion.span>
                            </motion.span>
                          ))
                        )}{" "}
                      </motion.span>
                    ))}
                </h1>

                <motion.p
                  className="text-lg text-gray-600 leading-relaxed mb-8 relative max-w-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  style={{
                    fontFamily:
                      "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    letterSpacing: "0.01em",
                    fontWeight: 400,
                  }}
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <motion.button
                    className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl cursor-pointer"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    // onHoverStart={(e) => {
                    //   const rect = e.target.getBoundingClientRect();
                    //   generateBubble(
                    //     rect.left + rect.width / 2,
                    //     rect.top + rect.height / 2
                    //   );
                    // }}
                  >
                    <span>See the details here</span>
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </motion.button>

                  <motion.button
                    className="group backdrop-blur-md bg-white/80 hover:bg-white text-gray-800 px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center space-x-2 border border-green-100 hover:border-green-200 shadow-sm cursor-pointer"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    // onHoverStart={(e) => {
                    //   const rect = e.target.getBoundingClientRect();
                    //   generateBubble(
                    //     rect.left + rect.width / 2,
                    //     rect.top + rect.height / 2
                    //   );
                    // }}
                  >
                    <Play size={20} className="text-green-600" />
                    <span>Watch Demo</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Content - Hero Image */}
            <motion.div
              className="flex items-center justify-center lg:ml-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="relative w-full max-w-lg">
                <motion.div
                  className="relative backdrop-blur-lg bg-white/80 border border-green-100 rounded-3xl p-8 shadow-lg"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 30px 60px rgba(34, 197, 94, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                        transition={{ duration: 0.7 }}
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-2xl"></div>
                  </div>

                  <motion.div
                    className="absolute -top-4 -right-4 backdrop-blur-lg bg-green-500/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md border border-green-100"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {slides[currentSlide].number}
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-md"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  <motion.div
                    className="absolute -top-2 left-1/4 w-4 h-4 bg-green-100 rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-2xl -z-10 scale-110"></div>
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
                    ? "h-8 bg-green-500"
                    : "h-4 bg-gray-200 hover:bg-green-300"
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
              currentSlide === index ? "bg-green-500 w-8" : "bg-gray-300 w-2"
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
