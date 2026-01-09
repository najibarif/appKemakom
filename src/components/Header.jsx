import React from 'react';
import { GraduationCap, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, onLogout, userProfile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Modul', href: '/modul' },
    { name: 'Alumni', href: '/alumni' },
    { name: 'Angkatan', href: '/angkatan' },
    { name: 'Sejarah', href: '/sejarah' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0F4639] to-[#A6B933] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800 relative inline-block">
                <span className="relative z-10">BEM KEMAKOM</span>
              </h1>
              <p className="text-sm text-gray-600 mt-1">Universitas Pendidikan Indonesia</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-[#0F4639]/20 to-[#A6B933]/20 text-[#0F4639] font-semibold border-b-2 border-[#0F4639]'
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-[#0F4639]/5 hover:to-[#A6B933]/5 hover:text-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* User Icon - Shows logged in status, clickable to go to profile */}
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[#0F4639] to-[#A6B933] rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  title="Profil Saya"
                >
                  {userProfile?.profile_image ? (
                    <img
                      src={userProfile.profile_image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                  <span className="absolute opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs px-2 py-1 rounded mt-12 pointer-events-none transition-opacity duration-300 whitespace-nowrap z-50">
                    Profil Saya
                  </span>
                </button>
                
                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#0F4639] to-[#A6B933] text-white rounded-lg hover:from-[#0F4639]/90 hover:to-[#A6B933]/90 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-300"
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
                      ? 'bg-gradient-to-r from-[#0F4639]/10 to-[#A6B933]/10 text-[#0F4639] shadow-sm'
                      : 'text-[#0F4639] hover:bg-gradient-to-r hover:from-[#0F4639]/5 hover:to-[#A6B933]/5 hover:text-[#0F4639]'
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