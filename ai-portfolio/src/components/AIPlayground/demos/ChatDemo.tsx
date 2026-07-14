import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hi! I'm an AI assistant. Ask me anything about machine learning, AI projects, or technology!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('gsoc') || lowerMessage.includes('mifos')) {
      return "I'm currently working on an LLM-powered loan agreement summarization system for Mifos X as part of Google Summer of Code 2026! It uses FastAPI, React, LangChain, and Ollama to extract financial terms and detect risky clauses with <3% hallucination rate. Pretty exciting stuff! 🚀";
    }
    
    if (lowerMessage.includes('krishi') || lowerMessage.includes('crop')) {
      return "Krishi Mitra is one of my favorite projects! It's an AI-powered crop disease detection system with 92.4% accuracy, serving 80+ farming households. Uses CNN models and RAG pipelines to provide instant treatment recommendations. Really making a real-world impact! 🌾";
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
      return "I specialize in: PyTorch & TensorFlow for deep learning, LangChain & RAG for LLMs, OpenCV for computer vision, FastAPI & React for full-stack development, and Docker for deployment. Always learning new technologies! 💻";
    }
    
    if (lowerMessage.includes('project')) {
      return "I've built several production-grade AI systems: GSoC Mifos loan summarizer, Krishi Mitra (92.4% accuracy), Vedaverse (<3% hallucination), and a weed detection system (89% accuracy). Each one solves real-world problems with measurable impact! 📊";
    }
    
    if (lowerMessage.includes('hallucination')) {
      return "Hallucination detection is crucial for production LLM systems! In my projects, I use techniques like citation validation, multi-agent verification, confidence scoring, and RAGAS benchmarking to keep hallucination rates below 3%. It's all about building trustworthy AI! ✅";
    }
    
    return "That's an interesting question! While this is a demo with simulated responses, in production I'd use advanced LLMs like GPT-4 or Claude with proper prompt engineering, RAG pipelines, and hallucination detection. Want to know more about any specific project? 🤔";
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: simulateAIResponse(input),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedPrompts = [
    "Tell me about your GSoC project",
    "What's Krishi Mitra?",
    "How do you handle hallucinations in LLMs?",
    "What are your key skills?",
  ];

  return (
    <motion.div
      className="glass rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">AI Assistant</h3>
            <p className="text-sm text-blue-100">Powered by Large Language Models</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-900/50">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'glass text-gray-100'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                <p className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
              <span className="text-sm text-gray-400">AI is thinking...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length === 1 && (
        <div className="px-6 py-4 bg-gray-900/30 border-t border-white/5">
          <p className="text-xs text-gray-400 mb-3">💡 Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt, index) => (
              <motion.button
                key={index}
                onClick={() => setInput(prompt)}
                className="px-3 py-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-6 bg-gray-900/50 border-t border-white/5">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isTyping}
          />
          <motion.button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            whileHover={input.trim() && !isTyping ? { scale: 1.05 } : {}}
            whileTap={input.trim() && !isTyping ? { scale: 0.95 } : {}}
          >
            <Send size={18} />
            Send
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
