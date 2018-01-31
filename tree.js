// Script to turn { File System } into a json object array to : ./public/library.json
const fs = require('fs');
const dirTree = require('directory-tree');
const { execFile } = require('child_process');

// Main local Directory
const local = '/home/media/_AUDIO_';

const path = dirTree(local);

var promiseTree = new Promise(function (resolve, reject) {
    const dataTree = path;
    resolve(JSON.stringify(dataTree));
});

promiseTree.then(function (value) {
    fs.writeFile('./public/library.json', value, (err) => {
        if (err) throw err;
        console.log(typeof (value));
    });

    console.log('Object created!');
}).then(function () {
    // create symlink
    const args = ['-s', local];

    const child = execFile('ln', args, (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        //console.log(stdout);
        if (stderr) {
            // okey
        }
    });
});

