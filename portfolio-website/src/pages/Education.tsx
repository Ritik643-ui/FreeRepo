import React, { useState } from 'react';

interface Course {
  code: string;
  name: string;
  credits: number;
  grade: string;
  semester: string;
}

const Education: React.FC = () => {
  const [showTranscript, setShowTranscript] = useState(false);

  // Sample transcript data - you can replace this with your actual transcript
  const transcriptData: Course[] = [
    // First Year
    { code: "IT 101", name: "Introduction to Information Technology", credits: 3, grade: "A", semester: "1st Semester" },
    { code: "MGMT 101", name: "Principles of Management", credits: 3, grade: "A-", semester: "1st Semester" },
    { code: "ECON 101", name: "Microeconomics", credits: 3, grade: "B+", semester: "1st Semester" },
    { code: "ENG 101", name: "English Communication", credits: 3, grade: "A", semester: "1st Semester" },
    { code: "MATH 101", name: "Business Mathematics", credits: 3, grade: "A-", semester: "1st Semester" },
    
    { code: "IT 102", name: "Computer Programming Fundamentals", credits: 3, grade: "A", semester: "2nd Semester" },
    { code: "MGMT 102", name: "Organizational Behavior", credits: 3, grade: "B+", semester: "2nd Semester" },
    { code: "ECON 102", name: "Macroeconomics", credits: 3, grade: "B+", semester: "2nd Semester" },
    { code: "STAT 101", name: "Business Statistics", credits: 3, grade: "A-", semester: "2nd Semester" },
    { code: "ACC 101", name: "Financial Accounting", credits: 3, grade: "B+", semester: "2nd Semester" },

    // Second Year
    { code: "IT 201", name: "Database Management Systems", credits: 3, grade: "A", semester: "3rd Semester" },
    { code: "IT 202", name: "Systems Analysis and Design", credits: 3, grade: "A-", semester: "3rd Semester" },
    { code: "MGMT 201", name: "Human Resource Management", credits: 3, grade: "B+", semester: "3rd Semester" },
    { code: "FIN 201", name: "Financial Management", credits: 3, grade: "B+", semester: "3rd Semester" },
    { code: "MKT 201", name: "Marketing Management", credits: 3, grade: "A-", semester: "3rd Semester" },

    { code: "IT 203", name: "Web Technologies", credits: 3, grade: "A", semester: "4th Semester" },
    { code: "IT 204", name: "Network Administration", credits: 3, grade: "A-", semester: "4th Semester" },
    { code: "MGMT 202", name: "Operations Management", credits: 3, grade: "B+", semester: "4th Semester" },
    { code: "LAW 201", name: "Business Law", credits: 3, grade: "B+", semester: "4th Semester" },
    { code: "RES 201", name: "Research Methodology", credits: 3, grade: "A-", semester: "4th Semester" },

    // Third Year
    { code: "IT 301", name: "Information Systems Management", credits: 3, grade: "A", semester: "5th Semester" },
    { code: "IT 302", name: "E-Commerce and Digital Business", credits: 3, grade: "A", semester: "5th Semester" },
    { code: "IT 303", name: "Data Analytics", credits: 3, grade: "A-", semester: "5th Semester" },
    { code: "MGMT 301", name: "Strategic Management", credits: 3, grade: "A-", semester: "5th Semester" },
    { code: "ENT 301", name: "Entrepreneurship", credits: 3, grade: "B+", semester: "5th Semester" },

    { code: "IT 304", name: "Information Security", credits: 3, grade: "A", semester: "6th Semester" },
    { code: "IT 305", name: "Mobile Application Development", credits: 3, grade: "A", semester: "6th Semester" },
    { code: "IT 306", name: "Project Management", credits: 3, grade: "A-", semester: "6th Semester" },
    { code: "IT 399", name: "Capstone Project", credits: 6, grade: "A", semester: "6th Semester" },
  ];

  const calculateGPA = (courses: Course[]): string => {
    const gradePoints: { [key: string]: number } = {
      'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0
    };
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    courses.forEach(course => {
      totalPoints += gradePoints[course.grade] * course.credits;
      totalCredits += course.credits;
    });
    
    return (totalPoints / totalCredits).toFixed(2);
  };

  const groupedCourses = transcriptData.reduce((acc, course) => {
    if (!acc[course.semester]) {
      acc[course.semester] = [];
    }
    acc[course.semester].push(course);
    return acc;
  }, {} as { [key: string]: Course[] });

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
                    <p className="text-gray-700">4 Years (8 Semesters)</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-1">GPA</h4>
                    <p className="text-gray-700">{calculateGPA(transcriptData)}/4.0</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-1">Total Credits</h4>
                    <p className="text-gray-700">{transcriptData.reduce((sum, course) => sum + course.credits, 0)} Credits</p>
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
              <h3 className="text-2xl font-bold mb-2">Academic Transcript</h3>
              <p className="text-primary-100">
                Bachelor of Information Management • Tribhuvan University
              </p>
            </div>
            
            <div className="p-6">
              {Object.entries(groupedCourses).map(([semester, courses]) => (
                <div key={semester} className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                    {semester}
                  </h4>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Course Code</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Course Name</th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">Credits</th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map((course, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium text-gray-900">{course.code}</td>
                            <td className="py-3 px-4 text-gray-700">{course.name}</td>
                            <td className="py-3 px-4 text-center text-gray-700">{course.credits}</td>
                            <td className="py-3 px-4 text-center">
                              <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                                course.grade === 'A' ? 'bg-green-100 text-green-800' :
                                course.grade === 'A-' ? 'bg-green-100 text-green-700' :
                                course.grade === 'B+' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {course.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 text-right">
                    <span className="text-sm text-gray-600">
                      Semester Credits: {courses.reduce((sum, course) => sum + course.credits, 0)} • 
                      Semester GPA: {calculateGPA(courses)}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Overall Summary */}
              <div className="bg-primary-50 p-6 rounded-lg mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <h4 className="text-2xl font-bold text-primary-600">
                      {transcriptData.reduce((sum, course) => sum + course.credits, 0)}
                    </h4>
                    <p className="text-primary-800 font-medium">Total Credits</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-primary-600">{calculateGPA(transcriptData)}</h4>
                    <p className="text-primary-800 font-medium">Cumulative GPA</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-primary-600">4</h4>
                    <p className="text-primary-800 font-medium">Years Completed</p>
                  </div>
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

