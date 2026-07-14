import { motion } from 'framer-motion';
import { useState } from 'react';
import { Brain, FileText, Shield, Image, FileCheck, Sparkles } from 'lucide-react';
import ChatDemo from './demos/ChatDemo';
import LoanSummarizerDemo from './demos/LoanSummarizerDemo';
import FakeNewsDemo from './demos/FakeNewsDemo';

export default function AIPlayground() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const demos = [
    {
      id: 'chat',
      title: 'AI Assistant',
      description: 'Chat with an AI assistant powered by large language models',
      icon: Brain,
      available: true,
      component: ChatDemo,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'loan',
      title: 'Loan Summarizer',
      description: 'Intelligent loan agreement analysis with risk detection',
      icon: FileText,
      available: true,
      component: LoanSummarizerDemo,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'fakenews',
      title: 'Fake News Detector',
      description: 'Detect misinformation using NLP and fact-checking',
      icon: Shield,
      available: true,
      component: FakeNewsDemo,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 'image',
      title: 'Image Classifier',
      description: 'Classify images using computer vision models',
      icon: Image,
      available: false,
      gradient: 'from-green-500 to-teal-500',
    },
    {
      id: 'summarize',
      title: 'Text Summarizer',
      description: 'Generate concise summaries of long documents',
      icon: FileCheck,
      available: false,
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'experiments',
      title: 'Future Experiments',
      description: 'More AI demos coming soon...',
      icon: Sparkles,
      available: false,
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  const ActiveComponent = demos.find((d) => d.id === activeDemo)?.component;

  return (
    <section id="ai-playground" className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            🚀 Interactive Demos
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            AI Playground
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience my AI projects firsthand. These interactive demos showcase
            production-grade AI systems built with cutting-edge technologies.
          </p>
        </motion.div>

        {/* Demo Grid */}
        {!activeDemo && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {demos.map((demo, index) => (
              <motion.div
                key={demo.id}
                className={`relative glass rounded-2xl p-6 cursor-pointer overflow-hidden group ${
                  !demo.available ? 'opacity-60' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: demo.available ? 1 : 0.6, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={demo.available ? { scale: 1.03, y: -5 } : {}}
                onClick={() => demo.available && setActiveDemo(demo.id)}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${demo.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${demo.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <demo.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {demo.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {demo.description}
                </p>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  {demo.available ? (
                    <>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-green-400 font-medium">
                        Try Now
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <span className="text-xs text-yellow-400 font-medium">
                        Coming Soon
                      </span>
                    </>
                  )}
                </div>

                {/* Hover Arrow */}
                {demo.available && (
                  <motion.div
                    className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <span className="text-2xl">→</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Active Demo */}
        {activeDemo && ActiveComponent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={() => setActiveDemo(null)}
              className="mb-6 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium flex items-center gap-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Playground
            </motion.button>
            <ActiveComponent />
          </motion.div>
        )}

        {/* Info Box */}
        {!activeDemo && (
          <motion.div
            className="glass rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-gray-400 mb-4">
              💡 <strong className="text-white">Note:</strong> These are interactive
              demonstrations with simulated responses. In production, they connect to
              real AI models and APIs.
            </p>
            <p className="text-sm text-gray-500">
              Built with FastAPI, React, LangChain, and state-of-the-art LLMs
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
