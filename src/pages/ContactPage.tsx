import React from 'react';
import Contact from '../components/Contact';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hubungi Kami
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Jangan ragu untuk menghubungi kami jika ada pertanyaan atau saran
            </p>
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default ContactPage;