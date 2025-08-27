import React, { useState, useEffect } from 'react';
import { X, Play, Code, Terminal, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Skill } from '@/data/resumeData';

interface SkillPlaygroundProps {
  skill: Skill;
  isOpen: boolean;
  onClose: () => void;
}

const SkillPlayground: React.FC<SkillPlaygroundProps> = ({ skill, isOpen, onClose }) => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const skillDemos = {
    'React': [
      { title: 'Component Architecture', code: 'const Component = () => <div>Hello React!</div>' },
      { title: 'Hooks & State', code: 'const [state, setState] = useState(initialValue)' },
      { title: 'Context API', code: 'const context = useContext(MyContext)' }
    ],
    'JavaScript': [
      { title: 'ES6+ Features', code: 'const result = arr.map(item => ({ ...item, new: true }))' },
      { title: 'Async/Await', code: 'const data = await fetch(url).then(res => res.json())' },
      { title: 'Destructuring', code: 'const { name, age, ...rest } = person' }
    ],
    'Python': [
      { title: 'List Comprehensions', code: 'squares = [x**2 for x in range(10) if x % 2 == 0]' },
      { title: 'Decorators', code: '@property\ndef value(self):\n    return self._value' },
      { title: 'Context Managers', code: 'with open("file.txt") as f:\n    content = f.read()' }
    ],
    'TypeScript': [
      { title: 'Type Safety', code: 'interface User { id: number; name: string; }' },
      { title: 'Generics', code: 'function identity<T>(arg: T): T { return arg; }' },
      { title: 'Union Types', code: 'type Status = "loading" | "success" | "error"' }
    ]
  };

  const currentDemos = skillDemos[skill.name as keyof typeof skillDemos] || [
    { title: 'Basic Usage', code: `// ${skill.name} implementation example\nconst example = "${skill.name} in action";` }
  ];

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    setProgress(skill.proficiency);
  }, [skill.proficiency]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg w-full max-w-3xl h-[70vh] flex flex-col overflow-hidden animate-bounce-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center glow-effect">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{skill.name}</h2>
              <p className="text-muted-foreground">{skill.category} • {skill.yearsExperience} years experience</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Proficiency Visualization */}
        <div className="p-6 border-b border-border">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Proficiency Level</span>
              <span className="text-2xl font-bold text-primary">{skill.proficiency}%</span>
            </div>
            <div className="relative">
              <Progress 
                value={progress} 
                className={`h-3 animated-progress ${isAnimating ? 'skill-progress' : ''}`}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
                <span>Expert</span>
              </div>
            </div>
          </div>
        </div>

        {/* Code Playground */}
        <div className="flex-1 flex">
          {/* Demo Selector */}
          <div className="w-1/3 border-r border-border p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Code Examples
            </h3>
            <div className="space-y-2">
              {currentDemos.map((demo, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDemo(index)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 stagger-item ${
                    activeDemo === index 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="font-medium text-sm">{demo.title}</div>
                </button>
              ))}
            </div>

            {/* Skill Stats */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Quick Stats
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience:</span>
                  <span>{skill.yearsExperience} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{skill.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={skill.isFavorited ? 'text-primary' : 'text-muted-foreground'}>
                    {skill.isFavorited ? '⭐ Favorite' : 'Learning'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Code Display */}
          <div className="flex-1 p-4">
            <div className="h-full bg-background/50 rounded-lg border border-border overflow-hidden">
              <div className="bg-muted/50 px-4 py-2 border-b border-border flex items-center justify-between">
                <span className="text-sm font-mono">{currentDemos[activeDemo].title}</span>
                <Button variant="ghost" size="sm">
                  <Play className="w-3 h-3 mr-1" />
                  Run
                </Button>
              </div>
              <div className="p-4 h-full overflow-auto">
                <pre className="font-mono text-sm text-foreground typing-animation">
                  <code>{currentDemos[activeDemo].code}</code>
                </pre>
              </div>
            </div>

            {/* Real-world Applications */}
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">Real-world Applications</h4>
              <div className="text-sm text-muted-foreground">
                {skill.name === 'React' && "Building interactive user interfaces, component-based architecture, state management"}
                {skill.name === 'JavaScript' && "Dynamic web applications, API integration, interactive features"}
                {skill.name === 'Python' && "Data analysis, automation scripts, backend services, machine learning"}
                {skill.name === 'TypeScript' && "Type-safe JavaScript, large-scale applications, better developer experience"}
                {!['React', 'JavaScript', 'Python', 'TypeScript'].includes(skill.name) && 
                  `Professional experience using ${skill.name} in production environments`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillPlayground;