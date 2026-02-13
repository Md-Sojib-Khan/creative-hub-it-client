import React, { useState, useEffect, useRef } from 'react';
import { FaTrophy, FaSmile, FaCheckCircle, FaStar } from 'react-icons/fa';

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCount();
          observerRef.current.unobserve(ref.current);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observerRef.current.observe(ref.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const startCount = () => {
    let start = 0;
    const increment = end / (duration / 20);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);
  };

  return <span ref={ref}>{count}+</span>;
};

const AboutBatch = () => {
  const stats = [
    {
      id: 1,
      icon: <FaTrophy className="w-7 h-7" />,
      value: 30,
      label: "Winning award",
      color: "text-yellow-500",
      gradient: "from-yellow-400 to-yellow-600"
    },
    {
      id: 2,
      icon: <FaSmile className="w-7 h-7" />,
      value: 180,
      label: "Happy Client",
      color: "text-blue-500",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      id: 3,
      icon: <FaCheckCircle className="w-7 h-7" />,
      value: 300,
      label: "Complete project",
      color: "text-green-500",
      gradient: "from-green-400 to-green-600"
    },
    {
      id: 4,
      icon: <FaStar className="w-7 h-7" />,
      value: 484,
      label: "Client review",
      color: "text-purple-500",
      gradient: "from-purple-400 to-purple-600"
    }
  ];

  return (
    <section className="py-10 md:py-12 bg-[#E8FBFF]">
      <div className="mx-auto px-4 md:px-8">
        <div className="mx-auto">
          <div className="bg-[#E8FBFF] rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.id}
                  className="relative group"
                >
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    {/* Animated Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                    
                    {/* Icon */}
                    <div className="relative z-10 mb-6">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                        {stat.icon}
                      </div>
                    </div>
                    
                    {/* Count */}
                    <div className="relative z-10">
                      <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        <CountUp end={stat.value} duration={2000 + index * 500} />
                      </div>
                      
                      {/* Label */}
                      <div className="text-gray-600 font-medium text-lg">
                        {stat.label}
                      </div>
                    </div>
                    
                    {/* Decorative Corner */}
                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Divider */}
            <div className="mt-8 md:mt-12 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-600 text-lg">
                <span className="text-[#1651A9] font-bold">5+ Years</span> of Excellence • 
                <span className="text-[#1651A9] font-bold ml-4">98%</span> Client Satisfaction • 
                <span className="text-[#1651A9] font-bold ml-4">24/7</span> Support
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBatch;