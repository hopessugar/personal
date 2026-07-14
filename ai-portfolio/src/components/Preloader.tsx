import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden">
      {/* Animated geometric shapes - SUBTLE GRAY */}
      <div className="absolute inset-0">
        {/* Floating circles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#e5e5e5' : i % 3 === 1 ? '#f0f0f0' : '#f5f5f5',
              opacity: Math.random() * 0.4 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}

        {/* Rotating squares */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`square-${i}`}
            className="absolute animate-spin"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(135deg, ${i % 2 === 0 ? '#e5e5e5' : '#f0f0f0'}, transparent)`,
              opacity: Math.random() * 0.3 + 0.1,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 2}s`,
              borderRadius: '10px',
            }}
          />
        ))}

        {/* Gradient orbs - GRAY */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-gray-200/40 to-gray-100/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-gray-100/30 to-gray-50/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Animated logo */}
        <div className="mb-12 relative">
          {/* Rotating ring - GRAY */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border-4 border-gray-200 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-56 h-56 border-4 border-gray-300 rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 border-4 border-gray-400 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
          </div>

          {/* Center initials - BLACK WITH SUBTLE SHADOW */}
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-serif font-bold text-black mb-2 tracking-tight animate-pulse-slow relative z-10" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              SV
            </h1>
          </div>

          {/* Floating particles around logo - GRAY */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-3 h-3 bg-gray-400 rounded-full animate-float"
              style={{
                left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '3s',
              }}
            />
          ))}
        </div>

        {/* Name and title */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-2 animate-fade-in" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            Silky Vyas
          </h2>
          <p className="text-lg text-gray-600 font-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>
            AI/ML Engineer • GSoC 2026 Developer
          </p>
        </div>

        {/* Loading text with typing animation */}
        <div className="mb-8">
          <p className="text-gray-500 italic font-light animate-pulse">
            {progress < 30 ? '🧠 Initializing AI systems...' :
             progress < 60 ? '⚡ Loading neural networks...' :
             progress < 90 ? '🎨 Preparing portfolio...' :
             '✨ Almost ready...'}
          </p>
        </div>

        {/* Circular progress - GRAY */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#e5e5e5"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#2d2d2d"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-black">{progress}%</span>
          </div>
        </div>

        {/* Progress bar - GRAY */}
        <div className="w-full max-w-md mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Decorative elements - GRAY */}
        <div className="mt-8 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={`dot-${i}`}
              className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
              style={{
                animationDelay: `${i * 0.1}s`,
                opacity: progress > i * 20 ? 1 : 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
