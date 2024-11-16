// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

// const ProgramDetails = () => {
//   const { program } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//   });
//   const [currentProgram, setCurrentProgram] = useState(null);

//   const programInfo = {
//     'kids-martial-arts': {
//       title: "Kids' Martial Arts",
//       description: "Our Kids' Martial Arts program is designed to build confidence, discipline, and physical fitness in a fun and supportive environment. Children learn valuable self-defense skills while developing focus, respect, and teamwork.",
//       price: "$30/month",
//       image: "https://img.freepik.com/free-photo/girl-wearing-kimono-standing-karate-stance_7502-4346.jpg"
//     },
//     'adult-martial-arts': {
//       title: "Adult Martial Arts",
//       description: "Get fit and learn effective self-defense techniques in our Adult Martial Arts program. This comprehensive course combines physical training with mental discipline, helping you achieve your fitness goals while mastering practical martial arts skills.",
//       price: "$45/month",
//       image: "https://img.freepik.com/free-photo/karate-girl-with-black-belt_155003-9230.jpg"
//     },
//     'summer-camp': {
//       title: "Summer Camp",
//       description: "Our action-packed Summer Camp offers a perfect blend of martial arts training and fun activities. Children will enjoy learning new skills, making friends, and staying active throughout the summer months.",
//       price: "$60/month",
//       image: "https://img.freepik.com/free-photo/young-man-practicing-taekwondo-gymnasium_23-2150207133.jpg"
//     },
//     'after-school': {
//       title: "After School Program",
//       description: "Our After School program provides supervised activities and martial arts training in a safe, engaging environment. Students receive homework help, physical exercise, and valuable life skills training.",
//       price: "$40/month",
//       image: "https://img.freepik.com/free-photo/boy-writing-clipboard-while-looking-smiling-girl-exercising_23-2148186403.jpg"
//     }
//   };

//   useEffect(() => {
//     const foundProgram = Object.keys(programInfo).find(key => key.toLowerCase().replace(/\s+/g, '-') === program.toLowerCase());
//     if (foundProgram) {
//       setCurrentProgram(programInfo[foundProgram]);
//     } else {
//       console.error(`Program "${program}" not found`);
//     }
//   }, [program]);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitting:', formData);
//     alert('Registration submitted successfully!');
//   };

//   if (!currentProgram) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen p-4 text-center">
//       <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
//         <h1 className="text-2xl font-bold mb-4">{currentProgram.title}</h1>
//         <img 
//           src={currentProgram.image} 
//           alt={currentProgram.title} 
//           className="w-full h-auto max-h-56 object-cover mb-4 border rounded-md border-gray-300"
//         />
//         <p className="text-gray-700 mb-4">{currentProgram.description}</p>
//         <p className="text-lg font-semibold mb-4">Price: {currentProgram.price}</p>

//         <form onSubmit={handleSubmit} className="space-y-3">
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Full Name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Phone"
//             name="phone"
//             type="tel"
//             value={formData.phone}
//             onChange={handleInputChange}
//             required
//             margin="normal"
//           />
//           <div className="flex justify-between">
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={() => navigate('/')}
//             >
//               Back to Programs
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//             >
//               Submit Registration
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // export default ProgramDetails;import React, { useState, useEffect } from 'react';
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import { submitRegistration } from '../../slice/registrationSlice';

// const ProgramDetails = () => {
//   const { program } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const registrations = useSelector((state) => state.registration.registration);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//   });
//   const [currentProgram, setCurrentProgram] = useState(null);
//   const [error, setError] = useState(null);

//   const programInfo = {
//     'kids-martial-arts': {
//       title: "Kids' Martial Arts",
//       description: "Our Kids' Martial Arts program is designed to build confidence, discipline, and physical fitness in a fun and supportive environment.",
//       price: "$30/month",
//       image: "https://img.freepik.com/free-photo/girl-wearing-kimono-standing-karate-stance_7502-4346.jpg"
//     },
//     'adult-martial-arts': {
//       title: "Adult Martial Arts",
//       description: "Get fit and learn effective self-defense techniques in our Adult Martial Arts program.",
//       price: "$45/month",
//       image: "https://img.freepik.com/free-photo/karate-girl-with-black-belt_155003-9230.jpg"
//     },
//     'summer-camp': {
//       title: "Summer Camp",
//       description: "Our action-packed Summer Camp offers a perfect blend of martial arts training and fun activities.",
//       price: "$60/month",
//       image: "https://img.freepik.com/free-photo/young-man-practicing-taekwondo-gymnasium_23-2150207133.jpg"
//     },
//     'after-school': {
//       title: "After School Program",
//       description: "Our After School program provides supervised activities and martial arts training in a safe, engaging environment.",
//       price: "$40/month",
//       image: "https://img.freepik.com/free-photo/boy-writing-clipboard-while-looking-smiling-girl-exercising_23-2148186403.jpg"
//     }
//   };

//   useEffect(() => {
//     const foundProgram = Object.keys(programInfo).find(key => key.toLowerCase().replace(/\s+/g, '-') === program.toLowerCase());
//     if (foundProgram) {
//       setCurrentProgram(programInfo[foundProgram]);
//     } else {
//       console.error(`Program "${program}" not found`);
//     }
//   }, [program]);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     // Check for duplicate registrations
//     const isDuplicate = registrations.some(reg => 
//       reg.email === formData.email || 
//       reg.phone === formData.phone || 
//       reg.name === formData.name
//     );

