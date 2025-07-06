// src/utils.ts
import fs from 'fs';
import path from 'path';

export function listFilesRecursively(dir: string): string[] {
  let results: string[] = [];

  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);

    if (fullPath.includes('.branchy')) continue;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(listFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  }

  return results;
}
