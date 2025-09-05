import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { contactService } from '../services/contactService';

const Contact: React.FC = () => {
  const { data: contactData, isLoading, error } = useQuery({
    queryKey: ['contacts'],
    queryFn: contactService.getAll,
  });

  // Map contact types to icons
  const getIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'phone': return Phone;
      case 'address': return MapPin;
      default: return Mail;
    }
  };

  if (isLoading) {
    return (
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat informasi kontak...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-red-600">Gagal memuat informasi kontak</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactData?.map((contact, index) => {
            const Icon = getIcon(contact.type);
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{contact.title}</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{contact.info}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;