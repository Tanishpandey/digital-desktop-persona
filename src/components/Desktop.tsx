
import React from 'react';
import DesktopIcon from './DesktopIcon';
import WindowManager from './WindowManager';
import { Folder, Terminal, FileText, List } from 'lucide-react';

const Desktop = () => {
  const desktopIcons = [
    { 
      id: 'projects',
      name: 'Projects',
      icon: Folder,
      type: 'projects',
      position: { x: 50, y: 50 }
    },
    { 
      id: 'terminal',
      name: 'Terminal',
      icon: Terminal,
      type: 'terminal',
      position: { x: 50, y: 150 }
    },
    { 
      id: 'resume',
      name: 'Resume',
      icon: FileText,
      type: 'resume',
      position: { x: 50, y: 250 }
    },
    { 
      id: 'experiences',
      name: 'Experiences',
      icon: List,
      type: 'experiences',
      position: { x: 50, y: 350 }
    }
  ];

  return (
    <div className="relative h-full w-full">
      {/* Desktop Icons */}
      {desktopIcons.map(icon => (
        <DesktopIcon
          key={icon.id}
          name={icon.name}
          icon={icon.icon}
          windowType={icon.type}
          position={icon.position}
        />
      ))}
      
      {/* Window Manager */}
      <WindowManager />
    </div>
  );
};

export default Desktop;
