import { motion } from 'framer-motion';
import { Github, GitFork, Star, Users, GitPullRequest, Code } from 'lucide-react';

export default function GitHubStats() {
  // Mock data - in production, fetch from GitHub API
  const stats = {
    contributions: 847,
    repositories: 24,
    stars: 156,
    followers: 89,
    pullRequests: 45,
    commits: 1243,
  };

  const repos = [
    {
      name: 'mifos-loan-summarizer',
      description: 'LLM-powered loan agreement analyzer with hallucination detection',
      stars: 45,
      forks: 12,
      language: 'Python',
      topics: ['llm', 'langchain', 'fastapi', 'gsoc'],
    },
    {
      name: 'krishi-mitra',
      description: 'AI crop disease detection with 92.4% accuracy',
      stars: 38,
      forks: 8,
      language: 'Python',
      topics: ['pytorch', 'cnn', 'agriculture', 'rag'],
    },
    {
      name: 'vedaverse',
      description: 'Multi-agent RAG system for Vedic knowledge',
      stars: 29,
      forks: 5,
      language: 'TypeScript',
      topics: ['rag', 'multi-agent', 'langchain'],
    },
    {
      name: 'weed-detection-cv',
      description: 'Lightweight weed detection using MobileNetV2',
      stars: 22,
      forks: 7,
      language: 'Python',
      topics: ['computer-vision', 'pytorch', 'agriculture'],
    },
  ];

  return (
    <section id="github" className="py-20 px-6 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-5" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-full text-gray-300 text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Github className="inline w-4 h-4 mr-2" />
            Open Source Contributions
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            GitHub Activity
          </h2>
          <p className="text-xl text-gray-400">
            Building in public and contributing to open source
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {[
            { icon: Code, label: 'Contributions', value: stats.contributions, color: 'text-green-400' },
            { icon: Github, label: 'Repositories', value: stats.repositories, color: 'text-blue-400' },
            { icon: Star, label: 'Stars', value: stats.stars, color: 'text-yellow-400' },
            { icon: Users, label: 'Followers', value: stats.followers, color: 'text-purple-400' },
            { icon: GitPullRequest, label: 'Pull Requests', value: stats.pullRequests, color: 'text-cyan-400' },
            { icon: GitFork, label: 'Commits', value: stats.commits, color: 'text-pink-400' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Pinned Repositories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((repo, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Github className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-bold text-white">{repo.name}</h3>
                </div>
                <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-400">
                  Public
                </span>
              </div>
              
              <p className="text-sm text-gray-400 mb-4">{repo.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {repo.topics.map((topic, j) => (
                  <span
                    key={j}
                    className="px-2 py-1 bg-blue-500/10 rounded text-xs text-blue-400"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={14} />
                    {repo.forks}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/hopessugar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            View Full Profile on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
