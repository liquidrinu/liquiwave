// Script to turn { File System } into a json object array to : ./public/library.json
const fs = require('fs');
const dirTree = require('directory-tree');
const { execFile } = require('child_process');


exports = module.exports = function () {
    // Main local Directory
    const local = '/home/media/_AUDIO_';

    const path = dirTree(local, { exclude: /ownaudio/ });

    var promiseTree = new Promise(function (resolve, reject) {
        const dataTree = path;
        resolve(JSON.stringify(dataTree));
    });

    promiseTree.then(function (value) {
        //  fs.unlink('./public/library.json', callback)
        fs.writeFile('./public/library.json', value, (err) => {
            if (err) throw err;
            console.log('Object created at ./public/library.json');
        });
    }).then(function () {
        // create symlink
        const args = ['-s', local];
        if (fs.existsSync(local)) {
            console('link already made previously!');
        } else {
            const child = execFile('ln', args, (error, stdout, stderr) => {
                if (error) {
                    throw error;
                }
                console.log('\n if symlink is already made' +
                    ' then you can ignore these errors!');
            });
        }
    });
};