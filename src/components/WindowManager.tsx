
import React from 'react';
import { useWindows } from './WindowContext';
import Window from './Window';
import ProjectsContent from './windows/ProjectsContent';
import TerminalContent from './windows/TerminalContent';
import ResumeContent from './windows/ResumeContent';
import ExperiencesContent from './windows/ExperiencesContent';
import AboutContent from './windows/AboutContent';

const WindowManager = () => {
  const { windows } = useWindows();

  const getWindowContent = (type: string) => {
    switch (type) {
      case 'projects':
        return <ProjectsContent />;
      case 'terminal':
        return <TerminalContent />;
      case 'resume':
        return <ResumeContent />;
      case 'experiences':
        return <ExperiencesContent />;
      case 'about':
        return <AboutContent />;
      default:
        return <div className="p-4 text-white">Unknown window type</div>;
    }
  };

  return (
    <>
      {windows.map(window => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          isMinimized={window.isMinimized}
          isMaximized={window.isMaximized}
          position={window.position}
          size={window.size}
          zIndex={window.zIndex}
        >
          {getWindowContent(window.type)}
        </Window>
      ))}
    </>
  );
};

export default WindowManager;
