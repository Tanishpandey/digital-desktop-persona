import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, Code, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Project } from '@/data/resumeData';

interface ProjectDemoProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDemo: React.FC<ProjectDemoProps> = ({ project, isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [codeVisible, setCodeVisible] = useState(false);

  const slides = [
    { type: 'overview', title: 'Project Overview', content: project.description },
    { type: 'features', title: 'Key Features', content: project.bullets?.join(' • ') || 'Advanced features implemented' },
    { type: 'tech', title: 'Technology Stack', content: project.tech },
    { type: 'impact', title: 'Impact & Results', content: 'Delivered scalable solution with modern architecture' }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const sampleCode = `// ${project.name} - Core Implementation
import React, { useState, useEffect } from 'react';
import { ${project.tech.split('•')[0]?.trim()} } from 'framework';

const ${project.name.replace(/[^a-zA-Z]/g, '')} = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch and process data
    fetchData();
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const result = await apiCall(formData);
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Core functionality implementation */}
      <MainComponent onSubmit={handleSubmit} />
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default ${project.name.replace(/[^a-zA-Z]/g, '')};`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden animate-bounce-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{project.name}</h2>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Left Panel - Demo Slides */}
          <div className="flex-1 p-6 relative">
            <div className="h-full bg-muted/30 rounded-lg p-6 relative overflow-hidden">
              {/* Progress indicators */}
              <div className="flex gap-2 mb-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-primary w-8' : 'bg-muted-foreground w-2'
                    }`}
                  />
                ))}
              </div>

              {/* Slide Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{slides[currentSlide].title}</h3>
                <div className="text-muted-foreground leading-relaxed">
                  {slides[currentSlide].type === 'tech' ? (
                    <div className="flex flex-wrap gap-2">
                      {project.tech.split('•').map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p>{slides[currentSlide].content}</p>
                  )}
                </div>

                {/* Animated Demo Area */}
                <div className="mt-6 h-48 bg-background/50 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-lg mx-auto animate-pulse-glow"></div>
                    <p className="text-sm text-muted-foreground">Live Demo Preview</p>
                    <p className="text-xs text-muted-foreground">{project.name} in action</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Code View */}
          <div className="w-1/3 border-l border-border">
            <div className="p-4 border-b border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCodeVisible(!codeVisible)}
                className="w-full justify-start"
              >
                <Code className="w-4 h-4 mr-2" />
                {codeVisible ? 'Hide Code' : 'View Code'}
              </Button>
            </div>
            
            {codeVisible && (
              <div className="p-4 h-full overflow-auto">
                <pre className="text-xs text-muted-foreground font-mono bg-muted/50 p-4 rounded-lg overflow-auto typing-animation">
                  <code>{sampleCode}</code>
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Slide {currentSlide + 1} of {slides.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                Source Code
              </Button>
            )}
            {project.liveUrl && (
              <Button
                size="sm"
                onClick={() => window.open(project.liveUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDemo;