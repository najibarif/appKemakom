import React from 'react';
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">BEM KEMAKOM</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Badan Eksekutif Mahasiswa Keluarga Mahasiswa Komputer berkomitmen untuk memajukan kualitas mahasiswa dan menjembatani aspirasi mahasiswa dengan pihak fakultas.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Link Cepat</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('modul')}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Modul Pembelajaran
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('alumni')}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Database Alumni
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('sejarah')}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Sejarah Organisasi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Kontak
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Organisasi Terkait</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">DPM KEMAKOM</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">UKK KEMAKOM</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Fakultas Ilmu Komputer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">BEM Universitas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Himpunan Mahasiswa</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 BEM Keluarga Mahasiswa Komputer. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;