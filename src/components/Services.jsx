import React, { useState } from "react";
import { Images } from "../constants";
import Slider from "react-slick";

const services = [
  {
    title: "E-Mobility Revolution",
    offerings: [
      "High-density propulsion systems for L3/L5 EVs",
      "Ultra-fast charging infrastructure (0-100% in 12-20 mins)",
      "Battery-swapping networks for fleet operators",
    ],
    highlight:
      "ASIL-D-rated BMS with IoT telemetry enabling predictive maintenance and 99.8% operational uptime for last-mile delivery fleets.",
    applications: [
      "Electric buses",
      "Autonomous logistics vehicles",
      "Smart city transit",
    ],
    image: Images.eMobility,
    icon: "⚡",
    stats: "99.8% Uptime",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Renewable Energy Integration",
    offerings: [
      "Containerized BESS (Battery Energy Storage Systems)",
      "Solar-wind hybrid microgrid controllers",
      "Hydrogen fuel cell integration platforms",
    ],
    highlight:
      "20MWh modular BESS installations storing daytime solar energy to power nocturnal industrial operations.",
    applications: ["Solar farms", "Wind parks", "Off-grid communities"],
    image: Images.rEnergy,
    icon: "🌱",
    stats: "4,200 tons CO₂ saved",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Defense & Aerospace Power Systems",
    offerings: [
      "Extreme-temperature batteries (-40°C to 65°C)",
      "EMP-hardened power units for surveillance systems",
      "Lightweight energy packs for UAVs/VTOL drones",
    ],
    highlight:
      "Thermal-runaway-proof lithium-titanate systems powering high-altitude border logistics with 72-hour endurance.",
    applications: [
      "Military drones",
      "Satellite stations",
      "Submarine support",
    ],
    image: Images.dSecurity,
    icon: "🛡️",
    stats: "72h Endurance",
    gradient: "from-slate-600 to-gray-700",
  },
  {
    title: "Industrial Electrification",
    offerings: [
      "Heavy-machinery batteries for forklifts/stackers/BOPTs",
      "Smart energy controllers for manufacturing lines",
      "Peak-load shaving systems",
    ],
    highlight:
      "40% reduction in energy costs for automotive OEMs through regenerative braking integration in material handling.",
    applications: ["Warehousing", "Foundries", "Robotics"],
    image: Images.forkLifts,
    icon: "🏭",
    stats: "40% Cost Reduction",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Agricultural Modernization",
    offerings: [
      "Solar-powered irrigation storage",
      "Electric tractor battery packs",
      "IoT-enabled crop monitoring systems",
    ],
    highlight:
      "Monsoon-resilient IP65 packs doubling crop yields through all-season precision farming.",
    applications: ["Smart greenhouses", "Dairy automation", "Grain storage"],
    image: Images.tempo,
    icon: "🌾",
    stats: "2x Crop Yields",
    gradient: "from-amber-500 to-yellow-500",
  },
];

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    centerMode: true,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: '40px',
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '20px',
          arrows: false,
        }
      }
    ],
  };

  return (
    <section
      className="relative bg-gradient-to-br from-gray-50 via-white to-green-50 py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
      id="services"
    >
      {/* Custom Slider Styles */}
      <style>{`
        .services-slider {
          padding: 20px 0 80px;
          margin: 0 -12px;
          position: relative;
        }
        
        .services-slider .slick-list {
          margin: 0 -12px;
          padding: 20px 12px;
          overflow: visible;
        }
        
        .services-slider .slick-track {
          display: flex;
          gap: 24px;
          padding: 10px 0;
        }
        
        .services-slider .slick-slide {
          height: auto;
          padding: 0 12px;
          opacity: 0.5;
          transform: scale(0.9);
          transition: all 0.3s ease;
        }
        
        .services-slider .slick-slide.slick-active {
          opacity: 1;
          transform: scale(1);
        }
        
        .services-slider .slick-slide > div {
          height: 100%;
        }
        
        .services-slider .slick-dots {
          bottom: 40px;
        }
        
        .services-slider .slick-dots li {
          margin: 0 6px;
        }
        
        .services-slider .slick-dots li button:before {
          font-size: 10px;
          color: #059669;
          opacity: 0.3;
          transition: all 0.3s ease;
        }
        
        .services-slider .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #059669;
          transform: scale(1.2);
        }
        
        .services-slider .slick-prev,
        .services-slider .slick-next {
          z-index: 10;
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        
        .services-slider .slick-prev {
          left: -20px;
        }
        
        .services-slider .slick-next {
          right: -20px;
        }
        
        .services-slider .slick-prev:hover,
        .services-slider .slick-next:hover {
          background: #059669;
          border-color: #059669;
        }
        
        .services-slider .slick-prev:before,
        .services-slider .slick-next:before {
          font-size: 16px;
          color: #059669;
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .services-slider .slick-prev:hover:before,
        .services-slider .slick-next:hover:before {
          color: white;
        }

        @media (max-width: 768px) {
          .services-slider {
            padding: 10px 0 60px;
          }
          
          .services-slider .slick-dots {
            bottom: 30px;
          }
          
          .services-slider .slick-slide {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Precision-Engineered Solutions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Where Innovation Converges with Operational Excellence -
            Transforming Industries Through Advanced Energy Solutions
          </p>
        </div>

        {/* Services Slider */}
        <div className="services-slider">
          <Slider {...sliderSettings}>
            {services.map((service, index) => (
              <div key={index} className="h-full">
                <div
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full flex flex-col"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card Content */}
                  <div className="flex flex-col h-full">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Floating Icon */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl shadow-lg">
                        {service.icon}
                      </div>
                      
                      {/* Stats Badge */}
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-lg">
                        {service.stats}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-green-700 transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Offerings */}
                      <div className="space-y-2 mb-4 flex-grow">
                        {service.offerings.map((offering, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {offering}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Highlight Quote */}
                      <div className="relative mb-4">
                        <blockquote className="text-sm italic text-green-800 bg-green-50/50 p-3 rounded-xl border-l-2 border-green-500">
                          {service.highlight}
                        </blockquote>
                      </div>

                      {/* Applications */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          Applications
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {service.applications.map((app, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full font-medium hover:bg-green-100 hover:text-green-700 transition-colors duration-200"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Arrow */}
                    <div
                      className={`absolute bottom-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white transition-all duration-300 ${
                        hoveredCard === index
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-4"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Services;
