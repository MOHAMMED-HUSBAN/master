
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/favicon.png';
import { logout } from '../slice/authSlice'; // Update this path
import { FaUser } from 'react-icons/fa';



const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };
 
  

  

  const AuthButton = () => {
    const token = localStorage.getItem('token');
    return token? (
      <button onClick={handleLogout} className="text-white hover:text-purple-300">
        Logout
      </button>
    ) : (
      <button onClick={handleLogin} className="text-white hover:text-purple-300">
        Login
      </button>
    );
  };






  return (
    <div className="relative bg-purple-900">
      <header className="fixed left-0 w-full z-20 bg-purple-900 bg-opacity-10 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="MAHD Sports Academy" className="h-15 w-11 mr-2" />
        </div>
        <div className="flex items-center space-x-4">
          <AuthButton />
          {token && (
            
              <Link to="/profile" className="block hover:text-purple-300">
              <FaUser />
              </Link>
            
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="h-6 w-6 z-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/cart" className="relative">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13L6 17h12l-1-4M9 21h6M9 21a2 2 0 114 0M9 21H7m2 0h6m-8 0a2 2 0 104 0" />
            </svg>
          </Link>
        </div>
      </header>
      
      
      <div className={`fixed inset-y-0 right-0 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-300 ease-in-out bg-purple-800 text-white w-64 p-6 z-30`}>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li><Link to="/" className="block hover:text-purple-300">Home</Link></li>
            <li><Link to="/Welcome" className="block hover:text-purple-300">latest additions</Link></li>

          
            {/* <li><Link to="/event" className="block hover:text-purple-300">Event</Link></li> */}
            <li><Link to="/shop" className="block hover:text-purple-300">Shop</Link></li>
            {/* <li><Link to="/Program" className="block hover:text-purple-300">Program</Link></li> */}
            <li><Link to="/video" className="block hover:text-purple-300">Poomsae</Link></li>

            {/* <li><Link to="/news" className="block hover:text-purple-300">News</Link></li> */}
            <li><Link to="/about" className="block hover:text-purple-300">About</Link></li>
           
          </ul>
        </nav>
      </div>

      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-purple-800 p-2 rounded-r-lg z-30">
        <div className="space-y-4">
          <a href="#" className="block text-white hover:text-purple-300">
            {/* <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17h-2v-2h2v2zm2.07-7.75l-.9.92c-.5.51-.86.97-1.04 1.69-.08.32-.13.68-.13 1.14h-2v-.5c0-.46.08-.9.22-1.31.2-.58.53-1.1.95-1.52l1.24-1.26c.46-.44.68-1.1.55-1.8-.13-.72-.69-1.33-1.39-1.53-1.11-.31-2.14.32-2.47 1.27-.12.37-.43.65-.82.65h-.3C6.73 9 6.5 8.48 6.77 8.06c.1-.18.22-.34.34-.5.61-.78 1.47-1.27 2.43-1.42 1.69-.25 3.29.61 4.11 1.92.51.81.64 1.85.33 2.88-.22.74-.65 1.39-1.2 1.9-.31.29-.58.57-.77.85z"/>
            </svg> */}
          </a>
          <a href="https://www.facebook.com/people/%D9%85%D8%B1%D9%83%D8%B2-%D8%A7%D9%84%D8%B4%D8%B1%D9%82-%D9%84%D9%84%D8%AA%D8%A7%D9%8A%D9%83%D9%88%D8%A7%D9%86%D8%AF%D9%88/100063696364462/" className="block text-white hover:text-purple-300">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
            </svg>
          </a>
          <a href="#" className="block text-white hover:text-purple-300">
            {/* <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.64c-.2.44-.47.83-.78 1.13-.03.05-.04.1-.04.15v.26c0 2.52-1.88 5.42-5.32 5.42-1.05 0-2.03-.3-2.85-.83.14.02.29.03.44.03 1.27 0 2.43-.42 3.36-1.13-1.19-.02-2.19-.8-2.53-1.84.16.03.33.05.51.05.24 0 .48-.03.71-.09-1.24-.25-2.17-1.35-2.17-2.66v-.03c.37.2.78.32 1.22.33-.73-.49-1.2-1.32-1.2-2.27 0-.5.13-.97.37-1.38 1.33 1.63 3.31 2.71 5.55 2.82-.04-.2-.07-.41-.07-.63 0-1.52 1.23-2.75 2.75-2.75.79 0 1.5.33 2 .87.62-.12 1.21-.35 1.74-.7-.2.64-.64 1.18-1.2 1.52.55-.07 1.08-.21 1.57-.42z"/>
            </svg> */}
          </a>
        </div>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Header;
