
import React, { useState, useEffect } from 'react';

const TerminalContent = () => {
  const [commands, setCommands] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');

  const skills = {
    frontend: ['React', 'TypeScript', 'Vue.js', 'Tailwind CSS', 'Next.js'],
    backend: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Express'],
    tools: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code']
  };

  const easterEggs = [
    "🎮 Fun fact: I once debugged code for 6 hours only to find a missing semicolon!",
    "☕ Coffee consumed while coding: ∞",
    "🦄 Favorite debugging method: console.log('HERE')",
    "🎯 My code works on my machine 60% of the time, every time",
    "🚀 Space complexity? I prefer space exploration!"
  ];

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    let output = '';

    switch (command) {
      case 'help':
        output = `Available commands:
- skills: Show technical skills
- easter: Show random Easter egg
- about: Basic info
- clear: Clear terminal
- whoami: Who am I?`;
        break;
      case 'skills':
        output = `Technical Skills:

Frontend: ${skills.frontend.join(', ')}
Backend: ${skills.backend.join(', ')}
Tools: ${skills.tools.join(', ')}`;
        break;
      case 'easter':
        output = easterEggs[Math.floor(Math.random() * easterEggs.length)];
        break;
      case 'about':
        output = 'Full-stack developer passionate about creating amazing user experiences.';
        break;
      case 'whoami':
        output = 'You are viewing the portfolio of a passionate developer!';
        break;
      case 'clear':
        setCommands([]);
        return;
      default:
        output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setCommands(prev => [...prev, `$ ${cmd}`, output]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim()) {
      handleCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  useEffect(() => {
    // Welcome message
    setCommands([
      'Welcome to My Personal OS Terminal!',
      'Type "help" to see available commands.',
      ''
    ]);
  }, []);

  return (
    <div className="p-4 bg-black text-green-400 font-mono text-sm h-full">
      <div className="mb-4">
        {commands.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="mr-2">$</span>
        <input
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          className="flex-1 bg-transparent outline-none text-green-400"
          placeholder="Enter command..."
          autoFocus
        />
      </form>
    </div>
  );
};

export default TerminalContent;
