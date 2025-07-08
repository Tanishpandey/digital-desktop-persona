
import React from 'react';
import { useWindows } from './WindowContext';

interface TaskbarProps {
  onStartClick: () => void;
  currentTime: Date;
  startMenuOpen: boolean;
}

const Taskbar: React.FC<TaskbarProps> = ({ onStartClick, currentTime, startMenuOpen }) => {
  const { windows, bringToFront, minimizeWindow } = useWindows();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-900/95 backdrop-blur-md border-t border-gray-700/50 flex items-center px-2 z-50">
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className={`px-4 py-2 rounded mr-2 font-medium transition-colors duration-200 ${
          startMenuOpen 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        Start
      </button>

      {/* Running Applications */}
      <div className="flex-1 flex items-center space-x-1">
        {windows.filter(w => !w.isMinimized).map(window => (
          <button
            key={window.id}
            onClick={() => bringToFront(window.id)}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded transition-colors duration-200 max-w-40 truncate"
          >
            {window.title}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-4 text-white text-sm">
        <div className="flex flex-col items-end">
          <div className="font-medium">{formatTime(currentTime)}</div>
          <div className="text-xs text-gray-400">{formatDate(currentTime)}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
