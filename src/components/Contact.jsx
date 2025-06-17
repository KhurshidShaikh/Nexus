import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Send, User, MessageSquare, Building, ArrowRight, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger animations
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, header: true })), 200);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, form: true })), 400);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, contact1: true })), 600);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, contact2: true })), 800);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, contact3: true })), 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Phone validation (optional but must be valid if provided)
    if (formData.phone.trim() && !/^[0-9+\-\s()]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Invalid phone number';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact Form Submission from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `Message:\n${formData.message}`
    );
    
    const mailtoLink = `mailto:sales@nexusenergy.in?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setErrors({});
      }, 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+91 6280 602 341", "+91 9650661636"],
      color: "from-green-500 to-emerald-500",
      delay: "contact1",
      action: "tel:+916280602341"
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["sales@nexusenergy.in"],
      color: "from-emerald-500 to-green-600",
      delay: "contact2",
      action: "mailto:sales@nexusenergy.in"
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: [
        "508, Rosa Bella Towers",
        "Waghbil, Ghodbunder Road",
        "Thane West (Mumbai)-400815",
        "Maharashtra, India"
      ],
      color: "from-green-600 to-emerald-400",
      delay: "contact3",
      action: "https://maps.google.com/?q=508+Rosa+Bella+Towers+Waghbil+Ghodbunder+Road+Thane+West+Mumbai+400815"
    }
  ];

  return (
    <div id="contact" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/40 to-green-50/60 py-20">
      {/* Enhanced Modern Background Elements */}
      <div className="absolute inset-0">
        {/* Modern gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-emerald-50/30 to-green-50/50"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/20 via-transparent to-emerald-50/30"></div>
        
        {/* Larger, more vibrant geometric shapes */}
        <div className="absolute top-16 right-8 w-96 h-96 bg-gradient-to-br from-green-400/25 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 left-6 w-80 h-80 bg-gradient-to-tr from-emerald-400/30 to-green-500/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-green-300/35 to-emerald-400/30 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-green-300/20 to-emerald-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
        <div className="absolute bottom-1/3 left-1/5 w-40 h-40 bg-gradient-to-tl from-emerald-300/25 to-green-400/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
        
        {/* Modern grid pattern with enhanced opacity */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* More floating orbs with varied sizes and colors */}
        <div className="absolute top-32 left-1/4 w-8 h-8 bg-green-400/50 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-48 right-1/3 w-5 h-5 bg-emerald-400/60 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-2/3 left-1/8 w-4 h-4 bg-green-300/70 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/3 right-1/6 w-6 h-6 bg-emerald-300/55 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-green-400/65 rounded-full animate-bounce delay-1200"></div>
        
        {/* Enhanced gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/90 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/70 to-transparent"></div>
        
        {/* Subtle animated lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-300/30 to-transparent animate-pulse"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent animate-pulse delay-1000"></div>
        
        {/* Modern mesh gradient effect */}
        <div className="absolute inset-0 opacity-20" style={{
          background: `radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, rgba(52, 211, 153, 0.05) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          animatedItems.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-sm text-green-600 uppercase tracking-wider font-medium">Get In Touch</span>
              <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-1"></div>
            </div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6">
            {'Ready to Power Your Future?'.split(' ').map((word, index) => (
              <span
                key={index}
                className="inline-block animate-fade-in-up mx-1"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                {word}
              </span>
            ))}
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Let's discuss how Nexus Energy Solutions can transform your energy storage needs. 
            Our team of experts is ready to architect the perfect solution for your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Form */}
          <div className={`transform transition-all duration-1000 delay-400 ${
            animatedItems.form ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="backdrop-blur-lg bg-white/80 border border-green-100 rounded-3xl p-8 shadow-xl">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Send us a Message</h3>
                <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              <div className="space-y-6">
                {/* Name Field */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-300" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 bg-white/50 border ${
                        errors.name ? 'border-red-500' : 'border-green-100'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-300" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 bg-white/50 border ${
                        errors.email ? 'border-red-500' : 'border-green-100'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-300" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 bg-white/50 border ${
                        errors.phone ? 'border-red-500' : 'border-green-100'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                {/* Message Field */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className={`w-full px-4 py-3 bg-white/50 border ${
                      errors.message ? 'border-red-500' : 'border-green-100'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none`}
                    placeholder="Tell us about your energy storage requirements..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting || isSubmitted}
                  className={`group w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    isSubmitted
                      ? 'bg-green-600 text-white cursor-default'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className={`group transform transition-all duration-1000 ${
                    animatedItems[info.delay] ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-10 opacity-0 scale-95'
                  } hover:scale-105`}
                >
                  <div className="backdrop-blur-lg bg-white/80 border border-green-100 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
                       onClick={() => window.open(info.action, '_blank')}>
                    
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-800 mb-2">{info.title}</h4>
                        <div className="space-y-1">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-600 hover:text-green-600 transition-colors duration-300">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                      
                      <ArrowRight className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute -top-3 -right-3 backdrop-blur-lg bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg border border-green-100">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${info.color.replace('to-', 'to-').split(' ')[0]}/10 ${info.color.replace('from-', 'to-').split(' ')[1]}/10 rounded-3xl blur-2xl -z-10 scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              );
            })}

            {/* Additional CTA */}
           
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default Contact;

