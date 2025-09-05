import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ModulPage from './pages/ModulPage';
import AlumniPage from './pages/AlumniPage';
import AngkatanPage from './pages/AngkatanPage';
import SejarahPage from './pages/SejarahPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './hooks/useAuth';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { isAuthenticated, logout } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'modul':
        return <ModulPage />;
      case 'alumni':
        return <AlumniPage />;
      case 'angkatan':
        return <AngkatanPage />;
      case 'sejarah':
        return <SejarahPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  // Special layout for login page - no header/footer
  if (currentPage === 'login') {
    return (
      <div className="min-h-screen">
        <LoginPage setCurrentPage={setCurrentPage} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isLoggedIn={isAuthenticated}
        onLogout={logout}
      />
      {renderPage()}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;