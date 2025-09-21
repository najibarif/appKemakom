import React from 'react';
import { Calendar, Eye, ArrowRight, Clock, User } from 'lucide-react';
import { useNews } from '../hooks/useNews';

const LatestNews: React.FC = () => {
  const { data: newsData, isLoading, error } = useNews();

  if (isLoading) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-light border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">Memuat berita terkini...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-red-500 text-2xl">!</span>
            </div>
            <p className="text-red-600 text-lg">Gagal memuat berita</p>
          </div>
        </div>
      </section>
    );
  }

  const latestNews = newsData?.slice(0, 3) || [];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-soft rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-soft rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium mb-6">
            <Calendar className="w-4 h-4 mr-2" />
            Berita Terkini
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Update Terbaru dari
            <span className="block text-transparent bg-clip-text bg-gradient-primary">
              BEM KEMAKOM
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ikuti perkembangan terbaru kegiatan, prestasi, dan program kerja BEM Keluarga Mahasiswa Komputer
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {latestNews.map((item, index) => (
            <article 
              key={index} 
              className="group bg-white rounded-2xl shadow-soft hover:shadow-strong overflow-hidden hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-video bg-gradient-primary overflow-hidden relative">
                <img 
                  src={`https://images.pexels.com/photos/${1000000 + index}/pexels-photo-${1000000 + index}.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 text-primary-dark text-xs font-semibold rounded-full backdrop-blur-sm">
                    Berita
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(item.date).toLocaleDateString('id-ID', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{item.views}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4 group-hover:text-primary-dark transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                  {item.content.substring(0, 120)}...
                </p>

                {/* Read More */}
                <button className="group/btn inline-flex items-center text-primary-dark font-semibold hover:text-primary-light transition-colors duration-300">
                  Baca Selengkapnya
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center animate-fade-in-up">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-primary text-white font-semibold text-lg rounded-xl hover:bg-gradient-primary-hover transform hover:scale-105 transition-all duration-300 shadow-primary">
            Lihat Semua Berita
            <ArrowRight className="ml-3 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;