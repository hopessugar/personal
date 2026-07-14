import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';
import { personalInfo } from '../../data/portfolio-data';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-5" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            📬 Get In Touch
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Open to collaborations, exciting AI projects, and opportunities to make an impact
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
              { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
              { icon: MapPin, label: 'Location', value: personalInfo.location },
              { icon: Github, label: 'GitHub', value: 'hopessugar', href: personalInfo.github },
              { icon: Linkedin, label: 'LinkedIn', value: 'vyassilky', href: personalInfo.linkedin },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 glass rounded-xl p-4"
                whileHover={{ x: 10, scale: 1.02 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">{item.label}</div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-white font-medium hover:text-cyan-400 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-white font-medium">{item.value}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Message Form */}
          <motion.div
            className="glass rounded-2xl p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send a Quick Message</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />
              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-medium flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={18} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center pt-12 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-4">
            © 2026 {personalInfo.name}. Built with React, TypeScript, Three.js & Framer Motion
          </p>
          <p className="text-sm text-gray-500">
            Designed & Developed with ❤️ for the AI community
          </p>
        </motion.div>
      </div>
    </section>
  );
}
