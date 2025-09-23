import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, CheckCircle, Code, FileText, HelpCircle } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ModulContentData {
  id: number;
  title: string;
  content: string;
  codeExample?: string;
  quiz?: QuizQuestion[];
}

interface ModulContentProps {
  moduleData: ModulContentData;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  progress: number;
}

const ModulContent: React.FC<ModulContentProps> = ({
  moduleData,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  progress
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'code' | 'quiz'>('content');

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const renderCodeBlock = (code: string) => {
    return (
      <div className="code-block">
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
        </pre>
      </div>
    );
  };

  const highlightCode = (code: string) => {
    return code
      .replace(/\b(function|const|let|var|if|else|for|while|return|class|import|export)\b/g, '<span class="keyword">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
      .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
      .replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-gray-900">{moduleData.title}</h1>
          <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary-dark to-primary-light h-2 rounded-full progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'content'
                ? 'border-primary-light text-primary-dark'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Materi
          </button>
          {moduleData.codeExample && (
            <button
              onClick={() => setActiveTab('code')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'code'
                  ? 'border-primary-light text-primary-dark'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Kode
            </button>
          )}
          {moduleData.quiz && (
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'quiz'
                  ? 'border-primary-light text-primary-dark'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <HelpCircle className="w-4 h-4 inline mr-2" />
              Quiz
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto p-8">
          {activeTab === 'content' && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: moduleData.content }} />
              </div>
            </div>
          )}

          {activeTab === 'code' && moduleData.codeExample && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contoh Kode</h3>
              {renderCodeBlock(moduleData.codeExample)}
            </div>
          )}

          {activeTab === 'quiz' && moduleData.quiz && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quiz Pemahaman</h3>
              <div className="space-y-6">
                {moduleData.quiz.map((question, qIndex) => (
                  <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h4 className="font-medium text-gray-900 mb-4">
                      {qIndex + 1}. {question.question}
                    </h4>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <label
                          key={oIndex}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedAnswers[question.id] === oIndex
                              ? 'bg-primary-50 border-primary-light border-2'
                              : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                          } ${
                            showResults
                              ? oIndex === question.correctAnswer
                                ? 'bg-green-50 border-green-500'
                                : selectedAnswers[question.id] === oIndex && oIndex !== question.correctAnswer
                                ? 'bg-red-50 border-red-500'
                                : ''
                              : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={oIndex}
                            checked={selectedAnswers[question.id] === oIndex}
                            onChange={() => handleAnswerSelect(question.id, oIndex)}
                            disabled={showResults}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                            selectedAnswers[question.id] === oIndex
                              ? 'border-primary-light bg-primary-light'
                              : 'border-gray-300'
                          }`}>
                            {selectedAnswers[question.id] === oIndex && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className="text-gray-700">{option}</span>
                          {showResults && oIndex === question.correctAnswer && (
                            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                
                {!showResults && (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length !== moduleData.quiz.length}
                    className="w-full bg-gradient-to-r from-primary-dark to-primary-light text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          <button
            onClick={onNext}
            disabled={!hasNext}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-primary-dark to-primary-light text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModulContent;