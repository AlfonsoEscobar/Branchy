import { log } from 'console';
import fs from 'fs';
import path from 'path';

const BRANCHY_DIR = '.branchy';
const OBJECTS_DIR = path.join(BRANCHY_DIR, 'objects');
const COMMITS_DIR = path.join(OBJECTS_DIR, 'commits');
const HEAD_FILE = path.join(BRANCHY_DIR, 'HEAD');
const REFS_DIR = path.join(BRANCHY_DIR, 'refs', 'heads');

function readCommits(commitHash: string): any {

    const commitPath = path.join(COMMITS_DIR, commitHash);
    if(!fs.existsSync(commitPath)) return null;

    const content = fs.readFileSync(commitPath, 'utf-8');

    return JSON.parse(content);

}

export function logCommits(){
    
    if(!fs.existsSync(HEAD_FILE)){
        console.log('No existe HEAD. Inicializa el repositorio.');
        return;
    }

    const headRef = fs.readFileSync(HEAD_FILE, 'utf-8').trim();
    if(!headRef.startsWith('ref: ')){
        console.log('HEAD corrupto o invalido.');
        return;
    }

    const branch = headRef.replace('ref: refs/heads/', '');
    const branchRefPath = path.join(REFS_DIR, branch);

    if(!fs.readFileSync(branchRefPath)){
        console.log(`La rama ${branch} no tiene commits.`);
        return;
    }

    let currentHash = fs.readFileSync(branchRefPath, 'utf-8').trim();
    let total = 0;

    while(currentHash){
        const commit = readCommits(currentHash);
        if(!commit) break;

        console.log(`Commit: ${currentHash}`);
        console.log(`Fecha: ${new Date(commit.timeStamp).toLocaleDateString()}`);
        console.log(`Mensage: ${commit.comment}`);
        console.log();

        currentHash = commit.parent;
        total++;
    }

    if(total === 0){
        console.log(`No hay commits en esta rama.`);
    }else{
        console.log(`Total de commits: ${total}`);
    }

}
