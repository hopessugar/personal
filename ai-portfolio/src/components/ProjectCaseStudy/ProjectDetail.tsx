import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Target, Lightbulb, Zap, Award, AlertTriangle, BookOpen } from 'lucide-react';
import { Project } from '../../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  return (
    <motion.div
      className="min-h-screen bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(96, 165, 250, 0.1) 0%, transparent 50%)',
            backgroundSize: '50% 50%',
          }}
        />

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <motion.button
            onClick={onBack}
            className="mb-8 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white font-medium flex items-center gap-2 w-fit hover:bg-white/20 transition-colors"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
            Back to Projects
          </motion.button>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/50 rounded-full text-sm font-medium text-purple-300">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-4 py-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/50 rounded-full text-sm font-medium text-yellow-300">
                  ⭐ Featured
                </span>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {project.title}
            </h1>
            <p className="text-2xl text-gray-300 mb-8 max-w-3xl">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-4">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white font-medium flex items-center gap-2 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                  View on GitHub
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={20} />
                  Live Demo
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Metrics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 -mt-32 mb-16 relative z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {project.metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl p-6 backdrop-blur-xl border border-white/20"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
              <div className="text-3xl font-bold text-gradient mb-2">{metric.value}</div>
              <div className="text-xs text-gray-500">{metric.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Problem Statement */}
        <Section
          icon={Target}
          title="The Problem"
          iconColor="text-red-400"
          delay={0.5}
        >
          <p className="text-lg text-gray-300 leading-relaxed">{project.problem}</p>
        </Section>

        {/* Solution */}
        <Section
          icon={Lightbulb}
          title="The Solution"
          iconColor="text-yellow-400"
          delay={0.6}
        >
          <p className="text-lg text-gray-300 leading-relaxed mb-6">{project.solution}</p>
          
          {/* Technologies */}
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={i}
                  className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </Section>

        {/* Architecture */}
        {project.architecture && (
          <Section
            icon={Zap}
            title="System Architecture"
            iconColor="text-blue-400"
            delay={0.7}
          >
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              {project.architecture.description}
            </p>

            <div className="space-y-4">
              {project.architecture.layers.map((layer, i) => (
                <motion.div
                  key={i}
                  className="glass rounded-xl p-6 border-l-4 border-blue-400"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <h4 className="text-xl font-bold text-white mb-3">{layer.name}</h4>
                  <p className="text-gray-400 mb-4">{layer.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {layer.components.map((component, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-400"
                      >
                        {component}
                      </span>
                    ))}
                  </div>

                  {/* Arrow connecting layers */}
                  {i < project.architecture!.layers.length - 1 && (
                    <motion.div
                      className="flex justify-center mt-4"
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="text-blue-400 text-2xl">↓</div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* Impact */}
        <Section
          icon={Award}
          title="Impact & Results"
          iconColor="text-green-400"
          delay={0.8}
        >
          <p className="text-lg text-gray-300 leading-relaxed">{project.impact}</p>
        </Section>

        {/* Challenges */}
        <Section
          icon={AlertTriangle}
          title="Challenges & Solutions"
          iconColor="text-orange-400"
          delay={0.9}
        >
          <div className="space-y-4">
            {project.challenges.map((challenge, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 glass rounded-xl p-5"
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-400 font-bold">{i + 1}</span>
                </div>
                <p className="text-gray-300 flex-1">{challenge}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Learnings */}
        <Section
          icon={BookOpen}
          title="Key Learnings"
          iconColor="text-purple-400"
          delay={1.0}
        >
          <div className="space-y-4">
            {project.learnings.map((learning, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 glass rounded-xl p-5"
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-2xl">💡</div>
                <p className="text-gray-300 flex-1">{learning}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Timeline */}
        <Section
          icon={Target}
          title="Project Timeline"
          iconColor="text-cyan-400"
          delay={1.1}
        >
          <div className="flex items-center gap-4 text-gray-300">
            <div className="glass rounded-xl px-6 py-4">
              <div className="text-sm text-gray-400 mb-1">Started</div>
              <div className="text-xl font-bold">{project.startDate}</div>
            </div>
            <div className="flex-1 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
            <div className="glass rounded-xl px-6 py-4">
              <div className="text-sm text-gray-400 mb-1">
                {project.endDate ? 'Completed' : 'Status'}
              </div>
              <div className="text-xl font-bold">
                {project.endDate || 'Ongoing'}
              </div>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <motion.div
          className="mt-16 glass rounded-2xl p-12 text-center"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Want to learn more about this project?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            I'd love to discuss the technical details, challenges, and lessons learned from this project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl text-white font-medium flex items-center gap-2 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                View Source Code
              </motion.a>
            )}
            <motion.button
              onClick={onBack}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to All Projects
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface SectionProps {
  icon: any;
  title: string;
  iconColor: string;
  delay: number;
  children: React.ReactNode;
}

function Section({ icon: Icon, title, iconColor, delay, children }: SectionProps) {
  return (
    <motion.div
      className="mb-16"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center ${iconColor}`}>
          <Icon size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>
      <div className="pl-15">
        {children}
      </div>
    </motion.div>
  );
}
