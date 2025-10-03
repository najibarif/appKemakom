// App.jsx
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/authService';
import HomePage from './pages/HomePage';
import ModulPage from './pages/ModulPage';
import AlumniPage from './pages/AlumniPage';
import AngkatanPage from './pages/AngkatanPage';
import SejarahPage from './pages/SejarahPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [activeItem, setActiveItem] = useState('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status when component mounts
    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      authService.setToken(response.token);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/modul" element={<ModulPage />} />
              <Route path="/alumni" element={<AlumniPage />} />
              <Route path="/angkatan" element={<AngkatanPage />} />
              <Route path="/sejarah" element={<SejarahPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route 
                path="/login" 
                element={
                  isAuthenticated ? (
                    <Navigate to="/" replace />
                  ) : (
                    <LoginPage onLogin={handleLogin} />
                  )
                } 
              />
              {/* Add more protected routes as needed */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute>
                    {/* Your admin routes/components */}
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;