import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MapPin, Download, ArrowDown } from 'lucide-react';
import { personalInfo } from '../../data/portfolio-data';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const MagneticButton = ({ children, href, icon: Icon, download }: any) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setPosition({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    return (
      <motion.a
        href={href}
        download={download}
        target={!download ? "_blank" : undefined}
        rel={!download ? "noopener noreferrer" : undefined}
        className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg font-medium text-white overflow-hidden group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.2s ease-out',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          {Icon && <Icon size={18} />}
          {children}
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />
      </motion.a>
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"
        animate={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20"
        animate={{
          x: mousePosition.x * -50,
          y: mousePosition.y * -50,
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Greeting */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium backdrop-blur-sm">
            👋 Welcome to my portfolio
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-bold mb-6 text-gradient"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          }}
        >
          {personalInfo.name}
        </motion.h1>

        {/* Title with Typing Effect */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {personalInfo.title}
          </h2>
          <p className="text-xl text-blue-400 font-mono">
            GSoC 2026 Developer @ Mifos Initiative
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {[
            { label: 'Projects', value: '15+', icon: '🚀' },
            { label: 'Accuracy', value: '92.4%', icon: '🎯' },
            { label: 'Open Source', value: 'GSoC', icon: '💻' },
            { label: 'Impact', value: '80+ Users', icon: '🌟' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass px-6 py-4 rounded-xl backdrop-blur-md"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-3xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <MagneticButton href="#projects">
            View My Work
          </MagneticButton>
          <MagneticButton href="#contact" icon={Mail}>
            Get In Touch
          </MagneticButton>
          <MagneticButton href="/resume.pdf" icon={Download} download>
            Download Resume
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4 mb-12"
        >
          {[
            { icon: Github, href: personalInfo.github, label: 'GitHub' },
            { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
            { icon: Phone, href: `tel:${personalInfo.phone}`, label: 'Phone' },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 glass rounded-xl hover:bg-blue-500/20 transition-colors backdrop-blur-md group"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </motion.a>
          ))}
        </motion.div>

        {/* Location */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-2 text-gray-400"
        >
          <MapPin size={18} />
          <span>{personalInfo.location}</span>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-blue-400" />
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}
