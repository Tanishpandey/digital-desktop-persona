
import React, { createContext, useContext, useState } from 'react';

interface Window {
  id: string;
  type: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

interface WindowContextType {
  windows: Window[];
  openWindow: (type: string, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  bringToFront: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const useWindows = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindows must be used within a WindowProvider');
  }
  return context;
};

export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [highestZIndex, setHighestZIndex] = useState(1000);

  const openWindow = (type: string, title: string) => {
    const existingWindow = windows.find(w => w.type === type);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      return;
    }

    const newWindow: Window = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title,
      isMinimized: false,
      isMaximized: false,
      position: { x: Math.random() * 200 + 100, y: Math.random() * 100 + 100 },
      size: { width: 800, height: 600 },
      zIndex: highestZIndex + 1
    };

    setWindows(prev => [...prev, newWindow]);
    setHighestZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const bringToFront = (id: string) => {
    const newZIndex = highestZIndex + 1;
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: newZIndex } : w
    ));
    setHighestZIndex(newZIndex);
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, position } : w
    ));
  };

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, size } : w
    ));
  };

  return (
    <WindowContext.Provider value={{
      windows,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      bringToFront,
      updateWindowPosition,
      updateWindowSize
    }}>
      {children}
    </WindowContext.Provider>
  );
};
