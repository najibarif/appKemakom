import React from 'react';
import { Calendar, Eye, Edit3 } from 'lucide-react';

interface NewsCardProps {
  title: string;
  content: string;
  image: string;
  date: string;
  views: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, content, image, date, views }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-video bg-gray-200 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {content}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-gray-500">
            <Calendar className="w-3 h-3" />
            <span className="text-xs">{date}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Eye className="w-3 h-3" />
            <span className="text-xs">{views}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="flex-1 bg-green-500 text-white py-1.5 px-3 rounded text-xs font-medium hover:bg-green-600 transition-colors">
            Detail Berita
          </button>
          <button className="bg-gray-100 text-gray-600 py-1.5 px-3 rounded text-xs font-medium hover:bg-gray-200 transition-colors">
            Edit Berita
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;