import React from 'react';

interface HeroProps {
  setCurrentPage?: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setCurrentPage }) => {
  return (
    <section id="home" className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Badan Eksekutif Mahasiswa<br />
            <span className="text-green-200">Keluarga Mahasiswa Komputer</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-10 leading-relaxed">
            Mewujudkan mahasiswa komputer yang unggul, berdedikasi, dan bermanfaat bagi masyarakat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage && setCurrentPage('modul')}
              className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Tentang Kami
            </button>
            <button 
              onClick={() => setCurrentPage && setCurrentPage('sejarah')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-700 transition-all duration-300 transform hover:scale-105"
            >
              Sejarah Organisasi
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;