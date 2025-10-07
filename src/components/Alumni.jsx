import React from 'react';
import { GraduationCap, Briefcase, MapPin, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { alumniService } from '../services/alumniService';

const Alumni = () => {
  const { data: alumniData, isLoading, error } = useQuery({
    queryKey: ['alumni'],
    queryFn: alumniService.getAll, // ← ubah dari getAlumni ke getAll
  });
  

  if (isLoading) {
    return (
      <section id="alumni" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data alumni...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="alumni" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-red-600">Gagal memuat data alumni</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="alumni" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Database Alumni</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Data alumni lengkap beserta informasi tempat magang, skripsi, dan karir
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {alumniData?.map((alumni, index) => (
            <div key={index} className="bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{alumni.name}</h3>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Lulus {alumni.year}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <Briefcase className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{alumni.position} di {alumni.company}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{alumni.location}</span>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Judul Skripsi:</h4>
                  <p className="text-sm text-gray-600 italic">{alumni.thesis}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Alumni;