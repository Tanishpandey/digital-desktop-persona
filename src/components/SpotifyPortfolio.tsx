import React, { useState } from 'react';
import { Play, Pause, Heart, MoreHorizontal, Clock, Calendar, MapPin, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import SpotifySidebar from './spotify/SpotifySidebar';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  image: string;
  description?: string;
  isLiked?: boolean;
}

const SpotifyPortfolio = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  // Experience as tracks
  const experienceTracks: Track[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      artist: 'Tech Solutions Inc.',
      album: '2023 - Present',
      duration: '1y 2m',
      image: '/placeholder.svg',
      description: 'Led development of customer-facing applications using React/TypeScript. Improved app performance by 40% through optimization.',
      isLiked: true
    },
    {
      id: '2', 
      title: 'Full Stack Developer',
      artist: 'StartupXYZ',
      album: '2022 - 2023',
      duration: '1y 0m',
      image: '/placeholder.svg',
      description: 'Built real-time chat system handling 1000+ concurrent users. Integrated payment processing with Stripe API.',
      isLiked: true
    },
    {
      id: '3',
      title: 'Junior Web Developer', 
      artist: 'Digital Agency Co.',
      album: '2021 - 2022',
      duration: '1y 0m',
      image: '/placeholder.svg',
      description: 'Delivered 15+ client projects on time and within budget. Improved site loading speeds by average of 50%.',
      isLiked: false
    }
  ];

  // Projects as albums
  const projects = [
    {
      id: '1',
      name: 'E-Commerce Platform',
      description: 'Full-stack web application',
      image: '/placeholder.svg',
      tech: 'React • Node.js • PostgreSQL'
    },
    {
      id: '2',
      name: 'Task Management App',
      description: 'Collaborative project management',
      image: '/placeholder.svg', 
      tech: 'Vue.js • Socket.io • MongoDB'
    },
    {
      id: '3',
      name: 'Data Visualization Dashboard',
      description: 'Interactive business analytics',
      image: '/placeholder.svg',
      tech: 'D3.js • React • Python'
    },
    {
      id: '4',
      name: 'Personal OS Portfolio',
      description: 'Interactive operating system themed',
      image: '/placeholder.svg',
      tech: 'React • TypeScript • Tailwind'
    }
  ];

  // Skills with proficiency levels
  const skills = [
    { name: 'React.js', proficiency: 95, category: 'Frontend' },
    { name: 'TypeScript', proficiency: 90, category: 'Frontend' },
    { name: 'Node.js', proficiency: 88, category: 'Backend' },
    { name: 'Python', proficiency: 85, category: 'Backend' },
    { name: 'PostgreSQL', proficiency: 82, category: 'Database' },
    { name: 'MongoDB', proficiency: 80, category: 'Database' },
    { name: 'AWS', proficiency: 78, category: 'DevOps' },
    { name: 'Docker', proficiency: 75, category: 'DevOps' }
  ];

  const handlePlay = (track?: Track) => {
    if (track) {
      setCurrentTrack(track);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
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
              <h3 className="text-xl font-semibold">Senior Frontend Developer</h3>
              <p className="opacity-90">at Tech Solutions Inc.</p>
            </div>
          </div>
          <Button
            onClick={() => handlePlay()}
            className="play-button bg-white/20 hover:bg-white/30 text-white border-0 w-12 h-12 rounded-full p-0"
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
            { name: 'Contact', view: 'contact' }
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentView(item.view)}
              className="spotify-card p-4 rounded-lg text-left"
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
                  <Button className="play-button w-12 h-12 rounded-full p-0">
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
            className="spotify-card grid grid-cols-[2fr_1fr_1fr_60px] gap-4 p-4 rounded-lg group"
          >
            <div className="flex items-center gap-3">
              <Button
                onClick={() => handlePlay(track)}
                className="play-button opacity-0 group-hover:opacity-100 w-10 h-10 rounded-full p-0"
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
              {track.isLiked && <Heart className="w-4 h-4 fill-primary text-primary" />}
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
          <p className="text-muted-foreground">Made by John Developer • {projects.length} projects</p>
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
                <Button className="play-button w-12 h-12 rounded-full p-0 shadow-lg">
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

      <div className="grid gap-8">
        {['Frontend', 'Backend', 'Database', 'DevOps'].map((category) => (
          <div key={category}>
            <h2 className="text-xl font-semibold mb-4">{category}</h2>
            <div className="space-y-4">
              {skills.filter(skill => skill.category === category).map((skill) => (
                <div key={skill.name} className="spotify-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                  </div>
                  <Progress value={skill.proficiency} className="skill-progress h-2" />
                </div>
              ))}
            </div>
          </div>
        ))}
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
          <div className="spotify-card p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>john.developer@email.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          <div className="spotify-card p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <div className="space-y-3">
              {[
                { name: 'GitHub', url: 'github.com/johndeveloper' },
                { name: 'LinkedIn', url: 'linkedin.com/in/johndeveloper' },
                { name: 'Twitter', url: '@johndeveloper' }
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

        <div className="spotify-card p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">About Me</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Passionate full-stack developer with 3+ years of experience creating innovative web applications. 
            I specialize in React, Node.js, and modern JavaScript frameworks. Always eager to take on new 
            challenges and collaborate on exciting projects.
          </p>
          <Button className="w-full">
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
            <Button variant="ghost" size="sm" className="rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-semibold">JD</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-auto custom-scrollbar">
          {renderContent()}
        </main>
      </div>

      {/* Now Playing Bar */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-card border-t flex items-center justify-between px-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
              <div className="w-6 h-6 bg-primary/30 rounded"></div>
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate">{currentTrack.title}</p>
              <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>
            <Heart className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer flex-shrink-0" />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/>
              </svg>
            </Button>
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="play-button w-8 h-8 p-0"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z"/>
              </svg>
            </Button>
          </div>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifyPortfolio;