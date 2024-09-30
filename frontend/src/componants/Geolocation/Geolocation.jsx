import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';


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
  }, []);//تنفيذ مرة واحدة: تمرير مصفوفة فارغة [] إلى useEffect لضمان تنفيذ هذا الكود مرة واحدة فقط عند تحميل المكون.

  // Constructing the Google Maps iframe URL dynamically
  const mapUrl = `https://maps.google.com/maps?q=${position.latitude},${position.longitude}&z=14&output=embed`;

  return (
    <div className="mx-8 sm:mx-8 lg:mx-12 my-12 h-auto sm:h-96 p-6 shadow-md rounded-lg overflow-hidden flex flex-col lg:flex-row bg-white  ">
      <div className="sm:w-full lg:w-1/2 flex flex-col items-start px-4 sm:px-8 lg:px-12  ">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-800">
        Find Our Taekwondo Academy!        </h2>
        {position.latitude && position.longitude ? (
          <div>
            <p className="text-base sm:text-lg text-gray-800">
            Discover the best Taekwondo academies near you. Whether you're a beginner or an experienced martial artist, find the most suitable training centers available.            </p>
            <p className="text-base sm:text-lg text-gray-800 mb-4">
            Our platform helps you connect with top-rated Taekwondo academies to start or continue your martial arts journey. Explore various academies and choose the one that fits your needs.
            </p>
            <Button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300"
              color="secondary"
             
              variant="contained"
              color="secondary"
            >
            Explore Academies    
            </Button>        
          </div>
        ) : (
          <p className="text-base sm:text-lg text-gray-800">Loading...</p>
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
