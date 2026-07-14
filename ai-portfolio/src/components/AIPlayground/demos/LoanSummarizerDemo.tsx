import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, AlertTriangle, CheckCircle, Loader2, Download } from 'lucide-react';

export default function LoanSummarizerDemo() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleAnalyze = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setHasResult(true);
  };

  const sampleResult = {
    summary: {
      loanAmount: '$50,000',
      interestRate: '8.5% APR',
      term: '60 months',
      monthlyPayment: '$1,024',
      totalInterest: '$11,440',
      totalRepayment: '$61,440',
    },
    risks: [
      {
        severity: 'high',
        clause: 'Prepayment Penalty',
        description: 'Early repayment may incur fees up to 3% of outstanding balance',
        location: 'Section 4.2',
      },
      {
        severity: 'medium',
        clause: 'Variable Interest Rate',
        description: 'Interest rate may increase by up to 2% annually after first year',
        location: 'Section 3.1',
      },
      {
        severity: 'low',
        clause: 'Late Payment Fee',
        description: 'Standard 5% late fee after 15-day grace period',
        location: 'Section 5.3',
      },
    ],
    keyTerms: [
      'Secured loan with property collateral',
      'No origination fees',
      'Bi-weekly payment option available',
      'Grace period: 15 days',
      'Insurance required',
    ],
    hallucination_score: 2.1,
    confidence: 96.8,
  };

  return (
    <motion.div
      className="glass rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Loan Agreement Analyzer</h3>
            <p className="text-sm text-purple-100">
              LLM-powered with hallucination detection • GSoC 2026 Project
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gray-900/50">
        {!hasResult ? (
          <div className="space-y-6">
            {/* Upload Area */}
            <motion.div
              className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-purple-500/50 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">
                Upload Loan Agreement
              </h4>
              <p className="text-gray-400 mb-4">
                Drop your PDF or DOCX file here, or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Maximum file size: 10MB • Supported: PDF, DOCX
              </p>
            </motion.div>

            {/* Demo Button */}
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">Or try with sample data:</p>
              <motion.button
                onClick={handleAnalyze}
                disabled={isProcessing}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium disabled:opacity-50 flex items-center gap-3 mx-auto"
                whileHover={!isProcessing ? { scale: 1.05 } : {}}
                whileTap={!isProcessing ? { scale: 0.95 } : {}}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Agreement...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Analyze Sample Agreement
                  </>
                )}
              </motion.button>
            </div>

            {/* Processing Status */}
            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  className="glass rounded-xl p-6 space-y-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex items-center gap-3 text-blue-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Extracting text from document...</span>
                  </div>
                  <div className="flex items-center gap-3 text-purple-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Analyzing with LangChain pipeline...</span>
                  </div>
                  <div className="flex items-center gap-3 text-pink-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Running hallucination detection...</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Generating borrower-friendly summary...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[
                { icon: '🎯', title: 'High Accuracy', desc: '95%+ extraction accuracy' },
                { icon: '🛡️', title: 'Risk Detection', desc: 'Automatic clause flagging' },
                { icon: '🌍', title: 'Multilingual', desc: '10+ languages supported' },
                { icon: '⚡', title: 'Fast Processing', desc: '<5s per document' },
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
            {/* Success Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <h4 className="text-xl font-bold text-white">Analysis Complete</h4>
                  <p className="text-sm text-gray-400">
                    Processed in 2.8s • Confidence: {sampleResult.confidence}%
                  </p>
                </div>
              </div>
              <motion.button
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
                Export Report
              </motion.button>
            </div>

            {/* Summary */}
            <div className="glass rounded-xl p-6">
              <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FileText size={20} className="text-purple-400" />
                Loan Summary
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(sampleResult.summary).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-xs text-gray-400 mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-lg font-bold text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Analysis */}
            <div className="glass rounded-xl p-6">
              <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-yellow-400" />
                Risk Analysis
              </h5>
              <div className="space-y-3">
                {sampleResult.risks.map((risk, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border-l-4"
                    style={{
                      borderColor:
                        risk.severity === 'high'
                          ? '#ef4444'
                          : risk.severity === 'medium'
                          ? '#f59e0b'
                          : '#10b981',
                    }}
                  >
                    <AlertTriangle
                      size={20}
                      className={
                        risk.severity === 'high'
                          ? 'text-red-400'
                          : risk.severity === 'medium'
                          ? 'text-yellow-400'
                          : 'text-green-400'
                      }
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white">{risk.clause}</span>
                        <span className="text-xs text-gray-400">{risk.location}</span>
                      </div>
                      <p className="text-sm text-gray-400">{risk.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Terms */}
            <div className="glass rounded-xl p-6">
              <h5 className="text-lg font-bold text-white mb-4">Key Terms</h5>
              <ul className="space-y-2">
                {sampleResult.keyTerms.map((term, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{term}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hallucination Score */}
            <div className="glass rounded-xl p-4 border-l-4 border-green-400">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400">Hallucination Rate</div>
                  <div className="text-2xl font-bold text-green-400">
                    {sampleResult.hallucination_score}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Status</div>
                  <div className="text-lg font-bold text-green-400">✓ Verified</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                onClick={() => setHasResult(false)}
                className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Analyze Another
              </motion.button>
              <motion.button
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Full Report
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
