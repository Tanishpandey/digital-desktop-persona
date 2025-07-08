
import React from 'react';

const ResumeContent = () => {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6 text-blue-400">Resume & Certificates</h2>
      
      <div className="space-y-6">
        {/* Professional Summary */}
        <section>
          <h3 className="text-lg font-semibold mb-3 text-gray-300">Professional Summary</h3>
          <p className="text-gray-400 leading-relaxed">
            Passionate full-stack developer with 3+ years of experience creating innovative web applications. 
            Specialized in React, Node.js, and modern JavaScript frameworks. Strong problem-solving skills 
            and commitment to writing clean, maintainable code.
          </p>
        </section>

        {/* Education */}
        <section>
          <h3 className="text-lg font-semibold mb-3 text-gray-300">Education</h3>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
            <p className="text-gray-400">University of Technology • 2020-2024</p>
            <p className="text-sm text-gray-500 mt-1">GPA: 3.8/4.0</p>
          </div>
        </section>

        {/* Certificates */}
        <section>
          <h3 className="text-lg font-semibold mb-3 text-gray-300">Certificates</h3>
          <div className="grid gap-3">
            {[
              { name: "AWS Certified Developer", issuer: "Amazon Web Services", date: "2024" },
              { name: "React Professional Certificate", issuer: "Meta", date: "2023" },
              { name: "Full Stack Web Development", issuer: "freeCodeCamp", date: "2023" }
            ].map((cert, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-3">
                <h4 className="font-medium text-sm">{cert.name}</h4>
                <p className="text-gray-400 text-xs">{cert.issuer} • {cert.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h3 className="text-lg font-semibold mb-3 text-gray-300">Technical Skills</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm mb-2 text-blue-400">Frontend</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• React, Vue.js, Angular</li>
                <li>• TypeScript, JavaScript</li>
                <li>• Tailwind CSS, SCSS</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2 text-blue-400">Backend</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Node.js, Express</li>
                <li>• Python, Django</li>
                <li>• PostgreSQL, MongoDB</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumeContent;
