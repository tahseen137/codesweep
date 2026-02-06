// Core code analysis engine

export interface AnalysisResult {
  score: string; // A-F grade
  scoreValue: number; // 0-100
  issues: Issue[];
  metrics: Metrics;
  recommendations: string[];
}

export interface Issue {
  type: 'unused-variable' | 'duplicate-logic' | 'inconsistent-pattern' | 'missing-error-handling' | 'todo-fixme' | 'high-complexity';
  severity: 'high' | 'medium' | 'low';
  line: number;
  message: string;
  suggestion?: string;
}

export interface Metrics {
  totalLines: number;
  codeLines: number;
  commentLines: number;
  emptyLines: number;
  functions: number;
  avgComplexity: number;
  todoCount: number;
  fixmeCount: number;
  duplicateBlocks: number;
}

export function analyzeCode(code: string): AnalysisResult {
  const lines = code.split('\n');
  const issues: Issue[] = [];
  const metrics: Metrics = {
    totalLines: lines.length,
    codeLines: 0,
    commentLines: 0,
    emptyLines: 0,
    functions: 0,
    avgComplexity: 0,
    todoCount: 0,
    fixmeCount: 0,
    duplicateBlocks: 0,
  };

  // Track variables and their usage
  const declaredVars = new Map<string, number>();
  const usedVars = new Set<string>();
  let inMultilineComment = false;
  const functionComplexities: number[] = [];
  const codeBlocks: string[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const lineNum = index + 1;

    // Empty lines
    if (trimmed === '') {
      metrics.emptyLines++;
      return;
    }

    // Multi-line comments
    if (trimmed.startsWith('/*')) inMultilineComment = true;
    if (trimmed.includes('*/')) inMultilineComment = false;

    // Comment lines
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || inMultilineComment) {
      metrics.commentLines++;
    } else {
      metrics.codeLines++;
    }

    // TODO/FIXME detection
    if (/TODO|FIXME/i.test(line)) {
      if (/TODO/i.test(line)) metrics.todoCount++;
      if (/FIXME/i.test(line)) metrics.fixmeCount++;
      issues.push({
        type: 'todo-fixme',
        severity: 'low',
        line: lineNum,
        message: `Found TODO/FIXME comment: ${trimmed.substring(0, 60)}...`,
        suggestion: 'Convert TODO/FIXME into tracked issues or implement the fix'
      });
    }

    // Variable declarations (simple pattern matching)
    const varMatch = line.match(/(?:const|let|var)\s+(\w+)\s*=/);
    if (varMatch) {
      declaredVars.set(varMatch[1], lineNum);
    }

    // Variable usage
    const words = line.match(/\b\w+\b/g) || [];
    words.forEach(word => usedVars.add(word));

    // Function declarations
    const funcMatch = line.match(/function\s+\w+|const\s+\w+\s*=\s*\(.*\)\s*=>|^\s*\w+\s*\(.*\)\s*{/);
    if (funcMatch) {
      metrics.functions++;
      // Estimate complexity based on control flow
      const complexity = estimateComplexity(lines.slice(index));
      functionComplexities.push(complexity);

      if (complexity > 10) {
        issues.push({
          type: 'high-complexity',
          severity: 'high',
          line: lineNum,
          message: `High cyclomatic complexity (${complexity}). Consider refactoring.`,
          suggestion: 'Break this function into smaller, focused functions'
        });
      }
    }

    // Missing error handling
    if (/(await|\.then\(|fetch\(|JSON\.parse|localStorage|sessionStorage)/.test(line) && 
        !/(try|catch|\.catch\()/.test(lines.slice(Math.max(0, index - 5), index + 5).join('\n'))) {
      issues.push({
        type: 'missing-error-handling',
        severity: 'medium',
        line: lineNum,
        message: 'Potential unhandled error in async/risky operation',
        suggestion: 'Add try-catch or .catch() error handling'
      });
    }

    // Duplicate logic detection (simple version)
    if (trimmed.length > 20 && !trimmed.startsWith('//')) {
      const normalized = trimmed.replace(/\s+/g, ' ');
      if (codeBlocks.includes(normalized)) {
        metrics.duplicateBlocks++;
      } else {
        codeBlocks.push(normalized);
      }
    }

    // Inconsistent patterns
    if (/var\s+/.test(line)) {
      issues.push({
        type: 'inconsistent-pattern',
        severity: 'low',
        line: lineNum,
        message: 'Using `var` instead of `const`/`let` (outdated pattern)',
        suggestion: 'Use `const` or `let` for better scoping'
      });
    }

    // Console.log detection (common AI code smell)
    if (/console\.(log|warn|error|debug)\(/.test(line) && !trimmed.startsWith('//')) {
      issues.push({
        type: 'inconsistent-pattern',
        severity: 'low',
        line: lineNum,
        message: 'Debug console statement left in code',
        suggestion: 'Remove or replace with proper logging framework'
      });
    }
  });

  // Check for unused variables
  declaredVars.forEach((lineNum, varName) => {
    if (!usedVars.has(varName) && varName !== '_') {
      issues.push({
        type: 'unused-variable',
        severity: 'medium',
        line: lineNum,
        message: `Variable '${varName}' is declared but never used`,
        suggestion: 'Remove unused variable or use it in your logic'
      });
    }
  });

  // Duplicate logic issues
  if (metrics.duplicateBlocks > 5) {
    issues.push({
      type: 'duplicate-logic',
      severity: 'high',
      line: 1,
      message: `Found ${metrics.duplicateBlocks} duplicate code blocks`,
      suggestion: 'Extract common logic into reusable functions'
    });
  }

  // Calculate average complexity
  if (functionComplexities.length > 0) {
    metrics.avgComplexity = Math.round(
      functionComplexities.reduce((a, b) => a + b, 0) / functionComplexities.length
    );
  }

  // Calculate score
  const scoreValue = calculateScore(metrics, issues);
  const score = getGrade(scoreValue);

  // Generate recommendations
  const recommendations = generateRecommendations(metrics, issues);

  return {
    score,
    scoreValue,
    issues: issues.sort((a, b) => {
      const severityOrder = { high: 0, medium: 1, low: 2 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    }),
    metrics,
    recommendations,
  };
}

function estimateComplexity(lines: string[]): number {
  let complexity = 1; // Base complexity
  let braceDepth = 0;
  
  for (let i = 0; i < Math.min(lines.length, 50); i++) {
    const line = lines[i];
    
    // Count decision points
    if (/(if|else if|while|for|case|catch|\?|\&\&|\|\|)/.test(line)) {
      complexity++;
    }
    
    // Track function boundaries
    if (/{/.test(line)) braceDepth++;
    if (/}/.test(line)) {
      braceDepth--;
      if (braceDepth === 0) break;
    }
  }
  
  return complexity;
}

function calculateScore(metrics: Metrics, issues: Issue[]): number {
  let score = 100;

  // Deduct for issues
  issues.forEach(issue => {
    if (issue.severity === 'high') score -= 5;
    else if (issue.severity === 'medium') score -= 2;
    else score -= 0.5;
  });

  // Deduct for high complexity
  if (metrics.avgComplexity > 8) score -= (metrics.avgComplexity - 8) * 2;

  // Deduct for TODO/FIXME density
  const todoRatio = (metrics.todoCount + metrics.fixmeCount) / metrics.codeLines;
  if (todoRatio > 0.05) score -= todoRatio * 100;

  // Deduct for low comment ratio (AI code often lacks comments)
  const commentRatio = metrics.commentLines / (metrics.codeLines + metrics.commentLines);
  if (commentRatio < 0.1) score -= 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function getGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

function generateRecommendations(metrics: Metrics, issues: Issue[]): string[] {
  const recs: string[] = [];

  const highIssues = issues.filter(i => i.severity === 'high').length;
  const mediumIssues = issues.filter(i => i.severity === 'medium').length;

  if (highIssues > 0) {
    recs.push(`🔴 Fix ${highIssues} high-severity issue${highIssues > 1 ? 's' : ''} first - these could cause bugs or performance issues`);
  }

  if (mediumIssues > 5) {
    recs.push(`🟡 Address ${mediumIssues} medium-severity issues to improve code quality`);
  }

  if (metrics.avgComplexity > 8) {
    recs.push('🔧 Refactor complex functions - break them into smaller, testable units');
  }

  if (metrics.todoCount + metrics.fixmeCount > 3) {
    recs.push('📝 Convert TODO/FIXME comments into tracked issues or implement fixes');
  }

  const commentRatio = metrics.commentLines / (metrics.codeLines + metrics.commentLines);
  if (commentRatio < 0.1) {
    recs.push('💬 Add comments to explain complex logic - improves maintainability');
  }

  if (metrics.duplicateBlocks > 5) {
    recs.push('♻️ Extract duplicate code into reusable functions or utilities');
  }

  if (recs.length === 0) {
    recs.push('✅ Great job! Your code quality is excellent. Keep it up!');
  }

  return recs;
}
