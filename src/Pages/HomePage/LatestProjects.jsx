import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { FaExternalLinkAlt, FaGlobe, FaMapMarkerAlt, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import useAxios from '../../Hooks/useAxios';
import { format } from 'date-fns';

const LatestProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosInstance = useAxios();

    useEffect(() => {
        fetchApprovedProjects();
    }, []);

    // Fetch only approved projects from database
    const fetchApprovedProjects = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/projects?status=approved');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), 'MMM dd, yyyy');
        } catch {
            return dateString;
        }
    };

    const breakpoints = {
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1280: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
    };

    // Loading skeleton
    if (loading) {
        return (
            <div className='w-11/12 mx-auto my-10'>
                <div className='text-center mb-10'>
                    <h1 className='text-xl font-medium'>LATEST LIVE PROJECT</h1>
                    <h1 className='text-4xl font-medium'>Latest completed tech <br /> Portfolio showcase</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map((n) => (
                        <div key={n} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                            <div className="h-48 md:h-56 bg-gray-300"></div>
                            <div className="p-6 space-y-4">
                                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                                <div className="flex gap-2">
                                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className='w-11/12 mx-auto my-10'>
            <div className='text-center mb-10'>
                <h1 className='text-xl font-medium'>LATEST LIVE PROJECT</h1>
                <h1 className='text-4xl font-medium'>Latest completed tech <br /> Portfolio showcase</h1>
            </div>
            
            {projects.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500 text-lg">No approved projects available at the moment.</p>
                </div>
            ) : (
                <div>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        breakpoints={breakpoints}
                        navigation={true}
                        loop={projects.length > 2}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            waitForTransition: true,
                        }}
                        onAfterInit={(swiper) => {
                            swiper.autoplay.start();
                        }}
                    >
                        {projects.map((project) => (
                            <SwiperSlide key={project._id || project.id}>
                                <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full">
                                    {/* Project Image */}
                                    <div className="relative h-48 md:h-56 overflow-hidden">
                                        <img
                                            src={project.image || 'https://via.placeholder.com/800x600?text=No+Image'}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/800x600?text=No+Image';
                                            }}
                                        />

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-[#1651A9] text-white text-xs font-semibold rounded-full">
                                            {project.category || 'Uncategorized'}
                                        </div>

                                        {/* Live URL Badge */}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1 cursor-pointer hover:bg-green-600 transition-colors z-10"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <FaGlobe className="w-3 h-3" />
                                                <span>Live</span>
                                            </a>
                                        )}
                                    </div>

                                    {/* Project Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1651A9] transition-colors line-clamp-2">
                                            {project.title}
                                        </h3>

                                        <p className="text-gray-600 mb-4 line-clamp-3 h-12">
                                            {project.shortDescription || project.description?.substring(0, 100) + '...'}
                                        </p>

                                        {/* Technologies Tags */}
                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.technologies.slice(0, 3).map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 3 && (
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                                        +{project.technologies.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Project Meta */}
                                        <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                                            {project.clientLocation && (
                                                <div className="flex items-center gap-2">
                                                    <FaMapMarkerAlt className="w-4 h-4" />
                                                    <span>{project.clientLocation}</span>
                                                </div>
                                            )}
                                            {project.completionDate && (
                                                <div className="flex items-center gap-2">
                                                    <FaCalendarAlt className="w-4 h-4" />
                                                    <span>{formatDate(project.completionDate)}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-6 h-4 flex justify-between items-center">
                                            <button
                                                className="text-[#1651A9] font-semibold flex items-center gap-2 hover:gap-3 transition-all group/btn"
                                                onClick={() => window.location.href = `/projects/${project._id || project.id}`}
                                            >
                                                <span>View Details</span>
                                                <FaChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>

                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-[#1651A9] text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#13458F] transition-colors"
                                                >
                                                    <FaExternalLinkAlt className="w-3 h-3" />
                                                    <span>Live Demo</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default LatestProjects;