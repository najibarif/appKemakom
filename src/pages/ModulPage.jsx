import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ModulSidebar from '../components/ModulSidebar';
import ModulContent from '../components/ModulContent';
import Editor from '@monaco-editor/react';
import { Code, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { moduleProgressService } from '../services/moduleProgressService';
import { learningModuleService } from '../services/learningModuleService';

const ModulPage = () => {
  const [code, setCode] = useState('');
  const iframeRef = useRef(null);
  const [currentModuleId, setCurrentModuleId] = useState(1);
  const [completedModules, setCompletedModules] = useState([]);
  const [moduleScores, setModuleScores] = useState({});
  const [activeTab, setActiveTab] = useState('content'); // 'content' or 'quiz'
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modulesData, setModulesData] = useState(null); // Data from API (null = not loaded, [] = loaded but empty)
  const [modules, setModules] = useState([]); // Transformed modules with locked/completed state
  const [moduleContent, setModuleContent] = useState({}); // Module content from API

  // Load modules from API - only once on mount
  useEffect(() => {
    let isMounted = true;
    
    const loadModules = async () => {
      try {
        const data = await learningModuleService.getAll();
        
        if (!isMounted) return; // Prevent state update if component unmounted
        
        setModulesData(data);
        
        // If no modules found, set loading to false anyway
        if (data.length === 0) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading modules:', error);
        if (!isMounted) return;
        // Fallback to empty state
        setModulesData([]); // Empty array means loaded but no data
        setLoading(false); // Set loading to false even on error
      }
    };
    
    loadModules();
    
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only fetch once

  // Memoize transformation of modulesData to avoid recalculation
  const { modulesList, contentMap } = useMemo(() => {
    if (!modulesData || modulesData.length === 0) {
      return { modulesList: [], contentMap: {} };
    }
    
    const contentMap = {};
    const modulesList = modulesData.map((module, index) => {
      contentMap[module.id] = {
        id: module.id,
        title: module.title,
        description: module.description || '',
        content: module.content || '',
        simulation_code: module.simulation_code || '',
        quiz: module.quiz || [],
      };
      
      return {
        id: module.id,
        title: module.title,
        completed: false,
        locked: index > 0, // First module unlocked, others locked
        duration: module.duration || '0 min',
      };
    });
    
    return { modulesList, contentMap };
  }, [modulesData]);

  // Update modules and moduleContent when transformation changes
  useEffect(() => {
    setModules(modulesList);
    setModuleContent(contentMap);
  }, [modulesList, contentMap]);

  // Calculate module states
  const currentModule = moduleContent[currentModuleId] || null;

  const currentIndex = modules.findIndex(m => m.id === currentModuleId);
  const completedCount = completedModules.length;
  const totalModules = modules.length;
  const progress = (completedCount / totalModules) * 100;
  const hasNext = currentIndex < modules.length - 1 && !modules[currentIndex + 1]?.locked;
  const hasPrevious = currentIndex > 0;
  const isLastModule = currentIndex === modules.length - 1;

  const handleModuleSelect = (moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    if (module && !module.locked) {
      setCurrentModuleId(moduleId);
      setActiveTab('content');
      setShowAnswers(false);
      setSelectedAnswers({});
      setQuizScore(0);
      
      // Save current module ID to backend
      moduleProgressService.updateProgress({
        current_module_id: moduleId
      }).catch(error => {
        console.error('Error saving current module:', error);
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < modules.length - 1) {
      const nextModuleIndex = currentIndex + 1;
      const nextModule = modules[nextModuleIndex];
      
      // Unlock next module if it's locked (in case user just completed current module)
      setModules(prevModules => {
        return prevModules.map((module, index) =>
          index === nextModuleIndex
            ? { ...module, locked: false }
            : module
        );
      });
      
      // Move to next module immediately
      setCurrentModuleId(nextModule.id);
      setActiveTab('content');
      setShowAnswers(false);
      setSelectedAnswers({});
      setQuizScore(0);
      
      // Save current module ID to backend
      moduleProgressService.updateProgress({
        current_module_id: nextModule.id
      }).catch(error => {
        console.error('Error saving current module:', error);
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentModuleId(modules[currentIndex - 1].id);
      setActiveTab('content');
      setShowAnswers(false);
      setSelectedAnswers({});
      setQuizScore(0);
    }
  };

  // Update preview when code changes
  const updatePreview = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = code;
    }
  }, [code]);

  // Update preview on mount and when code changes
  useEffect(() => {
    updatePreview();
  }, [updatePreview]);

  // Load progress from backend on mount (after modules are loaded)
  useEffect(() => {
    // If modulesData is null, modules haven't been loaded yet - wait
    if (modulesData === null) {
      return; // Wait for modules to load
    }
    
    // If modulesData is empty array (loaded but no data), set loading to false
    if (modulesData.length === 0 && modules.length === 0) {
      setLoading(false);
      return;
    }
    
    // If no modules loaded yet, wait
    if (modules.length === 0) {
      return; // Wait for modules to load
    }
    
    const loadProgress = async () => {
      try {
        setLoading(true);
        const progress = await moduleProgressService.getProgress();
        
        // Check if user has any progress (completed modules or saved current module)
        const hasProgress = (progress.completed_modules && progress.completed_modules.length > 0) || 
                           (progress.current_module_id && progress.current_module_id > 1) ||
                           (progress.module_scores && Object.keys(progress.module_scores).length > 0);
        
        if (hasProgress) {
          // User has existing progress
          if (progress.completed_modules) {
            setCompletedModules(progress.completed_modules);
          }
          if (progress.module_scores) {
            setModuleScores(progress.module_scores);
          }
          // Set current module ID only if it exists in loaded modules
          const validModuleId = modules.find(m => m.id === progress.current_module_id) 
            ? progress.current_module_id 
            : modules[0]?.id || 1;
          setCurrentModuleId(validModuleId);
          
          // Update modules state based on progress
          setModules(prevModules => {
            return prevModules.map((module, index) => {
              const isCompleted = progress.completed_modules?.includes(module.id) || false;
              // First module is always unlocked
              if (index === 0) {
                return { ...module, completed: isCompleted, locked: false };
              }
              // Other modules: unlocked if previous module is completed
              const prevModule = prevModules[index - 1];
              const isLocked = !prevModule?.completed;
              
              return {
                ...module,
                completed: isCompleted,
                locked: isLocked,
              };
            });
          });
        } else {
          // New user - start from first module
          const firstModuleId = modules[0]?.id || 1;
          setCurrentModuleId(firstModuleId);
          setCompletedModules([]);
          setModuleScores({});
          
          // Initialize modules: only first module is unlocked
          setModules(prevModules => {
            return prevModules.map((module, index) => {
              if (index === 0) {
                return { ...module, completed: false, locked: false };
              }
              return { ...module, completed: false, locked: true };
            });
          });
        }
      } catch (error) {
        console.error('Error loading progress:', error);
        // On error, default to first module for new user
        const firstModuleId = modules[0]?.id || 1;
        setCurrentModuleId(firstModuleId);
        setCompletedModules([]);
        setModuleScores({});
        setModules(prevModules => {
          return prevModules.map((module, index) => {
            if (index === 0) {
              return { ...module, completed: false, locked: false };
            }
            return { ...module, completed: false, locked: true };
          });
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadProgress();
  }, [modules.length]);

  // Save progress to backend whenever it changes
  useEffect(() => {
    const saveProgress = async () => {
      if (loading) return; // Don't save on initial load
      
      try {
        await moduleProgressService.updateProgress({
          completed_modules: completedModules,
          module_scores: moduleScores,
          current_module_id: currentModuleId,
        });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    };
    
    // Debounce save to avoid too many API calls
    const timeoutId = setTimeout(saveProgress, 500);
    return () => clearTimeout(timeoutId);
  }, [completedModules, moduleScores, currentModuleId, loading]);

  // Reset quiz state when module changes
  useEffect(() => {
    setShowAnswers(false);
    setSelectedAnswers({});
    setQuizScore(0);
  }, [currentModuleId]);

  // Update code when module changes
  useEffect(() => {
    if (currentModule && currentModule.simulation_code) {
      setCode(currentModule.simulation_code);
    } else {
      // Default code if no simulation_code
      setCode(`<!DOCTYPE html>
<html>
<head>
  <title>Simulasi</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Selamat Belajar!</h1>
    <p>Mulailah menulis kode HTML, CSS, dan JavaScript di sini.</p>
  </div>
</body>
</html>`);
    }
  }, [currentModuleId, currentModule]);

  const handleModuleComplete = (moduleId, isPerfectScore) => {
    if (!completedModules.includes(moduleId)) {
      const newCompletedModules = [...completedModules, moduleId];
      setCompletedModules(newCompletedModules);

      // Update modules state to mark as completed
      setModules(prevModules => {
        const updatedModules = prevModules.map(module =>
          module.id === moduleId
            ? { ...module, completed: true }
            : module
        );

        // Unlock next module if not the last one
        const currentModuleIndex = updatedModules.findIndex(m => m.id === moduleId);
        if (currentModuleIndex < updatedModules.length - 1) {
          return updatedModules.map((module, index) =>
            index === currentModuleIndex + 1
              ? { ...module, locked: false }
              : module
          );
        }
        return updatedModules;
      });

      // Store score if perfect score
      if (isPerfectScore) {
        setModuleScores(prevScores => ({
          ...prevScores,
          [moduleId]: 100
        }));
      }
    }
  };

  const handleQuizComplete = (moduleId, score) => {
    // Update the module score
    setModuleScores(prevScores => ({
      ...prevScores,
      [moduleId]: score
    }));

    // Save module score to backend
    moduleProgressService.updateModuleProgress(moduleId, {
      completed: score >= 70,
      score: score
    }).catch(error => {
      console.error('Error saving module progress:', error);
    });

    // If score is passing (e.g., 70 or higher), mark as completed
    if (score >= 70 && !completedModules.includes(moduleId)) {
      const newCompletedModules = [...completedModules, moduleId];
      setCompletedModules(newCompletedModules);

      // Update modules state to mark as completed
      setModules(prevModules => {
        const updatedModules = prevModules.map(module =>
          module.id === moduleId
            ? { ...module, completed: true }
            : module
        );

        // Unlock next module if not the last one
        const currentModuleIndex = updatedModules.findIndex(m => m.id === moduleId);
        if (currentModuleIndex < updatedModules.length - 1) {
          return updatedModules.map((module, index) =>
            index === currentModuleIndex + 1
              ? { ...module, locked: false }
              : module
          );
        }
        return updatedModules;
      });
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const checkAnswers = () => {
    if (!currentModule || !currentModule.quiz) return;

    // Calculate score
    const totalQuestions = currentModule.quiz.length;
    let correctAnswers = 0;

    currentModule.quiz.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    setQuizScore(score);

    // Show answers
    setShowAnswers(true);

    // Update module completion if score is passing
    if (score >= 70) {
      handleQuizComplete(currentModuleId, score);
    }
  };
  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0F4639] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat progress modul...</p>
        </div>
      </div>
    );
  }

  // Show message if no modules found
  if (modulesData !== null && modules.length === 0) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Belum Ada Modul</h2>
          <p className="text-gray-600 mb-4">Database modul masih kosong. Silakan tambahkan modul melalui admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <ModulSidebar
        modules={modules}
        currentModuleId={currentModuleId}
        onModuleSelect={handleModuleSelect}
        completedModules={completedModules}
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-4 flex space-x-2">
          <button
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'content'
              ? 'border-[#0F4639] text-[#0F4639] font-semibold'
              : 'border-transparent text-gray-600 hover:text-[#0F4639] hover:bg-gradient-to-r hover:from-[#0F463910] hover:to-[#A6B93310]'
              }`}
            onClick={() => setActiveTab('content')}
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Materi
            </span>
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'code'
              ? 'border-[#0F4639] text-[#0F4639] font-semibold'
              : 'border-transparent text-gray-600 hover:text-[#0F4639] hover:bg-gradient-to-r hover:from-[#0F463910] hover:to-[#A6B93310]'
              }`}
            onClick={() => setActiveTab('code')}
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Simulasi
            </span>
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'quiz'
              ? 'border-[#0F4639] text-[#0F4639] font-semibold'
              : 'border-transparent text-gray-600 hover:text-[#0F4639] hover:bg-gradient-to-r hover:from-[#0F463910] hover:to-[#A6B93310]'
              }`}
            onClick={() => setActiveTab('quiz')}
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Kuis
            </span>
          </button>
        </div>

        {activeTab === 'content' && currentModule && (
          <ModulContent
            moduleData={currentModule}
            onNext={handleNext}
            onPrevious={handlePrevious}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            progress={progress}
            onModuleComplete={handleModuleComplete}
            isLastModule={isLastModule}
            onQuizComplete={handleQuizComplete}
            showQuizButton={true}
            onShowQuiz={() => setActiveTab('quiz')}
          />
        )}
        {activeTab === 'content' && !currentModule && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-600">Modul tidak ditemukan</p>
          </div>
        )}
        {activeTab === 'quiz' && currentModule && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200">
            <div className="bg-gradient-to-r from-[#0F4639] to-[#A6B933] px-6 py-5">
              <h2 className="text-2xl font-bold text-white">Kuis: {currentModule.title}</h2>
              <p className="text-white/90 text-sm mt-1.5">Jawab pertanyaan berikut untuk menguji pemahaman Anda</p>
            </div>

            {currentModule.quiz && currentModule.quiz.length > 0 ? (
              <div className="p-6">
                <div className="space-y-6">
                  {currentModule.quiz.map((question, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gradient-to-r from-[#0F4639] to-[#A6B933] text-white flex items-center justify-center font-semibold text-base mr-4 shadow-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4 leading-relaxed">{question.question}</h3>
                          <div className="space-y-3">
                            {question.options.map((option, optIndex) => {
                              const isSelected = selectedAnswers[index] === optIndex;
                              const isCorrect = showAnswers && question.correctAnswer === optIndex;
                              const isIncorrect = showAnswers && isSelected && selectedAnswers[index] !== question.correctAnswer;

                              return (
                                <label
                                  key={optIndex}
                                  className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${isSelected
                                    ? 'border-[#0F4639] bg-gradient-to-r from-[#0F463910] to-[#A6B93310] shadow-sm'
                                    : 'border-gray-200 hover:border-[#A6B933] hover:bg-gray-50'
                                    } ${isCorrect ? '!border-green-500 bg-green-50' : ''
                                    } ${isIncorrect ? '!border-red-500 bg-red-50' : ''
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name={`question-${index}`}
                                    className="mt-1 h-4 w-4 text-[#0F4639] focus:ring-[#0F4639] border-gray-300"
                                    checked={isSelected}
                                    onChange={() => handleAnswerSelect(index, optIndex)}
                                    disabled={showAnswers}
                                  />
                                  <span className="ml-3 block text-gray-700">
                                    {option}
                                    {isCorrect && showAnswers && (
                                      <span className="ml-2 text-green-600 text-sm font-medium flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Jawaban Benar
                                      </span>
                                    )}
                                    {isIncorrect && showAnswers && (
                                      <span className="ml-2 text-red-600 text-sm font-medium flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Jawaban Salah
                                      </span>
                                    )}
                                  </span>
                                </label>
                              );
                            })}
                          </div>

                          {showAnswers && question.explanation && (
                            <div className={`mt-4 p-4 text-sm rounded-lg ${selectedAnswers[index] === question.correctAnswer
                              ? 'bg-green-50 text-green-700 border border-green-100'
                              : 'bg-red-50 text-red-700 border border-red-100'
                              }`}>
                              <p className="font-semibold flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Penjelasan:
                              </p>
                              <p className="mt-1.5 pl-6">{question.explanation}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                  <button
                    onClick={() => setActiveTab('content')}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F4639] transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Materi
                  </button>

                  {!showAnswers ? (
                    <button
                      onClick={checkAnswers}
                      disabled={Object.keys(selectedAnswers).length < currentModule.quiz.length}
                      className={`px-6 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] ${Object.keys(selectedAnswers).length < currentModule.quiz.length
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#0F4639] to-[#A6B933] hover:from-[#0F4639]/90 hover:to-[#A6B933]/90 focus:ring-[#0F4639] shadow-md hover:shadow-lg'
                        }`}
                    >
                      Periksa Jawaban
                    </button>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <div className={`px-4 py-2 rounded-lg ${quizScore >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        <span className="font-medium">Skor Anda: {quizScore}%</span>
                      </div>
                      {quizScore >= 70 ? (
                        <button
                          onClick={() => {
                            // Move to next module (handleNext will unlock and switch)
                            handleNext();
                          }}
                          className="px-5 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#0F4639] to-[#A6B933] hover:from-[#0F4639]/90 hover:to-[#A6B933]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F4639] shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2"
                        >
                          Next Module
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setShowAnswers(false);
                            setSelectedAnswers({});
                            setQuizScore(0);
                          }}
                          className="px-5 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#0F4639] to-[#A6B933] hover:from-[#0F4639]/90 hover:to-[#A6B933]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F4639] shadow-sm hover:shadow transition-all duration-200"
                        >
                          Coba Lagi
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {showAnswers && (
                  <div className={`mt-6 p-6 rounded-xl shadow-sm ${quizScore >= 70
                    ? 'bg-gradient-to-r from-green-50 to-green-100 border border-green-100'
                    : 'bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-100'
                    }`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {quizScore >= 70 ? (
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center shadow-inner">
                            <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center shadow-inner">
                            <svg className="h-6 w-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className={`text-lg font-semibold ${quizScore >= 70 ? 'text-green-800' : 'text-yellow-800'
                          }`}>
                          {quizScore >= 70
                            ? 'Selamat! 🎉 Anda berhasil melewati kuis ini.'
                            : 'Belum berhasil 😢 Skor minimal 70% untuk lulus.'
                          }
                        </h3>
                        <div className="mt-1.5">
                          <p className={`text-sm ${quizScore >= 70 ? 'text-green-700' : 'text-yellow-700'
                            }`}
                          >
                            {quizScore >= 70
                              ? 'Anda dapat melanjutkan ke modul berikutnya.'
                              : 'Silakan pelajari kembali materinya dan coba lagi.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Tidak ada kuis yang tersedia</h3>
                <p className="mt-2 text-sm text-gray-500">Modul ini belum memiliki kuis yang tersedia.</p>
                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab('content')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#0F4639] to-[#A6B933] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F4639] transition-all"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Kembali ke Konten
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'quiz' && !currentModule && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-600">Modul tidak ditemukan</p>
          </div>
        )}

        {/* Simulasi Section */}
        {activeTab === 'code' && (
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold mb-4">Simulasi Praktik</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">editor.html</span>
                  <button
                    onClick={updatePreview}
                    className="flex items-center text-sm text-emerald-600 hover:text-emerald-700"
                    title="Run Code"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Jalankan Kode
                  </button>
                </div>
                <div className="h-96">
                  <Editor
                    height="100%"
                    defaultLanguage="html"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    theme="vs-light"
                    options={{
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      fontSize: 14,
                      wordWrap: 'on',
                      automaticLayout: true,
                    }}
                  />
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden flex flex-col">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Preview</span>
                </div>
                <div className="flex-1 bg-white">
                  <iframe
                    ref={iframeRef}
                    title="Preview"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrevious}
                disabled={!hasPrevious}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F4639] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Sebelumnya
              </button>

              <button
                onClick={handleNext}
                disabled={!hasNext}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#0F4639] to-[#A6B933] border border-transparent rounded-lg shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F4639] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Selanjutnya
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulPage;
