import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup, loginWithGoogle, loginWithFacebook } from '../../slice/authSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phonenumber: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(signup(formData));
    if (signup.fulfilled.match(resultAction)) {
      navigate('/login');
    }
  };

  const handleGoogleSignup = async () => {
    await dispatch(loginWithGoogle());
    navigate('/'); // Redirect to home after successful Google signup
  };

  const handleFacebookSignup = async () => {
    await dispatch(loginWithFacebook());
    navigate('/'); // Redirect to home after successful Facebook signup
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
      <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
      <input type="text" name="phonenumber" onChange={handleChange} placeholder="Phone Number" required />
      <button type="submit">Signup</button>
      <button type="button" onClick={handleGoogleSignup}>Sign up with Google</button>
      <button type="button" onClick={handleFacebookSignup}>Sign up with Facebook</button>
    </form>
  );
};

export default Signup;
