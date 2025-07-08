import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { listFilesRecursively } from '../utils/utils';
import { loadIgnorePatterns, shouldIgnore } from '../utils/ignore';
import { normalizePath } from '../utils/path';

const BRANCHY_DIR = '.branchy';
const INDEX_FILE = path.join(BRANCHY_DIR, 'index.json');

function sha1(content: string): string {
    return crypto.createHash('sha1').update(content).digest('hex');
}

function loadIndex(): Record<string, string> {
    if (!fs.existsSync(INDEX_FILE)) return {};
    return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));
}

export function status() {

    const index = loadIndex();
    const files = listFilesRecursively('.');
    loadIgnorePatterns();

    const stagedFiles: string[] = [];
    const modifiedNotStaged: string[] = [];
    const untrackedFiles: string[] = [];

    for (const file of files) {
        const absolutePath = path.resolve(file);
        const relativePath = normalizePath(file);

        if (shouldIgnore(relativePath)) continue;

        const stat = fs.statSync(absolutePath);
        if (!stat.isFile()) continue;

        const content = fs.readFileSync(absolutePath, 'utf-8');
        const currentHash = sha1(content);
        const stagedHash = index[relativePath];

        if (stagedHash) {
            if (currentHash === stagedHash) {
            stagedFiles.push(relativePath); // 👍 preparado para commit
            } else {
            modifiedNotStaged.push(relativePath); // ⚠️ modificado después de add
            }
        } else {
            untrackedFiles.push(relativePath); // 🔴 nuevo sin seguimiento
        }
    }

    // Mostrar resultados
    if (stagedFiles.length > 0) {
        console.log('Cambios preparados para hacer commit:');
        console.log('  (usa "branchy reset <archivo>" para deshacer del staging)');
        stagedFiles.forEach(f => console.log(`    modificado:   ${f}`));
        console.log();
    }

    if (modifiedNotStaged.length > 0) {
        console.log('Cambios no preparados para commit:');
        console.log('  (usa "branchy add <archivo>" para incluirlos en el commit)');
        modifiedNotStaged.forEach(f => console.log(`    modificado:   ${f}`));
        console.log();
    }

    if (untrackedFiles.length > 0) {
        console.log('Archivos nuevos no añadidos (sin seguimiento):');
        console.log('  (usa "branchy add <archivo>" para añadirlos al staging)');
        untrackedFiles.forEach(f => console.log(`    ${f}`));
        console.log();
    }

    if (stagedFiles.length === 0 && modifiedNotStaged.length === 0 && untrackedFiles.length === 0) {
        console.log('No hay nada que hacer commit, el directorio de trabajo está limpio.');
    }

    const head = fs.readFileSync(path.join(BRANCHY_DIR, 'HEAD'), 'utf-8').trim();
    console.log(`En la rama ${head.replace('ref: refs/heads/', '')}\n`);

}