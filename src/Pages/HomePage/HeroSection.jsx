import React from "react";
import heroImg from "../../assets/hero-banner.png";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#B3DFFE] to-[#EAF6FF] overflow-hidden">
      <div className="container mx-auto px-4 md:px-10 py-16 md:py-24">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">

          {/* Left Content */}
          <div className="flex-1 text-center md:text-left animate-fadeInUp">
            <h5 className="text-[#1651A9] font-semibold mb-3">
              Smart Solutions
            </h5>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              We're The Best Tech Leading <br />
              Company In <span className="text-[#1651A9]">Bangladesh</span>
            </h1>

            <p className="text-gray-600 max-w-xl mb-8">
              We help businesses grow with modern websites, Web3 solutions,
              mobile apps, and result-driven UI/UX design. From idea to launch —
              we build digital products that perform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="btn bg-[#1651A9] text-white rounded-full px-8 hover:bg-[#0f3e82]">
                Start Your Project →
              </button>
              <button className="btn btn-outline border-[#1651A9] text-[#1651A9] rounded-full px-8 hover:bg-[#1651A9] hover:text-white">
                View Our Work
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 animate-float">
            <img
              src={heroImg}
              alt="Hero"
              className="w-full max-w-lg mx-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
