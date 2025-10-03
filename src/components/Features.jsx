import React from 'react';
import { BookOpen, GraduationCap, History, ArrowRight, Users, Award, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';

const Features = ({ setCurrentPage }) => {
  const features = [
    {
      icon: BookOpen,
      title: "Modul Pembelajaran",
      description: "Kumpulan modul pembelajaran komprehensif untuk berbagai mata kuliah program studi komputer dengan materi terkini dan berkualitas tinggi",
      page: "modul",
      color: "from-blue-500 to-blue-600",
      stats: "80+ Modul"
    },
    {
      icon: GraduationCap,
      title: "Database Alumni",
      description: "Data alumni lengkap beserta informasi tempat magang, skripsi, dan karir untuk membantu networking dan inspirasi mahasiswa",
      page: "alumni",
      color: "from-emerald-500 to-emerald-600",
      stats: "1,200+ Alumni"
    },
    {
      icon: History,
      title: "Sejarah Organisasi",
      description: "Sejarah dan rekam jejak BEM, DPM, dan UKK dari masa ke masa yang menginspirasi generasi mendatang",
      page: "sejarah",
      color: "from-purple-500 to-purple-600",
      stats: "40+ Tahun"
    }
  ];

  const achievements = [
    { icon: Users, label: "Mahasiswa Aktif", value: "1,200+" },
    { icon: Award, label: "Prestasi Nasional", value: "25+" },
    { icon: Calendar, label: "Event per Tahun", value: "50+" }
  ];

  return (
    <section className="py-24 bg-neutral-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-soft"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4 mr-2" />
            Fitur Unggulan
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Platform Terpadu untuk
            <span className="block text-transparent bg-clip-text bg-gradient-primary">
              Mahasiswa Komputer
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Website BEM Keluarga Mahasiswa Komputer menyediakan berbagai fitur untuk mendukung akademik dan menjaga silaturahmi antar mahasiswa
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="group bg-white rounded-2xl shadow-soft hover:shadow-strong p-8 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon & Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center shadow-primary">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-display font-bold text-primary-dark">{feature.stats}</div>
                    <div className="text-sm text-gray-500">Tersedia</div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4 group-hover:text-primary-dark transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {feature.description}
                </p>

                {/* CTA Button */}
                <button 
                  onClick={() => setCurrentPage && setCurrentPage(feature.page)}
                  className="group/btn inline-flex items-center px-6 py-3 bg-gradient-primary text-white font-semibold rounded-xl hover:bg-gradient-primary-hover transform hover:scale-105 transition-all duration-300 shadow-primary"
                >
                  Jelajahi
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-3xl shadow-medium p-12 animate-fade-in-up">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Pencapaian Kami
            </h3>
            <p className="text-gray-600 text-lg">
              Prestasi yang telah diraih bersama dalam memajukan mahasiswa komputer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-primary">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-display font-bold text-primary-dark mb-2">
                    {achievement.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {achievement.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

Features.propTypes = {
  setCurrentPage: PropTypes.func
};

export default Features;