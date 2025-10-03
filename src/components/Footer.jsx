import React from 'react';
import PropTypes from 'prop-types';
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = ({ setCurrentPage }) => {
  const quickLinks = [
    { label: 'Beranda', page: 'home' },
    { label: 'Modul Pembelajaran', page: 'modul' },
    { label: 'Database Alumni', page: 'alumni' },
    { label: 'Data Angkatan', page: 'angkatan' },
    { label: 'Sejarah Organisasi', page: 'sejarah' },
    { label: 'Kontak', page: 'contact' }
  ];

  const organizations = [
    { name: 'DPM KEMAKOM', url: '#' },
    { name: 'UKK KEMAKOM', url: '#' },
    { name: 'Fakultas Ilmu Komputer', url: '#' },
    { name: 'BEM Universitas', url: '#' },
    { name: 'Himpunan Mahasiswa', url: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, url: '#', label: 'Facebook' },
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Linkedin, url: '#', label: 'LinkedIn' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'info@kemakom.ugm.ac.id' },
    { icon: Phone, text: '+62 274 555 0123' },
    { icon: MapPin, text: 'Jl. Grafika No. 2, Yogyakarta 55281' }
  ];

  return (
    <footer className="bg-gradient-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-yellow rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold">BEM KEMAKOM</h3>
                <p className="text-primary-light text-sm">Universitas Gadjah Mada</p>
              </div>
            </div>
            
            <p className="text-white/90 mb-8 leading-relaxed">
              Badan Eksekutif Mahasiswa Keluarga Mahasiswa Komputer berkomitmen untuk memajukan kualitas mahasiswa dan menjembatani aspirasi mahasiswa dengan pihak fakultas.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-display font-bold mb-8">Link Cepat</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => setCurrentPage(link.page)}
                    className="text-white/90 hover:text-primary-light transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-primary-light rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizations */}
          <div>
            <h3 className="text-xl font-display font-bold mb-8">Organisasi Terkait</h3>
            <ul className="space-y-4">
              {organizations.map((org, index) => (
                <li key={index}>
                  <a 
                    href={org.url}
                    className="text-white/90 hover:text-primary-light transition-colors duration-300 flex items-center group"
                  >
                    <ExternalLink className="w-4 h-4 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {org.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-display font-bold mb-8">Hubungi Kami</h3>
            <ul className="space-y-6">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-white/90 leading-relaxed">{contact.text}</span>
                  </li>
                );
              })}
            </ul>

            {/* Newsletter */}
            <div className="mt-8 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <h4 className="font-display font-semibold mb-4">Newsletter</h4>
              <p className="text-sm text-white/80 mb-4">Dapatkan update terbaru dari kami</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-accent-yellow backdrop-blur-sm"
                />
                <button className="px-4 py-2 bg-primary-light text-primary-dark font-semibold rounded-lg hover:bg-white transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-16 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/80 text-center md:text-left">
              &copy; 2025 BEM Keluarga Mahasiswa Komputer. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/80">
              <a href="#" className="hover:text-primary-light transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-primary-light transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-primary-light transition-colors duration-300">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  setCurrentPage: PropTypes.func.isRequired
};

export default Footer;