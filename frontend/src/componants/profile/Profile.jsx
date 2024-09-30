
// Frontend: New Profile component (components/Profile.js)
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, updateProfile } from '../../slice/profileSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    username: '',
    phonenumber: '',
    image: '',
  });

  useEffect(() => {
    dispatch(getProfile());
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data available</div>;

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phonenumber">Phone Number:</label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Profile Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <div>
        <h3>Current Profile Information</h3>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        <p>Phone Number: {user.phonenumber}</p>
        <p>Provider: {user.provider}</p>
        {user.image && <img src={user.image} alt="Profile" style={{ width: '100px', height: '100px' }} />}
      </div>
    </div>
  );
};

export default Profile;
