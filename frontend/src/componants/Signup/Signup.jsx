// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { signup, loginWithGoogle, loginWithFacebook } from '../../slice/authSlice';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     username: '',
//     phonenumber: '',
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const resultAction = await dispatch(signup(formData));
//     if (signup.fulfilled.match(resultAction)) {
//       navigate('/login');
//     }
//   };

//   const handleGoogleSignup = async () => {
//     await dispatch(loginWithGoogle());
//     navigate('/'); // Redirect to home after successful Google signup
//   };

//   const handleFacebookSignup = async () => {
//     await dispatch(loginWithFacebook());
//     navigate('/'); // Redirect to home after successful Facebook signup
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
//       <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
//       <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
//       <input type="text" name="phonenumber" onChange={handleChange} placeholder="Phone Number" required />
//       <button type="submit">Signup</button>
//       <button type="button" onClick={handleGoogleSignup}>Sign up with Google</button>
//       <button type="button" onClick={handleFacebookSignup}>Sign up with Facebook</button>
//     </form>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, loginWithGoogle, loginWithFacebook } from '../../slice/authSlice';
import { Eye, EyeOff, Mail, Lock, User, Phone, LogIn } from 'lucide-react';

const Input = ({ id, type, name, placeholder, value, onChange, className, required }) => (
  <input
    id={id}
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    required={required}
  />
);

const Button = ({ type, onClick, className, children }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
  >
    {children}
  </button>
);

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phonenumber: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const resultAction = await dispatch(signup(formData));
      if (signup.fulfilled.match(resultAction)) {
        navigate('/login');
      }
    } catch (err) {
      setError('Signup failed. Please check your information and try again.');
    }
  };

  const handleSocialSignup = async (signupFunction) => {
    try {
      await dispatch(signupFunction());
      navigate('/');
    } catch (err) {
      setError('Social signup failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Create an Account</h2>
        <p className="text-center text-gray-600 mb-6">Sign up to get started</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="phonenumber"
                type="tel"
                name="phonenumber"
                placeholder="Enter your phone number"
                value={formData.phonenumber}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full flex items-center justify-center">
            <LogIn className="mr-2" size={18} />
            Sign Up
          </Button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button onClick={() => handleSocialSignup(loginWithGoogle)} className="bg-red-500 hover:bg-red-600">
              Google
            </Button>
            <Button onClick={() => handleSocialSignup(loginWithFacebook)} className="bg-blue-600 hover:bg-blue-700">
              Facebook
            </Button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;