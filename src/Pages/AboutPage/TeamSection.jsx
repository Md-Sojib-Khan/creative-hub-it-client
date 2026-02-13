import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import useAxios from '../../Hooks/useAxios';

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  // Fetch approved team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/teams?status=approved');
        
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1651A9] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading team members...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h5 className="text-[#1651A9] font-bold text-lg md:text-xl tracking-widest mb-3">
            OUR TEAM MEMBER
          </h5>
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            Meet Our Experience <br />Professional IT Employee
          </h2>
        </div>

        {/* Team Slider */}
        <div className="relative">
          {teamMembers.length > 0 ? (
            <>
              <Swiper
                modules={[Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 24
                  },
                  1280: {
                    slidesPerView: 3,
                    spaceBetween: 30
                  }
                }}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={teamMembers.length > 3}
                className="pb-10"
              >
                {teamMembers.map((member) => (
                  <SwiperSlide key={member._id}>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                      
                      {/* Image Section */}
                      <div className="relative h-64 md:h-72 bg-gradient-to-br from-[#1651A9] to-purple-600">
                        {member.image ? (
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                              e.target.parentNode.innerHTML = `
                                <div class="w-full h-full flex flex-col items-center justify-center text-white">
                                  <div class="text-6xl font-bold mb-4">${getInitials(member.name)}</div>
                                  <div class="text-center">
                                    <div class="text-xl font-bold">${member.name.split(' ')[0]}</div>
                                    <div class="text-sm opacity-90">${member.name.split(' ')[1] || ''}</div>
                                  </div>
                                </div>
                              `;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-white">
                            <div className="text-6xl font-bold mb-4">
                              {getInitials(member.name)}
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold">{member.name.split(' ')[0]}</div>
                              <div className="text-sm opacity-90">{member.name.split(' ')[1] || ''}</div>
                            </div>
                          </div>
                        )}
                        
                        {/* Social Media Icons */}
                        {member.socialLinks && Object.values(member.socialLinks).some(link => link) && (
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {member.socialLinks.facebook && (
                              <a
                                href={member.socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                              >
                                <FaFacebookF className="w-5 h-5" />
                              </a>
                            )}
                            {member.socialLinks.twitter && (
                              <a
                                href={member.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                              >
                                <FaTwitter className="w-5 h-5" />
                              </a>
                            )}
                            {member.socialLinks.linkedin && (
                              <a
                                href={member.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                              >
                                <FaLinkedinIn className="w-5 h-5" />
                              </a>
                            )}
                            {member.socialLinks.instagram && (
                              <a
                                href={member.socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                              >
                                <FaInstagram className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {member.name}
                        </h3>
                        
                        <div className="space-y-2 mb-4">
                          <p className="text-[#1651A9] font-semibold text-sm">
                            {member.position}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {member.role}
                          </p>
                          {member.additionalRole && (
                            <p className="text-gray-700 font-medium text-sm">
                              {member.additionalRole}
                            </p>
                          )}
                          <p className="text-gray-500 text-sm">
                            {member.company || 'creative hub it agency'}
                          </p>
                        </div>

                        {/* Decorative Line */}
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-4"></div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {teamMembers.slice(0, 5).map((_, index) => (
                  <div 
                    key={index}
                    className="w-2 h-2 rounded-full bg-gray-300 cursor-pointer hover:bg-[#1651A9] transition-colors"
                  ></div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600">No team members available yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;