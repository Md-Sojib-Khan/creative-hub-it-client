import React, { useState } from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPaperPlane, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaWhatsapp,
  FaUser,
  FaCheckCircle,
  FaClock,
  FaHeadset
} from 'react-icons/fa';
import { MdEmail, MdMessage } from 'react-icons/md';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [liveChatStatus, setLiveChatStatus] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
        setErrors({});
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone className="w-5 h-5" />,
      text: "+8801607304149",
      subtext: "Call us anytime"
    },
    {
      icon: <MdEmail className="w-5 h-5" />,
      text: "mdshakilimi701@gmail.com",
      subtext: "Email support"
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      text: "Dhaka Uttara, #1201, Sector #03",
      subtext: "Our location"
    }
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, label: "Facebook", color: "bg-blue-600 hover:bg-blue-700" },
    { icon: <FaLinkedinIn />, label: "LinkedIn", color: "bg-blue-700 hover:bg-blue-800" },
    { icon: <FaWhatsapp />, label: "WhatsApp", color: "bg-green-500 hover:bg-green-600" }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 px-4 py-12">
      <div className="w-full max-w-6xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-3 border border-gray-700">
        
        {/* Left Info Section */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/10 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-green-400 mb-3">
                Contact Information
              </h3>
              <p className="text-gray-300 text-lg mb-2">
                Say something to start a live chat!
              </p>
              
              {/* Live Chat Status */}
              <div className="flex items-center gap-2 mt-4">
                <div className={`w-3 h-3 rounded-full ${liveChatStatus ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                <span className="text-green-400 text-sm">
                  {liveChatStatus ? 'Live chat available' : 'Chat offline'}
                </span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-8 mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4 group cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-700 group-hover:bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 group-hover:text-green-300 transition-all duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-lg font-medium group-hover:text-green-300 transition-colors">
                      {info.text}
                    </p>
                    <p className="text-sm text-gray-400">{info.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div>
              <p className="text-gray-300 mb-4">Follow us</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    aria-label={social.label}
                    className={`${social.color} w-10 h-10 flex items-center justify-center rounded-lg text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="mt-12 p-4 bg-gray-700/50 rounded-xl border border-gray-600">
              <div className="flex items-center gap-3">
                <FaClock className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-300">Response time</p>
                  <p className="text-green-400 font-medium">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="md:col-span-2 p-8 md:p-12">
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <FaCheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Message Sent Successfully!
              </h3>
              <p className="text-gray-300 mb-6">
                Thank you for contacting us. We'll get back to you soon.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-400">
                <FaHeadset className="w-4 h-4" />
                <span>Our team will respond within 24 hours</span>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Send us a message
                </h2>
                <p className="text-gray-400">
                  Fill out the form below and we'll get back to you as soon as possible
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-gray-300 font-medium mb-3 flex items-center gap-2">
                      <FaUser className="w-4 h-4" />
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-700 border ${errors.firstName ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="mt-2 text-sm text-red-400">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-gray-300 font-medium mb-3 flex items-center gap-2">
                      <FaUser className="w-4 h-4" />
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-700 border ${errors.lastName ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="mt-2 text-sm text-red-400">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-300 font-medium mb-3 flex items-center gap-2">
                    <MdEmail className="w-4 h-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-gray-300 font-medium mb-3 flex items-center gap-2">
                    <FaPhone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-700 border ${errors.phone ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                    placeholder="+880 1234 567890"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-400">{errors.phone}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-300 font-medium mb-3 flex items-center gap-2">
                    <MdMessage className="w-4 h-4" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-3 bg-gray-700 border ${errors.message ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none`}
                    placeholder="Write your message here..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* Footer Note */}
          {!isSubmitted && (
            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-sm text-gray-400 text-center">
                Your information is secure and will never be shared with third parties.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;