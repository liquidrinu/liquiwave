// Script to turn { File System } into a json object array to : ./public/library.json
const fs = require('fs');
const dirTree = require('directory-tree');

// Main local Directory
const local = '/home/media/_AUDIO_';

const f_tree = dirTree(local);

var promiseTree = new Promise(function (resolve, reject) {
    const dataTree = f_tree;
    resolve(JSON.stringify(dataTree));
});

promiseTree.then(function (value) {
    fs.writeFile('./public/library.json', value, (err) => {
        if (err) throw err;
        console.log(typeof (value));
    });
    console.log('Object created!');
});