//     if (isDuplicate) {
//       setError('This registration already exists.');
//       return;
//     }

//     const registrationData = { 
//       ...formData, 
//       programId: currentProgram._id
//     };

//     try {
//       const resultAction = await dispatch(submitRegistration(registrationData));
//       if (submitRegistration.fulfilled.match(resultAction)) {
//         alert('Registration submitted successfully!');
//         // Clear form fields
//         setFormData({
//           name: '',
//           email: '',
//           phone: '',
//         });
//       } else {
//         throw new Error(resultAction.payload || 'Failed to submit registration');
//       }
//     } catch (err) {
//       setError(err.message);
//       console.error('Registration failed:', err);
//     }
//   };

//   if (!currentProgram) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen p-4 text-center">
//       <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
//         <h1 className="text-2xl font-bold mb-4">{currentProgram.title}</h1>
//         <img 
//           src={currentProgram.image} 
//           alt={currentProgram.title} 
//           className="w-full h-auto max-h-56 object-cover mb-4 border rounded-md border-gray-300"
//         />
//         <p className="text-gray-700 mb-4">{currentProgram.description}</p>
//         <p className="text-lg font-semibold mb-4">Price: {currentProgram.price}</p>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-3">
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Full Name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Phone"
//             name="phone"
//             type="tel"
//             value={formData.phone}
//             onChange={handleInputChange}
//             required
//             margin="normal"
//           />
//           <div className="flex justify-between">
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={() => navigate('/')}
//             >
//               Back to Programs
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//             >
//               Submit Registration
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProgramDetails;
// src/components/ProgramDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { submitRegistration } from '../../slice/registrationSlice';

const ProgramDetails = () => {
  const { program } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registrations = useSelector((state) => state.registration.registration);
  const errorMessage = useSelector((state) => state.registration.error);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [currentProgram, setCurrentProgram] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    _id: '',
  });

  const [error, setError] = useState(null);

  // Define the programInfo object before using it
  const programInfo = {
    'kids-martial-arts': {
      _id: '1',
      title: "Kids' Martial Arts",
      description: "Our Kids' Martial Arts program is designed to build confidence, discipline, and physical fitness in a fun and supportive environment.",
      price: "$30/month",
      image: "https://img.freepik.com/free-photo/girl-wearing-kimono-standing-karate-stance_7502-4346.jpg",
    },
    'adult-martial-arts': {
      _id: '2',
      title: 'Adult Martial Arts',
      description: 'Get fit and learn effective self-defense techniques in our Adult Martial Arts program.',
      price: '$45/month',
      image: 'https://img.freepik.com/free-photo/karate-girl-with-black-belt_155003-9230.jpg',
    },
    'summer-camp': {
      _id: '3',
      title: 'Summer Camp',
      description: 'Our action-packed Summer Camp offers a perfect blend of martial arts training and fun activities.',
      price: '$60/month',
      image: 'https://img.freepik.com/free-photo/young-man-practicing-taekwondo-gymnasium_23-2150207133.jpg',
    },
    'after-school': {
      _id: '4',
      title: 'After School Program',
      description: 'Our After School program provides supervised activities and martial arts training in a safe, engaging environment.',
      price: '$40/month',
      image: 'https://img.freepik.com/free-photo/boy-writing-clipboard-while-looking-smiling-girl-exercising_23-2148186403.jpg',
    },
  };

  useEffect(() => {
    const foundProgram = programInfo[program];
    if (foundProgram) {
      setCurrentProgram(foundProgram);
    } else {
      console.error(`Program "${program}" not found`);
    }
  }, [program]);

  useEffect(() => {
    // Redirect to login if token is not present
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (errorMessage) {
      setError(errorMessage);
    }
  }, [errorMessage]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Check for duplicate registrations
    const isDuplicate = registrations.some(
      (reg) =>
        reg.email === formData.email ||
        reg.phone === formData.phone ||
        reg.name === formData.name
    );

    if (isDuplicate) {
      setError('This registration already exists.');
      return;
    }

    const registrationData = {
      ...formData,
      programId: currentProgram._id,
    };

    try {
      const resultAction = await dispatch(submitRegistration(registrationData));
      if (submitRegistration.fulfilled.match(resultAction)) {
        alert('Registration submitted successfully!');
        // Clear form fields
        setFormData({
          name: '',
          email: '',
          phone: '',
        });
      } else {
        setError(resultAction.payload || 'Failed to submit registration');
      }
    } catch (err) {
      setError(err.message);
      console.error('Registration failed:', err);
    }
  };

  if (!currentProgram.title) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 text-center">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{currentProgram.title}</h1>
        <img
          src={currentProgram.image}
          alt={currentProgram.title}
          className="w-full h-auto max-h-56 object-cover mb-4 border rounded-md border-gray-300"
        />
        <p className="text-gray-700 mb-4">{currentProgram.description}</p>
        <p className="text-lg font-semibold mb-4">Price: {currentProgram.price}</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <TextField
            fullWidth
            variant="outlined"
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            required
            margin="normal"
          />
          <div className="flex justify-between">
            <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
              Back to Programs
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit Registration
            </Button>
          </div>                                              
        </form>
      </div>
    </div>
  );
};

export default ProgramDetails;
