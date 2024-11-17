import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, loginWithGoogle, loginWithFacebook } from '../../slice/authSlice';
import { Eye, EyeOff, Mail, Lock, User, Phone, LogIn } from 'lucide-react';

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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-800">
        <div className="text-center mb-8">
          <img
            src="/src/assets/favicon.png"
            alt="Alsharq Academy"
            className="mx-auto h-24 w-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Join Alsharq Taekwondo Academy</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            icon={User}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          
          <Input
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <div className="relative">
            <Input
              icon={Lock}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          <Input
            icon={Phone}
            type="tel"
            name="phonenumber"
            placeholder="Phone number"
            value={formData.phonenumber}
            onChange={handleChange}
            required
          />

          <button className="w-full py-3 px-4 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 
                           hover:to-gray-600 text-white rounded-lg font-medium transition-all duration-200 
                           transform hover:-translate-y-0.5">
            Create Account
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
            <button onClick={() => handleSocialSignup(loginWithGoogle)} 
                    className="py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium 
                             transition-all duration-200 transform hover:-translate-y-0.5">
              Google
            </button>
            <button onClick={() => handleSocialSignup(loginWithFacebook)} 
                    className="py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium 
                             transition-all duration-200 transform hover:-translate-y-0.5">
              Facebook
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="font-medium text-white hover:text-gray-300"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;