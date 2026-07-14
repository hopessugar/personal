import { motion } from 'framer-motion';
import { useState } from 'react';
import { projects } from '../../data/portfolio-data';
import { Github, ExternalLink, TrendingUp, Calendar, Tag } from 'lucide-react';

interface ProjectsProps {
  onProjectSelect?: (projectId: string) => void;
}

export default function Projects({ onProjectSelect }: ProjectsProps) {
  const [filter, setFilter] = useState<string>('all');
  
  const categories = ['all', 'AI/ML', 'Full Stack', 'Research', 'Open Source'];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 px-6 bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-5" />
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
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
            className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            💼 Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Production-grade AI/ML systems with measurable real-world impact.
            Research-grade rigor, built for real users.
          </p>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass rounded-2xl overflow-hidden cursor-pointer group hover:shadow-2xl hover:shadow-purple-500/20 transition-all"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => onProjectSelect?.(project.id)}
            >
              {/* Project Header */}
              <div className="relative h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/20">
                    {project.category}
                  </span>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className="px-3 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-yellow-400 border border-yellow-500/50 flex items-center gap-1"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⭐ Featured
                    </motion.div>
                  </div>
                )}

                {/* Decorative Elements */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-32 h-32 border border-white/10 rounded-full" />
                </motion.div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{project.tagline}</p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {project.metrics.slice(0, 4).map((metric, i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
                      <div className="text-lg font-bold text-purple-400">{metric.value}</div>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 5).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-xs text-purple-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{project.startDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag size={14} />
                    <span>{project.category}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      onProjectSelect?.(project.id);
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <TrendingUp size={16} />
                    View Case Study
                  </motion.button>
                  
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={18} />
                    </motion.a>
                  )}
                  
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={18} />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Summary */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { label: 'Total Projects', value: projects.length, icon: '🚀' },
            { label: 'Featured', value: projects.filter(p => p.featured).length, icon: '⭐' },
            { label: 'Technologies', value: '30+', icon: '💻' },
            { label: 'Impact', value: '1000+ Users', icon: '🌟' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl p-6 text-center"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
