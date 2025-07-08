
import { useState, useEffect } from "react";
import Desktop from "@/components/Desktop";
import Taskbar from "@/components/Taskbar";
import StartMenu from "@/components/StartMenu";
import { WindowProvider } from "@/components/WindowContext";

const Index = () => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <WindowProvider>
      <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 relative">
        {/* Desktop Wallpaper Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            backgroundSize: '400px 400px'
          }} />
        </div>

        <Desktop />
        
        {showStartMenu && (
          <StartMenu onClose={() => setShowStartMenu(false)} />
        )}
        
        <Taskbar 
          onStartClick={() => setShowStartMenu(!showStartMenu)}
          currentTime={currentTime}
          startMenuOpen={showStartMenu}
        />
      </div>
    </WindowProvider>
  );
};

export default Index;
