import React, { useState, useEffect } from 'react';
import { Play, Pause, Heart, MoreHorizontal, Clock, Calendar, MapPin, Mail, ExternalLink, X, Search, Shuffle, SkipForward, SkipBack, Repeat, Volume2, Download, Share, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import SpotifySidebar from './spotify/SpotifySidebar';
import SearchOverlay from './spotify/SearchOverlay';
import NowPlayingBar from './spotify/NowPlayingBar';
import QueueSidebar from './spotify/QueueSidebar';
import { resumeData } from '@/data/resumeData';
import type { Track, Project, Skill, QueueItem } from '@/data/resumeData';

// Interfaces imported from resumeData

const SpotifyPortfolio = () => {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [overlayData, setOverlayData] = useState<{ track: Track | Project; type: 'experience' | 'project' } | null>(null);
  
  // Enhanced state management
  const [searchOpen, setSearchOpen] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [volume, setVolume] = useState(75);
  const [progress, setProgress] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set());
  const [themeIntensity, setThemeIntensity] = useState(75);

  // Data from centralized source
  const experienceTracks = resumeData.experience;
  const projects = resumeData.projects;
  const skills = resumeData.skills;
  const recentlyPlayed = resumeData.recentlyPlayed;
  const upcomingGoals = resumeData.upcomingGoals;

  // Initialize queue and liked tracks
  useEffect(() => {
    setQueue([
      ...experienceTracks.slice(1).map(exp => ({
        id: exp.id,
        type: 'experience' as const,
        title: exp.title,
        subtitle: exp.artist,
        duration: exp.duration,
        logo: exp.logo,
        isLiked: exp.isLiked,
        status: 'completed' as const
      })),
      ...projects.map(proj => ({
        id: proj.id,
        type: 'project' as const,
        title: proj.name,
        subtitle: proj.description,
        logo: proj.logo,
        isLiked: proj.isFavorited,
        status: 'completed' as const
      }))
    ]);

    // Initialize liked tracks
    const initialLiked = new Set<string>();
    experienceTracks.forEach(track => {
      if (track.isLiked) initialLiked.add(track.id);
    });
    projects.forEach(project => {
      if (project.isFavorited) initialLiked.add(project.id);
    });
    setLikedTracks(initialLiked);
  }, []);

  // Theme intensity effect
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-opacity', (themeIntensity / 100).toString());
  }, [themeIntensity]);

  // Progress simulation for current track
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 0.5;
          return newProgress >= 100 ? 0 : newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  // Enhanced functionality handlers
  const handlePlay = (track?: Track, item?: Project) => {
    if (track) {
      setCurrentTrack(track);
      setIsPlaying(true);
      setOverlayData({ track, type: 'experience' });
      setCurrentTrackIndex(experienceTracks.findIndex(t => t.id === track.id));
    } else if (item) {
      setOverlayData({ track: item, type: 'project' });
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (experienceTracks.length === 0) return;
    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= experienceTracks.length) {
      nextIndex = repeatMode === 'all' ? 0 : currentTrackIndex;
    }
    if (nextIndex !== currentTrackIndex) {
      setCurrentTrackIndex(nextIndex);
      setCurrentTrack(experienceTracks[nextIndex]);
      setProgress(0);
    }
  };

  const handlePrevious = () => {
    if (experienceTracks.length === 0) return;
    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) {
      prevIndex = repeatMode === 'all' ? experienceTracks.length - 1 : 0;
    }
    setCurrentTrackIndex(prevIndex);
    setCurrentTrack(experienceTracks[prevIndex]);
    setProgress(0);
  };

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
    toast({
      title: isShuffled ? "Shuffle off" : "Shuffle on",
      description: isShuffled ? "Playing in order" : "Playing randomly"
    });
  };

  const handleRepeat = () => {
    const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
    toast({
      title: `Repeat ${nextMode}`,
      description: nextMode === 'off' ? "Not repeating" : nextMode === 'all' ? "Repeating playlist" : "Repeating current track"
    });
  };

  const handleLike = (id: string) => {
    const newLiked = new Set(likedTracks);
    if (newLiked.has(id)) {
      newLiked.delete(id);
      toast({ title: "Removed from liked", description: "Track removed from your favorites" });
    } else {
      newLiked.add(id);
      toast({ title: "Added to liked", description: "Track added to your favorites" });
    }
    setLikedTracks(newLiked);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setThemeIntensity(newVolume); // Volume controls theme intensity
  };

  const handleDownloadResume = () => {
    toast({
      title: "Resume Downloaded",
      description: "Your resume has been downloaded successfully"
    });
    // In a real app, this would trigger an actual download
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Portfolio link copied to clipboard"
    });
  };

  const handleSearchResultClick = (result: any) => {
    if (result.type === 'experience') {
      const track = experienceTracks.find(t => t.id === result.id);
      if (track) handlePlay(track);
    } else if (result.type === 'project') {
      const project = projects.find(p => p.id === result.id);
      if (project) handlePlay(undefined, project);
    }
    setCurrentView(result.type === 'skill' ? 'skills' : result.type);
  };

  const handleQueuePlay = (item: QueueItem) => {
    if (item.type === 'experience') {
      const track = experienceTracks.find(t => t.id === item.id);
      if (track) handlePlay(track);
    }
  };

  const closeOverlay = () => {
    setOverlayData(null);
  };

  const renderHome = () => (
    <div className="p-6 space-y-8">
      {/* Good Morning Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}
        </h1>
        <p className="text-muted-foreground">Ready to explore my professional journey?</p>
      </div>

      {/* Currently Playing */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
            <div>
              <p className="text-sm opacity-90">Currently Playing</p>
              <h3 className="text-xl font-semibold">Software Engineer Intern</h3>
              <p className="opacity-90">at Genesys</p>
            </div>
          </div>
          <Button
            onClick={() => handlePlay(experienceTracks[0])}
            className="play-button bg-white/20 hover:bg-white/30 text-white border-0 w-12 h-12 rounded-full p-0 transition-all duration-200 hover:scale-110"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </Button>
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Experience', view: 'experience' },
            { name: 'Projects', view: 'projects' },
            { name: 'Skills', view: 'skills' },
            { name: 'Education', view: 'education' },
            { name: 'Contact', view: 'contact' }
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentView(item.view)}
              className="spotify-card group p-4 rounded-lg text-left"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg mb-3 flex items-center justify-center">
                <div className="w-6 h-6 bg-primary rounded"></div>
              </div>
              <p className="font-medium">{item.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.slice(0, 4).map((project) => (
            <div key={project.id} className="spotify-card group rounded-lg p-4 relative">
              <div className="w-full aspect-square bg-muted rounded-lg mb-3 relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary/30 rounded"></div>
                </div>
                <div className="play-overlay absolute bottom-2 right-2">
                  <Button 
                    onClick={() => handlePlay(undefined, project)}
                    className="play-button w-12 h-12 rounded-full p-0 transition-all duration-200 hover:scale-110"
                  >
                    <Play className="w-5 h-5 ml-0.5" />
                  </Button>
                </div>
              </div>
              <h3 className="font-medium mb-1 truncate">{project.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{project.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{project.tech}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Experience</h1>
          <p className="text-muted-foreground">My professional journey • {experienceTracks.length} positions</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-[2fr_1fr_1fr_60px] gap-4 px-4 py-2 text-sm text-muted-foreground border-b">
          <span>Position</span>
          <span>Company</span>
          <span>Duration</span>
          <Clock className="w-4 h-4" />
        </div>
        
        {experienceTracks.map((track, index) => (
          <div
            key={track.id}
            className="spotify-card group grid grid-cols-[2fr_1fr_1fr_60px] gap-4 p-4 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Button
                onClick={() => handlePlay(track)}
                className="play-button opacity-0 group-hover:opacity-100 w-10 h-10 rounded-full p-0 transition-all duration-200 hover:scale-110"
              >
                {currentTrack?.id === track.id && isPlaying ? 
                  <Pause className="w-4 h-4" /> : 
                  <Play className="w-4 h-4 ml-0.5" />
                }
              </Button>
              <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                <div className="w-6 h-6 bg-primary/30 rounded"></div>
              </div>
              <div>
                <p className="font-medium">{track.title}</p>
                {track.description && (
                  <p className="text-sm text-muted-foreground truncate max-w-md">{track.description}</p>
                )}
              </div>
            </div>
            <span className="flex items-center text-muted-foreground">{track.artist}</span>
            <span className="flex items-center text-muted-foreground">{track.album}</span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(track.id);
                }}
                className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart className={`w-4 h-4 ${likedTracks.has(track.id) ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
              </Button>
              <span className="text-muted-foreground text-sm">{track.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
          <ExternalLink className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Made by Tanish Pandey • {projects.length} projects</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="spotify-card group rounded-lg p-4 relative">
            <div className="w-full aspect-square bg-muted rounded-lg mb-4 relative overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/30 rounded"></div>
              </div>
              <div className="play-overlay absolute bottom-4 right-4">
                <Button 
                  onClick={() => handlePlay(undefined, project)}
                  className="play-button w-12 h-12 rounded-full p-0 shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <Play className="w-5 h-5 ml-0.5" />
                </Button>
              </div>
            </div>
            <h3 className="font-semibold mb-2">{project.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
            <p className="text-xs text-muted-foreground">{project.tech}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-muted-foreground">Technical proficiency levels</p>
        </div>
      </div>

      {/* Skills Controls */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant={isShuffled ? "default" : "outline"}
          onClick={handleShuffle}
          size="sm"
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Shuffle Skills
        </Button>
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4" />
          <span className="text-sm">Theme Intensity</span>
        </div>
      </div>

      <div className="grid gap-8">
        {['Languages', 'Frameworks', 'Cloud', 'Databases', 'Tools'].map((category) => (
          <div key={category}>
            <h2 className="text-xl font-semibold mb-4">{category}</h2>
            <div className="space-y-4">
              {skills.filter(skill => skill.category === category).map((skill) => (
                <div key={skill.name} className="spotify-card group p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-primary/30 rounded"></div>
                      </div>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleLike(skill.name)}
                        className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className={`w-4 h-4 ${skill.isFavorited ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                      </Button>
                      <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                    </div>
                  </div>
                  <Progress value={skill.proficiency} className="skill-progress h-2" />
                  {skill.yearsExperience && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {skill.yearsExperience} years experience
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Education</h1>
          <p className="text-muted-foreground">Academic background and achievements</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Main Education */}
        <div className="spotify-card group p-6 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">PSU</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Bachelor of Science in Computer Science, Mathematics</h3>
              <p className="text-lg text-muted-foreground mb-2">Penn State University</p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Expected Graduation</p>
                  <p className="font-medium">December 2026</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GPA</p>
                  <p className="font-medium">3.70/4.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coursework */}
        <div className="spotify-card group p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Relevant Coursework</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Data Structures and Algorithms',
              'Object-Oriented Programming', 
              'Machine Learning',
              'AWS and Big Data'
            ].map((course) => (
              <div key={course} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>{course}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="spotify-card group p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Academic Focus</h3>
            <p className="text-muted-foreground leading-relaxed">
              Dual major in Computer Science and Mathematics, with emphasis on software engineering, 
              data structures, and machine learning applications.
            </p>
          </div>
          <div className="spotify-card group p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Research Interests</h3>
            <p className="text-muted-foreground leading-relaxed">
              Big data analytics, AI/ML applications, cloud computing, and scalable system architecture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Contact</h1>
          <p className="text-muted-foreground">Let's connect and build something amazing</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="spotify-card group p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>tanishpandey3@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>University Park, PA</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>814-441-1723</span>
              </div>
            </div>
          </div>

          <div className="spotify-card group p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <div className="space-y-3">
              {[
                { name: 'GitHub', url: 'github.com/tanishpandey' },
                { name: 'LinkedIn', url: 'linkedin.com/in/tanishpandey' },
                { name: 'Phone', url: '814-441-1723' }
              ].map((link) => (
                <div key={link.name} className="flex items-center justify-between">
                  <span>{link.name}</span>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="spotify-card group p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">About Me</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Computer Science student at Penn State University with hands-on experience in software engineering 
            at top companies like Genesys and Bloomberg. Passionate about building scalable systems, AI applications, 
            and solving complex problems with modern technologies.
          </p>
          <Button className="w-full" onClick={handleDownloadResume}>
            <Download className="w-4 h-4 mr-2" />
            Download Resume
          </Button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'experience':
        return renderExperience();
      case 'projects':
        return renderProjects();
      case 'skills':
        return renderSkills();
      case 'education':
        return renderEducation();
      case 'contact':
        return renderContact();
      default:
        return renderHome();
    }
  };

  return (
    <div className="h-screen bg-background text-foreground flex dark">
      <SpotifySidebar currentView={currentView} onViewChange={setCurrentView} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="h-16 bg-card/50 backdrop-blur-sm border-b flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="rounded-full" onClick={handlePrevious}>
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full" onClick={handleNext}>
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <Button
              variant="outline"
              onClick={() => setSearchOpen(true)}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <Search className="w-4 h-4 mr-2" />
              Search experience, skills, projects...
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleDownloadResume}
              className="w-8 h-8"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleShare}
              className="w-8 h-8"
            >
              <Share className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setQueueOpen(!queueOpen)}
              className="w-8 h-8"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-semibold">TP</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <main className={`flex-1 overflow-auto custom-scrollbar transition-all duration-300 ${queueOpen ? 'mr-80' : ''} ${currentTrack ? 'pb-24' : ''}`}>
          {renderContent()}
        </main>
      </div>

      {/* Enhanced Components */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        data={{
          experience: experienceTracks,
          projects: projects,
          skills: skills,
          education: resumeData.education
        }}
        onResultClick={handleSearchResultClick}
      />

      <QueueSidebar
        isOpen={queueOpen}
        currentTrack={currentTrack}
        queue={queue}
        recentlyPlayed={recentlyPlayed}
        upcomingGoals={upcomingGoals}
        onPlay={handleQueuePlay}
        onLike={handleLike}
        onRemoveFromQueue={(id) => setQueue(prev => prev.filter(item => item.id !== id))}
      />

      <NowPlayingBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onShuffle={handleShuffle}
        onRepeat={handleRepeat}
        onLike={handleLike}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        progress={progress}
        onProgressChange={setProgress}
        isShuffled={isShuffled}
        repeatMode={repeatMode}
      />

      {/* Details Overlay */}
      {overlayData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-card border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto animate-scale-in">
            <div className="sticky top-0 bg-card border-b p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary/30 rounded"></div>
                </div>
                <div>
                  <h3 className="font-semibold">
                    {overlayData.type === 'experience' ? 
                      (overlayData.track as Track).title : 
                      (overlayData.track as Project).name
                    }
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {overlayData.type === 'experience' ? 
                      (overlayData.track as Track).artist : 
                      (overlayData.track as Project).description
                    }
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={closeOverlay}
                className="w-8 h-8 p-0 hover:bg-destructive/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Key Achievements & Responsibilities
              </h4>
              
              <div className="space-y-3">
                {overlayData.track.bullets?.map((bullet, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm leading-relaxed">{bullet}</span>
                  </div>
                ))}
              </div>
              
              {overlayData.type === 'experience' && (
                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{(overlayData.track as Track).album}</span>
                  </div>
                </div>
              )}
              
              {overlayData.type === 'project' && (
                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tech Stack:</span>
                    <span className="font-medium">{(overlayData.track as Project).tech}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifyPortfolio;