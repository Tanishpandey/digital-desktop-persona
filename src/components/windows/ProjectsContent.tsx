
import React from 'react';

const ProjectsContent = () => {
  const projects = [
    {
      name: "E-Commerce Platform",
      description: "Full-stack web application with React, Node.js, and PostgreSQL",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      status: "Completed",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop"
    },
    {
      name: "Task Management App",
      description: "Collaborative project management tool with real-time updates",
      tech: ["Vue.js", "Socket.io", "MongoDB", "Express"],
      status: "In Progress",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop"
    },
    {
      name: "Data Visualization Dashboard",
      description: "Interactive dashboard for business analytics and reporting",
      tech: ["D3.js", "React", "Python", "FastAPI"],
      status: "Completed",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop"
    }
  ];

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6 text-blue-400">My Projects</h2>
      <div className="grid gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors">
            <div className="flex gap-4">
              <img 
                src={project.image} 
                alt={project.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.status === 'Completed' 
                      ? 'bg-green-600 text-green-100' 
                      : 'bg-blue-600 text-blue-100'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-300 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-gray-600 rounded text-xs text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;
