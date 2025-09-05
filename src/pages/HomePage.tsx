// pages/HomePage.tsx
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import LatestNews from '../components/LatestNews';
import SejarahOrganisasi from '../components/SejarahOrganisasi';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-20">
      <Hero />
      <Features />
      <LatestNews />
      <SejarahOrganisasi />
    </div>
  );
};

export default HomePage;