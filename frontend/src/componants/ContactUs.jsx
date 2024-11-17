import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import contactImage from '../assets/contact.jpg';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully!',
          text: 'We will get back to you soon.',
          confirmButtonColor: '#7C3AED'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        confirmButtonColor: '#EF4444'
      });
    }
    setStatus('');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black">
      {/* Spacing for header */}
      <div className="h-20"></div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info Section */}
            <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-8">
              <div className="h-64 mb-8">
                <img 
                  src={contactImage} 
                  alt="Contact Us" 
                  className="w-full h-full object-cover rounded-lg border border-gray-700"
                />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-800/50 p-3 rounded-lg backdrop-blur-sm">
                    <FaMapMarkerAlt className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Address</h4>
                    <p className="text-gray-300">Zarqa - Baghdad Street</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-gray-800/50 p-3 rounded-lg backdrop-blur-sm">
                    <FaPhone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Phone</h4>
                    <p className="text-gray-300">0781517466</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-gray-800/50 p-3 rounded-lg backdrop-blur-sm">
                    <FaEnvelope className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-gray-300">info@taekwondo-academy.com</p>
                  </div>
                </div>

                <div className="pt-8">
                  <h4 className="font-semibold text-white mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-700/50 transition-colors backdrop-blur-sm">
                      <FaFacebook className="w-6 h-6 text-white" />
                    </a>
                    <a href="#" className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-700/50 transition-colors backdrop-blur-sm">
                      <FaInstagram className="w-6 h-6 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-8">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white 
                           placeholder-gray-500 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 
                           transition-all duration-200"
                  placeholder="Enter your name"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white 
                           placeholder-gray-500 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 
                           transition-all duration-200"
                  placeholder="Enter your email"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white 
                           placeholder-gray-500 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 
                           transition-all duration-200"
                  placeholder="Enter your phone number"
                />

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white 
                           placeholder-gray-500 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 
                           transition-all duration-200"
                  placeholder="Enter message subject"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white 
                           placeholder-gray-500 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 
                           transition-all duration-200"
                  placeholder="Write your message here"
                ></textarea>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 
                           hover:to-gray-600 text-white rounded-lg font-medium transition-all duration-200 
                           transform hover:-translate-y-0.5"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 