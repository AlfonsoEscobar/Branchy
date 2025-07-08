// src/ignore.ts
import fs from 'fs';
import path from 'path';
import ignore from 'ignore';

const IGNORE_FILE = path.join(process.cwd(), '.branchyIgnore');
const ig = ignore();

export function loadIgnorePatterns(): void {
  if (fs.existsSync(IGNORE_FILE)) {
    const content = fs.readFileSync(IGNORE_FILE, 'utf-8');
    ig.add(content.split('\n').map(line => line.trim()));
  }
}

export function shouldIgnore(filePath: string): boolean {
  return ig.ignores(filePath);
}