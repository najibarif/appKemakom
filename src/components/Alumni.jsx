import React from 'react';
import { GraduationCap, Briefcase, MapPin, Calendar } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { alumniService } from '../services/alumniService';

const Alumni = () => {
  const queryClient = useQueryClient();
  const { data: alumniData, isLoading, error } = useQuery({
    queryKey: ['alumni'],
    queryFn: alumniService.getAll,
    initialData: () => {
      // prefer react-query cache, then sessionStorage fallback
      const cached = queryClient.getQueryData(['alumni']);
      if (cached) return cached;
      const pref = sessionStorage.getItem('prefetched_alumni');
      try {
        return pref ? JSON.parse(pref) : undefined;
      } catch (e) {
        return undefined;
      }
    }
  });

  if (isLoading) {
    // Non-blocking skeleton grid for perceived faster load
    return (
      <section id="alumni" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#0F4639] to-[#A6B933] text-white rounded-full text-sm font-medium mb-6 shadow-md">
              <GraduationCap className="w-4 h-4 mr-2" />
              Database Alumni
            </div>
            <div className="h-8 w-2/5 bg-gray-200 rounded-md mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="group bg-white rounded-2xl shadow-md p-8 animate-pulse">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-xl" />
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="alumni" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-red-500 text-2xl">!</span>
            </div>
            <p className="text-red-600 text-lg">Gagal memuat data alumni</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="alumni" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#0F4639] to-[#A6B933] rounded-full blur-3xl opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-[#0F4639] to-[#A6B933] rounded-full blur-3xl opacity-5"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#0F4639] to-[#A6B933] text-white rounded-full text-sm font-medium mb-6 shadow-md">
            <GraduationCap className="w-4 h-4 mr-2" />
            Database Alumni
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Alumni KEMAKOM
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0F4639] to-[#A6B933]">
              Berprestasi & Berkarya
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Data alumni lengkap beserta informasi tempat magang, skripsi, dan karir untuk membantu networking dan inspirasi mahasiswa
          </p>
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {alumniData?.map((alumni, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl p-8 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#0F4639] to-[#A6B933] rounded-xl flex items-center justify-center shadow-md">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-1 group-hover:text-[#0F4639] transition-colors duration-300">
                    {alumni.name}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Lulus {alumni.year}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-gray-700">
                  <Briefcase className="w-5 h-5 text-[#0F4639] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{alumni.position}</p>
                    <p className="text-sm text-gray-600">{alumni.company}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-[#0F4639] flex-shrink-0" />
                  <span className="text-sm">{alumni.location}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Judul Skripsi:</h4>
                  <p className="text-sm text-gray-600 italic leading-relaxed">{alumni.thesis}</p>
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