import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import nexuslogo from "../assets/nexuslogo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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

      // First scroll to top if we're not already there
      if (window.pageYOffset > 0) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }

      // Then scroll to the section after a small delay
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const navLinks = [
    { name: 'About', path: '/about', sectionId: 'about' },
    { name: 'Services', path: '/services', sectionId: 'services' },
    { name: 'Customers', path: '/customers', sectionId: 'customers' },
    { name: 'Contact Us', path: '/contact', sectionId: 'contact' }
  ];

  const handleNavClick = (link) => {
    if (location.pathname === '/') {
      // If we're on the home page, scroll to section
      scrollToSection(link.sectionId);
    } else {
      // If we're on another page, navigate to home and then scroll
      navigate('/');
      // Use a longer timeout to ensure navigation completes
      setTimeout(() => {
        scrollToSection(link.sectionId);
      }, 500);
    }
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'backdrop-blur-xl bg-gray-900/95 border-b border-gray-800 shadow-lg' 
            : 'backdrop-blur-lg bg-gray-900/90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo/Brand */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300">
                <img src={nexuslogo} alt="logo" className='w-20 h-18 rounded-sm' />
                <span className="text-white font-bold text-xl tracking-wide">Nexus</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link
                    to={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link);
                    }}
                    className="relative text-gray-300 hover:text-white font-medium transition-all duration-300 group"
                  >
                    {link.name}
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right side - Get in Touch button */}
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick({ path: '/contact', sectionId: 'contact' });
                  }}
                  className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>Get in Touch</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
              
              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="md:hidden fixed inset-0 z-40"
            >
              <div 
                className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Mobile Sidebar */}
              <motion.div 
                className="absolute top-0 right-0 h-full w-80 max-w-[80vw] bg-gray-900/95 backdrop-blur-xl border-l border-gray-800 shadow-lg"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                      <img src={nexuslogo} alt="logo" className='w-12 h-12 rounded-sm' />
                      <span className="text-white font-bold text-xl">Nexus</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsOpen(false)}
                      className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300"
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                  
                  <nav className="space-y-4">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={link.path}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(link);
                          }}
                          className="block w-full py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300 font-medium text-left"
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;