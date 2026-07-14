import { useState } from 'react';
import Hero from './components/Hero/Hero';
import Navbar from './components/Hero/Navbar';
import Projects from './components/ProjectCaseStudy/Projects';
import ProjectDetail from './components/ProjectCaseStudy/ProjectDetail';
import AIPlayground from './components/AIPlayground/AIPlayground';
import GitHubStats from './components/GitHubIntegration/GitHubStats';
import Experience from './components/Experience/Experience';
import Contact from './components/Hero/Contact';
import Terminal from './components/Terminal/Terminal';
import { projects } from './data/portfolio-data';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  
  const selectedProject = selectedProjectId 
    ? projects.find(p => p.id === selectedProjectId) 
    : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <Navbar onTerminalToggle={() => setIsTerminalOpen(prev => !prev)} />

      {/* Terminal */}
      <Terminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetail
            key={selectedProject.id}
            project={selectedProject}
            onBack={() => setSelectedProjectId(null)}
          />
        ) : (
          <>
            <Hero />
            <Projects onProjectSelect={setSelectedProjectId} />
            <AIPlayground />
            <Experience />
            <GitHubStats />
            <Contact />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
