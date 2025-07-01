import { initRepo } from './init';
import { addFile } from './add';

const [command, arg] = process.argv.slice(2);

switch (command) {
    case 'init':
        initRepo();
        break;
    case 'add':
        if(!arg) {
            console.log('Uso; branchy add <archivo>')
        }else{
            addFile(arg);
        }
        break;
    default:
        console.log('Comando no válido');
}