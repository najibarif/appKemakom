import React from 'react';
import { GraduationCap, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Modul', href: '/modul' },
    { name: 'Alumni', href: '/alumni' },
    { name: 'Angkatan', href: '/angkatan' },
    { name: 'Sejarah', href: '/sejarah' },
    { name: 'Kontak', href: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                BEM KEMAKOM
              </h1>
              <p className="text-sm text-gray-600">Universitas Pendidikan Indonesia</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-green-50 text-green-700 shadow-sm'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Admin</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-green-50 text-green-700 shadow-sm'
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;