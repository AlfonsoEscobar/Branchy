import { initRepo } from './init';

const command = process.argv[2];

switch (command) {
    case 'init':
        initRepo();
        break;
    default:
        console.log('Comando no válido');
}