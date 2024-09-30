import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOfferings } from '../../slice/offeringsSlice';

const WhatWeOffer = () => {
  const dispatch = useDispatch();
  const { offerings, status, error } = useSelector((state) => state.offerings);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOfferings());
    }
  }, [status, dispatch]);

  return (
    <section className="py-16 px-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">What We Offer</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>{error}</p>}
        {offerings.map((offering, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform hover:translate-y-[-5px]">
            <i className={`fas ${offering.icon} text-4xl text-purple-700 mb-4`}></i>
            <h3 className="text-xl font-semibold mb-2">{offering.title}</h3>
            <p className="text-gray-700">{offering.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeOffer;
