import React from 'react';

interface Certification {
  title: string;
  organization: string;
  duration: string;
  description: string;
  skills: string[];
  icon: string;
}

const Certifications: React.FC = () => {
  const certifications: Certification[] = [
    {
      title: "C & C++ Programming",
      organization: "Broadway Infosys",
      duration: "68-hour course",
      description: "Comprehensive programming course covering fundamental and advanced concepts in C and C++ programming languages, including data structures, algorithms, and object-oriented programming principles.",
      skills: ["C Programming", "C++ Programming", "Data Structures", "Algorithms", "Object-Oriented Programming", "Memory Management"],
      icon: "💻"
    },
    {
      title: "Software Quality Assurance (QA)",
      organization: "Deerwalk Training Center",
      duration: "40-hour training",
      description: "Intensive training program focused on software testing methodologies, quality assurance processes, test case design, and automated testing tools to ensure software reliability and performance.",
      skills: ["Manual Testing", "Test Case Design", "Bug Reporting", "QA Processes", "Software Testing Lifecycle", "Quality Metrics"],
      icon: "🔍"
    },
    {
      title: "Caltech Coding Bootcamp",
      organization: "Simplilearn + Caltech Center for Technology & Management Education",
      duration: "Intensive Bootcamp",
      description: "Comprehensive full-stack development bootcamp covering modern web technologies, software engineering practices, and industry-standard development methodologies in collaboration with Caltech.",
      skills: ["Full-Stack Development", "Web Technologies", "Software Engineering", "Project Management", "Agile Methodologies", "Industry Best Practices"],
      icon: "🎓"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Certifications
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Continuous learning and professional development through structured courses and training programs 
            that have enhanced my technical skills and industry knowledge.
          </p>
        </div>

        {/* Certifications List */}
        <div className="space-y-8">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                      {cert.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {cert.title}
                        </h3>
                        <p className="text-lg text-primary-600 font-semibold mb-1">
                          {cert.organization}
                        </p>
                        <p className="text-sm text-gray-500 font-medium">
                          {cert.duration}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {cert.description}
                    </p>

                    {/* Skills */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Skills Acquired
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Commitment to Continuous Learning
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
              These certifications represent my dedication to staying current with industry trends and 
              continuously improving my technical skills. I believe in the importance of formal training 
              combined with hands-on experience to deliver high-quality software solutions.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">108+</div>
                <div className="text-gray-600">Hours of Training</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">3</div>
                <div className="text-gray-600">Certifications Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">15+</div>
                <div className="text-gray-600">Skills Developed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Interested in my technical background and experience?
          </p>
          <div className="space-x-4">
            <a
              href="/projects"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              View My Projects
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-600 hover:text-white transition-colors duration-200"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;

