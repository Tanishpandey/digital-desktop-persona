
import React from 'react';

const ExperiencesContent = () => {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      duration: "2023 - Present",
      description: "Led development of customer-facing web applications using React and TypeScript. Improved app performance by 40% and mentored junior developers.",
      achievements: [
        "Implemented responsive design system used across 5+ products",
        "Reduced bundle size by 35% through code splitting optimization",
        "Led cross-functional team of 6 developers"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      duration: "2022 - 2023",
      description: "Developed and maintained web applications using React, Node.js, and PostgreSQL. Collaborated with design team to implement pixel-perfect UIs.",
      achievements: [
        "Built real-time chat system handling 1000+ concurrent users",
        "Integrated payment processing with Stripe API",
        "Implemented automated testing reducing bugs by 60%"
      ]
    },
    {
      title: "Junior Web Developer",
      company: "Digital Agency Co.",
      duration: "2021 - 2022",
      description: "Created responsive websites and web applications for various clients. Gained experience in multiple frameworks and deployment strategies.",
      achievements: [
        "Delivered 15+ client projects on time and within budget",
        "Improved site loading speeds by average of 50%",
        "Learned and applied modern development best practices"
      ]
    }
  ];

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6 text-blue-400">Professional Experience</h2>
      
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-gray-700/50 rounded-lg p-5 hover:bg-gray-700/70 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold">{exp.title}</h3>
                <p className="text-blue-400 font-medium">{exp.company}</p>
              </div>
              <span className="text-sm text-gray-400 bg-gray-600 px-2 py-1 rounded">
                {exp.duration}
              </span>
            </div>
            
            <p className="text-gray-300 mb-4 leading-relaxed">
              {exp.description}
            </p>
            
            <div>
              <h4 className="font-medium text-sm mb-2 text-gray-300">Key Achievements:</h4>
              <ul className="space-y-1">
                {exp.achievements.map((achievement, achIndex) => (
                  <li key={achIndex} className="text-sm text-gray-400 flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-900/30 rounded-lg border border-blue-700/50">
        <h3 className="font-semibold mb-2 text-blue-400">Looking Forward</h3>
        <p className="text-gray-300 text-sm">
          Currently seeking new opportunities to contribute to innovative projects and continue growing as a developer. 
          Interested in roles involving modern web technologies, team leadership, and challenging technical problems.
        </p>
      </div>
    </div>
  );
};

export default ExperiencesContent;
