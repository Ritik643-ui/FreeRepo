import React, { useState } from 'react';

interface Certification {
  title: string;
  organization: string;
  duration: string;
  description: string;
  skills: string[];
  icon: string;
  imageUrl?: string;
  imageUrls?: string[]; // for Caltech multiple certs
}

const Certifications: React.FC = () => {
  const [visibleCertIndex, setVisibleCertIndex] = useState<number | null>(null);

  const certifications: Certification[] = [
    {
      title: "C & C++ Programming",
      organization: "Broadway Infosys",
      duration: "68-hour course",
      description: "Comprehensive programming course covering fundamental and advanced concepts in C and C++ programming languages.",
      skills: ["C Programming", "C++ Programming", "Data Structures", "Algorithms", "Object-Oriented Programming", "Memory Management"],
      icon: "💻",
      imageUrl: "/certificates/broadwayC++.png"
    },
    {
      title: "Software Quality Assurance (QA)",
      organization: "Deerwalk Training Center",
      duration: "40-hour training",
      description: "Intensive training program focused on software testing methodologies and QA best practices.",
      skills: ["Manual Testing", "Test Case Design", "Bug Reporting", "QA Processes", "Software Testing Lifecycle", "Quality Metrics"],
      icon: "🔍",
      imageUrl: "/certificates/deerwalkQA.png"
    },
    {
      title: "Caltech Coding Bootcamp",
      organization: "Simplilearn + Caltech CTME",
      duration: "Full-stack Bootcamp",
      description: "End-to-end software engineering bootcamp including UI design, backend, APIs, and capstone project.",
      skills: ["Full-Stack Development", "Web Technologies", "Software Engineering", "Agile", "Project Management", "Industry Best Practices"],
      icon: "🎓",
      imageUrls: [
        "/certificates/caltech1-planning.png",
        "/certificates/caltech2-backend.png",
        "/certificates/caltech3-api.png",
        "/certificates/caltech4-capstone.png"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Certifications</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Continuous learning and professional development through structured courses and training programs.
          </p>
        </div>

        {/* Certifications List */}
        <div className="space-y-8">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                      {cert.icon}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3
                          className="text-2xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-primary-600 transition"
                          onClick={() => setVisibleCertIndex(visibleCertIndex === index ? null : index)}
                        >
                          {cert.title}
                        </h3>
                        <p className="text-lg text-primary-600 font-semibold mb-1">{cert.organization}</p>
                        <p className="text-sm text-gray-500 font-medium">{cert.duration}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">{cert.description}</p>

                    {/* Toggle Certificate Image(s) */}
                    {visibleCertIndex === index && (
                      <div className="my-6">
                        {cert.imageUrl && (
                          <div className="text-center">
                            <img
                              src={cert.imageUrl}
                              alt={`${cert.title} Certificate`}
                              className="rounded-lg shadow-lg max-w-2xl mx-auto"
                            />
                          </div>
                        )}

                        {cert.imageUrls && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {cert.imageUrls.map((url, idx) => (
                              <img
                                key={idx}
                                src={url}
                                alt={`Caltech Certificate ${idx + 1}`}
                                className="rounded-lg shadow-md w-full"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

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

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">Interested in my technical background and experience?</p>
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

