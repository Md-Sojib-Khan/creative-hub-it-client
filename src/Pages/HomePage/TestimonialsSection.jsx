import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaStar, FaQuoteLeft, FaMapMarkerAlt } from 'react-icons/fa';
import useAxios from '../../Hooks/useAxios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosInstance = useAxios();

    // Fetch approved testimonials from API
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/testimonials?status=approved');
                setTestimonials(response.data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                // Silent fail - just show empty state
                setTestimonials([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // Render stars function
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar
                key={index}
                className={`w-4 h-4 ${index < (rating || 5) ? 'text-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    // Loading state
    if (loading) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1651A9] mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading testimonials...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
                {/* Section Header */}
                <div className="text-left mb-12 md:mb-16">
                    <h5 className="text-[#1651A9] font-semibold text-lg mb-2">TESTIMONIAL</h5>
                    <h2 className="text-3xl md:text-4xl font-medium w-80 text-gray-900 mb-4">
                        Our Client's Review About Us
                    </h2>
                    <p className="text-gray-600 text-lg">
                        See what our clients from around the world have to say about working with us
                    </p>
                </div>

                {/* Testimonials Slider */}
                <div className="relative">
                    {testimonials.length > 0 ? (
                        <>
                            <Swiper
                                modules={[Autoplay, Pagination, Navigation]}
                                spaceBetween={24}
                                slidesPerView={1}
                                breakpoints={{
                                    640: { slidesPerView: 1, spaceBetween: 20 },
                                    768: { slidesPerView: 2, spaceBetween: 24 },
                                    1024: { slidesPerView: 3, spaceBetween: 24 },
                                }}
                                pagination={{
                                    clickable: true,
                                    el: '.testimonial-pagination',
                                }}
                                navigation={{
                                    nextEl: '.testimonial-next',
                                    prevEl: '.testimonial-prev',
                                }}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                loop={testimonials.length > 3}
                                className="pb-12"
                            >
                                {testimonials.map((testimonial) => (
                                    <SwiperSlide key={testimonial._id} className="pb-8">
                                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                                            {/* Quote Icon */}
                                            <div className="text-5xl text-[#1651A9] opacity-20 mb-4">
                                                <FaQuoteLeft />
                                            </div>

                                            {/* Testimonial Text */}
                                            <p className="text-gray-700 text-lg italic mb-6 md:mb-8 leading-relaxed line-clamp-4">
                                                "{testimonial.text}"
                                            </p>

                                            {/* Client Info */}
                                            <div className="flex items-center gap-4">
                                                {/* Client Image */}
                                                <div className="flex-shrink-0">
                                                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                                        {testimonial.image ? (
                                                            <img
                                                                src={testimonial.image}
                                                                alt={testimonial.name}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-[#1651A9] flex items-center justify-center text-white text-xl font-bold">
                                                                {testimonial.name?.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Client Details */}
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div>
                                                            <h4 className="font-bold text-gray-900 text-lg">
                                                                {testimonial.name}
                                                            </h4>
                                                            <p className="text-gray-600 text-sm">
                                                                {testimonial.position}, {testimonial.company}
                                                            </p>
                                                        </div>

                                                        {/* Star Rating */}
                                                        <div className="flex gap-1">
                                                            {renderStars(testimonial.rating)}
                                                        </div>
                                                    </div>

                                                    {/* Location */}
                                                    {testimonial.country && (
                                                        <div className="flex items-center gap-2 text-gray-500">
                                                            <FaMapMarkerAlt className="w-4 h-4" />
                                                            <span className="text-sm">{testimonial.country}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Decorative Element */}
                                            <div className="w-20 h-1 bg-gradient-to-r from-[#1651A9] to-blue-300 rounded-full mt-6"></div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Navigation Buttons */}
                            <button className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Pagination */}
                            <div className="testimonial-pagination flex justify-center gap-2 mt-8"></div>
                        </>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <p className="text-gray-600">No testimonials available yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;