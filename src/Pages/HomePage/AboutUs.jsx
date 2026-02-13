import React from 'react';
import { FaCheckCircle, FaLightbulb, FaCogs, FaHeadset, FaGlobeAmericas } from 'react-icons/fa';
import aboutUsImg from '../../assets/about-us.png'; // You'll need to add this image to your assets

const AboutUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaCheckCircle className="w-6 h-6" />,
      title: "Best IT Solutions & Service",
      description: "Tailored solutions for your business needs"
    },
    {
      id: 2,
      icon: <FaLightbulb className="w-6 h-6" />,
      title: "Always Latest Technology",
      description: "Stay ahead with cutting-edge tech stack"
    },
    {
      id: 3,
      icon: <FaHeadset className="w-6 h-6" />,
      title: "24 Hour's Customer Service",
      description: "Round-the-clock support for your business"
    },
    {
      id: 4,
      icon: <FaGlobeAmericas className="w-6 h-6" />,
      title: "World Best Service",
      description: "Global standards with local understanding"
    }
  ];

  return (
    <section className="py-10 md:py-12 bg-[#F9F4F1] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Column - Image with Decoration */}
          <div className="flex-1 relative">
            {/* Main Image Container */}
            <div className="relative z-10">
              {/* You can replace this with your actual about us image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img className='w-full' src={aboutUsImg} alt="" />
              </div>
              
              {/* Floating Element 1 */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-300 rounded-full -z-10 animate-float-slow opacity-70"></div>
              
              {/* Floating Element 2 */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-300 rounded-full -z-10 animate-float opacity-60"></div>
            </div>
            
            {/* Stats Badge */}
            <div className="absolute -right-6 top-1/4 bg-white rounded-2xl p-6 shadow-xl z-20 animate-fadeInRight">
              <div className="text-3xl font-bold text-[#1651A9]">5+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
              <div className="w-12 h-1 bg-blue-200 rounded-full mt-2"></div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="flex-1">
            {/* Section Label */}
            <div className="inline-block px-4 py-2 bg-blue-50 rounded-full">
              <span className="text-[#1651A9] font-semibold text-sm uppercase tracking-wide">
                ABOUT US
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              We're leading The Power<br />
              <span className="text-[#1651A9]">Of Technology</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-md mb-4 md:mb-6 leading-relaxed">
              Harnessing innovation and cutting-edge technology, we deliver smart solutions that 
              empower businesses, enhance productivity, and drive growth. Our expertise transforms 
              ideas into digital realities, shaping the future while connecting people, processes, 
              and possibilities seamlessly.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 md:mb-12">
              {features.map((feature, index) => (
                <div 
                  key={feature.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white hover:bg-blue-50 transition-all duration-300 group cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-[#1651A9] transition-colors duration-300">
                    <div className="text-[#1651A9] group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-[#1651A9] transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn btn-primary bg-[#1651A9] hover:bg-[#13458F] text-white border-none px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Learn More About Us
              </button>
              <button className="btn btn-outline border-[#1651A9] text-[#1651A9] hover:bg-[#1651A9] hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                Watch Our Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;