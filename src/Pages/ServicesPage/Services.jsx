import React from 'react';
import {
    FaGlobe,
    FaLink,
    FaMobileAlt,
    FaPalette,
    FaSearch,
    FaShieldAlt,
    FaArrowRight,
    FaCheck
} from 'react-icons/fa';

const Service = () => {
    const services = [
        {
            id: 1,
            icon: <FaGlobe className="w-8 h-8" />,
            title: "Website Development",
            description: "Custom, responsive, and high-performance websites using the latest technologies.",
            features: ["Business websites", "E-commerce solutions", "Custom web applications"],
            color: "bg-blue-50",
            iconColor: "text-blue-600",
            borderColor: "border-blue-200"
        },
        {
            id: 2,
            icon: <FaLink className="w-8 h-8" />,
            title: "Blockchain & Web3 Development",
            description: "Next-generation decentralized solutions for the future.",
            features: ["Web3 platforms", "Smart contract development", "DApps & blockchain integration"],
            color: "bg-purple-50",
            iconColor: "text-purple-600",
            borderColor: "border-purple-200"
        },
        {
            id: 3,
            icon: <FaMobileAlt className="w-8 h-8" />,
            title: "Mobile App Development",
            description: "Feature-rich, scalable mobile applications for Android & iOS.",
            features: ["Native & cross-platform apps", "Secure backend integration", "User-friendly interfaces"],
            color: "bg-green-50",
            iconColor: "text-green-600",
            borderColor: "border-green-200"
        },
        {
            id: 4,
            icon: <FaPalette className="w-8 h-8" />,
            title: "UI/UX Design",
            description: "Creating intuitive, engaging, and user-focused digital experiences.",
            features: ["User research & analysis", "Wireframing & prototyping", "Modern, responsive UI design", "Content-based UX strategy"],
            color: "bg-pink-50",
            iconColor: "text-pink-600",
            borderColor: "border-pink-200"
        },
        {
            id: 5,
            icon: <FaSearch className="w-8 h-8" />,
            title: "SEO Optimization",
            description: "Rank higher, get traffic, and grow your business organically.",
            features: ["On-page & technical SEO", "Speed & performance optimization", "Long-term ranking strategies"],
            color: "bg-yellow-50",
            iconColor: "text-yellow-600",
            borderColor: "border-yellow-200"
        },
        {
            id: 6,
            icon: <FaShieldAlt className="w-8 h-8" />,
            title: "Cyber Security",
            description: "Protecting your digital assets with advanced security solutions.",
            features: ["Web3 & application security", "Data protection & privacy", "Vulnerability assessment", "Threat monitoring"],
            color: "bg-red-50",
            iconColor: "text-red-600",
            borderColor: "border-red-200"
        }
    ];

    return (
        <section className="py-20 md:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16 animate-fadeInUp">
                    <h5 className="text-lg md:text-2xl font-semibold text-[#1651A9] mb-2">
                        OUR ALL SERVICE
                    </h5>
                    <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 md:mb-6 md:w-2xl mx-auto">
                        Explore Our Best Premium Quality Service
                    </h2>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`group relative bg-white rounded-2xl p-6 md:p-8 border ${service.borderColor} shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden animate-fadeInUp`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Background Effect */}
                            <div className={`absolute inset-0 ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                            {/* Icon */}
                            <div className={`relative z-10 w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                                <div className={service.iconColor}>
                                    {service.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#1651A9] transition-colors duration-300">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 mb-4 md:mb-6">
                                    {service.description}
                                </p>

                                {/* Features List */}
                                <ul className="mb-6 md:mb-8 space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <div className={`w-1.5 h-1.5 rounded-full ${service.iconColor} mt-2 mr-3`}></div>
                                            <div className='flex gap-1 items-center'>
                                                <span><FaCheck /></span>
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Read More Button */}
                                <button className="flex items-center text-[#1651A9] font-semibold group/btn">
                                    <span className="mr-2">Read More</span>
                                    <FaArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform duration-300" />
                                </button>
                            </div>

                            {/* Corner Decoration */}
                            <div className={`absolute top-0 right-0 w-24 h-24 ${service.color} rounded-full opacity-20 -translate-y-12 translate-x-12 group-hover:opacity-30 transition-opacity duration-500`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Service;