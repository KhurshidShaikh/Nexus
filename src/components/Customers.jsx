import React, { useState, useEffect, useRef } from 'react';
import { Truck, Train, Zap, Battery, ArrowRight, Users, Building2 } from 'lucide-react';
// Import project images
import project1 from "../assets/client1.jpg"
import project2 from "../assets/client2.jpg"
import project3 from "../assets/client3.jpg"
import project4 from "../assets/client4.jpg"
import customer from "../assets/customers.png"


const Customers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger animations for customer projects
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, project1: true })), 200);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, project2: true })), 400);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, project3: true })), 600);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, project4: true })), 800);
          setTimeout(() => setAnimatedItems(prev => ({ ...prev, clients: true })), 1200);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      client: "Hyster-Yale Group",
      category: "Material Handling",
      title: "Battery Operated Pallet Truck",
      description: "Hyster Yale import replacement for better performance, life, quality & Support",
      icon: Truck,
      color: "from-green-500 to-emerald-500",
      delay: "project1",
      image: project1
    },
    {
      id: 2,
      client: "European Railways",
      category: "Transportation",
      title: "Shunt Locomotive - Europe",
      description: "Powering a shunt locomotive by 2x860V280Ah (230kWh) batteries, Peak power of 4MW & charging time of an entire battery from 0-100% is 12mins",
      icon: Train,
      color: "from-emerald-500 to-green-600",
      delay: "project2",
      image: project2
    },
    {
      id: 3,
      client: "Indian Railways",
      category: "Rail Infrastructure",
      title: "T-18 Vande Bharat",
      description: "To startup the train coach monitoring system, Train Auxiliary system, traction converters, entire electrical system & to lift the pentagraph. Main application of the battery is to provide Emergency backup to the train during non-availability of OHE & for maintenance.",
      icon: Zap,
      color: "from-green-600 to-emerald-400",
      delay: "project3",
      image: project3
    },
    {
      id: 4,
      client: "Gujarat Energy Authority",
      category: "Renewable Energy",
      title: "BESS for Renewable Energy Storage",
      description: "Gujarat Site- 5.2MW/15MWh System to store 40% of the energy during day time & export in the night at peak hours.",
      icon: Battery,
      color: "from-emerald-400 to-green-500",
      delay: "project4",
      image: project4
    }
  ];

  return (
    <div id="customers" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/40 to-green-50/60 py-20">
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
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-sm text-green-600 uppercase tracking-wider font-medium">Our Work</span>
              <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-1"></div>
            </div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6">
            {'Powering Global Innovation'.split(' ').map((word, index) => (
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
            From material handling to renewable energy storage, our cutting-edge battery solutions 
            are transforming industries across the globe.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className={`group transform transition-all duration-1000 ${
                  animatedItems[project.delay] ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
                } hover:scale-105 h-full`}
              >
                <div className="backdrop-blur-lg bg-white/80 border border-green-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${project.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{project.client}</h3>
                        <span className="text-sm text-green-600 font-medium">{project.category}</span>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5 text-green-500" />
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className="aspect-video w-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative flex-shrink-0">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-2xl"></div>
                  </div>

                  {/* Project Content */}
                  <div className="space-y-4 flex-1">
                    <h4 className="text-2xl font-bold text-gray-800">{project.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{project.description}</p>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 backdrop-blur-lg bg-green-500/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-green-100">
                    {String(project.id).padStart(2, '0')}
                  </div>
                </div>

                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color.replace('to-', 'to-').split(' ')[0]}/10 ${project.color.replace('from-', 'to-').split(' ')[1]}/10 rounded-3xl blur-2xl -z-10 scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>
            );
          })}
        </div>

        {/* Clients Showcase Section */}
        <div className={`transform transition-all duration-1000 delay-1000 ${
          animatedItems.clients ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-sm text-emerald-600 uppercase tracking-wider font-medium">Trusted Partners</span>
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mt-1"></div>
              </div>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Global Industry Leaders
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by Fortune companies and government organizations worldwide
            </p>
          </div>

          {/* Clients Image Container */}
          <div className="relative">
            <div className="backdrop-blur-lg bg-white/80 border border-green-100 rounded-3xl p-8 shadow-xl overflow-hidden">
              
              {/* Clients Image Placeholder */}
              <div className="aspect-[3/1] w-full bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <img src={customer} alt="clients" className='object-fit  h-full w-full' />
                
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-2xl"></div>
                
                {/* Floating elements */}
                <div className="absolute top-4 left-4 backdrop-blur-md bg-white/70 p-2 rounded-lg shadow-md">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                
                <div className="absolute bottom-4 right-4 backdrop-blur-md bg-white/70 p-2 rounded-lg shadow-md">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>

              {/* Stats Overlay */}
             
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-3xl -z-10 scale-105"></div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 mx-auto">
            <span>Partner With Us</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
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

export default Customers;
