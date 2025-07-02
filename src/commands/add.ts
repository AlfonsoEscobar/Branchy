import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const BRANCHY_DIR = '.branchy';
const OBJECTS_DIR = path.join(BRANCHY_DIR, 'objects');
const INDEX_FILE = path.join(BRANCHY_DIR, 'index.json');

function sha1(content: string): string {
    return crypto.createHash('sha1').update(content).digest('hex');
}

export function addFile(filePath: string): void {
    if (!fs.existsSync(filePath)) {
        console.log(`El archivo ${filePath} no existe`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const hash = sha1(content);

    const objectPath = path.join(OBJECTS_DIR, hash);
    fs.writeFileSync(objectPath, content);
    if(!fs.existsSync(objectPath)) {
        fs.writeFileSync(objectPath, content, 'utf-8');
    }

    let index: Record<string, string> = {};
    if(fs.existsSync(INDEX_FILE)) {
        index = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));
    }

    index[filePath] = hash;
    fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));

    console.log(`Archivo ${filePath} agregado correctamente`);
}