'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Code2, ArrowLeft, AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { analyzeCode, AnalysisResult } from '@/lib/analyzer';

export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [code, setCode] = useState('');
  const [filename, setFilename] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedCode = sessionStorage.getItem('codeToAnalyze');
    const storedFilename = sessionStorage.getItem('filename') || 'unknown';

    if (!storedCode) {
      router.push('/scan');
      return;
    }

    setCode(storedCode);
    setFilename(storedFilename);
    const analysis = analyzeCode(storedCode);
    setResult(analysis);
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading analysis...</div>
      </div>
    );
  }

  const getGradeColor = (grade: string) => {
    if (grade === 'A') return 'text-green-400 bg-green-500/10 border-green-500/20';
    if (grade === 'B') return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    if (grade === 'C') return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
    if (grade === 'D') return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
    return 'text-red-400 bg-red-500/10 border-red-500/20';
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === 'high') return <AlertCircle className="w-5 h-5 text-red-400" />;
    if (severity === 'medium') return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    return <Info className="w-5 h-5 text-blue-400" />;
  };

  const getSeverityColor = (severity: string) => {
    if (severity === 'high') return 'bg-red-500/10 border-red-500/20';
    if (severity === 'medium') return 'bg-yellow-500/10 border-yellow-500/20';
    return 'bg-blue-500/10 border-blue-500/20';
  };

  const codeLines = code.split('\n');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">CodeSweep</span>
          </Link>
          <Link href="/scan" className="text-slate-300 hover:text-white transition flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            New Scan
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Analysis Results</h1>
            <p className="text-slate-400">File: {filename}</p>
          </div>

          {/* Score Card */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className={`border-2 rounded-2xl p-8 text-center ${getGradeColor(result.score)}`}>
              <div className="text-sm font-medium mb-2 opacity-80">Quality Grade</div>
              <div className="text-6xl font-bold mb-2">{result.score}</div>
              <div className="text-2xl font-semibold">{result.scoreValue}/100</div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-sm font-medium text-slate-400 mb-4">Code Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Lines:</span>
                  <span className="text-white font-semibold">{result.metrics.totalLines}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Code Lines:</span>
                  <span className="text-white font-semibold">{result.metrics.codeLines}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Functions:</span>
                  <span className="text-white font-semibold">{result.metrics.functions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Avg Complexity:</span>
                  <span className="text-white font-semibold">{result.metrics.avgComplexity}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-sm font-medium text-slate-400 mb-4">Issues Found</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-red-400">High Severity:</span>
                  <span className="text-white font-semibold text-xl">
                    {result.issues.filter(i => i.severity === 'high').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-400">Medium Severity:</span>
                  <span className="text-white font-semibold text-xl">
                    {result.issues.filter(i => i.severity === 'medium').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-400">Low Severity:</span>
                  <span className="text-white font-semibold text-xl">
                    {result.issues.filter(i => i.severity === 'low').length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-blue-400" />
              Recommendations
            </h2>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="text-slate-200 text-lg">
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* Issues List */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Issues Detected ({result.issues.length})
            </h2>
            
            {result.issues.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <p className="text-xl text-green-400 font-semibold">No issues found!</p>
                <p className="text-slate-400 mt-2">Your code quality is excellent.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {result.issues.map((issue, index) => (
                  <div 
                    key={index}
                    className={`border rounded-lg p-4 ${getSeverityColor(issue.severity)}`}
                  >
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(issue.severity)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-slate-400">Line {issue.line}</span>
                          <span className="text-xs px-2 py-1 bg-slate-900/50 rounded text-slate-300">
                            {issue.type.replace(/-/g, ' ')}
                          </span>
                        </div>
                        <p className="text-white font-medium mb-2">{issue.message}</p>
                        {issue.suggestion && (
                          <p className="text-sm text-slate-300">
                            💡 <strong>Suggestion:</strong> {issue.suggestion}
                          </p>
                        )}
                        {/* Show code snippet */}
                        <div className="mt-3 bg-slate-900/70 rounded p-3 font-mono text-sm overflow-x-auto">
                          <div className="text-slate-500">
                            {issue.line > 1 && codeLines[issue.line - 2] && (
                              <div>{issue.line - 1}: {codeLines[issue.line - 2]}</div>
                            )}
                          </div>
                          <div className="text-yellow-400 bg-yellow-500/10">
                            {issue.line}: {codeLines[issue.line - 1]}
                          </div>
                          <div className="text-slate-500">
                            {issue.line < codeLines.length && codeLines[issue.line] && (
                              <div>{issue.line + 1}: {codeLines[issue.line]}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Link 
              href="/scan"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Analyze Another File
            </Link>
            <Link 
              href="/"
              className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
