import React from 'react';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  features?: string[];
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "De Anza Gossips",
      description: "An anonymous and public social app that allows users to share thoughts and engage with the community while maintaining privacy.",
      techStack: ["Spring Boot", "React Native", "MySQL", "REST API"],
      githubLink: "https://github.com/Ritik643-ui/de-anza-gossips",
      features: [
        "Anonymous posting system",
        "Real-time feed updates",
        "Community engagement features",
        "Mobile-first design"
      ]
    },
    {
      title: "QuickNote AI",
      description: "An intelligent note summarization application that leverages AI to help users quickly digest and organize their notes.",
      techStack: ["Spring Boot", "OpenAI API", "MySQL", "React", "JWT Authentication"],
      githubLink: "https://github.com/Ritik643-ui/quicknote-ai",
      features: [
        "AI-powered note summarization",
        "User authentication system",
        "Note organization and tagging",
        "Export functionality"
      ]
    },
    {
      title: "TravelBuddy",
      description: "A comprehensive full-stack travel booking application with modern deployment practices and scalable architecture.",
      techStack: ["Spring Boot", "Docker", "AWS", "React", "PostgreSQL"],
      githubLink: "https://github.com/Ritik643-ui/travelbuddy",
      features: [
        "Travel booking system",
        "User profile management",
        "Payment integration",
        "Containerized deployment",
        "Cloud hosting on AWS"
      ]
    },
    {
      title: "Zumba Manager",
      description: "A participant and batch management system designed for fitness centers to efficiently manage Zumba classes and participants.",
      techStack: ["Java", "JSP", "Servlets", "JDBC", "MySQL", "Bootstrap"],
      githubLink: "https://github.com/Ritik643-ui/zumba-manager",
      features: [
        "Participant registration",
        "Batch scheduling",
        "Attendance tracking",
        "Instructor management",
        "Reporting system"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of applications I've built using various technologies, 
            showcasing my skills in full-stack development, AI integration, and modern deployment practices.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h3>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                {project.features && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <svg className="w-4 h-4 text-primary-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* GitHub Link */}
                <div className="flex justify-between items-center">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Want to see more of my work or collaborate on a project?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Let's Connect
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;

