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
    <Container>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto py-8 px-4">
          {/* Hero Section */}
          <div className={`rounded-xl p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                {user.image && (
                  <img 
                    src={user.image} 
                    alt="Profile" 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-500 shadow-xl" 
                  />
                )}
                <button 
                  onClick={toggleDarkMode}
                  className="absolute -bottom-2 -right-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition shadow-lg"
                >
                  {darkMode ? '🌞' : '🌙'}
                </button>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                <p className="text-gray-500 dark:text-gray-400">{user.phonenumber}</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Edit Profile Section */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                  />
                  {formErrors.username && <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>}
                </div>
                
                <div>
                  <label htmlFor="phonenumber" className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    id="phonenumber"
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                  />
                  {formErrors.phonenumber && <p className="text-red-500 text-sm mt-1">{formErrors.phonenumber}</p>}
                </div>

               

                <button 
                  type="submit" 
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  Update Profile
                </button>
              </form>
            </div>

            {/* Programs Section */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h2 className="text-xl font-bold mb-4">Registered Programs</h2>
              {userPrograms.length > 0 ? (
                <div className="space-y-4">
                  {userPrograms.map((registration) => (
                    <div 
                      key={registration._id} 
                      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-md transition`}
                    >
                      <h3 className="font-semibold">{registration.program.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Registered: {new Date(registration.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No programs registered yet.</p>
              )}
            </div>

            {/* Events Section */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h2 className="text-xl font-bold mb-4">Joined Events</h2>
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
        </div>
      </div>
      
      <Box sx={{ mt: 4 }}>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            mb: 3
          }}
        >
          <FavoriteIcon color="error" />
          المنتجات المفضلة
        </Typography>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            backgroundColor: 'background.paper',
            borderRadius: 2
          }}
        >
          <FavoriteProducts />
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            mb: 3
          }}
        >
          <LocalShippingIcon />
          سجل الطلبات
        </Typography>
        <OrderHistory />
      </Box>
    </Container>
  );
};

export default Profile;
