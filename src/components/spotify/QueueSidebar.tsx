import React from 'react';
import { Clock, Play, Heart, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QueueItem {
  id: string;
  type: 'experience' | 'project' | 'goal' | 'achievement';
  title: string;
  subtitle: string;
  duration?: string;
  logo?: string;
  isLiked?: boolean;
  status?: 'completed' | 'in-progress' | 'planned';
}

interface QueueSidebarProps {
  isOpen: boolean;
  currentTrack: any;
  queue: QueueItem[];
  recentlyPlayed: QueueItem[];
  upcomingGoals: QueueItem[];
  onPlay: (item: QueueItem) => void;
  onLike: (id: string) => void;
  onRemoveFromQueue: (id: string) => void;
}

const QueueSidebar: React.FC<QueueSidebarProps> = ({
  isOpen,
  currentTrack,
  queue,
  recentlyPlayed,
  upcomingGoals,
  onPlay,
  onLike,
  onRemoveFromQueue
}) => {
  if (!isOpen) return null;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in-progress': return 'text-blue-500';
      case 'planned': return 'text-orange-500';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'experience': return '💼';
      case 'project': return '🚀';
      case 'goal': return '🎯';
      case 'achievement': return '🏆';
      default: return '📄';
    }
  };

  return (
    <div className="fixed right-0 top-0 bottom-0 w-80 bg-card border-l border-border z-30 overflow-y-auto animate-slide-in-right">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Queue</h2>
        
        {/* Now Playing */}
        {currentTrack && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Now playing</h3>
            <div className="bg-accent/50 rounded-lg p-3 border-l-4 border-primary">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  {currentTrack.logo ? (
                    <img src={currentTrack.logo} alt="" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span className="text-lg">{getTypeIcon('experience')}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{currentTrack.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Up */}
        {queue.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Next up</h3>
            <div className="space-y-2">
              {queue.map((item, index) => (
                <div key={item.id} className="group flex items-center gap-3 p-2 hover:bg-accent rounded-lg">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.logo ? (
                      <img src={item.logo} alt="" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <span>{getTypeIcon(item.type)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                    {item.status && (
                      <p className={`text-xs ${getStatusColor(item.status)} capitalize`}>
                        {item.status.replace('-', ' ')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onPlay(item)}
                      className="w-6 h-6"
                    >
                      <Play className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onLike(item.id)}
                      className="w-6 h-6"
                    >
                      <Heart className={`w-3 h-3 ${item.isLiked ? 'fill-primary text-primary' : ''}`} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Goals */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Upcoming Goals</h3>
          <div className="space-y-2">
            {upcomingGoals.map((goal) => (
              <div key={goal.id} className="group flex items-center gap-3 p-2 hover:bg-accent rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🎯</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{goal.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{goal.subtitle}</p>
                  <p className={`text-xs ${getStatusColor(goal.status)} capitalize`}>
                    {goal.status?.replace('-', ' ') || 'planned'}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {goal.duration}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Played */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Recently played</h3>
          <div className="space-y-2">
            {recentlyPlayed.map((item) => (
              <div key={item.id} className="group flex items-center gap-3 p-2 hover:bg-accent rounded-lg">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  {item.logo ? (
                    <img src={item.logo} alt="" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span>{getTypeIcon(item.type)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                  {item.duration && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{item.duration}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onPlay(item)}
                    className="w-6 h-6"
                  >
                    <Play className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onLike(item.id)}
                    className="w-6 h-6"
                  >
                    <Heart className={`w-3 h-3 ${item.isLiked ? 'fill-primary text-primary' : ''}`} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueSidebar;