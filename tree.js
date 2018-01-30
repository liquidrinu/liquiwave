// Script to turn { File System } into a json object array to : ./public/library.json
const fs = require('fs');
const dirTree = require('directory-tree');

const f_tree = dirTree('/home/media/_AUDIO_');

var promise1 = new Promise(function (resolve, reject) {
    const dataTree = f_tree;
    resolve(JSON.stringify(dataTree));
});

promise1.then(function (value) {
    fs.writeFile('./public/library.json', value, (err) => {
        if (err) throw err;
        console.log(typeof (value));
    });
    // expected output: "Success!"
});

