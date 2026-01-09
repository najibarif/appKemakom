import React, { useState, useEffect, useMemo } from 'react';
import { User, Camera, Save, Award, BookOpen, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { moduleProgressService } from '../services/moduleProgressService';
import { learningModuleService } from '../services/learningModuleService';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    profile_image: null,
    created_at: null,
    last_login: null,
    role: 'user'
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageKey, setImageKey] = useState(0); // Key untuk force re-render image
    const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // State for modules and progress
  const [modules, setModules] = useState([]);
  const [completedModules, setCompletedModules] = useState([]);
  const [moduleScores, setModuleScores] = useState({});
  const [profileData, setProfileData] = useState(null);

  // Load user profile and modules data
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        // Load user profile
        const profile = await authService.getProfile();
        if (!isMounted) return;
        
        setProfileData(profile);
        setUser(profile);
        
        if (profile.profile_image) {
          setPreviewImage(profile.profile_image);
        }

        // Load modules and progress in parallel
        const [modulesData, progress] = await Promise.all([
          learningModuleService.getAll(),
          moduleProgressService.getProgress()
        ]);

        if (!isMounted) return;

        setModules(modulesData || []);
        setCompletedModules(progress?.completed_modules || []);
        setModuleScores(progress?.module_scores || {});
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (authService.isAuthenticated()) {
      loadData();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Memoize progress calculations
  const { totalModules, completedCount, progressPercentage } = useMemo(() => {
    const total = modules.length;
    const completed = completedModules.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { totalModules: total, completedCount: completed, progressPercentage: percentage };
  }, [modules, completedModules]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    if (!profileImage) {
      alert('Silakan pilih foto terlebih dahulu');
      return;
    }
    
    setSaving(true);
    try {
      const response = await authService.updateProfile({
        profile_image: profileImage
      });
      
      // Update local state immediately
      if (response?.user) {
        const updatedUser = response.user;
        setUser(updatedUser);
        
        // Update preview image with cache busting
        if (updatedUser.profile_image) {
          const separator = updatedUser.profile_image.includes('?') ? '&' : '?';
          const imageUrl = `${updatedUser.profile_image}${separator}t=${Date.now()}`;
          setPreviewImage(imageUrl);
          setImageKey(prev => prev + 1);
        } else {
          setPreviewImage(null);
        }
        setProfileImage(null);
        
        // Dispatch custom event to update header
        window.dispatchEvent(new CustomEvent('profileUpdated', { detail: updatedUser }));
      }
      
      // Refetch profile data to ensure consistency
      const profile = await authService.getProfile();
      setProfileData(profile);
      setUser(profile);
      
      if (profile.profile_image) {
        const separator = profile.profile_image.includes('?') ? '&' : '?';
        setPreviewImage(`${profile.profile_image}${separator}t=${Date.now()}`);
        setImageKey(prev => prev + 1);
      }
      
      // Show success message
      alert('Foto profil berhasil diupdate!');
    } catch (error) {
      console.error('Error saving profile:', error);
      console.error('Error details:', error.response?.data); // Debug log
      alert('Gagal menyimpan profil: ' + (error.response?.data?.message || 'Terjadi kesalahan'));
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
          >
            <span>←</span> Kembali
          </button>
          <h1 className="text-3xl font-display font-bold text-gray-900">Profil Saya</h1>
          <p className="text-gray-600 mt-2">Kelola informasi profil dan lihat progress pembelajaran Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#0F4639] to-[#A6B933] flex items-center justify-center shadow-lg overflow-hidden">
                    {previewImage ? (
                      <img
                        key={`profile-img-${imageKey}`}
                        src={previewImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Error loading image:', e);
                          setPreviewImage(null);
                        }}
                      />
                    ) : (
                      <User className="w-16 h-16 text-white" />
                    )}
                  </div>
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 w-10 h-10 bg-[#0F4639] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#0A3A2E] transition-colors shadow-lg"
                  >
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <h2 className="text-xl font-display font-bold text-gray-900 mt-4">
                  {user?.name || 'User'}
                </h2>
                <p className="text-gray-600 text-sm">{user?.email || ''}</p>
              </div>

              {/* Save Button */}
              {profileImage && (
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#0F4639] to-[#A6B933] text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Menyimpan...' : 'Simpan Profil'}
                </button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
              <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Statistik</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Modul Selesai</p>
                      <p className="text-lg font-bold text-gray-900">{completedModules}/{totalModules}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Progress</p>
                      <p className="text-lg font-bold text-gray-900">{progressPercentage}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Progress & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#0F4639] to-[#A6B933] rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-gray-900">Progress Pembelajaran</h3>
                  <p className="text-sm text-gray-600">Ringkasan kemajuan Anda dalam modul pembelajaran</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Total Progress</span>
                  <span className="text-sm font-bold text-[#0F4639]">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#0F4639] to-[#A6B933] h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Module List */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 mb-3">Detail Modul</h4>
                {modules.map((module) => {
                  const moduleId = module.id;
                  const isCompleted = completedModules.includes(moduleId);
                  const score = moduleScores[moduleId] || null;

                  return (
                    <div
                      key={moduleId}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <Clock className="w-5 h-5 text-gray-600" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">Modul {moduleId}</p>
                          <p className="text-sm text-gray-600">{module.title}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {isCompleted && score !== null ? (
                          <span className="text-sm font-semibold text-green-600">{score}%</span>
                        ) : (
                          <span className="text-sm text-gray-400">Belum selesai</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View Modules Button */}
              <div className="mt-6">
                <button
                  onClick={() => navigate('/modul')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#0F4639] to-[#A6B933] text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <BookOpen className="w-4 h-4" />
                  Lanjutkan Belajar
                </button>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-6">Informasi Akun</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

