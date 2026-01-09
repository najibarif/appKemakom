import React from 'react';
import { Calendar, Users, Award } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { angkatanService } from '../services/angkatanService';

const Angkatan = () => {
  const { data: angkatanData, isLoading, error } = useQuery({
    queryKey: ['angkatan'],
    queryFn: angkatanService.getAll,
  });

  if (isLoading) {
    return (
      <section id="angkatan" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#0F4639] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">Memuat data angkatan...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="angkatan" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-red-500 text-2xl">!</span>
            </div>
            <p className="text-red-600 text-lg">Gagal memuat data angkatan</p>
            <p className="text-sm text-gray-500 mt-2">
              {error instanceof Error ? error.message : 'Terjadi kesalahan'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!angkatanData || angkatanData.length === 0) {
    return (
      <section id="angkatan" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Tidak ada data angkatan yang tersedia</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="angkatan" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-[#0F4639] to-[#A6B933]"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#0F4639] to-[#A6B933] text-white rounded-full text-sm font-medium mb-6 shadow-md">
            <Calendar className="w-4 h-4 mr-2" />
            Data Angkatan
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#0F4639] to-[#A6B933]">
            Generasi KEMAKOM
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Informasi lengkap tentang setiap angkatan mahasiswa komputer beserta prestasi yang telah diraih
          </p>
        </div>

        {/* Angkatan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {angkatanData.map((angkatan, index) => (
            <div 
              key={angkatan.id} 
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl p-8 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-[#0F4639] to-[#A6B933] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-display font-bold text-gray-900 mb-4 group-hover:text-[#0F4639] transition-colors duration-300">
                  Angkatan {angkatan.year}
                </h3>
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-[#0F4639] mb-1">
                      <Users className="w-5 h-5" />
                      <span className="text-2xl font-display font-bold">{angkatan.total}</span>
                    </div>
                    <p className="text-sm text-gray-600">Total</p>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-[#A6B933] mb-1">
                      <Users className="w-5 h-5" />
                      <span className="text-2xl font-display font-bold">{angkatan.active}</span>
                    </div>
                    <p className="text-sm text-gray-600">Aktif</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-[#0F4639]" />
                  <h4 className="text-lg font-display font-semibold text-gray-900">Prestasi</h4>
                </div>
                <ul className="space-y-2">
                  {angkatan.achievements && angkatan.achievements.length > 0 ? (
                    angkatan.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#0F4639] to-[#A6B933] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{achievement}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic text-sm">Belum ada prestasi</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Angkatan;