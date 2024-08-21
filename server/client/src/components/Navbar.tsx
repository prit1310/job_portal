import { NavLink } from "react-router-dom";
import { useAuth } from '../store/auth';

const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className="fixed bottom-0 w-full bg-gray-800 text-white shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Job Portal" 
              className="h-8 w-auto" 
            />
            <span className="ml-2 text-xl font-bold">JobPortal</span>
          </NavLink>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        <nav>
          <ul className="flex space-x-6">
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
