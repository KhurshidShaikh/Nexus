import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import nexuslogo from "../assets/nexuslogo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navbarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setIsOpen(false);
  };

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
      // For regular routes, navigate
      window.location.href = path;
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/#about" },
    { 
      label: "Services", 
      path: "/#services",
      dropdown: [
        { label: "E-Mobility", path: "/services#emobility" },
        { label: "Renewable Energy", path: "/services#renewable" },
        { label: "Defense & Aerospace", path: "/services#defense" },
        { label: "Industrial", path: "/services#industrial" },
        { label: "Agricultural", path: "/services#agricultural" }
      ]
    },
    { label: "Customers", path: "/#customers" },
    { label: "Contact", path: "/#contact" }
  ];

  return (
    <motion.nav
      ref={navbarRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gradient-to-r from-blue-100/95 via-indigo-100/95 to-blue-100/95 backdrop-blur-md shadow-xl border-b border-blue-300/50' 
          : 'bg-gradient-to-r from-blue-100/90 via-indigo-100/90 to-blue-100/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3"
          >
            <Link to="/" className="flex items-center space-x-3">
              <img src={nexuslogo} alt="Nexus Energy" className="w-20 h-16 rounded-sm" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Nexus Energy</h1>
                <p className="text-xs text-blue-600">Solutions</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium py-2"
                    >
                      <span>{item.label}</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                        >
                          {item.dropdown.map((dropdownItem, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleLinkClick(dropdownItem.path)}
                              className="w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center space-x-3"
                            >
                              <Zap className="w-4 h-4 text-blue-500" />
                              <span>{dropdownItem.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={() => handleLinkClick(item.path)}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium py-2"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLinkClick('/#contact')}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-gradient-to-b from-blue-100/95 to-indigo-100/95 backdrop-blur-md border-t border-blue-300/50 shadow-lg"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                        className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium py-2"
                      >
                        <span>{item.label}</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 mt-2 space-y-2"
                          >
                            {item.dropdown.map((dropdownItem, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleLinkClick(dropdownItem.path)}
                                className="flex items-center space-x-3 w-full text-left text-gray-600 hover:text-blue-600 transition-colors duration-300 py-2"
                              >
                                <Zap className="w-4 h-4 text-blue-500" />
                                <span>{dropdownItem.label}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleLinkClick(item.path)}
                      className="w-full text-left text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium py-2"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA Button */}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;