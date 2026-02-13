import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Creative Hub <span className="text-blue-500">IT Agency</span>
          </h1>
        </div>

        {/* Social Media */}
        <div className="text-center mb-10">
          <h3 className="text-xl mb-4 font-medium">Follow us:</h3>
          <div className="flex justify-center gap-6">
            <a href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl hover:bg-blue-600 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl hover:bg-blue-400 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl hover:bg-blue-700 transition-colors">
              <FaLinkedinIn />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl hover:bg-pink-600 transition-colors">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Copyright */}
        <div className="text-center mb-6">
          <p className="text-gray-400 text-lg">
            © Creative Hub IT Agency 2023. All Rights Reserved
          </p>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-8">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Terms & Condition
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;