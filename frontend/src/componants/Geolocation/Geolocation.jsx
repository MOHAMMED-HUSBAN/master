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
    <div className="mx-8 sm:mx-8 lg:mx-12 my-12 h-auto sm:h-96 p-6 shadow-md rounded-lg overflow-hidden flex flex-col lg:flex-row bg-white">
      <div className="sm:w-full lg:w-1/2 flex flex-col items-start px-4 sm:px-8 lg:px-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-800">
          Visit Al-Sharq Taekwondo Academy
        </h2>
        {position.latitude && position.longitude ? (
          <div>
            <p className="text-base sm:text-lg text-gray-800 mb-4">
              Welcome to the official location page of Al-Sharq Taekwondo Academy. Our academy, led by National Team Coach Aref Alzawahreh, is located in Zarqa on Baghdad Street.
            </p>
            <p className="text-base sm:text-lg text-gray-800 mb-4">
              We are proud to offer professional training facilities and expert instruction from our team of certified coaches, including specialists in physical and psychological preparation.
            </p>
          </div>
        ) : (
          <p className="text-base sm:text-lg text-gray-800">Loading location...</p>
        )}
      </div>

      {position.latitude && position.longitude && (
        <div className="sm:w-full lg:w-1/2 mt-4 lg:mt-0 flex justify-center">
          <iframe
            width="90%"
            height="300"
            src={mapUrl}
            title="Google Maps"
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default MyLocation;
