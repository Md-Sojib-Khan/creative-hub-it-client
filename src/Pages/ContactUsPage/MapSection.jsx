import React from "react";

const MapSection = () => {
  return (
    <section className="bg-[#0B0F14] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-3xl font-bold mb-6">
          Our Location
        </h2>

        <div className="w-full h-[400px] rounded-xl overflow-hidden border border-gray-700">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Dhaka%20Uttara&output=embed"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
