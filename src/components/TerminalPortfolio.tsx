
import React, { useState, useEffect, useRef } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp?: string;
}

const TerminalPortfolio = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = {
    help: () => `Available Commands:
┌─────────────────────────────────────────────────────────┐
│ PORTFOLIO COMMANDS                                      │
├─────────────────────────────────────────────────────────┤
│ about          - Learn about me                         │
│ experience     - View work experience                   │
│ resume         - Display resume summary                 │
│ skills         - Show technical skills                  │
│ projects       - List my projects                       │
│ contact        - Get contact information                │
│ education      - View educational background            │
│ achievements   - Show certifications & awards          │
├─────────────────────────────────────────────────────────┤
│ SYSTEM COMMANDS                                         │
├─────────────────────────────────────────────────────────┤
│ clear          - Clear terminal                         │
│ history        - Show command history                   │
│ whoami         - Display current user                   │
│ date           - Show current date/time                 │
│ matrix         - Fun easter egg                         │
│ coffee         - Developer fuel status                  │
└─────────────────────────────────────────────────────────┘`,

    about: () => `
╔══════════════════════════════════════════════════════════╗
║                      ABOUT ME                            ║
╚══════════════════════════════════════════════════════════╝

👋 Hello! I'm John Developer

🚀 Passionate Full-Stack Developer with 3+ years of experience
   creating innovative web applications and solving complex problems.

💡 I specialize in:
   • Building responsive, user-friendly interfaces
   • Developing scalable backend systems  
   • Writing clean, maintainable code
   • Leading development teams

🎯 Currently focused on modern web technologies and always
   eager to learn new tools and frameworks.

📍 Based in San Francisco, CA
🌟 Open to new opportunities and collaborations`,

    experience: () => `
╔══════════════════════════════════════════════════════════╗
║                 WORK EXPERIENCE                          ║
╚══════════════════════════════════════════════════════════╝

▶ Senior Frontend Developer @ Tech Solutions Inc.
  📅 2023 - Present
  🔹 Led development of customer-facing applications using React/TypeScript
  🔹 Improved app performance by 40% through optimization
  🔹 Mentored team of 6 junior developers
  🔹 Implemented design system across 5+ products

▶ Full Stack Developer @ StartupXYZ  
  📅 2022 - 2023
  🔹 Built real-time chat system handling 1000+ concurrent users
  🔹 Integrated payment processing with Stripe API
  🔹 Reduced bugs by 60% through automated testing
  🔹 Collaborated with design team for pixel-perfect UIs

▶ Junior Web Developer @ Digital Agency Co.
  📅 2021 - 2022  
  🔹 Delivered 15+ client projects on time and within budget
  🔹 Improved site loading speeds by average of 50%
  🔹 Gained expertise in multiple frameworks and deployment`,

    resume: () => `
╔══════════════════════════════════════════════════════════╗
║                    RESUME SUMMARY                        ║
╚══════════════════════════════════════════════════════════╝

👤 JOHN DEVELOPER
📧 john.developer@email.com
📱 (555) 123-4567
🌐 github.com/johndeveloper

🎓 EDUCATION
   Bachelor of Science in Computer Science
   University of Technology (2020-2024) - GPA: 3.8/4.0

💼 EXPERIENCE
   ▶ Senior Frontend Developer (2023-Present)
   ▶ Full Stack Developer (2022-2023) 
   ▶ Junior Web Developer (2021-2022)

🏆 CERTIFICATIONS
   ✓ AWS Certified Developer (2024)
   ✓ React Professional Certificate - Meta (2023)
   ✓ Full Stack Web Development - freeCodeCamp (2023)

🔧 CORE SKILLS
   Frontend: React, Vue.js, TypeScript, Tailwind CSS
   Backend: Node.js, Python, PostgreSQL, MongoDB
   Tools: Git, Docker, AWS, Figma`,

    skills: () => `
╔══════════════════════════════════════════════════════════╗
║                 TECHNICAL SKILLS                         ║
╚══════════════════════════════════════════════════════════╝

🎨 FRONTEND DEVELOPMENT
   ████████████████████████████ React.js
   ███████████████████████████░ TypeScript  
   ██████████████████████████░░ Vue.js
   █████████████████████████░░░ Tailwind CSS
   ████████████████████████░░░░ Next.js

⚙️ BACKEND DEVELOPMENT  
   ███████████████████████████░ Node.js
   ██████████████████████████░░ Python
   █████████████████████████░░░ Express.js
   ████████████████████████░░░░ Django
   ███████████████████████░░░░░ GraphQL

🗄️ DATABASES
   ███████████████████████████░ PostgreSQL
   ██████████████████████████░░ MongoDB
   █████████████████████████░░░ Redis
   ████████████████████████░░░░ MySQL

🛠️ TOOLS & DEVOPS
   ████████████████████████████ Git
   ███████████████████████████░ Docker
   ██████████████████████████░░ AWS
   █████████████████████████░░░ Kubernetes
   ████████████████████████░░░░ CI/CD`,

    projects: () => `
╔══════════════════════════════════════════════════════════╗
║                     MY PROJECTS                          ║
╚══════════════════════════════════════════════════════════╝

🛒 E-Commerce Platform
   Stack: React, Node.js, PostgreSQL, Stripe
   Status: ✅ Completed
   Description: Full-stack web application with payment processing
   
📝 Task Management App  
   Stack: Vue.js, Socket.io, MongoDB, Express
   Status: 🔄 In Progress
   Description: Collaborative project management with real-time updates
   
📊 Data Visualization Dashboard
   Stack: D3.js, React, Python, FastAPI  
   Status: ✅ Completed
   Description: Interactive business analytics and reporting dashboard
   
🎮 Personal OS Portfolio
   Stack: React, TypeScript, Tailwind CSS
   Status: ✅ Completed  
   Description: Interactive operating system themed portfolio website

💡 Open Source Contributions
   • React Component Library (500+ stars)
   • TypeScript Utilities Package  
   • Vue.js Plugin for Authentication`,

    contact: () => `
╔══════════════════════════════════════════════════════════╗
║                 CONTACT INFORMATION                      ║
╚══════════════════════════════════════════════════════════╝

📧 Email:     john.developer@email.com
📱 Phone:     (555) 123-4567
🌐 Website:   johndeveloper.dev
💼 LinkedIn:  linkedin.com/in/johndeveloper
🐙 GitHub:    github.com/johndeveloper
🐦 Twitter:   @johndeveloper

📍 Location:  San Francisco, CA
🕐 Timezone:  PST (UTC-8)

💬 Preferred contact method: Email
⚡ Response time: Usually within 24 hours
🤝 Available for: Full-time opportunities, consulting, collaborations

Feel free to reach out for any opportunities or just to chat!`,

    education: () => `
╔══════════════════════════════════════════════════════════╗
║               EDUCATIONAL BACKGROUND                     ║
╚══════════════════════════════════════════════════════════╝

🎓 FORMAL EDUCATION
   University of Technology
   Bachelor of Science in Computer Science
   📅 2020 - 2024
   📊 GPA: 3.8/4.0
   🏆 Dean's List: Fall 2022, Spring 2023

📚 RELEVANT COURSEWORK
   • Data Structures & Algorithms
   • Software Engineering Principles  
   • Database Systems
   • Web Development
   • Computer Networks
   • Machine Learning Fundamentals

🏅 CERTIFICATIONS & COURSES
   ✓ AWS Certified Developer Associate (2024)
   ✓ Meta React Professional Certificate (2023)
   ✓ freeCodeCamp Full Stack Development (2023)
   ✓ MongoDB University Developer Course (2022)
   ✓ Google Cloud Platform Fundamentals (2022)`,

    achievements: () => `
╔══════════════════════════════════════════════════════════╗
║              ACHIEVEMENTS & AWARDS                       ║
╚══════════════════════════════════════════════════════════╝

🏆 PROFESSIONAL ACHIEVEMENTS
   ✓ Led team that increased app performance by 40%
   ✓ Reduced production bugs by 60% through testing implementation
   ✓ Delivered 15+ projects on time and within budget
   ✓ Mentored 6 junior developers to promotion

🥇 CERTIFICATIONS
   ✓ AWS Certified Developer Associate (2024)
   ✓ React Professional Certificate - Meta (2023)
   ✓ Full Stack Web Development - freeCodeCamp (2023)

🌟 OPEN SOURCE CONTRIBUTIONS
   ✓ React Component Library: 500+ GitHub stars
   ✓ TypeScript Utilities: 200+ weekly downloads
   ✓ Vue.js Authentication Plugin: 100+ contributors

🎖️ ACADEMIC HONORS
   ✓ Dean's List - Fall 2022, Spring 2023
   ✓ Computer Science Excellence Award (2024)
   ✓ Hackathon Winner - University Tech Challenge (2023)`,

    clear: () => 'CLEAR',
    
    history: () => commandHistory.length > 0 
      ? commandHistory.map((cmd, i) => `${i + 1}: ${cmd}`).join('\n')
      : 'No command history available.',
    
    whoami: () => 'johndeveloper@portfolio:~$',
    
    date: () => new Date().toString(),
    
    matrix: () => `Wake up, Neo...
The Matrix has you...
Following the white rabbit...

01001000 01100101 01101100 01101100 01101111
01010111 01101111 01110010 01101100 01100100`,
    
    coffee: () => `
☕ DEVELOPER FUEL STATUS ☕

Coffee Level: ████████████████ 100%
Debugging Power: ███████████████░ 95%
Code Quality: ██████████████░░ 90%
Motivation: █████████████████ 99%

Status: FULLY CAFFEINATED ✅
Last Coffee: 23 minutes ago
Next Coffee: In 37 minutes

"Code is poetry, coffee is the muse." - Anonymous Developer`
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const timestamp = new Date().toLocaleTimeString();
    
    // Add input to history
    setLines(prev => [...prev, { type: 'input', content: `johndeveloper@portfolio:~$ ${cmd}`, timestamp }]);
    
    // Add to command history
    if (trimmedCmd && !commandHistory.includes(trimmedCmd)) {
      setCommandHistory(prev => [...prev, trimmedCmd]);
    }

    // Execute command
    if (trimmedCmd === 'clear') {
      setLines([]);
      return;
    }

    const commandFn = commands[trimmedCmd as keyof typeof commands];
    if (commandFn) {
      const output = commandFn();
      setLines(prev => [...prev, { type: 'output', content: output }]);
    } else if (trimmedCmd) {
      setLines(prev => [...prev, { 
        type: 'error', 
        content: `Command not found: ${trimmedCmd}\nType 'help' to see available commands.` 
      }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  useEffect(() => {
    // Welcome message
    setLines([
      { type: 'output', content: `
╔══════════════════════════════════════════════════════════╗
║          WELCOME TO JOHN'S TERMINAL PORTFOLIO            ║
╚══════════════════════════════════════════════════════════╝

System initialized successfully...
Loading developer profile...
Connecting to awesome projects database...

👋 Hello! Welcome to my interactive terminal portfolio.
Type 'help' to see all available commands.
Use arrow keys to navigate command history.

Ready for exploration! 🚀
` }
    ]);
    
    // Focus input
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="h-full bg-black text-green-400 font-mono text-sm overflow-hidden flex flex-col">
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 space-y-1"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, index) => (
          <div key={index} className={`whitespace-pre-wrap ${
            line.type === 'input' ? 'text-green-300' : 
            line.type === 'error' ? 'text-red-400' : 
            'text-green-400'
          }`}>
            {line.content}
          </div>
        ))}
        
        {/* Current input line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-300 mr-1">johndeveloper@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
            placeholder="Type a command..."
            autoComplete="off"
            spellCheck="false"
          />
          <span className="animate-pulse">_</span>
        </form>
      </div>
    </div>
  );
};

export default TerminalPortfolio;
