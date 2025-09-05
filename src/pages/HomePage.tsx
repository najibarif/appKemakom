import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import LatestNews from '../components/LatestNews';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  return (
    <>
      <Hero setCurrentPage={setCurrentPage} />
      <Features setCurrentPage={setCurrentPage} />
      <LatestNews />
    </>
  );
};

export default HomePage;