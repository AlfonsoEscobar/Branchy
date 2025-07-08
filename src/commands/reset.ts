import fs from 'fs';
import path from 'path';
import { normalizePath } from '../utils/path';

const BRANCHY_DIR = '.branchy';
const INDEX_FILE = path.join(BRANCHY_DIR, 'index.json');

function loadIndex(): Record<string, string> {
    if (!fs.existsSync(INDEX_FILE)) return {};
    return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));
}

function saveIndex(index: Record<string, string>): void {
    fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
}


export function resetFile(filePath: string): void {
    const index = loadIndex();
    const relativePath = normalizePath(filePath);

    if (!index[relativePath]) {
        console.log(`El archivo ${filePath} no estaba en el index.`);
        return;
    }else{
        delete index[relativePath];
        saveIndex(index);
        console.log(`Archivo ${filePath} deshecho del staging.`);
    }
}