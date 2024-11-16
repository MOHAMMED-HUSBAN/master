
// // Frontend: New Profile component (components/Profile.js)
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getProfile, updateProfile } from '../../slice/profileSlice';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const { user, loading, error } = useSelector((state) => state.profile);
//   const [formData, setFormData] = useState({
//     username: '',
//     phonenumber: '',
//     image: '',
//   });

//   useEffect(() => {
//     dispatch(getProfile());
//   }, [dispatch]);

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         username: user.username || '',
//         phonenumber: user.phonenumber || '',
//         image: user.image || '',
//       });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateProfile(formData));
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!user) return <div>No user data available</div>;

//   return (
//     <div>
//       <h2>Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="phonenumber">Phone Number:</label>
//           <input
//             type="text"
//             id="phonenumber"
//             name="phonenumber"
//             value={formData.phonenumber}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="image">Profile Image URL:</label>
//           <input
//             type="text"
//             id="image"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Update Profile</button>
//       </form>
//       <div>
//         <h3>Current Profile Information</h3>
//         <p>Email: {user.email}</p>
//         <p>Username: {user.username}</p>
//         <p>Phone Number: {user.phonenumber}</p>
//         <p>Provider: {user.provider}</p>
//         {user.image && <img src={user.image} alt="Profile" style={{ width: '100px', height: '100px' }} />}
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getProfile, updateProfile, getUserPrograms } from '../../slice/profileSlice';
import { getUserEvents } from '../../slice/eventSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, userPrograms, loading, error } = useSelector((state) => state.profile);  
  const [formData, setFormData] = useState({
    username: '',
    phonenumber: '',
    image: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getUserPrograms());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        phonenumber: user.phonenumber || '',
        image: user.image || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' }); // Reset error on change
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.phonenumber) errors.phonenumber = "Phone number is required";
    if (!formData.image) errors.image = "Profile image URL is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }
    dispatch(updateProfile(formData));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getUserPrograms());
    dispatch(getUserEvents());
  }, [dispatch]);

  const { userEvents } = useSelector((state) => state.events);


  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!user) return <div className="text-center">No user data available</div>;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl w-full p-6 rounded-lg shadow-md flex flex-col lg:flex-row">
      <div className="lg:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Profile Information</h2>
          {user.image && (
            <img src={user.image} alt="Profile" className="mt-4 w-24 h-24 rounded-full object-cover" />
          )}
              <p className="mt-2">Username: <span className="font-medium">{user.username}</span></p>
          <p className="mt-1">Email: <span className="font-medium">{user.email}</span></p>
      
          <p className="mt-1">Phone Number: <span className="font-medium">{user.phonenumber}</span></p>
        
        </div>


         
        {/* New section for registered programs */}
        <div className="lg:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Registered Programs</h2>
          {userPrograms.length > 0 ? (
            <ul>
              {userPrograms.map((registration) => (
                <li key={registration._id} className="mb-2">
                  <strong>{registration.program.name}</strong> - Registered on: {new Date(registration.createdAt).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No programs registered yet.</p>
          )}
        </div>

         {/* New section for joined events */}
         <div className="lg:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Joined Events</h2>
          {userEvents.length > 0 ? (
            <ul>
              {userEvents.map((event) => (
                <li key={event._id} className="mb-2">
                   <img src={event.image} alt={event.title} className="event-img" />
                  <h1>{event.title}</h1>
                  <p>Date: {event.date}</p> 
                </li>
              ))}
            </ul>
          ) : (
            <p>No events joined yet.</p>
          )}
        </div>
        {/* Left Section - Form */}
        <div className="lg:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
          <button
            onClick={toggleDarkMode}
            className="mb-4 py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${formErrors.username ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="phonenumber" className="block">Phone Number:</label>
              <input
                type="text"
                id="phonenumber"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${formErrors.phonenumber ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formErrors.phonenumber && <p className="text-red-500 text-sm">{formErrors.phonenumber}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block">Profile Image URL:</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${formErrors.image ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formErrors.image && <p className="text-red-500 text-sm">{formErrors.image}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              Update Profile
            </button>
          </form>
        </div>

        
        
        {/* Right Section - Current Info */}
     
      </div>
    </div>
  );
};

export default Profile;
