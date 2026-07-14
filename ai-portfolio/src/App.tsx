import { useState, useEffect, useRef } from 'react';
import { personalInfo, projects, experiences, skills } from './data/portfolio-data';
import Preloader from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({ hero: true });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Intersection Observer for scroll-triggered section animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '-50px'
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <div className="min-h-screen bg-white text-black relative overflow-hidden">
          {/* Animated cursor follower */}
          <div
            className="fixed w-4 h-4 bg-dusty-pink rounded-full pointer-events-none z-50 transition-transform duration-200"
            style={{
              left: `${(mousePosition.x + 1) * 50}%`,
              top: `${(mousePosition.y + 1) * 50}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Hero */}
          <section id="hero" className={`min-h-screen flex items-center justify-center bg-white relative overflow-hidden transition-all duration-1000 ${visibleSections['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            {/* Animated mesh gradient background */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-dusty-pink/10 via-transparent to-dusty-pink/5 animate-gradient" />
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-dusty-pink/5 via-transparent to-dusty-pink/10 animate-gradient" style={{ animationDelay: '2s', animationDuration: '8s' }} />
            </div>

            {/* Dynamic animated background orbs */}
            <div 
              className="absolute top-20 right-20 w-96 h-96 bg-dusty-pink/20 rounded-full blur-3xl animate-float-3d"
              style={{ transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)` }}
            />
            <div 
              className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-dusty-pink/15 rounded-full blur-3xl animate-morph"
              style={{ 
                transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
                animationDelay: '2s' 
              }}
            />
            <div 
              className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-dusty-pink/10 rounded-full blur-3xl animate-pulse-slow"
              style={{ transform: `translate(-50%, -50%) translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` }}
            />

            {/* Floating geometric shapes with 3D effect */}
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-3d"
                style={{
                  left: `${5 + i * 7}%`,
                  top: `${5 + (i % 4) * 25}%`,
                  width: `${30 + i * 8}px`,
                  height: `${30 + i * 8}px`,
                  background: i % 2 === 0 
                    ? 'linear-gradient(135deg, rgba(212, 165, 165, 0.1), rgba(212, 165, 165, 0.05))' 
                    : 'linear-gradient(135deg, rgba(212, 165, 165, 0.08), rgba(212, 165, 165, 0.03))',
                  borderRadius: i % 4 === 0 ? '50%' : i % 4 === 1 ? '30%' : '15px',
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${6 + i * 1.5}s`,
                  boxShadow: '0 8px 32px rgba(212, 165, 165, 0.15)',
                }}
              />
            ))}

            {/* Glowing particles */}
            {[...Array(25)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-dusty-pink rounded-full animate-float opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${8 + Math.random() * 4}s`,
                  boxShadow: '0 0 10px rgba(212, 165, 165, 0.8), 0 0 20px rgba(212, 165, 165, 0.4)',
                }}
              />
            ))}
            
            <div 
              className="max-w-6xl mx-auto px-6 text-center relative z-10"
              style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            >
              <div className="mb-6 animate-scale-in">
                <span className="inline-block px-6 py-2 bg-dusty-pink text-white rounded-full text-sm font-medium mb-6 hover:scale-110 transition-all cursor-pointer shadow-lg animate-glow">
                  AI/ML Engineer • GSoC 2026 Developer
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-6 text-black leading-tight animate-slide-in-left relative">
                {personalInfo.name}
                <div className="absolute -inset-4 bg-dusty-pink/5 blur-3xl -z-10 animate-pulse-slow" />
              </h1>
              
              <div className="h-1 w-32 bg-dusty-pink mx-auto mb-8 rounded-full animate-slide-in-right shadow-lg" />

              <p className="text-xl md:text-2xl text-charcoal max-w-3xl mx-auto mb-12 font-light leading-relaxed animate-fade-in">
                {personalInfo.tagline}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12 animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" 
                   className="group px-8 py-3 bg-dusty-pink hover:bg-black text-white rounded-lg font-medium transition-all hover:scale-110 hover:shadow-2xl relative overflow-hidden btn-magnetic">
                  <span className="relative z-10">GitHub</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" 
                   className="group px-8 py-3 bg-black hover:bg-dusty-pink text-white rounded-lg font-medium transition-all hover:scale-110 hover:shadow-2xl relative overflow-hidden btn-magnetic">
                  <span className="relative z-10">LinkedIn</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
                <a href={`mailto:${personalInfo.email}`} 
                   className="group px-8 py-3 border-2 border-dusty-pink text-dusty-pink hover:bg-dusty-pink hover:text-white rounded-lg font-medium transition-all hover:scale-110 hover:shadow-2xl relative overflow-hidden btn-magnetic">
                  <span className="relative z-10">Contact Me</span>
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto perspective-card">
                {[
                  { icon: '🚀', value: '15+', label: 'Projects', color: 'from-dusty-pink/10 to-white' },
                  { icon: '🎯', value: '92.4%', label: 'Accuracy', color: 'from-white to-dusty-pink/10' },
                  { icon: '💻', value: 'GSoC', label: '2026', color: 'from-dusty-pink/10 to-white' },
                  { icon: '🌟', value: '80+', label: 'Users Impacted', color: 'from-white to-dusty-pink/10' },
                ].map((stat, i) => (
                  <div 
                    key={i} 
                    className={`group bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-2xl p-6 border-2 border-black/5 hover:border-dusty-pink transition-all hover:scale-125 hover:-translate-y-3 shadow-lg hover:shadow-2xl cursor-pointer neu-card`}
                    style={{ 
                      animationDelay: `${i * 0.1}s`,
                      transform: `translateZ(${i * 10}px)`,
                    }}>
                    <div className="text-5xl mb-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">{stat.icon}</div>
                    <div className="text-3xl font-serif font-bold text-dusty-pink mb-1 group-hover:scale-110 transition-transform">{stat.value}</div>
                    <div className="text-sm text-charcoal font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className={`py-24 px-6 bg-white relative overflow-hidden transition-all duration-1000 delay-200 ${visibleSections['projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            {/* Dynamic animated background with mesh gradient */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-dusty-pink/10 animate-float-3d blur-3xl"
                  style={{
                    width: `${150 + i * 80}px`,
                    height: `${150 + i * 80}px`,
                    left: `${i * 15}%`,
                    top: `${(i % 3) * 30}%`,
                    animationDelay: `${i * 1.2}s`,
                    animationDuration: `${8 + i * 2}s`,
                  }}
                />
              ))}
            </div>

            {/* Floating particle system */}
            {[...Array(30)].map((_, i) => (
              <div
                key={`proj-particle-${i}`}
                className="absolute w-1 h-1 bg-dusty-pink/40 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                }}
              />
            ))}

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16 animate-slide-in-left">
                <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-black relative inline-block">
                  Featured Projects
                  <div className="absolute -bottom-3 left-0 right-0 h-1 bg-dusty-pink" />
                  <div className="absolute -inset-4 bg-dusty-pink/5 blur-2xl -z-10" />
                </h2>
                <p className="text-lg text-charcoal max-w-2xl mx-auto font-light mt-8">
                  Production-grade AI/ML systems with measurable real-world impact
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.slice(0, 4).map((project, i) => (
                  <div 
                    key={project.id} 
                    className="group relative perspective-card"
                    style={{ animationDelay: `${i * 0.15}s` }}>
                    
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-1 bg-dusty-pink rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500" />
                    
                    {/* Main card */}
                    <div className="relative bg-white rounded-2xl p-8 border-2 border-black/5 hover:border-dusty-pink transition-all hover:scale-[1.03] hover:-translate-y-2 shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden">
                      
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 bg-dusty-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <span className="px-4 py-1.5 bg-dusty-pink text-white rounded-full text-xs font-bold group-hover:scale-110 transition-transform shadow-md">
                            {project.category}
                          </span>
                          {project.featured && (
                            <span className="px-4 py-1.5 bg-black text-white rounded-full text-xs font-bold animate-pulse shadow-md">
                              ⭐ Featured
                            </span>
                          )}
                        </div>

                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-black mb-3 group-hover:text-dusty-pink transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-charcoal/80 mb-6 leading-relaxed line-clamp-2">{project.tagline}</p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {project.metrics.slice(0, 2).map((metric, j) => (
                            <div key={j} className="bg-white rounded-xl p-4 border-2 border-black/5 hover:border-dusty-pink hover:scale-105 transition-all shadow-sm hover:shadow-md">
                              <div className="text-xs text-charcoal/60 mb-1 font-medium">{metric.label}</div>
                              <div className="text-xl font-serif font-bold text-dusty-pink">{metric.value}</div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 5).map((tech, j) => (
                            <span 
                              key={j} 
                              className="px-3 py-1.5 bg-white border-2 border-black/10 text-charcoal rounded-lg text-xs font-medium hover:bg-dusty-pink hover:text-white hover:border-dusty-pink transition-all cursor-pointer hover:scale-110 shadow-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-dusty-pink/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience - ENHANCED WITH GSoC SPOTLIGHT */}
          <section 
            id="experience"
            className={`py-24 px-6 bg-white relative overflow-hidden transition-all duration-1000 delay-300 ${visibleSections['experience'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            {/* Decorative 3D elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-dusty-pink/20 to-soft-pink/30 rounded-full blur-3xl animate-pulse-slow opacity-60" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-light-pink/30 to-dusty-pink/20 rounded-full blur-3xl animate-float opacity-50" />
            
            {/* Floating particles */}
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-dusty-pink/30 rounded-full animate-float"
                style={{
                  left: `${5 + i * 6}%`,
                  top: `${10 + (i % 5) * 20}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${6 + i * 0.5}s`,
                }}
              />
            ))}
            
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16 animate-slide-in-right">
                <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-black relative inline-block">
                  Experience
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-dusty-pink to-transparent" />
                </h2>
                <p className="text-lg text-charcoal max-w-2xl mx-auto font-light mt-8">
                  Building impactful AI systems at scale
                </p>
              </div>

              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <div 
                    key={exp.id}
                    data-animate
                    className={`group relative ${exp.featured ? 'mb-12' : ''}`}
                    style={{ animationDelay: `${i * 0.15}s` }}>
                    
                    {/* FEATURED GSoC CARD WITH SPECIAL STYLING */}
                    {exp.featured ? (
                      <div className="relative">
                        {/* Glowing border effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-dusty-pink via-soft-pink to-dusty-pink rounded-3xl blur-lg opacity-75 group-hover:opacity-100 animate-pulse"></div>
                        
                        {/* Main card with glassmorphism */}
                        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-10 border-4 border-dusty-pink shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden">
                          {/* Animated gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-dusty-pink/5 via-soft-pink/10 to-light-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Featured badge */}
                          <div className="absolute -right-12 top-8 rotate-45 bg-gradient-to-r from-dusty-pink to-soft-pink text-white px-16 py-2 text-sm font-bold shadow-lg">
                            ⭐ FEATURED
                          </div>

                          {/* Google logo placeholder */}
                          <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-dusty-pink to-soft-pink rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl group-hover:scale-110 transition-transform">
                            GSoC
                          </div>

                          <div className="relative z-10">
                            {/* Header with enhanced styling */}
                            <div className="flex flex-col mb-8">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="inline-block px-6 py-2 bg-gradient-to-r from-dusty-pink to-soft-pink text-white rounded-full text-sm font-bold tracking-wide shadow-lg group-hover:scale-110 transition-transform">
                                  {exp.startDate} - {exp.endDate}
                                </span>
                                <span className="inline-block px-4 py-2 bg-gradient-to-r from-soft-pink/20 to-light-pink/20 border-2 border-dusty-pink text-dusty-pink rounded-full text-xs font-bold">
                                  🌐 {exp.location}
                                </span>
                              </div>

                              <h3 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-dusty-pink via-soft-pink to-dusty-pink mb-3 group-hover:scale-[1.02] transition-transform">
                                {exp.title}
                              </h3>
                              <p className="text-xl font-bold text-charcoal mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 bg-dusty-pink rounded-full animate-pulse"></span>
                                {exp.company}
                              </p>
                            </div>

                            {/* Description with enhanced typography */}
                            <div className="bg-gradient-to-br from-pale-pink/30 to-light-pink/20 rounded-2xl p-6 mb-6 border-2 border-dusty-pink/30">
                              <p className="text-charcoal leading-relaxed text-base">
                                {exp.description}
                              </p>
                            </div>

                            {/* Achievements with bullet points */}
                            <div className="mb-6 space-y-3">
                              <h4 className="text-lg font-bold text-dusty-pink mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-dusty-pink rounded-full"></span>
                                Key Achievements
                              </h4>
                              {exp.achievements?.slice(0, 4).map((achievement, j) => (
                                <div key={j} className="flex items-start gap-3 group/item">
                                  <div className="mt-2 w-2 h-2 rounded-full bg-dusty-pink group-hover/item:scale-150 transition-transform flex-shrink-0"></div>
                                  <p className="text-charcoal/90 text-sm leading-relaxed group-hover/item:text-charcoal transition-colors">
                                    {achievement}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* Technologies with enhanced pills */}
                            <div className="flex flex-wrap gap-3">
                              <span className="text-sm font-bold text-med-grey">Tech Stack:</span>
                              {exp.technologies?.map((tech, j) => (
                                <span 
                                  key={j} 
                                  className="px-4 py-2 bg-gradient-to-r from-dusty-pink to-soft-pink text-white rounded-xl text-xs font-medium shadow-md hover:scale-110 hover:shadow-xl transition-all cursor-pointer">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Decorative corner accents */}
                          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-dusty-pink rounded-tl-3xl opacity-30"></div>
                          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-dusty-pink rounded-br-3xl opacity-30"></div>
                        </div>
                      </div>
                    ) : (
                      /* REGULAR EXPERIENCE CARDS */
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-light-pink hover:border-dusty-pink transition-all hover:scale-[1.01] hover:shadow-xl cursor-pointer relative overflow-hidden group/card">
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-pale-pink/0 via-pale-pink/30 to-pale-pink/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                            <div className="flex-1">
                              <h3 className="text-2xl md:text-3xl font-serif font-bold text-black mb-2 group-hover/card:text-dusty-pink transition-colors">
                                {exp.title}
                              </h3>
                              <p className="text-lg text-dusty-pink font-semibold mb-2">{exp.company}</p>
                              <p className="text-med-grey text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-dusty-pink rounded-full"></span>
                                {exp.location}
                              </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                              <span className="inline-block px-4 py-2 bg-dusty-pink text-white rounded-full text-sm group-hover/card:scale-110 transition-transform shadow-md">
                                {exp.startDate} - {exp.endDate}
                              </span>
                            </div>
                          </div>

                          <p className="text-charcoal mb-6 leading-relaxed">{exp.description}</p>

                          {/* Achievements for other experiences */}
                          {exp.achievements && exp.achievements.length > 0 && (
                            <div className="mb-6 space-y-2">
                              {exp.achievements.slice(0, 3).map((achievement, j) => (
                                <div key={j} className="flex items-start gap-2">
                                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-dusty-pink flex-shrink-0"></div>
                                  <p className="text-charcoal/80 text-sm leading-relaxed">{achievement}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2">
                            {exp.technologies?.slice(0, 6).map((tech, j) => (
                              <span 
                                key={j} 
                                className="px-3 py-1 bg-pale-pink border border-dusty-pink/30 rounded-lg text-xs text-dusty-pink hover:bg-dusty-pink hover:text-white transition-all cursor-pointer hover:scale-110">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Skills */}
          <section id="skills" className={`py-24 px-6 bg-gradient-to-b from-white via-dusty-pink/5 to-white relative overflow-hidden transition-all duration-1000 delay-400 ${visibleSections['skills'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-12 grid-rows-12 w-full h-full">
                {[...Array(144)].map((_, i) => (
                  <div
                    key={i}
                    className="border border-black/10 hover:bg-dusty-pink/10 transition-all duration-300"
                    style={{
                      animationDelay: `${i * 0.01}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Floating orbs */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`skill-orb-${i}`}
                className="absolute rounded-full bg-dusty-pink/8 blur-3xl animate-morph"
                style={{
                  width: `${200 + i * 50}px`,
                  height: `${200 + i * 50}px`,
                  left: `${i * 20}%`,
                  top: `${(i % 2) * 50}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${10 + i}s`,
                }}
              />
            ))}

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16 animate-scale-in">
                <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-black relative inline-block">
                  Skills & Technologies
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-dusty-pink rounded-full" />
                  <div className="absolute -inset-4 bg-dusty-pink/5 blur-2xl -z-10 animate-pulse-slow" />
                </h2>
                <p className="text-lg text-charcoal max-w-2xl mx-auto font-light mt-8">
                  Mastering cutting-edge technologies to build intelligent systems
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {skills.map((skill, i) => (
                  <div 
                    key={i} 
                    className="group relative bg-white rounded-xl p-4 text-center hover:scale-125 hover:-translate-y-4 transition-all duration-500 border-2 border-black/5 hover:border-dusty-pink shadow-md hover:shadow-2xl cursor-pointer overflow-hidden"
                    style={{ 
                      animationDelay: `${i * 0.02}s`,
                      transitionDelay: `${i * 0.01}s`,
                    }}>
                    
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-dusty-pink rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    
                    <div className="relative z-10">
                      <div className="text-3xl mb-2 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500">
                        {skill.level === 'Mastered' ? '⭐' : 
                         skill.level === 'Using' ? '🚀' : 
                         skill.level === 'Learning' ? '📚' : '🎯'}
                      </div>
                      <div className="font-bold text-black text-sm mb-2 group-hover:text-dusty-pink transition-colors">{skill.name}</div>
                      <div className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${
                        skill.level === 'Mastered' ? 'bg-dusty-pink text-white shadow-md group-hover:scale-110 group-hover:shadow-lg' :
                        skill.level === 'Using' ? 'bg-black text-white shadow-md group-hover:scale-110 group-hover:shadow-lg' :
                        skill.level === 'Learning' ? 'bg-white border-2 border-dusty-pink text-dusty-pink shadow-sm group-hover:scale-110 group-hover:shadow-md' :
                        'bg-white border-2 border-black text-black shadow-sm group-hover:scale-110 group-hover:shadow-md'
                      }`}>
                        {skill.level}
                      </div>
                    </div>

                    {/* Particle burst on hover */}
                    {[...Array(4)].map((_, j) => (
                      <div
                        key={`particle-${j}`}
                        className="absolute w-1 h-1 bg-dusty-pink rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(-50%, -50%) translate(${Math.cos(j * Math.PI / 2) * 30}px, ${Math.sin(j * Math.PI / 2) * 30}px)`,
                          transitionDelay: `${j * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className={`py-24 px-6 bg-dusty-pink text-white relative overflow-hidden transition-all duration-1000 delay-500 ${visibleSections['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            {/* Animated mesh gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-dusty-pink/50 via-transparent to-soft-pink/50 animate-gradient" />
            
            {/* Floating animated shapes */}
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-3d"
                style={{
                  width: `${40 + i * 15}px`,
                  height: `${40 + i * 15}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 3 === 0 
                    ? 'radial-gradient(circle, rgba(255, 255, 255, 0.15), transparent)'
                    : i % 3 === 1
                    ? 'radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent)'
                    : 'radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent)',
                  borderRadius: i % 2 === 0 ? '50%' : '30%',
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${6 + i * 0.5}s`,
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
                }}
              />
            ))}

            {/* Glowing particles */}
            {[...Array(40)].map((_, i) => (
              <div
                key={`contact-particle-${i}`}
                className="absolute w-0.5 h-0.5 bg-white rounded-full animate-float opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 3}s`,
                  boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                }}
              />
            ))}

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 animate-scale-in relative" style={{ 
                textShadow: '0 1px 2px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)' 
              }}>
                Let's Build Something Amazing
                <div className="absolute -inset-6 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl -z-10 animate-pulse-slow" />
              </h2>
              <div className="h-1 w-24 bg-white mx-auto mb-8 rounded-full shadow-lg" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 2px 8px rgba(0,0,0,0.3)' }} />

              <p className="text-xl mb-12 font-light max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ 
                textShadow: '0 1px 2px rgba(0,0,0,0.4), 0 2px 3px rgba(0,0,0,0.2)' 
              }}>
                Open to collaborations, exciting AI projects, and opportunities to make a meaningful impact
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-in-left">
                <a href={`mailto:${personalInfo.email}`} 
                   className="group px-8 py-4 bg-white text-dusty-pink hover:scale-110 rounded-xl font-medium transition-all hover:shadow-2xl relative overflow-hidden btn-magnetic">
                  <span className="relative z-10 font-bold">{personalInfo.email}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pale-pink to-light-pink translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </a>
                <a href={`tel:${personalInfo.phone}`} 
                   className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-dusty-pink rounded-xl font-medium transition-all hover:scale-110 hover:shadow-2xl btn-magnetic" 
                   style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5), 0 2px 3px rgba(0,0,0,0.3)' }}>
                  <span className="relative z-10 font-bold">{personalInfo.phone}</span>
                </a>
              </div>

              <div className="flex justify-center gap-6 mb-12 animate-slide-in-right">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" 
                   className="group px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/40 rounded-xl text-white transition-all hover:scale-110 hover:shadow-xl btn-magnetic relative overflow-hidden" 
                   style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5), 0 2px 3px rgba(0,0,0,0.3)' }}>
                  <span className="relative z-10 font-bold">GitHub</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" 
                   className="group px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/40 rounded-xl text-white transition-all hover:scale-110 hover:shadow-xl btn-magnetic relative overflow-hidden" 
                   style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5), 0 2px 3px rgba(0,0,0,0.3)' }}>
                  <span className="relative z-10 font-bold">LinkedIn</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
              </div>

              <div className="pt-12 border-t border-white/30">
                <p className="text-white/95 font-light mb-2" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
                  © 2026 {personalInfo.name}. Crafted with precision & passion.
                </p>
                <p className="text-white/80 text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
                  Built with React, TypeScript & Tailwind CSS
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
