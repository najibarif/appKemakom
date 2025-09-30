// App.jsx
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import ModulPage from './pages/ModulPage';
import AlumniPage from './pages/AlumniPage';
import AngkatanPage from './pages/AngkatanPage';
import SejarahPage from './pages/SejarahPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';

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
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}

function AppContent() {
  const { isAuthenticated, logout } = useAuth();
  const [, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={isAuthenticated} onLogout={logout} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/modul" element={<ModulPage />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/angkatan" element={<AngkatanPage />} />
          <Route path="/sejarah" element={<SejarahPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;