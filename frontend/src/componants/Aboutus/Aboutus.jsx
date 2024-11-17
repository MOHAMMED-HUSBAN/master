import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { GiBlackBelt } from 'react-icons/gi';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-800 to-gray-900">
      {/* Spacing for header */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white/5 to-gray-800/50 backdrop-blur-xl border-y border-white/10 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Al-Sharq Taekwondo Academy</h1>
          <p className="text-xl mb-8 text-gray-200">
            Excellence in Taekwondo Training Since 2000
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a 
              href="tel:0781517466" 
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg transition-all duration-200"
            >
              <FaPhone /> 0781517466
            </a>
            <div className="flex items-center gap-2 text-gray-200">
              <FaMapMarkerAlt />
              <span>Zarqa - Baghdad Street</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coaches Section */}
      <div className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Our Expert Coaches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map((coach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-white/5 to-gray-800/50 backdrop-blur-xl border border-white/10 
                         p-6 rounded-xl shadow-2xl text-center hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <GiBlackBelt className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{coach.name}</h3>
              <p className="text-gray-200 mb-2">{coach.rank}</p>
              <p className="text-gray-300 text-sm">{coach.specialization}</p>
              <p className="text-gray-400 text-sm mt-2">{coach.achievements}</p>
            </motion.div>
          ))}
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
