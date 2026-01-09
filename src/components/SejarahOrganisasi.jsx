import React from 'react';
import { Calendar, Users, Award, Building, History } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { timelineService } from '../services/timelineService';

const SejarahOrganisasi = () => {
  const { data: timelineData, isLoading, error } = useQuery({
    queryKey: ['timeline'],
    queryFn: timelineService.getAll,
  });

  // Map icon names to components
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'building': return Building;
      case 'users': return Users;
      case 'award': return Award;
      case 'calendar': return Calendar;
      default: return Building;
    }
  };

  if (isLoading) {
    return (
      <section id="sejarah" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#0F4639] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">Memuat sejarah organisasi...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="sejarah" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-red-500 text-2xl">!</span>
            </div>
            <p className="text-red-600 text-lg">Gagal memuat sejarah organisasi</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sejarah" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#0F4639] to-[#A6B933] rounded-full blur-3xl opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-[#0F4639] to-[#A6B933] rounded-full blur-3xl opacity-5"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#0F4639] to-[#A6B933] text-white rounded-full text-sm font-medium mb-6 shadow-md">
            <History className="w-4 h-4 mr-2" />
            Sejarah Organisasi
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Rekam Jejak
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0F4639] to-[#A6B933]">
              KEMAKOM dari Masa ke Masa
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sejarah dan rekam jejak BEM, DPM, dan UKK dari masa ke masa yang menginspirasi generasi mendatang
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#0F4639]/30 to-[#A6B933]/30 hidden md:block"></div>
          
          <div className="space-y-12">
            {timelineData?.map((item, index) => {
              const Icon = getIcon(item.icon);
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index} 
                  className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl p-8 hover:-translate-y-2 transition-all duration-300">
                      <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end justify-start' : 'justify-start'}`}>
                        <div className="w-12 h-12 bg-gradient-to-r from-[#0F4639] to-[#A6B933] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-3xl font-display font-bold bg-gradient-to-r from-[#0F4639] to-[#A6B933] bg-clip-text text-transparent">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-gray-900 mb-3 group-hover:text-[#0F4639] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block relative z-10">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#0F4639] to-[#A6B933] rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="hidden md:block w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motto Section */}
        <div className="mt-20 text-center animate-fade-in-up">
          <div className="bg-gradient-to-r from-[#0F4639] to-[#A6B933] text-white p-12 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-display font-bold mb-4">#KemakomJuara #TumbuhAsa</h3>
            <p className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto">
              Motto KEMAKOM yang menginspirasi setiap generasi untuk berprestasi dan berkontribusi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SejarahOrganisasi;
