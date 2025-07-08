
import React from 'react';

const AboutContent = () => {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6 text-blue-400">About Me</h2>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
            JD
          </div>
          <div>
            <h3 className="text-xl font-semibold">John Developer</h3>
            <p className="text-gray-400">Full Stack Developer & UI/UX Enthusiast</p>
            <p className="text-sm text-gray-500">📍 San Francisco, CA</p>
          </div>
        </div>

        <section>
          <h3 className="text-lg font-semibold mb-3 text-gray-300">Hello World! 👋</h3>
          <p className="text-gray-400 leading-relaxed">
            I'm a passionate full-stack developer who loves creating beautiful, functional web applications. 
            When I'm not coding, you can find me exploring new technologies, contributing to open source projects, 
            or enjoying a good cup of coffee while debugging someone else's code.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3 text-gray-300">What I Love</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-3">
              <h4 className="font-medium text-sm mb-1">💻 Clean Code</h4>
              <p className="text-xs text-gray-400">Writing maintainable, readable code</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <h4 className="font-medium text-sm mb-1">🎨 UI/UX Design</h4>
              <p className="text-xs text-gray-400">Creating intuitive user experiences</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <h4 className="font-medium text-sm mb-1">🚀 Performance</h4>
              <p className="text-xs text-gray-400">Optimizing for speed and efficiency</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <h4 className="font-medium text-sm mb-1">🌱 Learning</h4>
              <p className="text-xs text-gray-400">Always exploring new technologies</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3 text-gray-300">Let's Connect</h3>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
              LinkedIn
            </button>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors">
              GitHub
            </button>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors">
              Email
            </button>
          </div>
        </section>

        <div className="mt-8 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-700/30">
          <p className="text-sm text-gray-300 italic">
            "The best way to predict the future is to create it." - This personal OS portfolio 
            represents my journey in creating digital experiences that matter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
