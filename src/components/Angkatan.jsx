// Angkatan.jsx
import React from 'react';
import { Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { angkatanService } from '../services/angkatanService';

const Angkatan = () => {
  const { data: angkatanData, isLoading, error } = useQuery({
    queryKey: ['angkatan'],
    queryFn: angkatanService.getAll,
  });

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
      <section id="angkatan" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-600">Tidak ada data angkatan yang tersedia</p>
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
          {angkatanData.map((angkatan) => (
            <div key={angkatan.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Angkatan {angkatan.year}</h3>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-600">Total Mahasiswa: {angkatan.total}</p>
                  <p className="text-gray-600">Mahasiswa Aktif: {angkatan.active}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Prestasi</h4>
                <ul className="space-y-2">
                  {angkatan.achievements && angkatan.achievements.length > 0 ? (
                    angkatan.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{achievement}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">Belum ada prestasi</li>
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