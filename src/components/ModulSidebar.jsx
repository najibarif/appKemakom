import React from 'react';
import PropTypes from 'prop-types';
import { BookOpen, CheckCircle, Circle, Lock } from 'lucide-react';

const ModulSidebar = ({
  modules,
  currentModuleId,
  onModuleSelect
}) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-dark to-primary-light rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Modul Pembelajaran</h2>
            <p className="text-sm text-gray-600">Pemrograman Web Dasar</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          {modules.map((module, index) => (
            <button
              key={module.id}
              onClick={() => !module.locked && onModuleSelect(module.id)}
              disabled={module.locked}
              className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                currentModuleId === module.id
                  ? 'bg-gradient-to-r from-primary-dark to-primary-light text-white shadow-lg'
                  : module.locked
                  ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {module.locked ? (
                    <Lock className="w-5 h-5" />
                  ) : module.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium opacity-75">
                      Modul {index + 1}
                    </span>
                    <span className="text-xs opacity-75">{module.duration}</span>
                  </div>
                  <h3 className="font-semibold text-sm mt-1 line-clamp-2">
                    {module.title}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

ModulSidebar.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      locked: PropTypes.bool.isRequired,
      duration: PropTypes.string.isRequired
    })
  ).isRequired,
  currentModuleId: PropTypes.number.isRequired,
  onModuleSelect: PropTypes.func.isRequired
};

export default ModulSidebar;