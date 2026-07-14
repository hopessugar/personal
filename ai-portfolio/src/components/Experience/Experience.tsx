import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experiences, skills } from '../../data/portfolio-data';

export default function Experience() {
  const skillCategories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-5" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Experience Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.span
              className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              💼 Career Journey
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Experience
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                className={`relative mb-12 ${
                  i % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                }`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900" />

                <motion.div
                  className="glass rounded-xl p-6 ml-8 md:ml-0 md:max-w-xl"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Calendar size={14} />
                    <span>{exp.startDate} - {exp.endDate}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                  <div className="flex items-center gap-2 text-blue-400 mb-4">
                    <Briefcase size={16} />
                    <span className="font-medium">{exp.company}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <MapPin size={14} />
                    <span>{exp.location}</span>
                  </div>

                  <p className="text-gray-300 mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.slice(0, 5).map((tech, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          id="skills"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.span
              className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              ⚡ Technical Arsenal
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Skills & Technologies
            </h2>
          </div>

          <div className="space-y-12">
            {skillCategories.map((category, i) => {
              const categorySkills = skills.filter(s => s.category === category);
              
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">{category}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categorySkills.map((skill, j) => (
                      <motion.div
                        key={j}
                        className="glass rounded-xl p-4 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">
                            {skill.level === 'Mastered' ? '⭐' : 
                             skill.level === 'Using' ? '🚀' : 
                             skill.level === 'Learning' ? '📚' : '🎯'}
                          </div>
                          <div className="font-bold text-white mb-1">{skill.name}</div>
                          <div className="text-xs text-gray-400 mb-2">{skill.experience}</div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            skill.level === 'Mastered' ? 'bg-green-500/20 text-green-400' :
                            skill.level === 'Using' ? 'bg-blue-500/20 text-blue-400' :
                            skill.level === 'Learning' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-purple-500/20 text-purple-400'
                          }`}>
                            {skill.level}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
