
import React, { useRef, useState } from 'react';
import { useWindows } from './WindowContext';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  isMinimized,
  isMaximized,
  position,
  size,
  zIndex
}) => {
  const { closeWindow, minimizeWindow, maximizeWindow, bringToFront, updateWindowPosition, updateWindowSize } = useWindows();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  if (isMinimized) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.window-header')) {
      bringToFront(id);
      setIsDragging(true);
      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isMaximized) {
      const newX = e.clientX - dragOffset.x;
      const newY = Math.max(0, e.clientY - dragOffset.y);
      updateWindowPosition(id, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const windowStyle = isMaximized
    ? { top: 0, left: 0, width: '100vw', height: 'calc(100vh - 48px)' }
    : { 
        top: position.y, 
        left: position.x, 
        width: size.width, 
        height: size.height 
      };

  return (
    <div
      ref={windowRef}
      className="fixed bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden"
      style={{
        ...windowStyle,
        zIndex,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Window Header */}
      <div className="window-header bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center justify-between cursor-grab active:cursor-grabbing">
        <span className="text-white font-medium text-sm">{title}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => minimizeWindow(id)}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors"
            title="Minimize"
          />
          <button
            onClick={() => maximizeWindow(id)}
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors"
            title="Maximize"
          />
          <button
            onClick={() => closeWindow(id)}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"
            title="Close"
          />
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full overflow-auto pb-10">
        {children}
      </div>
    </div>
  );
};

export default Window;
