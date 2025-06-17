import React, { useState, useEffect, useRef } from 'react';
import { Zap, Target, Cpu, Recycle, ArrowRight } from 'lucide-react';
import hero from "../assets/herosection.png"

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger animations for innovation items
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, item1: true })), 200);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, item2: true })), 400);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, item3: true })), 600);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, item4: true })), 800);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, quote: true })), 1200);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const innovations = [
    {
      icon: Zap,
      title: "Cell Architecture",
      description: "Tab-less designs enabling 40× charge transfer velocity",
      delay: "item1"
    },
    {
      icon: Target,
      title: "Thermodynamics", 
      description: "Active liquid cooling for 500A continuous discharge",
      delay: "item2"
    },
    {
      icon: Cpu,
      title: "Digital Twins",
      description: "IoT-powered predictive maintenance algorithms",
      delay: "item3"
    },
    {
      icon: Recycle,
      title: "Circular Economy",
      description: "25,000-cycle batteries with 92% second-life utility",
      delay: "item4"
    }
  ];

  return (
    <div id="about" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 py-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-green-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Centered Header Section - Moved above the grid */}
        <div className={`transform transition-all duration-1000 delay-200 text-center max-w-4xl mx-auto mb-20 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <span className="text-xl text-green-600 uppercase tracking-wider font-medium mb-2">About Us</span>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
          </div>
          
          <h2 className="text-6xl lg:text-8xl font-bold text-gray-800 leading-tight mb-8">
            {'Nexus Energy Solutions'.split(' ').map((word, index) => (
              <span
                key={index}
                className="inline-block animate-fade-in-up"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                {word}{' '}
              </span>
            ))}
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Nexus Energy Solutions stands at the convergence of electrochemical innovation and sustainable transformation, 
            redefining energy storage paradigms since its inception. Born from a collective passion to decarbonize industrial 
            ecosystems, we engineer power solutions that transcend conventional limitations—propelling humanity toward an 
            emission-free future while honoring our Bharatiya roots in global impact.
          </p>
        </div>

        {/* Main Content Grid - Now below the header */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Main image container with glassmorphism */}
              <div className={`relative backdrop-blur-lg bg-white/80 border border-green-100 rounded-3xl p-8 shadow-xl transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
              }`}>
                
                {/* Image placeholder - replace with your actual image */}
                <div className="aspect-[4/5] w-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center overflow-hidden relative">
                  {/* Placeholder for actual image */}
                 <img src={hero} alt="hero section" className='h-full w-full' />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-2xl"></div>
                </div>
                
                {/* Floating elements */}
               
                
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg"></div>
                <div className="absolute -top-2 left-1/4 w-4 h-4 bg-green-100 rounded-full shadow-sm"></div>
              </div>
              
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-3xl -z-10 scale-110"></div>
              
              {/* Additional floating elements */}
              <div className="absolute top-10 -left-8 backdrop-blur-md bg-white/70 p-3 rounded-xl shadow-lg border border-green-50">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              
              <div className="absolute bottom-20 -right-8 backdrop-blur-md bg-white/70 p-3 rounded-xl shadow-lg border border-green-50">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Right Side - Innovation Section */}
          <div className="space-y-8">
            {/* Innovation section */}
            <div className={`transform transition-all duration-1000 delay-600 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                Our innovation hub houses India's foremost electrochemistry research facility, where cross-disciplinary teams pioneer breakthroughs in:
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {innovations.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className={`flex flex-col p-6 backdrop-blur-md bg-white/60 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-all duration-500 transform ${
                        animatedItems[item.delay] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                      } hover:scale-105 hover:bg-white/80`}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-800">{item.title}</h4>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <ArrowRight className="w-6 h-6 text-green-500 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quote */}
            <div className={`transform transition-all duration-1000 delay-1000 ${
              animatedItems.quote ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="relative p-8 backdrop-blur-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-200/50 shadow-lg">
                <div className="absolute top-4 left-4 text-5xl text-green-500/30 font-serif">"</div>
                <p className="text-2xl font-medium text-gray-800 italic text-center pt-6 px-8">
                  We don't just build batteries—we architect energy ecosystems.
                </p>
                <div className="absolute bottom-4 right-4 text-5xl text-green-500/30 font-serif rotate-180">"</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className={`transform transition-all duration-1000 delay-1200 flex justify-center ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <button className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-10 py-5 rounded-full font-medium transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg">
                <span>Explore Our Solutions</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
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

export default About;