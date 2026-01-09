import React from 'react';
import { BookOpen, GraduationCap, History, ArrowRight, Users, Award, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: BookOpen,
      title: "Modul Pembelajaran",
      description: "Kumpulan modul pembelajaran komprehensif untuk berbagai mata kuliah program studi komputer dengan materi terkini dan berkualitas tinggi",
      page: "modul",
      stats: "80+ Modul"
    },
    {
      icon: GraduationCap,
      title: "Database Alumni",
      description: "Data alumni lengkap beserta informasi tempat magang, skripsi, dan karir untuk membantu networking dan inspirasi mahasiswa",
      page: "alumni",
      stats: "1,200+ Alumni"
    },
    {
      icon: History,
      title: "Kinerja Organisasi",
      description: "Rekam jejak BEM, DPM, dan UKK dari masa ke masa yang menginspirasi generasi mendatang",
      page: "kinerja",
      stats: "40+ Tahun"
    }
  ];

  const achievements = [
    { icon: Users, label: "Mahasiswa Aktif", value: "1,200+" },
    { icon: Award, label: "Prestasi Nasional", value: "25+" },
    { icon: Calendar, label: "Event per Tahun", value: "50+" }
  ];

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-[#0F4639] to-[#A6B933]"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#0F4639] to-[#A6B933] text-white rounded-full text-sm font-medium mb-6 shadow-md">
            <Award className="w-4 h-4 mr-2" />
            Fitur Unggulan
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#0F4639] to-[#A6B933]">
            Platform Terpadu untuk Mahasiswa Komputer
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
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl p-8 hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon & Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#0F4639] to-[#A6B933] rounded-xl flex items-center justify-center shadow-md">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-display font-bold text-[#0F4639]">{feature.stats}</div>
                    <div className="text-sm text-gray-500">Tersedia</div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4 group-hover:text-[#0F4639] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {feature.description}
                </p>

                {/* CTA Button */}
                <button 
                  onClick={() => navigate(`/${feature.page}`)}
                  className="group/btn inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#0F4639] to-[#A6B933] text-white font-semibold rounded-xl hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-md"
                >
                  Jelajahi
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-3xl shadow-lg p-12 animate-fade-in-up">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0F4639] to-[#A6B933]">
              Pencapaian Kami
            </h3>
            <p className="text-gray-600 text-lg">
              Prestasi yang telah diraih bersama dalam memajukan mahasiswa komputer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-[#0F4639] to-[#A6B933] rounded-xl flex items-center justify-center">
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{achievement.value}</div>
                  <div className="text-gray-600">{achievement.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
