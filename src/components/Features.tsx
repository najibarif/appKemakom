import React from 'react';
import { BookOpen, GraduationCap, History } from 'lucide-react';

interface FeaturesProps {
  setCurrentPage?: (page: string) => void;
}

const Features: React.FC<FeaturesProps> = ({ setCurrentPage }) => {
  const features = [
    {
      icon: BookOpen,
      title: "Modul Pembelajaran",
      description: "Kumpulan modul pembelajaran untuk berbagai mata kuliah program studi komputer",
      page: "modul"
    },
    {
      icon: GraduationCap,
      title: "Database Alumni",
      description: "Data alumni lengkap beserta informasi tempat magang, skripsi, dan karir",
      page: "alumni"
    },
    {
      icon: History,
      title: "Sejarah Organisasi",
      description: "Sejarah dan rekam jejak BEM, DPM, dan UKK dari masa ke masa",
      page: "sejarah"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Fitur Utama</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Website BEM Keluarga Mahasiswa Komputer menyediakan berbagai fitur untuk mendukung akademik dan menjaga silaturahmi antar mahasiswa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <button 
                  onClick={() => setCurrentPage && setCurrentPage(feature.page)}
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Pelajari
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;