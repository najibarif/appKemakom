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
import UserProfilePage from './pages/UserProfilePage';
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
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Check authentication status when component mounts
    const loadUserProfile = async () => {
      if (authService.isAuthenticated()) {
        try {
          const profile = await authService.getProfile();
          setUserProfile(profile);
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      }
      setLoading(false);
    };
    loadUserProfile();

    // Listen for profile update events
    const handleProfileUpdate = (event) => {
      setUserProfile(event.detail);
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, [isAuthenticated]);

  const handleLogin = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      authService.setToken(response.token);
      setIsAuthenticated(true);
      // Set user profile from login response
      if (response.user) {
        setUserProfile(response.user);
      }
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
      // Redirect to home after logout
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local state even if API call fails
      setIsAuthenticated(false);
      window.location.href = '/';
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header 
            isAuthenticated={isAuthenticated} 
            onLogout={handleLogout} 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            userProfile={userProfile}
          />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route 
                path="/modul" 
                element={
                  <ProtectedRoute>
                    <ModulPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/alumni" 
                element={
                  <ProtectedRoute>
                    <AlumniPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/angkatan" 
                element={
                  <ProtectedRoute>
                    <AngkatanPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/sejarah" 
                element={
                  <ProtectedRoute>
                    <SejarahPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <UserProfilePage />
                  </ProtectedRoute>
                } 
              />
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
            </Routes>
          </main>
          <Footer setCurrentPage={setCurrentPage} />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;