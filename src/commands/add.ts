import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { listFilesRecursively } from '../utils/utils';
import { loadIgnorePatterns, shouldIgnore } from '../utils/ignore';
import { normalizePath } from '../utils/path';

const BRANCHY_DIR = '.branchy';
const OBJECTS_DIR = path.join(BRANCHY_DIR, 'objects');
const INDEX_FILE = path.join(BRANCHY_DIR, 'index.json');

function sha1(content: string): string {
    return crypto.createHash('sha1').update(content).digest('hex');
}

function loadIndex(): Record<string, string> {
    if (!fs.existsSync(INDEX_FILE)) return {};
    return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));
}

function saveIndex(index: Record<string, string>): void {
    fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
}

export function addFile(filePath: string): void {
    const index = loadIndex();

    if (!fs.existsSync(filePath)) {
        console.log(`El archivo ${filePath} no existe`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const hash = sha1(content);

    if (index[filePath] === hash) {
        return;
    }

    // Guardar blob si no existe
    const objectPath = path.join(OBJECTS_DIR, hash);
    if (!fs.existsSync(objectPath)) {
        fs.writeFileSync(objectPath, content, 'utf-8');
    }

    const relativePath = normalizePath(filePath);
    index[relativePath] = hash;
    saveIndex(index);

    console.log(`Archivo ${filePath} agregado correctamente`);
}

export function addAll(): void {
  const index = loadIndex();
  const files = listFilesRecursively('.');
  loadIgnorePatterns();

  let cambios = 0;

  for (const file of files) {
    const relativePath = normalizePath(file);

    if (shouldIgnore(relativePath)) {
      continue;
    }
    
    const stat = fs.statSync(file);
    if (!stat.isFile()) continue;

    const content = fs.readFileSync(file, 'utf-8');
    const hash = sha1(content);

    if (index[relativePath] !== hash) {
      const objectPath = path.join(OBJECTS_DIR, hash);
      if (!fs.existsSync(objectPath)) {
        fs.writeFileSync(objectPath, content, 'utf-8');
      }

      index[relativePath] = hash;
      cambios++;
    } 
  }

  saveIndex(index);

  if (cambios === 0) {
    console.log('No hay cambios para añadir.');
  } else {
    console.log(`${cambios} archivo(s) añadido(s) para hacer commit.`);
  }
}