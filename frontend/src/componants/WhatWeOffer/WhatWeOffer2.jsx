// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const WhatWeOffer = () => {
//   const navigate = useNavigate();

//   const handleRegisterClick = (program) => {
//     navigate(`/program-details/${program}`);
//   };

//   return (
//     <div className="bg-gray-100 text-black p-4 text-center ">
//       <h2 className="text-2xl font-bold text-center mb-4">Learn About Our Other Programs</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white rounded-lg overflow-hidden shadow-lg">
//           <img src="https://img.freepik.com/free-photo/girl-wearing-kimono-standing-karate-stance_7502-4346.jpg?ga=GA1.1.221335592.1721508348" alt="Kids' Martial Arts" className="w-full h-48 object-cover" />
//           <div className="p-4">
//             <h3 className="text-xl font-semibold text-black mb-2">Kids Martial Arts</h3>
//             <p className="text-gray-700 mb-4">Build confidence and discipline in a fun environment.</p>
//             <button onClick={() => handleRegisterClick('kids-martial-arts')} className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-500 transition">
//               Register - $30/month
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg overflow-hidden shadow-lg">
//           <img src="https://img.freepik.com/free-photo/karate-girl-with-black-belt_155003-9230.jpg?t=st=1722868371~exp=1722871971~hmac=d655f17c4f35d81218afbdbee494fcf3d254608f7dcc95e58949fd221511921c&w=1060" alt="Adult Martial Arts" className="w-full h-48 object-cover" />
//           <div className="p-4 ">
//             <h3 className="text-xl font-semibold text-black mb-2">Adult Martial Arts</h3>
//             <p className="text-gray-700 mb-4">Get fit and learn self-defense ipsum dolor sit amet techniques.</p>
//             <button onClick={() => handleRegisterClick('adult-martial-arts')} className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-500  transition">
//               Register - $45/month
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg overflow-hidden shadow-lg">
//           <img src="https://img.freepik.com/free-photo/young-man-practicing-taekwondo-gymnasium_23-2150207133.jpg?ga=GA1.1.221335592.1721508348" alt="Summer Camp" className="w-full h-48 object-cover" />
//           <div className="p-4">
//             <h3 className="text-xl font-semibold text-black mb-2">Summer Camp</h3>
//             <p className="text-gray-700 mb-4">Action-packed days of martial arts and fun activities.</p>
//             <button onClick={() => handleRegisterClick('summer-camp')} className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-500 transition">
//               Register - $60/month
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg overflow-hidden shadow-lg">
//           <img src="https://img.freepik.com/free-photo/boy-writing-clipboard-while-looking-smiling-girl-exercising_23-2148186403.jpg?ga=GA1.1.221335592.1721508348&semt=ais_hybrid" alt="After School" className="w-full h-48 object-cover" />
//           <div className="p-4">
//             <h3 className="text-xl font-semibold text-black mb-2">After School</h3>
//             <p className="text-gray-700 mb-4">Supervised activities and martial arts training after school.</p>
//             <button  onClick={() => handleRegisterClick('after-school')} className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-500 transition">
              
//               Register - $40/month
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WhatWeOffer;

///////////////////////////////
// Update WhatWeOffer component
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
