import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, Typography, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import { getProfile, updateProfile, getUserPrograms } from '../../slice/profileSlice';
import { getUserEvents } from '../../slice/eventSlice';
import FavoriteProducts from './FavoriteProducts';
import OrderHistory from '../../components/profile/OrderHistory';
const Profile = () => {
  const dispatch = useDispatch();
  const { user, userPrograms, loading, error } = useSelector((state) => state.profile);  
  const { userEvents } = useSelector((state) => state.events);
  const [formData, setFormData] = useState({
    username: '',
    phonenumber: '',
    image: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getProfile()),
          dispatch(getUserPrograms()),
          dispatch(getUserEvents())
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!user) return <div className="text-center">No user data available</div>;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-800 to-gray-900">
      {/* Spacing for header */}
      <div className="h-20"></div>

      <Container>
        <div className="container mx-auto py-8 px-4">
          {/* Hero Section */}
          <div className="bg-gradient-to-b from-white/5 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                {user.image && (
                  <img 
                    src={user.image} 
                    alt="Profile" 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/10" 
                  />
                )}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{user.username}</h1>
                <p className="text-gray-300">{user.email}</p>
                <p className="text-gray-300">{user.phonenumber}</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Edit Profile Section */}
            <div className="bg-gradient-to-b from-white/5 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4">Edit Profile</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-800/50 border border-white/10 text-white 
                             placeholder-gray-500 focus:border-white/20 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-800/50 border border-white/10 text-white 
                             placeholder-gray-500 focus:border-white/20 transition-all duration-200"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 px-4 bg-gradient-to-r from-white/10 to-gray-800 hover:from-white/20 
                           hover:to-gray-700 text-white rounded-lg font-medium transition-all duration-200 
                           transform hover:-translate-y-0.5"
                >
                  Update Profile
                </button>
              </form>
            </div>

            {/* Programs Section */}
            <div className="bg-gradient-to-b from-white/5 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4">Registered Programs</h2>
              {userPrograms.length > 0 ? (
                <div className="space-y-4">
                  {userPrograms.map((registration) => (
                    <div 
                      key={registration._id} 
                      className="p-4 rounded-lg bg-gray-800/50 border border-white/10 hover:bg-white/5 transition-all duration-200"
                    >
                      <h3 className="font-semibold text-white">{registration.program.name}</h3>
                      <p className="text-sm text-gray-400">
                        Registered: {new Date(registration.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No programs registered yet.</p>
              )}
            </div>

            {/* Events Section */}
            <div className="bg-gradient-to-b from-white/5 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4">Joined Events</h2>
              {userEvents.length > 0 ? (
                <div className="space-y-4">
                  {userEvents.map((event) => (
                    <div 
                      key={event._id} 
                      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-md transition`}
                    >
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Date: {event.date}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No events joined yet.</p>
              )}
            </div>
          </div>

          {/* Orders and Favorites sections with similar styling */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom className="text-white flex items-center gap-2">
              <FavoriteIcon className="text-red-500" />
              Favorite Products
            </Typography>
            <div className="bg-gradient-to-b from-white/5 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl">
              <FavoriteProducts />
            </div>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom className="text-white flex items-center gap-2">
              <LocalShippingIcon />
              Order History
            </Typography>
            <div className="bg-gradient-to-b from-white/5 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl">
              <OrderHistory />
            </div>
          </Box>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
