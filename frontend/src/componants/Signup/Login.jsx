// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login, loginWithGoogle, loginWithFacebook } from '../../slice/authSlice';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const resultAction = await dispatch(login(formData));
//     if (login.fulfilled.match(resultAction)) {
//       navigate('/');
//     }
//   };

//   const handleGoogleLogin = async () => {
//     await dispatch(loginWithGoogle());
//     navigate('/'); // Redirect to home after successful Google login
//   };

//   const handleFacebookLogin = async () => {
//     await dispatch(loginWithFacebook());
//     navigate('/'); // Redirect to home after successful Facebook login
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
//         <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
//         <button type="submit">Login</button>
//       </form>
      
//       <p>
//         You don't have an account? 
//         <button onClick={() => navigate('/signup')} style={{ marginLeft: '5px', cursor: 'pointer' }}>
//           Sign Up
//         </button>
//       </p>
      
//       <button onClick={handleGoogleLogin}>Login with Google</button>
//       <button onClick={handleFacebookLogin}>Login with Facebook</button>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, loginWithGoogle, loginWithFacebook } from '../../slice/authSlice';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';

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

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      const resultAction = await dispatch(login(formData));
      if (login.fulfilled.match(resultAction)) {
        navigate('/');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleSocialLogin = async (loginFunction) => {
    try {
      await dispatch(loginFunction());
      navigate('/');
    } catch (err) {
      setError('Social login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Login to your account</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <Button type="submit" className="w-full flex items-center justify-center">
            <LogIn className="mr-2" size={18} />
            Login
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
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button onClick={() => handleSocialLogin(loginWithGoogle)} className="bg-red-500 hover:bg-red-600">
              Google
            </Button>
            <Button onClick={() => handleSocialLogin(loginWithFacebook)} className="bg-blue-600 hover:bg-blue-700">
              Facebook
            </Button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;