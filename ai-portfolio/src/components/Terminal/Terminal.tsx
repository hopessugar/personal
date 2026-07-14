import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { personalInfo } from '../../data/portfolio-data';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to Silky Vyas Terminal v1.0',
    'Type "help" to see available commands',
    '',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const commands: Record<string, () => string> = {
    help: () => `Available commands:
- about      : About me
- projects   : View my projects
- skills     : My technical skills
- experience : Work experience
- education  : Education background
- contact    : Contact information
- resume     : Download resume
- github     : Open GitHub profile
- linkedin   : Open LinkedIn profile
- clear      : Clear terminal
- whoami     : Who am I?`,
    
    about: () => `${personalInfo.name} - ${personalInfo.title}

${personalInfo.bio}

Location: ${personalInfo.location}
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}`,

    projects: () => `Featured Projects:
1. GSoC 2026 - Mifos Loan Summarizer
2. Krishi Mitra - 92.4% Crop Disease Detection
3. Vedaverse - <3% Hallucination AI System
4. Weed Detection - 89% Accuracy CV System

Type 'projects' in navigation to view details`,

    skills: () => `Technical Skills:
- Deep Learning: PyTorch, TensorFlow, CNNs, Transformers
- LLMs: LangChain, RAG, Prompt Engineering, Ollama
- Computer Vision: OpenCV, Object Detection
- Data: Pandas, NumPy, SQL, Power BI
- Infrastructure: FastAPI, React, Docker, Linux`,

    experience: () => `Work Experience:
1. GSoC 2026 Developer @ Mifos Initiative
2. AI Research Intern @ Tech Adaptive Pandit
3. Google Gemini Campus Ambassador Lead
4. IBM SkillsBuild - Data Analytics Intern`,

    education: () => `Education:
B.Tech in Artificial Intelligence
Geetanjali Institute of Technical Studies
CGPA: 9.42/10.0 (2023-2027)`,

    contact: () => `Contact Information:
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
GitHub: ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}`,

    resume: () => {
      window.open('/resume.pdf', '_blank');
      return 'Opening resume...';
    },

    github: () => {
      window.open(personalInfo.github, '_blank');
      return 'Opening GitHub profile...';
    },

    linkedin: () => {
      window.open(personalInfo.linkedin, '_blank');
      return 'Opening LinkedIn profile...';
    },

    clear: () => {
      setHistory([]);
      return '';
    },

    whoami: () => `${personalInfo.name}
AI/ML Engineer | GSoC 2026 Developer | Open Source Contributor
Building production-grade AI systems that drive real-world impact 🚀`,
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    setHistory((prev) => [...prev, `$ ${cmd}`]);

    if (trimmedCmd === '') {
      setHistory((prev) => [...prev, '']);
      return;
    }

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    const output = commands[trimmedCmd];
    if (output) {
      setHistory((prev) => [...prev, output(), '']);
    } else {
      setHistory((prev) => [
        ...prev,
        `Command not found: ${cmd}`,
        'Type "help" to see available commands',
        '',
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '~' && !isOpen) {
        e.preventDefault();
        // Trigger terminal open (handled by parent)
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <TerminalIcon size={16} />
                <span className="text-sm font-mono">terminal@silky-vyas</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Terminal Body */}
          <div className="bg-gray-900 p-6 h-[500px] overflow-y-auto font-mono text-sm">
            {history.map((line, i) => (
              <div
                key={i}
                className={`mb-1 ${
                  line.startsWith('$')
                    ? 'text-green-400'
                    : line.includes('not found') || line.includes('Error')
                    ? 'text-red-400'
                    : 'text-gray-300'
                }`}
              >
                {line}
              </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
              <span className="text-green-400">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-gray-300 outline-none"
                autoComplete="off"
                spellCheck="false"
              />
              <span className="terminal-cursor" />
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
