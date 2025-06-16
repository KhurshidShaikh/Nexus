import React, { useRef } from 'react'

const Services = () => {
  const sectionRef = useRef(null);

  return (
    <div id="services" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        <h1 className="text-4xl font-bold text-gray-800">Services</h1>
        {/* Add your services content here */}
      </div>
    </div>
  )
}

export default Services
