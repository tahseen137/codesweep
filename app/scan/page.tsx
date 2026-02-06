'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Code2, ArrowLeft, Upload } from 'lucide-react';

export default function ScanPage() {
  const [code, setCode] = useState('');
  const [filename, setFilename] = useState('code.js');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert('Please paste some code to analyze');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call with slight delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Store in sessionStorage and redirect to results
    sessionStorage.setItem('codeToAnalyze', code);
    sessionStorage.setItem('filename', filename);
    router.push('/results');
  };

  const loadSampleCode = () => {
    const sample = `// Sample AI-generated code with issues
function processUserData(user) {
  const apiKey = 'sk-1234567890'; // TODO: move to env
  var data = user.getData();
  const unusedVar = 123;
  
  console.log('Processing user:', user.id);
  
  // Fetch user profile without error handling
  const profile = await fetch('/api/profile');
  const json = JSON.parse(profile);
  
  // Duplicate logic
  if (user.age > 18) {
    console.log('Adult user');
  }
  if (user.age > 18) {
    console.log('Adult user');
  }
  
  // High complexity function
  if (user.status === 'active') {
    if (user.verified) {
      if (user.plan === 'pro') {
        if (user.payments.length > 0) {
          if (user.payments[0].status === 'paid') {
            return true;
          }
        }
      }
    }
  }
  
  return false;
}

// FIXME: This function is broken
function calculateTotal() {
  let total = 0;
  // Missing implementation
  return total;
}`;
    setCode(sample);
    setFilename('sample.js');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">CodeSweep</span>
          </Link>
          <Link href="/" className="text-slate-300 hover:text-white transition flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">
            Paste Your Code for Analysis
          </h1>
          <p className="text-slate-300 text-center mb-8 text-lg">
            Paste any code snippet and get instant quality analysis with actionable recommendations.
          </p>

          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Filename (optional)
              </label>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition"
                placeholder="code.js"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Code to Analyze
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-blue-500 transition resize-none"
                placeholder="// Paste your code here..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Analyze Code
                  </>
                )}
              </button>
              <button
                onClick={loadSampleCode}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Load Sample
              </button>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">What We Check:</h3>
            <ul className="grid md:grid-cols-2 gap-2 text-slate-300">
              <li>✓ Unused variables and dead code</li>
              <li>✓ Duplicate logic patterns</li>
              <li>✓ Missing error handling</li>
              <li>✓ High cyclomatic complexity</li>
              <li>✓ TODO/FIXME comments</li>
              <li>✓ Inconsistent code patterns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
