// components/Header.tsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X, User, LogOut } from 'lucide-react';

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => Promise<void> | void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn = false, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Beranda' },
    { path: '/modul', label: 'Modul' },
    { path: '/alumni', label: 'Alumni' },
    { path: '/angkatan', label: 'Angkatan' },
    { path: '/sejarah', label: 'Sejarah' },
    { path: '/contact', label: 'Kontak' }
  ];

  const handleLogout = async () => {
    if (onLogout) {
      try {
        await onLogout();
        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold text-green-600">
                <GraduationCap className="h-8 w-8" />
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:flex sm:items-center sm:space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={`${
                  location.pathname === item.path
                    ? 'border-green-500 text-green-700 border-b-[3px] pb-5'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 border-b-2'
                } inline-flex items-center px-5 pt-5 pb-5 text-sm font-medium transition-colors duration-200`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden sm:flex sm:items-center">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={`${
                  location.pathname === item.path
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={handleNavClick}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;