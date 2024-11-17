import React, { useState, useEffect } from "react";

function MyLocation() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  const mapUrl = `https://maps.google.com/maps?q=${position.latitude},${position.longitude}&z=14&output=embed`;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-800 to-gray-900">
      <div className="h-2"></div>

      <div className="mx-8 sm:mx-8 lg:mx-12 my-12 h-auto sm:h-96 p-6 
                    bg-gradient-to-b from-white/5 to-gray-800/50 backdrop-blur-xl 
                    border border-white/10 rounded-xl shadow-2xl 
                    overflow-hidden flex flex-col lg:flex-row">
        <div className="sm:w-full lg:w-1/2 flex flex-col items-start px-4 sm:px-8 lg:px-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">
            Visit Al-Sharq Taekwondo Academy
          </h2>
          {position.latitude && position.longitude ? (
            <div>
              <p className="text-base sm:text-lg text-gray-300 mb-4">
                Welcome to the official location page of Al-Sharq Taekwondo Academy. Our academy, led by National Team Coach Aref Alzawahreh, is located in Zarqa on Baghdad Street.
              </p>
              <p className="text-base sm:text-lg text-gray-300 mb-4">
                We are proud to offer professional training facilities and expert instruction from our team of certified coaches, including specialists in physical and psychological preparation.
              </p>
            </div>
          ) : (
            <p className="text-base sm:text-lg text-gray-300">Loading location...</p>
          )}
        </div>

        {position.latitude && position.longitude && (
          <div className="sm:w-full lg:w-1/2 mt-4 lg:mt-0 flex justify-center">
            <iframe
              width="90%"
              height="300"
              src={mapUrl}
              title="Google Maps"
              className="rounded-lg border border-white/10 shadow-2xl"
            ></iframe>
          </div>
        )}
      </div>
         {/* Introduction Section */}
         <div className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Our Legacy</h2>
          <p className="text-gray-200 mb-4">
            Al-Sharq Taekwondo Academy stands as a premier martial arts institution in Jordan, 
            dedicated to preserving and teaching the authentic principles of Taekwondo. Under the 
            leadership of National Team Coach Aref Alzawahreh, we have established ourselves as 
            a center of excellence in martial arts training.
          </p>
          <p className="text-gray-300 mb-4">
            Our comprehensive training programs encompass traditional Taekwondo techniques, 
            modern competition strategies, and practical self-defense methods. We cater to all 
            age groups and skill levels, from beginners to advanced practitioners.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyLocation;
