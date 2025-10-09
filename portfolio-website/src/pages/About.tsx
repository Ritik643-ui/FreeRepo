import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h1>
          <p className="text-xl text-gray-600">
            Get to know more about my journey, background, and passion for technology
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-12">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center">
                  <img
      src="/profilepic/profilePic.png"
      alt="Ritik Sharma"
      className="object-cover w-full h-full"
    />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ritik Sharma</h2>
                <p className="text-xl text-primary-600 font-semibold mb-4">Software Developer</p>
                <p className="text-gray-700 leading-relaxed">
                  A passionate developer from Nepal, currently attending De Anza College in California. 
                  I bring a unique perspective combining international experience with American education 
                  to create innovative software solutions.
                </p>
              </div>
            </div>

            {/* Background Story */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">My Journey</h3>
                <div className="prose prose-lg text-gray-700">
                  <p className="mb-4">
                    Originally from Nepal, I embarked on my journey to the United States to pursue higher education 
                    and expand my horizons in technology. Currently, I'm a student at De Anza College in California, 
                    where I'm deepening my understanding of computer science and software engineering principles.
                  </p>
                  <p className="mb-4">
                    My passion for programming began early, and I've had the privilege of sharing that passion with 
                    others as a Java Teacher Intern at KIST College in Nepal. This experience taught me not only 
                    technical skills but also the importance of clear communication and helping others understand 
                    complex concepts.
                  </p>
                  <p>
                    I've also gained valuable real-world experience working at Walmart, where I learned about 
                    teamwork, customer service, and the importance of reliability in any role. This diverse 
                    background has shaped my approach to software development, emphasizing both technical 
                    excellence and user-centered design.
                  </p>
                </div>
              </div>

              {/* Technical Expertise */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Expertise</h3>
                <p className="text-gray-700 mb-6">
                  I specialize in building full-stack applications using modern technologies. My experience 
                  spans from backend development with Java and Spring Boot to frontend development with React 
                  and React Native. I'm particularly interested in integrating AI capabilities into applications 
                  to create more intelligent and user-friendly experiences.
                </p>
                
                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Backend Technologies</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Java & Spring Boot
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        REST API Development
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        MySQL & PostgreSQL
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        JSP & Servlets
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Frontend & Tools</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        React & React Native
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Docker & AWS
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        OpenAI API Integration
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Git & Version Control
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Values & Approach */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">My Approach</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-primary-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-primary-900 mb-2">Problem-Solving Focus</h4>
                    <p className="text-primary-800 text-sm">
                      I believe in understanding the root problem before jumping into solutions. 
                      Every line of code should serve a purpose and contribute to solving real-world challenges.
                    </p>
                  </div>
                  <div className="bg-primary-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-primary-900 mb-2">Continuous Learning</h4>
                    <p className="text-primary-800 text-sm">
                      Technology evolves rapidly, and I'm committed to staying current with new frameworks, 
                      tools, and best practices through continuous learning and hands-on experimentation.
                    </p>
                  </div>
                  <div className="bg-primary-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-primary-900 mb-2">User-Centered Design</h4>
                    <p className="text-primary-800 text-sm">
                      Great software isn't just about clean code—it's about creating experiences that 
                      users find intuitive, helpful, and enjoyable to interact with.
                    </p>
                  </div>
                  <div className="bg-primary-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-primary-900 mb-2">Collaborative Spirit</h4>
                    <p className="text-primary-800 text-sm">
                      My teaching experience has reinforced the importance of clear communication, 
                      knowledge sharing, and working effectively with diverse teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Want to learn more about my work or discuss a potential collaboration?
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

export default About;

