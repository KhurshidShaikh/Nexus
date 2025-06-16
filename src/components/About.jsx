import React from 'react'

const About = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Nexus</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a forward-thinking technology company dedicated to creating innovative solutions 
            that drive business growth and digital transformation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              To empower businesses with cutting-edge technology solutions that streamline operations, 
              enhance productivity, and create sustainable competitive advantages in the digital age.
            </p>
            <p className="text-gray-600">
              With years of experience and a passionate team of experts, we've helped hundreds of 
              companies transform their digital presence and achieve remarkable results.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Nexus?</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Innovative Technology Solutions
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Expert Team with Proven Track Record
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Customized Approach for Every Client
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                24/7 Support and Maintenance
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Competitive Pricing and ROI Focus
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
