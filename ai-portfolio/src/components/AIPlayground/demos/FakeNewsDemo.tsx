import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Loader2, Search } from 'lucide-react';

export default function FakeNewsDemo() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sampleTexts = [
    "Scientists discover cure for common cold using AI-powered drug discovery platform",
    "Breaking: New study shows drinking coffee reduces risk of heart disease by 40%",
    "Local mayor announces city will be first to implement flying cars by 2025",
  ];

  const analyze = async (textToAnalyze: string) => {
    if (!textToAnalyze.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Simulate analysis
    const isFake = Math.random() > 0.5;
    const confidence = 75 + Math.random() * 20;

    setResult({
      verdict: isFake ? 'fake' : 'real',
      confidence: Math.round(confidence),
      signals: [
        {
          type: isFake ? 'negative' : 'positive',
          title: 'Source Credibility',
          score: isFake ? 35 : 85,
          description: isFake
            ? 'Source has history of misinformation'
            : 'Reputable source with verified track record',
        },
        {
          type: isFake ? 'negative' : 'positive',
          title: 'Fact-Check Results',
          score: isFake ? 28 : 92,
          description: isFake
            ? 'Claims contradicted by multiple fact-checkers'
            : 'Claims verified by independent sources',
        },
        {
          type: isFake ? 'negative' : 'neutral',
          title: 'Emotional Language',
          score: isFake ? 78 : 45,
          description: isFake
            ? 'High use of sensational and emotional language'
            : 'Moderate emotional language detected',
        },
        {
          type: isFake ? 'negative' : 'positive',
          title: 'Citation Quality',
          score: isFake ? 22 : 88,
          description: isFake
            ? 'Few or unreliable citations provided'
            : 'Multiple credible sources cited',
        },
      ],
      recommendations: isFake
        ? [
            'Verify with established news sources',
            'Check for official statements',
            'Look for peer-reviewed research',
            'Consult fact-checking websites',
          ]
        : [
            'Cross-reference with other sources',
            'Check publication date for recency',
            'Verify author credentials',
          ],
    });

    setIsAnalyzing(false);
  };

  return (
    <motion.div
      className="glass rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Fake News Detector</h3>
            <p className="text-sm text-orange-100">NLP-powered misinformation detection</p>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gray-900/50">
        {!result ? (
          <div className="space-y-6">
            {/* Input Area */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Enter text or paste article:
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste news article, social media post, or any text to analyze..."
                className="w-full h-40 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                disabled={isAnalyzing}
              />
            </div>

            {/* Sample Texts */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Or try these examples:</p>
              <div className="space-y-2">
                {sampleTexts.map((sample, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setText(sample)}
                    className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 transition-colors"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {sample}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Analyze Button */}
            <motion.button
              onClick={() => analyze(text)}
              disabled={!text.trim() || isAnalyzing}
              className="w-full px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl text-white font-medium disabled:opacity-50 flex items-center justify-center gap-3"
              whileHover={text.trim() && !isAnalyzing ? { scale: 1.02 } : {}}
              whileTap={text.trim() && !isAnalyzing ? { scale: 0.98 } : {}}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing with NLP models...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Analyze Text
                </>
              )}
            </motion.button>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: '🔍', title: 'Source Analysis', desc: 'Credibility scoring' },
                { icon: '✅', title: 'Fact Checking', desc: 'Cross-reference verification' },
                { icon: '🎭', title: 'Sentiment Analysis', desc: 'Emotional language detection' },
                { icon: '📊', title: 'Citation Validation', desc: 'Source quality assessment' },
              ].map((feature, i) => (
                <div key={i} className="glass p-4 rounded-xl">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="text-sm font-semibold text-white">{feature.title}</div>
                  <div className="text-xs text-gray-400">{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Result Header */}
            <div
              className={`glass rounded-xl p-6 border-l-4 ${
                result.verdict === 'fake' ? 'border-red-500' : 'border-green-500'
              }`}
            >
              <div className="flex items-center gap-4">
                {result.verdict === 'fake' ? (
                  <AlertTriangle className="w-12 h-12 text-red-400" />
                ) : (
                  <CheckCircle className="w-12 h-12 text-green-400" />
                )}
                <div className="flex-1">
                  <h4
                    className={`text-2xl font-bold mb-1 ${
                      result.verdict === 'fake' ? 'text-red-400' : 'text-green-400'
                    }`}
                  >
                    {result.verdict === 'fake'
                      ? 'Likely Misinformation'
                      : 'Likely Credible'}
                  </h4>
                  <p className="text-gray-400">
                    Confidence: {result.confidence}% • Based on multiple signals
                  </p>
                </div>
              </div>
            </div>

            {/* Analysis Signals */}
            <div className="glass rounded-xl p-6">
              <h5 className="text-lg font-bold text-white mb-4">Detection Signals</h5>
              <div className="space-y-4">
                {result.signals.map((signal: any, i: number) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">
                        {signal.title}
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          signal.type === 'positive'
                            ? 'text-green-400'
                            : signal.type === 'negative'
                            ? 'text-red-400'
                            : 'text-yellow-400'
                        }`}
                      >
                        {signal.score}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          signal.type === 'positive'
                            ? 'bg-green-400'
                            : signal.type === 'negative'
                            ? 'bg-red-400'
                            : 'bg-yellow-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${signal.score}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    </div>
                    <p className="text-xs text-gray-400">{signal.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="glass rounded-xl p-6">
              <h5 className="text-lg font-bold text-white mb-4">Recommendations</h5>
              <ul className="space-y-2">
                {result.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <CheckCircle
                      size={18}
                      className="text-blue-400 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                onClick={() => {
                  setResult(null);
                  setText('');
                }}
                className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Analyze Another
              </motion.button>
              <motion.button
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl text-white font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
