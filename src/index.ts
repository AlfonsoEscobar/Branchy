import { initRepo } from './commands/init';
import { addFile, addAll } from './commands/add';
import { commit } from './commands/commit';
import { status } from './commands/status';
import { resetFile } from './commands/reset';
import { logCommits } from './commands/logCommits';


const args = process.argv.slice(2);
const command = args[0];
const commandArgs = args.slice(1); // Esto ya depende del comando

switch (command) {
    case 'init':
        initRepo();
        break;

    case 'add':
        const target = commandArgs[0];
        if(!target) {
            console.log('Uso; branchy add <archivo>')
        } else if (target === '.') {
            addAll();
        }else{
            addFile(target);
        }
        break;

    case 'commit':
        const messageIndex = commandArgs.indexOf('-m');
        if(messageIndex === -1 || !commandArgs[messageIndex + 1]) {
            console.log('Uso: branchy commit -m "<mensaje>"');
            process.exit(1);
        }else{
            const message = commandArgs.slice(messageIndex + 1).join(' ');
            commit(message);
        }
        break;
    
    case 'status':
        status();
        break;
    
    case 'reset':
        const rFile = commandArgs[0];
        if(!rFile) {
            console.log('Uso: branchy reset <archivo>');
            process.exit(1);
        }else{
            resetFile(rFile);
        }
        break;
    
    case 'log':
        logCommits();
        break;

    default:
        console.log('Comando no válido');
}