import React from 'react';
import { BookOpen, Download, Eye, Calendar } from 'lucide-react';
import { useModul } from '../hooks/useModul';

const ModulPage: React.FC = () => {
  const { data: modulData, isLoading, error } = useModul();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Modul Pembelajaran
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Kumpulan modul pembelajaran untuk berbagai mata kuliah program studi komputer
              </p>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat modul pembelajaran...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Modul Pembelajaran
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Kumpulan modul pembelajaran untuk berbagai mata kuliah program studi komputer
              </p>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <p className="text-red-600">Gagal memuat modul pembelajaran</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Modul Pembelajaran
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Kumpulan modul pembelajaran untuk berbagai mata kuliah program studi komputer
            </p>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modulData?.map((modul, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-sm text-green-600 font-semibold">{modul.category}</span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs">{modul.date}</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{modul.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{modul.description}</p>
                
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{modul.downloads} downloads</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{modul.views} views</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="bg-gray-100 text-gray-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModulPage;