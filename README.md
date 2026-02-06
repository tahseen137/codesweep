# 🧹 CodeSweep - AI Code Quality Scanner

**Find the AI debt in your codebase before it becomes tech debt.**

CodeSweep is an AI-powered code quality scanner designed to detect issues commonly found in AI-generated code. Built for the 2026 developer landscape where AI Code Debt is the #1 pain point.

## 🚀 Live Demo

- **Production Site**: [https://codesweep.vercel.app](https://codesweep.vercel.app)
- **GitHub Repo**: [https://github.com/tahseen137/codesweep](https://github.com/tahseen137/codesweep)

## ✨ Features

### Core Analysis
- ✅ **Unused Variables** - Detects declared but never used variables
- ✅ **Duplicate Logic** - Finds copy-pasted code blocks
- ✅ **Missing Error Handling** - Identifies risky operations without try-catch
- ✅ **High Complexity** - Flags functions with high cyclomatic complexity
- ✅ **TODO/FIXME Density** - Tracks technical debt markers
- ✅ **Inconsistent Patterns** - Detects outdated patterns (var, console.log, etc.)

### User Experience
- 🎯 **A-F Quality Grade** - Instant scoring with detailed metrics
- 📊 **Beautiful Reports** - Code highlighting with line-by-line issues
- 💡 **Actionable Recommendations** - Specific suggestions for every issue
- ⚡ **Instant Analysis** - Results in under 1 second
- 🎨 **Modern UI** - Built with Next.js 14 + Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Vercel

## 🏗️ Project Structure

```
codesweep/
├── app/
│   ├── page.tsx          # Landing page with pricing
│   ├── scan/page.tsx     # Paste-code scanner
│   ├── results/page.tsx  # Analysis results page
│   ├── demo/page.tsx     # GitHub repo scanner (demo mode)
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── lib/
│   └── analyzer.ts       # Core analysis engine
└── public/               # Static assets
```

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/tahseen137/codesweep.git
cd codesweep

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Usage

### 1. Paste Code Scanner
1. Navigate to `/scan`
2. Paste your code snippet
3. Click "Analyze Code"
4. View detailed results with A-F grade

### 2. GitHub Repo Scanner (Demo)
1. Navigate to `/demo`
2. Select a sample repository
3. View pre-analyzed results
4. (Pro feature for real GitHub integration)

## 📈 Analysis Metrics

CodeSweep provides comprehensive metrics:

- **Code Lines**: Total lines of actual code
- **Comment Ratio**: Comments vs code ratio
- **Function Count**: Number of functions detected
- **Average Complexity**: Mean cyclomatic complexity
- **TODO/FIXME Count**: Technical debt markers
- **Duplicate Blocks**: Repeated code patterns

## 🎨 Scoring System

Grades are calculated based on:

- **High Severity Issues** (-5 points each)
- **Medium Severity Issues** (-2 points each)
- **Low Severity Issues** (-0.5 points each)
- **High Complexity** (-2 points per unit over threshold)
- **TODO/FIXME Density** (scaled deduction)
- **Low Comment Ratio** (-5 points if under 10%)

Final Grade Scale:
- **A**: 90-100 (Excellent)
- **B**: 80-89 (Good)
- **C**: 70-79 (Fair)
- **D**: 60-69 (Needs Work)
- **F**: 0-59 (Poor)

## 💰 Pricing

### Free Plan
- 1 scan per week
- Paste-code scanner
- Basic quality report
- A-F grade scoring

### Pro Plan - $19/month
- Unlimited scans
- GitHub repo integration
- Advanced issue detection
- Priority support
- Export reports as PDF

## 🚀 Deployment

This project is deployed on Vercel:

```bash
# Deploy to Vercel
npx vercel --prod
```

The app automatically deploys on push to the `main` branch via Vercel's GitHub integration.

## 🧪 Development

```bash
# Run in development mode
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build
```

## 📝 Sample Issues Detected

```javascript
// ❌ Unused variable
const unusedVar = 123;

// ❌ Missing error handling
const data = await fetch('/api/data');

// ❌ Duplicate logic
if (user.age > 18) { console.log('Adult'); }
if (user.age > 18) { console.log('Adult'); }

// ❌ High complexity
if (a) { if (b) { if (c) { if (d) { ... } } } }

// ❌ TODO comment
// TODO: Implement validation
```

## 🤝 Contributing

Contributions are welcome! This is a hackathon MVP - there's lots of room for improvement:

- Add more language support (Python, Java, etc.)
- Integrate with GitHub API for real repo scanning
- Add CI/CD integration
- Create VSCode extension
- Add more sophisticated analysis patterns

## 📄 License

MIT License - feel free to use this for your own projects!

## 🎓 Research & Motivation

Based on 2026 research showing "AI Code Debt" as the #1 developer pain point. As AI-generated code becomes more prevalent, tools like CodeSweep help teams maintain quality standards and prevent technical debt accumulation.

## 🙏 Acknowledgments

Built during a hackathon sprint to address real developer pain points in the AI-assisted coding era.

---

**Built with ❤️ to fight AI code debt**

🔗 [Live Demo](https://codesweep.vercel.app) | 📂 [GitHub](https://github.com/tahseen137/codesweep)
