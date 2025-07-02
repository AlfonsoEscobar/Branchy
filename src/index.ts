import { initRepo } from './commands/init';
import { addFile } from './commands/add';

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