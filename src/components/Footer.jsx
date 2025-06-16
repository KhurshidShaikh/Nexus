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
    <>
      <motion.footer 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        ref={footerRef} 
        className="relative bg-gray-900 text-white overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-40 h-40 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 left-20 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-green-400/5 rounded-full blur-xl animate-pulse delay-500"></div>
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
                    <h3 className="text-2xl font-bold text-white">Nexus Energy</h3>
                    <p className="text-green-400 text-sm">Solutions</p>
                  </div>
                </Link>
              </motion.div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Powering the future with innovative energy storage solutions. 
                We deliver cutting-edge battery systems that transform how businesses 
                manage and store energy.
              </p>

              {/* Key Features */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Battery className="w-4 h-4 text-green-400" />
                  <span>Advanced Battery Technology</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Reliable & Safe Systems</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Award className="w-4 h-4 text-green-400" />
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
              <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                Get In Touch
              </h4>

              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="group">
                      <a
                        href={info.action}
                        className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                      >
                        <Icon className="w-5 h-5 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">{info.label}</p>
                          <p className="text-white font-medium group-hover:text-green-100 transition-colors duration-300">
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
                    className="flex items-start space-x-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                  >
                    <MapPin className="w-5 h-5 text-green-400 group-hover:text-green-300 transition-colors duration-300 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Office Address</p>
                      <div className="text-white text-sm group-hover:text-green-100 transition-colors duration-300">
                        <p>508, Rosa Bella Towers</p>
                        <p>Waghbil, Ghodbunder Road</p>
                        <p>Thane West (Mumbai)-400815</p>
                        <p>Maharashtra, India</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                  <Battery className="w-4 h-4 text-white" />
                </div>
                Our Services
              </h4>

              <div className="space-y-3">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-green-300 transition-colors duration-300"></div>
                    <span className="text-gray-300 text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
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
              <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
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
                      className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
                    >
                      <motion.div 
                        className="w-2 h-2 bg-green-400 rounded-full"
                        whileHover={{ scale: 1.5 }}
                        transition={{ duration: 0.2 }}
                      />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-all duration-300">
                        {link.label}
                      </span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className={`mt-16 pt-8 border-t border-gray-800 transform transition-all duration-1000 delay-800 ${
            animatedItems.bottom ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <p className="text-gray-400 text-sm">
                  © 2025 Nexus Energy Solutions. All rights reserved.
                </p>
                <div className="hidden md:flex items-center space-x-4 text-xs text-gray-500">
                  <Link to="/privacy" className="hover:text-green-400 transition-colors duration-300">Privacy Policy</Link>
                  <span>•</span>
                  <Link to="/terms" className="hover:text-green-400 transition-colors duration-300">Terms of Service</Link>
                  <span>•</span>
                  <Link to="/cookies" className="hover:text-green-400 transition-colors duration-300">Cookie Policy</Link>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>for a sustainable future</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-gray-800" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
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
              className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Footer;
