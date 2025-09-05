import React from 'react';
import { Calendar, Users, Award, Building } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { timelineService } from '../services/timelineService';

const SejarahOrganisasi: React.FC = () => {
  const { data: timelineData, isLoading, error } = useQuery({
    queryKey: ['timeline'],
    queryFn: timelineService.getAll,
  });

  // Map icon names to components
  const getIcon = (iconName: string) => {
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
      <section id="sejarah" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat sejarah organisasi...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="sejarah" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-red-600">Gagal memuat sejarah organisasi</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sejarah" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Sejarah Organisasi</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sejarah dan rekam jejak BEM, DPM, dan UKK dari masa ke masa
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-200"></div>
          
          <div className="space-y-12">
            {timelineData?.map((item, index) => {
              const Icon = getIcon(item.icon);
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                      <div className={`flex items-center gap-3 mb-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
                        <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-green-600">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">#Juara #SinarhAksi</h3>
            <p className="text-green-100 text-lg">
              Motto KEMAKOM yang menginspirasi setiap generasi untuk berprestasi dan berkontribusi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SejarahOrganisasi;