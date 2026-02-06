'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Code2, ArrowLeft, Github, Star } from 'lucide-react';

const SAMPLE_REPOS = [
  {
    name: 'ai-chatbot-starter',
    description: 'AI-generated chatbot with common issues',
    stars: 234,
    issues: 12,
    grade: 'C',
    sampleCode: `// AI-generated chatbot code
import { useState } from 'react';

export default function ChatBot() {
  const API_KEY = 'sk-1234567890'; // FIXME: Move to env
  var messages = [];
  const unusedState = useState(false);
  
  console.log('ChatBot component rendered');
  
  async function sendMessage(msg) {
    // Missing error handling
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: msg })
    });
    const data = await response.json();
    
    // Duplicate logic
    if (data.success) {
      messages.push(data.response);
    }
    if (data.success) {
      messages.push(data.response);
    }
    
    return data;
  }
  
  // TODO: Add message validation
  // TODO: Add rate limiting
  // FIXME: Messages not persisting
  
  return (
    <div className="chat">
      {/* Implementation */}
    </div>
  );
}`
  },
  {
    name: 'react-dashboard-template',
    description: 'Dashboard with dead code and complexity issues',
    stars: 567,
    issues: 8,
    grade: 'B',
    sampleCode: `// Dashboard component with issues
import React from 'react';

function Dashboard({ user }) {
  var isLoading = true;
  const unusedVariable = 'test';
  const anotherUnused = 123;
  
  console.log('Dashboard loading');
  
  // High complexity function
  function checkPermissions() {
    if (user.role === 'admin') {
      if (user.verified) {
        if (user.plan === 'enterprise') {
          if (user.features.includes('advanced')) {
            if (user.team.size > 5) {
              if (user.billing.status === 'active') {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }
  
  // Missing error handling
  const fetchData = async () => {
    const res = await fetch('/api/dashboard');
    const json = JSON.parse(await res.text());
    return json;
  };
  
  // TODO: Add loading states
  // FIXME: Permissions check broken
  
  return <div>Dashboard</div>;
}`
  },
  {
    name: 'nextjs-ecommerce',
    description: 'E-commerce site with missing error handling',
    stars: 891,
    issues: 15,
    grade: 'D',
    sampleCode: `// E-commerce product page
'use client';

export default function ProductPage() {
  var cart = [];
  const unusedPrice = 0;
  const unusedDiscount = 0;
  const unusedTax = 0;
  
  console.log('Product page rendered');
  console.log('Cart:', cart);
  
  // No error handling
  async function addToCart(productId) {
    const response = await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId })
    });
    const data = JSON.parse(await response.text());
    
    // Duplicate validation
    if (!productId) {
      throw new Error('Invalid product');
    }
    if (!productId) {
      throw new Error('Invalid product');
    }
    
    cart.push(data);
  }
  
  // TODO: Add inventory check
  // TODO: Add price validation
  // FIXME: Cart not updating
  // FIXME: Payment integration broken
  
  return <div>Product</div>;
}`
  }
];

export default function DemoPage() {
  const router = useRouter();

  const handleScan = (repo: typeof SAMPLE_REPOS[0]) => {
    sessionStorage.setItem('codeToAnalyze', repo.sampleCode);
    sessionStorage.setItem('filename', `${repo.name}/index.tsx`);
    router.push('/results');
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

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">
            GitHub Repo Scanner Demo
          </h1>
          <p className="text-slate-300 text-center mb-8 text-lg">
            Select a sample repository to see how CodeSweep analyzes real-world code.
          </p>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
            <p className="text-blue-400 text-center">
              <strong>Demo Mode:</strong> These are sample repositories for demonstration. 
              Upgrade to Pro for actual GitHub integration.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {SAMPLE_REPOS.map((repo, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 rounded-xl p-6 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <Github className="w-6 h-6 text-slate-400 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{repo.name}</h3>
                      <p className="text-slate-400">{repo.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Star className="w-4 h-4" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className={`px-4 py-2 rounded-lg font-bold text-2xl ${
                      repo.grade === 'A' ? 'bg-green-500/10 text-green-400' :
                      repo.grade === 'B' ? 'bg-blue-500/10 text-blue-400' :
                      repo.grade === 'C' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {repo.grade}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-slate-400">
                    {repo.issues} issues detected
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScan(repo);
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold transition"
                  >
                    View Analysis
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Want to Scan Your Own Repos?
            </h2>
            <p className="text-slate-300 mb-6">
              Upgrade to Pro for unlimited scans and GitHub integration
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/#pricing"
                className="bg-white hover:bg-blue-50 text-blue-600 px-8 py-3 rounded-lg font-semibold transition"
              >
                View Pricing
              </Link>
              <Link 
                href="/scan"
                className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Paste Code Instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
