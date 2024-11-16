
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WhatWeOffer = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);

  const handleRegisterClick = (program) => {
    navigate(`/program-details/${program}`);
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/WhatWeOffer2');
        const data = await response.json();
        setPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };
    
    fetchPrograms();
  }, []);

  return(
    <div className="bg-gray-100 text-black p-4 text-center">
      <h2 className="text-2xl font-bold text-center mb-4">Learn About Our Other Programs</h2>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(programs || []).map((program) => (
          <div key={program._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img src={program.image} alt={program.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-black mb-2">{program.name}</h3>
              <p className="text-gray-700 mb-4">{program.description}</p>
              <button
                onClick={() => handleRegisterClick(program.name.toLowerCase().replace(/ /g, '-'))}
                className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-500 transition"
              >
                Register - ${program.price}/month
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeOffer;
