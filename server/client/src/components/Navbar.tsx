import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from '../store/auth';

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed bottom-0 w-full bg-gray-800 text-white shadow-lg z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4">
        <div className="flex justify-between items-center w-full md:w-auto">
          <NavLink to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Job Portal" 
              className="h-8 w-auto" 
            />
            <span className="ml-2 text-xl font-bold">JobPortal</span>
          </NavLink>
          <button 
            onClick={toggleMenu} 
            className="text-white md:hidden focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
        <nav className={`flex-col md:flex md:flex-row md:items-center mt-4 md:mt-0 ${isMenuOpen ? 'flex' : 'hidden'}`}>
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `hover:text-gray-400 ${isActive ? 'text-yellow-500' : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/jobadd" 
                className={({ isActive }) => 
                  `hover:text-gray-400 ${isActive ? 'text-yellow-500' : ''}`
                }
              >
                Add Job
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/job" 
                className={({ isActive }) => 
                  `hover:text-gray-400 ${isActive ? 'text-yellow-500' : ''}`
                }
              >
                Jobs
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contactus" 
                className={({ isActive }) => 
                  `hover:text-gray-400 ${isActive ? 'text-yellow-500' : ''}`
                }
              >
                Contact Us
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink 
                  to="/logout" 
                  className={({ isActive }) => 
                    `hover:text-gray-400 ${isActive ? 'text-yellow-500' : ''}`
                  }
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink 
                    to="/register" 
                    className={({ isActive }) => 
                      `hover:text-gray-400 ${isActive ? 'text-yellow-500' : ''}`
                    }
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/login" 
                    className={({ isActive }) => 
                      `hover:text-gray-400 ${isActive ? 'text-yellow-500' : ''}`
                    }
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
