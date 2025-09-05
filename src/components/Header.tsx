import React, { useState } from 'react';
import { GraduationCap, Menu, X, User, LogOut } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setCurrentPage('home');
  };

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'modul', label: 'Modul Pembelajaran' },
    { id: 'alumni', label: 'Database Alumni' },
    { id: 'angkatan', label: 'Angkatan' },
    { id: 'sejarah', label: 'Sejarah Organisasi' },
    { id: 'contact', label: 'Kontak' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">BEM KEMAKOM</h1>
          </div>

          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full md:top-auto left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none`}>
              <ul className="flex flex-col md:flex-row md:items-center gap-0 md:gap-8 p-4 md:p-0">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`block py-2 md:py-0 w-full text-left transition-colors ${
                        currentPage === item.id 
                          ? 'text-green-600 font-semibold' 
                          : 'text-gray-700 hover:text-green-600'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Admin</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNavClick('login')}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;