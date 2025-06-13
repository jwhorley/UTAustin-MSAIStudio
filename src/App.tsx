import React, { useState, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFaq, setActiveFaq] = useState(null);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Listen for spline viewer load events
    const handleSplineLoad = () => {
      setSplineLoaded(true);
      console.log('Spline viewer loaded successfully');
    };

    const handleSplineError = (error: any) => {
      console.error('Spline viewer error:', error);
      setSplineLoaded(false);
    };

    // Add event listeners for spline viewer
    const splineViewer = document.querySelector('spline-viewer');
    if (splineViewer) {
      splineViewer.addEventListener('load', handleSplineLoad);
      splineViewer.addEventListener('error', handleSplineError);
    }

    // Handle scroll for animations
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (splineViewer) {
        splineViewer.removeEventListener('load', handleSplineLoad);
        splineViewer.removeEventListener('error', handleSplineError);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const faqData = [
    {
      id: 1,
      question: "What types of AI/ML projects are suitable for the 8-week program?",
      answer: "We focus on practical, industry-relevant projects that can deliver meaningful results within 8 weeks. This includes computer vision applications, natural language processing tasks, predictive modeling, recommendation systems, and data analysis projects. Our team works with you to scope projects appropriately, ensuring they're challenging enough for graduate-level work while being achievable within the timeframe. Projects should have clear success metrics and real business value."
    },
    {
      id: 2,
      question: "What is 'primary research' and why is it not included in scope for work on any student project?",
      answer: "Primary research is data obtained first-hand, or identifying and collecting necessary data, rather than relying on a pre-existing data sample. Project sponsors will be required to provide all data believed to be necessary to address the primary problem statement for the project. This is to ensure a successful and meaningful student experience; students may build upon the initial dataset and conduct secondary research, but it is not required."
    },
    {
      id: 3,
      question: "What level of involvement is expected from partner companies?",
      answer: "We expect active but manageable involvement from our industry partners. This includes an initial 2-hour project scoping session, weekly 1-hour check-ins during the 8-week period, and providing domain expertise when needed. Companies should designate a technical point of contact who can answer questions, provide feedback on progress, and guide strategic decisions. We handle all project management and student coordination, so your time investment is focused on high-value guidance rather than administrative tasks."
    },
    {
      id: 4,
      question: "What deliverables can companies expect at the end of the program?",
      answer: "Each project concludes with comprehensive deliverables including: complete source code with documentation, a detailed technical report explaining methodology and results, a presentation summarizing findings and recommendations, deployment instructions or deployed prototypes where applicable, and documentation for future development. Additionally, companies receive evaluation reports on student performance, making it easier to identify potential hires. All intellectual property agreements are established upfront to ensure clear ownership of project outcomes."
    }
  ];

  const toggleFaq = (faqId) => {
    setActiveFaq(activeFaq === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/UTLonghorn-avatar.png" 
                  alt="UT Longhorn Logo" 
                  className="w-8 h-8 object-contain rounded-md"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                UT Austin Computer & Data Science Online
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#overview" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">Overview</a>
              <a href="#process" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">Process</a>
              <a href="#benefits" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">Benefits</a>
              <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-black px-6 py-2 rounded-full font-semibold hover:from-orange-400 hover:to-amber-400 transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Spline Background - Full Width */}
        <div className="absolute inset-0 w-full h-full z-0">
          <spline-viewer 
            url="https://prod.spline.design/C8ddNfDYzztOsIgx/scene.splinecode"
            className="w-full h-full block"
            style={{
              width: '100vw',
              height: '100vh',
              minWidth: '100vw',
              minHeight: '100vh',
              maxWidth: 'none',
              maxHeight: 'none',
              display: 'block',
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: '1',
              backgroundColor: 'transparent',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Fallback animated background - shows if Spline doesn't load */}
        {!splineLoaded && (
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-full blur-3xl"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          </div>
        )}

        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 z-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-gray-900/70 border border-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Pilot Program • Available Fall 2025</span>
            </div>
          </div>

          <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="block text-white drop-shadow-2xl">Bridge</span>
            <span className="block bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
              AI Talent
            </span>
            <span className="block text-white drop-shadow-2xl">& Industry</span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Connect with elite MSAI graduate students for 8-week collaborative AI/ML projects. 
            <br className="hidden lg:block" />
            Solve real challenges while discovering your next hire.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:from-orange-400 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25">
              Start Your Project
            </button>
            <button className="border border-gray-300 text-white px-8 py-4 rounded-full font-semibold hover:border-orange-500 hover:text-orange-400 transition-all duration-300 backdrop-blur-sm bg-white/10">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center backdrop-blur-sm bg-black/30 rounded-lg p-4 border border-gray-700/50">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-2">8</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">Week Projects</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-black/30 rounded-lg p-4 border border-gray-700/50">
              <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent mb-2">100%</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">Graduate Level</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-black/30 rounded-lg p-4 border border-gray-700/50">
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">$0</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">Cost to Companies</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-black/30 rounded-lg p-4 border border-gray-700/50">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-2">∞</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">Potential Value</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              A practicum at the intersection of applied learning and industry solutions. Introducing UT Austin's Master's of Artificial Intelligence Studio
            </p>
          </div>

          <div className="relative">
            {/* Animated Flow Path - Desktop */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
              {/* Flow line from step 1 to 2 */}
              <div className="absolute top-1/2 left-1/3 w-32 h-px overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-transparent relative">
                  <div 
                    className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-75 animate-flow-right"
                    style={{
                      animation: 'flowRight 3s ease-in-out infinite',
                      animationDelay: '0.5s'
                    }}
                  ></div>
                </div>
                {/* Arrow */}
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1">
                  <div className="w-0 h-0 border-l-4 border-l-amber-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                </div>
              </div>

              {/* Flow line from step 2 to 3 */}
              <div className="absolute top-1/2 right-1/3 w-32 h-px overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 via-yellow-500 to-transparent relative">
                  <div 
                    className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-75"
                    style={{
                      animation: 'flowRight 3s ease-in-out infinite',
                      animationDelay: '1.5s'
                    }}
                  ></div>
                </div>
                {/* Arrow */}
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1">
                  <div className="w-0 h-0 border-l-4 border-l-yellow-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                </div>
              </div>

              {/* Floating particles */}
              <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-float-1"></div>
              <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full opacity-60 animate-float-2"></div>
              <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-float-3"></div>
            </div>

            {/* Mobile Flow Indicators */}
            <div className="lg:hidden absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500 via-amber-500 to-yellow-500 opacity-30"></div>
            <div className="lg:hidden absolute left-8 top-0 w-px h-full overflow-hidden">
              <div 
                className="w-full h-16 bg-gradient-to-b from-white via-orange-400 to-transparent opacity-75"
                style={{
                  animation: 'flowDown 4s ease-in-out infinite'
                }}
              ></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 relative z-10">
              {/* Step 1 */}
              <div className="relative group">
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-500 group-hover:transform group-hover:scale-105 relative overflow-hidden">
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl mb-6 group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300 relative">
                      <span className="text-2xl font-bold text-black">1</span>
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-2xl bg-orange-500/20 animate-ping opacity-0 group-hover:opacity-100"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Submit Challenge</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Share your AI/ML problem or use case. We'll work with you to scope a meaningful 8-week project that delivers real value.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm hover:border-amber-500/50 transition-all duration-500 group-hover:transform group-hover:scale-105 relative overflow-hidden">
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl mb-6 group-hover:shadow-lg group-hover:shadow-amber-500/25 transition-all duration-300 relative">
                      <span className="text-2xl font-bold text-black">2</span>
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-2xl bg-amber-500/20 animate-ping opacity-0 group-hover:opacity-100"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Get Matched</h3>
                    <p className="text-gray-400 leading-relaxed">
                      We carefully match your project with 4-8 MSAI graduate students whose skills and interests align perfectly with your needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm hover:border-yellow-500/50 transition-all duration-500 group-hover:transform group-hover:scale-105 relative overflow-hidden">
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl mb-6 group-hover:shadow-lg group-hover:shadow-yellow-500/25 transition-all duration-300 relative">
                      <span className="text-2xl font-bold text-black">3</span>
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-2xl bg-yellow-500/20 animate-ping opacity-0 group-hover:opacity-100"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Collaborate & Deliver</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Work closely with your team over 8 weeks. Regular updates, guidance sessions, and a complete solution delivered.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Centered subtitle below the tiles */}
            <div className="text-center mt-16">
              <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                A streamlined process designed to connect your AI challenges with brilliant minds
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Context Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="relative group cursor-default">
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm hover:border-orange-500/30 transition-all duration-500 group-hover:transform group-hover:scale-[1.02] relative overflow-hidden">
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    This collaborative, hands-on practicum pairs companies with talented, UT Austin Master's of Artificial Intelligence students who bring fresh perspectives and innovative thinking to drive meaningful solutions. With access to expert faculty, a robust <a href="https://cdso.utexas.edu/msai" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors duration-300 font-medium" target="_blank" rel="noopener noreferrer">curriculum</a>, and a supportive learning environment, our students deliver high-quality outcomes that meet your business needs.
                  </p>
                </div>

                {/* Floating accent elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Benefits Section */}
      <section id="benefits" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-white mb-8">Why Partner With Us?</h2>
              <p className="text-xl text-gray-400 mb-12">
                More than project delivery - we're building your future AI talent pipeline.
              </p>

              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-xl mb-8 border border-gray-800">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'talent', label: 'Talent' },
                  { id: 'results', label: 'Results' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-3 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-bold text-white mb-2">Try Before You Hire</h3>
                        <p className="text-gray-400">Evaluate student capabilities on real projects before making hiring decisions. Use Studio to bring ML engineering skills into your existing technical teams in a measured way.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-3 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-bold text-white mb-2">Zero Financial Risk</h3>
                        <p className="text-gray-400">No cost to participate in our pilot - just provide project guidance and feedback.</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'talent' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-3 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-bold text-white mb-2">Access Top Talent</h3>
                        <p className="text-gray-400">Connect with the next generation of AI/ML experts before they graduate.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-3 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-bold text-white mb-2">Graduate-Level Expertise</h3>
                        <p className="text-gray-400">Work with students who have advanced knowledge in cutting-edge AI/ML techniques from one of the first graduate-level AI Masters degree programs in the country.</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'results' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-3 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-bold text-white mb-2">Solve Real Problems</h3>
                        <p className="text-gray-400">Get actual AI/ML solutions delivered while supporting education and development.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-3 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-bold text-white mb-2">Measurable Impact</h3>
                        <p className="text-gray-400">Receive comprehensive documentation, code, and deployment-ready solutions.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Success Story Card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                    <span className="text-black font-bold">FS</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Austin, Tx based FinTech Startup</h3>
                    <p className="text-gray-400 text-sm">Series A Start-up</p>
                  </div>
                </div>
                
                <blockquote className="text-gray-300 italic mb-6 text-lg leading-relaxed">
                  "The MSAI team delivered a fraud detection model that exceeded our expectations. 
                  The quality of work was exceptional, and we hired two team members full-time."
                </blockquote>
                
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400 mb-1">2</div>
                    <div className="text-gray-500 text-sm">Full-time Hires</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-400 mb-1">95%</div>
                    <div className="text-gray-500 text-sm">Accuracy Achieved</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400 mb-12">
            Join forward-thinking companies partnering with MSAI Studio to solve AI challenges and discover talent.
          </p>

          <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-300">[placeholder@email.com]</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-gray-300">(512) 123-4567</span>
                  </div>
                </div>
              </div>
              
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-4">Next Steps</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center space-x-3">
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <span>Initial consultation (30 min)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <span>Project scoping session</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <span>Team matching & kickoff</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-black py-4 px-8 rounded-2xl font-bold text-lg hover:from-orange-400 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Get answers to common questions about the MSAI Studio program and partnership process
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqData.map((faq) => (
              <div
                key={faq.id}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  activeFaq === faq.id ? 'md:col-span-2' : ''
                }`}
                onClick={() => toggleFaq(faq.id)}
              >
                <div
                  className={`bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-500 relative overflow-hidden ${
                    activeFaq === faq.id
                      ? 'border-orange-500/70 bg-gray-900/70 transform scale-[1.02]'
                      : 'group-hover:transform group-hover:scale-105'
                  }`}
                >
                  {/* Glow effect when active */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 transition-opacity duration-500 ${
                      activeFaq === faq.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                    }`}
                  ></div>

                  <div className="relative z-10">
                    {/* Question Header */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-white pr-4 leading-tight">
                        {faq.question}
                      </h3>
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center transition-all duration-300 ${
                          activeFaq === faq.id
                            ? 'border-orange-500 bg-orange-500 rotate-45'
                            : 'group-hover:border-orange-400'
                        }`}
                      >
                        <div
                          className={`w-4 h-0.5 bg-current transition-all duration-300 ${
                            activeFaq === faq.id ? 'text-black' : 'text-gray-400'
                          }`}
                        ></div>
                        <div
                          className={`absolute w-0.5 h-4 bg-current transition-all duration-300 ${
                            activeFaq === faq.id ? 'text-black' : 'text-gray-400'
                          }`}
                        ></div>
                      </div>
                    </div>

                    {/* Answer Content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        activeFaq === faq.id
                          ? 'max-h-96 opacity-100 pb-2'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pt-4 border-t border-gray-700/50">
                        <p className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>

                    {/* Subtle indicator when closed */}
                    {activeFaq !== faq.id && (
                      <div className="mt-2">
                        <p className="text-gray-500 text-sm">Click to expand</p>
                      </div>
                    )}
                  </div>

                  {/* Floating accent elements */}
                  <div
                    className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-sm transition-opacity duration-500 ${
                      activeFaq === faq.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-6">
              Have more questions? We're here to help.
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-black px-8 py-3 rounded-full font-semibold hover:from-orange-400 hover:to-amber-400 transition-all duration-300 transform hover:scale-105">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/UTLonghorn-avatar.png" 
                  alt="UT Longhorn Logo" 
                  className="w-8 h-8 object-contain rounded-md"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                MSAI Studio
              </span>
            </div>
            <div className="text-gray-500 text-sm">
              © 2025 The University of Texas at Austin UTCS | Machine Learning Lab. Bridging AI talent and industry needs.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;