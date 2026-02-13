import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import img1 from '../../assets/image-12.png'
import img2 from '../../assets/image-13.png'
import banner from '../../assets/About-banner.png'
import TeamSection from './TeamSection';
import TestimonialsSection from '../HomePage/TestimonialsSection';
import AboutBatch from './AboutBatch';

const AboutUsPage = () => {
  const features = [
    "Best IT Solutions & Service",
    "Always Latest Technology",
    "24 Hour's Customer Service",
    "World Best Service"
  ];

  return (
    <div className="min-h-screen">
      
      {/* Hero Section with Background Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70">
          {/* This would be your 1440 × 511 image */}
          {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1440&q=80')] bg-cover bg-center opacity-20"></div> */}
           <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        </div>
        
        {/* Overlay Content */}
        <div className="relative h-full flex flex-col justify-center">
          <div className="container mx-auto px-4 md:px-8">
            {/* Breadcrumb */}
            <div className="mb-6">
              <nav className="flex items-center text-white">
                <a href="/" className="hover:text-blue-300 transition-colors">Home</a>
                <span className="mx-2">›</span>
                <span className="font-medium">About Us</span>
              </nav>
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">About Us</h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Leading technology solutions for modern businesses
            </p>
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="flex-1">
            {/* Section Header */}
            <div className="mb-8">
              <h5 className="text-[#1651A9] font-semibold text-lg mb-4">ABOUT US</h5>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                We're leading The Power<br />
                <span className="text-[#1651A9]">Of Technology</span>
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Harnessing innovation and cutting-edge technology, we deliver smart solutions that 
                empower businesses, enhance productivity, and drive growth. Our expertise transforms 
                ideas into digital realities, shaping the future while connecting people, processes, 
                and possibilities seamlessly.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <FaCheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <span className="text-gray-700 text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Images with Styled Layout */}
          <div className="flex-1">
            <div className="relative">
              {/* Main Large Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
                <div className="h-64 md:h-80">
                  {/* Placeholder for first image */}
                  <img src={img1} alt="" />
                </div>
                
                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Smaller Overlapping Image */}
              <div className="absolute -bottom-14 -right-0 w-64 h-60 rounded-xl overflow-hidden shadow-xl border-4 border-white z-10">
                <div className="w-full h-full bg-gradient-to-br from-green-500 to-blue-400">
                  {/* Placeholder for second image */}
                  <img src={img2} alt="" />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="mt-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-[#1651A9] rounded-full"></div>
                <div className="text-gray-600">
                  Trusted by companies worldwide
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TeamSection></TeamSection>
      <AboutBatch></AboutBatch>
      <TestimonialsSection></TestimonialsSection>
    </div>
  );
};

export default AboutUsPage;