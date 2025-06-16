import React, { useState, useEffect } from "react";
import { Zap, Shield, Thermometer, Cpu, Battery, Timer } from "lucide-react";

const features = [
  {
    icon: <Battery className="w-8 h-8" />,
    title: "Tab-less Cell Design",
    description:
      "Proprietary architecture enabling 40× accelerated charge transfer while enhancing thermal stability",
    highlight: "40× Faster",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Hyper-Charging Technology",
    description:
      "0-100% replenishment in 12-20 minutes (industry-leading temporal efficiency)",
    highlight: "12-20 Min",
  },
  {
    icon: <Timer className="w-8 h-8" />,
    title: "Extended Cycle Resilience",
    description:
      "25,000+ charge-discharge cycles with <20% capacity degradation",
    highlight: "25,000+ Cycles",
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Intelligent Power Management",
    description:
      "ASIL-D-rated BMS with IoT integration and geo-fencing capabilities",
    highlight: "ASIL-D Rated",
  },
  {
    icon: <Thermometer className="w-8 h-8" />,
    title: "Extreme Environment Proficiency",
    description:
      "Operational spectrum from -40°C to 65°C with ±1°C thermal monitoring precision",
    highlight: "-40°C to 65°C",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Military-Grade Safety",
    description:
      "Zero thermal runaway during nail penetration/overcharge scenarios (UN38.3 certified)",
    highlight: "UN38.3 Certified",
  },
];

const Features = () => {
  const [selectedIdx, setSelectedIdx] = useState(1);

  useEffect(() => {
    setSelectedIdx(selectedIdx);
  }, [selectedIdx]);

  const headers = ["Turbo X 14000", "Meteor 5000", "Meteor X 16000"];

  const rows = [
    ["Energy Density", "14.7kWh", "5.1kWh", "17kWh"],
    ["Cycle Life", "25,000", "3,000", "4,000"],
    ["Charging Velocity", "20 min", "Standard", "GB/T Fast DC"],
    ["Thermal Regulation", "Active Liquid", "Passive Air", "Passive Air"],
    ["Operational Range", "-40°C to 65°C", "-20°C to 60°C", "-10°C to 65°C"],
  ];

  return (
    <section className="bg-white py-20 px-6" id="features">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            The Nexus Technological
            <span className="text-green-500"> Vanguard</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our proprietary energy architectures embody quantum leaps in
            electrochemical performance, merging unprecedented safety protocols
            with groundbreaking efficiency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                {/* Highlight Badge */}
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  {feature.highlight}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-200 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Advanced Capabilities Comparison
            </h3>
            <p className="text-gray-600">
              See how our technology stacks against the competition
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-green-500 to-green-600 text-gray-300">
                    <th className="p-6 text-left font-bold">Parameter</th>
                    {headers.map((title, idx) => (
                      <th
                        key={idx}
                        onClick={() => setSelectedIdx(idx + 1)}
                        className={`p-6 text-left font-bold cursor-pointer transition-all duration-200 ${
                          selectedIdx === idx + 1
                            ? "bg-gray text-white shadow text-lg"
                            : "opacity-75"
                        }`}
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-b border-gray-100 hover:bg-green-50/50 transition-colors duration-200"
                    >
                      {row.map((cell, colIndex) => (
                        <td
                          key={colIndex}
                          className={`p-6 ${
                            colIndex === 0
                              ? "font-semibold text-gray-900"
                              : colIndex === selectedIdx
                              ? "font-bold text-green-600 bg-green-50/50"
                              : "text-gray-600"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
