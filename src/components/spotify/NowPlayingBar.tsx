import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Heart, Volume2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  image: string;
  logo?: string;
  isLiked?: boolean;
}

interface NowPlayingBarProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
  onLike: (id: string) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  progress: number;
  onProgressChange: (progress: number) => void;
  isShuffled: boolean;
  repeatMode: 'off' | 'all' | 'one';
}

const NowPlayingBar: React.FC<NowPlayingBarProps> = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onShuffle,
  onRepeat,
  onLike,
  volume,
  onVolumeChange,
  progress,
  onProgressChange,
  isShuffled,
  repeatMode
}) => {
  const [currentTime, setCurrentTime] = useState('0:00');
  const [totalTime, setTotalTime] = useState('0:00');

  useEffect(() => {
    if (currentTrack) {
      // Simulate time progression
      const interval = setInterval(() => {
        if (isPlaying) {
          const minutes = Math.floor(progress / 60);
          const seconds = Math.floor(progress % 60);
          setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [progress, isPlaying, currentTrack]);

  useEffect(() => {
    if (currentTrack) {
      setTotalTime(currentTrack.duration);
    }
  }, [currentTrack]);

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex items-center justify-center text-muted-foreground">
          <p>No track selected</p>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
      {/* Progress Bar */}
      <div className="w-full px-4 py-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-12">{currentTime}</span>
          <div className="flex-1">
            <Progress 
              value={progress} 
              className="h-1 cursor-pointer hover:h-1.5 transition-all duration-200"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                onProgressChange(percentage);
              }}
            />
          </div>
          <span className="w-12 text-right">{totalTime}</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        {/* Track Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="w-14 h-14 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            {currentTrack.logo ? (
              <img src={currentTrack.logo} alt={currentTrack.artist} className="w-full h-full object-cover" />
            ) : (
              <div className="w-8 h-8 bg-primary/30 rounded"></div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-medium truncate text-sm">{currentTrack.title}</h4>
            <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onLike(currentTrack.id)}
            className="w-8 h-8 flex-shrink-0"
          >
            <Heart 
              className={`w-4 h-4 ${currentTrack.isLiked ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
            />
          </Button>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onShuffle}
            className={`w-8 h-8 ${isShuffled ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Shuffle className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            className="w-8 h-8 text-muted-foreground hover:text-foreground"
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={onPlayPause}
            className="play-button w-10 h-10 rounded-full p-0 transition-all duration-200 hover:scale-105"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="w-8 h-8 text-muted-foreground hover:text-foreground"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onRepeat}
            className={`w-8 h-8 relative ${repeatMode !== 'off' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Repeat className="w-4 h-4" />
            {repeatMode === 'one' && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-bold">
                1
              </span>
            )}
          </Button>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
          
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <div className="w-24">
            <Slider
              value={[volume]}
              onValueChange={(value) => onVolumeChange(value[0])}
              max={100}
              step={1}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingBar;