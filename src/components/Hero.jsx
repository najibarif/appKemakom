import React from 'react';
import { ArrowRight, Play, Users, Award, BookOpen } from 'lucide-react';

const Hero = ({ setCurrentPage }) => {
  const stats = [
    { icon: Users, label: 'Mahasiswa Aktif', value: '1,200+' },
    { icon: Award, label: 'Prestasi Diraih', value: '150+' },
    { icon: BookOpen, label: 'Modul Tersedia', value: '80+' }
  ];

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F4639] to-[#A6B933]"></div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-16 left-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 right-10 w-64 h-64 bg-[#A6B933] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full max-w-5xl text-center transform">

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-snug bg-gradient-to-r from-[#ffffff] to-[#fbf5af] bg-clip-text text-transparent">
          Badan Eksekutif Mahasiswa
          <br />
          Keluarga Mahasiswa Komputer
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed max-w-2xl">
          Mewujudkan mahasiswa komputer yang unggul, berdedikasi, dan bermanfaat bagi masyarakat melalui inovasi teknologi dan kepemimpinan yang berkelanjutan
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center my-8">
          <button
            onClick={() => setCurrentPage && setCurrentPage('modul')}
            className="group inline-flex items-center px-5 py-3 bg-white text-[#0F4639] font-semibold text-base rounded-xl hover:bg-[#A6B933] hover:text-white transform hover:scale-105 transition-all duration-300"
          >
            Jelajahi Fitur
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <button
            onClick={() => setCurrentPage && setCurrentPage('sejarah')}
            className="group inline-flex items-center px-5 py-3 border-2 border-white text-white font-semibold text-base rounded-xl hover:bg-white hover:text-[#0F4639] transform hover:scale-105 transition-all duration-300"
          >
            <Play className="mr-2 h-4 w-4" />
            Tentang Kami
          </button>
        </div>
      </div>
    </section >
  );
};

export default Hero;
