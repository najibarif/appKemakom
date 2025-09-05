import React from 'react';
import { Users, Calendar, Award } from 'lucide-react';
import { useAngkatan } from '../hooks/useAngkatan';

const Angkatan: React.FC = () => {
  const { data: angkatanData, isLoading, error } = useAngkatan();

  if (isLoading) {
    return (
      <section id="angkatan" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data angkatan...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="angkatan" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-red-600">Gagal memuat data angkatan</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="angkatan" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Data Angkatan</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Informasi lengkap tentang setiap angkatan mahasiswa komputer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {angkatanData?.map((angkatan, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Angkatan {angkatan.year}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Total Mahasiswa</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{angkatan.total}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-600" />
                    <span className="font-medium">Mahasiswa Aktif</span>
                  </div>
                  <span className="text-2xl font-bold text-orange-600">{angkatan.active}</span>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Prestasi:</span>
                  </div>
                  <ul className="space-y-1">
                    {angkatan.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Angkatan;