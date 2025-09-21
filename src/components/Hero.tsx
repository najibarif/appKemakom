import React from 'react';
import { ArrowRight, Play, Users, Award, BookOpen } from 'lucide-react';

interface HeroProps {
  setCurrentPage?: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setCurrentPage }) => {
  const stats = [
    { icon: Users, label: 'Mahasiswa Aktif', value: '1,200+' },
    { icon: Award, label: 'Prestasi Diraih', value: '150+' },
    { icon: BookOpen, label: 'Modul Tersedia', value: '80+' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-primary"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-yellow rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-tight">
              Badan Eksekutif Mahasiswa
              <span className="block text-accent-yellow mt-2">
                Keluarga Mahasiswa Komputer
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Mewujudkan mahasiswa komputer yang unggul, berdedikasi, dan bermanfaat bagi masyarakat melalui inovasi teknologi dan kepemimpinan yang berkelanjutan
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-6 justify-center mb-20" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={() => setCurrentPage && setCurrentPage('modul')}
              className="group inline-flex items-center px-8 py-4 bg-white text-primary-dark font-semibold text-lg rounded-xl hover:bg-accent-yellow transform hover:scale-105 transition-all duration-300 shadow-strong hover:shadow-primary-lg"
            >
              Jelajahi Fitur
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={() => setCurrentPage && setCurrentPage('sejarah')}
              className="group inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold text-lg rounded-xl hover:bg-white hover:text-primary-dark transform hover:scale-105 transition-all duration-300"
            >
              <Play className="mr-3 h-5 w-5" />
              Tentang Kami
            </button>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto" style={{ animationDelay: '0.6s' }}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="glass-effect rounded-2xl p-8 hover-lift">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-display font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;