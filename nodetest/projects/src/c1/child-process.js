const { exec,execFile } = require('child_process');
const fs = require('fs');

const command = 'ls'; // Linux command to list files
const args = ['-l', '-a']; // Arguments to show details and hidden files

const fileName = 'text.txt';

if (fs.existsSync(fileName)) {
    const command = process.platform === 'win32' ? `type ${fileName}` : `cat ${fileName}`;
    const args = [];
    exec(command,  (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`File contents:\n${stdout}`);
    });
    
    exec('ls', { cwd: '../myExpressApp' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        console.log(`Output:\n${stdout}`);
    });

    exec('echo $MY_VAR', { env: { MY_VAR: 'Hello, World!' } }, (error, stdout) => {
        console.log(stdout); // Output: Hello, World!
    });

    exec('echo Hello', { shell: '/bin/bash' }, (error, stdout) => {
        console.log(stdout);
    });

    exec('sleep 5', { timeout: 2000 }, (error) => {
        if (error) {
            console.error(`Timed out: ${error.message}`);
        }
    });

    const { execFile } = require('node:child_process');
    const child = execFile(`node` , ['--version'], (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
    });
}

