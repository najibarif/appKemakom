import React from 'react';
import PropTypes from 'prop-types';
import { Users, FileText, Calendar, GraduationCap, Mail, BookOpen, ExternalLink, Settings, User } from 'lucide-react';

const Sidebar = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    { id: 'angkatan', label: 'Angkatan', icon: Users },
    { id: 'berita', label: 'Berita KEMAKOM', icon: FileText },
    { id: 'divisi', label: 'Divisi KEMAKOM', icon: Calendar },
    { id: 'dudu', label: 'DUDU', icon: Mail },
    { id: 'edukom', label: 'Edukom', icon: BookOpen },
    { id: 'event', label: 'Event', icon: Calendar },
    { id: 'panduan', label: 'Panduan CMS', icon: Settings },
    { id: 'proker', label: 'Proker', icon: ExternalLink },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-green-600 to-green-700 text-white min-h-screen fixed left-0 top-0 z-40">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold">KEMAKOM</h1>
            <p className="text-xs text-green-100">Content Management System</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-green-500/50 ${
                  activeItem === item.id ? 'bg-green-500/70 shadow-lg' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-green-500/30">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-500/30 hover:bg-green-500/50 transition-colors cursor-pointer">
          <User className="w-5 h-5" />
          <span className="text-sm font-medium">Admin CMS</span>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  activeItem: PropTypes.string.isRequired,
  setActiveItem: PropTypes.func.isRequired
};

export default Sidebar;