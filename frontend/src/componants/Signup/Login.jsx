import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, loginWithGoogle, loginWithFacebook } from '../../slice/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login(formData));
    if (login.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  const handleGoogleLogin = async () => {
    await dispatch(loginWithGoogle());
    navigate('/'); // Redirect to home after successful Google login
  };

  const handleFacebookLogin = async () => {
    await dispatch(loginWithFacebook());
    navigate('/'); // Redirect to home after successful Facebook login
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      
      <p>
        You don't have an account? 
        <button onClick={() => navigate('/signup')} style={{ marginLeft: '5px', cursor: 'pointer' }}>
          Sign Up
        </button>
      </p>
      
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <button onClick={handleFacebookLogin}>Login with Facebook</button>
    </div>
  );
};

export default Login;
