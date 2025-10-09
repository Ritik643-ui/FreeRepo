import React, { useState } from 'react';

const Education: React.FC = () => {
  const [showTranscript, setShowTranscript] = useState(false);

  // Actual transcript images
  const transcriptImages = [
    "/transcripts/transcript-page1.png",
    "/transcripts/transcript-page2.png",
    "/transcripts/transcript-page3.png"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Education
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My academic journey and educational background that laid the foundation 
            for my career in technology and information management.
          </p>
        </div>

        {/* Main Education Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex items-start space-x-6">
              {/* University Logo Placeholder */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">TU</span>
                </div>
              </div>

              {/* Education Details */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Bachelor of Information Management (BIM)
                </h2>
                <p className="text-xl text-primary-600 font-semibold mb-2">
                  Tribhuvan University
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  Faculty of Management • Nepal
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-1">Duration</h4>
                    <p className="text-gray-700">3.5 Years (7 Semesters)</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-1">Degree</h4>
                    <p className="text-gray-700">Bachelor's</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-1">Status</h4>
                    <p className="text-gray-700">111 credit hours</p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  The Bachelor of Information Management (BIM) program is a comprehensive 4-year degree 
                  that combines information technology with business management principles. This program 
                  provided me with a strong foundation in programming, database management, systems analysis, 
                  web technologies, and business strategy, preparing me for a career in technology and management.
                </p>

                {/* Key Subjects */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Subject Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Programming Fundamentals",
                      "Database Management",
                      "Web Technologies",
                      "Systems Analysis & Design",
                      "Data Analytics",
                      "Information Security",
                      "Mobile App Development",
                      "Project Management",
                      "E-Commerce",
                      "Business Management"
                    ].map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Transcript Button */}
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {showTranscript ? 'Hide Transcript' : 'View Transcript'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transcript Section */}
        {showTranscript && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="bg-primary-600 text-white p-6">
              <h3 className="text-2xl font-bold mb-2">Official Academic Transcript</h3>
              <p className="text-primary-100">
                Bachelor of Information Management • Tribhuvan University
              </p>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {transcriptImages.map((imageSrc, index) => (
                  <div key={index} className="text-center">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Transcript Page {index + 1}
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <img
                        src={imageSrc}
                        alt={`Official Transcript Page ${index + 1}`}
                        className="max-w-full h-auto mx-auto rounded-lg shadow-md border border-gray-200"
                        style={{ maxHeight: '800px' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Note */}
              <div className="bg-primary-50 p-6 rounded-lg mt-8">
                <div className="text-center">
                  <h4 className="text-lg font-bold text-primary-600 mb-2">Official Transcript</h4>
                  <p className="text-primary-800">
                    Complete academic record from Tribhuvan University showing all courses, 
                    grades, and degree completion for Bachelor of Information Management (BIM).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Education Info */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">About the Program</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Program Highlights</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Comprehensive blend of IT and business management</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Hands-on programming and database experience</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Real-world project development and management</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Strong foundation in data analytics and security</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Skills Developed</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Software development and programming</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Database design and management</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Business analysis and strategic thinking</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Project management and leadership</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Want to learn more about my academic background or discuss my qualifications?
          </p>
          <div className="space-x-4">
            <a
              href="/about"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Learn More About Me
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

export default Education;
