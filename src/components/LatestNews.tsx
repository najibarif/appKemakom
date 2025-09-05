import React from 'react';
import { Calendar, Trophy, Handshake } from 'lucide-react';
import { useNews } from '../hooks/useNews';

const LatestNews: React.FC = () => {
  const { data: newsData, isLoading, error } = useNews();

  // Map icons for display
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'calendar': return Calendar;
      case 'trophy': return Trophy;
      case 'handshake': return Handshake;
      default: return Calendar;
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat berita terkini...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-red-600">Gagal memuat berita</p>
          </div>
        </div>
      </section>
    );
  }

  // Take only the latest 3 news items
  const latestNews = newsData?.slice(0, 3) || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Berita Terkini</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((item, index) => {
            const Icon = getIcon('calendar'); // Default icon for now
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{item.content}</p>
                <a 
                  href="#"
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Selengkapnya
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;