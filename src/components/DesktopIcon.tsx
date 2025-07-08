
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useWindows } from './WindowContext';

interface DesktopIconProps {
  name: string;
  icon: LucideIcon;
  windowType: string;
  position: { x: number; y: number };
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ name, icon: Icon, windowType, position }) => {
  const { openWindow } = useWindows();

  const handleDoubleClick = () => {
    openWindow(windowType, name);
  };

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer group"
      style={{ left: position.x, top: position.y }}
      onDoubleClick={handleDoubleClick}
    >
      <div className="p-3 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-200">
        <Icon size={32} className="text-white mb-1" />
      </div>
      <span className="text-white text-sm font-medium text-center bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
        {name}
      </span>
    </div>
  );
};

export default DesktopIcon;
