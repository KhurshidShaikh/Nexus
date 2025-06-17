import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, ArrowUp, Zap, Battery, Shield, Award, ExternalLink, Heart } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import nexuslogo from "../assets/nexuslogo.png"

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const footerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger animations
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, logo: true })), 200);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, contact: true })), 400);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, services: true })), 600);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, company: true })), 800);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, bottom: true })), 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    // Scroll top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Call Us",
      value: "+91 6280 602 341",
      action: "tel:+916280602341"
    },
    {
      icon: Phone,
      label: "Alternative",
      value: "+91 9650661636",
      action: "tel:+919650661636"
    },
    {
      icon: Mail,
      label: "Email",
      value: "sales@nexusenergy.in",
      action: "mailto:sales@nexusenergy.in"
    }
  ];

  const services = [
    "Battery Energy Storage Systems",
    "Solar Energy Solutions",
    "Grid Integration Services",
    "Energy Management Systems",
    "Maintenance & Support",
    "Custom Energy Solutions"
  ];

  const companyLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Customers", path: "/customers" },
    { label: "Contact", path: "/contact" }
  ];

  const handleLinkClick = (path) => {
    if (path.startsWith('/#')) {
      // For hash links, scroll to the section
      const sectionId = path.substring(2);
      if (location.pathname === '/') {
        scrollToSection(sectionId);
      } else {
        window.location.href = `/#${sectionId}`;
      }
    } else {
      // For regular routes, use navigate
      navigate(path);
    }
  };

  return (
    <footer className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-100/80 via-indigo-100/60 to-blue-100/80 py-20">
      {/* Enhanced Modern Background Elements - Light Theme */}
      <div className="absolute inset-0">
        {/* Modern gradient overlays - Enhanced for blue background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 via-indigo-200/20 to-blue-200/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200/30 via-transparent to-blue-200/20"></div>
        
        {/* Larger, more vibrant geometric shapes - Enhanced */}
        <div className="absolute top-16 right-8 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-indigo-400/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 left-6 w-80 h-80 bg-gradient-to-tr from-indigo-300/35 to-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-blue-200/40 to-indigo-300/35 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Additional floating elements - Enhanced */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-300/25 to-indigo-400/20 rounded-full blur-xl animate-pulse delay-1500"></div>
        <div className="absolute bottom-1/3 left-1/5 w-40 h-40 bg-gradient-to-tl from-indigo-300/30 to-blue-400/25 rounded-full blur-2xl animate-pulse delay-2000"></div>
        
        {/* Modern grid pattern with enhanced opacity */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* More floating orbs with varied sizes and colors - Enhanced */}
        <div className="absolute top-32 left-1/4 w-8 h-8 bg-blue-400/60 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-48 right-1/3 w-5 h-5 bg-indigo-400/70 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-2/3 left-1/8 w-4 h-4 bg-blue-300/80 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/3 right-1/6 w-6 h-6 bg-indigo-300/65 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400/75 rounded-full animate-bounce delay-1200"></div>
        
        {/* Enhanced gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-100/90 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-blue-100/80 to-transparent"></div>
        
        {/* Subtle animated lines - Enhanced */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent animate-pulse"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent animate-pulse delay-1000"></div>
        
        {/* Modern mesh gradient effect - Enhanced */}
        <div className="absolute inset-0 opacity-25" style={{
          background: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, rgba(147, 197, 253, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          
          {/* Company Logo & Description */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-6"
            >
              <Link to="/" className="flex items-center space-x-3 mb-4">
                <img src={nexuslogo} alt="logo" className='w-20 h-20 rounded-sm' />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Nexus Energy</h3>
                  <p className="text-blue-600 text-sm">Solutions</p>
                </div>
              </Link>
            </motion.div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Powering the future with innovative energy storage solutions. 
              We deliver cutting-edge battery systems that transform how businesses 
              manage and store energy.
            </p>

            {/* Key Features */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Battery className="w-4 h-4 text-blue-500" />
                <span>Advanced Battery Technology</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>Reliable & Safe Systems</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Award className="w-4 h-4 text-blue-500" />
                <span>Industry Leading Solutions</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="transform transition-all duration-1000 delay-200"
          >
            <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                <Phone className="w-4 h-4 text-white" />
              </div>
              Get In Touch
            </h4>

            <div className="space-y-3">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="group">
                    <a
                      href={info.action}
                      className="flex items-center space-x-3 p-3 rounded-xl bg-white/90 hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <Icon className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{info.label}</p>
                        <p className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors duration-300">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  </div>
                );
              })}

              {/* Address */}
              <div className="group">
                <a
                  href="https://maps.google.com/?q=508+Rosa+Bella+Towers+Waghbil+Ghodbunder+Road+Thane+West+Mumbai+400815"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3 p-3 rounded-xl bg-white/90 hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <MapPin className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors duration-300 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Office Address</p>
                    <div className="text-gray-800 text-sm group-hover:text-blue-600 transition-colors duration-300">
                      <p>508, Rosa Bella Towers</p>
                      <p>Waghbil, Ghodbunder Road</p>
                      <p>Thane West (Mumbai)-400815</p>
                      <p>Maharashtra, India</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="transform transition-all duration-1000 delay-400"
          >
            <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                <Battery className="w-4 h-4 text-white" />
              </div>
              Our Services
            </h4>

            <div className="space-y-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-white/80 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors duration-300"></div>
                  <span className="text-gray-700 text-sm group-hover:text-gray-800 group-hover:translate-x-1 transition-all duration-300">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="transform transition-all duration-1000 delay-600"
          >
            <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                <Zap className="w-4 h-4 text-white" />
              </div>
              Quick Links
            </h4>

            <div className="space-y-3">
              {companyLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                  whileHover={{ x: 5 }}
                >
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-white/80 transition-all duration-300"
                  >
                    <motion.div 
                      className="w-2 h-2 bg-blue-500 rounded-full"
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="text-gray-700 text-sm group-hover:text-gray-800 transition-all duration-300">
                      {link.label}
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className={`mt-16 pt-8 border-t border-gray-200 transform transition-all duration-1000 delay-800 ${
          animatedItems.bottom ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <img src={nexuslogo} alt="Nexus Energy" className="w-6 h-6 rounded-sm" />
                <p className="text-gray-600 text-sm font-medium">
                  © 2025 Nexus Energy Solutions. All rights reserved.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-xs text-gray-500">
                <Link to="/privacy" className="hover:text-blue-500 transition-colors duration-300">Privacy Policy</Link>
                <span>•</span>
                <Link to="/terms" className="hover:text-blue-500 transition-colors duration-300">Terms of Service</Link>
                <span>•</span>
                <Link to="/cookies" className="hover:text-blue-500 transition-colors duration-300">Cookie Policy</Link>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>for a sustainable future</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
