
import React from 'react';
import { useWindows } from './WindowContext';
import { folder, terminal, fileText, list, navigation } from 'lucide-react';

interface StartMenuProps {
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose }) => {
  const { openWindow } = useWindows();

  const menuItems = [
    { name: 'Projects', icon: folder, type: 'projects', description: 'View my work and projects' },
    { name: 'Terminal', icon: terminal, type: 'terminal', description: 'Skills and Easter eggs' },
    { name: 'Resume', icon: fileText, type: 'resume', description: 'Professional experience' },
    { name: 'Experiences', icon: list, type: 'experiences', description: 'Career journey' },
    { name: 'About', icon: navigation, type: 'about', description: 'Learn more about me' }
  ];

  const handleItemClick = (type: string, name: string) => {
    openWindow(type, name);
    onClose();
  };

  return (
    <div className="fixed bottom-12 left-2 w-80 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-2xl z-40 animate-scale-in">
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-white text-lg font-semibold">My Personal OS</h2>
          <p className="text-gray-400 text-sm">Welcome to my digital workspace</p>
        </div>
        
        <div className="space-y-1">
          {menuItems.map(item => (
            <button
              key={item.type}
              onClick={() => handleItemClick(item.type, item.name)}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-200 text-left group"
            >
              <item.icon className="text-blue-400 group-hover:text-blue-300" size={20} />
              <div className="flex-1">
                <div className="text-white font-medium">{item.name}</div>
                <div className="text-gray-400 text-xs">{item.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
