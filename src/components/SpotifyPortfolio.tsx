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
      title: 'Software Engineer Intern',
      artist: 'Genesys',
      album: 'May 2025 - Present',
      duration: '8m+',
      image: '/placeholder.svg',
      description: 'Architected high-scale serverless data platform processing 10M+ daily call records, cutting latency by 93% (30s to 2s) using AWS Lambda, DynamoDB and S3.',
      isLiked: true
    },
    {
      id: '2', 
      title: 'Tech Insights Summer School',
      artist: 'Bloomberg',
      album: 'June 2025 - Present',
      duration: '6m+',
      image: '/placeholder.svg',
      description: 'Collaborated with Bloomberg engineers to tackle complex algorithmic problems, improving code efficiency and readability through iterative feedback.',
      isLiked: true
    },
    {
      id: '3',
      title: 'Software Engineer Intern', 
      artist: 'Lynk Global',
      album: 'May 2024 - August 2024',
      duration: '4m',
      image: '/placeholder.svg',
      description: 'Automated end-to-end CI/CD testing pipeline for satellite messaging systems, reducing manual QA by 90% (400+ hours/year).',
      isLiked: true
    },
    {
      id: '4',
      title: 'Research Assistant', 
      artist: 'Penn State University',
      album: 'December 2023 - October 2024',
      duration: '11m',
      image: '/placeholder.svg',
      description: 'Developed Python-based Glassdoor web scraper extracting 5,000+ company reviews, contributing to 80% improvement in predictive model accuracy.',
      isLiked: false
    }
  ];

  // Projects as albums
  const projects = [
    {
      id: '1',
      name: 'DisasterAlert',
      description: 'Tailored AI Alerts',
      image: '/placeholder.svg',
      tech: 'TypeScript • Node.js • MongoDB • AI'
    },
    {
      id: '2',
      name: 'ReservePlate',
      description: 'Food Redistribution Platform',
      image: '/placeholder.svg', 
      tech: 'React • Node.js • MongoDB • JavaScript'
    },
    {
      id: '3',
      name: 'Spotify Portfolio',
      description: 'Interactive resume website',
      image: '/placeholder.svg',
      tech: 'React • TypeScript • Tailwind CSS'
    }
  ];

  // Skills with proficiency levels
  const skills = [
    { name: 'React', proficiency: 90, category: 'Frontend' },
    { name: 'TypeScript', proficiency: 88, category: 'Frontend' },
    { name: 'JavaScript', proficiency: 92, category: 'Frontend' },
    { name: 'HTML/CSS', proficiency: 85, category: 'Frontend' },
    { name: 'Python', proficiency: 95, category: 'Backend' },
    { name: 'Node.js', proficiency: 88, category: 'Backend' },
    { name: 'C/C++', proficiency: 85, category: 'Backend' },
    { name: 'Java', proficiency: 82, category: 'Backend' },
    { name: 'MongoDB', proficiency: 85, category: 'Database' },
    { name: 'PostgreSQL', proficiency: 88, category: 'Database' },
    { name: 'MySQL', proficiency: 82, category: 'Database' },
    { name: 'DynamoDB', proficiency: 80, category: 'Database' },
    { name: 'AWS Lambda', proficiency: 85, category: 'DevOps' },
    { name: 'Docker', proficiency: 80, category: 'DevOps' },
    { name: 'Git', proficiency: 90, category: 'DevOps' },
    { name: 'CI/CD', proficiency: 78, category: 'DevOps' }
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
              <h3 className="text-xl font-semibold">Software Engineer Intern</h3>
              <p className="opacity-90">at Genesys</p>
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
            className="spotify-card group grid grid-cols-[2fr_1fr_1fr_60px] gap-4 p-4 rounded-lg"
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
                <div key={skill.name} className="spotify-card group p-4 rounded-lg">
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
              <span className="text-primary-foreground text-sm font-semibold">TP</span>
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