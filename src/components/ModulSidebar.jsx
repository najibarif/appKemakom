import React from 'react';
import PropTypes from 'prop-types';
import { BookOpen, CheckCircle, Circle, Lock, ChevronRight } from 'lucide-react';

const ModulSidebar = ({
  modules,
  currentModuleId,
  onModuleSelect,
  completedModules = []
}) => {
  // Check if a module is locked
  const isModuleLocked = (moduleId) => {
    if (moduleId === 1) return false; // First module is always unlocked
    const prevModule = modules.find(m => m.id === moduleId - 1);
    return prevModule ? !completedModules.includes(prevModule.id) : false;
  };
  return (
    <div className="w-72 bg-white border-r border-gray-100 h-screen overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0F4639] to-[#A6B933] rounded-xl flex items-center justify-center shadow-sm">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Modul Pembelajaran</h2>
            <p className="text-sm text-gray-500">Pemrograman Web Dasar</p>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-3">
          {modules.map((module, index) => {
            const isActive = currentModuleId === module.id;
            const isLocked = isModuleLocked(module.id) || module.locked;
            const isCompleted = completedModules.includes(module.id);

            return (
              <button
                key={module.id}
                onClick={() => !isLocked && onModuleSelect(module.id)}
                disabled={isLocked}
                className={`w-full text-left p-4 rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0F4639] to-[#A6B933] text-white shadow-md transform -translate-x-1'
                    : isLocked
                    ? 'bg-gray-50 text-gray-400 cursor-not-allowed hover:bg-gray-50'
                    : 'bg-white border border-gray-200 hover:border-[#0F4639]/30 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-white/20' : 'bg-gray-50'
                  }`}>
                    {isLocked ? (
                      <Lock className="w-4 h-4" />
                    ) : isCompleted ? (
                      <CheckCircle className={`w-4 h-4 ${isActive ? 'text-white' : 'text-green-500'}`} />
                    ) : (
                      <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-white' : 'bg-gray-300'}`}></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${
                        isActive ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        Modul {index + 1}
                      </span>
                      <span className={`text-xs ${
                        isActive ? 'text-white/80' : 'text-gray-400'
                      }`}>
                        {module.duration}
                      </span>
                    </div>
                    <h3 className={`font-medium text-sm mt-0.5 line-clamp-1 ${
                      isActive ? 'text-white' : 'text-gray-800'
                    }`}>
                      {module.title}
                    </h3>
                  </div>

                  {!isLocked && (
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? 'text-white' : 'text-gray-400'
                    }`} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress */}
      <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-[#0F4639]">
            {Math.round((modules.filter(m => m.completed).length / modules.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#0F4639] to-[#A6B933] h-2 rounded-full"
            style={{
              width: `${(modules.filter(m => m.completed).length / modules.length) * 100}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

ModulSidebar.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool,
      locked: PropTypes.bool,
      duration: PropTypes.string,
      progress: PropTypes.number
    })
  ).isRequired,
  currentModuleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onModuleSelect: PropTypes.func.isRequired,
  completedModules: PropTypes.arrayOf(PropTypes.number)
};

ModulSidebar.defaultProps = {
  modules: [],
  currentModuleId: null,
  onModuleSelect: () => {},
  completedModules: []
};

export default ModulSidebar;