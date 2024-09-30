// HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';

import videoFile from '../assets/2023-world-taekwondo-highlights-720-ytshorts.savetube.me.mp4';


function HeroSection() {
  return (
    
    <section className="relative min-h-screen bg-purple-900 ">
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        src={videoFile}
      >
      
      </video>
      
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to</h1>
          <h2 className="text-5xl font-bold mb-8">Land Of Champions</h2>
          <Link to="/about"> {/* Add closing tag here */}
            <button
              type="submit"
              className="bg-white text-purple-900 px-6 py-3 rounded-full font-bold hover:bg-purple-100 transition duration-300"
            >
              Get to know us
            </button>
          </Link> {/* Close Link tag here */}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;