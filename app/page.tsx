import Link from 'next/link';
import { ArrowRight, Code2, Shield, Zap, Check } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">CodeSweep</span>
          </div>
          <nav className="flex gap-6">
            <Link href="/#pricing" className="text-slate-300 hover:text-white transition">
              Pricing
            </Link>
            <Link href="/scan" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition">
              Try Free Scan
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
            🚀 Based on 2026 Developer Research
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Find the <span className="text-blue-400">AI Debt</span> in Your Codebase
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            AI-generated code is flooding repos. CodeSweep finds quality issues, dead code, and tech debt before it becomes a problem.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/scan" 
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition"
            >
              Start Free Scan <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/demo" 
              className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-red-400 mb-4">The AI Code Debt Crisis</h2>
          <p className="text-slate-300 text-lg mb-4">
            Research shows that <strong className="text-white">AI Code Debt is the #1 developer pain point in 2026</strong>. 
            Teams are shipping AI-generated code faster than ever, but quality is suffering.
          </p>
          <ul className="space-y-2 text-slate-300">
            <li>❌ Unused variables and dead code</li>
            <li>❌ Duplicate logic from copy-paste AI suggestions</li>
            <li>❌ Missing error handling</li>
            <li>❌ Inconsistent patterns and tech debt</li>
            <li>❌ TODO/FIXME comments that never get fixed</li>
          </ul>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Catch Issues Before They Ship
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Smart Detection</h3>
            <p className="text-slate-300">
              Detects unused variables, duplicate logic, missing error handling, and high complexity functions.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Instant Analysis</h3>
            <p className="text-slate-300">
              Paste code or connect your GitHub repo. Get A-F grade with actionable recommendations in seconds.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Beautiful Reports</h3>
            <p className="text-slate-300">
              Code highlighting, severity levels, and specific suggestions for every issue found.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-slate-400 text-center mb-12 text-lg">
          Start free. Upgrade when you need more scans.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-slate-400">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-slate-300">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>1 scan per week</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Paste-code scanner</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Basic quality report</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>A-F grade scoring</span>
              </li>
            </ul>
            <Link 
              href="/scan"
              className="block w-full text-center bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Start Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-blue-400 rounded-2xl p-8 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-400 text-blue-900 px-4 py-1 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$19</span>
              <span className="text-blue-100">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-white">
                <Check className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
                <span><strong>Unlimited scans</strong></span>
              </li>
              <li className="flex items-start gap-2 text-white">
                <Check className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
                <span>GitHub repo integration</span>
              </li>
              <li className="flex items-start gap-2 text-white">
                <Check className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
                <span>Advanced issue detection</span>
              </li>
              <li className="flex items-start gap-2 text-white">
                <Check className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
                <span>Priority support</span>
              </li>
              <li className="flex items-start gap-2 text-white">
                <Check className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
                <span>Export reports as PDF</span>
              </li>
            </ul>
            <button className="w-full bg-white hover:bg-blue-50 text-blue-600 px-6 py-3 rounded-lg font-semibold transition">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Clean Up Your Codebase?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Get your first quality scan in under 30 seconds. No signup required.
          </p>
          <Link 
            href="/scan"
            className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition"
          >
            Start Free Scan <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50">
        <div className="container mx-auto px-4 py-8 text-center text-slate-400">
          <p>&copy; 2026 CodeSweep. Built to fight AI code debt.</p>
        </div>
      </footer>
    </div>
  );
}
