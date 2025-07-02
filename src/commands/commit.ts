import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const BRANCHY_DIR = '.branchy';
const OBJECTS_DIR = path.join(BRANCHY_DIR, 'objects');
const INDEX_FILE = path.join(BRANCHY_DIR, 'index.json');
const HEAD_FILE = path.join(BRANCHY_DIR, 'HEAD');

function sha1(content: string): string {
    return crypto.createHash('sha1').update(content).digest('hex');
}

function getCurrentBranch(): string {
    const head = fs.readFileSync(HEAD_FILE, 'utf-8').trim();
    return head.replace('ref: refs/heads/', '');
}

function getHeadCommitHash(): string | null {

    const branch = getCurrentBranch();
    const branchPath = path.join(BRANCHY_DIR, 'refs', 'heads', branch);


    return null;
}

export function commit(comment: string): void {
    if (!fs.existsSync(INDEX_FILE)) {
        console.log(`Nada que commitear.`);
        return;
    }

    const index: Record<string, string> = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));

    const commit = {
        comment,
        timeStamp: new Date().toISOString(),
        parent,
        files: index
    };



    console.log('commit');
}
