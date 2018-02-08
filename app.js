const app = require('express')();
const express = require('express');
const server = require('http').Server(app);
const io = require('socket.io')(server);

// insert port here, server will run on local host
const port = 3000;

server.listen(port);
console.log("Server listening at port: " + port + "\n");

// VLC process source
const vlc = require('./player/vlc.js');

app.use(express.static('public'));
//app.use(express.static('PROC'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// client control messages for VLC
io.on('connection', function (socket) {
  socket.on('message', function (msg) {
    vlc.control(msg);
    vlc.urls(msg);
  });
});


/*
// (under construction)
app.get('/proc', function (req, res) {
  res.sendFile(__dirname + '/PROC/index.html');
});

var parseString = require('xml2js').parseString;
var fs = require('fs');

fs.readFile('public/status.xml', 'utf8', function (err, contents) {
  //parseString(contents, function (err, result) {
  io.socket.emit('vlc', contents);
  //console.log(result);
  //});
});
*/