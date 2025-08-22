import React from 'react';
import { Home, Search, Library, Plus, Heart, User, Briefcase, Code, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SpotifySidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const SpotifySidebar: React.FC<SpotifySidebarProps> = ({ currentView, onViewChange }) => {
  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Your Library', icon: Library }
  ];

  const portfolioItems = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code }, 
    { id: 'skills', label: 'Skills', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const recentlyPlayed = [
    'Senior Frontend Developer',
    'E-Commerce Platform', 
    'React Component Library',
    'Task Management App',
    'Data Visualization Dashboard'
  ];

  return (
    <div className="w-64 bg-background border-r flex flex-col h-full">
      {/* Logo/Brand */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">JD</span>
          </div>
          <span className="font-semibold text-lg">Portfolio</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="px-3 py-4">
        <nav className="space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`sidebar-nav-item w-full ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Portfolio Sections */}
      <div className="px-3 py-4 border-t">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Portfolio
          </h3>
          <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <nav className="space-y-1">
          {portfolioItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`sidebar-nav-item w-full ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Recently Played */}
      <div className="px-3 py-4 border-t flex-1 overflow-auto">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Recently Played
        </h3>
        
        <div className="space-y-2">
          {recentlyPlayed.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer group">
              <div className="w-10 h-10 bg-muted rounded flex items-center justify-center flex-shrink-0">
                <div className="w-5 h-5 bg-primary/30 rounded"></div>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{item}</p>
                <p className="text-xs text-muted-foreground">John Developer</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Liked Songs (Favorite Projects) */}
      <div className="px-3 py-4 border-t">
        <button
          onClick={() => onViewChange('favorites')}
          className="sidebar-nav-item w-full"
        >
          <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center">
            <Heart className="w-3 h-3 text-white" />
          </div>
          <span className="font-medium">Favorite Projects</span>
        </button>
      </div>

      {/* Download App (Download Resume) */}
      <div className="px-3 py-4 border-t">
        <Button variant="outline" className="w-full justify-start gap-3">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download Resume
        </Button>
      </div>
    </div>
  );
};

export default SpotifySidebar;