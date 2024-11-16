// src/components/ProgramDetails.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProgramById } from '../../slice/WhatWeOffer2Slice';
import { getUserFromToken, isAuthenticated } from '../../utils/tokenUtils';

const ProgramDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  
  const { currentProgram, loading, error } = useSelector(state => state.offer);

  useEffect(() => {
    if (id) {
      dispatch(fetchProgramById(id));
    }
    
    const userData = getUserFromToken();
    setUser(userData);
  }, [dispatch, id]);

  const handleSubscribe = () => {
    if (!isAuthenticated()) {
      navigate('/login', { 
        state: { 
          redirectTo: `/program-details/${id}`,
          message: 'يرجى تسجيل الدخول للاشتراك في البرنامج' 
        } 
      });
      return;
    }

    navigate('/subscriptions', {
      state: {
        program: {
          id: currentProgram._id,
          name: currentProgram.name,
          price: currentProgram.price,
          duration: currentProgram.duration,
          level: currentProgram.level
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">جاري التحميل...</div>
      </div>
    );
  }

  if (error || !currentProgram) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">
            {error || 'لم يتم العثور على البرنامج'}
          </div>
          <button 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={() => navigate('/')}
          >
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* صورة البرنامج */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
          <img 
            src={currentProgram.image} 
            alt={currentProgram.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white">
            {currentProgram.name}
          </h1>
        </div>

        {/* تفاصيل البرنامج */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">وصف البرنامج</h2>
              <p className="text-gray-600 leading-relaxed">
                {currentProgram.description}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">مميزات البرنامج</h2>
              <ul className="space-y-3">
                {currentProgram.features?.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-2">السعر</h3>
            <p className="text-3xl font-bold text-blue-600">${currentProgram.price}</p>
            <p className="text-gray-500">شهرياً</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-2">المدة</h3>
            <p className="text-3xl font-bold text-blue-600">{currentProgram.duration}</p>
            <p className="text-gray-500">شهر</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-2">المستوى</h3>
            <p className="text-3xl font-bold text-blue-600">{currentProgram.level}</p>
            <p className="text-gray-500">مستوى البرنامج</p>
          </div>
        </div>

        {/* أزرار التحكم */}
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-300"
          >
            العودة للبرامج
          </button>
          
          {/* زر الاشتراك المحدث */}
          <button 
            onClick={handleSubscribe}
            className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition duration-300 flex items-center gap-2"
          >
            <span>اشترك الآن</span>
            <span className="text-sm bg-green-600 px-2 py-1 rounded">
              ${currentProgram.price}/شهرياً
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
