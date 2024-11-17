import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaMapMarkerAlt, FaMedal, FaHistory, FaTrophy } from 'react-icons/fa';
import { GiBlackBelt } from 'react-icons/gi';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-purple-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Al-Sharq Taekwondo Academy</h1>
          <p className="text-xl mb-8">
            Excellence in Taekwondo Training Since 2000
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a 
              href="tel:0781517466" 
              className="flex items-center gap-2 bg-white text-purple-800 px-6 py-2 rounded-full hover:bg-purple-100 transition"
            >
              <FaPhone /> 0781517466
            </a>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>Zarqa - Baghdad Street</span>
            </div>
          </div>
        </div>
      </div>

      
      {/* Coaches Section */}
      <div className="py-16 container mx-auto px-4 bg-white">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-12">Our Expert Coaches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map((coach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <GiBlackBelt className="text-3xl text-purple-800" />
              </div>
              <h3 className="text-xl font-bold text-purple-800 mb-2">{coach.name}</h3>
              <p className="text-purple-600 mb-2">{coach.rank}</p>
              <p className="text-gray-600 text-sm">{coach.specialization}</p>
              <p className="text-gray-500 text-sm mt-2">{coach.achievements}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Introduction Section */}
      <div className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-purple-800 mb-6">Our Legacy</h2>
          <p className="text-gray-700 mb-4">
            Al-Sharq Taekwondo Academy stands as a premier martial arts institution in Jordan, 
            dedicated to preserving and teaching the authentic principles of Taekwondo. Under the 
            leadership of National Team Coach Aref Alzawahreh, we have established ourselves as 
            a center of excellence in martial arts training.
          </p>
          <p className="text-gray-700 mb-4">
            Our comprehensive training programs encompass traditional Taekwondo techniques, 
            modern competition strategies, and practical self-defense methods. We cater to all 
            age groups and skill levels, from beginners to advanced practitioners.
          </p>
        </div>
      </div>


    
    </div>
  );
};

const coaches = [
  {
    name: "Aref Alzawahreh",
    rank: "National Team Coach",
    specialization: "Head Coach",
    achievements: "Multiple national team achievements and international recognition"
  },
  {
    name: "Adnan Alzawahreh",
    rank: "4th Dan",
    specialization: "Physical and Psychological Preparation Specialist",
    achievements: "Certified sports psychology consultant"
  },
  {
    name: "Mohammed Abu Sharkh",
    rank: "4th Dan",
    specialization: "Professional Coach",
    achievements: "Specialized in youth development programs"
  },
  {
    name: "Mahmoud Alsaqarat",
    rank: "3rd Dan",
    specialization: "Professional Coach",
    achievements: "Expert in technical fundamentals"
  }
];

export default AboutUs;
