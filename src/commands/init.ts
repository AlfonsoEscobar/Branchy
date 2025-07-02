import fs from 'fs';
import path from 'path';

const BRANCHY_DIR = '.branchy';

export function initRepo(): void {
    if (fs.existsSync(BRANCHY_DIR)) {
        console.log('El repositorio ya está inicializado');
        return;
    }

    //crear carpetas
    fs.mkdirSync(path.join(BRANCHY_DIR, 'objects'), {recursive: true});
    fs.mkdirSync(path.join(BRANCHY_DIR, 'refs', 'heads'), {recursive: true});

    //crear ramas por defecto main
    fs.writeFileSync(path.join(BRANCHY_DIR, 'refs', 'heads', 'main'), '');

    //HEAD apunta a main
    fs.writeFileSync(path.join(BRANCHY_DIR, 'HEAD'), 'ref: refs/heads/main');

    console.log('Carpeta .branchy creada correctamente');

    console.log('Repositorio inicializado correctamente');
}