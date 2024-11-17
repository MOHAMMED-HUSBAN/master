import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, loginWithGoogle, loginWithFacebook } from '../../slice/authSlice';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';

const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />}
    <input
      {...props}
      className={`w-full px-3 py-3 pl-10 bg-gray-800/50 border border-gray-700 rounded-lg 
      text-white placeholder-gray-500 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 
      transition-all duration-200 ${props.className}`}
    />
  </div>
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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-800">
        <div className="text-center mb-8">
          <img
            src="/src/assets/favicon.png"
            alt="Alsharq Academy"
            className="mx-auto h-24 w-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            icon={Mail}
            type="email"
            placeholder="Email address"
            required
          />
          
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            required
          />

          <button className="w-full py-3 px-4 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 
                           hover:to-gray-600 text-white rounded-lg font-medium transition-all duration-200 
                           transform hover:-translate-y-0.5">
            Sign In
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-800 text-red-200 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button onClick={() => handleSocialLogin(loginWithGoogle)} 
                    className="bg-gray-800 hover:bg-gray-700 text-white">
              Google
            </Button>
            <Button onClick={() => handleSocialLogin(loginWithFacebook)} 
                    className="bg-gray-800 hover:bg-gray-700 text-white">
              Facebook
            </Button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} 
                  className="font-medium text-white hover:text-gray-300">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;