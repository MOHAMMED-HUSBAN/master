import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrograms } from '../../slice/WhatWeOffer2Slice';

const WhatWeOffer2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { programs, loading, error } = useSelector((state) => state.offer);

  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  const handleProgramClick = (program) => {
    if (program && program._id) {
      console.log('Navigating to program:', program._id);
      navigate(`/program-details/${program._id}`);
    } else {
      console.error('Invalid program data:', program);
    }
  };

  if (loading) {
    return <div className="text-center p-4">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 p-4">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {programs.map((program) => (
        <div 
          key={program._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
          onClick={() => handleProgramClick(program)}
        >
          <img 
            src={program.image} 
            alt={program.name} 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{program.name}</h3>
            <p className="text-gray-600 mb-4">{program.description}</p>
            <div className="text-xl font-bold text-blue-600">
              ${program.price}/month
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhatWeOffer2;
