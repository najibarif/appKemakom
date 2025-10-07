import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, Play, CheckCircle, Code, FileText, HelpCircle, Maximize2, Minimize2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

const ModulContent = ({
  moduleData,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  progress,
  onModuleComplete,
  isLastModule,
  showQuizButton = false,
  onShowQuiz = () => {}
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [score, setScore] = useState(0);
  const [code, setCode] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);

  // Set initial code based on module
  useEffect(() => {
    if (moduleData.codeExample) {
      setCode(moduleData.codeExample);
    }
  }, [moduleData.id]);

  // Update iframe with the current code
  const updatePreview = () => {
    if (iframeRef.current) {
      try {
        const iframe = iframeRef.current;
        // Use srcdoc instead of direct document access for security
        iframe.srcdoc = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              /* Isolated styles for preview content only */
              :root {
                --preview-bg: #ffffff;
                --preview-text: #333333;
                --preview-border: #e5e7eb;
                --preview-heading: #0F4639;
                --preview-code-bg: #f5f5f5;
                --preview-code-text: #333333;
              }
              
              /* Reset and base styles scoped to preview */
              body.preview-html {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.5;
                color: var(--preview-text);
                background-color: var(--preview-bg);
                padding: 20px;
                margin: 0;
                box-sizing: border-box;
                min-height: 100vh;
              }
              
              /* Scoped typography */
              .preview-html h1,
              .preview-html h2,
              .preview-html h3,
              .preview-html h4,
              .preview-html h5,
              .preview-html h6 {
                color: var(--preview-heading);
                font-weight: 600;
                line-height: 1.2;
                margin: 1em 0 0.5em;
              }
              
              .preview-html h1 { font-size: 2em; }
              .preview-html h2 { font-size: 1.75em; }
              .preview-html h3 { font-size: 1.5em; }
              .preview-html h4 { font-size: 1.25em; }
              .preview-html h5 { font-size: 1em; }
              .preview-html h6 { font-size: 0.875em; }
              
              /* Scoped code blocks */
              .preview-html pre {
                background: var(--preview-code-bg);
                padding: 1em;
                border-radius: 4px;
                overflow-x: auto;
                margin: 1em 0;
              }
              
              .preview-html code {
                font-family: 'Courier New', monospace;
                background: var(--preview-code-bg);
                color: var(--preview-code-text);
                padding: 0.2em 0.4em;
                border-radius: 3px;
                font-size: 0.9em;
              }
              
              /* Scoped footer */
              .preview-html footer {
                margin-top: 2em;
                padding: 1.5rem 0;
                text-align: center;
                border-top: 1px solid var(--preview-border);
                font-size: 0.9em;
                color: #6c757d;
              }
              
              /* Scoped container */
              .preview-html .container {
                max-width: 100%;
                margin: 0 auto;
                padding: 0 15px;
              }
              
              /* CSS Reset */
              html, body, div, span, h1, h2, h3, h4, h5, h6, p, blockquote, pre,
              a, code, em, img, small, strong, ol, ul, li, form, label, table, caption,
              tbody, tfoot, thead, tr, th, td {
                margin: 0;
                padding: 0;
                border: 0;
                font-size: 100%;
                font: inherit;
                vertical-align: baseline;
                box-sizing: border-box;
              }
              
              /* HTML5 display-role reset for older browsers */
              article, aside, details, figcaption, figure, 
              footer, header, hgroup, menu, nav, section {
                display: block;
              }
              
              /* Base Styles */
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.5;
                color: #333;
                background-color: #fff;
                padding: 20px;
                max-width: 100%;
                overflow-x: hidden;
                display: flex;
                flex-direction: column;
                min-height: 100vh;
              }
              
              /* Typography */
              h1, h2, h3, h4, h5, h6 { 
                color: #0F4639;
                font-weight: 600;
                line-height: 1.2;
                margin: 1em 0 0.5em;
              }
              
              h1 { font-size: 2em; }
              h2 { font-size: 1.75em; }
              h3 { font-size: 1.5em; }
              h4 { font-size: 1.25em; }
              h5 { font-size: 1em; }
              h6 { font-size: 0.875em; }
              
              /* Footer Styles */
              footer {
                margin-top: auto;
                background-color: #f8f9fa;
                padding: 1.5rem 0;
                text-align: center;
                border-top: 1px solid #e9ecef;
                font-size: 0.9em;
                color: #6c757d;
              }
              
              footer p {
                margin: 0.5rem 0;
              }
              
              /* Container for main content */
              .content-wrapper {
                flex: 1;
                width: 100%;
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
              }
              pre {
                background: #f5f5f5;
                padding: 10px;
                border-radius: 4px;
                overflow-x: auto;
              }
              code { 
                font-family: 'Courier New', monospace;
                background: #f5f5f5;
                padding: 2px 4px;
                border-radius: 3px;
              }
              pre code { 
                background: none;
                padding: 0;
              }
              .keyword { color: #0000ff; }
              .string { color: #a31515; }
              .comment { color: #008000; }
              .number { color: #098658; }
            </style>
          </head>
          <body class="preview-html">
            <div class="container">${code}</div>
          </body>
          </html>
        `;
      } catch (error) {
        console.error('Error updating preview:', error);
      }
    }
  };

  // Run code when it changes
  useEffect(() => {
    if (activeTab === 'code') {
      updatePreview();
    }
  }, [code, activeTab]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmitQuiz = () => {
    // Calculate score
    const correctAnswers = moduleData.quiz.reduce((acc, question) => {
      return acc + (selectedAnswers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
    const newScore = Math.round((correctAnswers / moduleData.quiz.length) * 100);
    setScore(newScore);
    setShowResults(true);

    // Mark module as completed if score is 70% or higher
    if (newScore >= 70) {
      onModuleComplete(moduleData.id, newScore === 100);
    }
  };

  const renderCodeBlock = (code) => {
    return (
      <div className="code-block">
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
        </pre>
      </div>
    );
  };

  const highlightCode = (code) => {
    return code
      .replace(/\b(function|const|let|var|if|else|for|while|return|class|import|export)\b/g, '<span class="keyword">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
      .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
      .replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
  };

  // Check if current module is completed
  const isModuleCompleted = moduleData.completed;

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle editor change
  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  return (
    <div className={`flex-1 flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-white overflow-hidden' : 'min-h-screen'}`}>
      <div className="bg-white border-b border-gray-200 p-4 z-50 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-[#0F4639]">{moduleData.title}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Selesai</span>
            {progress === 100 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="w-3.5 h-3.5 mr-1" />
                Selesai
              </span>
            )}
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#0F4639] to-[#A6B933] h-full rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {activeTab === 'content' && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {moduleData.content}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {activeTab === 'code' && moduleData.codeExample && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Editor Kode</h3>
                <button 
                  onClick={toggleFullscreen}
                  className="text-gray-500 hover:text-gray-700"
                  title={isFullscreen ? 'Keluar dari mode layar penuh' : 'Mode layar penuh'}
                >
                  {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px]">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600 border-b">
                    editor.js
                  </div>
                  <div className="h-[calc(100%-40px)]">
                    <Editor
                      height="100%"
                      defaultLanguage="html"
                      value={code}
                      onChange={handleEditorChange}
                      theme="vs-light"
                      options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        wordWrap: 'on',
                      }}
                    />
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600 border-b flex justify-between items-center">
                    <span>Preview</span>
                    <button 
                      onClick={updatePreview}
                      className="flex items-center gap-1 text-sm bg-[#0F4639] text-white px-3 py-1 rounded hover:bg-[#0a3329] transition-colors"
                    >
                      <Play size={14} />
                      Jalankan
                    </button>
                  </div>
                  <div className="h-[calc(100%-40px)]">
                    <iframe
                      ref={iframeRef}
                      title="code-preview"
                      className="w-full h-full border-0"
                      sandbox="allow-scripts"
                      srcDoc="<html><head><style>body { padding: 1rem; }</style></head><body><p>Kode akan muncul di sini...</p></body></html>"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Contoh Kode Awal:</h4>
                <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm">
                    <code dangerouslySetInnerHTML={{ __html: highlightCode(moduleData.codeExample) }} />
                  </pre>
                </div>
              </div>
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
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${selectedAnswers[question.id] === oIndex
                              ? 'bg-[#0F4639]/10 border-[#0F4639] border-2'
                              : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                            } ${showResults
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
                          <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${selectedAnswers[question.id] === oIndex
                              ? 'border-[#0F4639] bg-[#0F4639]'
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

                {showResults ? (
                  <div className={`text-center mt-6 p-4 rounded-lg ${
                    score === 100 
                      ? 'bg-green-50 border border-green-200' 
                      : score >= 70 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'bg-amber-50 border border-amber-200'
                  }`}>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {score === 100 ? 'Sempurna! 🎉' : score >= 70 ? 'Selamat! 🎉' : 'Coba Lagi'}
                    </h4>
                    <p className={`${score === 100 ? 'text-green-600' : score >= 70 ? 'text-blue-600' : 'text-amber-600'} font-medium`}>
                      Nilai Anda: <span className="font-bold">{score}</span>
                      {score === 100 && (
                        <span className="block mt-2 text-sm">Anda bisa melanjutkan ke modul selanjutnya!</span>
                      )}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length !== moduleData.quiz.length}
                    className="w-full bg-gradient-to-r from-[#0F4639] to-[#A6B933] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-white">
            <button
              onClick={onPrevious}
              disabled={!hasPrevious}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Sebelumnya
            </button>
            <div className="flex items-center space-x-2">
              {/* {moduleData.quiz && !showResults && (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length !== moduleData.quiz.length}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#0F4639] to-[#A6B933] border border-transparent rounded-lg shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F4639] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Quiz
                </button>
              )} */}
              {showResults && score < 70 && (
                <div className="text-red-600 text-sm font-medium">
                  Nilai minimal 70% untuk menyelesaikan modul ini
                </div>
              )}
              <button
                onClick={onNext}
                disabled={!hasNext || (moduleData.quiz && !isModuleCompleted && score < 70)}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#0F4639] to-[#A6B933] border border-transparent rounded-lg shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F4639] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLastModule ? 'Selesai' : 'Modul Selanjutnya'}
                {!isLastModule && <ChevronRight className="w-5 h-5 ml-1" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ModulContent.propTypes = {
  moduleData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    content: PropTypes.string.isRequired,
    codeExample: PropTypes.string,
    quiz: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        correctAnswer: PropTypes.number.isRequired
      })
    )
  }).isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onModuleComplete: PropTypes.func.isRequired,
  hasNext: PropTypes.bool.isRequired,
  hasPrevious: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  isLastModule: PropTypes.bool.isRequired
};

export default ModulContent;