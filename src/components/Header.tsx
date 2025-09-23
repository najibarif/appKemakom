import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X, User, LogOut } from 'lucide-react';

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => Promise<void> | void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn = false, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-soft' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-primary transform group-hover:scale-105 transition-transform duration-300">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-xl font-display font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-primary-dark' : 'text-white'
                }`}>
                  BEM KEMAKOM
                </h1>
                <p className={`text-sm transition-colors duration-300 ${
                  isScrolled ? 'text-primary-600' : 'text-accent-yellow'
                }`}>
                  Universitas Gadjah Mada
                </p>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 group ${
                  location.pathname === item.path
                    ? isScrolled
                      ? 'text-primary-dark bg-primary-50'
                      : 'text-accent-yellow bg-white/10'
                    : isScrolled
                      ? 'text-gray-700 hover:text-primary-dark hover:bg-primary-50'
                      : 'text-white/90 hover:text-accent-yellow hover:bg-white/10'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-light rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Auth Button */}
          <div className="hidden lg:flex items-center">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-6 py-3 bg-gradient-primary text-white font-medium rounded-xl hover:bg-gradient-primary-hover transform hover:scale-105 transition-all duration-300 shadow-primary"
              >
                <LogOut className="h-4 w-4 mr-2" />
                   ? 'text-primary-dark bg-green-50'
                   : 'text-primary-light bg-white/10'
            ) : (
              <Link
                   : 'text-white/90 hover:text-primary-light hover:bg-white/10'
                className="inline-flex items-center px-6 py-3 bg-gradient-primary text-white font-medium rounded-xl hover:bg-gradient-primary-hover transform hover:scale-105 transition-all duration-300 shadow-primary"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-light rounded-full"></div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled
                  ? 'text-gray-700 hover:bg-primary-50'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-white bg-gradient-primary shadow-primary'
                    : 'text-gray-700 hover:text-primary-dark hover:bg-primary-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-primary text-white font-medium rounded-xl hover:bg-gradient-primary-hover transition-all duration-300 shadow-primary"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={handleNavClick}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-primary text-white font-medium rounded-xl hover:bg-gradient-primary-hover transition-all duration-300 shadow-primary"
                >
                  <User className="h-4 w-4 mr-2" />
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