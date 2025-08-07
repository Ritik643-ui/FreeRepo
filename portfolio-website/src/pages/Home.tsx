import React from 'react';

const Home: React.FC = () => {
  const handleResumeDownload = () => {
    // Create a dummy resume download - in a real app, this would link to an actual PDF
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Ritik_Sharma_Resume.pdf';
    // For demo purposes, we'll just show an alert
    alert('Resume download would start here. Please add your actual resume PDF to the public folder.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
         {/* Profile Image */}
<div className="mb-8">
  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-primary-100">
    <img
      src="/profilepic/profilepic.png"
      alt="Ritik Sharma"
      className="object-cover w-full h-full"
    />
  </div>
</div>

          {/* Name and Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Ritik Sharma
          </h1>
          <h2 className="text-2xl md:text-3xl text-primary-600 font-semibold mb-8">
            Software Developer
          </h2>

          {/* Bio */}
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              A passionate software developer from Nepal, currently based in California. 
              I specialize in full-stack development and have a keen interest in building 
              AI-powered applications that solve real-world problems. With experience in 
              Java, Spring Boot, React, and modern web technologies, I enjoy creating 
              scalable and user-friendly applications.
            </p>
          </div>

          {/* Resume Download Button */}
          <div className="mb-16">
            <button
              onClick={handleResumeDownload}
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary-600 mb-2">4+</h3>
              <p className="text-gray-700">Projects Completed</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary-600 mb-2">BIM</h3>
              <p className="text-gray-700">Bachelor's Degree</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary-600 mb-2">3</h3>
              <p className="text-gray-700">Certifications</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary-600 mb-2">2+</h3>
              <p className="text-gray-700">Years Experience</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16">
            <p className="text-lg text-gray-600 mb-6">
              Interested in working together?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-600 hover:text-white transition-colors duration-200"
            >
              Get In Touch
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
