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
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section
      className="relative bg-gradient-to-br from-gray-50 via-white to-green-50 py-20 px-6 md:px-16 overflow-hidden"
      id="services"
    >
      {/* Custom Slider Styles */}
      <style>{`
        .services-slider {
          margin: 0 60px;
        }
        .services-slider .slick-dots {
          bottom: -60px;
        }
        .services-slider .slick-dots li button:before {
          font-size: 14px;
          color: #059669;
          opacity: 0.5;
        }
        .services-slider .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #059669;
        }
        .services-slider .slick-prev,
        .services-slider .slick-next {
          z-index: 10;
          width: 50px;
          height: 50px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border: 2px solid #059669;
        }
        .services-slider .slick-prev {
          left: -60px;
        }
        .services-slider .slick-next {
          right: -60px;
        }
        .services-slider .slick-prev:hover,
        .services-slider .slick-next:hover {
          background: #059669;
        }
        .services-slider .slick-prev:before,
        .services-slider .slick-next:before {
          font-size: 18px;
          color: #059669;
          font-weight: bold;
        }
        .services-slider .slick-prev:hover:before,
        .services-slider .slick-next:hover:before {
          color: white;
        }
        .services-slider .slick-slide > div {
          height: 100%;
          padding: 0 12px;
        }
        .services-slider .slick-track {
          display: flex;
          align-items: stretch;
        }
        .services-slider .slick-slide {
          display: flex;
          height: auto;
        }
        .services-slider .slick-list {
          margin: 0 -12px;
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
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Precision-Engineered Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Where Innovation Converges with Operational Excellence -
            Transforming Industries Through Advanced Energy Solutions
          </p>
        </div>

        {/* Services Slider */}
        <div className="services-slider h-full">
          <Slider {...sliderSettings}>
            {services.map((service, index) => (
              <div key={index}>
                <div
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden border border-gray-100 h-full flex flex-col min-h-[720px]"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  {/* Image Section with Overlay */}
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Floating Icon */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                      {service.icon}
                    </div>

                    {/* Stats Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-lg">
                      {service.stats}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 relative">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-700 transition-colors duration-300 flex flex-col flex-grow">
                      {service.title}
                    </h3>

                    {/* Offerings */}
                    <div className="space-y-3 mb-6">
                      {service.offerings.map((offering, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 flex-grow"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {offering}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Highlight Quote */}
                    <div className="relative">
                      <div className="absolute -left-2 top-2 text-4xl text-green-200 font-serif">
                        "
                      </div>
                      <blockquote className="text-sm italic text-green-800 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border-l-4 border-green-500 relative">
                        <p className="relative z-10">{service.highlight}</p>
                      </blockquote>
                    </div>

                    {/* Applications */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2  flex flex-grow">
                        Applications
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.applications.map((app, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium hover:bg-green-100 hover:text-green-700 transition-colors duration-200"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Effect Arrow */}
                    <div
                      className={`absolute bottom-6 right-6 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white transition-all duration-300 ${
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
