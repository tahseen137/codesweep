# 🔍 CodeSweep

**Find the AI debt in your codebase before it becomes a problem**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tahseen137/codesweep)
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://codesweep.vercel.app)

---

## 📖 About

**CodeSweep** is a **code quality analyzer** built for the age of AI-generated code. As teams ship AI-assisted code faster than ever, quality often suffers. CodeSweep detects unused variables, duplicate logic, missing error handling, and tech debt—giving your codebase an instant A-F quality grade.

Perfect for:
- 🤖 Teams using AI coding assistants (Copilot, Cursor, etc.)
- 🚀 Startups moving fast and breaking things
- 👨‍💻 Developers who want to catch issues early
- 📊 Code reviews and pull request checks

**Live Demo:** [codesweep.vercel.app](https://codesweep.vercel.app)

---

## ✨ Features

### Core Analysis
- 🔍 **Dead Code Detection** — Finds unused variables, functions, and imports
- 🔄 **Duplicate Logic** — Catches copy-pasted code blocks
- ⚠️ **Error Handling** — Identifies missing try-catch blocks
- 📊 **Complexity Analysis** — Flags overly complex functions
- 📝 **TODO/FIXME Tracking** — Surfaces forgotten comments
- 🎯 **A-F Grading** — Instant quality score for your code

### Integration
- 📋 **Paste & Scan** — Copy-paste code for instant analysis
- 🔗 **GitHub Integration** — Connect repos for automated scanning (Pro)
- 📄 **Beautiful Reports** — Syntax-highlighted issue detection
- 📊 **Severity Levels** — Critical, warning, and info categories

### Pro Features
- 🚀 **Unlimited Scans** — No weekly limits
- 📦 **GitHub Repo Scanning** — Automated analysis on push
- 📈 **Advanced Detection** — Security vulnerabilities and performance issues
- 📥 **PDF Exports** — Share reports with your team
- 🎯 **Priority Support** — Direct access to the team

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/tahseen137/codesweep.git
cd codesweep

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tahseen137/codesweep)

---

## 🎯 Usage

### Quick Scan

1. Visit [codesweep.vercel.app/scan](https://codesweep.vercel.app/scan)
2. Paste your code into the editor
3. Click "Analyze Code"
4. Review your A-F grade and issues

### Example Issues Detected

#### Unused Variable
```typescript
function calculateTotal(items: Item[]) {
  const tax = 0.08; // ⚠️ Declared but never used
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

#### Missing Error Handling
```typescript
async function fetchData(url: string) {
  const response = await fetch(url); // ❌ No try-catch
  return response.json();
}
```

#### High Complexity
```typescript
function processOrder(order: Order) {
  if (order.status === 'pending') {
    if (order.items.length > 0) {
      if (order.total > 100) {
        if (order.customer.verified) {
          // ⚠️ Cyclomatic complexity: 5 (refactor recommended)
        }
      }
    }
  }
}
```

---

## 📊 Grading System

| Grade | Score Range | Description |
|-------|-------------|-------------|
| **A** | 90-100 | Excellent code quality |
| **B** | 80-89 | Good with minor issues |
| **C** | 70-79 | Needs improvement |
| **D** | 60-69 | Multiple problems |
| **F** | 0-59 | Critical issues found |

### Scoring Factors
- Dead code (-5 points per issue)
- Missing error handling (-10 points)
- High complexity (-8 points per function)
- Duplicate logic (-6 points per block)
- TODO comments (-2 points each)

---

## 🔌 API Reference (Coming Soon)

### `POST /api/analyze`
Analyze code and return quality report.

**Request:**
```json
{
  "code": "function hello() { ... }",
  "language": "typescript"
}
```

**Response:**
```json
{
  "grade": "B",
  "score": 85,
  "issues": [
    {
      "type": "unused-variable",
      "line": 3,
      "message": "Variable 'x' is declared but never used",
      "severity": "warning"
    }
  ]
}
```

---

## 💳 Pricing

### Free
- ✅ 1 scan per week
- ✅ Paste-code scanner
- ✅ Basic quality report
- ✅ A-F grade scoring

### Pro - $19/month
- ✅ **Unlimited scans**
- ✅ GitHub repo integration
- ✅ Advanced issue detection
- ✅ PDF export
- ✅ Priority support

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Deployed on [Vercel](https://vercel.com)

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

**Built to fight AI code debt 🤖⚔️**
